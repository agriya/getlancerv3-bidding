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
$now = date('Y-m-d h:i:s');
//Contest Holder doesn't pay in 1 days contest will be deleted.
$days = date('Y-m-d h:i:s', strtotime('-' . CONTEST_PAYMENT_PENDING_DAYS_LIMIT . ' day', strtotime('now')));
$contests = Models\Contest::select('id')->whereDate('created_at', '<=', $days)->where('contest_status_id', \Constants\ConstContestStatus::PaymentPending)->get();
if (!empty($contests)) {
    $contests = $contests->toArray();
    Models\Contest::whereIn('id', $contests)->delete();
}
//If Contest Holder doesn't select winner in 10 days after contest end date, admin will be forced to select the winner.
$days = date('Y-m-d h:i:s', strtotime('-' . CONTEST_WINNER_SELECTED__TO_COMPLETED_DAYS . ' day', strtotime('now')));
$contests = Models\Contest::select('id')->whereDate('end_date', '<=', $days)->where('is_pending_action_to_admin', 0)->whereIn('contest_status_id', array(
    \Constants\ConstContestStatus::WinnerSelected,
    \Constants\ConstContestStatus::WinnerSelectedByAdmin
))->get();
if (!empty($contests)) {
    $contests = $contests->toArray();
    Models\Contest::whereIn('id', $contests)->update(array(
        'is_pending_action_to_admin' => 1,
        'winner_selected_date' => $now
    ));
}
//If Contest Holder doesn't moves contest to change requested or expecting delivery with in 10 days , admin will be forced to complete the contest.
$days = date('Y-m-d h:i:s', strtotime('-' . CONTEST_CHANGE_COMPLETED_TO_COMPLETED_DAYS . ' day', strtotime('now')));
$contests = Models\Contest::select('id')->where('contest_status_id', \Constants\ConstContestStatus::ChangeCompleted)->whereDate('end_date', '<=', $days)->where('is_pending_action_to_admin', 0)->get();
if (!empty($contests)) {
    $contests = $contests->toArray();
    Models\Contest::whereIn('id', $contests)->update(array(
        'is_pending_action_to_admin' => 1,
        'completed_date' => $now
    ));
}
//Contest will move to "Pending Action to Admin", when contest holder doesn't select winner before mentioned days. In that case, Admin will be forced to select winner.
$days = date('Y-m-d h:i:s', strtotime('-' . CONTEST_JUDGING_STATUS_DAYS_LIMIT . ' day', strtotime('now')));
$contests = Models\Contest::select('id')->whereDate('end_date', '<=', $days)->where('contest_status_id', \Constants\ConstContestStatus::Judging)->get();
if (!empty($contests)) {
    $contests = $contests->toArray();
    Models\Contest::whereIn('id', $contests)->update(array(
        'is_pending_action_to_admin' => 1,
        'judging_date' => $now
    ));
}
//Contest will move to judging status
$days = date('Y-m-d h:i:s');
$contests = Models\Contest::select('id', 'user_id')->where('end_date', '<', $days)->where('contest_status_id', \Constants\ConstContestStatus::Open)->get();
if (!empty($contests)) {
    $contests = $contests->toArray();
    foreach ($contests as $contest) {
        Models\Contest::where('id', $contest['id'])->update(array(
            'contest_status_id' => \Constants\ConstContestStatus::Judging,
            'judging_date' => $now
        ));
        Models\Contest::ContestStatusCountUpdation(\Constants\ConstContestStatus::Judging);
        insertActivities($contest['user_id'], 0, 'Contest', $contest['id'], \Constants\ConstContestStatus::Open, \Constants\ConstContestStatus::Judging, \Constants\ActivityType::ContestStatusChanged, $contest['id']);
    }
}
//Prize amount - Site Commission will move to participant after certain days.
$days = date('Y-m-d h:i:s', strtotime('-' . CONTEST_SITE_COMMISSION_TAKEN_DAYS . ' day', strtotime('now')));
$contests = Models\Contest::whereDate('completed_date', '<=', $days)->where('contest_status_id', \Constants\ConstContestStatus::Completed)->select('id', 'prize', 'winner_user_id', 'site_commision', 'user_id')->get();
if (!empty($contests)) {
    $contests = $contests->toArray();
    foreach ($contests as $contest) {
        $user_wallet_amount = $contest['prize'] - $contest['site_commision'];
        $user = Models\User::where('id', $contest['winner_user_id'])->first();
        $user->makeVisible(['available_wallet_amount', 'total_site_revenue_as_freelancer', 'total_earned_amount_as_freelancer']);
        Models\User::where('id', $contest['winner_user_id'])->update(array(
            'available_wallet_amount' => $user->available_wallet_amount + $user_wallet_amount,
            'total_site_revenue_as_freelancer' => $user->total_site_revenue_as_freelancer + $contest['site_commision'],
            'total_earned_amount_as_freelancer' => $user->total_earned_amount_as_freelancer + $user_wallet_amount
        ));
        Models\Contest::where('id', $contest['id'])->update(array(
            'contest_status_id' => \Constants\ConstContestStatus::PaidToParticipant,
            'paid_to_participant_date' => $now
        ));
        Models\Contest::ContestStatusCountUpdation(\Constants\ConstContestStatus::PaidToParticipant);
        $transaction = new Models\Transaction;
        $transaction->user_id = $contest['user_id'];
        $transaction->to_user_id = $contest['winner_user_id'];
        $transaction->foreign_id = $contest['id'];
        $transaction->class = 'Contest';
        $transaction->transaction_type = \Constants\TransactionType::AmountMovedToParticipant;
        $transaction->payment_gateway_id = \Constants\PaymentGateways::Wallet;
        $transaction->amount = $user_wallet_amount;
        $transaction->save();
    }
}
//Sending email of Contest payment pending alert
global $_server_domain_url;
$days = date('Y-m-d h:i:s', strtotime('-1 day', strtotime('now')));
$contests = Models\Contest::select('id', 'name', 'user_id')->whereDate('created_at', '<=', $days)->where('contest_status_id', \Constants\ConstContestStatus::PaymentPending)->where('is_send_payment_notification', 0)->get();
if (!empty($contests)) {
    foreach ($contests as $contest) {
        $user = getUserHiddenFields($contest->user_id);
        $emailFindReplace = array(
            '##CONTEST_NAME##' => $contest->name,
            '##USERNAME##' => $user->username,
            '##CONTEST_URL##' => $_server_domain_url . '/contests/' . $contest->id,
            '##PENDING_PAYMENT_DAYS##' => CONTEST_PAYMENT_PENDING_DAYS_LIMIT,
            '##PENDING_PAYMENT_URL##' => $_server_domain_url . '/contest/' . $contest->id,
        );
        sendMail('contestpaymentpendingalert', $emailFindReplace, $user->email);
        Models\Contest::where('id', $contest->id)->update(array(
            'is_send_payment_notification' => 1
        ));
    }
}
