<?php
/**
 * Milestone
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
 * Milestone
*/
class Milestone extends AppModel
{
    protected $table = 'milestones';
    protected $fillable = array(
        'bid_id',
        'amount',
        'description',
        'milestone_status_id',
        'deadline_date'
    );
    public $rules = array(
        'project_id' => 'sometimes|required',
        'milestone_status_id' => 'sometimes|required',
        'deadline_date' => 'sometimes|required',
    );
    public function project()
    {
        return $this->belongsTo('Models\Project', 'project_id', 'id');
    }
    public function user()
    {
        return $this->belongsTo('Models\User', 'user_id', 'id');
    }
    public function bid()
    {
        return $this->belongsTo('Models\Bid', 'bid_id', 'id');
    }
    public function milestone_status()
    {
        return $this->belongsTo('Models\MilestoneStatus', 'milestone_status_id', 'id');
    }
    public function foreigns()
    {
        return $this->morphMany('Models\Activity', 'foreign');
    }
    public function activity()
    {
        return $this->belongsTo('Models\Milestone', 'id', 'id')->select('id', 'project_id', 'user_id')->with('project', 'foreign_user');
    }
    public function foreign_user()
    {
        return $this->belongsTo('Models\User', 'user_id', 'id')->select('id', 'username')->with('foreign_attachment');
    }
    protected static function boot()
    {
        global $authUser;
        parent::boot();
        self::creating(function ($milestone) use ($authUser) {
            $bids = Bid::where('id', $milestone->bid_id)->with('project')->first();
            if ($authUser->role_id == \Constants\ConstUserTypes::Admin || $authUser->id == $bids['user_id'] || $bids['project']['user_id'] == $authUser->id) {
                if ($bids['project']['user_id'] == $authUser->id) {
                    $milestone->milestone_status_id = \Constants\MilestoneStatus::Approved;
                } else {
                    $milestone->milestone_status_id = \Constants\MilestoneStatus::Pending;
                }
                return true;
            }
            return false;
        });
        self::created(function ($milestone) {
            Project::where('id', $milestone->project_id)->increment('milestone_count', 1);
            Bid::where('id', $milestone->bid_id)->increment('milestone_count', 1);
        });
        self::deleted(function ($milestone) {
            Project::where('id', $milestone->project_id)->decrement('milestone_count', 1);
            Bid::where('id', $milestone->bid_id)->decrement('milestone_count', 1);
        });
    }
    public function scopeFilter($query, $params = array())
    {
        parent::scopeFilter($query, $params);
        if (!empty($params['milestone_status_id'])) {
            $milestone_status_id = explode(',', $params['milestone_status_id']);
            $query->whereIn('milestone_status_id', $milestone_status_id);
        }
        if (!empty($params['project_id'])) {
            $query->where('project_id', $params['project_id']);
        }
        if (!empty($params['bid_id'])) {
            $query->where('bid_id', $params['bid_id']);
        }
    }
    public function processCaptured($payment_response, $id)
    {
        global $_server_domain_url;
        $milestone = Milestone::with('project', 'bid')->where('milestone_status_id', \Constants\MilestoneStatus::RequestedForEscrow)->where('id', $id)->first();
        if (!empty($milestone)) {
            $oldMilestoneStatus = $milestone->milestone_status_id;
            $milestone->milestone_status_id = \Constants\MilestoneStatus::EscrowFunded;
            if (!empty($payment_response['paykey'])) {
                $milestone->paypal_pay_key = $payment_response['paykey'];
            }
            $milestone->update();
            updateSiteCommissionFromEmployer($milestone->site_commission_from_employer, $milestone->bid_id, $milestone->project_id, $milestone->project->user_id);
            insertActivities($milestone->project->user_id, $milestone->bid->user_id, 'Milestone', $milestone->id, $oldMilestoneStatus, \Constants\MilestoneStatus::EscrowFunded, \Constants\ActivityType::MilestoneStatuschanged, $milestone->project_id);
            $projectUser = User::select('id', 'available_wallet_amount', 'total_site_revenue_as_employer', 'total_spend_amount_as_employer')->where('id', $milestone->project->user_id)->first();
            $projectUser->makeVisible(['available_wallet_amount', 'total_site_revenue_as_employer', 'total_spend_amount_as_employer']);
            $commision_employer = 0;
            if (PROJECT_COMMISSION_FROM_EMPLOYER_FOR_MILESTONE) {
                $commision_employer = ($milestone->amount / 100) * PROJECT_COMMISSION_FROM_EMPLOYER_FOR_MILESTONE;
            }
            $projectUser->total_spend_amount_as_employer = $projectUser->total_spend_amount_as_employer + $milestone->amount + $commision_employer;
            $projectUser->is_made_deposite = 1;
            $projectUser->id = $projectUser->id;
            $projectUser->update();
            $milestone->site_commission_from_employer = $commision_employer;
            $milestone->update();
            insertTransaction($milestone->project->user_id, $milestone->bid->user_id, $milestone->id, 'Milestone', \Constants\TransactionType::ProjectMilestonePaymentPaid, $milestone->payment_gateway_id, $milestone->amount, 0, 0, 0, $commision_employer, $milestone->project_id, $milestone->zazpay_gateway_id);
            $message = 'Milestone payment has been funded.';
            if (!empty($milestone->amount)) {
                $message.= ' Amount: ' . CURRENCY_SYMBOL . $milestone->amount;
            }
            $subject = 'Milestone payment has been funded.';
            $messageContent = new MessageContent;
            $messageContent->message = $message;
            $messageContent->subject = $subject;
            $messageContent->save();
            $modelId = $milestone->project_id;
            $senderMessageId = saveMessage(0, '', $milestone->project->user_id, $milestone->bid->user_id, $messageContent->id, 0, 'Project', $milestone->project_id, 1, $modelId, 0);
            $receiverMessageId = saveMessage(0, '', $milestone->bid->user_id, $milestone->project->user_id, $messageContent->id, 0, 'Project', $milestone->project_id, 0, $modelId, 0);
            $userDetails = getUserHiddenFields($milestone->bid->user_id);
            $employerDetails = getUserHiddenFields($milestone->project->user_id);
            $emailFindReplace = array(
                '##FREELANCER##' => ucfirst($userDetails->username) ,
                '##EMPLOYER##' => ucfirst($employerDetails->username) ,
                '##PROJECT_NAME##' => $milestone->project->name,
                '##DESCRIPTION##' => $milestone->description,
                '##MILESTONE_ID##' => $milestone->id,
                '##CURRENCY##' => CURRENCY_SYMBOL,
                '##AMOUNT##' => $milestone->amount,
                '##DEADLINE##' => $milestone->deadline_date,
                '##PROJECT_URL##' => $_server_domain_url . '/projects/view/' . $milestone->project_id . '/' . $milestone->project->slug . '?action=milestones'
            );
            sendMail('Milestone - Escrow Amount Paid Notification', $emailFindReplace, $userDetails->email);
            updateAmountInBidTable($milestone->bid_id);
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
        $milestone = Milestone::with('project')->where('milestone_status_id', \Constants\MilestoneStatus::RequestedForEscrow)->where('id', $args['foreign_id'])->first();
        // Milestone payment process
        if (!empty($milestone)) {
            $milestone->payment_gateway_id = $args['payment_gateway_id'];
            $milestone->zazpay_gateway_id = !empty($args['gateway_id']) ? $args['gateway_id'] : 1;
            $milestone->update();
            $args['name'] = $args['description'] = "Milestone payment for " . $milestone->project->name . " in " . SITE_NAME;
            $args['amount'] = $milestone->amount;
            if (PROJECT_COMMISSION_FROM_EMPLOYER_FOR_MILESTONE) {
                $commision_amount = ($milestone->amount / 100) * PROJECT_COMMISSION_FROM_EMPLOYER_FOR_MILESTONE;
                $args['amount'] = $milestone->amount + round($commision_amount, 2);
            }
            $args['id'] = $milestone->id;
            $args['notify_url'] = $_server_domain_url . '/ipn/process_ipn/Milestone/' . $milestone->id . '/' . md5(SECURITY_SALT . $milestone->id . SITE_NAME);
            $args['success_url'] = $_server_domain_url . '/projects/view/' . $milestone->project->id . '/' . $milestone->project->slug . '?error_code=0';
            $args['cancel_url'] = $_server_domain_url . '/projects/order/' . $milestone->project->id . '/tests?error_code=512';
            $result = Payment::processPayment($milestone->id, $args, 'Milestone');
        }
        return $result;
    }
}
