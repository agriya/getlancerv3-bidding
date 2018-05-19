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
require_once __DIR__ . '/../lib/database.php';
require_once __DIR__ . '/../lib/constants.php';
require_once __DIR__ . '/../lib/settings.php';
require_once __DIR__ . '/../lib/core.php';
global $_server_domain_url;
update_project();
new_project_notification();
project_dispute();
update_bid();
/**********************************************************************
		# get all OpenForBidding, BiddingClosed, FinalReviewPending projects.
		# check bid_end date expired for OpenForBidding projects.
		  - projects moved to BiddingExpired which are the projects have no bids.
		  - projects moved to BiddingClosed which are the projects have at least one bid.
		  - admin alert, send mail for both cases.
		# check bid_end+Project.max_days_to_select_winner date expired for BiddingClosed projects.
		  - projects moved to BiddingExpired which are the projects obtain the above conditions.
		  - admin alert, send mail for both cases.
		# check payment_completed_date+Project.max_days_to_close_project date expired for FinalReviewPending projects.		  
		  - projects moved to Completed which are the projects obtain the above conditions.
		  - adding full rating for both 
	***********************************************************************/
function update_project()
{
    $project_statuses = array(
        \Constants\ProjectStatus::OpenForBidding,
        \Constants\ProjectStatus::BiddingClosed,
        \Constants\ProjectStatus::FinalReviewPending,
    );
    $projects = Models\Project::withoutGlobalScopes()->with('user', 'project_bid')->with(array(
        'bid' => function ($query) {
            $query->whereHas('project_bid', function ($q1) {
                return $q1->where('is_active', 1);
            });
        }
    ))->whereIn('project_status_id', $project_statuses)->get()->toArray();
    if (!empty($projects)) {
        foreach ($projects as $project) { 
            switch ($project['project_status_id']) {
                case \Constants\ProjectStatus::OpenForBidding:
                    global $_server_domain_url;
                    if (strtotime($project['project_bid']['bidding_end_date']) <= strtotime(date('Y-m-d 23:59:59'))) {
                        if (!empty($project['bid'])) {
                            $project_status_id = \Constants\ProjectStatus::BiddingClosed;
                            $userDetails = getUserHiddenFields($project['user_id']);
                            $emailFindReplace = array(
                                '##USERNAME##' => ucfirst($userDetails->username) ,
                                '##PROJECT_NAME##' => ucfirst($project['name']),
                                '##PROJECT_LINK##' => $_server_domain_url . '/projects/view/' . $project['id'] . '/' . $project['slug'] 
                            );
                            sendMail('Project Bidding Closed Alert', $emailFindReplace, $userDetails->email);
                        } else {
                            $project_status_id = \Constants\ProjectStatus::BiddingExpired;
                            $userDetails = getUserHiddenFields($project['user_id']);
                            $emailFindReplace = array(
                                '##USERNAME##' => ucfirst($userDetails->username) ,
                                '##PROJECT_NAME##' => ucfirst($project['name']),
                                '##PROJECT_LINK##' => $_server_domain_url . '/projects/view/' . $project['id'] . '/' . $project['slug'] 
                            );
                            sendMail('Bidding Expired Alert', $emailFindReplace, $userDetails->email);
                        }
                        // Update Project status
                        Models\Project::where('id', $project['id'])->update(['project_status_id' => $project_status_id]);
                        Models\Project::ProjectStatusCountUpdation($project_status_id);
                        if ($project_status_id == \Constants\ProjectStatus::BiddingExpired) {
                            $employer_user[] = $project['user_id'];
                            // TODO send Project Bidding Expired Notification to user and admin
                        }
                        $adminId = Models\User::select('id')->where('role_id', \Constants\ConstUserTypes::Admin)->first();
                        insertActivities($adminId['id'], $project['user_id'], 'Project', $project['id'], $project['project_status_id'], $project_status_id, \Constants\ActivityType::ProjectStatusChanged, $project['id']);
                    }
                    break;

                case \Constants\ProjectStatus::BiddingClosed:
                    global $_server_domain_url;
                    if (strtotime($project['project_bid']['bidding_end_date'] . '+' . PROJECT_MAX_DAYS_TO_SELECT_WINNER . 'days') < strtotime(date('Y-m-d 23:55:59'))) {
                        // Update Project status
                        Models\Project::where('id', $project['id'])->update(['project_status_id' => \Constants\ProjectStatus::BiddingExpired]);
                        Models\Project::ProjectStatusCountUpdation(\Constants\ProjectStatus::BiddingExpired);
                        // TODO send Project Bidding Expired Notification to user and admin
                        $adminId = Models\User::select('id')->where('role_id', \Constants\ConstUserTypes::Admin)->first();
                        insertActivities($adminId['id'], $project['user_id'], 'Project', $project['id'], $project['project_status_id'], \Constants\ProjectStatus::BiddingExpired, \Constants\ActivityType::ProjectStatusChanged, $project['id']);
                    }
                    break;
            }
        }
    }
}
function new_project_notification()
{
    $projects = Models\Project::withoutGlobalScopes()->where('project_status_id', \Constants\ProjectStatus::OpenForBidding)->where('is_notification_sent', 0)->get()->toArray();
    foreach ($projects as $project) {
        // TODO Send Notification for new project Add
    }
}
function project_dispute()
{
    $today = date('Y-m-d H:i:s');
    $projectDisputes = Models\ProjectDispute::with('project')->where('dispute_status_id', \Constants\ConstDisputeStatus::Open)->get();
    foreach ($projectDisputes as $projectDispute) {
        $disputeId = $projectDispute->id;
        $project = Models\Project::withoutGlobalScopes()->with(['user', 'bid_winner' => function ($q) {
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
        ])->where('id', $projectDispute->project_id)->first();
        if ($projectDispute->user_id == $projectDispute->project->user_id) {
            $reply_time_for_freelancer = DISPUTE_REPLY_TIME_FOR_FREELANCER;
            $date = date('Y-m-d', strtotime($projectDispute->created_at . " + $reply_time_for_freelancer day"));
            if ($date < $today) {
                if (empty($projectDispute->last_replied_date)) {
                    switch ($projectDispute->dispute_open_type_id) {
                        case \Constants\ConstDisputeOpenType::EmployerGiveMoreWorks:
                            Models\ProjectDispute::_updateProjectStatusToDevelopement($project);
                            $closetype = \Constants\ConstDisputeCloseType::CompletGivenWork;
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
                }
            }
        } else {
            $reply_time_for_employer = DISPUTE_REPLY_TIME_FOR_EMPLOYER;
            $date = date('Y-m-d', strtotime($projectDispute->created_at . " + $reply_time_for_employer day"));
            if ($date < $today) {
                if (empty($projectDispute->last_replied_date)) {
                    switch ($projectDispute->dispute_open_type_id) {
                        case \Constants\ConstDisputeOpenType::EmployerGiveMoreWorks:
                            Models\ProjectDispute::_refundedAndCancelProject($project, $project->bid_winner->user_id, 'freelancer');
                            $closetype = \Constants\ConstDisputeCloseType::EmployerGivingMoreWork;
                            break;

                        case \Constants\ConstDisputeOpenType::EmployerGivePoorRating:
                            Models\ProjectDispute::_updateRating($project, $project->project_bid->user_id, 'freelancer');
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
            }
        }
    }
}
function update_bid()
{
    $today = date('Y-m-d h:i:s');
    $bids = Models\Bid::where('is_reached_response_end_date_for_freelancer', 0)->whereHas('project', function ($q) {
        $q->withoutGlobalScopes()->where('project_status_id', \Constants\ProjectStatus::WinnerSelected);
    })->get();
    if (count($bids) > 0) {
        foreach ($bids as $bid) {
            $expiry_date = date('Y-m-d h:i:s', strtotime($bid->winner_selected_date . "+" . PROJECT_WITHDRAW_FREELANCER_DAYS . " days"));
            if ($expiry_date < $today) {
                Models\Bid::where('id', $bid->id)->update(array(
                    'is_reached_response_end_date_for_freelancer' => 1
                ));
            }
        }
    }
}
