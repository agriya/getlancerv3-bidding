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
$creditPurchaseLogs = Models\CreditPurchaseLog::with('quote_credit_purchase_plan')->where('is_active', true)->whereNotNull('expiry_date')->get();
foreach ($creditPurchaseLogs as $creditPurchaseLog) {
    $today = date('Y-m-d H:i:s');
    if ($creditPurchaseLog->expiry_date < $today) {
        Models\CreditPurchaseLog::where('id', $creditPurchaseLog->id)->update(['is_active' => false]);
        $user = Models\User::where('id', $creditPurchaseLog->user_id)->first();
        $user->makeVisible(['available_credit_count']);
        if (IS_ENABLED_CREDIT_POINT_CARRY_FORWARD) {
            $user->expired_balance_credit_points = $user->expired_balance_credit_points + $user->available_credit_count;
        }
        $user->available_credit_count = 0;
        $user->save();
        $emailFindReplace = array(
            '##USER##' => ucfirst($user->username) ,
            '##PLAN_NAME##' => $creditPurchaseLog->quote_credit_purchase_plan->name
        );
        sendMail('Credit plan expired', $emailFindReplace, $user->email);
    }
}
