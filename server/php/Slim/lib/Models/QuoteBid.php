<?php
/**
 * QuoteBid
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
 * QuoteCategory
*/
class QuoteBid extends AppModel
{
    protected $table = 'quote_bids';
    public $rules = array(
        'price_note' => 'sometimes|required'
    );
    public function scopeFilter($query, $params = array())
    {
        parent::scopeFilter($query, $params);
        if (!empty($params['quote_bid_status_id'])) {
            $quoteBidStatus = explode(',', $params['quote_bid_status_id']);
            $query->whereIn('quote_bids.quote_status_id', $quoteBidStatus);
        }
        if (!empty($params['quote_request_id'])) {
            $query->where('quote_bids.quote_request_id', $params['quote_request_id']);
        }
        if (!empty($params['quote_status_id'])) {
            $quoteStatus = explode(',', $params['quote_status_id']);
            $query->whereIn('quote_bids.quote_status_id', $quoteStatus);
        }
        if (!empty($params['quote_service_id'])) {
            $query->where('quote_bids.quote_service_id', $params['quote_service_id']);
        }
        if (!empty($params['q'])) {
            $search = $params['q'];
            $query->orWhereHas('user', function ($q) use ($search) {
                $q->where('username', 'ilike', "%$search%");
            }); 
            $query->orWhereHas('quote_request', function ($q) use ($search) {
                $q->where('title', 'ilike', "%$search%");  
            }); 
            $query->orWhereHas('quote_service', function ($q) use ($search) {
                $q->where('business_name', 'ilike', "%$search%");  
            }); 
            $query->orWhereHas('service_provider_user', function ($q) use ($search) {
                $q->where('username', 'ilike', "%$search%");  
            }); 
             
        }
    }
    public function user()
    {
        return $this->belongsTo('Models\User', 'user_id', 'id')->with('attachment');
    }
    public function foreign_user()
    {
        return $this->belongsTo('Models\User', 'user_id', 'id')->select('id', 'username')->with('foreign_attachment');
    }
    public function quote_service()
    {
        return $this->belongsTo('Models\QuoteService', 'quote_service_id', 'id')->with('attachment', 'city', 'state', 'country');
    }
    public function quote_request()
    {
        return $this->belongsTo('Models\QuoteRequest', 'quote_request_id', 'id')->with('city', 'state', 'country', 'form_field_submission', 'quote_category');
    }
    public function foreign_quote_request()
    {
        return $this->belongsTo('Models\QuoteRequest', 'quote_request_id', 'id')->select('id', 'title', 'user_id', 'quote_category_id', 'full_address')->with('foreign_quote_category');
    }
    public function service_provider_user()
    {
        return $this->belongsTo('Models\User', 'service_provider_user_id', 'id')->with('attachment');
    }
    public function foreign_service_provider_user()
    {
        return $this->belongsTo('Models\User', 'service_provider_user_id', 'id')->select('id', 'username')->with('foreign_attachment');
    }
    public function foreigns()
    {
        return $this->morphMany('Models\Activity', 'foreign');
    }
    public function activity()
    {
        return $this->belongsTo('Models\QuoteBid', 'id', 'id')->select('id', 'user_id', 'service_provider_user_id', 'quote_request_id', 'price_note')->with('foreign_user', 'foreign_service_provider_user', 'foreign_quote_request');
    }
    public function foreign_messages()
    {
        return $this->morphMany('Models\Message', 'foreign_message');
    }
    public function quote_status()
    {
        return $this->belongsTo('Models\QuoteStatus', 'quote_status_id', 'id')->select('id', 'name');
    }
    public function foreign_reviews()
    {
        return $this->morphMany('Models\Review', 'foreign_review');
    }
    public function foreign_transactions()
    {
        return $this->morphMany('Models\Transaction', 'foreign_transaction');
    }
    public function reviews()
    {
        $user_id = 0;
        global $authUser;
        if (!empty($authUser)) {
            $user_id = $authUser['id'];
        }
        return $this->hasOne('Models\Review', 'foreign_id', 'id')->where('user_id', $user_id)->where('class', 'QuoteBid');
    }
    protected static function boot()
    {
        global $authUser;
        parent::boot();
        self::saving(function ($data) use ($authUser) {
            if (($authUser['role_id'] == \Constants\ConstUserTypes::Admin) || ($authUser['id'] == $data->service_provider_user_id) || $authUser['id'] == $data->user_id) {
                return true;
            }
            return false;
        });
        self::updating(function ($data) use ($authUser) {
            if (($authUser['role_id'] == \Constants\ConstUserTypes::Admin) || ($authUser['id'] == $data->service_provider_user_id) || ($authUser['id'] == $data->user_id)) {
                $original = $data->getOriginal();
                if ($original->quote_status_id != $data->quote_status_id) {
                    QuoteServiceTableCountUpdationForQuoteBidStatusChange($data->quote_service_id);
                }
                return true;
            }
            return false;
        });
        self::deleting(function ($data) use ($authUser) {
            if (($authUser['role_id'] == \Constants\ConstUserTypes::Admin) || ($authUser['id'] == $data->service_provider_user_id) || ($authUser['id'] == $data->user_id)) {
                QuoteServiceTableCountUpdationForQuoteBidStatusChange($data->quote_service_id);
                return true;
            }
            return false;
        });
        self::saved(function ($data) {
            if ($data->quote_status_id == \Constants\QuoteStatus::Closed && !empty($data->is_paid_to_escrow) && empty($data->is_escrow_amount_released)) {
                $user = User::find($data->service_provider_user_id);
                $amount = $data->escrow_amount - $data->site_commission;
                $user->available_wallet_amount = $user->available_wallet_amount + ($amount);
                if ($user->update()) {
                    $adminId = User::select('id')->where('role_id', \Constants\ConstUserTypes::Admin)->first();
                    insertTransaction($data->service_provider_user_id, $adminId['id'], $data->id, 'QuoteBid', \Constants\TransactionType::QuoteSubscriptionPlan, \Constants\PaymentGateways::Wallet, $amount, 0, 0, 0, 0, $data->id, 0);
                    QuoteBid::where('id', $data->id)->update(['is_escrow_amount_released' => true]);
                }
            }
        });
        self::deleted(function ($data) {
            QuoteServiceTableCountUpdationForQuoteBidStatusChange($data->quote_service_id);
        });
    }
    public function processCaptured($payment_response, $id)
    {
        $quoteBid = QuoteBid::where('id', $id)->where('is_paid_to_escrow', false)->first();
        if (!empty($quoteBid->quote_request->is_request_for_buy)) {
            $quoteBid->is_paid_to_escrow = true;
            $quoteBid->escrow_amount = $quoteBid->quote_amount;
            $quoteBid->site_commission = SERVICE_COMMISSION_FOR_SALE;
            $quoteBid->update();
            if (!empty($quoteBid->coupon_id)) {
                Coupon::updateCouponCount($quoteBid->coupon_id);
            }
            $user = User::find($quoteBid->user_id);
            $user->is_made_deposite = 1;
            $user->update();
            $quoteBids = QuoteBid::with('quote_service', 'quote_request', 'user')->where('id', $id)->first();
            /*global $_server_domain_url;
            $userDetails = getUserHiddenFields($quoteBids->service_provider_user_id);                
            $emailFindReplace = array(
                '##FREELANCER##' => $userDetails->username,
                '##EMPLOYER##' => $quoteBids->user->username,
                '##BUSINESSNAME##' => $quoteBids->quote_service->business_name,
                '##CATEGORYNAME##' => $quoteBids->quote_request->quote_category->name, 
                '##DATENEEDONSITE##' => $quoteBids->quote_request->best_day_time_for_work,
                '##REQUEST_DESCRIPTION##' => $quoteBids->quote_request->description,
                '##LOCATION##' => $quoteBids->quote_request->city->name.', '.$quoteBids->quote_request->state->name.', '.$quoteBids->quote_request->country->name,
                '##FORMFIELDS##' => $formFields,    
                '##RESPONSE_URL##' => $_server_domain_url . '/my_works/'        
            ); 
            sendMail('escrowamounpaid', $emailFindReplace, $userDetails->email);*/
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
    public function processOrder($args)
    {
        global $authUser, $_server_domain_url;
        $result = array();
        $quoteBid = QuoteBid::with('quote_request')->where('id', $args['foreign_id'])->where('user_id', $authUser->id)->where('is_paid_to_escrow', false)->first();
        if (!empty($quoteBid->quote_request->is_request_for_buy)) {
            $couponId = 0;
            $originalPrice = $quoteBid->quote_amount;
            if (!empty($args['coupon_code'])) {
                if (!empty($quoteBid->quote_amount)) {
                    $coupon = Coupon::verifyAndCouponCode($args['coupon_code'], $quoteBid->quote_amount);
                    if (!empty($coupon['error']['code'])) {
                        return renderWithJson($result, 'Invalid Coupon', '', 1);
                    }
                    $originalPrice = Coupon::calculateDiscountPrice($quoteBid->quote_amount, $coupon['data']['discount'], $coupon['data']['discount_type_id']);
                    $couponId = $coupon['data']['id'];
                    QuoteBid::where('id', $args['foreign_id'])->update(array(
                        'coupon_id' => $coupon['data']['id']
                    ));
                }
            }
            $args['name'] = $quoteBid->quote_request->title;
            $args['description'] = $quoteBid->quote_request->description;
            $args['amount'] = $originalPrice;
            $args['id'] = $quoteBid->id;
            $args['notify_url'] = $_server_domain_url . '/ipn/process_ipn/QuoteBid/' . $quoteBid->id . '/' . md5(SECURITY_SALT . $quoteBid->id . SITE_NAME);
            $args['success_url'] = $_server_domain_url . '/my_requests?error_code=0';
            $args['cancel_url'] = $_server_domain_url . '/my_requests?error_code=512';
            $result = Payment::processPayment($quoteBid->id, $args, 'QuoteBid');
            $adminId = User::select('id')->where('role_id', \Constants\ConstUserTypes::Admin)->first();
            insertTransaction($authUser->id, $adminId['id'], $quoteBid->id, 'QuoteBid', \Constants\TransactionType::QuoteSubscriptionPlan, $args['payment_gateway_id'], $args['amount'], 0, 0, $couponId, 0, $quoteBid->id, 0);
        }
        return $result;
    }
}
