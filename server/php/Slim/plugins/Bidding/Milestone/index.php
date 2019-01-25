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
 * GET milestonesGet
 * Summary: Fetch all milestones
 * Notes: Returns all milestones from the system
 * Output-Formats: [application/json]
 */
$app->GET('/api/v1/milestones', function ($request, $response, $args) {
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
            'milestone_status'
        );
        (isPluginEnabled('Bidding/Bidding')) ? $enabledIncludes[] = 'project' : '';
        (isPluginEnabled('Bidding/Bidding')) ? $enabledIncludes[] = 'bid' : '';
        $milestones = Models\Milestone::with($enabledIncludes);
        if ($authUser['role_id'] != \Constants\ConstUserTypes::Admin && !empty($queryParams['bid_id'])) {
            $milestones = $milestones->orWhereHas('bid', function ($q) use ($authUser) {
                if (isset($authUser) && ($authUser['role_id'] != \Constants\ConstUserTypes::Admin)) {
                    $q->where('bids.user_id', $authUser->id);
                }
            });
            $milestones = $milestones->orWhereHas('project', function ($q) use ($authUser) {
                if (isset($authUser) && ($authUser['role_id'] != \Constants\ConstUserTypes::Admin)) {
                    $q->where('projects.user_id', $authUser->id);
                }
            });
        } elseif ($authUser['role_id'] != \Constants\ConstUserTypes::Admin) {
            return renderWithJson($results, $message = 'bid id mandatory', $fields = '', $isError = 1);
        }
        $milestones = $milestones->Filter($queryParams)->paginate($count)->toArray();
        $data = $milestones['data'];
        unset($milestones['data']);
        $results = array(
            'data' => $data,
            '_metadata' => $milestones
        );
        return renderWithJson($results);
    } catch (Exception $e) {
        return renderWithJson($results, $message = 'No record found', $fields = '', $isError = 1);
    }
})->add(new ACL('canListMilestone'));
/**
 * DELETE milestonesMilestoneIdDelete
 * Summary: Delete milestone
 * Notes: Deletes a single milestone based on the ID supplied
 * Output-Formats: [application/json]
 */
$app->DELETE('/api/v1/milestones/{milestoneId}', function ($request, $response, $args) {
    $milestone = Models\Milestone::find($request->getAttribute('milestoneId'));
    try {
        $milestone->delete();
        $result = array(
            'status' => 'success',
        );
        return renderWithJson($result);
    } catch (Exception $e) {
        return renderWithJson($result, 'Milestone could not be deleted. Please, try again.', '', 1);
    }
})->add(new ACL('canDeleteMilestone'));
/**
 * GET milestonesMilestoneIdGet
 * Summary: Fetch milestone
 * Notes: Returns a milestone based on a single ID
 * Output-Formats: [application/json]
 */
$app->GET('/api/v1/milestones/{milestoneId}', function ($request, $response, $args) {
    $result = array();
    $enabledIncludes = array(
        'user',
        'milestone_status'
    );
    (isPluginEnabled('Bidding/Bidding')) ? $enabledIncludes[] = 'project' : '';
    (isPluginEnabled('Bidding/Bidding')) ? $enabledIncludes[] = 'bid' : '';
    $milestone = Models\Milestone::with($enabledIncludes)->find($request->getAttribute('milestoneId'));
    if (!empty($milestone)) {
        $result['data'] = $milestone;
        return renderWithJson($result);
    } else {
        return renderWithJson($result, 'No record found', '', 1);
    }
})->add(new ACL('canViewMilestone'));
/**
 * PUT milestonesMilestoneIdPut
 * Summary: Update milestone by its id
 * Notes: Update milestone by its id
 * Output-Formats: [application/json]
 */
$app->PUT('/api/v1/milestones/{milestoneId}', function ($request, $response, $args) {
    global $authUser;
    $args = $request->getParsedBody();
    $enabledIncludes = array();
    (isPluginEnabled('Bidding/Bidding')) ? $enabledIncludes[] = 'project' : '';
    (isPluginEnabled('Bidding/Bidding')) ? $enabledIncludes[] = 'bid' : '';
    $milestone = Models\Milestone::with($enabledIncludes)->find($request->getAttribute('milestoneId'));
    $oldStatus = $newStatus = $milestone->milestone_status_id;
    $milestone->fill($args);
    $result = array();
    try {
        if (!empty($milestone)) {
            if ($authUser->role_id != \Constants\ConstUserTypes::Admin && $authUser->id != $milestone->project->user_id && $milestone->bid->user_id != $authUser->id) {
                return renderWithJson($result, 'Invalid request', '', 1);
            } else {
                $newStatus = $milestone->milestone_status_id;
                $status = array(
                    \Constants\MilestoneStatus::Pending,
                    \Constants\MilestoneStatus::Approved,
                    \Constants\MilestoneStatus::RequestedForEscrow
                );
                if (in_array($milestone->milestone_status_id, $status) || $authUser->role_id == \Constants\ConstUserTypes::Admin) {
                    $milestone->save();
                    if ($oldStatus != $newStatus) {
                        insertActivities($milestone->project->user_id, $milestone->bid->user_id, 'Milestone', $milestone->id, $oldStatus, $newStatus, \Constants\ActivityType::MilestoneStatuschanged, $milestone->project_id);
                    }
                } else {
                    return renderWithJson($result, 'Milestone could not be updated', '', 1);
                }
            }
            $result['data'] = $milestone->toArray();
            return renderWithJson($result);
        } else {
            return renderWithJson($result, 'Milestone could not be updated. Please, try again.', $validationErrorFields, 1);
        }
    } catch (Exception $e) {
        return renderWithJson($result, 'Milestone could not be updated. Please, try again.', '', 1);
    }
})->add(new ACL('canUpdateMilestone'));
/**
 * POST milestonesPost
 * Summary: Creates a new milestone
 * Notes: Creates a new milestone
 * Output-Formats: [application/json]
 */
$app->POST('/api/v1/milestones', function ($request, $response, $args) {
    global $authUser, $_server_domain_url;
    $args = $request->getParsedBody();
    $result = array();
    try {
        $enabledIncludes = array();
        (isPluginEnabled('Bidding/Bidding')) ? $enabledIncludes[] = 'project' : '';
        $bids = Models\Bid::where('id', $args['bid_id'])->with($enabledIncludes)->first();
        if ($authUser->role_id != \Constants\ConstUserTypes::Admin && $authUser->id != $bids['user_id'] && $bids['project']['user_id'] != $authUser->id) {
            return renderWithJson($result, 'Invalid request', '', 1);
        }
        $enabledIncludes = array(
            'user'
        );
        (isPluginEnabled('Bidding/Milestone')) ? $enabledIncludes[] = 'milestones' : '';
        $project = Models\Project::with($enabledIncludes)->where('project_status_id', \Constants\ProjectStatus::UnderDevelopment)->with(['project_bid' => function ($q) {
            return $q->where('is_active', true);
        }
        ])->where('id', $bids->project_id)->first();
        $split_amount = 0;
        if (!empty($project->Milestone)) {
            foreach ($project->Milestone as $milestone) {
                $split_amount+= $milestone->amount;
            }
        }
        $amount = $args['amount'];
        if (empty($project)) {
            return renderWithJson($result, 'Milestone could not be added. Please, try again.', '', 1);
        }
        $is_allowed = 1;
        if ($is_allowed) {
            $milestone = new Models\Milestone($args);
            $validationErrorFields = $milestone->validate($args);
            if (empty($validationErrorFields)) {
                $milestone->project_id = $bids->project_id;
                $milestone->user_id = $authUser->id;
                $commision_employer = 0;
                $commision_freelancer = 0;
                if (PROJECT_COMMISSION_FROM_EMPLOYER_FOR_MILESTONE) {
                    $commision_employer = ($amount / 100) * PROJECT_COMMISSION_FROM_EMPLOYER_FOR_MILESTONE;
                }
                $milestone->site_commission_from_employer = $commision_employer;
                if (PROJECT_COMMISSION_FROM_FREELANCER_FOR_MILESTONE) {
                    $commision_freelancer = ($amount / 100) * PROJECT_COMMISSION_FROM_FREELANCER_FOR_MILESTONE;
                }
                $milestone->site_commission_from_freelancer = $commision_freelancer;
                if ($milestone->save()) {
                    $userId = $bids->project->user_id;
                    $otherUserId = $bids->user_id;
                    if ($authUser->id == $bids->user_id) {
                        $userId = $bids->user_id;
                        $otherUserId = $bids->project->user_id;
                    }
                    insertActivities($userId, $otherUserId, 'Milestone', $milestone->id, 0, 0, \Constants\ActivityType::MilestonePosted, $milestone->project_id);
                    $userDetails = getUserHiddenFields($otherUserId);
                    $employerDetails = getUserHiddenFields($userId);
                    $emailFindReplace = array(
                        '##FREELANCER##' => ucfirst($userDetails->username) ,
                        '##EMPLOYER##' => ucfirst($employerDetails->username) ,
                        '##PROJECT_NAME##' => $bids->project->name,
                        '##DESCRIPTION##' => $milestone->description,
                        '##MILESTONE_ID##' => $milestone->id,
                        '##CURRENCY##' => CURRENCY_SYMBOL,
                        '##AMOUNT##' => $milestone->amount,
                        '##DEADLINE##' => $milestone->deadline_date,
                        '##PROJECT_URL##' => $_server_domain_url . '/projects/view/' . $bids->project_id . '/' . $bids->project->slug . '?action=milestones'
                    );
                    sendMail('New Milestone Notification', $emailFindReplace, $userDetails->email);
                    $result = $milestone->toArray();
                    return renderWithJson($result);
                } else {
                    return renderWithJson($result, 'Access Denied', '', 2);
                }
            } else {
                return renderWithJson($result, 'Milestone could not be added. Please, try again.', $validationErrorFields, 1);
            }
        } else {
            return renderWithJson($result, 'Access Denied.', '', 2);
        }
    } catch (Exception $e) {
        return renderWithJson($result, 'Milestone could not be added. Please, try again.', '', 1);
    }
})->add(new ACL('canCreateMilestone'));
/**
 * PUT milestonesMilestoneIdUpdateStatusPut
 * Summary: Update milestone by its id
 * Notes: Update milestone by its id
 * Output-Formats: [application/json]
 */
$app->PUT('/api/v1/milestones/{milestoneId}/update_status', function ($request, $response, $args) {
    global $authUser, $_server_domain_url;
    $args = $request->getParsedBody();
    $result = array();
    $status = $args['milestone_status_id'];
$milestone = Models\Milestone::with(array(
        'user',
        'milestone_status',
        'project' => function ($q) {
            $q->with(array(
                'project_bid' => function ($q1) {
                    return $q1->where('is_active', 1);
                }
            ));
        }
        ,
        'bid' => function ($q) {
            return $q->where('bid_status_id', \Constants\BidStatus::Won);
        }
    ));
    $milestone = $milestone->find($request->getAttribute('milestoneId'));
    $oldMilestoneStatus = $milestone->milestone_status_id;

    if (!empty($milestone) && $milestone->milestone_status_id != $status) {
        if ($authUser->role_id != \Constants\ConstUserTypes::Admin && ($authUser->id != $milestone['project']['user_id'] && $milestone['project']['project_bid']['user_id'] != $authUser->id) && ($status == \Constants\MilestoneStatus::Canceled && $authUser->id != $milestone['bid']['user_id'])) {
            return renderWithJson($result, 'Invalid request', '', 1);
        } else {
            $milestoneId = $request->getAttribute('milestoneId');
            switch ($status) {
                case \Constants\MilestoneStatus::Approved:
                    Models\Milestone::where('id', $milestoneId)->update(array(
                    'milestone_status_id' => \Constants\MilestoneStatus::Approved
                    ));
                    $userDetails = getUserHiddenFields($milestone['bid']['user_id']);
                    $employerDetails = getUserHiddenFields($milestone['project']['user_id']);
                    $emailFindReplace = array(
                    '##FREELANCER##' => ucfirst($userDetails->username) ,
                    '##EMPLOYER##' => ucfirst($employerDetails->username) ,
                    '##PROJECT_NAME##' => $milestone['project']['name'],
                    '##DESCRIPTION##' => $milestone['description'],
                    '##MILESTONE_ID##' => $milestone['id'],
                    '##AMOUNT##' => $milestone['amount'],
                    '##DEADLINE##' => $milestone['deadline_date'],
                    '##PROJECT_URL##' => $_server_domain_url . '/projects/view/' . $milestone['project_id'] . '/' . $milestone['project']['slug'] . '?action=milestones'
                        );
                        sendMail('Milestone Approved Notification', $emailFindReplace, $userDetails->email);

                    break;

                case \Constants\MilestoneStatus::RequestedForEscrow:
                    Models\Milestone::where('id', $milestoneId)->update(array(
                    'milestone_status_id' => \Constants\MilestoneStatus::RequestedForEscrow
                    ));
                    $userDetails = getUserHiddenFields($milestone['bid']['user_id']);
                    $employerDetails = getUserHiddenFields($milestone['project']['user_id']);
                    $emailFindReplace = array(
                    '##USERNAME##' => ucfirst($userDetails->username) ,
                    '##EMPLOYER##' => ucfirst($employerDetails->username) ,
                    '##PROJECT_NAME##' => $milestone['project']['name'],
                    '##DESCRIPTION##' => $milestone['description'],
                    '##MILESTONE_ID##' => $milestone['id'],
                    '##CURRENCY##' => CURRENCY_SYMBOL,
                    '##AMOUNT##' => $milestone['amount'],
                    '##DEADLINE##' => $milestone['deadline_date'],
                    '##PROJECT_URL##' => $_server_domain_url . '/projects/view/' . $milestone['project_id'] . '/' . $milestone['project']['slug'] . '?action=milestones'
                        );
                        sendMail('Milestone - Escrow Requested Notification', $emailFindReplace, $employerDetails->email);
                    break;

                case \Constants\MilestoneStatus::RequestedForRelease:
                    Models\Milestone::where('id', $milestoneId)->update(array(
                    'milestone_status_id' => \Constants\MilestoneStatus::RequestedForRelease,
                    'escrow_amount_requested_date' => date('Y-m-d')
                    ));
                    $userDetails = getUserHiddenFields($milestone['bid']['user_id']);
                    $employerDetails = getUserHiddenFields($milestone['project']['user_id']);
                    $emailFindReplace = array(
                    '##USERNAME##' => ucfirst($userDetails->username) ,
                    '##EMPLOYER##' => ucfirst($employerDetails->username) ,
                    '##PROJECT_NAME##' => $milestone['project']['name'],
                    '##DESCRIPTION##' => $milestone['description'],
                    '##MILESTONE_ID##' => $milestone['id'],
                    '##CURRENCY##' => CURRENCY_SYMBOL,
                    '##AMOUNT##' => $milestone['amount'],
                    '##DEADLINE##' => $milestone['deadline_date'],
                    '##PROJECT_URL##' => $_server_domain_url . '/projects/view/' . $milestone['project_id'] . '/' . $milestone['project']['slug'] . '?action=milestones'
                        );
                        sendMail('Milestone - Requested Escrow Amount Release Notification', $emailFindReplace, $employerDetails->email);
                    break;

                case \Constants\MilestoneStatus::EscrowReleased:
                    if ($authUser->id != $milestone['project']['user_id']) {
                        return renderWithJson($result, 'Invalid request', '', 1);
                    }
                    if (!empty($milestone['bid'])) {
                        if (Models\Milestone::where('id', $milestoneId)->where('milestone_status_id', '!=', \Constants\MilestoneStatus::Completed)->update(array(
                        'milestone_status_id' => \Constants\MilestoneStatus::EscrowReleased
                        ))) {
                            $freelancer_commision_amount = 0;
                            if (PROJECT_COMMISSION_FROM_FREELANCER_FOR_MILESTONE) {
                                $freelancer_commision_amount = ($milestone['amount'] / 100) * PROJECT_COMMISSION_FROM_FREELANCER_FOR_MILESTONE;
                            }
                            $employer_commision_employer = 0;
                            if (PROJECT_COMMISSION_FROM_EMPLOYER_FOR_MILESTONE) {
                                $employer_commision_employer = ($milestone['amount'] / 100) * PROJECT_COMMISSION_FROM_EMPLOYER_FOR_MILESTONE;
                            }
                            $transaction_id = insertTransaction($milestone['project']['user_id'], $milestone['bid']['user_id'], $milestone['id'], 'Milestone', \Constants\TransactionType::ProjectMilestonePaymentReleased, $milestone['payment_gateway_id'], $milestone['amount'], $freelancer_commision_amount, 0, 0, $employer_commision_employer, $milestone['project_id'], $milestone['zazpay_gateway_id']);
                            if (!empty($transaction_id)) {
                                $user = Models\User::select('available_wallet_amount', 'username', 'id')->where('id', $milestone['bid']['user_id'])->first();
                                $user->makeVisible(array(
                                'available_wallet_amount'
                                ));
                                Models\User::where('id', $milestone['bid']['user_id'])->update(array(
                                'available_wallet_amount' => $user['available_wallet_amount'] + $milestone['amount'] - $freelancer_commision_amount
                                ));
                                updateSiteCommissionFromFreelancer($freelancer_commision_amount, $milestone['bid']['id'], $milestone['bid']['project_id'], $milestone['bid']['user_id']);
                                Models\Milestone::where('id', $milestone['id'])->update(array(
                                'escrow_amount_released_date' => date('Y-m-d') ,
                                'site_commission_from_freelancer' => $freelancer_commision_amount
                                ));
                                $user = Models\User::select('available_wallet_amount', 'username', 'available_wallet_amount', 'total_site_revenue_as_freelancer', 'total_earned_amount_as_freelancer', 'id')->where('id', $milestone['bid']['user_id'])->first();
                                $user->makeVisible(array(
                                'available_wallet_amount', 'available_wallet_amount', 'total_site_revenue_as_freelancer', 'total_earned_amount_as_freelancer'
                                ));
                                $user->total_earned_amount_as_freelancer = $user->total_earned_amount_as_freelancer + $milestone['amount'] - $freelancer_commision_amount;
                                $user->is_made_deposite = 1;
                                $user->update();
                            }
                            $userDetails = getUserHiddenFields($milestone['bid']['user_id']);
                            $employerDetails = getUserHiddenFields($milestone['project']['user_id']);
                            $emailFindReplace = array(
                            '##FREELANCER##' => ucfirst($userDetails->username) ,
                            '##EMPLOYER##' => ucfirst($employerDetails->username) ,
                            '##PROJECT_NAME##' => $milestone['project']['name'],
                            '##DESCRIPTION##' => $milestone['description'],
                            '##MILESTONE_ID##' => $milestone['id'],
                            '##CURRENCY##' => CURRENCY_SYMBOL,
                            '##AMOUNT##' => $milestone['amount'],
                            '##DEADLINE##' => $milestone['deadline_date'],
                            '##PROJECT_URL##' => $_server_domain_url . '/projects/view/' . $milestone['project_id'] . '/' . $milestone['project']['slug'] . '?action=milestones'
                            );
                            sendMail('Milestone - Escrow Released Notification', $emailFindReplace, $userDetails->email);
                            updateAmountInBidTable($milestone['bid_id']);
                            UpdatePaidAmountForProject($milestone['bid']['id'], $milestone['bid']['project_id']);
                        } else {
                            return renderWithJson($result, 'Milestone could not be updated. Access Denied.', '', 1);
                        }
                    } else {
                        Models\Milestone::where('id', $milestoneId)->where('milestone_status_id', '!=', \Constants\MilestoneStatus::Completed)->update(array(
                        'milestone_status_id' => \Constants\MilestoneStatus::EscrowReleased
                        ));
                    }
                    break;

                case \Constants\MilestoneStatus::Completed:
                    Models\Milestone::where('id', $milestoneId)->update(array(
                    'milestone_status_id' => \Constants\MilestoneStatus::Completed,
                    'completed_date' => date('Y-m-d')
                    ));
                    $userDetails = getUserHiddenFields($milestone['bid']['user_id']);
                    $employerDetails = getUserHiddenFields($milestone['project']['user_id']);
                    $emailFindReplace = array(
                    '##FREELANCER##' => ucfirst($userDetails->username) ,
                    '##EMPLOYER##' => ucfirst($employerDetails->username) ,
                    '##PROJECT_NAME##' => $milestone['project']['name'],
                    '##DESCRIPTION##' => $milestone['description'],
                    '##MILESTONE_ID##' => $milestone['id'],
                    '##CURRENCY##' => CURRENCY_SYMBOL,
                    '##AMOUNT##' => $milestone['amount'],
                    '##DEADLINE##' => $milestone['deadline_date'],
                    '##PROJECT_URL##' => $_server_domain_url . '/projects/view/' . $milestone['project_id'] . '/' . $milestone['project']['slug'] . '?action=milestones'
                        );
                        sendMail('Milestone - Milestone Completed Notification', $emailFindReplace, $employerDetails->email);
                    break;

                case \Constants\MilestoneStatus::Canceled:
                    if ($oldMilestoneStatus < \Constants\MilestoneStatus::EscrowFunded) {
                        $userId = $authUser->id;
                        if ($userId == $milestone['project']['user_id']) {
                            $otherUserId = $milestone['bid']['user_id'];
                          
                        }else{
                             $otherUserId =$milestone['project']['user_id'];
                           
                        }
                      
                        Models\Milestone::where('id', $milestoneId)->update(array(
                        'milestone_status_id' => \Constants\MilestoneStatus::Canceled
                        ));
                        $userDetails = getUserHiddenFields($userId);
                        $otheUserDetails = getUserHiddenFields($otherUserId);
                       // $employerDetails = getUserHiddenFields($otherUserId);
                        $emailFindReplace = array(
                        '##USERNAME##' => ucfirst($otheUserDetails->username) ,
                        '##ACTION_TAKER_USERNAME##' => ucfirst($userDetails->username) ,
                        '##PROJECT_NAME##' => $milestone['project']['name'],
                        '##DESCRIPTION##' => $milestone['description'],
                        '##MILESTONE_ID##' => $milestone['id'],
                        '##CURRENCY##' => CURRENCY_SYMBOL,
                        '##AMOUNT##' => $milestone['amount'],
                        '##DEADLINE##' => $milestone['deadline_date'],
                        '##PROJECT_URL##' => $_server_domain_url . '/projects/view/' . $milestone['project_id'] . '/' . $milestone['project']['slug'] . '?action=milestones'
                        );
                        sendMail('Milestone Cancelled Notification', $emailFindReplace, $otheUserDetails->email);
                    } else {
                        return renderWithJson($result, 'Milestone could not be updated. Please, try again', '', 1);
                    }
                    break;

                default:
                    break;
            }
            $userId = $authUser->id; //user_id
            $otherUserId = $milestone['project']['user_id']; //to_user_id
            if($milestone['project']['user_id'] == $userId) {
                $otherUserId = $milestone['bid']['user_id']; //to_user_id 
            } 
            insertActivities($userId, $otherUserId, 'Milestone', $milestone['id'], $oldMilestoneStatus, $status, \Constants\ActivityType::MilestoneStatuschanged, $milestone['project_id']);
            $milestone = Models\Milestone::with(array(
                'user',
                'milestone_status',
                'project' => function ($q) {
                    $q->with(array(
                        'project_bid' => function ($q1) {
                            return $q1->where('is_active', 1);
                        }
                    ));
                }
                ,
                'bid' => function ($q) {
                    return $q->where('bid_status_id', \Constants\BidStatus::Won);
                }
            ));
            $milestone = $milestone->find($request->getAttribute('milestoneId'))->toArray();
            $result['data'] = $milestone;
            return renderWithJson($result);
        }
    } else {
        return renderWithJson($result, 'Milestone could not be updated. Please, try again.', '', 1);
    }
})->add(new ACL('canUpdateMilestoneUpdateStatus'));
/**
 * GET milestoneStatusesGet
 * Summary: Fetch all milestone statuses
 * Notes: Returns all milestone statuses from the system
 * Output-Formats: [application/json]
 */
$app->GET('/api/v1/milestone_statuses', function ($request, $response, $args) {
    $queryParams = $request->getQueryParams();
    $results = array();
    global $authUser;
    try {
        $milestoneStatuses = Models\MilestoneStatus::Filter($queryParams)->paginate(PAGE_LIMIT)->toArray();
        if (!empty($queryParams['project_id']) || !empty($queryParams['user_id'])) {
            foreach ($milestoneStatuses as $key => $milestoneStatus) {
                $milestone = Models\Milestone::where('milestone_status_id', $milestoneStatus['id']);
                if (!empty($queryParams['project_id'])) {
                    $milestone = $milestone->where('project_id', $queryParams['project_id']);
                }
                if (!empty($queryParams['user_id'])) {
                    $milestone = $milestone->where('user_id', $queryParams['user_id']);
                }
                $milestone = $milestone->count();
                $milestoneStatus[$key]['milestone_count'] = $milestone;
            }
        }
        $data = $milestoneStatuses['data'];
        unset($milestoneStatuses['data']);
        $results = array(
            'data' => $data,
            '_metadata' => $milestoneStatuses
        );
        return renderWithJson($results);
    } catch (Exception $e) {
        return renderWithJson($results, $message = 'No record found', $fields = '', $isError = 1);
    }
});
/**
 * GET milestonesmilestoneStatusIdGet
 * Summary: Fetch milestone status
 * Notes: Returns a milestone based on a single ID
 * Output-Formats: [application/json]
 */
$app->GET('/api/v1/milestone_statuses/{milestoneStatusId}', function ($request, $response, $args) {
    $result = array();
    $milestoneStatuses = Models\MilestoneStatus::find($request->getAttribute('milestoneStatusId'));
    if (!empty($milestoneStatuses)) {
        $result['data'] = $milestoneStatuses;
        return renderWithJson($result);
    } else {
        return renderWithJson($result, 'No record found', '', 1);
    }
});
/**
 * GET meMilestonesGet
 * Summary: Fetch all milestones
 * Notes: Returns all milestones from the system
 * Output-Formats: [application/json]
 */
$app->GET('/api/v1/me/milestones', function ($request, $response, $args) {
    global $authUser;
    $queryParams = $request->getQueryParams();
    $results = array();
    try {
        $count = PAGE_LIMIT;
        if (!empty($queryParams['limit'])) {
            $count = $queryParams['limit'];
        }
        $bidProjects = Models\Bid::select('project_id')->where('user_id', $authUser->id)->where('bid_status_id', \Constants\BidStatus::Won)->get();
        $enabledIncludes = array(
            'user',
            'milestone_status'
        );
        (isPluginEnabled('Bidding/Bidding')) ? $enabledIncludes[] = 'project' : '';
        (isPluginEnabled('Bidding/Bidding')) ? $enabledIncludes[] = 'bid' : '';
        $milestones = Models\Milestone::with($enabledIncludes)->whereIn('project_id', $bidProjects);
        $milestones = $milestones->Filter($queryParams)->paginate($count)->toArray();
        $data = $milestones['data'];
        unset($milestones['data']);
        $results = array(
            'data' => $data,
            '_metadata' => $milestones
        );
        return renderWithJson($results);
    } catch (Exception $e) {
        return renderWithJson($results, $message = 'No record found', $fields = '', $isError = 1);
    }
})->add(new ACL('canListMyMilestone'));
/**
 * GET meMilestonesGet
 * Summary: Fetch all milestones
 * Notes: Returns all milestones from the system
 * Output-Formats: [application/json]
 */
$app->GET('/api/v1/employer/{employerId}/milestones', function ($request, $response, $args) {
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
            'milestone_status'
        );
        (isPluginEnabled('Bidding/Bidding')) ? $enabledIncludes[] = 'project' : '';
        (isPluginEnabled('Bidding/Bidding')) ? $enabledIncludes[] = 'bid' : '';
        $milestones = Models\Milestone::with($enabledIncludes);
        $milestones = $milestones->orWhereHas('project', function ($q) use ($authUser) {
            $q->where('user_id', $authUser->id);
        });
        $milestones = $milestones->Filter($queryParams)->paginate($count)->toArray();
        $data = $milestones['data'];
        unset($milestones['data']);
        $results = array(
            'data' => $data,
            '_metadata' => $milestones
        );
        return renderWithJson($results);
    } catch (Exception $e) {
        return renderWithJson($results, $message = 'No record found', $fields = '', $isError = 1);
    }
})->add(new ACL('canListMyEmployerMilestone'));
