<?php
/**
 * QuoteCreditPurchaseLog
 *
 * PHP version 5
 *
 * @category   PHP
 * @package    GetlancerV3
 * @subpackage Model
 * @author     Agriya <info@agriya.com>
 * @copyright  2018 Agriya Infoway Private Ltd
 * @license    http://www.agriya.com/ Agriya Infoway Licence
 * @link       http://www.agriya.com
 */
namespace Models;

/*
 * QuoteCreditPurchaseLog
*/
class CreditPurchaseLog extends AppModel
{
    protected $table = 'credit_purchase_logs';
    protected $fillable = array(
        'credit_purchase_plan_id',
        'payment_gateway_id',
        'gateway_id',
        'credit_count',
        'is_payment_completed'
    );
    public $rules = array();
    public function user()
    {
        return $this->belongsTo('Models\User', 'user_id', 'id')->with('attachment');
    }
    public function quote_credit_purchase_plan()
    {
        return $this->belongsTo('Models\CreditPurchasePlan', 'credit_purchase_plan_id', 'id');
    }
    public function payment_gateway()
    {
        return $this->belongsTo('Models\PaymentGateway', 'payment_gateway_id', 'id');
    }
    public function processCaptured($payment_response, $id)
    {
        $quoteCreditPurchaseLog = CreditPurchaseLog::with('quote_credit_purchase_plan', 'user', 'payment_gateway')->where('id', $id)->where('is_payment_completed', false)->first();
        if (!empty($quoteCreditPurchaseLog)) {
            $quoteCreditPurchaseLog->is_payment_completed = 1;
            if (!empty($payment_response['paykey'])) {
                $quoteCreditPurchaseLog->paypal_pay_key = $payment_response['paykey'];
            }
            $quoteCreditPurchaseLog->is_active = 1;
            $quoteCreditPurchaseLog->update();
            $user = User::find($quoteCreditPurchaseLog->user_id);
            $user = $user->makeVisible(array(
                'available_credit_count',
                'total_credit_bought',
                'total_site_revenue_as_freelancer',
                'total_earned_amount_as_freelancer'
            ));
            if (IS_ENABLED_CREDIT_POINT_CARRY_FORWARD) {
                $user->available_credit_count = $user->available_credit_count + $quoteCreditPurchaseLog->credit_count + $user->expired_balance_credit_points;
                $user->expired_balance_credit_points = 0;
            } else {
                $user->available_credit_count = $user->available_credit_count + $quoteCreditPurchaseLog->credit_count;
            }
            $user->total_credit_bought = $user->total_credit_bought + $quoteCreditPurchaseLog->credit_count;
            $user->total_site_revenue_as_freelancer = $user->total_site_revenue_as_freelancer + $quoteCreditPurchaseLog->price;
            $user->is_made_deposite = 1;
            $user->update();
            if (!empty($quoteCreditPurchaseLog->coupon_id)) {
                Coupon::updateCouponCount($quoteCreditPurchaseLog->coupon_id);
            }
            CreditPurchaseLog::where('id', '!=', $id)->update(array('is_active' => 0));
            $adminId = User::select('id')->where('role_id', \Constants\ConstUserTypes::Admin)->first();
            insertTransaction($quoteCreditPurchaseLog->user_id, $adminId['id'], $quoteCreditPurchaseLog->id, 'CreditPurchaseLog', \Constants\TransactionType::QuoteSubscriptionPlan, $quoteCreditPurchaseLog->payment_gateway_id, $quoteCreditPurchaseLog->price, 0, 0, $quoteCreditPurchaseLog->coupon_id, 0, $quoteCreditPurchaseLog->id, $quoteCreditPurchaseLog->gateway_id);
        }
        $response = array(
            'data' => $payment_response,
            'error' => array(
                'code' => 0,
                'message' => 'Payment successfully completed'
            )
        );
        return $response;
    }
    public function processInitiated($payment_response)
    {
        $response = array(
            'data' => $payment_response,
            'error' => array(
                'code' => 0,
                'message' => 'Payment initiated',
                'fields' => ''
            )
        );
        return $response;
    }
    public function processPending($payment_response)
    {
        $response = array(
            'data' => $payment_response,
            'error' => array(
                'code' => 0,
                'message' => 'Payment is in pending state.'
            )
        );
        return $response;
    }
    public function scopeFilter($query, $params = array())
    {
        parent::scopeFilter($query, $params);
        if (!empty($params['user_id'])) {
            $query->where('user_id', $params['user_id']);
        }
        if (!empty($params['is_payment_completed'])) {
            $query->where('is_payment_completed', $params['is_payment_completed']);
        }
        if (!empty($params['credit_purchase_plan_id'])) {
            $query->where('credit_purchase_plan_id', '=', $params['credit_purchase_plan_id']);
        }
        if (!empty($params['credit_purchase_plan_id'])) {
            $query->where('credit_purchase_plan_id', $params['credit_purchase_plan_id']);
        }
        if (!empty($params['q'])) {
        $search = $params['q'];
        $query->orWhereHas('quote_credit_purchase_plan', function ($q) use ($search) {
        $q->where('name', 'ilike', "%$search%");
        });
        $query->orWhereHas('user', function ($q) use ($search) {
        $q->where('username', 'ilike', "%$search%");  
        }); 
        }
    }
}
