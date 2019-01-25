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
 * GET projectDisputesGet
 * Summary: Fetch all project disputes
 * Notes: Returns all project disputes from the system
 * Output-Formats: [application/json]
 */
$app->GET('/api/v1/project_disputes', function ($request, $response, $args) {
    global $authUser;
    $queryParams = $request->getQueryParams();
    $results = array();
    try {
        $count = PAGE_LIMIT;
        if (!empty($queryParams['limit'])) {
            $count = $queryParams['limit'];
        }
        $enabledIncludes = array(
            'user',
            'dispute_open_type',
            'dispute_closed_type',
            'dispute_status'
        );
        (isPluginEnabled('Bidding/Bidding')) ? $enabledIncludes[] = 'project' : '';
        (isPluginEnabled('Bidding/Bidding')) ? $enabledIncludes[] = 'bid' : '';
        $projectDisputes = Models\ProjectDispute::with($enabledIncludes);
        if ($authUser->role_id != \Constants\ConstUserTypes::Admin) {
            $projectDisputes = $projectDisputes->orWhereHas('project', function ($q) use ($authUser) {
                $q->where('user_id', $authUser->id);
            })->orWhereHas('bid', function ($q) use ($authUser) {
                $q->where('user_id', $authUser->id);
            });
        }
        $projectDisputes = $projectDisputes->Filter($queryParams)->paginate($count)->toArray();
        $data = $projectDisputes['data'];
        unset($projectDisputes['data']);
        $results = array(
            'data' => $data,
            '_metadata' => $projectDisputes
        );
        return renderWithJson($results);
    } catch (Exception $e) {
        return renderWithJson($results, $message = 'No record found', $fields = '', $isError = 1);
    }
})->add(new ACL('canListProjectDispute'));
/**
 * POST projectDisputesPost
 * Summary: Creates a new project dispute
 * Notes: Creates a new project dispute
 * Output-Formats: [application/json]
 */
$app->POST('/api/v1/project_disputes', function ($request, $response, $args) {
    global $authUser, $_server_domain_url;
    $args = $request->getParsedBody();
    $projectDispute = new Models\ProjectDispute($args);
    $result = array();
    try {
        $enabledIncludes = array(
            'project_dispute'
        );
        (isPluginEnabled('Bidding/Bidding')) ? $enabledIncludes[] = 'project' : '';
        (isPluginEnabled('Bidding/Bidding')) ? $enabledIncludes[] = 'project_bid' : '';
        $bid = Models\Bid::with([$enabledIncludes => function ($q) {
            return $q->where('dispute_status_id', '!=', \Constants\ConstDisputeStatus::Closed);
        }
        ])->find($args['bid_id']);
        if (!empty($bid) && ($authUser->role_id == \Constants\ConstUserTypes::Admin || ($bid->project->user_id == $authUser->id || $bid->user_id == $authUser->id))) {
            if (!empty($bid->project_dispute)) {
                return renderWithJson($result, "Current dispute for this project hasn\'t been closed yet. Only one dispute at a time for a project is possible.", '', 1);
            }
            $disputeOpenTypes = new Models\DisputeOpenType;
            if ($bid->project->user_id == $authUser->id) {
                $disputeOpenTypes = $disputeOpenTypes->where('project_role_id', \Constants\ConstUserTypes::Employer);
                $to_user = $bid->user_id;
                $from_user = $bid->project->user_id;
            } elseif ($bid->user_id == $authUser->id) {
                $disputeOpenTypes = $disputeOpenTypes->where('project_role_id', \Constants\ConstUserTypes::Freelancer);
                $to_user = $bid->project->user_id;
                $from_user = $bid->user_id;
            }
            $dispute_ids = array();
            if ($bid->project->project_status_id == \Constants\ProjectStatus::UnderDevelopment || $bid->project->project_status_id == \Constants\ProjectStatus::Completed) {
                array_push($dispute_ids, \Constants\ConstDisputeOpenType::EmployerGiveMoreWorks);
                array_push($dispute_ids, \Constants\ConstDisputeOpenType::FreelancerWorkNotMatchesRequirement);
            }
            if ($bid->project->project_status_id == \Constants\ProjectStatus::Closed) {
                array_push($dispute_ids, \Constants\ConstDisputeOpenType::EmployerGivePoorRating);
                array_push($dispute_ids, \Constants\ConstDisputeOpenType::FreelancerGivePoorRating);
            }
            if (!empty($dispute_ids)) {
                $disputeOpenTypes = $disputeOpenTypes->whereIn('id', $dispute_ids);
            }
            $disputeOpenTypes = $disputeOpenTypes->pluck('id')->toArray();
            if (!empty($disputeOpenTypes)) {
                if (in_array($args['dispute_open_type_id'], $disputeOpenTypes)) {
                    $projectDispute->dispute_status_id = \Constants\ConstDisputeStatus::Open;
                    $projectDispute->user_id = $authUser->id;
                    $projectDispute->project_id = $bid->project_id;
                    $projectDispute->save();
                    Models\Project::where('id', $bid->project_id)->update(array(
                        'is_dispute' => 1
                    ));
                    insertActivities($from_user, $to_user, 'ProjectDispute', $projectDispute->id, 0, 0, \Constants\ActivityType::ProjectDisputePosted, $bid->project_id);
                    //@TODO
                    //To implement the email template
                    if ($authUser->id == $bid->user_id){
                        $distibutor = getUserHiddenFields($bid->user_id);
                        $distibuted = getUserHiddenFields($bid->project->user_id);
                        $distibutertype = 'Freelancer';
                        $distibutedtype = 'Employer';
                    } else {
                        $distibutor = getUserHiddenFields($bid->project->user_id);
                        $distibuted = getUserHiddenFields($bid->user_id);
                        $distibutertype = 'Employer';
                        $distibutedtype = 'Freelancer';                        
                    }
                    $distibutetype = Models\DisputeOpenType::select('name')->where('id', $args['dispute_open_type_id'])->first();    
                    $admin = Models\User::where('role_id', \Constants\ConstUserTypes::Admin)->first();
                    $emailFindReplace = array(
                        '##DISPUTER##' => ucfirst($distibutor->username) ,
                        '##DISPUTED##' => ucfirst($distibuted->username),
                        '##DISPUTERTYPE##' => ucfirst($distibutertype),
                        '##DISPUTETYPE##' => ucfirst($distibutetype->name),
                        '##PROJECT_NAME##' => ucfirst($bid->project->name),
                        '##REASON##' => ucfirst($args['reason']),
                        '##PROJECT_URL##' => $_server_domain_url . '/projects/view/' . $bid->project->id . '/' . $bid->project->name 
                    );
                    sendMail('Dispute Alert', $emailFindReplace, $distibuted->email);
                    $emailFindReplace = array(
                        '##DISPUTER##' => ucfirst($distibutor->username) ,
                        '##DISPUTED##' => ucfirst($distibuted->username),
                        '##DISPUTERTYPE##' => ucfirst($distibutertype),
                        '##DISPUTEDTYPE##' => ucfirst($distibutedtype),
                        '##DISPUTETYPE##' => ucfirst($distibutetype->name),
                        '##PROJECT_NAME##' => ucfirst($bid->project->name),
                        '##REASON##' => ucfirst($args['reason']),
                        '##PROJECT_URL##' => $_server_domain_url . '/projects/view/' . $bid->project->id . '/' . $bid->project->name 
                    );
                    sendMail('Admin Dispute Alert', $emailFindReplace, $admin->email);                             
                    $result['data'] = $projectDispute->toArray();
                    return renderWithJson($result);
                }
            }
            return renderWithJson($result, 'Project dispute could not be added. Please, try again.', '', 1);
        } else {
            return renderWithJson($result, 'Access denied.', '', 2);
        }
    } catch (Exception $e) {
        return renderWithJson($result, 'Project dispute could not be added. Please, try again.', '', 1);
    }
})->add(new ACL('canCreateProjectDispute'));
/**
 * DELETE projectDisputesProjectDisputeIdDelete
 * Summary: Delete project dispute
 * Notes: Deletes a single project dispute based on the ID supplied
 * Output-Formats: [application/json]
 */
$app->DELETE('/api/v1/project_disputes/{projectDisputeId}', function ($request, $response, $args) {
    $projectDispute = Models\ProjectDispute::find($request->getAttribute('projectDisputeId'));
    try {
        $projectDispute->delete();
        $result = array(
            'status' => 'success',
        );
        return renderWithJson($result);
    } catch (Exception $e) {
        return renderWithJson($result, 'Project dispute could not be deleted. Please, try again.', '', 1);
    }
})->add(new ACL('canDeleteProjectDispute'));
/**
 * GET projectDisputesProjectDisputeIdGet
 * Summary: Fetch project dispute
 * Notes: Returns a project dispute based on a single ID
 * Output-Formats: [application/json]
 */
$app->GET('/api/v1/project_disputes/{projectDisputeId}', function ($request, $response, $args) {
    $result = array();
     $enabledIncludes = array(
            'user',
            'dispute_open_type',
            'dispute_closed_type'
        );
        (isPluginEnabled('Bidding/Bidding')) ? $enabledIncludes[] = 'project' : '';
    $projectDispute = Models\ProjectDispute::with($enabledIncludes)->find($request->getAttribute('projectDisputeId'));
    if (!empty($projectDispute)) {
        $result['data'] = $projectDispute;
        return renderWithJson($result);
    } else {
        return renderWithJson($result, 'No record found', '', 1);
    }
})->add(new ACL('canViewProjectDispute'));
/**
 * PUT projectDisputesProjectDisputeIdPut
 * Summary: Update project dispute by its id
 * Notes: Update project dispute by its id
 * Output-Formats: [application/json]
 */
$app->PUT('/api/v1/project_disputes/{projectDisputeId}', function ($request, $response, $args) {
    global $authUser;
    $args = $request->getParsedBody();
    $result = array();
    $projectDispute = Models\ProjectDispute::find($request->getAttribute('projectDisputeId'));
    $disputeId = $request->getAttribute('projectDisputeId');
    if (!empty($projectDispute)) {
        $enabledIncludes = array(
            'user'
        );
        $oldProjectDisputestatus = $projectDispute->dispute_status_id;
        $project = Models\Project::with(['bid_winner' => function ($q) {
            return $q->with('reviews');
        }
        , 'project_bid' => function ($q) use ($disputeId) {
            return $q->where('is_active', 1);
        }
        , 'milestones' => function ($join) {
            return $join->whereIn('milestone_status_id', [\Constants\MilestoneStatus::EscrowFunded, \Constants\MilestoneStatus::Completed]);
        }
        , 'project_dispute' => function ($q) use ($disputeId) {
            return $q->where('id', $disputeId);
        }
        ])->with($enabledIncludes)->where('id', $projectDispute->project_id)->first();
        $role_id = '';
        if (!empty($args['dispute_closed_type_id'])) {
            $project_role = Models\DisputeClosedType::select('project_role_id')->where('id', $args['dispute_closed_type_id'])->first();
            $role_id = $project_role->project_role_id;
        }
        if (!empty($project) && !empty($role_id) && $role_id == \Constants\ConstUserTypes::Employer) {
            switch ($projectDispute->dispute_open_type_id) { 
                case \Constants\ConstDisputeOpenType::EmployerGiveMoreWorks:
                    Models\ProjectDispute::_refundedAndCancelProject($project, $project->user_id, 'employer');
                    $closetype = \Constants\ConstDisputeCloseType::EmployerGivingMoreWork;
                    break;

                case \Constants\ConstDisputeOpenType::EmployerGivePoorRating:
                    Models\ProjectDispute::_resolveDispute($project, \Constants\ConstDisputeOpenType::EmployerGivePoorRating);
                    $closetype = \Constants\ConstDisputeCloseType::EmployerGivenProperFeedback;
                    break;

                case \Constants\ConstDisputeOpenType::FreelancerWorkNotMatchesRequirement:
                    Models\ProjectDispute::_refundedAndCancelProject($project, $project->user_id, 'employer');
                    $closetype = \Constants\ConstDisputeCloseType::ItemNotMatchedProjectDescription;
                    break;

                case \Constants\ConstDisputeOpenType::FreelancerGivePoorRating:
                    Models\ProjectDispute::_updateRating($project, $project->user_id, $projectDispute->expected_rating, 'employer');
                    $closetype = \Constants\ConstDisputeCloseType::FreelancerGivenPoorFeedback;
                    break;
            }
            $projectDispute->dispute_status_id = \Constants\ConstDisputeStatus::Closed;
            $projectDispute->resolved_date = date('Y-m-d h:i:s');
            $projectDispute->favour_role_id = \Constants\ConstUserTypes::Employer;
            $projectDispute->dispute_closed_type_id = $closetype;
            $projectDispute->save();
            Models\Project::where('id', $project->id)->update(array(
                'is_dispute' => 0
            ));
            $adminId = Models\User::select('id')->where('role_id', \Constants\ConstUserTypes::Admin)->first();
            insertActivities($adminId['id'], $project->user_id, 'ProjectDispute', $projectDispute->id, $oldProjectDisputestatus, \Constants\ConstDisputeStatus::Closed, \Constants\ActivityType::ProjectDisputeStatusChanged, $project->id);
            insertActivities($adminId['id'], $project->freelancer_user_id, 'ProjectDispute', $projectDispute->id, $oldProjectDisputestatus, \Constants\ConstDisputeStatus::Closed, \Constants\ActivityType::ProjectDisputeStatusChanged, $project->id);
        } elseif (!empty($project) && !empty($role_id) && $role_id == \Constants\ConstUserTypes::Freelancer) {
            switch ($projectDispute->dispute_open_type_id) { 
                case \Constants\ConstDisputeOpenType::EmployerGiveMoreWorks:
                    Models\ProjectDispute::_updateProjectStatusToDevelopement($project);
                    $closetype = \Constants\ConstDisputeCloseType::EmployerGivingMoreWork;
                    break;

                case \Constants\ConstDisputeOpenType::EmployerGivePoorRating:
                    Models\ProjectDispute::_updateRating($project, $project->freelancer_user_id, $projectDispute->expected_rating, 'freelancer');
                    $closetype = \Constants\ConstDisputeCloseType::EmployerGivenPoorFeedback;
                    break;

                case \Constants\ConstDisputeOpenType::FreelancerWorkNotMatchesRequirement:
                    Models\ProjectDispute::_resolveDispute($project, \Constants\ConstDisputeOpenType::FreelancerWorkNotMatchesRequirement);
                    $closetype = \Constants\ConstDisputeCloseType::ItemMatchedProjectDescription;
                    break;

                case \Constants\ConstDisputeOpenType::FreelancerGivePoorRating:
                    Models\ProjectDispute::_resolveDispute($project, \Constants\ConstDisputeOpenType::FreelancerGivePoorRating);
                    $closetype = \Constants\ConstDisputeCloseType::FreelancerGivenProperFeedback;
                    break;
            }
            $projectDispute->dispute_status_id = \Constants\ConstDisputeStatus::Closed;
            $projectDispute->resolved_date = date('Y-m-d');
            $projectDispute->favour_role_id = \Constants\ConstUserTypes::Freelancer;
            $projectDispute->dispute_closed_type_id = $closetype;
            $projectDispute->save();
            Models\Project::where('id', $project->id)->update(array(
                'is_dispute' => 0
            ));
            $adminId = Models\User::select('id')->where('role_id', \Constants\ConstUserTypes::Admin)->first();
            insertActivities($adminId['id'], $project->user_id, 'ProjectDispute', $projectDispute->id, $oldProjectDisputestatus, \Constants\ConstDisputeStatus::Closed, \Constants\ActivityType::ProjectDisputeStatusChanged, $project->id);
            insertActivities($adminId['id'], $project->freelancer_user_id, 'ProjectDispute', $projectDispute->id, $oldProjectDisputestatus, \Constants\ConstDisputeStatus::Closed, \Constants\ActivityType::ProjectDisputeStatusChanged, $project->id);
        }
        $projectDispute = Models\ProjectDispute::with('project', 'user', 'dispute_open_type', 'dispute_status', 'dispute_closed_type')->find($disputeId);
        $result['data'] = $projectDispute->toArray();
        return renderWithJson($result);
    } else {
        return renderWithJson($result, 'No record found', '', 1);
    }
})->add(new ACL('canUpdateProjectDispute'));
$app->GET('/api/v1/dispute_open_types', function ($request, $response, $args) {
    $queryParams = $request->getQueryParams();
    $results = array();
    try {
        $disputeOpenType = Models\DisputeOpenType::Filter($queryParams)->paginate(PAGE_LIMIT)->toArray();
        $data = $disputeOpenType['data'];
        unset($disputeOpenType['data']);
        $results = array(
            'data' => $data,
            '_metadata' => $disputeOpenType
        );
        return renderWithJson($results);
    } catch (Exception $e) {
        return renderWithJson($results, $message = 'No record found', $fields = '', $isError = 1);
    }
});
$app->GET('/api/v1/dispute_closed_types', function ($request, $response, $args) {
    $queryParams = $request->getQueryParams();
    $results = array();
    try {
        $disputeClosedType = Models\DisputeClosedType::Filter($queryParams)->paginate(PAGE_LIMIT)->toArray();
        $data = $disputeClosedType['data'];
        unset($disputeClosedType['data']);
        $results = array(
            'data' => $data,
            '_metadata' => $disputeClosedType
        );
        return renderWithJson($results);
    } catch (Exception $e) {
        return renderWithJson($results, $message = 'No record found', $fields = '', $isError = 1);
    }
});
$app->GET('/api/v1/dispute_statuses', function ($request, $response, $args) {
    $queryParams = $request->getQueryParams();
    $results = array();
    try {
        $disputeStatus = Models\DisputeStatus::Filter($queryParams)->paginate(PAGE_LIMIT)->toArray();
        $data = $disputeStatus['data'];
        unset($disputeStatus['data']);
        $results = array(
            'data' => $data,
            '_metadata' => $disputeStatus
        );
        return renderWithJson($results);
    } catch (Exception $e) {
        return renderWithJson($results, $message = 'No record found', $fields = '', $isError = 1);
    }
});
