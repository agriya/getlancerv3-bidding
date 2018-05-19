<?php
/**
 * ProjectBidInvoice
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
 * ProjectBidInvoice
*/
class ProjectBidInvoice extends AppModel
{
    protected $table = 'project_bid_invoices';
    protected $fillable = array(
        'bid_id'
    );
    public $rules = array();
    public function bid()
    {
        return $this->belongsTo('Models\Bid', 'bid_id', 'id')->with('project');
    }
    public function zazpay_payment()
    {
        return $this->belongsTo('Models\ZazpayPayment', 'zazpay_payment_id', 'id');
    }
    public function zazpay_gateway()
    {
        return $this->belongsTo('Models\ZazpayGateway', 'zazpay_gateway_id', 'id');
    }
    public function projectbidinvoiceitems()
    {
        return $this->hasMany('Models\ProjectBidInvoiceItems', 'project_bid_invoice_id', 'id');
    }
    public function project()
    {
        return $this->belongsTo('Models\Project', 'project_id', 'id');
    }
    public function user()
    {
        return $this->belongsTo('Models\User', 'user_id', 'id')->with('attachment');
    }
    public function foreigns()
    {
        return $this->morphMany('Models\Activity', 'foreign');
    }
    public function activity()
    {
        return $this->belongsTo('Models\ProjectBidInvoice', 'id', 'id')->select('id', 'project_id', 'user_id')->with('project', 'foreign_user');
    }
    public function foreign_user()
    {
        return $this->belongsTo('Models\User', 'user_id', 'id')->select('id', 'username')->with('foreign_attachment');
    }
    protected static function boot()
    {
        global $authUser;
        parent::boot();
        self::updating(function ($projectBidInvoice) use ($authUser) {
            $bids = Bid::where('id', $projectBidInvoice->bid_id)->select('user_id')->first();
            if (($authUser['role_id'] == \Constants\ConstUserTypes::Admin) || ($authUser['id'] == $bids->user_id)) {
                ProjectBidInvoice::ProjectBidInvoiceCountUpdation($projectBidInvoice->project_id);
                return true;
            }
            return false;
        });
        self::saving(function ($projectBidInvoice) use ($authUser) {
            $bids = Bid::where('id', $projectBidInvoice->bid_id)->select('user_id')->first();
            if (($authUser['role_id'] == \Constants\ConstUserTypes::Admin) || ($authUser['id'] == $bids->user_id)) {
                ProjectBidInvoice::ProjectBidInvoiceCountUpdation($projectBidInvoice->project_id);
                return true;
            }
            return false;
        });
        self::deleting(function ($projectBidInvoice) use ($authUser) {
            if (($authUser['role_id'] == \Constants\ConstUserTypes::Admin) || ($authUser['id'] == $projectBidInvoice->user_id && empty($projectBidInvoice->is_paid))) {
                ProjectBidInvoiceItems::where('project_bid_invoice_id', $projectBidInvoice->id)->get()->each(function ($ProjectBidInvoiceItems) {
                    $ProjectBidInvoiceItems->delete();
                });
                ProjectBidInvoice::ProjectBidInvoiceCountUpdation($projectBidInvoice->project_id);
                return true;
            }
            return false;
        });
        self::deleted(function ($projectBidInvoice) {
            ProjectBidInvoice::ProjectBidInvoiceCountUpdation($projectBidInvoice->project_id);
        });
    }
    public function ProjectBidInvoiceCountUpdation($project_id)
    {
        $projectBidInvoiceCount = ProjectBidInvoice::where('project_id', $project_id)->count();
        Project::where('id', $project_id)->update(['project_bid_invoice_count' => $projectBidInvoiceCount]);
    }
    public function scopeFilter($query, $params = array())
    {
        parent::scopeFilter($query, $params);
        if (!empty($params['bid_id'])) {
            $query->where('bid_id', $params['bid_id']);
        }
        if (!empty($params['project_id'])) {
            $query->where('project_id', $params['project_id']);
        }
    }
    public function processCaptured($payment_response, $id)
    {
        $projectBidInvoice = ProjectBidInvoice::with('bid', 'project', 'projectbidinvoiceitems')->where('id', $id)->where('is_paid', false)->first();
        if (!empty($projectBidInvoice)) {
            $dispatcher = ProjectBidInvoice::getEventDispatcher();
            ProjectBidInvoice::unsetEventDispatcher();
            $projectBidInvoice->is_paid = true;
            if (!empty($payment_response['paykey'])) {
                $projectBidInvoice->paypal_pay_key = $payment_response['paykey'];
            }
            $projectBidInvoice->paid_on = date('Y-m-d h:i:s');
            $projectBidInvoice->zazpay_pay_key = $payment_response['paykey'];
            $projectBidInvoice->update();
            insertActivities($projectBidInvoice->project->user_id, $projectBidInvoice->user_id, 'ProjectBidInvoice', $projectBidInvoice->id, 0, 0, \Constants\ActivityType::ProjectBidInvoicePaid, $projectBidInvoice->project_id);
            ProjectBidInvoice::setEventDispatcher($dispatcher);

            updateSiteCommissionFromEmployer($projectBidInvoice->site_commission_from_employer, $projectBidInvoice->bid_id, $projectBidInvoice->project_id, $projectBidInvoice->project->user_id);
            
            updateSiteCommissionFromFreelancer($projectBidInvoice->site_commission_from_freelancer, $projectBidInvoice->bid_id, $projectBidInvoice->project_id, $projectBidInvoice->bid->user_id);

            $user = User::find($projectBidInvoice->user_id);
            $user->makeVisible(['available_wallet_amount', 'total_site_revenue_as_freelancer', 'total_earned_amount_as_freelancer']);
            $commision_freelancer = $commision_employer = 0;
            if (PROJECT_COMMISSION_FROM_FREELANCER_FOR_INVOICE) {
                $commision_freelancer = ($projectBidInvoice->amount / 100) * PROJECT_COMMISSION_FROM_FREELANCER_FOR_INVOICE;
            }
            $user->available_wallet_amount = $user->available_wallet_amount + $projectBidInvoice->amount - $commision_freelancer;
            $user->total_earned_amount_as_freelancer = $user->total_earned_amount_as_freelancer + $projectBidInvoice->amount - $commision_freelancer;
            $user->is_made_deposite = 1;
            $user->update();
            $projectUser = User::find($projectBidInvoice->project->user_id);
            $projectUser->makeVisible(['total_site_revenue_as_employer', 'total_spend_amount_as_employer']);
            if (PROJECT_COMMISSION_FROM_EMPLOYER_FOR_INVOICE) {
                $commision_employer = ($projectBidInvoice->amount / 100) * PROJECT_COMMISSION_FROM_EMPLOYER_FOR_INVOICE;
            }
            $projectUser->total_spend_amount_as_employer = $projectUser->total_spend_amount_as_employer + $projectBidInvoice->amount + $commision_employer;
            $projectUser->is_made_deposite = 1;
            $projectUser->update();
            insertTransaction($projectBidInvoice->project->user_id, $projectBidInvoice->user_id, $projectBidInvoice->id, 'ProjectBidInvoice', \Constants\TransactionType::ProjectInvoicePayment, $projectBidInvoice->payment_gateway_id, $projectBidInvoice->amount, $commision_freelancer, 0, 0, $commision_employer, $projectBidInvoice->project_id, $projectBidInvoice->zazpay_gateway_id);            
            $userDetails = getUserHiddenFields($projectBidInvoice->bid->user_id);
            $employerDetails = getUserHiddenFields($projectBidInvoice->project->user_id);
            $emailFindReplace = array(
                '##FREELANCER##' => ucfirst($userDetails->username) ,
                '##EMPLOYER##' => ucfirst($employerDetails->username) ,
                '##PROJECT_NAME##' => $projectBidInvoice->project->name,
                '##DESCRIPTION##' => $projectBidInvoice->projectbidinvoiceitems[0]->description,
                '##INVOICE_ID##' => $projectBidInvoice->id,
                '##CURRENCY##' => CURRENCY_SYMBOL,
                '##AMOUNT##' => $projectBidInvoice->amount,
                '##PROJECT_URL##' => $_server_domain_url . '/projects/view/' . $projectBidInvoice->project_id . '/' . $projectBidInvoice->project->slug . '?action=invoices'
            );
            sendMail('Invoice Paid Notification', $emailFindReplace, $employerDetails->email);
            $total_invoice_got_paid = 0;
            $invoiceAmount = ProjectBidInvoice::where('bid_id', $projectBidInvoice->bid_id)->selectRaw('sum(amount) as total_invoice_got_paid')->first()->toArray();
            if (!empty($invoiceAmount['total_invoice_got_paid'])) {
                $total_invoice_got_paid = $invoiceAmount['total_invoice_got_paid'];
            }  
            Bid::where('id', $projectBidInvoice->bid_id)->update(array(
                'total_invoice_got_paid' => $total_invoice_got_paid
            ));
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
        $projectBidInvoice = ProjectBidInvoice::with('project')->where('is_paid', false)->where('id', $args['foreign_id'])->first();
        // Project payment process
        if (!empty($projectBidInvoice)) {
            $dispatcher = ProjectBidInvoice::getEventDispatcher();
            ProjectBidInvoice::unsetEventDispatcher();
            $projectBidInvoice->payment_gateway_id = $args['payment_gateway_id'];
            $projectBidInvoice->update();
            ProjectBidInvoice::setEventDispatcher($dispatcher);
            $args['name'] = $args['description'] = "Invoice payment for " . $projectBidInvoice->project->name . " in " . SITE_NAME;
            $args['amount'] = $projectBidInvoice->amount;
            if (PROJECT_COMMISSION_FROM_EMPLOYER_FOR_INVOICE) {
                $commision_amount = ($projectBidInvoice->amount / 100) * PROJECT_COMMISSION_FROM_EMPLOYER_FOR_INVOICE;
                $args['amount'] = $projectBidInvoice->amount + round($commision_amount, 2);
            }
            $args['id'] = $projectBidInvoice->id;
            $args['notify_url'] = $_server_domain_url . '/ipn/process_ipn/ProjectBidInvoice/' . $projectBidInvoice->id . '/' . md5(SECURITY_SALT . $projectBidInvoice->id . SITE_NAME);
            $args['success_url'] = $_server_domain_url . '/projects/view/' . $projectBidInvoice->project->id . '/' . $projectBidInvoice->project->slug . '?error_code=0';
            $args['cancel_url'] = $_server_domain_url . '/projects/order/' . $projectBidInvoice->project->id . '/tests?error_code=512';
            $result = Payment::processPayment($projectBidInvoice->id, $args, 'ProjectBidInvoice');
        }
        return $result;
    }
}
