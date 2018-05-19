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
 * GET messagesGet
 * Summary: Fetch all messages
 * Notes: Returns all messages from the system
 * Output-Formats: [application/json]
 */
$app->GET('/api/v1/messages', function ($request, $response, $args) {
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
            'foreign_message',
            'children',
            'attachment',
            'message_content'
        );
        $messages = Models\Message::with($enabledIncludes);
        if (empty($queryParams['type'])) {
            $messages = $messages->where('is_sender', 1);
        }
        $messages = $messages->where('parent_id', 0);
        if (empty($authUser)) {
            if ((empty($queryParams['class']) && empty($queryParams['foreign_id'])) || (!empty($queryParams['class']) && ($queryParams['class'] == 'QuoteBid' && (isPluginEnabled('Quote/Quote'))) && !empty($queryParams['foreign_id']))) {
                return renderWithJson($results, $message = 'Authorization Failed', $fields = '', $isError = 1);
            }
        } elseif (!empty($queryParams['type'])) {
            if ($queryParams['type'] == 'sent') {
                $messages = $messages->where('user_id', $authUser->id);
            } elseif ($queryParams['type'] == 'inbox') {
                $messages = $messages->where('other_user_id', $authUser->id);
            } elseif ($queryParams['type'] == 'notification') {
                $messages = $messages->where('is_sender', 0);
                $followers = Models\Follower::select('foreign_id as id', 'class')->where('user_id', $authUser->id)->get();
                $messages = $messages->where(function ($query) use ($authUser, $followers) {
                    $query->orWhere('user_id', $authUser->id);
                    $conestFollower = array();
                    $projectFollower = array();
                    $quoteServicesFollower = array();
                    $portfoliosFollower = array();
                    $contestUsersFollower = array();
                    if (!empty($followers)) {
                        foreach ($followers as $follower) {
                            if ($follower->class == 'Contest') {
                                $conestFollower[]['id'] = $follower->id;
                            }
                            if ($follower->class == 'Project') {
                                $projectFollower[]['id'] = $follower->id;
                            }
                            if ($follower->class == 'QuoteService') {
                                $quoteServicesFollower[]['id'] = $follower->id;
                            }
                            if ($follower->class == 'Portfolio') {
                                $portfoliosFollower[]['id'] = $follower->id;
                            }
                            if ($follower->class == 'ContestUser') {
                                $contestUsersFollower[]['id'] = $follower->id;
                            }
                        }
                    }
                    $contests = Models\Contest::where('user_id', $authUser->id)->select('id')->get();
                    if (!empty($contests)) {
                        $contests = array_unique(array_merge($contests->toArray(), $conestFollower), SORT_REGULAR);
                        $query->orWhere(function ($query1) use ($contests) {
                            $query1->where('class', 'Contest')->whereIn('model_id', $contests);
                        });
                    }
                    $projects = Models\Project::where('user_id', $authUser->id)->select('id')->get();
                    if (!empty($projects)) {
                        $projects = array_unique(array_merge($projects->toArray(), $projectFollower), SORT_REGULAR);
                        $query->orWhere(function ($query2) use ($projects) {
                            $query2->where('class', 'Project')->whereIn('model_id', $projects);
                        });
                    }
                    $quoteServices = Models\QuoteService::where('user_id', $authUser->id)->select('id')->get();
                    if (!empty($quoteServices)) {
                        $quoteServices = array_unique(array_merge($quoteServices->toArray(), $quoteServicesFollower), SORT_REGULAR);
                        $query->orWhere(function ($query3) use ($quoteServices) {
                            $query3->where('class', 'QuoteBid')->whereIn('model_id', $quoteServices);
                        });
                    }
                    $portfolios = Models\Portfolio::where('user_id', $authUser->id)->select('id')->get();
                    if (!empty($portfolios)) {
                        $portfolios = array_unique(array_merge($portfolios->toArray(), $portfoliosFollower), SORT_REGULAR);
                        $query->orWhere(function ($query4) use ($portfolios) {
                            $query4->where('class', 'Portfolio')->whereIn('model_id', $portfolios);
                        });
                    }
                    $contestUsers = Models\ContestUser::where('user_id', $authUser->id)->select('id')->get();
                    if (!empty($contestUsers)) {
                        $contestUsers = array_unique(array_merge($contestUsers->toArray(), $contestUsersFollower), SORT_REGULAR);
                        $query->orWhere(function ($query5) use ($contestUsers) {
                            $query5->where('class', 'ContestUser')->whereIn('foreign_id', $contestUsers);
                        });
                    }
                });
            }
        }
        $messages = $messages->Filter($queryParams)->paginate($count)->toArray();
        $data = $messages['data'];
        unset($messages['data']);
        if ($data) {
            foreach ($data as $key => $record) {
                if ((empty($authUser) && !empty($record['is_private'])) || (!empty($authUser) && $authUser['role_id'] != \Constants\ConstUserTypes::Admin && $authUser['id'] != $record['user_id'] && $authUser['id'] != $record['other_user_id'] && !empty($record['is_private']))) {
                    $data[$key]['message_content']['subject'] = '[Private Message]';
                    $data[$key]['message_content']['message'] = '[Private Message]';
                }
                $childrenMessage = Models\Message::setChildPrivateMessage($authUser, $record['children']);
                $data[$key]['children'] = $childrenMessage;
            }
        }
        $results = array(
            'data' => $data,
            '_metadata' => $messages
        );
        return renderWithJson($results);
    } catch (Exception $e) {
        return renderWithJson($results, $message = 'No record found', $fields = '', $isError = 1);
    }
});
/**
 * GET messagesMessageIdGet
 * Summary: Fetch message
 * Notes: Returns a message based on a single ID
 * Output-Formats: [application/json]
 */
$app->GET('/api/v1/messages/{messageId}', function ($request, $response, $args) {
    global $authUser;
    $result = array();
    $enabledIncludes = array(
        'user',
        'foreign_message',
        'children',
        'attachment',
        'message_content'
    );
    $message = Models\Message::with($enabledIncludes)->find($request->getAttribute('messageId'));
    if (!empty($message)) {
        $message = $message->toArray();
        if ((empty($authUser) && !empty($message['is_private'])) || (!empty($authUser) && $authUser['role_id'] != \Constants\ConstUserTypes::Admin && $authUser['id'] != $message['user_id'] && $authUser['id'] != $message['other_user_id'] && !empty($message['is_private']))) {
            $message['message_content']['subject'] = '[Private Message]';
            $message['message_content']['message'] = '[Private Message]';
        }
        $childrenMessage = Models\Message::setChildPrivateMessage($authUser, $message['children']);
        $message['children'] = $childrenMessage;
        $result['data'] = $message;
        if (($message['class'] == 'QuoteBid' && (isPluginEnabled('Quote/Quote'))) && empty($message['is_read'])) {
            Models\Message::where('id', $message['id'])->update(array(
                'is_read' => 1
            ));
            $quoteBid = Models\QuoteBid::where('id', $message['foreign_id'])->first();
            if (!empty($quoteBid)) {
                if ($message['other_user_id'] == $quoteBid->user_id) {
                    $unreadedMessageCount = Models\Message::where('foreign_id', $message['foreign_id'])->where('class', 'QuoteBid')->where('other_user_id', $message['other_user_id'])->whereNull('is_read')->count();
                    Models\QuoteBid::where('id', $message['foreign_id'])->update(array(
                        'requestor_unread_message_count' => $unreadedMessageCount
                    ));
                } elseif ($message['other_user_id'] == $quoteBid->service_provider_user_id) {
                    $unreadedMessageCount = Models\Message::where('foreign_id', $message['foreign_id'])->where('class', 'QuoteBid')->where('other_user_id', $message['other_user_id'])->whereNull('is_read')->count();
                    Models\QuoteBid::where('id', $message['foreign_id'])->update(array(
                        'provider_unread_message_count' => $unreadedMessageCount
                    ));
                }
            }
        }
        return renderWithJson($result);
    } else {
        return renderWithJson($result, 'No record found', '', 1);
    }
});
/**
 * POST messagesPost
 * Summary: Creates a new message
 * Notes: Creates a new message
 * Output-Formats: [application/json]
 */
$app->POST('/api/v1/messages', function ($request, $response, $args) {
    global $authUser;
    global $_server_domain_url;
    $args = $request->getParsedBody();
    $message = new Models\Message($args);
    $result = array();
    try {
        if (!empty($args['class']) && ($args['class'] == 'QuoteBid')) {
            $quotebid = Models\QuoteBid::where('id', $args['foreign_id'])->where('quote_status_id', \Constants\QuoteStatus::NewBid)->first();
            if (((isPluginEnabled('Common/Subscription')) && empty(IS_ALLOW_PROVIDER_TO_SEND_MESSAGE_BEFORE_PAY_CREDIT)) && !empty($quotebid)) {
                return renderWithJson($result, 'Message could not be added. Please, try again.', '', 1);
            }
        }
        $depthFlag = 0;
        if (!empty($args['class']) && ($args['class'] == 'Contest')) {
            $contest = Models\Contest::where('id', $args['foreign_id'])->select('contest_status_id')->first();
            $statusFlag = 0;
            if (CONTEST_ALLOW_ALL_USERS_TO_COMMENT_UPTO_STATUS == "Open") {
                if ($contest->contest_status_id == \Constants\ConstContestStatus::Open) {
                    $statusFlag = 1;
                }
            }
            if (CONTEST_ALLOW_ALL_USERS_TO_COMMENT_UPTO_STATUS == "Judging") {
                if ($contest->contest_status_id == \Constants\ConstContestStatus::Judging || $contest->contest_status_id == \Constants\ConstContestStatus::Open) {
                    $statusFlag = 1;
                }
            }
            if (CONTEST_ALLOW_ALL_USERS_TO_COMMENT_UPTO_STATUS == "WinnerSelected") {
                if ($contest->contest_status_id <= \Constants\ConstContestStatus::WinnerSelected || $contest->contest_status_id == \Constants\ConstContestStatus::Judging || $contest->contest_status_id == \Constants\ConstContestStatus::Open || $contest->contest_status_id == \Constants\ConstContestStatus::WinnerSelectedByAdmin) {
                    $statusFlag = 1;
                }
            }
            if (CONTEST_ALLOW_ALL_USERS_TO_COMMENT_UPTO_STATUS == "Completed") {
                if (($contest->contest_status_id >= \Constants\ConstContestStatus::Judging && $contest->contest_status_id <= \Constants\ConstContestStatus::Completed) || $contest->contest_status_id == \Constants\ConstContestStatus::Open) {
                    $statusFlag = 1;
                }
            }
            if (empty($statusFlag)) {
                return renderWithJson($result, 'Your contest comment status level exits.', '', 1);
            }
        }
        if (!empty($args['parent_id'])) {
            $message = Models\Message::where('id', $args['parent_id'])->select('depth')->first();
            if (!empty($message) && (empty(MESSAGE_THREAD_MAX_DEPTH) || $message->depth < MESSAGE_THREAD_MAX_DEPTH)) {
                $depthFlag = 1;
            }
            if (empty($depthFlag)) {
                return renderWithJson($result, 'Your not eligible to reply this message.', '', 1);
            }
        }
        $message->user_id = $authUser['id'];
        $validationErrorFields = $message->validate($args);
        if (empty($validationErrorFields)) {
            $messageContent = new Models\MessageContent;
            $messageContent->message = $args['message'];
            $messageContent->subject = $args['subject'];
            $depth = 0;
            $path = '';
            $messageContent->save();
            $parentId = 0;
            if (!empty($args['parent_id'])) {
                $parentId = $args['parent_id'];
                $parentMessage = Models\Message::where('id', $args['parent_id'])->select('id', 'depth', 'materialized_path', 'is_private', 'message_content_id')->first();
                if (!empty($parentMessage)) {
                    $depth = $parentMessage->id;
                    $path = $parentMessage->materialized_path;
                }
            }
            if (!empty($args['image']['attachment'])) {
                saveImage('MessageContent', $args['image']['attachment'], $messageContent->id);
            }
            if (!empty($args['image_data'])) {
                saveImageData('MessageContent', $args['image_data'], $messageContent->id);
            }
            $privateStatus = $otherUserId = $parentPrivateStatus = 0;
            $modelId = $args['foreign_id'];
            $modelClass =  '';
            if (!empty($args['class']) && ($args['class'] == 'Contest')) {
                $enabledIncludes = array();
                (isPluginEnabled('Contest/Contest')) ? $enabledIncludes[] = 'contest_users' : '';
                $contest = Models\Contest::where('id', $args['foreign_id'])->with($enabledIncludes)->first();
                if (!empty($contest)) {
                    if ($authUser->id == $contest->user_id) {
                        //Contest Holder message
                        if (!empty($args['is_private']) || (!empty($args['parent_id']) && !empty($parentMessage->is_private))) {
                            //Contest Holder with reply private message
                            $privateStatus = 1;
                            $otherUserId = $contest['contest_users'][0]->user_id;
                        }
                    } elseif ($authUser->id == $contest['contest_users'][0]->user_id) {
                        //Participant message
                        if (!empty($args['is_private'])) {
                            $privateStatus = 1;
                            $otherUserId = $contest->user_id;
                        }
                    }
                    if (!empty($args['parent_id']) && !empty($parentMessage)) {
                        $privateStatus = $parentMessage->is_private;
                    }
                }
                $modelClass = 'Contest';                
            } elseif (!empty($args['class']) && ($args['class'] == 'ContestUser')) {
                $contestUser = Models\ContestUser::where('id', $args['foreign_id'])->first();
                if (!empty($contestUser)) {
                    $modelId = $contestUser->contest_id;
                    $privateStatus = 1;
                    if ($authUser->id == $contestUser->contest_owner_user_id) {
                        //Contest Holder message
                        $otherUserId = $contestUser->user_id;
                    } elseif ($authUser->id == $contestUser->user_id) {
                        //Participant message
                        $otherUserId = $contestUser->contest_owner_user_id;
                    }
                } 
                $modelClass = 'Contest';               
            } elseif (!empty($args['class']) && ($args['class'] == 'QuoteBid') && (isPluginEnabled('Quote/Quote'))) {
                $quoteBid = Models\QuoteBid::where('id', $args['foreign_id'])->first();
                if (!empty($quoteBid)) {
                    $modelId = $quoteBid->quote_service_id;
                    $privateStatus = 1;
                    if ($authUser->id == $quoteBid->service_provider_user_id) {
                        $otherUserId = $quoteBid->user_id;
                        $receivedMessageCount = $quoteBid->requestor_received_message_count + 1;
                        $unReadedMessageCount = $quoteBid->requestor_unread_message_count + 1;
                        $unreadedMessageCount = Models\Message::where('foreign_id', $args['foreign_id'])->where('class', 'QuoteBid')->where('other_user_id', $otherUserId)->whereNull('is_read')->count();
                        Models\QuoteBid::where('id', $args['foreign_id'])->update(array(
                            'requestor_received_message_count' => $receivedMessageCount,
                            'requestor_unread_message_count' => $unreadedMessageCount,
                            'requestor_unread_message_count' => $unreadedMessageCount,
                            'is_requestor_readed' => 0
                        ));
                    } elseif ($authUser->id == $quoteBid->user_id) {
                        $otherUserId = $quoteBid->service_provider_user_id;
                        $receivedMessageCount = $quoteBid->provider_received_message_count + 1;
                        $unReadedMessageCount = $quoteBid->provider_unread_message_count + 1;
                        $unreadedMessageCount = Models\Message::where('foreign_id', $args['foreign_id'])->where('class', 'QuoteBid')->where('other_user_id', $otherUserId)->whereNull('is_read')->count();
                        Models\QuoteBid::where('id', $args['foreign_id'])->update(array(
                            'provider_received_message_count' => $receivedMessageCount,
                            'provider_unread_message_count' => $unreadedMessageCount,
                            'provider_unread_message_count' => $unreadedMessageCount,
                            'is_provider_readed' => 0
                        ));
                    }
                }
                $modelClass = 'QuoteService';
            } elseif (!empty($args['class']) && ($args['class'] == 'Bid')) {
                $enabledIncludes = array();
                (isPluginEnabled('Bidding/Bidding')) ? $enabledIncludes[] = 'project' : '';
                $bid = Models\Bid::with($enabledIncludes)->where('id', $args['foreign_id'])->first();
                if (!empty($bid)) {
                    $modelId = $bid->project_id;
                    $privateStatus = 1;
                    if ($authUser->id == $bid->user_id) {
                        $otherUserId = $bid->project->user_id;
                    } elseif ($authUser->id == $bid->project->user_id) {
                        $otherUserId = $bid->user_id;
                    }
                }
                $modelClass = 'Project';
            } elseif (!empty($args['class']) && ($args['class'] == 'ProjectDispute')) {
                $enabledIncludes = array();
                (isPluginEnabled('Bidding/Bidding')) ? $enabledIncludes[] = 'project' : '';
                (isPluginEnabled('Bidding/Bidding')) ? $enabledIncludes[] = 'bid' : '';
                $projectDispute = Models\ProjectDispute::with($enabledIncludes)->where('id', $args['foreign_id'])->first();
                if (!empty($projectDispute)) {
                    $modelId = $projectDispute->project_id;
                    $privateStatus = 1;
                    if ($authUser->id == $projectDispute->project->freelancer_user_id) {
                        $otherUserId = $projectDispute->project->user_id;
                    } elseif ($authUser->id == $projectDispute->project->user_id) {
                        $otherUserId = $projectDispute->project->freelancer_user_id;
                    }
                }
                $modelClass = 'Project';
            }
        
            $senderMessageId = saveMessage($depth, $path, $authUser->id, $otherUserId, $messageContent->id, $parentId, $args['class'], $args['foreign_id'], 1, $modelId, $privateStatus);
            if (!empty($args['class']) && ($args['class'] == 'Portfolio')) {
                $messageCount = Models\Message::where('foreign_id', $args['foreign_id'])->where('class', 'Portfolio')->count();
                $portfolio = Models\Portfolio::where('id', $args['foreign_id'])->update(array(
                    'message_count' => $messageCount
                ));
                insertActivities($authUser->id, 0, 'Message', $senderMessageId, 0, 0, \Constants\ActivityType::PortfolioComment, $args['foreign_id'], 0 ,$args['class']);
            }
            if (!empty($args['class']) && (in_array($args['class'], ['QuoteBid', 'Bid', 'ContestUser', 'ProjectDispute']))) {
                $activityType = \Constants\ActivityType::QuoteConversation;
                if (in_array($args['class'], ['Bid', 'ProjectDispute'])) {
                    $activityType = \Constants\ActivityType::ProjectConversation;
                } elseif ($args['class'] == 'ContestUser') {
                    $activityType = \Constants\ActivityType::ContestConversation;
                }
                insertActivities($authUser->id, $otherUserId, 'Message', $senderMessageId, 0, 0, $activityType, $modelId, 0 ,$modelClass);
            }
            if (!empty($privateStatus)) {
                if (!empty($parentId)) {
                    $otherMessageId = Models\Message::where('id', '!=', $parentId)->where('message_content_id', $parentMessage->message_content_id)->select('id')->first();
                    if (!empty($otherMessageId)) {
                        $parentId = $otherMessageId->id;
                        $receiverMessageId = saveMessage($depth, $path, $authUser->id, $otherUserId, $messageContent->id, $parentId, $args['class'], $args['foreign_id'], 1, $modelId, $privateStatus);
                    }
                } else {
                    $receiverMessageId = saveMessage($depth, $path, $otherUserId, $authUser->id, $messageContent->id, $parentId, $args['class'], $args['foreign_id'], 0, $modelId, $privateStatus);
                }
                if (!empty($otherUserId)) {
                    $otherUserDetails = getUserHiddenFields($otherUserId);
                    $authUserDetails = getUserHiddenFields($authUser->id);
                    global $_server_domain_url;
                    $emailFindReplace = array(
                        '##OTHERUSERNAME##' => $otherUserDetails->username,
                        '##USERNAME##' => $authUserDetails->username,
                        '##MESSAGE_LINK##' => $_server_domain_url . '/messages/' . $receiverMessageId,
                        '##MESSAGE##' => $args['message']
                    );
                    sendMail('newmessage', $emailFindReplace, $otherUserDetails->email);
                }
            }

            if (!empty($args['class']) && ($args['class'] == 'Bid') && (isPluginEnabled('Bidding/Bidding'))) {
                $bid = Models\Bid::where('id', $args['foreign_id'])->first();
                $authUserDetails = Models\User::where('id', $authUser['id'])->first();
                $emailFindReplace = array(
                        '##USERNAME##' => $bid->user->username,
                        '##SENDER_USERNAME##' => $authUserDetails->username,
                        '##PROJECT_NAME##' => $bid->project->name,
                        '##MESSAGE##' => $args['message'],
                        '##RESPONSE_URL##' =>$_server_domain_url . '/projects/view/' . $bid->project->id . '/' . $bid->project->slug
                    );
                    sendMail('New Message Received in Project', $emailFindReplace, $bid->user->email);
            }
            if (!empty($args['class']) && ($args['class'] == 'QuoteBid') && (isPluginEnabled('Quote/Quote'))) {
                $quoteBid = Models\QuoteBid::where('id', $args['foreign_id'])->first();
                $authUserDetails = Models\User::where('id', $authUser['id'])->first();
                if($authUser['id'] == $quoteBid->user_id){
                    $responseUrl =    $_server_domain_url . '/my_works'; 
                }elseif($authUser['id'] == $quoteBid->provider_user_id){
                    $responseUrl =    $_server_domain_url . '/my_requests'; 
                }
                    $emailFindReplace = array(
                        '##USERNAME##' => $quoteBid->user->username,
                        '##SENDER_USERNAME##' => $authUserDetails->username,
                        '##CATEGORY##' => $quoteBid->quote_request->quote_category->name,
                        '##MESSAGE##' => $args['message'],
                        '##RESPONSE_URL##' =>$responseUrl
                    );
                    sendMail('New Message Received in Quote Request', $emailFindReplace, $quoteBid->user->email);
            }

            $allowed_class = array(
                'ContestUser',
                'Contest',
                'Portfolio',
                'Project',
                'Bid'
            );
            if (!empty($args['class']) && in_array($args['class'], $allowed_class)) {
                $model = 'Models\\' . $args['class'];
                $messageCount = Models\Message::where('foreign_id', $args['foreign_id'])->where('class', $args['class'])->where('is_sender', 1)->count();
                $model::where('id', $args['foreign_id'])->update(array(
                    'message_count' => $messageCount
                ));
            }
            if (!empty($args['class']) && ($args['class'] == 'ProjectDispute')) {
                $projectDisputeCount = Models\Message::where('foreign_id', $args['foreign_id'])->where('class', $args['class'])->where('is_sender', 1)->count();
                $adminId = Models\User::select('id')->where('role_id', \Constants\ConstUserTypes::Admin)->first();
                if ($projectDisputeCount == 1) {
                    Models\ProjectDispute::where('id', $args['foreign_id'])->update(array(
                        'dispute_status_id' => \Constants\ConstDisputeStatus::UnderDiscussion
                    ));
                    insertActivities($adminId['id'], $projectDispute->project->user_id, 'ProjectDispute', $projectDispute->id, $projectDispute->dispute_status_id, \Constants\ConstDisputeStatus::UnderDiscussion, \Constants\ActivityType::ProjectDisputeStatusChanged, $projectDispute->project->id);
                    insertActivities($adminId['id'], $projectDispute->project->freelancer_user_id, 'ProjectDispute', $projectDispute->id, $projectDispute->dispute_status_id, \Constants\ConstDisputeStatus::UnderDiscussion, \Constants\ActivityType::ProjectDisputeStatusChanged, $projectDispute->project->id);
                }
                $employerMessageCount = Models\Message::where('foreign_id', $args['foreign_id'])->where('class', $args['class'])->where('user_id', $projectDispute->project->user_id)->where('is_sender', 1)->count();
                $freelancerMessageCount = Models\Message::where('foreign_id', $args['foreign_id'])->where('class', $args['class'])->where('user_id', $projectDispute->bid->user_id)->where('is_sender', 1)->count();
                if ($employerMessageCount >= DISPUTE_CONVERSATION_COUNT && $freelancerMessageCount >= DISPUTE_CONVERSATION_COUNT) {
                    Models\ProjectDispute::where('id', $args['foreign_id'])->update(array(
                        'dispute_status_id' => \Constants\ConstDisputeStatus::WaitingForAdministratorDecision
                    ));
                    insertActivities($adminId['id'], $projectDispute->project->user_id, 'ProjectDispute', $projectDispute->id, $projectDispute->dispute_status_id, \Constants\ConstDisputeStatus::WaitingForAdministratorDecision, \Constants\ActivityType::ProjectDisputeStatusChanged, $projectDispute->project->id);
                    insertActivities($adminId['id'], $projectDispute->project->freelancer_user_id, 'ProjectDispute', $projectDispute->id, $projectDispute->dispute_status_id, \Constants\ConstDisputeStatus::WaitingForAdministratorDecision, \Constants\ActivityType::ProjectDisputeStatusChanged, $projectDispute->project->id);
                }
            }
            $enabledIncludes = array(
                'user',
                'foreign_message',
                'children',
                'attachment',
                'message_content'
            );
            $result = Models\Message::with($enabledIncludes)->find($senderMessageId)->toArray();
            return renderWithJson($result);
        } else {
            return renderWithJson($result, 'Message could not be added. Please, try again.', $validationErrorFields, 1);
        }
    } catch (Exception $e) {
        return renderWithJson($result, 'Message could not be added. Please, try again.', '', 1);
    }
})->add(new ACL('canCreateMessage'));
