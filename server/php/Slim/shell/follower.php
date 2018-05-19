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
//Get Contest
$contests = Models\Contest::select('id', 'user_id')->where('is_notification_sent', false)->where('contest_status_id', \Constants\ConstContestStatus::Open)->get();
if (!empty($contests)) {
    foreach ($contests as $contest) {
        insertActivities($contest->user_id, 0, 'Contest', $contest->id, 0, 0, \Constants\ActivityType::Notification, $contest->id);
        Models\Contest::where('id', $contest->id)->update(array(
            'is_notification_sent' => true
        ));
    }
}
//Get Jobs
$jobs = Models\Job::select('id', 'user_id')->where('is_notification_sent', false)->where('job_status_id', \Constants\JobStatus::Open)->get();
if (!empty($jobs)) {
    foreach ($jobs as $job) {
        insertActivities($job->user_id, 0, 'Job', $job->id, 0, 0, \Constants\ActivityType::Notification, $job->id);
        Models\Job::where('id', $job->id)->update(array(
            'is_notification_sent' => true
        ));
    }
}
//Get Project
$projects = Models\Project::withoutGlobalScopes()->select('id', 'user_id')->where('is_notification_sent', false)->where('project_status_id', \Constants\ProjectStatus::OpenForBidding)->get();
if (!empty($projects)) {
    foreach ($projects as $project) {
        insertActivities($project->user_id, 0, 'Project', $project->id, 0, 0, \Constants\ActivityType::Notification, $project->id);
        Models\Project::where('id', $project->id)->update(array(
            'is_notification_sent' => true
        ));
    }
}
//Get Portfolio
$portfolios = Models\Portfolio::select('id', 'user_id')->where('is_notification_sent', false)->get();
if (!empty($portfolios)) {
    foreach ($portfolios as $portfolio) {
        insertActivities($portfolio->user_id, 0, 'Portfolio', $portfolio->id, 0, 0, \Constants\ActivityType::Notification, $portfolio->id);
        Models\Portfolio::where('id', $portfolio->id)->update(array(
            'is_notification_sent' => true
        ));
    }
}
