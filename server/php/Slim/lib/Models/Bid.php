<?php
/**
 * Bid
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
 * Bid
*/
class Bid extends AppModel
{
    protected $table = 'bids';
    protected $fillable = array(
        'project_id',
        'amount',
        'duration',
        'description',
        'is_freelancer_withdrawn'
    );
    public $rules = array(
        'project_bid_id' => 'sometimes|required',
        'project_id' => 'sometimes|required',
        'amount' => 'sometimes|required',
        'duration' => 'sometimes|required',
        'winner_selected_date' => 'sometimes|required|date',
        'bid_status_id' => 'sometimes|required',
        'message_count' => 'sometimes|required',
        'is_notifiy' => 'sometimes|required|boolean',
        'is_withdrawn' => 'sometimes|required|boolean',
        'is_freelancer_withdrawn' => 'sometimes|required|boolean',
    );
    public function user()
    {
        return $this->belongsTo('Models\User', 'user_id', 'id')->with('attachment', 'country', 'state', 'city');
    }
    public function project_bid()
    {
        return $this->belongsTo('Models\ProjectBid', 'project_bid_id', 'id');
    }
    public function project()
    {
        return $this->belongsTo('Models\Project', 'project_id', 'id')->with('attachment', 'user');
    }
    public function foreign_project()
    {
        return $this->belongsTo('Models\Project', 'project_id', 'id');
    }
    public function duration_type()
    {
        return $this->belongsTo('Models\DurationType', 'duration_type_id', 'id');
    }
    public function bid_status()
    {
        return $this->belongsTo('Models\BidStatus', 'bid_status_id', 'id');
    }
    public function project_dispute()
    {
        return $this->belongsTo('Models\ProjectDispute', 'bid_id', 'id');
    }
    public function foreign_messages()
    {
        return $this->morphMany('Models\Message', 'foreign_message');
    }
    public function foreign_reviews()
    {
        return $this->morphMany('Models\Review', 'foreign_review');
    }
    public function foreigns()
    {
        return $this->morphMany('Models\Activity', 'foreign');
    }
    public function reviews()
    {
        return $this->hasMany('Models\Review', 'foreign_id', 'id')->where('class', 'Bid');
    }
    public function activity()
    {
        return $this->belongsTo('Models\Bid', 'id', 'id')->select('id', 'project_id')->with('foreign_project');
    }
    public function scopeFilter($query, $params = array())
    {
        parent::scopeFilter($query, $params);
        if (!empty($params['bid_status_id'])) {
            $query->where('bid_status_id', '=', $params['bid_status_id']);
        }
        if (!empty($params['project_id'])) {
            $query->where('project_id', '=', $params['project_id']);
        }
        if (!empty($params['project_bid_id'])) {
            $query->where('project_bid_id', '=', $params['project_bid_id']);
        }
        if (!empty($params['is_freelancer_withdrawn']) && ($params['is_freelancer_withdrawn'] == 'true' || $params['is_freelancer_withdrawn'] == 't' || $params['is_freelancer_withdrawn'] == 1)) {
            $query->where('is_freelancer_withdrawn', 1);
        }
        if (!empty($params['is_freelancer_withdrawn']) && ($params['is_freelancer_withdrawn'] == 'false' || $params['is_freelancer_withdrawn'] == 'f' || $params['is_freelancer_withdrawn'] == '0')) {
            $query->where('is_freelancer_withdrawn', 0);
        }
        if (!empty($params['user_id'])) {
            $query->where('user_id', '=', $params['user_id']);
        }
        if (!empty($params['type'])) {
            if ($params['type'] == 'active') {
                $query->where('bid_status_id', '=', \Constants\BidStatus::Pending);
            } elseif ($params['type'] == 'current_work') {
                $project_status_id = array(
                    \Constants\ProjectStatus::WinnerSelected,
                    \Constants\ProjectStatus::UnderDevelopment,
                    \Constants\ProjectStatus::FinalReviewPending,
                    \Constants\ProjectStatus::Completed
                );
                $query->select('bids.*')->Join('projects', 'projects.id', '=', 'bids.project_id')->whereIn('projects.project_status_id', $project_status_id);
                $query->where('bids.bid_status_id', '=', \Constants\BidStatus::Won);
            } elseif ($params['type'] == 'past_projects') {
                $project_status_id = array(
                    \Constants\ProjectStatus::Closed,
                    \Constants\ProjectStatus::MutuallyCanceled,
                    \Constants\ProjectStatus::CanceledByAdmin
                );
                $query->select('bids.*')->Join('projects', 'projects.id', '=', 'bids.project_id')->whereIn('projects.project_status_id', $project_status_id);
                $query->where('bids.bid_status_id', '=', \Constants\BidStatus::Won);
            }
        }
    }
    protected static function boot()
    {
        parent::boot();
        global $authUser;
        self::creating(function ($bid) use ($authUser) {
            $project = Project::where('id', $bid->project_id)->select('user_id')->first();
            if (($authUser->role_id == \Constants\ConstUserTypes::Admin) || ($authUser->id != $project->user_id)) {
                return true;
            }
            return false;
        });
        self::created(function ($bid) {
            Bid::updateUserBidCount($bid->user_id);
            $bidAmount = Bid::where('project_id', $bid->project_id)->where('is_freelancer_withdrawn', 0)->selectRaw('sum(amount) as amount')->first()->toArray();
            $projectBid = ProjectBid::where('id', $bid->project_bid_id)->where('project_id', $bid->project_id)->first();
            $lowestBidamount = Bid::where('project_id', $bid->project_id)->where('is_freelancer_withdrawn', 0)->min('amount');
            $lowestBidamount = ($lowestBidamount) ? $lowestBidamount : '0';
            if ($projectBid) {
                $bidCount = $projectBid->bid_count + 1;
                $amount = $bidAmount['amount'];
                ProjectBid::where('id', $bid->project_bid_id)->update(array(
                    'total_bid_amount' => $amount,
                    'bid_count' => $bidCount,
                    'lowest_bid_amount' => $lowestBidamount
                ));
            }
        });
        self::updated(function ($bid) {
            $bidAmount = Bid::where('project_id', $bid->project_id)->where('is_freelancer_withdrawn', 0)->selectRaw('sum(amount) as amount')->first()->toArray();
            $totalBidCount = Bid::where('project_id', $bid->project_id)->where('is_freelancer_withdrawn', 0)->count();
            $lowestBidamount = Bid::where('project_id', $bid->project_id)->where('is_freelancer_withdrawn', 0)->min('amount');
            $lowestBidamount = ($lowestBidamount) ? $lowestBidamount : '0';
            $projectBid = ProjectBid::where('id', $bid->project_bid_id)->first();
            if ($projectBid) {
                $amount = $bidAmount['amount'];
                ProjectBid::where('id', $bid->project_bid_id)->update(array(
                    'total_bid_amount' => $amount,
                    'bid_count' => $totalBidCount,
                    'lowest_bid_amount' => $lowestBidamount
                ));
            }
        });
        self::deleted(function ($bid) {
            Bid::updateUserBidCount($bid->user_id);
            $bidAmount = Bid::where('project_id', $bid->project_id)->where('is_freelancer_withdrawn', 0)->selectRaw('sum(amount) as amount')->first()->toArray();
            $projectBid = ProjectBid::where('id', $bid->project_bid_id)->where('project_id', $bid->project_id)->first();
            $totalBidCount = Bid::where('project_id', $bid->project_id)->where('is_freelancer_withdrawn', 0)->count();
            $lowestBidamount = Bid::where('project_id', $bid->project_id)->where('is_freelancer_withdrawn', 0)->min('amount');
            $lowestBidamount = ($lowestBidamount) ? $lowestBidamount : '0';
            if ($projectBid) {
                $amount = $bidAmount['amount'];
                ProjectBid::where('id', $bid->project_bid_id)->update(array(
                    'total_bid_amount' => $amount,
                    'bid_count' => $totalBidCount,
                    'lowest_bid_amount' => $lowestBidamount
                ));
            }
        });
        self::saving(function ($bid) use ($authUser) {
            $project = Project::where('id', $bid->project_id)->select('user_id')->first();
            if (($authUser['role_id'] == \Constants\ConstUserTypes::Admin) || ($authUser['id'] == $bid->user_id) || ($authUser['id'] == $Project->user_id)) {
                return true;
            }
            return false;
        });
    }
    public function updateUserBidCount($user_id)
    {
        $bid_count = Bid::where('user_id', $user_id)->count();
        User::where('id', $user_id)->update(['bid_count' => $bid_count]);
    }
}
