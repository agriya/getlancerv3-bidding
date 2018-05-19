<?php
/**
 * JobApplyClick
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
 * JobApplyClick
*/
class JobApplyClick extends AppModel
{
    protected $table = 'job_apply_clicks';
    protected $fillable = array(
        'job_id'
    );
    public $rules = array(
        'name' => 'sometimes|required',
    );
    public function job()
    {
        return $this->belongsTo('Models\Job', 'job_id', 'id');
    }
    public function user()
    {
        return $this->belongsTo('Models\User', 'user_id', 'id');
    }
    public function ip()
    {
        return $this->belongsTo('Models\Ip', 'ip_id', 'id');
    }
    public function scopeFilter($query, $params = array())
    {
        parent::scopeFilter($query, $params);
        if (!empty($params['user_id'])) {
            $query->where('user_id', $params['user_id']);
        }
        if (!empty($params['job_id'])) {
            $query->where('job_id', $params['job_id']);
        }
    }
    protected static function boot()
    {
        $authUser = array();
        global $authUser;
        parent::boot();
        self::creating(function ($data) use ($authUser) {
            if (!empty(Job::where('id', $data->job_id)->where('apply_via', 'via_company')->where('job_status_id', \Constants\JobStatus::Open)->count())) {
                return true;
            } else {
                return false;
            }
        });
        self::created(function ($JobApplyClick) {
            Job::where('id', $JobApplyClick->job_id)->increment('job_apply_click_count');
        });
        self::deleted(function ($JobApplyClick) {
            Job::where('id', $JobApplyClick->job_id)->decrement('job_apply_click_count');
        });
    }
}
