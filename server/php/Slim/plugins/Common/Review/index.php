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
 * GET Review Get
 * Summary: all Review
 * Notes: all Review
 * Output-Formats: [application/json]
 */
$app->GET('/api/v1/reviews', function ($request, $response, $args) {
    $queryParams = $request->getQueryParams();
    $result = array();
    try {
        global $capsule;
        $count = PAGE_LIMIT;
        if (!empty($queryParams['limit'])) {
            $count = $queryParams['limit'];
        }
        if (!empty($queryParams) && !empty($queryParams['type']) && empty($queryParams['class'])) {
            $enabledIncludes = array(
                'user',
                'ip',
                'other_user',
                'foreign_review_model'
            );
            (isPluginEnabled('Quote/Quote')) ? $enabledIncludes[] = 'quote_bid' : '';
            (isPluginEnabled('Bidding/Bidding')) ? $enabledIncludes[] = 'bid' : '';
            $reviews = Models\Review::with($enabledIncludes)->Filter($queryParams);
            if ($queryParams['type'] == 'freelancer') {
                $reviews = $reviews->where('is_freelancer', 1);
            } elseif ($queryParams['type'] == 'employer') {
                $reviews = $reviews->where('is_freelancer', 0);
            }
        } else {
            if (!empty($queryParams) && !empty($queryParams['class']) && $queryParams['class'] == 'QuoteBid') {
                $enabledIncludes = array(
                    'user',
                    'ip',
                    'other_user',
                    'foreign_review_model'
                );
                (isPluginEnabled('Quote/Quote')) ? $enabledIncludes[] = 'quote_bid' : '';
                $reviews = Models\Review::with($enabledIncludes)->Filter($queryParams);
                if ($queryParams['type'] == 'freelancer') {
                    $reviews = $reviews->where('is_freelancer', 1);
                } elseif ($queryParams['type'] == 'employer') {
                    $reviews = $reviews->where('is_freelancer', 0);
                }
            } elseif (!empty($queryParams) && !empty($queryParams['class']) && $queryParams['class'] == 'Bid') {
                $enabledIncludes = array(
                    'user',
                    'ip',
                    'other_user',
                    'foreign_review_model'
                );
                (isPluginEnabled('Bidding/Bidding')) ? $enabledIncludes[] = 'bid' : '';
                $reviews = Models\Review::with($enabledIncludes)->Filter($queryParams);
                if ($queryParams['type'] == 'freelancer') {
                    $reviews = $reviews->where('is_freelancer', 1);
                } elseif ($queryParams['type'] == 'employer') {
                    $reviews = $reviews->where('is_freelancer', 0);
                }
            } elseif (!empty($queryParams) && !empty($queryParams['class']) && $queryParams['class'] == 'ContestUser') {
                $enabledIncludes = array(
                    'user',
                    'ip',
                    'other_user',
                    'foreign_review_model',
                    'foreign_review',
                    'attachment'
                );
                $reviews = Models\Review::with($enabledIncludes)->Filter($queryParams);
            } else {
                $enabledIncludes = array(
                    'user',
                    'ip',
                    'other_user',
                    'foreign_review',
                    'foreign_review_model'
                );
                $reviews = Models\Review::with($enabledIncludes)->Filter($queryParams);
            }
        }
        $reviews = $reviews->paginate($count)->toArray();
        $data = $reviews['data'];
        unset($reviews['data']);
        $result = array(
            'data' => $data,
            '_metadata' => $reviews
        );
        return renderWithJson($result);
    } catch (Exception $e) {
        return renderWithJson($result, $message = 'No record found', $fields = '', $isError = 1);
    }
});
/**
 * POST Review POST
 * Summary:Post Review
 * Notes:  Post Review
 * Output-Formats: [application/json]
 */
$app->POST('/api/v1/reviews', function ($request, $response, $args) {
    global $authUser;
    global $_server_domain_url;
    $args = $request->getParsedBody();
    $reviews = new Models\Review($args);
    $result = array();
    try {
        $validationErrorFields = $reviews->validate($args);
        if (empty($validationErrorFields)) {
            $reviews->is_freelancer = 1;
            if ($reviews->class == 'QuoteBid') {
                $reviews->is_freelancer = 0;
            }
            $reviews->to_user_id = getToUserIdFromClass($args['foreign_id'], $args['class']);
            if ($authUser['id'] == $reviews->to_user_id && $reviews->class == 'QuoteBid') {
                $reviews->is_freelancer = 1;
                $quoteBidDetails = Models\QuoteBid::select('service_provider_user_id')->where('id', $reviews->foreign_id)->first();
                if (!empty($quoteBidDetails)) {
                    $reviews->to_user_id = $quoteBidDetails->service_provider_user_id;
                }
            }
            $reviews->model_id = $args['foreign_id'];
            if ($reviews->class == 'QuoteBid') {
                $quoteBidDetails = Models\QuoteBid::find($reviews->foreign_id);
                if (!empty($quoteBidDetails)) {
                    if ($authUser->id == $quoteBidDetails->service_provider_user_id) {
                         if (!in_array($quoteBidDetails->quote_status_id, [\Constants\QuoteStatus::Closed, \Constants\QuoteStatus::NotCompleted])) {
                            return renderWithJson($result, 'Quote review only in the status of closed or Notcompleted', '', 1);
                        }
                        $quoteBidDetails->is_requestor_readed = 0;
                        $quoteBidDetails->save();
                    } elseif ($authUser->id == $quoteBidDetails->user_id) {
                        if (!in_array($quoteBidDetails->quote_status_id, [\Constants\QuoteStatus::Completed, \Constants\QuoteStatus::Closed, \Constants\QuoteStatus::NotCompleted])) {
                            return renderWithJson($result, 'Quote review only in the status of Completed/Closed/Notcompleted', '', 1);
                        }
                        $quoteBidDetails->is_provider_readed = 0;
                        $quoteBidDetails->save();
                    }
                }
                $reviews->model_id = $quoteBidDetails->quote_service_id;
            } elseif ($reviews->class == 'Bid') {
                $enabledIncludes = array();
                (isPluginEnabled('Bidding/Bidding')) ? $enabledIncludes[] = 'project' : '';
                $bids = Models\Bid::with($enabledIncludes)->where('id', $reviews->foreign_id)->select('project_id', 'user_id')->whereHas('project', function ($q) {
                    $q->where('project_status_id', \Constants\ProjectStatus::FinalReviewPending);
                })->first();
                if (empty($bids)) {
                    return renderWithJson($result, 'Review only project status of Final Review Pending', '', 1);
                }
                if ($authUser['id'] == $reviews->to_user_id && $reviews->class == 'Bid') {
                    $reviews->is_freelancer = 0;
                    if (!empty($bids->project)) {
                        $reviews->to_user_id = $bids->project->user_id;
                    }
                }
                $reviews->model_id = $bids->project_id;
                $checkAlreadyExits = Models\Review::where('foreign_id', $args['foreign_id'])->where('model_id', $bids->project_id)->where('class', 'Bid')->where('user_id', $authUser->id)->count();
                if ($checkAlreadyExits > 0) {
                    return renderWithJson($result, 'Already reviewed for this Bid', '', 1);
                }
            }
            $reviews->user_id = $authUser['id'];
            $reviews->ip_id = saveIp();
            $checkReviewCount = Models\Review::where('user_id', $reviews->user_id)->where('to_user_id', $reviews->to_user_id)->where('class', $reviews->class)->where('foreign_id', $reviews->foreign_id)->count();
            if ($checkReviewCount > 0) {
                return renderWithJson($result, 'Already reviewed', '', 1);
            }
            if (in_array($reviews->class, ['Bid', 'Project'])) {
                $reviews->model_class = 'Project';
            } elseif (in_array($reviews->class, ['QuoteBid', 'QuoteService'])) {
                $reviews->model_class = 'QuoteService';
            } elseif (in_array($reviews->class, ['ContestUser', 'Contest'])) {
                $reviews->model_class = 'Contest';
            }
            $reviews->save();
            $modelId = $args['foreign_id'];
            if ($reviews->class == 'ContestUser') {
                $modelId = getContestId($args['foreign_id'], $args['class']);
                $reviews->model_id = $modelId;
                $reviews->update();
                $avgReviewCount = Models\Review::where('class', 'ContestUser')->where('foreign_id', $reviews->foreign_id)->avg('rating');
                $totalReviewCount = Models\Review::where('class', 'ContestUser')->where('foreign_id', $reviews->foreign_id)->sum('rating');
                $totalCount = Models\Review::where('class', 'ContestUser')->where('foreign_id', $reviews->foreign_id)->count();
                Models\ContestUser::where('id', $reviews->foreign_id)->update(array(
                    'average_rating' => $avgReviewCount,
                    'contest_user_total_ratings' => $totalReviewCount,
                    'contest_user_rating_count' => $totalCount
                ));
            }
            insertActivities($reviews->user_id, $reviews->to_user_id, 'Review', $reviews->id, 0, 0, \Constants\ActivityType::ReviewPosted, $modelId, 0, $reviews->model_class);
            if ($reviews->class != 'ContestUser') {
                $reviewCount = Models\Review::where('to_user_id', $reviews->to_user_id)->where('is_freelancer', $reviews->is_freelancer)->sum('rating');
                if (!empty($reviews->is_freelancer)) {
                    Models\User::where('id', $reviews->to_user_id)->increment('review_count_as_freelancer', 1);
                    Models\User::where('id', $reviews->to_user_id)->update(array(
                        'total_rating_as_freelancer' => $reviewCount
                    ));
                } else {
                    Models\User::where('id', $reviews->to_user_id)->increment('review_count_as_employer', 1);
                    Models\User::where('id', $reviews->to_user_id)->update(array(
                        'total_rating_as_employer' => $reviewCount
                    ));
                }
            }
            if ($reviews->class == 'Bid') {
                $anthorReviewCount = Models\Review::where('foreign_id', $args['foreign_id'])->where('model_id', $bids->project_id)->where('class', 'Bid')->where('user_id', '!=', $authUser->id)->count();
                if ($anthorReviewCount > 0) {
                    Models\Project::where('id', $bids->project_id)->update(['project_status_id' => \Constants\ProjectStatus::Closed]);
                }
                $getprojectDetails = Models\Project::where('id', $bids->project_id)->first();
                $userDetails = getUserHiddenFields($bids->user_id);
                $getReviewer = getUserHiddenFields($authUser['id']);
                $emailFindReplace = array(
                    '##USERNAME##' => $userDetails->username,
                    '##PROJECT_NAME##' => $getprojectDetails->name,
                    '##REVIEWER##' => $getReviewer->username,
                    '##PROJECT_URL##' => $_server_domain_url . '/projects/view/' . $getprojectDetails->id . '/' . $getprojectDetails->slug
                );
                sendMail('Project Feedback Received Notification', $emailFindReplace, $userDetails->email);
            }
            if ($reviews->class == 'QuoteBid') {
                global $_server_domain_url;
                $quoteStatusName = Models\QuoteStatus::getQuoteStatusSlugNameById($quoteBidDetails->quote_status_id);
                $toUserDetails = getUserHiddenFields($reviews->to_user_id);
                $userDetails = getUserHiddenFields($reviews->user_id);
                $emailFindReplace = array(
                    '##FREELANCER##' => $userDetails->username,
                    '##EMPLOYER##' => $toUserDetails->username,
                    '##REQUEST_NAME##' => $quoteBidDetails->quote_request->title,
                    '##RESPONSE_URL##' => $_server_domain_url . '/my_works/all/' . $quoteBidDetails->quote_status_id . '/' . $quoteStatusName . '/' . $quoteBidDetails->id
                );
                sendMail('Quote - Feedback Received Notification', $emailFindReplace, $toUserDetails->email);
            } else if ($reviews->class == 'Portfolio') {
                global $_server_domain_url;
                $portfolio = Models\Portfolio::find($reviews->foreign_id);
                $employerDetails = getUserHiddenFields($portfolio->user_id);
                $userDetails = getUserHiddenFields($reviews->user_id);
                $emailFindReplace = array(
                    '##USERNAME##' => ucfirst($employerDetails->username),
                    '##REVIEW_USER##' => ucfirst($userDetails->username),
                    '##PORTFOLIO_NAME##' => $portfolio->title,
                    '##PORTFOLIO_LINK##' => $_server_domain_url . '/portfolios/' . $portfolio->id . '/' . $portfolio->title
                );
                sendMail('Portfolio Review Added', $emailFindReplace, $employerDetails->email);                   
            }
            $result['data'] = $reviews->toArray();
            return renderWithJson($result);
        } else {
            return renderWithJson($result, 'Reviews could not be added. Please, try again.', $validationErrorFields, 1);
        }
    } catch (Exception $e) {
        return renderWithJson($result, 'Reviews could not be added. Please, try again.', '', 1);
    }
});
/**
 * DELETE ReviewIdDelete
 * Summary: Delete Review
 * Notes: Deletes a single Review based on the ID supplied
 * Output-Formats: [application/json]
 */
$app->DELETE('/api/v1/reviews/{reviewId}', function ($request, $response, $args) {
    $reviews = Models\Review::find($request->getAttribute('reviewId'));
    try {
        $reviews->delete();
        $result = array(
            'status' => 'success',
        );
        return renderWithJson($result);
    } catch (Exception $e) {
        return renderWithJson($result, 'Review could not be deleted. Please, try again.', '', 1);
    }
});
/**
 * GET ReviewId get
 * Summary: Fetch a Review based on Review Id
 * Notes: Returns a Review from the system
 * Output-Formats: [application/json]
 */
$app->GET('/api/v1/reviews/{reviewId}', function ($request, $response, $args) {
    $enabledIncludes = array(
        'user',
        'ip',
        'other_user',
        'foreign_review',
        'foreign_review_model'
    );
    $reviews = Models\Review::with($enabledIncludes)->find($request->getAttribute('reviewId'));
    $result['data'] = $reviews->toArray();
    return renderWithJson($result);
});
/**
 * PUT Review Review IdPut
 * Summary: UpdateReview details
 * Notes: Update Review
 * Output-Formats: [application/json]
 */
$app->PUT('/api/v1/reviews/{reviewId}', function ($request, $response, $args) {
    $args = $request->getParsedBody();
    $result = array();
    $reviews = Models\Review::find($request->getAttribute('reviewId'));
    $validationErrorFields = $reviews->validate($args);
    if (empty($validationErrorFields)) {
        $reviews->fill($args);
        try {
            $reviews->save();
            if ($reviews->class == 'QuoteBid') {
                $quoteBidDetails = Models\QuoteBid::find($reviews->foreign_id);
                global $_server_domain_url;
                $userDetails = getUserHiddenFields($reviews->to_user_id);
                $quoteStatusName = Models\QuoteStatus::getQuoteStatusSlugNameById($quoteBidDetails->quote_status_id);
                $emailFindReplace = array(
                    '##FREELANCER##' => $userDetails->username,
                    '##EMPLOYER##' => $quoteBidDetails->user->username,
                    '##REQUEST_NAME##' => $quoteBidDetails->quote_request->title,
                    '##RESPONSE_URL##' => $_server_domain_url . '/my_works/all/' . $quoteBidDetails->quote_status_id . '/' . $quoteStatusName . '/' . $quoteBidDetails->id
                );
                sendMail('Quote - Feedback Updated Notification', $emailFindReplace, $userDetails->email);
            }
            elseif ($reviews->class == 'Bid') {
                $bidDetails = Models\Bid::find($reviews->foreign_id);
                $getReviewer = getUserHiddenFields($reviews->user_id);
                $emailFindReplace = array(
                    '##USERNAME##' => $bidDetails->project->user->username,
                    '##PROJECT_NAME##' => $bidDetails->project->name,
                    '##REVIEWER##' => $getReviewer->username,
                    '##PROJECT_URL##' => $_server_domain_url . '/projects/view/' . $bidDetails->project->id . '/' . $bidDetails->project->slug
                );
                sendMail('Project Feedback Updated Notification', $emailFindReplace, $bidDetails->project->user->email);
            }
            $result['data'] = $reviews->toArray();
            return renderWithJson($result);
        } catch (Exception $e) {
            return renderWithJson($result, 'Review could not be updated. Please, try again', '', 1);
        }
    } else {
        return renderWithJson($result, 'Review could not be updated. Please, try again', $validationErrorFields, 1);
    }
});
