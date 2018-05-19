<?php
/**
 * Contest
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
 * Contest
*/
class Contest extends AppModel
{
    protected $table = 'contests';
    protected $fillable = array(
        'contest_type_id',
        'contest_status_id',
        'name',
        'description',
        'prize',
        'creation_cost',
        'is_pending_action_to_admin',
        'is_blind',
        'is_private',
        'is_featured',
        'is_highlight',
        'zazpay_payment_id',
        'zazpay_gateway_id',
        'pricing_package_id',
        'pricing_day_id',
        'resource_id',
        'reason_for_cancelation'
    );
    public $rules = array(
        'contest_type_id' => 'sometimes|numeric|min:1',
        'contest_status_id' => 'sometimes|numeric',
        'resource_id' => 'sometimes|required',
    );
    protected static function boot()
    {
        global $authUser;
        parent::boot();
        self::saving(function ($data) use ($authUser) {
            Contest::ContestStatusCountUpdation($data->contest_status_id);
            if (($authUser['role_id'] == \Constants\ConstUserTypes::Admin) || ($authUser['id'] == $data->user_id)) {
                return true;
            }
            return false;
        });
        self::deleting(function ($data) use ($authUser) {
            if (($authUser['role_id'] == \Constants\ConstUserTypes::Admin) || ($authUser['id'] == $data->user_id)) {
                return true;
            }
            return false;
        });
        self::updated(function ($data) {
            Contest::ContestStatusCountUpdation($data->contest_status_id);
        });
        self::deleted(function ($data) {
            Contest::ContestStatusCountUpdation($data->contest_status_id);
        });
    }
    public function ContestStatusCountUpdation($contest_status_id)
    {
        $contest_status_count = Contest::where('contest_status_id', $contest_status_id)->count();
        ContestStatus::where('id', $contest_status_id)->update(['contest_count' => $contest_status_count]);
    }
    public function scopeFilter($query, $params = array())
    {
        parent::scopeFilter($query, $params);
        if (!empty($params['q'])) {
            $search = $params['q'];
            $query->orWhereHas('user', function ($q) use ($search) {
                $q->where('username', 'ilike', "%$search%");
            });
            $query->orWhereHas('contest_type', function ($q) use ($search) {
                $q->where('name', 'ilike', "%$search%");
            });
            $query->orWhereHas('contest_status', function ($q) use ($search) {
                $q->where('name', 'ilike', "%$search%");
            });
            $query->orWhere('name', 'ilike', "%$search%");
            $query->orWhere('description', 'ilike', "%$search%");
        }
        if (!empty($params['contest_status_id'])) {
            $contest_status_id = explode(',', $params['contest_status_id']);
            $query->whereIn('contest_status_id', $contest_status_id);
        }
        if (!empty($params['contest_type_id'])) {
            $query->where('contest_type_id', '=', $params['contest_type_id']);
        }
        if (!empty($params['resource_id'])) {
            $query->where('resource_id', '=', $params['resource_id']);
        }
        if (!empty($params['is_blind'])) {
            $query->where('is_blind', '=', $params['is_blind']);
        }
        if (!empty($params['is_private'])) {
            $query->where('is_private', '=', $params['is_private']);
        }
        if (!empty($params['is_featured'])) {
            $query->where('is_featured', '=', $params['is_featured']);
        }
        if (!empty($params['is_highlight'])) {
            $query->where('is_highlight', '=', $params['is_highlight']);
        }
        if (!empty($params['user_id'])) {
            $query->where('user_id', $params['user_id']);
        }
    }
    public function user()
    {
        return $this->belongsTo('Models\User', 'user_id', 'id')->with('attachment');
    }
    public function referred_by_user()
    {
        return $this->belongsTo('Models\ReferredByUser', 'referred_by_user_id', 'id');
    }
    public function contest_type()
    {
        return $this->belongsTo('Models\ContestType', 'contest_type_id', 'id')->with('attachment');
    }
    public function contest_status()
    {
        return $this->belongsTo('Models\ContestStatus', 'contest_status_id', 'id');
    }
    public function resource()
    {
        return $this->belongsTo('Models\Resource', 'resource_id', 'id');
    }
    public function pricing_package()
    {
        return $this->belongsTo('Models\PricingPackage', 'pricing_package_id', 'id');
    }
    public function pricing_day()
    {
        return $this->belongsTo('Models\PricingDay', 'pricing_day_id', 'id');
    }
    public function winner_user()
    {
        return $this->belongsTo('Models\User', 'winner_user_id', 'id');
    }
    public function payment_gateway()
    {
        return $this->belongsTo('Models\PaymentGateway', 'payment_gateway_id', 'id');
    }
    public function zazpay_gateway()
    {
        return $this->belongsTo('Models\ZazpayGateway', 'zazpay_gateway_id', 'id');
    }
    public function zazpay_payment()
    {
        return $this->belongsTo('Models\ZazpayPayment', 'zazpay_payment_id', 'id');
    }
    public function form_field_submission()
    {
        return $this->hasMany('Models\FormFieldSubmission', 'foreign_id', 'id')->where('class', 'Contest')->with('form_field');
    }
    public function foreigns()
    {
        return $this->morphMany('Models\Activity', 'foreign');
    }
    public function foreign_models()
    {
        return $this->morphMany('Models\Activity', 'foreign_model');
    }
    public function foreign_messages()
    {
        return $this->morphMany('Models\Message', 'foreign_message');
    }
    public function foreign_followers()
    {
        return $this->morphMany('Models\Follower', 'foreign_follower');
    }
    public function foreign_transactions()
    {
        return $this->morphMany('Models\Transaction', 'foreign_transaction');
    }
    public function foreign_views()
    {
        return $this->morphMany('Models\View', 'foreign_view');
    }
    public function foreign_flags()
    {
        return $this->morphMany('Models\Flag', 'foreign_flag');
    }
    public function foreign_reviews()
    {
        return $this->morphMany('Models\Review', 'foreign_review');
    }
    public function contest_users()
    {
        return $this->hasMany('Models\ContestUser', 'contest_id', 'id');
    }
    public function foreign_review_models()
    {
        return $this->morphMany('Models\Review', 'foreign_model');
    }
    public function contest_user_won_entry()
    {
        return $this->hasMany('Models\ContestUser', 'contest_id', 'id')->where('contest_user_status_id', \Constants\ConstContestUserStatus::Won)->with('user', 'attachment', 'messages');
    }
    public function activity()
    {
        return $this->belongsTo('Models\Contest', 'id', 'id')->select('id', 'user_id')->with('foreign_user');
    }
    public function foreign_user()
    {
        return $this->belongsTo('Models\User', 'user_id', 'id')->select('id', 'username')->with('foreign_attachment');
    }
    public function followers()
    {
        $user_id = 0;
        global $authUser;
        if (!empty($authUser)) {
            $user_id = $authUser['id'];
        }
        return $this->hasOne('Models\Follower', 'foreign_id', 'id')->where('class', 'Contest')->where('user_id', $user_id);
    }
    public function processCaptured($payment_response, $id)
    {
        $dispatcher = Contest::unsetEventDispatcher();
        $contest = Contest::where('contest_status_id', \Constants\ConstContestStatus::PaymentPending)->find($id);
        if (!empty($contest)) {            
            if (!empty($contest['pricing_day'])) {
                $contest->end_date = date('Y-m-d H:i:s', strtotime('+' . $contest['pricing_day']['no_of_days'] . ' day'));
                $contest->actual_end_date = date('Y-m-d H:i:s', strtotime('+' . $contest['pricing_day']['no_of_days'] . ' day'));
            }
            //After payment check whether Enable Auto Approval After New Contest true, then set as Open or Pending Approval
            if (!CONTEST_ENABLE_AUTO_APPROVAL) {
                $contest->contest_status_id = \Constants\ConstContestStatus::PendingApproval;
            } else {
                $contest->contest_status_id = \Constants\ConstContestStatus::Open;
                $contest->start_date = date('Y-m-d h:i:s');
            }
            if (!empty($payment_response['paykey'])) {
                $contest->paypal_pay_key = $payment_response['paykey'];
            }
            $contest->update();            
            $user = User::find($contest['user_id']);
            $user->makeVisible(['total_site_revenue_as_employer', 'total_spend_amount_as_employer']);
            if (CONTEST_COMMISSION_FROM_EMPLOYER) {
                $commision_employer = ($contest->prize / 100) * CONTEST_COMMISSION_FROM_EMPLOYER;
                $user->total_site_revenue_as_employer = $user->total_site_revenue_as_employer + $commision_employer;
            }
            $user->total_spend_amount_as_employer = $user->total_spend_amount_as_employer + $contest->prize;
            $user->is_made_deposite = 1;
            $user->update();
            $adminId = User::select('id')->where('role_id', \Constants\ConstUserTypes::Admin)->first();
            insertTransaction($contest->user_id, $adminId['id'], $contest->id, 'Contest', \Constants\TransactionType::ContestFeaturesUpdatedFee, $contest->payment_gateway_id, $contest->prize, 0, 0, 0, 0, $contest->id, $contest->payment_gateway_id);
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
        $contest = Contest::where('contest_status_id', \Constants\ConstContestStatus::PaymentPending)->find($args['foreign_id']);
        if (!empty($contest)) {
            $amount = 0;
            $contestType = ContestType::find($contest->contest_type_id);
            $ContestTypesPricingPackage = ContestTypesPricingPackage::where('contest_type_id', $contest->contest_type_id)->where('pricing_package_id', $contest->pricing_package_id)->first();
            if (!empty($ContestTypesPricingPackage)) {
                $amount+= $ContestTypesPricingPackage->price;
            } else {
                $pricingPackage = PricingPackage::find($contest->pricing_package_id);
                $amount+= $pricingPackage->global_price;
            }
            $ContestTypesPricingDay = ContestTypesPricingDay::where('contest_type_id', $contest->contest_type_id)->where('pricing_day_id', $contest->pricing_day_id)->first();
            if (!empty($ContestTypesPricingDay)) {
                $amount+= $ContestTypesPricingDay->price;
            } else {
                $pricingDay = PricingDay::find($contest->pricing_day_id);
                $amount+= $pricingDay->global_price;
            }
            if (!empty($contest->is_blind)) {
                $amount+= $contestType->blind_fee;
            }
            if (!empty($contest->is_featured)) {
                $amount+= $contestType->featured_fee;
            }
            if (!empty($contest->is_highlight)) {
                $amount+= $contestType->highlight_fee;
            }
            if (!empty($contes->is_private)) {
                $amount+= $contestType->private_fee;
            }
            if ($amount > 0) {
                $args['name'] = $args['description'] = "Listing fee for " . $contest->name . " in " . SITE_NAME;
                $args['amount'] = $amount;
                $args['id'] = $contest->id;
                $args['notify_url'] = $_server_domain_url . '/ipn/process_ipn/Contest/' . $contest->id . '/hash/' . md5(SECURITY_SALT . $contest->id . SITE_NAME);
                $args['success_url'] = $_server_domain_url . '/contests/' . $contest->id . '/' . $contest->slug . '?error_code=0';
                $args['cancel_url'] = $_server_domain_url . '/contests/order/' . $contest->id . '/tests?error_code=512';
                $contest->payment_gateway_id = $args['payment_gateway_id'];
                $contest->prize = $amount;
                $contest->save();
                $result = Payment::processPayment($contest->id, $args, 'Contest');
            } else {
                 if (!empty($contest['pricing_day'])) {
                    $contest->end_date = date('Y-m-d H:i:s', strtotime('+' . $contest['pricing_day']['no_of_days'] . ' day'));
                    $contest->actual_end_date = date('Y-m-d H:i:s', strtotime('+' . $contest['pricing_day']['no_of_days'] . ' day'));
                }                
                if (!CONTEST_ENABLE_AUTO_APPROVAL) {
                    $contest->contest_status_id = \Constants\ConstContestStatus::PendingApproval;
                } else {
                    $contest->contest_status_id = \Constants\ConstContestStatus::Open;
                    $contest->start_date = date('Y-m-d h:i:s');
                }
                $contest->update();
                $result = $contest->toArray();
            }
        }
        return $result;
    }
}
