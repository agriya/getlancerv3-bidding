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
 * GET QuoteCreditPurchaseLogGet
 * Summary: all QuoteCreditPurchaseLog lists
 * Notes: all QuoteCreditPurchaseLog lists
 * Output-Formats: [application/json]
 */
$app->GET('/api/v1/credit_purchase_logs', function ($request, $response, $args) {
    $queryParams = $request->getQueryParams();
    $result = array();
    try {
        $count = PAGE_LIMIT;
        if (!empty($queryParams['limit'])) {
            $count = $queryParams['limit'];
        }
        $enabledIncludes = array(
            'quote_credit_purchase_plan',
            'user'
        );
        $quoteCreditPurchaseLogs = Models\CreditPurchaseLog::with($enabledIncludes)->Filter($queryParams)->paginate(PAGE_LIMIT)->toArray();
        $data = $quoteCreditPurchaseLogs['data'];
        unset($quoteCreditPurchaseLogs['data']);
        $result = array(
            'data' => $data,
            '_metadata' => $quoteCreditPurchaseLogs
        );
        return renderWithJson($result);
    } catch (Exception $e) {
        return renderWithJson($result, $message = 'No record found', $fields = '', $isError = 1);
    }
})->add(new ACL('canGetQuoteCreditPurchasLog'));
/**
 * GET QuoteCreditPurchaseLog based on user Id Get
 * Summary: all QuoteCreditPurchaseLog lists based on user Id
 * Notes: all QuoteCreditPurchaseLog lists
 * Output-Formats: [application/json]
 */
$app->GET('/api/v1/me/credit_purchase_logs', function ($request, $response, $args) {
    global $authUser;
    $queryParams = $request->getQueryParams();
    $result = array();
    try {
        if (!empty($authUser)) {
            $enabledIncludes = array(
                'quote_credit_purchase_plan',
                'user'
            );
            $quoteCreditPurchaseLogs = Models\CreditPurchaseLog::with($enabledIncludes)->where('user_id', $authUser['id'])->Filter($queryParams)->paginate(PAGE_LIMIT)->toArray();
            $data = $quoteCreditPurchaseLogs['data'];
            unset($quoteCreditPurchaseLogs['data']);
            $result = array(
                'data' => $data,
                '_metadata' => $quoteCreditPurchaseLogs
            );
            return renderWithJson($result);
        } else {
            return renderWithJson($results, 'No record found', '', 1);
        }
    } catch (Exception $e) {
        return renderWithJson($result, $message = 'No record found', $fields = '', $isError = 1);
    }
})->add(new ACL('canGetMyQuoteCreditPurchasLog'));
/**
 * POST QuoteCreditPurchaseLog POST
 * Summary:Post QuoteCreditPurchaseLog
 * Notes:  Post QuoteCreditPurchaseLog
 * Output-Formats: [application/json]
 */
$app->POST('/api/v1/credit_purchase_logs', function ($request, $response, $args) {
    global $authUser;
    global $_server_domain_url;
    $args = $request->getParsedBody();
    $result = array();
    $payment = new Models\Payment;
    $quoteCreditPurchasePlan = Models\CreditPurchasePlan::where('id', $args['credit_purchase_plan_id'])->where('is_active', true)->where('is_welcome_plan', false)->first();
    if (!empty($quoteCreditPurchasePlan)) {
        $quoteCreditPurchasePlan = $quoteCreditPurchasePlan->toArray();
        $quoteCreditPurchaseLogs = new Models\CreditPurchaseLog($args);
        $quote_credit_purchase_log = array(
            'credit_purchase_plan_id',
            'gateway_id',
            'payment_gateway_id'
        );
        try {
            $validationErrorFields = $quoteCreditPurchaseLogs->validate($args);
            if (empty($validationErrorFields)) {
                $originalPrice = !empty($quoteCreditPurchasePlan['price']) ? $quoteCreditPurchasePlan['price'] : 0;
                $couponId = 0;
                if (!empty($args['coupon_code'])) {
                    if (!empty($originalPrice)) {
                        $coupon = Models\Coupon::verifyAndCouponCode($args['coupon_code'], $originalPrice);
                        if (!empty($coupon['error']['code'])) {
                            return renderWithJson($result, 'Invalid Coupon', '', 1);
                        }
                        $originalPrice = Models\Coupon::calculateDiscountPrice($originalPrice, $coupon['data']['discount'], $coupon['data']['discount_type_id']);
                        $quoteCreditPurchaseLogs->coupon_id = $couponId = $coupon['data']['id'];
                    }
                }
                $quoteCreditPurchaseLogs->user_id = $authUser->id;
                $quoteCreditPurchaseLogs->gateway_id = !empty($args['gateway_id']) ? $args['gateway_id'] : 1;
                $quoteCreditPurchaseLogs->price = $originalPrice;
                $quoteCreditPurchaseLogs->credit_count = !empty($quoteCreditPurchasePlan['no_of_credits']) ? $quoteCreditPurchasePlan['no_of_credits'] : 0;
                $quoteCreditPurchaseLogs->discount_percentage = !empty($quoteCreditPurchasePlan['discount_percentage']) ? $quoteCreditPurchasePlan['discount_percentage'] : 0;
                $quoteCreditPurchaseLogs->original_price = !empty($quoteCreditPurchasePlan['original_price']) ? $quoteCreditPurchasePlan['original_price'] : 0;
                if (!empty($quoteCreditPurchasePlan['day_limit'])) {
                    $quoteCreditPurchaseLogs->expiry_date = date('Y-m-d h:i:s', strtotime("+" . $quoteCreditPurchasePlan['day_limit'] . " days"));
                }
                if ($quoteCreditPurchaseLogs->save()) {
                    Models\User::where('id', $quoteCreditPurchaseLogs->user_id)->increment('quote_credit_purchase_log_count', 1);
                    $args['description'] = $args['name'] = "Subscription Fee for " . $quoteCreditPurchasePlan['name'] . " in " . SITE_NAME;
                    $args['original_price'] = $args['amount'] = $originalPrice;
                    $args['id'] = $quoteCreditPurchaseLogs->id;
                    $args['user_id'] = $authUser->id;
                    $args['notify_url'] = $_server_domain_url . '/ipn/process_ipn/CreditPurchaseLog/' . $quoteCreditPurchaseLogs->id . '/' . md5(SECURITY_SALT . $quoteCreditPurchaseLogs->id . SITE_NAME);
                    $args['success_url'] = $_server_domain_url . '/purchase_logs?error_code=0';
                    $args['cancel_url'] = $_server_domain_url . '/purchase_plan?error_code=512';
                    $result = $payment->processPayment($quoteCreditPurchaseLogs->id, $args, 'CreditPurchaseLog');
                    return renderWithJson($result);
                }
            } else {
                return renderWithJson($result, 'Quote Credit Purchase Log could not be added. Please, try again.', $validationErrorFields, 1);
            }
        } catch (Exception $e) {
            return renderWithJson($result, 'Quote Credit Purchase Log could not be added. Please, try again.', '', 1);
        }
    } else {
        return renderWithJson($result, 'Quote Credit Purchase Plan not available. Please, try again.', '', 1);
    }
})->add(new ACL('canCreateQuoteCreditPurchasLog'));
/**
 * DELETE QuoteCreditPurchaseLog QuoteCreditPurchaseLogIdDelete
 * Summary: Delete  QuoteCreditPurchaseLog
 * Notes: Deletes a single  QuoteCreditPurchaseLog based on the ID supplied
 * Output-Formats: [application/json]
 */
$app->DELETE('/api/v1/credit_purchase_logs/{creditPurchaseLogId}', function ($request, $response, $args) {
    global $authUser;
    $result = array();
    $QutoPurchaseUser = Models\CreditPurchaseLog::find($request->getAttribute('creditPurchaseLogId'));
    if (isset($QutoPurchaseUser) && $authUser['id'] == $QutoPurchaseUser['user_id'] || $authUser['role_id'] == 1) {
        $quoteCreditPurchaseLogs = Models\CreditPurchaseLog::find($request->getAttribute('creditPurchaseLogId'));
    } else {
        return renderWithJson($result, 'Authorization required.', '', 1);
    }
    try {
        if (!empty($quoteCreditPurchaseLogs)) {
            if ($quoteCreditPurchaseLogs->delete()) {
                Models\User::where('id', $quoteCreditPurchaseLogs->user_id)->decrement('quote_credit_purchase_log_count', 1);
            }
        } else {
            return renderWithJson($result, 'Quote Credit Purchase Log not found.', '', 1);
        }
        $result = array(
            'status' => 'success',
        );
        return renderWithJson($result);
    } catch (Exception $e) {
        return renderWithJson($result, 'Quote Credit Purchase Log could not be deleted. Please, try again.', '', 1);
    }
})->add(new ACL('canDeleteQuoteCreditPurchasLog'));
$app->PUT('/api/v1/credit_purchase_logs/{creditPurchaseLogId}', function ($request, $response, $args) {
    $args = $request->getParsedBody();
    $result = array();
    $creditPurchaseLog = Models\CreditPurchaseLog::find($request->getAttribute('creditPurchaseLogId'));
    $oldPaymentstatus = $creditPurchaseLog->is_payment_completed;
    $validationErrorFields = $creditPurchaseLog->validate($args);
    if (empty($validationErrorFields)) {
        $creditPurchaseLog->fill($args);
        try {
            if (!empty($args['is_payment_completed']) && empty($oldPaymentstatus)) {
                $user = Models\User::where('id', $creditPurchaseLog->user_id)->first();
                $user->makeVisible(['available_credit_count']);
                $user->available_credit_count = $user->available_credit_count + $creditPurchaseLog->credit_count;
                $user->update();
            }
            $creditPurchaseLog->save();
            $result['data'] = $creditPurchaseLog->toArray();
            return renderWithJson($result);
        } catch (Exception $e) {
            return renderWithJson($result, 'Quote Credit Purchase Log could not be updated. Please, try again', '', 1);
        }
    } else {
        return renderWithJson($result, 'Quote Credit Purchase Log could not be updated. Please, try again', $validationErrorFields, 1);
    }
})->add(new ACL('canPutCreditPurchasLog'));
/**
 * GET QuoteCreditPurchaseLog QuoteCreditPurchaseLogId get
 * Summary: Fetch a QuoteCreditPurchaseLog based on QuoteCreditPurchaseLogId
 * Notes: Returns a QuoteCreditPurchaseLog from the system
 * Output-Formats: [application/json]
 */
$app->GET('/api/v1/credit_purchase_logs/{creditPurchaseLogId}', function ($request, $response, $args) {
    $result = array();
    $enabledIncludes = array(
        'quote_credit_purchase_plan',
        'user'
    );
    $quoteCreditPurchaseLogs = Models\CreditPurchaseLog::with($enabledIncludes)->find($request->getAttribute('creditPurchaseLogId'));
    if (!empty($quoteCreditPurchaseLogs)) {
        $result['data'] = $quoteCreditPurchaseLogs->toArray();
    } else {
        return renderWithJson($result, 'Quote Credit Purchase not found', '', 1);
    }
    return renderWithJson($result);
})->add(new ACL('canCreateQuoteCreditPurchasLog'));
/**
 * GET QuoteCreditPurchasePlan Get
 * Summary: all QuoteCreditPurchasePlan lists
 * Notes: all QuoteCreditPurchasePlan lists
 * Output-Formats: [application/json]
 */
$app->GET('/api/v1/credit_purchase_plans', function ($request, $response, $args) {
    $queryParams = $request->getQueryParams();
    $result = array();
    try {
        $count = PAGE_LIMIT;
        if (!empty($queryParams['limit'])) {
            $count = $queryParams['limit'];
        }
        $quoteCreditPurchasePlans = Models\CreditPurchasePlan::Filter($queryParams)->where('is_welcome_plan', 0)->where('is_active', 1)->paginate($count)->toArray();
        if (!empty($queryParams['filter'])) {
            $quoteCreditPurchasePlans = Models\CreditPurchasePlan::Filter($queryParams)->paginate($count)->toArray();
        }
        $data = $quoteCreditPurchasePlans['data'];
        unset($quoteCreditPurchasePlans['data']);
        $result = array(
            'data' => $data,
            '_metadata' => $quoteCreditPurchasePlans
        );
        return renderWithJson($result);
    } catch (Exception $e) {
        return renderWithJson($result, $message = 'No record found', $fields = '', $isError = 1);
    }
});
/**
 * POST QuoteCreditPurchasePlan POST
 * Summary:Post QuoteCreditPurchasePlan
 * Notes:  Post QuoteCreditPurchasePlan
 * Output-Formats: [application/json]
 */
$app->POST('/api/v1/credit_purchase_plans', function ($request, $response, $args) {
    $args = $request->getParsedBody();
    $quoteCreditPurchasePlans = new Models\CreditPurchasePlan($args);
    $result = array();
    try {
        $validationErrorFields = $quoteCreditPurchasePlans->validate($args);
        if (empty($validationErrorFields)) {
            if (!empty($args['discount_percentage'])) {
                $quoteCreditPurchasePlans->price = $args['original_price'] - ($args['original_price'] * ($quoteCreditPurchasePlans->discount_percentage / 100));
            } else {
                $quoteCreditPurchasePlans->price = $args['original_price'];
            }
            $quoteCreditPurchasePlans->save();
            if (!empty($quoteCreditPurchasePlans->is_welcome_plan)) {
                Models\CreditPurchasePlan::where('id', '!=', $quoteCreditPurchasePlans->id)->update(array(
                    'is_welcome_plan' => 0
                ));
            }
            $result['data'] = $quoteCreditPurchasePlans->toArray();
            return renderWithJson($result);
        } else {
            return renderWithJson($result, 'Quote Credit Purchase Plan could not be added. Please, try again.', $validationErrorFields, 1);
        }
    } catch (Exception $e) {
        return renderWithJson($result, 'Quote Credit Purchase Plan could not be added. Please, try again.', '', 1);
    }
})->add(new ACL('canPostCreditPurchasePlan'));
/**
 * DELETE QuoteCreditPurchasePlan QuoteCreditPurchasePlanIdDelete
 * Summary: Delete QuoteCreditPurchaseLog
 * Notes: Deletes a single  QuoteCreditPurchaseLog based on the ID supplied
 * Output-Formats: [application/json]
 */
$app->DELETE('/api/v1/credit_purchase_plans/{creditPurchasePlanId}', function ($request, $response, $args) {
    $quoteCreditPurchasePlans = Models\CreditPurchasePlan::find($request->getAttribute('creditPurchasePlanId'));
    $result = array();
    try {
        if (!empty($quoteCreditPurchasePlans)) {
            $quoteCreditPurchasePlans->delete();
            $result = array(
                'status' => 'success',
            );
            return renderWithJson($result);
        } else {
            return renderWithJson($result, 'Quote Credit Purchase Plan could not be deleted. Please, try again.', '', 1);
        }
    } catch (Exception $e) {
        return renderWithJson($result, 'Quote Credit Purchase Plan could not be deleted. Please, try again.', '', 1);
    }
})->add(new ACL('canDeleteCreditPurchasePlan'));
/**
 * GET QuoteCreditPurchasePlan QuoteCreditPurchasePlanId get
 * Summary: Fetch a QuoteCreditPurchasePlan based onQuoteCreditPurchasePlan Id
 * Notes: Returns a QuoteCreditPurchasePlan from the system
 * Output-Formats: [application/json]
 */
$app->GET('/api/v1/credit_purchase_plans/{creditPurchasePlanId}', function ($request, $response, $args) {
    $quoteCreditPurchasePlans = Models\CreditPurchasePlan::find($request->getAttribute('creditPurchasePlanId'));
    $result = array();
    if (!empty($quoteCreditPurchasePlans)) {
        $result['data'] = $quoteCreditPurchasePlans->toArray();
        return renderWithJson($result);
    } else {
        return renderWithJson($result, $message = 'No record found', $fields = '', $isError = 1);
    }
})->add(new ACL('canViewCreditPurchasePlan'));
/**
 * PUT QuoteCreditPurchasePlan QuoteCreditPurchasePlanIdPut
 * Summary: Update QuoteCreditPurchasePlan details
 * Notes: Update QuoteCreditPurchasePlan details.
 * Output-Formats: [application/json]
 */
$app->PUT('/api/v1/credit_purchase_plans/{creditPurchasePlanId}', function ($request, $response, $args) {
    $args = $request->getParsedBody();
    $result = array();
    $quoteCreditPurchasePlans = Models\CreditPurchasePlan::find($request->getAttribute('creditPurchasePlanId'));
    $validationErrorFields = $quoteCreditPurchasePlans->validate($args);
    if (empty($validationErrorFields)) {
        $quoteCreditPurchasePlans->fill($args);
        try {
            $args['original_price'] = !(empty($args['original_price'])) ? $args['original_price'] : $quoteCreditPurchasePlans->original_price;
            $args['discount_percentage'] = !(empty($args['discount_percentage'])) ? $args['discount_percentage'] : $quoteCreditPurchasePlans->discount_percentage;
            if (!empty($args['discount_percentage'])) {
                $quoteCreditPurchasePlans->price = $args['original_price'] - ($args['original_price'] * ($quoteCreditPurchasePlans->discount_percentage / 100));
            } else {
                $quoteCreditPurchasePlans->price = $args['original_price'];
            }
            $quoteCreditPurchasePlans->save();
            if (!empty($quoteCreditPurchasePlans->is_welcome_plan)) {
                Models\CreditPurchasePlan::where('id', '!=', $quoteCreditPurchasePlans->id)->update(array(
                    'is_welcome_plan' => 0
                ));
            }
            $result['data'] = $quoteCreditPurchasePlans->toArray();
            return renderWithJson($result);
        } catch (Exception $e) {
            return renderWithJson($result, 'Quote Credit PurchasePlan could not be updated. Please, try again', '', 1);
        }
    } else {
        return renderWithJson($result, 'Quote Credit PurchasePlan could not be updated. Please, try again', $validationErrorFields, 1);
    }
})->add(new ACL('canPutCreditPurchasePlan'));
