<?php
/**
 * Activity
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
namespace Models;

use Illuminate\Database\Eloquent\Relations\Relation;

/*
 * Activity
*/
class Activity extends AppModel
{
    protected $table = 'activities';
    public $rules = array(
        'isViewed' => 'sometimes|required',
    );
    public function user()
    {
        return $this->belongsTo('Models\User', 'user_id', 'id')->select('id', 'username')->with('foreign_attachment');
    }
    public function other_user()
    {
        return $this->belongsTo('Models\User', 'other_user_id', 'id')->select('id', 'username')->with('foreign_attachment');
    }
    public function foreign()
    {
        return $this->morphTo(null, 'class', 'foreign_id')->with('activity');
    }
    public function foreign_model()
    {
        return $this->morphTo(null, 'model_class', 'model_id');
    }
    protected static function boot()
    { 
        Relation::morphMap(['ContestUser' => ContestUser::class , 'Contest' => Contest::class , 'Job' => Job::class , 'Message' => Message::class , 'Portfolio' => Portfolio::class , 'QuoteBid' => QuoteBid::class , 'Milestone' => Milestone::class , 'ProjectBidInvoice' => ProjectBidInvoice::class , 'JobApply' => JobApply::class , 'Bid' => Bid::class , 'Project' => Project::class , 'QuoteRequest' => QuoteRequest::class , 'User' => User::class , 'Attachment' => Attachment::class, 'Review' => Review::class, 'ProjectDispute' => ProjectDispute::class, 'HireRequest' => HireRequest::class, 'UserCashWithdrawal' => UserCashWithdrawal::class]);
    }
    public function scopeFilter($query, $params = array())
    {
        parent::scopeFilter($query, $params);
        if (!empty($params['class'])) {
            $query->where('class', $params['class']);
        }
        if (!empty($params['foreign_id'])) {
            $query->where('foreign_id', $params['foreign_id']);
        }
        if (!empty($params['model_id'])) {
            $query->where('model_id', $params['model_id']);
        }
        if (!empty($params['user_id'])) {
            $query->where('user_id', $params['user_id']);
        }
        if (!empty($params['other_user_id'])) {
            $query->where('other_user_id', $params['other_user_id']);
        }
        if (!empty($params['activity_type'])) {
            $activity_types = explode(',', $params['activity_type']);
            $query->whereIn('activity_type', $activity_types);
        }
        if (!empty($params['activity_type_not_in'])) {
            $activity_type_not_in = explode(',', $params['activity_type_not_in']);
            $query->whereNotIn('activity_type', $activity_type_not_in);
        }
        if (!empty($params['model_class'])) {
            $query->where('model_class', $params['model_class']);
        }
    }
}
