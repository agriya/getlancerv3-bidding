<?php
/**
 * ProjectDispute
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
 * ProjectDispute
*/
class ProjectDispute extends AppModel
{
    protected $table = 'project_disputes';
    protected $fillable = array(
        'project_id',
        'bid_id',
        'dispute_open_type_id',
        'reason',
        'dispute_status_id',
        'expected_rating'
    );
    public $rules = array();
    public function user()
    {
        return $this->belongsTo('Models\User', 'user_id', 'id')->with('attachment');
    }
    public function project()
    {
        return $this->belongsTo('Models\Project', 'project_id', 'id')->with('user', 'freelancer');
    }
    public function dispute_open_type()
    {
        return $this->belongsTo('Models\DisputeOpenType', 'dispute_open_type_id', 'id');
    }
    public function dispute_status()
    {
        return $this->belongsTo('Models\DisputeStatus', 'dispute_status_id', 'id');
    }
    public function dispute_closed_type()
    {
        return $this->belongsTo('Models\DisputeClosedType', 'dispute_closed_type_id', 'id');
    }
    public function bid()
    {
        return $this->belongsTo('Models\Bid', 'bid_id', 'id');
    }
    public function foreign_messages()
    {
        return $this->morphMany('Models\Message', 'foreign_message');
    }
    public function foreign_dispute_model()
    {
        return $this->belongsTo('Models\Project', 'project_id', 'id');
    }
    public function foreigns()
    {
        return $this->morphMany('Models\Activity', 'foreign');
    }
    public function foreign_project()
    {
        return $this->belongsTo('Models\Project', 'project_id', 'id');
    }
     public function activity()
    {
        return $this->belongsTo('Models\ProjectDispute', 'id', 'id')->with('foreign_dispute_model', 'dispute_open_type');
    }
    public function scopeFilter($query, $params = array())
    {
        parent::scopeFilter($query, $params);
        if (!empty($params['project_id'])) {
            $query->where('project_id', $params['project_id']);
        }
        if (!empty($params['dispute_open_type_id'])) {
            $query->where('dispute_open_type_id', $params['dispute_open_type_id']);
        }
        if (!empty($params['dispute_status_id'])) {
            $query->where('dispute_status_id', $params['dispute_status_id']);
        }
        if (!empty($params['dispute_closed_type_id'])) {
            $query->where('dispute_closed_type_id', $params['dispute_closed_type_id']);
        }
        if (!empty($params['bid_id'])) {
            $query->where('bid_id', $params['bid_id']);
        }
    }
    public function _updateProjectStatusToDevelopement($project = array())
    {
        if ($project->project_status_id == \Constants\ProjectStatus::FinalReviewPending || $project->project_status_id == \Constants\ProjectStatus::Completed) {
            Project::where('id', $project->id)->update(array(
                'project_status_id' => \Constants\ProjectStatus::UnderDevelopment
            ));
        }
    }
    public function _resolveDispute($project = array(), $dispute_type_id)
    {
        if ($dispute_type_id == \Constants\ConstDisputeOpenType::FreelancerGivePoorRating || $dispute_type_id == \Constants\ConstDisputeOpenType::EmployerGivePoorRating) {
            $count = count($project->bid_winner->reviews);
            if (!empty($project->bid_winner->reviews) and $count == 2) {
                $is_updated = 1;
                foreach ($project->bid_winner->reviews as $review) {
                    if (empty($review['message'])) {
                        $is_updated = 0;
                    }
                }
            }
            if ($project->project_status_id == \Constants\ProjectStatus::FinalReviewPending and $is_updated and $count == 2) {
                Project::where('id', $project->id)->update(array(
                    'project_status_id' => \Constants\ProjectStatus::Closed
                ));
            }
        }
        if ($dispute_type_id == \Constants\ConstDisputeOpenType::FreelancerWorkNotMatchesRequirement || $dispute_type_id == \Constants\ConstDisputeOpenType::FreelancerGivePoorRating) {
            if (!empty($project->bid_winner)) {
                $amount = 0;
                if ($project->milestones) {
                    foreach ($project->milestones as $milestone) {
                        $milestone_amount = $milestone->amount;
                        if (PROJECT_COMMISSION_FROM_FREELANCER_FOR_MILESTONE) {
                            $commision_amount = ($milestone->amount / 100) * PROJECT_COMMISSION_FROM_FREELANCER_FOR_MILESTONE;
                            $milestone_amount = $milestone->amount + $commision_amount;
                        }
                        $amount+= $milestone_amount;
                    }
                }
                $adminId = User::select('id')->where('role_id', \Constants\ConstUserTypes::Admin)->first();
                $transaction_id = insertTransaction($adminId['id'], $project->bid_winner->user_id, $project->id, 'Project', \Constants\TransactionType::AmountRefundedToWalletForCanceledProjectPayment, 0, $amount, 0, 0, 0, 0, $project->id, 0);
                if (!empty($transaction_id)) {
                    $user = User::find($project->bid_winner->user_id);
                    $user->makeVisible(['available_wallet_amount']);
                    $user->available_wallet_amount = $user->available_wallet_amount + $amount;
                    $user->is_made_deposite = 1;
                    $user->update();
                    $paid_escrow_amount = $project->bid_winner->paid_escrow_amount + $amount;
                    $amount_in_escrow = $project->bid_winner->paid_escrow_amount - $amount;
                    Bid::where('id', $project->bid_winner->id)->update(array(
                        'amount_in_escrow' => $amount_in_escrow,
                        'paid_escrow_amount' => $paid_escrow_amount
                    ));
                    Milestone::where('bid_id', $project->bid_winner->id)->where('milestone_status_id', '!=', \Constants\MilestoneStatus::Completed)->update(array(
                        'milestone_status_id' => \Constants\MilestoneStatus::EscrowReleased
                    ));
                    if (count($project->bid_winner->reviews) == 2) {
                        Project::where('id', $project->id)->update(array(
                            'project_status_id' => \Constants\ProjectStatus::Closed
                        ));
                    } else {
                        Project::where('id', $project->id)->update(array(
                            'project_status_id' => \Constants\ProjectStatus::FinalReviewPending
                        ));
                    }
                }
            }
        }
    }
    public function _refundedAndCancelProject($project = array(), $user_id, $type)
    {
        if (!empty($project->bid_winner)) {
            $amount = 0;
            if ($project->milestones) {
                foreach ($project->milestones as $milestone) {
                    $milestone_amount = $milestone->amount;
                    if ($type == 'employer') {
                        if (PROJECT_COMMISSION_FROM_EMPLOYER_FOR_MILESTONE) {
                            $commision_amount = ($milestone->amount / 100) * PROJECT_COMMISSION_FROM_EMPLOYER_FOR_MILESTONE;
                            $milestone_amount = $milestone->amount + $commision_amount;
                        }
                    } elseif ($type == 'freelancer') {
                        if (PROJECT_COMMISSION_FROM_FREELANCER_FOR_MILESTONE) {
                            $commision_amount = ($milestone->amount / 100) * PROJECT_COMMISSION_FROM_FREELANCER_FOR_MILESTONE;
                            $milestone_amount = $milestone->amount + $commision_amount;
                        }
                    }
                    $amount+= $milestone_amount;
                }
            }
            if ($amount > 0) {
                $adminId = User::select('id')->where('role_id', \Constants\ConstUserTypes::Admin)->first();
                $transaction_id = insertTransaction($adminId['id'], $user_id, $project->id, 'Project', \Constants\TransactionType::AmountRefundedToWalletForCanceledProjectPayment, 0, $amount, 0, 0, 0, 0, $project->id, 0);
                if (!empty($transaction_id)) {
                    $user = User::find($user_id);
                    $user->makeVisible(['available_wallet_amount']);
                    $user->available_wallet_amount = $user->available_wallet_amount + $amount;
                    $user->is_made_deposite = 1;
                    $user->update();
                }
            }
            Project::where('id', $project->id)->update(array(
                'project_status_id' => \Constants\ProjectStatus::CanceledByAdmin
            ));
            Project::ProjectStatusCountUpdation(\Constants\ProjectStatus::CanceledByAdmin);
        }
    }
    public function _updateRating($project = array(), $user_id, $expected_rating = null, $type = '')
    {
        if (!empty($project->bid_winner->reviews)) {
            $is_updated = 0;
            foreach ($project->bid_winner->reviews as $review) {
                if ($review['to_user_id'] == $user_id) {
                    $review_data['message'] = 'Review Updated by admin to close dispute';
                    $review_data['rating'] = (!empty($expected_rating)) ? $expected_rating : $review['rating'];
                    Review::where('id', $review['id'])->update($review_data);
                    if ($type == 'employer') {
                        $reviewCount = Review::where('to_user_id', $user_id)->where('is_freelancer', 0)->sum('rating');
                        User::where('id', $user_id)->update(array(
                            'total_rating_as_employer' => $reviewCount
                        ));
                    } else {
                        $reviewCount = Review::where('to_user_id', $user_id)->where('is_freelancer', 1)->sum('rating');
                        User::where('id', $user_id)->update(array(
                            'total_rating_as_freelancer' => $reviewCount
                        ));
                    }
                } else {
                    if (!empty($review['message'])) {
                        $is_updated = 1;
                    }
                }
            }
            if ($project->project_status_id == \Constants\ProjectStatus::FinalReviewPending and $is_updated) {
                Project::where('id', $project->id)->update(array(
                    'project_status_id' => \Constants\ProjectStatus::Closed
                ));
            }
        }
    }
}
