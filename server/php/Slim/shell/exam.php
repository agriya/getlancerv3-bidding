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
if (IS_ENABLED_EXPIRE_TIME_FOR_EXAM) {
    $examsUsers = Models\ExamsUser::select('exams_users.id', 'exams_users.exam_id', 'exams_users.allow_duration', 'exams_users.exam_started_date', 'exams.additional_time_to_expire')->where('exams_users.exam_status_id', \Constants\ExamStatus::Inprogress)->join('exams', 'exams.id', '=', 'exams_users.exam_id')->get();
    if (!empty($examsUsers)) {
        $examsUsers = $examsUsers->toArray();
        foreach ($examsUsers as $examsUser) {
            if (IS_ENABLED_EXPIRE_TIME_FOR_EXAM && $examsUser['additional_time_to_expire'] != null) {
                $expire_time = strtotime($examsUser['exam_started_date'] . ' + ' . $examsUser['allow_duration'] . ' min  + ' . $examsUser['additional_time_to_expire'] . ' min + 10 sec');
            } else {
                $expire_time = strtotime($examsUser['exam_started_date'] . ' + ' . $examsUser['allow_duration'] . ' min + 10 sec');
            }
            if ($expire_time < strtotime('now')) {
                Models\ExamsUser::where('id', $examsUser['id'])->update(['exam_status_id' => \Constants\ExamStatus::Incomplete]);
            }
        }
    }
}
