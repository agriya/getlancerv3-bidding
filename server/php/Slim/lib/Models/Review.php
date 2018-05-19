<?php
/**
 * Review
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

use Illuminate\Database\Eloquent\Relations\Relation;

/*
 * Review
*/
class Review extends AppModel
{
    protected $table = 'reviews';
    protected $fillable = array(
        'foreign_id',
        'class',
        'rating',
        'message'
    );
    public $rules = array(
        'rating' => 'sometimes|required'
    );
    public function user()
    {
        return $this->belongsTo('Models\User', 'user_id', 'id')->with('attachment');
    }
    public function ip()
    {
        return $this->belongsTo('Models\Ip', 'ip_id', 'id');
    }
    public function other_user()
    {
        return $this->belongsTo('Models\User', 'to_user_id', 'id')->with('attachment');
    }
    public function foreign_review()
    {
        return $this->morphTo(null, 'class', 'foreign_id');
    }
    public function quote_bid()
    {
        return $this->belongsTo('Models\QuoteBid', 'foreign_id', 'id')->with('quote_request');
    }
    public function bid()
    {
        return $this->belongsTo('Models\Bid', 'foreign_id', 'id')->with('project');
    }
    public function attachment()
    {
        return $this->hasMany('Models\Attachment', 'foreign_id', 'foreign_id')->where('class', 'ContestUser');
    }
    public function foreign_review_model()
    {
        return $this->morphTo(null, 'model_class', 'model_id');
    }
    public function foreigns()
    {
        return $this->morphMany('Models\Activity', 'foreign');
    }
     public function activity()
    {
        return $this->belongsTo('Models\Review', 'id', 'id')->with('foreign_review_model');
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
        if (!empty($params['to_user_id'])) {
            $query->where('to_user_id', $params['to_user_id']);
        }
        if (!empty($params['is_freelancer']) && $params['is_freelancer'] == '1') {
            $query->where('is_freelancer', 1);
        }
        if (isset($params['is_freelancer']) && $params['is_freelancer'] == '0') {
            $query->where('is_freelancer', 0);
        }
        if (!empty($params['model_class'])) {
            $query->where('model_class', $params['model_class']);
        }
    }
    protected static function boot()
    {
        Relation::morphMap(['ContestUser' => ContestUser::class , 'QuoteService' => QuoteService::class , 'QuoteBid' => QuoteBid::class , 'Contest' => Contest::class , 'Project' => Project::class , 'Bid' => Bid::class , ]);
    }
}
