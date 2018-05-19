<?php
/**
 * Plugin
 *
 * PHP version 5
 *
 * @category   PHP
 * @package    GetlancerV3
 * @subpackage Core
 * @author     Agriya <info@agriya.com>
 * @copyright  2018 Agriya Infoway Private Ltd
 * @license    http://www.agriya.com/ Agriya Infoway Licence
 * @link       http://www.agriya.com
 */
/**
 * GET projectsGet
 * Summary: Fetch all projects
 * Notes: Returns all projects from the system
 * Output-Formats: [application/json]
 */
$app->GET('/api/v1/projects', function ($request, $response, $args) {
    global $authUser;
    $queryParams = $request->getQueryParams();
    $results = array();
    try {
        if (!empty($queryParams['type']) && $queryParams['type'] == 'price_range') {
            $projectRangeIds = Models\Project::select('project_range_id')->where('project_status_id', \Constants\ProjectStatus::OpenForBidding)->get();
            $min_amount = Models\ProjectRange::whereIn('id', $projectRangeIds)->where('is_active', true)->min('min_amount');
            $max_amount = Models\ProjectRange::whereIn('id', $projectRangeIds)->where('is_active', true)->max('max_amount');
            $response = array(
                'min_price' => $min_amount,
                'max_price' => $max_amount
            );
            $results = array(
                'data' => $response
            );
            return renderWithJson($results);
        } else {
            $count = PAGE_LIMIT;
            if (!empty($queryParams['limit'])) {
                $count = $queryParams['limit'];
            }
            $enabledIncludes = array(
                'user',
                'project_bid',
                'project_range',
                'skills_projects',
                'projects_project_categories',
                'attachment',
                'project_status',
                'bid_winner',
                'freelancer'
            );
            (isPluginEnabled('Bidding/ProjectFlag')) ? $enabledIncludes[] = 'flag' : '';
            (isPluginEnabled('Bidding/ProjectFollow')) ? $enabledIncludes[] = 'follower' : '';
            $projects = Models\Project::with($enabledIncludes);
            if (!empty($authUser)) {
                $projects = $projects->with(['bid' => function ($q) use ($authUser) {
                    if ($authUser['role_id'] != \Constants\ConstUserTypes::Admin) {
                        $q->select('bids.*');
                        $q->join('projects', 'projects.id', 'bids.project_id')->where(function ($query) use ($authUser) {
                            $query->orWhere(function ($query) {
                                $query->where('projects.is_hidded_bid', false);
                            });
                            $query->orWhere(function ($query) use ($authUser) {
                                $query->where('projects.is_hidded_bid', true);
                                $query->where('bids.user_id', $authUser['id']);
                            });
                        });
                    }
                }
                ]);
            }
            if (empty($authUser) || (empty($queryParams['project_status_id']) && $authUser['role_id'] != \Constants\ConstUserTypes::Admin)) {
                $projects = $projects->where('project_status_id', '=', \Constants\ProjectStatus::OpenForBidding);
            }
            $projects = $projects->Filter($queryParams)->paginate($count)->toArray();
            $data = $projects['data'];
            unset($projects['data']);
            if (!empty($data) && !empty($authUser)) {
                foreach ($data as $key => $record) {
                    if ($record['project_status_id'] < \Constants\ProjectStatus::OpenForBidding && $authUser->id != $record['user_id'] && $authUser->role_id != \Constants\ConstUserTypes::Admin) {
                        unset($data[$key]['user']);
                    }
                    $bidArray = array();
                    foreach ($record['bid'] as $bid) {
                        if ($authUser->id == $bid['user_id']) {
                            $bidArray = $bid;
                        }
                        unset($data[$key]['bid']);
                    }
                    $data[$key]['bid'] = $bidArray;
                }
            }
            $results = array(
                'data' => $data,
                '_metadata' => $projects
            );
            return renderWithJson($results);
        }
    } catch (Exception $e) {
        return renderWithJson($results, $message = 'No record found', $fields = '', $isError = 1);
    }
});
/**
 * POST projectsPost
 * Summary: Creates a new project
 * Notes: Creates a new project
 * Output-Formats: [application/json]
 */
$app->POST('/api/v1/projects', function ($request, $response, $args) {
    
    global $authUser, $_server_domain_url;
    $result = array();
    $args = $request->getParsedBody();
    $project = new Models\Project($args);
    $projects = array(
        'payment_gateway_id',
        'gateway_id',
        'buyer_name',
        'buyer_email',
        'buyer_address',
        'buyer_city',
        'buyer_state',
        'buyer_country_iso2',
        'buyer_phone',
        'buyer_zip_code',
        'credit_card_code',
        'credit_card_expire',
        'credit_card_name_on_card',
        'credit_card_number'
    );
    if (!in_array($authUser->role_id, [\Constants\ConstUserTypes::User, \Constants\ConstUserTypes::Employer]) && $authUser->role_id != \Constants\ConstUserTypes::Admin) {
        return renderWithJson($result, 'Freelancer could not be added the project.', '', 1);
    }
    if (isset($args['custom_range'])) {
        if (!empty($args['custom_range']['min_amount']) || !empty($args['custom_range']['max_amount'])) {
            $projectRange = new Models\ProjectRange;
            $projectRange->user_id = $authUser->id;
            $projectRange->name = 'Custom Range';
            $projectRange->min_amount = isset($args['custom_range']['min_amount']) ? $args['custom_range']['min_amount'] : 0;
            $projectRange->max_amount = isset($args['custom_range']['max_amount']) ? $args['custom_range']['max_amount'] : 0;
            $projectRange->project_count = 0;
            $projectRange->is_active = false;
            $projectRange->save();
            $project->project_range_id = $projectRange->id;
        }
    }
    try {
        $validationErrorFields = $project->validate($args);
        if (empty($validationErrorFields)) {
            $project->slug = Inflector::slug(strtolower($project->name), '-');
            $amount = 0;
            if (!empty(PROJECT_LISTING_FEE)) {
                $amount+= PROJECT_LISTING_FEE;
            }
            if (!empty($args['is_featured']) && PROJECT_FEATURED_FEE) {
                $amount+= PROJECT_FEATURED_FEE;
            }
            if (!empty($args['is_urgent']) && PROJECT_URGENT_FEE) {
                $amount+= PROJECT_URGENT_FEE;
            }
            if (!empty($args['is_private']) && PROJECT_PRIVATE_PROJECT_FEE) {
                $amount+= PROJECT_PRIVATE_PROJECT_FEE;
            }
            if (!empty($args['is_hidded_bid']) && PROJECT_HIDDEN_BID_FEE) {
                $amount+= PROJECT_HIDDEN_BID_FEE;
            }
            $project->project_status_id = \Constants\ProjectStatus::Draft;
            if (!empty($args['project_status_id'])) {
                $project->project_status_id = $args['project_status_id'];
            }
            if (!empty($amount)) {
                $project->is_paid = 0;
            }
            if (PROJECT_MAX_BID_DURATION && !empty($args['bid_duration']) && ($args['bid_duration'] > PROJECT_MAX_BID_DURATION)) {
                return renderWithJson($result, 'Your existing the maximum bid duration.', '', 1);
            }
            $project->is_active = 1;
            $project->user_id = $authUser->id;
            if ($authUser['role_id'] == \Constants\ConstUserTypes::Admin && !empty($args['user_id'])) {
                $project->user_id = $args['user_id'];
            }
            $project->total_listing_fee = $amount;
            if ($project->save()) {
                Models\Project::updateUserProjectCount($project->user_id);
                if (!empty($args['image']) && $project->id) {
                    saveImage('Project', $args['image'], $project->id);
                }
                if (!empty($args['image_data']) && $project->id) {
                    saveImageData('Project', $args['image_data'], $project->id);
                }
                // Add in the Project Skills table
                if (!empty($args['skills']) && $project->id) {
                    $skills = explode(',', $args['skills']);
                    foreach ($skills as $skill) {
                        $newSkills = Models\Skill::where('name', $skill)->first();
                        if(empty($newSkills)) {
                            $newSkills = new Models\Skill;
                            $newSkills->name = $skill;
                            $newSkills->slug = Inflector::slug(strtolower($skill), '-');
                            $newSkills->save();
                        }
                        $skillsProjects = new Models\SkillsProjects;
                        $skillsProjects->skill_id = $newSkills->id ;

                        $skillsProjects->project_id = $project->id;
                        $skillsProjects->save();
                    }
                }
                // Add in the Projects Project Categories table
                if (!empty($args['project_categories']) && $project->id) {
                    foreach ($args['project_categories'] as $category) {
                        $projectsProjectCategory = new Models\ProjectsProjectCategory;
                        $projectsProjectCategory->project_category_id = $category['project_category_id'];
                        $projectsProjectCategory->project_id = $project->id;
                        $projectsProjectCategory->save();
                    }
                }
                $projectBid = new Models\ProjectBid;
                $projectBid->project_id = $project->id;
                $projectBid->is_active = true;
                $projectBid->user_id = $authUser->id;
                $projectBid->amount = $amount;
                $projectBid->bidding_start_date = date('Y-m-d h:i:s');
                $projectBid->bidding_end_date = date('Y-m-d h:i:s', strtotime("+" . $project->bid_duration . " days"));
                $projectBid->save();
                if (!empty($amount) && !empty($args['payment_gateway_id'])) {
                    $args['original_price'] = $args['amount'] = $amount;
                    $args['id'] = $project->id;
                    $args['user_id'] = isset($args['user_id']) ? $args['user_id'] : $authUser->id;
                    $args['notify_url'] = $_server_domain_url . '/ipn/process_ipn/Project/' . $project->id . '/' . md5(SECURITY_SALT . $project->id . SITE_NAME);
                    $args['success_url'] = $_server_domain_url . '/project?error_code=0';
                    $args['cancel_url'] = $_server_domain_url . '/project?error_code=512';
                    $result = Models\Payment::processPayment($project->id, $args, 'Project');
                }
            }
            if ($amount <= 0 && $project->project_status_id != \Constants\ProjectStatus::Draft) {
                if (!empty(PROJECT_IS_AUTO_APPROVE)) {                    
                    $project->project_status_id = \Constants\ProjectStatus::OpenForBidding;
                    $getuserName = getUserHiddenFields($projectBid->user_id);
                    $projectpushedNotification = array(
                            '##USERNAME##' => $getuserName->username,
                            '##PROJECT_NAME##' => $project->slug,
                            '##PROJECT_URL##' => $_server_domain_url . '/projects/view/' . $project->id.'/'.$project->slug);
                    sendMail('Project Published Notification', $projectpushedNotification, $getuserName->email);

                } else {                
                    $project->project_status_id = \Constants\ProjectStatus::PendingForApproval;                    
                }
                $project->is_paid = 1;
                $project->update();
            } elseif ($project->project_status_id != \Constants\ProjectStatus::Draft) {
                $project->project_status_id = \Constants\ProjectStatus::PaymentPending;                
                $project->update();
            }
            if (empty($amount) || empty($args['payment_gateway_id'])) {
                $result = $project->toArray();
            }
            return renderWithJson($result);
        } else {
            return renderWithJson($result, 'Project could not be added. Please, try again.', $validationErrorFields, 1);
        }
    } catch (Exception $e) {
        return renderWithJson($result, 'Project could not be added. Please, try again.', '', 1);
    }
})->add(new ACL('canCreateProject'));
/**
 * DELETE projectsProjectIdDelete
 * Summary: Delete project
 * Notes: Deletes a single project based on the ID supplied
 * Output-Formats: [application/json]
 */
$app->DELETE('/api/v1/projects/{projectId}', function ($request, $response, $args) {
    $project = Models\Project::find($request->getAttribute('projectId'));
    $result = array();
    try {
        if (!empty($project)) {
            if ($project->delete()) {
                Models\Project::updateUserProjectCount($project->user_id);
                $result = array(
                    'status' => 'success',
                );
                return renderWithJson($result);
            } else {
                return renderWithJson($result, 'Project could not be deleted. Access Denied.', '', 1);
            }
        } else {
            return renderWithJson($result, 'Project could not be found. Please, try again.', '', 1);
        }
    } catch (Exception $e) {
        return renderWithJson($result, 'Project could not be deleted. Please, try again.', '', 1);
    }
})->add(new ACL('canDeleteProject'));
/**
 * GET projectsProjectIdGet
 * Summary: Fetch project
 * Notes: Returns a project based on a single ID
 * Output-Formats: [application/json]
 */
$app->GET('/api/v1/projects/{projectId}', function ($request, $response, $args) {
    global $authUser;
    $queryParams = $request->getQueryParams();
    $result = array();
    $project_status = array(
        \Constants\ProjectStatus::Draft,
        \Constants\ProjectStatus::PaymentPending
    );
    $enabledIncludes = array(
        'project_bid',
        'user',
        'project_range',
        'skills_projects',
        'projects_project_categories',
        'attachment',
        'project_status',
        'bid_winner',
        'reviews',
        'freelancer'
    );
    (isPluginEnabled('Bidding/ProjectFlag')) ? $enabledIncludes[] = 'flag' : '';
    (isPluginEnabled('Bidding/ProjectFollow')) ? $enabledIncludes[] = 'follower' : '';
    (isPluginEnabled('Bidding/BiddingReview')) ? $enabledIncludes[] = 'bid_reviews' : '';
    (isPluginEnabled('Bidding/BiddingReview')) ? $enabledIncludes[] = 'other_user_reviews' : '';
    $project = Models\Project::with($enabledIncludes)->with(['owner_bid', function ($q) {
        $q->whereHas('project_bid', function ($q1) {
            $q1->where('is_active', 1);
        });
    }
    ]);
    $project = $project->Filter($queryParams)->find($request->getAttribute('projectId'));
    if (!empty($project)) {
        if (in_array($project->project_status_id, $project_status) && (empty($authUser) || (!empty($authUser) && ($authUser['role_id'] != \Constants\ConstUserTypes::Admin && $authUser['id'] != $project->user_id)))) {
            return renderWithJson($result, 'No record found, Access Denied', '', 1, 404);
        }
        if (isPluginEnabled('Bidding/BiddingReview')) {
            if (count($project->bid_reviews) != 0 && !empty($authUser['id'])) {
                $project->bid_review = $project->bid_reviews[0];
                unset($project->bid_reviews);
            }
            if (count($project->other_user_reviews) != 0 && !empty($authUser['id'])) {
                $project->other_user_review = $project->other_user_reviews[0];
                unset($project->other_user_reviews);
            }
        }
        if (!empty($_GET['type']) && $_GET['type'] == 'view') {
            insertViews($request->getAttribute('projectId'), 'Project');
        }
        $result['data'] = $project;
        return renderWithJson($result);
    } else {
        return renderWithJson($result, 'No record found', '', 1, 404);
    }
});
/**
 * PUT projectsProjectIdPut
 * Summary: Update project by its id
 * Notes: Update project by its id
 * Output-Formats: [application/json]
 */
$app->PUT('/api/v1/projects/{projectId}', function ($request, $response, $args) {
    global $authUser, $_server_domain_url;
    $args = $request->getParsedBody();
    $result = array();
    $project_range_id = '';
    $project = Models\Project::find($request->getAttribute('projectId'));
    $project_status = array(
        \Constants\ProjectStatus::Draft,
        \Constants\ProjectStatus::OpenForBidding
    );
    $oldProjectStatus = $project->project_status_id;
    $oldBidDuration = $project->bid_duration;
    if ($authUser['role_id'] != \Constants\ConstUserTypes::Admin && $project->project_status_id >= \Constants\ProjectStatus::OpenForBidding) {
        if (!empty($args['additional_descriptions'])) {
            $project->additional_descriptions = $args['additional_descriptions'];
        }
        unset($args['custom_range']);
        unset($args['project_categories']);
    } else {
        $project->fill($args);
    }
    try {
        $validationErrorFields = $project->validate($args);
        if (empty($validationErrorFields)) {
            if (!empty($args['project_range_id']) && $args['project_range_id'] != $project->project_range_id) {
                $project_range_id = $project->project_range_id;
            }
            if (PROJECT_MAX_BID_DURATION && $project->bid_duration > PROJECT_MAX_BID_DURATION) {
                return renderWithJson($result, 'Your existing the maximum bid duration.', '', 1);
            }
            $newProjectStatus = $project->project_status_id;
            if (isset($args['custom_range'])) {
                if (!empty($args['custom_range']['min_amount']) || !empty($args['custom_range']['max_amount'])) {
                    $projectRange = Models\ProjectRange::where('id', $project->project_range_id)->where('user_id', $authUser->id)->first();
                    if (isset($projectRange)) {
                        $projectRange->min_amount = isset($args['custom_range']['min_amount']) ? $args['custom_range']['min_amount'] : 0;
                        $projectRange->max_amount = isset($args['custom_range']['max_amount']) ? $args['custom_range']['max_amount'] : 0;
                        $projectRange->update();
                    } else {
                        $projectRange = new Models\ProjectRange;
                        $projectRange->user_id = $authUser->id;
                        $projectRange->name = 'Custom Range';
                        $projectRange->min_amount = isset($args['custom_range']['min_amount']) ? $args['custom_range']['min_amount'] : 0;
                        $projectRange->max_amount = isset($args['custom_range']['max_amount']) ? $args['custom_range']['max_amount'] : 0;
                        $projectRange->project_count = 0;
                        $projectRange->is_active = false;
                        $projectRange->save();
                    }
                    $project->project_range_id = $projectRange->id;
                }
            }
            if ($authUser['role_id'] == \Constants\ConstUserTypes::Admin && !empty($args['user_id'])) {
                $project->user_id = $args['user_id'];
            }
            if (in_array($newProjectStatus, [\Constants\ProjectStatus::Draft, \Constants\ProjectStatus::PaymentPending]) || in_array($oldProjectStatus, [\Constants\ProjectStatus::Draft, \Constants\ProjectStatus::PaymentPending])) {
                $amount = PROJECT_LISTING_FEE;
                if (!empty($args['is_featured']) || !empty($project->is_featured)) {
                    $amount+= PROJECT_FEATURED_FEE;
                }
                if (!empty($args['is_urgent']) || !empty($project->is_urgent)) {
                    $amount+= PROJECT_URGENT_FEE;
                }
                if (!empty($args['is_private']) || !empty($project->is_private)) {
                    $amount+= PROJECT_PRIVATE_PROJECT_FEE;
                }
                if (!empty($args['is_hidded_bid']) || !empty($project->is_hidded_bid)) {
                    $amount+= PROJECT_HIDDEN_BID_FEE;
                }
                $project->total_listing_fee = $amount;
            }
            if ($project->update()) {
                if (!empty($project_range_id)) {
                    Project::ProjectRangeCountUpdation($project_range_id);
                }
                if (!empty($args['image']) && $project->id) {
                    saveImage('Project', $args['image'], $project->id);
                }
                if (!empty($args['image_data']) && $project->id) {
                    saveImageData('Project', $args['image_data'], $project->id);
                }
                // Add in the Project Skills table
                if (!empty($args['skills']) && $project->id) {
                    Models\SkillsProjects::where('project_id', $project->id)->get()->each(function ($skillsProjects) {
                        $skillsProjects->delete();
                    });
                    if (!empty($args['skills'])) {
                        $skills = explode(',', $args['skills']);
                        foreach ($skills as $skill) {
                            $newSkills = Models\Skill::where('name', $skill)->first();
                            if(empty($newSkills)) {
                                $newSkills = new Models\Skill;
                                $newSkills->name = $skill;
                                $newSkills->slug = Inflector::slug(strtolower($skill), '-');
                                $newSkills->save();
                            }
                            $skillsProjects = new Models\SkillsProjects;
                            $skillsProjects->skill_id = $newSkills->id ;
                            $skillsProjects->project_id = $project->id;
                            $skillsProjects->save();
                        }
                    }
                }
                // Add in the Projects Project Categories table
                if (!empty($args['project_categories']) && $project->id) {
                    Models\ProjectsProjectCategory::where('project_id', $project->id)->get()->each(function ($projectsProjectCategory) {
                        $projectsProjectCategory->delete();
                    });
                    foreach ($args['project_categories'] as $category) {
                        $projectsProjectCategory = new Models\ProjectsProjectCategory;
                        $projectsProjectCategory->project_category_id = $category['project_category_id'];
                        $projectsProjectCategory->project_id = $project->id;
                        $projectsProjectCategory->save();
                    }
                }
                if ((!empty($project->project_bid->id) && !empty($args['bid_duration'])) && $args['bid_duration'] != $oldBidDuration) {
                    $projectBid = Models\ProjectBid::where('id', $project->project_bid->id)->where('project_id', $request->getAttribute('projectId'))->get();
                    if (!empty($projectBid)) {
                        $projectBid->bidding_start_date = date('Y-m-d', strtotime($projectBid->bidding_start_date));
                        if (!empty($args['bid_duration'])) {
                            $projectBid->bidding_end_date = date('Y-m-d', strtotime($projectBid->bidding_start_date . "+" . $args['bid_duration'] . " days"));
                        }
                        $projectBid->update();
                    }
                }
                if ($authUser['role_id'] != \Constants\ConstUserTypes::Admin && in_array($oldProjectStatus, [\Constants\ProjectStatus::Draft, \Constants\ProjectStatus::PaymentPending]) && !empty($args['project_status_id']) && $args['project_status_id'] != \Constants\ProjectStatus::Draft) {
                    if ($project->total_listing_fee > 0) {                       
                        $project->project_status_id = \Constants\ProjectStatus::PaymentPending;                        
                    } else {                        
                        $project->is_paid = 1;
                        if (!empty(PROJECT_IS_AUTO_APPROVE)) {                            
                            $project->project_status_id = \Constants\ProjectStatus::OpenForBidding;
                            $getuserName = getUserHiddenFields($project->user_id);
                            $projectpushedNotification = array(
                                        '##USERNAME##' => $getuserName->username,
                                        '##PROJECT_NAME##' => $project->name,
                                        '##PROJECT_URL##' => $_server_domain_url . '/projects/view/' . $project->id.'/'.$project->slug);
                            sendMail('Project Published Notification', $projectpushedNotification, $getuserName->email);
                        } else {
                            $project->project_status_id = \Constants\ProjectStatus::PendingForApproval;
                        }
                    }
                    $followers = Models\Follower::where('foreign_id', $project->user_id)->where('class', 'User')->get();
                    $employerDetails = getUserHiddenFields($project->user_id);
                        foreach ($followers as $follower) {
                            $userDetails = getUserHiddenFields($follower->user_id);
                            $emailFindReplace = array(
                                '##USERNAME##' => ucfirst($userDetails->username) ,
                                '##FAV_USERNAME##' => ucfirst($employerDetails->username) ,
                                '##PROJECT_NAME##' => ucfirst($project->name),
                                '##PROJECT_LINK##' => $_server_domain_url . '/projects/view/' . $project->id . '/' . $project->slug 
                            );
                            sendMail('New project opened for bidding', $emailFindReplace, $userDetails->email);                 
                        } 
                    $project->update();
                }                
                if(!empty($args['project_status_id']) && $args['project_status_id'] == \Constants\ProjectStatus::CanceledByAdmin && $args['project_status_id'] != $oldProjectStatus) {
                    $adminId = Models\User::select('id')->where('role_id', \Constants\ConstUserTypes::Admin)->first();
                    insertActivities($adminId['id'], $project->user_id, 'Project', $project->id, $oldProjectStatus, $args['project_status_id'], \Constants\ActivityType::ProjectStatusChanged, $project->id, 0);
                    if (!empty($project->bid_winner)) {
                        insertActivities($adminId['id'], $project->bid_winner->user_id, 'Project', $project->id, $oldProjectStatus, $args['project_status_id'], \Constants\ActivityType::ProjectStatusChanged, $project->id, 0);
                    }
                } else if(!empty($args['project_status_id']) && $args['project_status_id'] == \Constants\ProjectStatus::OpenForBidding && $args['project_status_id'] != $oldProjectStatus) {
                    $adminId = Models\User::select('id')->where('role_id', \Constants\ConstUserTypes::Admin)->first();
                    insertActivities($adminId['id'], $project->user_id, 'Project', $project->id, $oldProjectStatus, $args['project_status_id'], \Constants\ActivityType::ProjectStatusChanged, $project->id, 0);
                }
            }
            if (!empty($project->project_bid->bid) && $project->project_status_id == \Constants\ProjectStatus::OpenForBidding) {
                $employerDetails = getUserHiddenFields($project->user_id);
                foreach ($project->project_bid->bid as $bid){
                    $userDetails = getUserHiddenFields($bid->user_id);
                    $emailFindReplace = array(
                        '##USERNAME##' => ucfirst($employerDetails->username) ,
                        '##BUYER_USERNAME##' => ucfirst($userDetails->username) ,
                        '##PROJECT_NAME##' => ucfirst($project->name),
                        '##PROJECT_LINK##' => $_server_domain_url . '/projects/view/' . $project->id . '/' . $project->slug 
                    );
                    sendMail('Update Project Notification', $emailFindReplace, $userDetails->email);                    
                }
            }            
            $result = $project->toArray();
            return renderWithJson($result);
        } else {
            return renderWithJson($result, 'Project could not be updated. Please, try again.', $validationErrorFields, 1);
        }
    } catch (Exception $e) {
        return renderWithJson($result, 'Project could not be updated. Please, try again.', $e->getMessage(), 1);
    }
})->add(new ACL('canUpdateProject'));
/**
 * PUT projectsProjectIdUpdateStatusPut
 * Summary: Update project by its id
 * Notes: Update project by its id
 * Output-Formats: [application/json]
 */
$app->PUT('/api/v1/projects/{projectId}/update_status', function ($request, $response, $args) {
    $args = $request->getParsedBody();
    $result = $project = array();
    try {
        if (isset($args['project_status_id']) && $args['project_status_id'] == \Constants\ProjectStatus::EmployerCanceled) {
            $project = Models\Project::cancel($request->getAttribute('projectId'));
        }
        if (isset($args['project_status_id']) && $args['project_status_id'] == \Constants\ProjectStatus::MutuallyCanceled) {
            $project = Models\Project::mutual_cancel($args, $request->getAttribute('projectId'));
        }
        if (isset($args['project_status_id']) && $args['project_status_id'] == \Constants\ProjectStatus::OpenForBidding) {
            $project = Models\Project::withdraw_freelancer($args, $request->getAttribute('projectId'));
        }
        if (isset($args['project_status_id']) && $args['project_status_id'] == \Constants\ProjectStatus::UnderDevelopment) {
            $project = Models\Project::under_development($args, $request->getAttribute('projectId'));
        }
        if (isset($args['project_status_id']) && $args['project_status_id'] == \Constants\ProjectStatus::Completed) {
            $project = Models\Project::completed($args, $request->getAttribute('projectId'));
        }
        if (isset($args['project_status_id']) && $args['project_status_id'] == \Constants\ProjectStatus::FinalReviewPending) {
            $project = Models\Project::final_review_pending($args, $request->getAttribute('projectId'));
        }
        if (!empty($project) && empty($project['code'])) {
            $result['data'] = $project;
            updateProjectCompletedCount($project['freelancer_user_id']);
            updateProjectFailedCount($project['freelancer_user_id']);
        } elseif (!empty($project)) {
            return renderWithJson($result, $project['message'], '', $project['code']);
        }
        return renderWithJson($result);
    } catch (Exception $e) {
        return renderWithJson($result, 'Update status could not be updated. Please, try again.', '', 1);
    }
})->add(new ACL('canUpdateProjectUpdateStatus'));
/*
 * GET Projects Get
 * Summary: Fetch all Projects
 * Notes: Returns all Projects from the system
 * Output-Formats: [application/json]
*/
$app->GET('/api/v1/me/projects', function ($request, $response, $args) {
    global $authUser;
    $result = array();
    $queryParams = $request->getQueryParams();
    $count = PAGE_LIMIT;
    if (!empty($queryParams['limit'])) {
        $count = $queryParams['limit'];
    }
    $enabledIncludes = array(
		'project_bid',
        'project_range',
        'project_status',
        'bid_winner',
    );
    (isPluginEnabled('Bidding/BiddingReview')) ? $enabledIncludes[] = 'bid_reviews' : '';
    $projects = Models\Project::with($enabledIncludes)->where('user_id', $authUser['id'])->Filter($queryParams)->paginate($count);
    if (!empty($projects)) {
        $projectsNew = $projects;
        if (isPluginEnabled('Bidding/BiddingReview')) {
            $projects = $projects->map(function ($project) {
                $project->bid_review = $project->bid_reviews->take(1)->toArray();
                unset($project->bid_reviews);
                $projectsNew = $project;
                return $project;
            });
        }
        $projectsNew = $projectsNew->toArray();
        $data = $projectsNew['data'];
        unset($projectsNew['data']);
        $result = array(
            'data' => $data,
            '_metadata' => $projectsNew
        );
        return renderWithJson($result);
    } else {
        return renderWithJson($result, 'No record found', '', 1);
    }
})->add(new ACL('canUserViewProjects'));
/**
 * GET employerEmployerIdProjectsStatsGet
 * Summary: Fetch job
 * Notes: Returns a project based on a single ID
 * Output-Formats: [application/json]
 */
$app->GET('/api/v1/employer/me/projects/stats', function ($request, $response, $args) {
    global $authUser;
    $queryParams = $request->getQueryParams();
    $results = array();
    try {
        $count = PAGE_LIMIT;
        if (!empty($queryParams['limit'])) {
            $count = $queryParams['limit'];
        }
        $projectStatuses = Models\ProjectStatus::Filter($queryParams)->get()->toArray();
        foreach ($projectStatuses as $key => $projectStatus) {
            $projectCount = Models\Project::withoutGlobalScopes()->where('user_id', $authUser['id'])->where('project_status_id', $projectStatus['id'])->count();
            $projectStatuses[$key]['project_count'] = $projectCount;
        }
        $results = array(
            'data' => $projectStatuses
        );
        return renderWithJson($results);
    } catch (Exception $e) {
        return renderWithJson($results, $message = 'No record found', $fields = '', $isError = 1);
    }
})->add(new ACL('canListProjectStat'));
/**
 * GET projectCategoriesGet
 * Summary: Fetch all project categories
 * Notes: Returns all project categories from the system
 * Output-Formats: [application/json]
 */
$app->GET('/api/v1/project_categories', function ($request, $response, $args) {
    $queryParams = $request->getQueryParams();
    $results = array();
    global $authUser;
    try {
        $count = PAGE_LIMIT;
        if (!empty($queryParams['limit'])) {
            $count = $queryParams['limit'];
        }
        if (!isset($authUser) || (isset($authUser) && ($authUser['role_id'] != \Constants\ConstUserTypes::Admin))) {
            $queryParams['filter'] = 'active';
        }
        if (!empty($queryParams['limit']) && $queryParams['limit'] == 'all') {
            $projectCategories = Models\ProjectCategory::Filter($queryParams)->get()->toArray();
            $results['data'] = $projectCategories;
        } else {
            $projectCategories = Models\ProjectCategory::Filter($queryParams)->paginate($count)->toArray();
            $data = $projectCategories['data'];
            unset($projectCategories['data']);
            $results = array(
                'data' => $data,
                '_metadata' => $projectCategories
            );
        }
        return renderWithJson($results);
    } catch (Exception $e) {
        return renderWithJson($results, $message = 'No record found', $fields = '', $isError = 1);
    }
});
/**
 * POST projectCategoriesPost
 * Summary: Creates a new project category
 * Notes: Creates a new project category
 * Output-Formats: [application/json]
 */
$app->POST('/api/v1/project_categories', function ($request, $response, $args) {
    $args = $request->getParsedBody();
    $projectCategory = new Models\ProjectCategory($args);
    $result = array();
    try {
        $validationErrorFields = $projectCategory->validate($args);
        if (empty($validationErrorFields)) {
            $projectCategory->save();
            $result = $projectCategory->toArray();
            return renderWithJson($result);
        } else {
            return renderWithJson($result, 'Project category could not be added. Please, try again.', $validationErrorFields, 1);
        }
    } catch (Exception $e) {
        return renderWithJson($result, 'Project category could not be added. Please, try again.', '', 1);
    }
})->add(new ACL('canCreateProjectCategory'));
/**
 * DELETE projectCategoriesProjectCategoryIdDelete
 * Summary: Delete project category
 * Notes: Deletes a single project category based on the ID supplied
 * Output-Formats: [application/json]
 */
$app->DELETE('/api/v1/project_categories/{projectCategoryId}', function ($request, $response, $args) {
    $projectCategory = Models\ProjectCategory::find($request->getAttribute('projectCategoryId'));
    try {
        $projectCategory->delete();
        $result = array(
            'status' => 'success',
        );
        return renderWithJson($result);
    } catch (Exception $e) {
        return renderWithJson($result, 'Project category could not be deleted. Please, try again.', '', 1);
    }
})->add(new ACL('canDeleteProjectCategory'));
/**
 * GET projectCategoriesProjectCategoryIdGet
 * Summary: Fetch project category
 * Notes: Returns a project category based on a single ID
 * Output-Formats: [application/json]
 */
$app->GET('/api/v1/project_categories/{projectCategoryId}', function ($request, $response, $args) {
    $result = array();
    $projectCategory = Models\ProjectCategory::find($request->getAttribute('projectCategoryId'));
    if (!empty($projectCategory)) {
        $result['data'] = $projectCategory;
        return renderWithJson($result);
    } else {
        return renderWithJson($result, 'No record found', '', 1);
    }
})->add(new ACL('canViewProjectCategory'));
/**
 * PUT projectCategoriesProjectCategoryIdPut
 * Summary: Update project category by its id
 * Notes: Update project category by its id
 * Output-Formats: [application/json]
 */
$app->PUT('/api/v1/project_categories/{projectCategoryId}', function ($request, $response, $args) {
    $args = $request->getParsedBody();
    $projectCategory = Models\ProjectCategory::find($request->getAttribute('projectCategoryId'));
    $projectCategory->fill($args);
    $result = array();
    try {
        $validationErrorFields = $projectCategory->validate($args);
        if (empty($validationErrorFields)) {
            $projectCategory->save();
            $result = $projectCategory->toArray();
            return renderWithJson($result);
        } else {
            return renderWithJson($result, 'Project category could not be updated. Please, try again.', $validationErrorFields, 1);
        }
    } catch (Exception $e) {
        return renderWithJson($result, 'Project category could not be updated. Please, try again.', '', 1);
    }
})->add(new ACL('canUpdateProjectCategory'));
/**
 * GET projectRangesGet
 * Summary: Fetch all project ranges
 * Notes: Returns all project ranges from the system
 * Output-Formats: [application/json]
 */
$app->GET('/api/v1/project_ranges', function ($request, $response, $args) {
    $queryParams = $request->getQueryParams();
    $results = array();
    global $authUser;
    try {
        $count = PAGE_LIMIT;
        if (!empty($queryParams['limit'])) {
            $count = $queryParams['limit'];
        }
        if (!isset($authUser) || (isset($authUser) && ($authUser['role_id'] != \Constants\ConstUserTypes::Admin))) {
            $queryParams['filter'] = 'active';
        }
        if (!empty($queryParams['limit']) && $queryParams['limit'] == 'all') {
            $projectRanges = Models\ProjectRange::Filter($queryParams)->get()->toArray();
            $results['data'] = $projectRanges;
        } else {
            $projectRanges = Models\ProjectRange::Filter($queryParams)->paginate($count)->toArray();
            $data = $projectRanges['data'];
            unset($projectRanges['data']);
            $results = array(
                'data' => $data,
                '_metadata' => $projectRanges
            );
        }
        return renderWithJson($results);
    } catch (Exception $e) {
        return renderWithJson($results, $message = 'No record found', $fields = '', $isError = 1);
    }
});
/**
 * POST projectRangesPost
 * Summary: Creates a new project range
 * Notes: Creates a new project range
 * Output-Formats: [application/json]
 */
$app->POST('/api/v1/project_ranges', function ($request, $response, $args) {
    $args = $request->getParsedBody();
    $projectRange = new Models\ProjectRange;
    foreach ($args as $key => $arg) {
        if (!is_array($arg)) {
            $projectRange->{$key} = $arg;
        }
    }
    $result = array();
    try {
        $validationErrorFields = $projectRange->validate($args);
        if (empty($validationErrorFields)) {
            $projectRange->save();
            $result = $projectRange->toArray();
            return renderWithJson($result);
        } else {
            return renderWithJson($result, 'Project range could not be added. Please, try again.', $validationErrorFields, 1);
        }
    } catch (Exception $e) {
        return renderWithJson($result, 'Project range could not be added. Please, try again.', '', 1);
    }
})->add(new ACL('canCreateProjectRange'));
/**
 * DELETE projectRangesProjectRangeIdDelete
 * Summary: Delete project range
 * Notes: Deletes a single project range based on the ID supplied
 * Output-Formats: [application/json]
 */
$app->DELETE('/api/v1/project_ranges/{projectRangeId}', function ($request, $response, $args) {
    $projectRange = Models\ProjectRange::find($request->getAttribute('projectRangeId'));
    try {
        $projectRange->delete();
        $result = array(
            'status' => 'success',
        );
        return renderWithJson($result);
    } catch (Exception $e) {
        return renderWithJson($result, 'Project range could not be deleted. Please, try again.', '', 1);
    }
})->add(new ACL('canDeleteProjectRange'));
/**
 * GET projectRangesProjectRangeIdGet
 * Summary: Fetch project range
 * Notes: Returns a project range based on a single ID
 * Output-Formats: [application/json]
 */
$app->GET('/api/v1/project_ranges/{projectRangeId}', function ($request, $response, $args) {
    $result = array();
    $projectRange = Models\ProjectRange::find($request->getAttribute('projectRangeId'));
    if (!empty($projectRange)) {
        $result['data'] = $projectRange;
        return renderWithJson($result);
    } else {
        return renderWithJson($result, 'No record found', '', 1);
    }
})->add(new ACL('canViewProjectRange'));
/**
 * PUT projectRangesProjectRangeIdPut
 * Summary: Update project range by its id
 * Notes: Update project range by its id
 * Output-Formats: [application/json]
 */
$app->PUT('/api/v1/project_ranges/{projectRangeId}', function ($request, $response, $args) {
    $args = $request->getParsedBody();
    $projectRange = Models\ProjectRange::find($request->getAttribute('projectRangeId'));
    foreach ($args as $key => $arg) {
        if (!is_array($arg)) {
            $projectRange->{$key} = $arg;
        }
    }
    $result = array();
    try {
        $validationErrorFields = $projectRange->validate($args);
        if (empty($validationErrorFields)) {
            $projectRange->save();
            $result = $projectRange->toArray();
            return renderWithJson($result);
        } else {
            return renderWithJson($result, 'Project range could not be updated. Please, try again.', $validationErrorFields, 1);
        }
    } catch (Exception $e) {
        return renderWithJson($result, 'Project range could not be updated. Please, try again.', '', 1);
    }
})->add(new ACL('canUpdateProjectRange'));
/**
 * GET projectStatusesGet
 * Summary: Fetch all project statuses
 * Notes: Returns all project statuses from the system
 * Output-Formats: [application/json]
 */
$app->GET('/api/v1/project_statuses', function ($request, $response, $args) {
    $queryParams = $request->getQueryParams();
    $results = array();
    try {
        $projectStatuses = Models\ProjectStatus::Filter($queryParams)->paginate(PAGE_LIMIT)->toArray();
        $data = $projectStatuses['data'];
        unset($projectStatuses['data']);
        $results = array(
            'data' => $data,
            '_metadata' => $projectStatuses
        );
        return renderWithJson($results);
    } catch (Exception $e) {
        return renderWithJson($results, $message = 'No record found', $fields = '', $isError = 1);
    }
});
/**
 * GET projectAttachmentGet
 * Summary: Fetch all project attachment
 * Notes: Returns all project attachment from the system
 * Output-Formats: [application/json]
 */
$app->GET('/api/v1/project_attachment', function ($request, $response, $args) {
    global $authUser;
    $queryParams = $request->getQueryParams();
    $results = array();
    try {
        if ($queryParams['project_id']) {
            $project = Models\Project::find($queryParams['project_id']);
            if ($project && ($authUser['role_id'] == \Constants\ConstUserTypes::Admin || $authUser->id == $project->user_id || $project->freelancer_user_id == $authUser->id)) {
                $count = PAGE_LIMIT;
                if (!empty($queryParams['limit'])) {
                    $count = $queryParams['limit'];
                }
                $projectAttachment = Models\Attachment::whereIn('class', ['Project', 'ProjectDocument'])->where('foreign_id', $queryParams['project_id'])->Filter($queryParams)->paginate($count)->toArray();
                $data = $projectAttachment['data'];
                unset($projectAttachment['data']);
                $results = array(
                    'data' => $data,
                    '_metadata' => $projectAttachment
                );
                return renderWithJson($results);
            } else {
                return renderWithJson($results, $message = 'No record found', $fields = '', $isError = 1);
            }
        } else {
            return renderWithJson($results, $message = 'Project Id Missing', $fields = '', $isError = 1);
        }
    } catch (Exception $e) {
        return renderWithJson($results, $message = 'No record found', $fields = '', $isError = 1);
    }
})->add(new ACL('canListProjectAttachment'));
/**
 * POST projectAttachmentPost
 * Summary: Creates a new project attachment
 * Notes: Creates a new project attachment
 * Output-Formats: [application/json]
 */
$app->POST('/api/v1/project_attachment', function ($request, $response, $args) {
    global $authUser;
    $args = $request->getParsedBody();
    $result = array();
    try {
        if ($args['project_id']) {
            $project = Models\Project::where('project_status_id', \Constants\ProjectStatus::UnderDevelopment)->find($args['project_id']);
            if ($project && ($authUser['role_id'] == \Constants\ConstUserTypes::Admin || $authUser->id == $project->user_id || (isset($project->bid_winner->user_id) && $project->bid_winner->user_id == $authUser->id))) {
                if (!empty($args['files']) && is_array($args['files'])) {
                    $is_multi = 1;
                    $otherUserId = $project->freelancer_user_id;
                    $userId = $project->user_id;
                    if ($authUser->id == $project->freelancer_user_id) {
                        $otherUserId = $project->user_id;
                        $userId = $project->freelancer_user_id;
                    }
                    foreach ($args['files'] as $image) {
                        if ((!empty($image['file'])) && (file_exists(APP_PATH . '/media/tmp/' . $image['file']))) {
                            $attachment_id = saveImage('ProjectDocument', $image['file'], $project->id, $is_multi);
                            insertActivities($userId, $otherUserId, 'Attachment', $attachment_id, 0, 0, \Constants\ActivityType::ProjectAttachmentPosted, $args['project_id'], 0, 'Project');
                        }
                    }
                }
                $result = $project->toArray();
                return renderWithJson($result);
            } else {
                return renderWithJson($result, $message = 'Access Denied', $fields = '', $isError = 1);
            }
        } else {
            return renderWithJson($result, $message = 'Access Denied', $fields = '', $isError = 1);
        }
    } catch (Exception $e) {
        return renderWithJson($result, 'Project attachment could not be added. Please, try again.', '', 1);
    }
})->add(new ACL('canCreateProjectAttachment'));
/**
 * DELETE bidsBidIdDelete
 * Summary: Delete bid
 * Notes: Deletes a single bid based on the ID supplied
 * Output-Formats: [application/json]
 */
$app->DELETE('/api/v1/project_attachment/{attachmentId}', function ($request, $response, $args) {
    global $authUser;
    $result = array();
    try {
        $attachment = Models\Attachment::where('id', $request->getAttribute('attachmentId'))->whereIn('class', ['Project', 'ProjectDocument'])->first();
        if ($attachment) {
            $project = Models\Project::where('project_status_id', \Constants\ProjectStatus::UnderDevelopment)->find($attachment->foreign_id);
            if ($project && ($authUser['role_id'] == \Constants\ConstUserTypes::Admin || $authUser->id == $project->user_id || $project->bid_winner->user_id == $authUser->id)) {
                if (file_exists(APP_PATH . '/media/' . $attachment->class . '/' . $attachment->foreign_id . '/' . $attachment->filename)) {
                    unlink(APP_PATH . '/media/' . $attachment->class . '/' . $attachment->foreign_id . '/' . $attachment->filename);
                    $attachment->delete();
                    $result = array(
                        'status' => 'success',
                    );
                    return renderWithJson($result);
                } else {
                    return renderWithJson($result, $message = 'File Not Found', $fields = '', $isError = 1);
                }
            } else {
                return renderWithJson($result, $message = 'Access Denied', $fields = '', $isError = 1);
            }
        } else {
            return renderWithJson($result, 'Project Attachment could not be deleted. Please, try again.', '', 1);
        }
    } catch (Exception $e) {
        return renderWithJson($result, 'Bid could not be deleted. Please, try again.', '', 1);
    }
})->add(new ACL('canDeleteProjectAttachment'));
/**
 * GET bidStatusesGet
 * Summary: Fetch all bid statuses
 * Notes: Returns all bid statuses from the system
 * Output-Formats: [application/json]
 */
$app->GET('/api/v1/bid_statuses', function ($request, $response, $args) {
    $queryParams = $request->getQueryParams();
    $results = array();
    try {
        $bidStatuses = Models\BidStatus::Filter($queryParams)->paginate(PAGE_LIMIT)->toArray();
        $data = $bidStatuses['data'];
        unset($bidStatuses['data']);
        $results = array(
            'data' => $data,
            '_metadata' => $bidStatuses
        );
        return renderWithJson($results);
    } catch (Exception $e) {
        return renderWithJson($results, $message = 'No record found', $fields = '', $isError = 1);
    }
});
/**
 * DELETE bidsBidIdDelete
 * Summary: Delete bid
 * Notes: Deletes a single bid based on the ID supplied
 * Output-Formats: [application/json]
 */
$app->DELETE('/api/v1/bids/{bidId}', function ($request, $response, $args) {
    $bid = Models\Bid::find($request->getAttribute('bidId'));
    $result = array();
    try {
        if (!empty($bid)) {
            $bid->delete();
            $result = array(
                'status' => 'success',
            );
            return renderWithJson($result);
        } else {
            return renderWithJson($result, 'Bid could not be deleted. Please, try again.', '', 1);
        }
    } catch (Exception $e) {
        return renderWithJson($result, 'Bid could not be deleted. Please, try again.', '', 1);
    }
})->add(new ACL('canDeleteBid'));
/**
 * GET bidsBidIdGet
 * Summary: Fetch bid
 * Notes: Returns a bid based on a single ID
 * Output-Formats: [application/json]
 */
$app->GET('/api/v1/bids/{bidId}', function ($request, $response, $args) {
    $result = array();
    $enabledIncludes = array(
        'project_bid',
        'project',
        'user',
        'bid_status'
    );
    $bid = Models\Bid::with($enabledIncludes)->find($request->getAttribute('bidId'));
    if (!empty($bid)) {
        $result['data'] = $bid;
        return renderWithJson($result);
    } else {
        return renderWithJson($result, 'No record found', '', 1);
    }
})->add(new ACL('canViewBid'));
/**
 * PUT bidsBidIdPut
 * Summary: Update bid by its id
 * Notes: Update bid by its id
 * Output-Formats: [application/json]
 */
$app->PUT('/api/v1/bids/{bidId}', function ($request, $response, $args) {
    global $authUser, $_server_domain_url;
    $args = $request->getParsedBody();
    $result = array();
    $bid = Models\Bid::find($request->getAttribute('bidId'));
    $bids_allowed_field = array(
        "amount",
        "duration",
        "description",
        "is_freelancer_withdrawn"
    );
    $old_amount = $bid->amount;
    $old_description = $bid->description;
    $old_duration = $bid->duration;
    if (($bid->bid_status_id != \Constants\BidStatus::Pending && ($authUser['role_id'] != \Constants\ConstUserTypes::Admin || $authUser['role_id'] != \Constants\ConstUserTypes::Freelancer)) && (empty($args['is_freelancer_withdrawn']))) {
        return renderWithJson($result, 'Bid could not be updated. Please, try again.', '', 1);
    }
    if (!($authUser->role_id == \Constants\ConstUserTypes::Admin || ($bid->user_id == $authUser->id && $bid->project->project_status_id == \Constants\ProjectStatus::OpenForBidding))) {
        unset($args['is_freelancer_withdrawn']);
    }    
    $bid->fill($args);
    if ($old_amount != $bid->amount) {
        $amountValid = 0;
        if (!PROJECT_ALLOW_BID_AMOUNT_TO_WITH_IN_BUDGET) {
            $amountValid = 0;
        } else {
            if (!empty($bid->project->project_range) && ($bid->project->project_range->min_amount > $args['amount']) || ($args['amount'] > $bid->project->project_range->max_amount)) {
                $amountValid = 1;
            }
        }
        if (!empty($amountValid)) {
            return renderWithJson($result, "Amount must be in between the budget amount.", '', 1);
        }
    }
    try {
        $validationErrorFields = $bid->validate($args);
        if (empty($validationErrorFields)) {
            if ($bid->save()) {
                if (!empty($args['is_freelancer_withdrawn'])) {                   
                    insertActivities($bid->user_id, $bid->project->user_id, 'Bid', $bid->id, 0, 0, \Constants\ActivityType::ProjectBidFreelancerWithdrawn, $bid->project_id);
                    $employerDetails = getUserHiddenFields($bid->project->user_id);
                    $userDetails = getUserHiddenFields($bid->user_id);
                    $emailFindReplace = array(
                        '##USERNAME##' => ucfirst($employerDetails->username) ,
                        '##FREELANCER_USERNAME##' => ucfirst($userDetails->username) ,
                        '##BUYER_USERNAME##' => ucfirst($userDetails->username) ,
                        '##PROJECT_NAME##' => ucfirst($bid->project->name),
                        '##PROJECT_LINK##' => $_server_domain_url . '/projects/view/' . $bid->project->id . '/' . $bid->project->slug 
                    );
                    sendMail('Bid Withdraw Notification', $emailFindReplace, $employerDetails->email);                    
                }
                $newAmount = $bid->amount;
                $newDescription = $bid->description;
                $newDuration = $bid->duration;
                if($old_amount != $newAmount || $old_description != $newDescription || $old_duration != $newDuration){
                    $freelancerDetails = getUserHiddenFields($bid->project->user_id);
                    $userDetails = getUserHiddenFields($bid->user_id);
                            $emailFindReplace = array(
                                '##USERNAME##' =>ucfirst($userDetails->username) ,
                                '##PROJECT_NAME##' =>ucfirst($bid->project->slug),
                                '##FREELANCER_USERNAME##' =>ucfirst($freelancerDetails->username) ,
                                '##AMOUNT##' =>$bid->amount,
                                '##DURATION##' => $bid->duration,
                                '##BUYER_USERNAME##' => ucfirst($userDetails->username) ,
                                '##PROJECT_LINK##' => $_server_domain_url . '/projects/view/' . $bid->project->id . '/' . $bid->project->slug 
                            );
                            sendMail('Update Bid Notification', $emailFindReplace, $userDetails->email);
                }

                $result = $bid->toArray();
                return renderWithJson($result);
            } else {
                return renderWithJson($result, 'Access denied.', '', 2);
            }
        } else {
            return renderWithJson($result, 'Bid could not be updated. Please, try again.', $validationErrorFields, 1);
        }
    } catch (Exception $e) {
        return renderWithJson($result, 'Bid could not be updated. Please, try again.', '', 1);
    }
})->add(new ACL('canUpdateBid'));
/**
 * GET bidsGet
 * Summary: Fetch all bids
 * Notes: Returns all bids from the system
 * Output-Formats: [application/json]
 */
$app->GET('/api/v1/bids', function ($request, $response, $args) {
    global $authUser;
    $queryParams = $request->getQueryParams();
    $results = array();
    $count = PAGE_LIMIT;
    try {
        if (!empty($queryParams['limit'])) {
            $count = $queryParams['limit'];
        }
        $enabledIncludes = array(
            'project',
            'project_bid',
            'user',
            'bid_status'
        );
        $bids = Models\Bid::with($enabledIncludes);
        $bids = $bids->Filter($queryParams)->paginate($count)->toArray();
        $data = $bids['data'];
        unset($bids['data']);
        if (!empty($authUser) && $authUser['role_id'] != \Constants\ConstUserTypes::Admin) {
            foreach ($data as $key => $bid) {
                if ($authUser['id'] != $bid['project']['user_id'] && ($bid['project']['is_hidded_bid'] == 1 && $authUser['id'] != $bid['user_id'])) {
                    unset($data[$key]);
                }
            }
            $bids['total'] = count($data);
        }
        if ((isPluginEnabled('Bidding/Exam'))) {
            foreach ($data as $key => $bid) {
                $examsUser = Models\ExamsUser::with('exam')->where('user_id', $bid['user_id'])->where('exams_users.exam_status_id', \Constants\ExamStatus::Passed);
                $examsUser = $examsUser->get();
                if (!empty($examsUser)) {
                    $data[$key]['exams_users'] = $examsUser->toArray();
                }
            }
        }
        $results = array(
            'data' => $data,
            '_metadata' => $bids
        );
        return renderWithJson($results);
    } catch (Exception $e) {
        return renderWithJson($results, $message = 'No record found', $fields = '', $isError = 1);
    }
})->add(new ACL('canListBid'));
/**
 * POST bidsPost
 * Summary: Creates a new bid
 * Notes: Creates a new bid
 * Output-Formats: [application/json]
 */
$app->POST('/api/v1/bids', function ($request, $response, $args) {
    global $authUser, $_server_domain_url;
    $args = $request->getParsedBody();
    $bid = new Models\Bid($args);
    $result = array();
    if (!in_array($authUser->role_id, [\Constants\ConstUserTypes::User, \Constants\ConstUserTypes::Freelancer]) && $authUser->role_id != \Constants\ConstUserTypes::Admin) {
        return renderWithJson($result, 'Employer could not be added the bid.', '', 1);
    }
    try {
        $project = Models\Project::where('id', $args['project_id'])->where('project_status_id', \Constants\ProjectStatus::OpenForBidding)->where('is_active', true)->with(array(
            'project_bid' => function ($q1) use ($authUser) {
                return $q1->where('is_active', true);
            }
        ))->with(array(
            'bid' => function ($q1) use ($authUser) {
                return $q1->where('user_id', $authUser->id);
            }
        ))->with(array(
            'project_range'
        ))->first();
        if (empty($project) || (!empty($project->bid[0]))) {
            return renderWithJson($result, "You're not eligible to access", '', 1);
        }
        $amountValid = 0;
        if (!PROJECT_ALLOW_BID_AMOUNT_TO_WITH_IN_BUDGET) {
            $amountValid = 0;
        } else {
            if (!empty($project->project_range) && ($project->project_range->min_amount > $args['amount']) || ($args['amount'] > $project->project_range->max_amount)) {
                $amountValid = 1;
            }
        }
        if (!empty($amountValid)) {
            return renderWithJson($result, "Amount must be in between the budget amount.", '', 1);
        }
        $bid->user_id = $authUser->id;
        $bid->bid_status_id = \Constants\BidStatus::Pending;
        $bid->project_bid_id = $project->project_bid->id;
        $validationErrorFields = $bid->validate($args);
        if (empty($validationErrorFields)) {
            if ((isPluginEnabled('Common/Subscription')) && CREDIT_POINT_FOR_BIDDING_A_PROJECT > 0) {
                $user = Models\User::find($authUser->id);
                $user = $user->makeVisible('available_credit_count');
                if ($user->available_credit_count >= CREDIT_POINT_FOR_BIDDING_A_PROJECT) {
                    $bidCreditPurchaseLog = Models\CreditPurchaseLog::with('quote_credit_purchase_plan')->where('user_id', $authUser['id'])->where('is_active', true)->where('is_payment_completed', true)->first();
                    if ($bidCreditPurchaseLog) {
                        $user->available_credit_count = $user->available_credit_count - CREDIT_POINT_FOR_BIDDING_A_PROJECT;
                        $user->save();
                        $bid->credit_purchase_log_id = $bidCreditPurchaseLog->id;
                        $bidCreditPurchaseLog->used_credit_count = $bidCreditPurchaseLog->used_credit_count + CREDIT_POINT_FOR_BIDDING_A_PROJECT;
                        if ($bidCreditPurchaseLog->used_credit_count >= $bidCreditPurchaseLog->credit_count) {
                            $bidCreditPurchaseLog->is_active = 0;
                            $emailFindReplace = array(
                                '##USER##' => ucfirst($user->username) ,
                                '##PLAN_NAME##' => $bidCreditPurchaseLog->quote_credit_purchase_plan->name
                            );
                            sendMail('Credit plan expired', $emailFindReplace, $user->email);
                        }
                        $bidCreditPurchaseLog->save();
                    }
                } else {
                    return renderWithJson($result, "You don't have enough amount in your available credit count.", '', 1);
                }
            }
            if ($bid->save()) {  
                $otherUserId = $bid->user_id;
                $userId = $project->user_id;
                if ($authUser->id == $bid->user_id) {
                    $otherUserId = $project->user_id;
                    $userId = $bid->user_id;
                }                
                insertActivities($userId, $otherUserId, 'Bid', $bid->id, 0, 0, \Constants\ActivityType::ProjectBidPosted, $bid->project_id);
                $userDetails = getUserHiddenFields($project->user_id);
                $freelancerDetails = getUserHiddenFields($bid->user_id);
                $emailFindReplace = array(
                    '##USERNAME##' =>ucfirst($userDetails->username) ,
                    '##PROJECT_NAME##' =>ucfirst($project->slug),
                    '##FREELANCER_USERNAME##' =>ucfirst($freelancerDetails->username) ,
                    '##AMOUNT##' =>$bid->amount,
                    '##DURATION##' => $bid->duration,
                    '##PROJECT_LINK##' => $_server_domain_url . '/projects/view/' . $project->id . '/' . $project->slug 
                );
                sendMail('New Bid Notification', $emailFindReplace, $userDetails->email);

                $result = $bid->toArray();
                return renderWithJson($result);
            } else {
                return renderWithJson($result, 'Access denied.', '', 2);
            }
        } else {
            return renderWithJson($result, 'Bid could not be added. Please, try again.', $validationErrorFields, 1);
        }
    } catch (Exception $e) {
        return renderWithJson($result, 'Bid could not be added. Please, try again.', '', 1);
    }
})->add(new ACL('canCreateBid'));
/**
 * GET employerEmployerIdBidsGet
 * Summary: Fetch all bids
 * Notes: Returns all bids from the system
 * Output-Formats: [application/json]
 */
$app->GET('/api/v1/employer/{employerId}/bids', function ($request, $response, $args) {
    $queryParams = $request->getQueryParams();
    global $authUser;
    $project = Models\Project::select('id')->where('user_id', $authUser['id'])->get()->toArray();
    $results = array();
    try {
        $count = PAGE_LIMIT;
        if (!empty($queryParams['limit'])) {
            $count = $queryParams['limit'];
        }
        $enabledIncludes = array(
            'project_bid',
            'project',
            'user',
            'bid_status'
        );
        $bids = Models\Bid::with($enabledIncludes)->whereIn('project_id', $project)->Filter($queryParams)->paginate($count)->toArray();
        $data = $bids['data'];
        unset($bids['data']);
        $results = array(
            'data' => $data,
            '_metadata' => $bids
        );
        return renderWithJson($results);
    } catch (Exception $e) {
        return renderWithJson($results, $message = 'No record found', $fields = '', $isError = 1);
    }
})->add(new ACL('canListEmployerBid'));
/**
 * GET meBidsGet
 * Summary: Fetch all bids
 * Notes: Returns all bids from the system
 * Output-Formats: [application/json]
 */
$app->GET('/api/v1/me/bids', function ($request, $response, $args) {
    global $authUser;
    if (!empty($authUser)) {
        $result = array();
        $queryParams = $request->getQueryParams();
        $count = PAGE_LIMIT;
        if (!empty($queryParams['limit'])) {
            $count = $queryParams['limit'];
        }
        $enabledIncludes = array(
            'project_bid',
            'project',
            'bid_status'
        );
        $bids = Models\Bid::with($enabledIncludes)->where('bids.user_id', $authUser['id'])->where('bids.is_freelancer_withdrawn', false)->Filter($queryParams)->paginate($count)->toArray();
        if (!empty($bids)) {
            $data = $bids['data'];
            unset($bids['data']);
            $results = array(
                'data' => $data,
                '_metadata' => $bids
            );
            return renderWithJson($results);
        } else {
            return renderWithJson($result, 'No record found', '', 1);
        }
    } else {
        return renderWithJson($result, 'Your not have Bids', '', 1);
    }
})->add(new ACL('canListMyBid'));
/**
 * PUT bidsBidIdUpdateStatusPut
 * Summary: Update bid by its id
 * Notes: Update bid by its id
 * Output-Formats: [application/json]
 */
$app->PUT('/api/v1/bids/{bidId}/update_status', function ($request, $response, $args) {
    global $authUser, $_server_domain_url;
    $args = $request->getParsedBody();
    $enabledIncludes = array(
        'project'
    );
    $bid = Models\Bid::with($enabledIncludes)->find($request->getAttribute('bidId'));
    $result = array();
    if (!empty($bid) && (!empty($args['bid_status_id']) && ($args['bid_status_id'] != $bid->bid_status_id || !empty($args['new_winer_bid_id'])) || !empty($args['is_offered_rejected']))) {
        $bid = $bid->toArray();
        if ($authUser->role_id == \Constants\ConstUserTypes::Admin || $bid['project']['user_id'] == $authUser->id) {
            $wonProjectArray = array(
                \Constants\ProjectStatus::OpenForBidding,
                \Constants\ProjectStatus::BiddingClosed,
                \Constants\ProjectStatus::WinnerSelected
            );
            $lostProjectArray = array(
                \Constants\ProjectStatus::WinnerSelected
            );
            if ($args['bid_status_id'] == \Constants\BidStatus::Won && in_array($bid['project']['project_status_id'], $wonProjectArray)) {
                if (!empty($args['new_winer_bid_id'])) {
                    if (PROJECT_WITHDRAW_FREELANCER_DAYS) {
                        $withdraw_date = date('Y-m-d h:i:s', strtotime($bid['created_at'] . "+" . PROJECT_WITHDRAW_FREELANCER_DAYS . " days"));
                        if (date('Y-m-d h:i:s') < $withdraw_date) {
                            return renderWithJson($result, "You're not eligible to withdrawn. Please try again after the date: " . date('Y F d', strtotime($withdraw_date)), '', 1);
                        }
                    }
                    if ($bid['bid_status_id'] == \Constants\BidStatus::Won) {
                        Models\User::where('id', $bid['project']['user_id'])->decrement('won_bid_count', 1);
                        Models\Bid::where('id', $bid['id'])->update(array(
                            'bid_status_id' => \Constants\BidStatus::Lost,
                            'is_withdrawn' => 1
                        ));
                    }
                    $newBid = Models\Bid::with($enabledIncludes)->find($args['new_winer_bid_id']);
                    $oldnewBidStatus = $newBid->bid_status_id;
                    $user = Models\User::select('available_wallet_amount', 'username')->where('id', $newBid->project->user_id)->first();
                    $user->makeVisible(array(
                        'available_wallet_amount'
                    ));
                    Models\Bid::where('id', $args['new_winer_bid_id'])->update(array(
                        'bid_status_id' => \Constants\BidStatus::Won,
                        'winner_selected_date' => date('Y-m-d h:i:s')
                    ));
                    $userDetails = getUserHiddenFields($newBid->user_id);
                    $bidStatus = Models\BidStatus::where('id', \Constants\BidStatus::Won)->first();
                    $emailFindReplace = array(
                        '##USERNAME##' => ucfirst($userDetails->username) ,
                        '##BID_STATUS##' => ucfirst($bidStatus->name),
                        '##PROJECT_NAME##' => ucfirst($newBid->project->title),
                        '##PROJECT_LINK##' => $_server_domain_url . '/projects/view/' . $newBid->project->id . '/' . $newBid->project->slug 
                    );
                    sendMail('Bid Notification', $emailFindReplace, $userDetails->email);                     
                    Models\Bid::where('id', '!=', $args['new_winer_bid_id'])->where('project_id', $newBid->project_id)->update(array(
                        'bid_status_id' => \Constants\BidStatus::Lost,
                        'winner_selected_date' => date('Y-m-d h:i:s')
                    ));
                    $lostBids = Models\Bid::where('id', '!=', $args['new_winer_bid_id'])->where('project_id', $newBid->project_id)->get();
                    $bidStatus = Models\BidStatus::where('id', \Constants\BidStatus::Lost)->first();
                    if (!empty($lostBids)) {
                        foreach ($lostBids as $lostBid) {
                            $userDetails = getUserHiddenFields($lostBid->user_id);
                            $emailFindReplace = array(
                                '##USERNAME##' => ucfirst($userDetails->username) ,
                                '##BID_STATUS##' => ucfirst($bidStatus->name),
                                '##PROJECT_NAME##' => ucfirst($newBid->project->title),
                                '##PROJECT_LINK##' => $_server_domain_url . '/projects/view/' . $newBid->project->id . '/' . $newBid->project->slug 
                            );
                            sendMail('Bid Notification', $emailFindReplace, $userDetails->email);                          
                        }                         
                    }                   
                    $projectBid = array(
                        'user_id' => $newBid->user_id,
                        'is_closed' => 1,
                        'amount' => $newBid->amount,
                        'duration' => $newBid->duration,
                        'closed_date' => date('Y-m-d h:i:s')
                    );
                    Models\ProjectBid::where('id', $newBid->project_bid_id)->update($projectBid);
                    $projectUpdate = array(
                        'project_status_id' => \Constants\ProjectStatus::WinnerSelected,
                        'freelancer_user_id' => $newBid->user_id
                    );
                    $otherUserId = $newBid->user_id;
                    $userId = $newBid->project->user_id;
                    if ($authUser->id == $newBid->user_id) {
                        $otherUserId = $newBid->project->user_id;
                        $userId = $newBid->user_id;
                    }
                    Models\Project::where('id', $newBid->project_id)->update($projectUpdate);
                    Models\Project::ProjectStatusCountUpdation(\Constants\ProjectStatus::WinnerSelected);
                    Models\User::where('id', $newBid->user_id)->increment('won_bid_count', 1);
                    insertActivities($userId, $otherUserId, 'Bid', $newBid->id, $oldnewBidStatus, \Constants\BidStatus::Won, \Constants\ActivityType::ProjectBidStatusChanged, $newBid->project_id);
                    insertActivities($newBid->project->user_id, 0, 'Project', $newBid->project_id, 0, 0, \Constants\ActivityType::ProjectWinnerSelected, $newBid->project_id);                    
                    $enabledIncludes = array(
                        'project',
                        'user',
                        'bid_status'
                    );
                    $newBid = Models\Bid::with($enabledIncludes)->find($args['new_winer_bid_id']);
                    $result['data'] = $newBid;
                    return renderWithJson($result);
                } else {
                    Models\Bid::where('id', $request->getAttribute('bidId'))->update(array(
                        'bid_status_id' => \Constants\BidStatus::Won,
                        'winner_selected_date' => date('Y-m-d h:i:s')
                    ));
                    
                    $userDetails = getUserHiddenFields($bid['user_id']);
                    $bidStatus = Models\BidStatus::where('id', \Constants\BidStatus::Won)->first();
                    $emailFindReplace = array(
                        '##USERNAME##' => ucfirst($userDetails->username) ,
                        '##BID_STATUS##' => ucfirst($bidStatus->name),
                        '##PROJECT_NAME##' => ucfirst($bid['project']['name']),
                        '##PROJECT_LINK##' => $_server_domain_url . '/projects/view/' . $bid['project']['id'] . '/' . $bid['project']['slug'] 
                    );
                    sendMail('Bid Notification', $emailFindReplace, $userDetails->email);                      
                    Models\Bid::where('id', '!=', $request->getAttribute('bidId'))->where('project_id', $bid['project_id'])->update(array(
                        'bid_status_id' => \Constants\BidStatus::Lost,
                        'winner_selected_date' => date('Y-m-d h:i:s')
                    ));
                    $lostBids = Models\Bid::where('id', '!=', $request->getAttribute('bidId'))->where('project_id', $bid['project_id'])->get();
                    $bidStatus = Models\BidStatus::where('id', \Constants\BidStatus::Lost)->first();
                    if (!empty($lostBids)) {
                        foreach ($lostBids as $lostBid) {
                            $userDetails = getUserHiddenFields($lostBid->user_id);
                            $emailFindReplace = array(
                                '##USERNAME##' => ucfirst($userDetails->username) ,
                                '##BID_STATUS##' => ucfirst($bidStatus->name),
                                '##PROJECT_NAME##' => ucfirst($bid['project']['name']),
                                '##PROJECT_LINK##' => $_server_domain_url . '/projects/view/' . $bid['project']['id'] . '/' . $bid['project']['slug'] 
                            );
                            sendMail('Bid Notification', $emailFindReplace, $userDetails->email);                          
                        }   
                    }                   
                    $projectBid = array(
                        'user_id' => $bid['user_id'],
                        'is_closed' => 1,
                        'amount' => $bid['amount'],
                        'duration' => $bid['duration'],
                        'closed_date' => date('Y-m-d h:i:s')
                    );
                    Models\ProjectBid::where('id', $bid['project_bid_id'])->update($projectBid);
                    $project = array(
                        'project_status_id' => \Constants\ProjectStatus::WinnerSelected,
                        'freelancer_user_id' => $bid['user_id']
                    );
                    $otherUserId = $bid['user_id'];
                    $userId = $bid['project']['user_id'];
                    if ($authUser->id == $bid['user_id']) {
                        $otherUserId = $bid['project']['user_id'];
                        $userId = $bid['user_id'];
                    }
                    Models\Project::where('id', $bid['project_id'])->update($project);
                    insertActivities($userId, $otherUserId, 'Bid', $bid['id'], $bid['bid_status_id'], \Constants\BidStatus::Won, \Constants\ActivityType::ProjectBidStatusChanged, $bid['project_id']);
                    insertActivities($bid['project']['user_id'], 0, 'Project', $bid['project_id'], $bid['project']['project_status_id'], \Constants\ProjectStatus::WinnerSelected, \Constants\ActivityType::ProjectWinnerSelected, $bid['project_id']);                    
                    Models\Project::ProjectStatusCountUpdation(\Constants\ProjectStatus::WinnerSelected);
                    Models\User::where('id', $bid['user_id'])->increment('won_bid_count', 1);
                    //@Todo Boopathi send mail
                    $enabledIncludes = array(
                        'project',
                        'user',
                        'bid_status'
                    );
                    $bid = Models\Bid::with($enabledIncludes)->find($bid['id']);
                    $result['data'] = $bid;
                    return renderWithJson($result);
                }
            } elseif ($args['bid_status_id'] == \Constants\BidStatus::Lost && in_array($bid['project']['project_status_id'], $lostProjectArray) && $bid['bid_status_id'] == \Constants\BidStatus::Won) {
                $projectbid = Models\ProjectBid::where('id', $bid['project_bid_id'])->where('is_active', 1)->first();
                if (!empty($projectbid)) {
                    $projectbid = $projectbid->toArray();
                    Models\Bid::where('id', $bid['id'])->update(array(
                        'bid_status_id' => \Constants\BidStatus::Lost,
                        'is_withdrawn' => 1
                    ));
                    Models\Project::where('id', $bid['project_id'])->update(array(
                        'project_status_id' => \Constants\ProjectStatus::BiddingClosed
                    ));
                    Models\Project::ProjectStatusCountUpdation(\Constants\ProjectStatus::BiddingClosed);
                }
                $otherUserId = $bid['user_id'];
                $userId = $bid['project']['user_id'];
                if ($authUser->id == $bid['user_id']) {
                    $otherUserId = $bid['project']['user_id'];
                    $userId = $bid['user_id'];
                }
                $adminId = Models\User::select('id')->where('role_id', \Constants\ConstUserTypes::Admin)->first();
                insertActivities($userId, $otherUserId, 'Bid', $bid['id'], $bid['bid_status_id'], \Constants\BidStatus::Lost, \Constants\ActivityType::ProjectBidStatusChanged, $bid['project_id']);
                insertActivities($adminId['id'], $bid['project']['user_id'], 'Project', $bid['project_id'], $bid['project']['project_status_id'], \Constants\ProjectStatus::BiddingClosed, \Constants\ActivityType::ProjectStatusChanged, $bid['project_id']);                
                $enabledIncludes = array(
                    'project',
                    'user',
                    'bid_status'
                );
                $bid = Models\Bid::with($enabledIncludes)->find($bid['id']);
                $result['data'] = $bid;
                return renderWithJson($result);
            } else {
                return renderWithJson($result, 'Status could not be updated. Please, try again.', '', 1);
            }
        } elseif (!empty($args['is_offered_rejected']) && $bid['bid_status_id'] == \Constants\BidStatus::Won && ($authUser->role_id == \Constants\ConstUserTypes::Admin || $bid['user_id'] == $authUser->id)) {
            $projectbid = Models\ProjectBid::where('id', $bid['project_bid_id'])->where('is_active', 1)->first();
            if (!empty($projectbid)) {
                $today = date('Y-m-d');
                $projectbid->bidding_end_date;
                if ($today >= $projectbid->bidding_end_date) {
                    $project_status_id = \Constants\ProjectStatus::BiddingClosed;
                } else {
                    $project_status_id = \Constants\ProjectStatus::OpenForBidding;
                }
                Models\Bid::where('id', $bid['id'])->update(array(
                    'bid_status_id' => \Constants\BidStatus::Lost,
                    'is_offered_rejected' => 1
                ));
                $employerDetails = getUserHiddenFields($bid['project']['user_id']);
                $userDetails = getUserHiddenFields($bid['user_id']);
                $emailFindReplace = array(
                    '##USERNAME##' => ucfirst($employerDetails->username) ,
                    '##BUYER_USERNAME##' => ucfirst($userDetails->username) ,
                    '##PROJECT_NAME##' => ucfirst($bid['project']['name']),
                    '##PROJECT_LINK##' => $_server_domain_url . '/projects/view/' . $bid['project']['id'] . '/' . $bid['project']['slug'] 
                );
                sendMail('Winner Reject Notification', $emailFindReplace, $employerDetails->email);                  
                $otherUserId = $bid['user_id'];
                $userId = $bid['project']['user_id'];
                if ($authUser->id == $bid['user_id']) {
                    $otherUserId = $bid['project']['user_id'];
                    $userId = $bid['user_id'];
                }
                Models\Project::where('id', $bid['project_id'])->update(array(
                    'project_status_id' => $project_status_id
                ));
                insertActivities($userId, $otherUserId, 'Bid', $bid['id'], $bid['bid_status_id'], \Constants\BidStatus::Lost, \Constants\ActivityType::ProjectBidStatusChanged, $bid['project_id']);
                insertActivities($bid['project']['user_id'], 0, 'Project', $bid['project_id'], $bid['project']['project_status_id'], $project_status_id, \Constants\ActivityType::ProjectStatusChanged, $bid['project_id']);        
                Models\Project::ProjectStatusCountUpdation($project_status_id);
                $enabledIncludes = array(
                    'project',
                    'user',
                    'bid_status'
                );
                $bid = Models\Bid::with($enabledIncludes)->find($bid['id']);
                $result['data'] = $bid;
                return renderWithJson($result);
            } else {
                return renderWithJson($result, 'Status could not be updated. Please, try again.', '', 1);
            }
        } else {
            return renderWithJson($result, "You're not eligible to access", '', 1);
        }
    } else {
        return renderWithJson($result, 'Status could not be updated. Please, try again.', '', 1);
    }
})->add(new ACL('canUpdateBidUpdateStatus'));
/**
 * PUT bidsBidIdPaymentEscrowPut
 * Summary: Update bid by its id
 * Notes: Update bid by its id
 * Output-Formats: [application/json]
 */
$app->PUT('/api/v1/bids/{bidId}/payment_escrow', function ($request, $response, $args) {
    global $authUser;
    $args = $request->getParsedBody();
    $result = array();
    try {
        $enabledIncludes = array(
            'project'
        );
        $bid = Models\Bid::with($enabledIncludes)->find($request->getAttribute('bidId'));
        $project_user = Models\User::where('id', $bid->project->user_id)->first();
        if ($authUser->role_id != \Constants\ConstUserTypes::Admin && $authUser->id != $bid->project->user_id) {
            return renderWithJson($result, 'Invalid User', '', 1);
        }
        // check Employer wallet amount greater than new amount
        if (!empty($args['new_amount']) && $args['new_amount'] > $project_user->available_wallet_amount) {
            return renderWithJson($result, 'Payment escrow could not be updated. Please, try again.', '', 1);
        } else {
            $bid->total_escrow_amount+= $args['new_amount'];
            $bid->paid_escrow_amount+= $args['new_amount'];
            $bid->save();
        }
        // Milestone id related code
        if (!empty($args['milestone_id'])) {
            $milestone = Models\Milestone::where('id', $args['milestone_id'])->first();
            if ($milestone->milestone_status_id == \Constants\MilestoneStatus::RequestedForEscrow && $milestone->amount <= $bid->paid_escrow_amount) {
                // Update bid escrow amount
                $bid->paid_escrow_amount-= $milestone->amount;
                $bid->amount_in_escrow+= $milestone->amount;
                $bid->save();
                // Update milestone status
                Models\Milestone::where('id', $args['milestone_id'])->update(array(
                    'milestone_status_id' => \Constants\MilestoneStatus::EscrowFunded
                ));
            }
        }
        $result = $bid->toArray();
        return renderWithJson($result);
    } catch (Exception $e) {
        return renderWithJson($result, 'Payment escrow could not be updated. Please, try again.', '', 1);
    }
})->add(new ACL('canUpdatePaymentEscrow'));
/**
 * GET usersUserIdActiveProjectsGet
 * Summary: Fetch all projects
 * Notes: Returns all active projects from the system
 * Output-Formats: [application/json]
 */
$app->GET('/api/v1/users/{userId}/active_projects', function ($request, $response, $args) {
    $queryParams = $request->getQueryParams();
    $results = array();
    try {
        $count = PAGE_LIMIT;
        if (!empty($queryParams['limit'])) {
            $count = $queryParams['limit'];
        }
        $activeProjects = Models\Project::Filter($queryParams)->where('user_id', $request->getAttribute('userId'))->where('project_status_id', \Constants\ProjectStatus::OpenForBidding)->paginate($count)->toArray();
        $data = $activeProjects['data'];
        unset($activeProjects['data']);
        $results = array(
            'data' => $data,
            '_metadata' => $activeProjects
        );
        return renderWithJson($results);
    } catch (Exception $e) {
        return renderWithJson($results, $message = 'No record found', $fields = '', $isError = 1);
    }
})->add(new ACL('canListActiveProject'));
/**
 * GET bidsBidIdDisputeOpenTypesGet
 * Summary: Fetch all bids
 * Notes: Returns all bids from the system
 * Output-Formats: [application/json]
 */
$app->GET('/api/v1/bids/{bidId}/dispute_open_types', function ($request, $response, $args) {
    global $authUser;
    $queryParams = $request->getQueryParams();
    $result = array();
    try {
        $count = PAGE_LIMIT;
        if (!empty($queryParams['limit'])) {
            $count = $queryParams['limit'];
        }
        $bid = Models\Bid::with(['project', 'project_bid', 'project_dispute' => function ($q) {
            return $q->where('dispute_status_id', '!=', \Constants\ConstDisputeStatus::Closed);
        }
        ])->find($request->getAttribute('bidId'));
        if (!empty($bid)) {
            if (!empty($bid) && ($authUser->role_id == \Constants\ConstUserTypes::Admin || ($bid->project->user_id == $authUser->id || $bid->user_id == $authUser->id))) {
                $disputeOpenTypes = new Models\DisputeOpenType;
                if ($bid->project->user_id == $authUser->id) {
                    $disputeOpenTypes = $disputeOpenTypes->where('project_role_id', \Constants\ConstUserTypes::Employer);
                } elseif ($bid->user_id == $authUser->id) {
                    $disputeOpenTypes = $disputeOpenTypes->where('project_role_id', \Constants\ConstUserTypes::Freelancer);
                }
                $dispute_ids = array();
                if ($bid->project->project_status_id == \Constants\ProjectStatus::UnderDevelopment || $bid->project->project_status_id == \Constants\ProjectStatus::Completed) {
                    array_push($dispute_ids, \Constants\ConstDisputeOpenType::EmployerGiveMoreWorks);
                    array_push($dispute_ids, \Constants\ConstDisputeOpenType::FreelancerWorkNotMatchesRequirement);
                }
                if ($bid->project->project_status_id == \Constants\ProjectStatus::Closed || $bid->project->project_status_id == \Constants\ProjectStatus::FinalReviewPending) {
                    array_push($dispute_ids, \Constants\ConstDisputeOpenType::EmployerGivePoorRating);
                    array_push($dispute_ids, \Constants\ConstDisputeOpenType::FreelancerGivePoorRating);
                }
                if (!empty($dispute_ids)) {
                    $disputeOpenTypes = $disputeOpenTypes->whereIn('id', $dispute_ids);
                }
                $disputeOpenTypes = $disputeOpenTypes->paginate($count)->toArray();
                if (!empty($bid->project_dispute)) {
                    return renderWithJson($result, "Current dispute for this project hasn\'t been closed yet. Only one dispute at a time for a project is possible.", '', 1);
                }
                $data = $disputeOpenTypes['data'];
                unset($disputeOpenTypes['data']);
                $result = array(
                    'data' => $data,
                    '_metadata' => $disputeOpenTypes
                );
            }
        }
        return renderWithJson($result);
    } catch (Exception $e) {
        return renderWithJson($result, $message = 'No record found', $fields = '', $isError = 1);
    }
})->add(new ACL('canListDisputeOpenType'));
/**
 * GET projectStats
 * Summary: Fetch all bids
 * Notes: Returns all bids from the system
 * Output-Formats: [application/json]
 */
$app->GET('/api/v1/bids/{userId}/project_stats', function ($request, $response, $args) {
    $user_id = $request->getAttribute('userId');
    $user = Models\User::find($user_id);
    if (!empty($user)) {
        $result = array();
        $onTimeCount = 0;
        $onBudgetCount = 0;
        $repeatHireRateCount = 0;
        $completedCount = ($user->project_completed_count / ($user->project_completed_count + $user->project_failed_count) * 100);
        $result['job_completed'] = round($completedCount);
        $onTimeProjectBids = Models\Bid::where('user_id', $user_id)->where('bid_status_id', \Constants\BidStatus::Won)->whereHas('project', function ($q) {
            $q->whereIn('project_status_id', [\Constants\ProjectStatus::FinalReviewPending, \Constants\ProjectStatus::Closed]);
        })->whereHas('project_bid', function ($q) {
            $q->where('is_active', 1);
        })->get();
        if (!empty($onTimeProjectBids)) {
            $onTimeProjectSuccess = 0;
            foreach ($onTimeProjectBids as $onTimeProjectBid) {
                $date1 = date_create($onTimeProjectBid->development_start_date);
                $date2 = date_create($onTimeProjectBid->development_end_date);
                $diff = date_diff($date1, $date2);
                $takenDays = $diff->format("%a");
                if ($takenDays <= $onTimeProjectBid->duration) {
                    $onTimeProjectSuccess = $onTimeProjectSuccess + 1;
                }
            }
            $onTimeCount = ($onTimeProjectSuccess / count($onTimeProjectBids) * 100);
        }
        $result['on_time'] = round($onTimeCount);
        $onBudgetProjectBids = Models\Bid::where('user_id', $user_id)->where('bid_status_id', \Constants\BidStatus::Won)->whereHas('project', function ($q) {
            $q->whereIn('project_status_id', [\Constants\ProjectStatus::FinalReviewPending, \Constants\ProjectStatus::Closed]);
        })->whereHas('project_bid', function ($q) {
            $q->where('is_active', 1);
        })->get();
        if (!empty($onBudgetProjectBids)) {
            $onBudgetProjectSuccess = 0;
            foreach ($onBudgetProjectBids as $onBudgetProjectBid) {
                if (($onBudgetProjectBid->paid_escrow_amount + $onBudgetProjectBid->total_invoice_got_paid) <= $onBudgetProjectBid->amount) {
                    $onBudgetProjectSuccess = $onBudgetProjectSuccess + 1;
                }
            }
            $onBudgetCount = ($onBudgetProjectSuccess / count($onBudgetProjectBids) * 100);
        }
        $result['on_budget'] = round($onBudgetCount);
        $passibleStatus = array(
            \Constants\ProjectStatus::UnderDevelopment,
            \Constants\ProjectStatus::FinalReviewPending,
            \Constants\ProjectStatus::Completed,
            \Constants\ProjectStatus::Closed
        );
        $enabledIncludes = array(
            'project'
        );
        $repeatHireRates = Models\Bid::with($enabledIncludes)->where('user_id', $user_id)->where('bid_status_id', \Constants\BidStatus::Won)->whereHas('project', function ($q) use ($passibleStatus) {
            $q->whereIn('project_status_id', $passibleStatus);
        })->whereHas('project_bid', function ($q) {
            $q->where('is_active', 1);
        })->get();
        if (!empty($repeatHireRates)) {
            $onBudgetProjectSuccess = 0;
            $projectArray = array();
            foreach ($repeatHireRates as $repeatHireRate) {
                $projectArray[] = $repeatHireRate->project->toArray();
            }
            $projectUserArray = array_count_values(array_column($projectArray, 'user_id'));
            $projectUserArray = array_filter($projectUserArray, function ($n) {
                return $n >= 1;
            });
            $repeatHireRateSuccess = array_sum($projectUserArray);
            $repeatHireRateCount = ($repeatHireRateSuccess / count($repeatHireRates) * 100);
        }
        $result['repeat_hire_rate'] = round($repeatHireRateCount);
        return renderWithJson($result);
    } else {
        return renderWithJson($result, 'No record found', '', 1, 404);
    }
});
/**
 * GET hireRequestsGet
 * Summary: Fetch all hire requests
 * Notes: Returns all hire requests from the system
 * Output-Formats: [application/json]
 */
$app->GET('/api/v1/hire_requests', function ($request, $response, $args) {
    $queryParams = $request->getQueryParams();
    $results = array();
    try {
        $count = PAGE_LIMIT;
        if (!empty($queryParams['limit'])) {
            $count = $queryParams['limit'];
        }
        $hireRequests = Models\HireRequest::Filter($queryParams)->paginate($count)->toArray();
        $data = $hireRequests['data'];
        unset($hireRequests['data']);
        $results = array(
            'data' => $data,
            '_metadata' => $hireRequests
        );
        return renderWithJson($results);
    } catch (Exception $e) {
        return renderWithJson($results, $message = 'No record found', $fields = '', $isError = 1);
    }
})->add(new ACL('canListHireRequest'));
/**
 * DELETE hireRequestsHireRequestIdDelete
 * Summary: Delete hire request
 * Notes: Deletes a single hire request based on the ID supplied
 * Output-Formats: [application/json]
 */
$app->DELETE('/api/v1/hire_requests/{hireRequestId}', function ($request, $response, $args) {
    $hireRequest = Models\HireRequest::find($request->getAttribute('hireRequestId'));
    $result = array();
    try {
        if (!empty($hireRequest)) {
            $hireRequest->delete();
            $result = array(
                'status' => 'success',
            );
            return renderWithJson($result);
        } else {
            return renderWithJson($result, 'No record found', '', 1);
        }
    } catch (Exception $e) {
        return renderWithJson($result, 'Hire request could not be deleted. Please, try again.', '', 1);
    }
})->add(new ACL('canDeleteHireRequest'));
/**
 * GET hireRequestsHireRequestIdGet
 * Summary: Fetch hire request
 * Notes: Returns a hire request based on a single ID
 * Output-Formats: [application/json]
 */
$app->GET('/api/v1/hire_requests/{hireRequestId}', function ($request, $response, $args) {
    $result = array();
    $hireRequest = Models\HireRequest::find($request->getAttribute('hireRequestId'))->first();
    if (!empty($hireRequest)) {
        $result['data'] = $hireRequest;
        return renderWithJson($result);
    } else {
        return renderWithJson($result, 'No record found', '', 1);
    }
});
/**
 * PUT hireRequestsHireRequestIdPut
 * Summary: Update hire request by its id
 * Notes: Update hire request by its id
 * Output-Formats: [application/json]
 */
$app->PUT('/api/v1/hire_requests/{hireRequestId}', function ($request, $response, $args) {
    $args = $request->getParsedBody();
    $hireRequest = Models\HireRequest::find($request->getAttribute('hireRequestId'));
    $hireRequest->fill($args);
    $result = array();
    try {
        $validationErrorFields = $hireRequest->validate($args);
        if (empty($validationErrorFields)) {
            $hireRequest->save();
            $result = $hireRequest->toArray();
            return renderWithJson($result);
        } else {
            return renderWithJson($result, 'Hire request could not be updated. Please, try again.', $validationErrorFields, 1);
        }
    } catch (Exception $e) {
        return renderWithJson($result, 'Hire request could not be updated. Please, try again.', '', 1);
    }
})->add(new ACL('canUpdateHireRequest'));
/**
 * POST hireRequestsPost
 * Summary: Creates a new hire request
 * Notes: Creates a new hire request
 * Output-Formats: [application/json]
 */
$app->POST('/api/v1/hire_requests', function ($request, $response, $args) {
    global $authUser;
    global $_server_domain_url;
    $args = $request->getParsedBody();
    $hireRequest = new Models\HireRequest($args);
    $result = array();
    try {
        $validationErrorFields = $hireRequest->validate($args);
        if (empty($validationErrorFields)) {
            $ids = array();
            if (!empty($args['projects'])) {
                foreach ($args['projects'] as $project) {
                    $hireRequest->foreign_id = $project['project_id'];
                    $hireRequest->message = $args['message'];
                    $hireRequest->class = $args['class'];
                    $hireRequest->requested_user_id = $authUser->id;
                    $hireRequest->user_id = $args['user_id'];
                    $hiredId = Models\HireRequest::checkExitsHireRequest($hireRequest);
                    if (empty($hiredId)) {
                        $hireRequest->save();
                        $hiredId = $hireRequest->id;
                        $ids[] = $hireRequest->id;
                        $userDetails = getUserHiddenFields($hireRequest->requested_user_id);
                        $projectDetails = Models\Project::select('name', 'slug','user_id')->where('id', $hireRequest->foreign_id)->first();
                        $getFreelancer = getUserHiddenFields($projectDetails->user_id); 
                        $hiredNotification = array(
                            '##FREELANCER##' => $getFreelancer->username,
                            '##EMPLOYER##' => $userDetails->username,
                            '##PROJECT_NAME##' => $projectDetails->name,
                            '##MESSAGE##'    => $hireRequest->message,
                            '##RESUMES_LINK##' => $_server_domain_url . 'project/' . $projectDetails->id); 
                       sendMail('Hired Me Notification', $hiredNotification, $getFreelancer->email);
                    } else {
                        $ids[] = $hiredId;
                    }
                    insertActivities($hireRequest->requested_user_id, $hireRequest->user_id, 'HireRequest', $hiredId, 0, 0, \Constants\ActivityType::BidInvite, $hireRequest->foreign_id);
                }
            }
            $hireRequests = Models\HireRequest::whereIn('id', $ids)->get();
            if (!empty($hireRequests)) {
                $result['data'] = $hireRequests->toArray();
            }
            return renderWithJson($result);
        } else {
            return renderWithJson($result, 'Hire request could not be added. Please, try again.', $validationErrorFields, 1);
        }
    } catch (Exception $e) {
        return renderWithJson($result, 'Hire request could not be added. Please, try again.', '', 1);
    }
})->add(new ACL('canCreateHireRequest'));
/**
 * GET projectUserIdProjectsStatsGet
 * Summary: Fetch Project
 * Notes: Returns a project based on a single ID
 * Output-Formats: [application/json]
 */
$app->GET('/api/v1/projects/{user_id}/project_stats', function ($request, $response, $args) {
    global $authUser;
    $queryParams = $request->getQueryParams();
    $results = array();
    try {
        $userId = $request->getAttribute('user_id');
        $project['open_project_count'] = Models\Project::where('user_id', $userId)->where('project_status_id', \Constants\ProjectStatus::OpenForBidding)->count();
        $project['active_project_count'] = Models\Project::where('user_id', $userId)->whereIn('project_status_id', [\Constants\ProjectStatus::WinnerSelected, \Constants\ProjectStatus::UnderDevelopment, \Constants\ProjectStatus::Completed])->count();
        $project['past_project_count'] = Models\Project::where('user_id', $userId)->whereIn('project_status_id', [\Constants\ProjectStatus::BiddingClosed, \Constants\ProjectStatus::FinalReviewPending])->count();
        $project['total_project_count'] = $project['open_project_count'] + $project['active_project_count'] + $project['past_project_count'];
        $results = array(
            'data' => $project
        );
        return renderWithJson($results);
    } catch (Exception $e) {
        return renderWithJson($results, $message = 'No record found', $fields = '', $isError = 1);
    }
});
/**
 * GET projectUserIdBidStatsGet
 * Summary: Fetch Project
 * Notes: Returns a project based on a single ID
 * Output-Formats: [application/json]
 */
$app->GET('/api/v1/freelancer/me/bids/stats', function ($request, $response, $args) {
    global $authUser;
    $queryParams = $request->getQueryParams();
    $results = array();
    try {
        $userId = $authUser['id'];
        $current_project_status_id = array(
            \Constants\ProjectStatus::WinnerSelected,
            \Constants\ProjectStatus::UnderDevelopment,
            \Constants\ProjectStatus::FinalReviewPending,
            \Constants\ProjectStatus::Completed
        );
        $bid['current_project_count'] = Models\Bid::select('bids.*')->Join('projects', 'projects.id', '=', 'bids.project_id')->whereIn('projects.project_status_id', $current_project_status_id)->where('bids.bid_status_id', '=', \Constants\BidStatus::Won)->where('bids.user_id', '=', $userId)->count();
        $bid['active_bid_count'] = Models\Bid::where('user_id', $userId)->where('is_freelancer_withdrawn', '!=', 1)->where('bid_status_id', \Constants\BidStatus::Pending)->count();
        $past_project_status_id = array(
            \Constants\ProjectStatus::Closed,
            \Constants\ProjectStatus::MutuallyCanceled,
            \Constants\ProjectStatus::CanceledByAdmin
        );
        $bid['past_project_count'] = Models\Bid::select('bids.*')->Join('projects', 'projects.id', '=', 'bids.project_id')->whereIn('projects.project_status_id', $past_project_status_id)->where('bids.bid_status_id', '=', \Constants\BidStatus::Won)->where('bids.user_id', '=', $userId)->count();
        $projectIds = Models\Project::select('id')->where('freelancer_user_id', $userId)->get();
        $bid['milestone_count'] = Models\Milestone::whereIn('project_id', $projectIds)->count();
        $bid['invoice_count'] = Models\ProjectBidInvoice::where('user_id', $userId)->count();
        $results = array(
            'data' => $bid
        );
        return renderWithJson($results);
    } catch (Exception $e) {
        return renderWithJson($results, $message = 'No record found', $fields = '', $isError = 1);
    }
})->add(new ACL('canViewFreelancerBidStats'));
/**
 * GET projectUserIdProjectsStatsGet
 * Summary: Fetch Project
 * Notes: Returns a project based on a single ID
 * Output-Formats: [application/json]
 */
$app->GET('/api/v1/employer/me/pay_stats', function ($request, $response, $args) {
    global $authUser;
    $queryParams = $request->getQueryParams();
    $results = array();
    try {
        $userId = $authUser['id'];
        $projectIds = Models\Project::select('id')->where('user_id', $userId)->get();
        $project['milestone_count'] = Models\Milestone::whereIn('project_id', $projectIds)->count();
        $project['invoice_count'] = Models\ProjectBidInvoice::whereIn('project_id', $projectIds)->count();
        $results = array(
            'data' => $project
        );
        return renderWithJson($results);
    } catch (Exception $e) {
        return renderWithJson($results, $message = 'No record found', $fields = '', $isError = 1);
    }
})->add(new ACL('canEmployerPayStats'));
