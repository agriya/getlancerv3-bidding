<?php
/**
 * Sample cron file
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
require_once __DIR__ . '/../../config.inc.php';
require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../lib/vendors/Inflector.php';
require_once __DIR__ . '/../lib/database.php';
require_once __DIR__ . '/../lib/constants.php';
require_once __DIR__ . '/../lib/settings.php';
require_once __DIR__ . '/../lib/core.php';
global $_server_domain_url;
/*Models\Coupon::where('is_active', 1)->where('coupon_expiry_date', '<', date('Y-m-d'))->update(array('is_active' => 0));*/
$datetime = date('Y-m-d H:i:s', strtotime("-6 hours"));
$quoteBids = Models\QuoteBid::with('quote_service', 'quote_request', 'user')->where('quote_status_id', \Constants\QuoteStatus::NewBid)->whereNull('last_new_quote_remainder_notify_date_to_freelancer')->whereDate('created_at', '<=', $datetime)->get();
if (!empty($quoteBids)) {
    foreach ($quoteBids as $quoteBid) {
        $userDetails = getUserHiddenFields($quoteBid->service_provider_user_id);
        $employerDetails = getUserHiddenFields($quoteBid->quote_request->user_id);
        $quoteStatusName = Models\QuoteStatus::getQuoteStatusSlugNameById($quoteBid->quote_status_id);
        $emailFindReplace = array(
            '##FREELANCER##' => ucfirst($userDetails->username) ,
            '##EMPLOYER##' => ucfirst($employerDetails->username) ,
            '##CATEGORY_NAME##' => $quoteBid->quote_request->quote_category->name,
            '##REQUEST_TITLE##' => $quoteBid->quote_request->title,
            '##REQUEST_DESCRIPTION##' => $quoteBid->quote_request->description,
            '##PREFERRED_TIME##' => $quoteBid->quote_request->best_day_time_for_work,
            '##WORK_LOCATION##' => $quoteBid->quote_request->full_address,
            '##MY_WORK_PAGE_LINK##' => $_server_domain_url . '/my_works'
        );
        sendMail('New Quote Request Received Reminder Notification', $emailFindReplace, $userDetails->email);
        Models\QuoteBid::where('id', $quoteBid->id)->update(array(
            'last_new_quote_remainder_notify_date_to_freelancer' => date('Y-m-d H:i:s')
        ));
    }
}
$quoteRequests = Models\QuoteRequest::whereNull('last_new_quote_remainder_notify_date')->where('quote_bid_discussion_count', '!=', 0)->where('quote_bid_hired_count', 0)->where('quote_bid_completed_count', 0)->with(['quote_category', 'user', 'city', 'state', 'country', 'form_field_submission', 'quote_bids' => function ($q) use ($datetime) {
    $q->whereDate('updated_at', '<=', $datetime);
    $q->where('quote_status_id', \Constants\QuoteStatus::UnderDiscussion);
    $q->orderBy('updated_at', ' ');
    $q->take(1);
}
])->get();
if (!empty($quoteRequests)) {
    foreach ($quoteRequests as $quoteRequest) {
        $userDetails = getUserHiddenFields($quoteRequest->user_id);
        $emailFindReplace = array(
            '##EMPLOYER##' => $quoteRequest->user->username,
            '##CATEGORY_NAME##' => $quoteRequest->quote_category->name,
            '##REQUEST_NAME##' => $quoteRequest->title,
            '##NUMBER_OF_QUOTES##' => count($quoteRequest->quote_bids) ,
            '##RESPONSE_URL##' => $_server_domain_url . '/my_requests/' . $quoteRequest->id . '/2/under_discussion'
        );
        sendMail('Quote Received Reminder Notification', $emailFindReplace, $userDetails->email);
        Models\QuoteRequest::where('id', $quoteRequest->id)->update(array(
            'last_new_quote_remainder_notify_date' => date('Y-m-d H:i:s')
        ));
    }
}
$quoteRequests = Models\QuoteRequest::with('quote_category', 'city', 'quote_bids', 'state', 'country', 'form_field_submission')->where('is_quote_bid_sent', 0)->get();
if (!empty($quoteRequests)) {
    foreach ($quoteRequests as $quoteRequest) {
        $quoteCategory = Models\QuoteCategoryQuoteService::where('quote_category_id', $quoteRequest->quote_category_id)->select('quote_service_id')->groupBy('quote_service_id')->get();
        $latitude = !empty($quoteRequest->latitude) ? $quoteRequest->latitude : 0;
        $longitude = !empty($quoteRequest->longitude) ? $quoteRequest->longitude : 0;
        $radius = !empty($quoteRequest->radius) ? $quoteRequest->radius : 0;
        $distance = 'ROUND(( 6371 * acos( cos( radians(' . $latitude . ') ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(' . $longitude . ')) + sin( radians(' . $latitude . ') ) * sin( radians( latitude ) ) )))';
        $quoteservices = Models\QuoteService::select('quote_services.*')->whereIn('id', $quoteCategory)->where('is_active', 1)->where('is_admin_suspend', 0);
        if (!empty($quoteRequest->quote_service_id) && empty($quoteRequest->is_send_request_to_other_service_providers)) {
            $quoteservices = $quoteservices->where('id', $quoteRequest->quote_service_id);
        } else {
            $quoteservices = $quoteservices->where('id', '!=', $quoteRequest->quote_service_id);
        }
        $quoteservices = $quoteservices->where('user_id', '!=', $quoteRequest->user_id);
        $quoteservices = $quoteservices->where(function ($query) use ($distance) {
            $query->where(function ($join) {
                $join->where('is_customer_travel_to_me', 1);
            });
            $query->orWhere(function ($join) {
                $join->where('is_over_phone_or_internet', 1);
            });
            $query->orWhere(function ($join) use ($distance) {
                $join->where('is_service_provider_travel_to_customer_place', 1);
                $join->whereRaw('(' . $distance . ') <= service_provider_travels_upto');
            });
        });
        if (SENDING_QUOTE_REQUEST_FLOW_TYPE == 'Send to All Relevant Service Provider' || SENDING_QUOTE_REQUEST_FLOW_TYPE == 'Limited Quote Per Limited Period') {
            $quoteservices = $quoteservices->get()->toArray();
            $employerDetails = getUserHiddenFields($quoteRequest->user_id);
            $dispatcher = Models\QuoteBid::getEventDispatcher();
            Models\QuoteBid::unsetEventDispatcher();
            foreach ($quoteservices as $quoteservice) {
                $checkQuoteBid = Models\QuoteBid::where('quote_request_id', $quoteRequest->id)->where('service_provider_user_id', $quoteservice['user_id'])->count();
                if ($checkQuoteBid == 0) {
                    insertQuoteBids($quoteservice, $quoteRequest, $employerDetails, 1);
                }
            }
            Models\QuoteBid::setEventDispatcher($dispatcher);
            quoteRequestTableUpdationForQuoteBid($quoteRequest->id);
            Models\QuoteRequest::where('id', $quoteRequest->id)->update(array(
                'is_quote_bid_sent' => 1,
                'is_first_level_quote_request_sent' => 1
            ));
        } elseif (SENDING_QUOTE_REQUEST_FLOW_TYPE == 'Rating Basis') {
            $now = date('Y-m-d h:i:s');
            $addedTimeLimit = date('Y-m-d h:i:s', strtotime($quoteRequest->created_at . "+" . TIME_LIMIT_AFTER_OTHER_PROVIDER_GET_QUOTE_REQUEST . " hours"));
            $quoteservices = $quoteservices->with('user')->get()->toArray();
            $employerDetails = getUserHiddenFields($quoteRequest->user_id);
            $dispatcher = Models\QuoteBid::getEventDispatcher();
            Models\QuoteBid::unsetEventDispatcher();
            if ($quoteRequest->is_first_level_quote_request_sent == 0) {
                foreach ($quoteservices as $quoteservice) {
                    $checkRating = (!empty($quoteservice['user']['review_count_as_freelancer']) && ($quoteservice['user']['total_rating_as_freelancer'] / $quoteservice['user']['review_count_as_freelancer']) >= QUOTE_REQUEST_SENDING_RATING_UPTO ? 0 : 1);
                    $checkQuoteBid = Models\QuoteBid::where('quote_request_id', $quoteRequest->id)->where('service_provider_user_id', $quoteservice['user_id'])->count();
                    if ($checkQuoteBid == 0 && $checkRating == 0) {
                        insertQuoteBids($quoteservice, $quoteRequest, $employerDetails, 1);
                    }
                }
                Models\QuoteBid::setEventDispatcher($dispatcher);
                quoteRequestTableUpdationForQuoteBid($quoteRequest->id);
                Models\QuoteRequest::where('id', $quoteRequest->id)->update(array(
                    'is_quote_bid_sent' => 0,
                    'is_first_level_quote_request_sent' => 1
                ));
            } elseif ($addedTimeLimit <= $now) {
                foreach ($quoteservices as $quoteservice) {
                    $checkRating = (!empty($quoteservice['user']['review_count_as_freelancer']) && ($quoteservice['user']['total_rating_as_freelancer'] / $quoteservice['user']['review_count_as_freelancer']) < QUOTE_REQUEST_SENDING_RATING_UPTO ? 0 : 1);
                    $checkQuoteBid = Models\QuoteBid::where('quote_request_id', $quoteRequest->id)->where('service_provider_user_id', $quoteservice['user_id'])->count();
                    if ($checkQuoteBid == 0 && $checkRating == 0) {
                        insertQuoteBids($quoteservice, $quoteRequest, $employerDetails, 0);
                    }
                }
                Models\QuoteBid::setEventDispatcher($dispatcher);
                quoteRequestTableUpdationForQuoteBid($quoteRequest->id);
                Models\QuoteRequest::where('id', $quoteRequest->id)->update(array(
                    'is_quote_bid_sent' => 1
                ));
            } else {
                Models\QuoteBid::setEventDispatcher($dispatcher);
            }
        }
    }
}
function insertQuoteBids($quoteservice, $quoteRequest, $employerDetails, $level)
{
    global $_server_domain_url;
    $quoteBid = new Models\QuoteBid;
    $userDetails = getUserHiddenFields($quoteservice['user_id']);
    $quoteBid->quote_request_id = $quoteRequest->id;
    $quoteBid->quote_service_id = $quoteservice['id'];
    $quoteBid->service_provider_user_id = $quoteservice['user_id'];
    $quoteBid->quote_status_id = \Constants\QuoteStatus::NewBid;
    $quoteBid->is_first_level_quote_request = $level;
    $quoteBid->user_id = $quoteRequest->user_id;
    $quoteBid->save();
    $emailFindReplace = array(
        '##FREELANCER##' => ucfirst($userDetails->username) ,
        '##EMPLOYER##' => ucfirst($employerDetails->username) ,
        '##CATEGORY_NAME##' => $quoteRequest->quote_category->name,
        '##REQUEST_TITLE##' => $quoteRequest->title,
        '##REQUEST_DESCRIPTION##' => $quoteRequest->description,
        '##PREFERRED_TIME##' => $quoteRequest->best_day_time_for_work,
        '##WORK_LOCATION##' => $quoteRequest->full_address,
        '##MY_WORK_PAGE_LINK##' => $_server_domain_url . '/my_works'
    );
    sendMail('New Quote Request Received Notification', $emailFindReplace, $userDetails->email);
    insertActivities($quoteRequest->user_id, $quoteBid->service_provider_user_id, 'QuoteBid', $quoteBid->id, 0, 0, \Constants\ActivityType::QuoteBidPosted, $quoteservice['id']);
}
$quoteRequests = Models\QuoteRequest::where('is_updated_bid_visibility_to_requestor', 0)->get();
if (!empty($quoteRequests)) {
    $now = date('Y-m-d h:i:s');
    foreach ($quoteRequests as $quoteRequest) {
        $addedTimeLimit = date('Y-m-d h:i:s', strtotime($quoteRequest->created_at . "+" . TIME_LIMIT_AFTER_OTHER_PROVIDER_GET_QUOTE_REQUEST . " hours"));
        if ($addedTimeLimit <= $now) {
            Models\QuoteBid::where('quote_request_id', $quoteRequest->id)->update(array(
                'is_show_bid_to_requestor' => 1
            ));
            Models\QuoteRequest::where('id', $quoteRequest->id)->update(array(
                'is_updated_bid_visibility_to_requestor' => 1
            ));
            //Todo for mail template
            quoteRequestTableUpdationForQuoteBid($quoteRequest->id);
        }
    }
}
