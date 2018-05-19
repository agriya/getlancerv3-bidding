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
$now = date('Y-m-d 00:00:00');
$jobs = Models\Job::whereNotNull('job_open_date')->where('job_status_id', \Constants\JobStatus::Open)->get();
if (!empty($jobs)) {
    foreach ($jobs as $job) {
        $expiry_date = date('Y-m-d h:i:s', strtotime($job->job_open_date. ' + ' . JOB_VALIDITY_DAY . ' days'));
        if ($expiry_date < $now) {
            $jobExpired = Models\Job::where('id',$job->id)->update(['job_status_id' => \Constants\JobStatus::Expired]);
            $employerDetails = getUserHiddenFields($job->user_id);
            $emailFindReplace = array(
                '##USERNAME##' => ucfirst($employerDetails->username) ,
                '##JOB_NAME##' => ucfirst($job->title),
                '##JOB_LINK##' => $_server_domain_url . '/jobs/' . $job->id . '/' . $job->title             
            );
            $admin = Models\User::where('role_id', \Constants\ConstUserTypes::Admin)->first();
            insertActivities($admin['id'], $job->user_id, 'Job', $job->id, $job->job_status_id, \Constants\JobStatus::Expired, \Constants\ActivityType::JobStatusChanged, $job->id, 0);
            sendMail('Job Expired Alert', $emailFindReplace, $employerDetails->email);       
        } 
    }
}
