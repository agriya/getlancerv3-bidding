<?php
/**
 * JobApply
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
 * JobApply
*/
class JobApply extends AppModel
{
    protected $table = 'job_applies';
    protected $fillable = array(
        'job_id',
        'cover_letter',
        'job_apply_status_id'
    );
    public $rules = array(
        'job_id' => 'sometimes|required',
        'job_apply_status_id' => 'sometimes|required',
        'cover_letter' => 'sometimes|required',
        'file' => 'sometimes|required',
    );
    public function job()
    {
        return $this->belongsTo('Models\Job', 'job_id', 'id')->with('city', 'state', 'country', 'attachment');
    }
    public function foreign_job()
    {
        return $this->belongsTo('Models\Job', 'job_id', 'id')->select('id', 'title', 'slug', 'address');
    }
    public function user()
    {
        return $this->belongsTo('Models\User', 'user_id', 'id')->with('attachment');
    }
    public function job_apply_status()
    {
        return $this->belongsTo('Models\JobApplyStatus', 'job_apply_status_id', 'id');
    }
    public function hire_request()
    {
        return $this->belongsTo('Models\HireRequest', 'hire_request_id', 'id');
    }
    public function ip()
    {
        return $this->belongsTo('Models\Ip', 'ip_id', 'id');
    }
    public function attachment()
    {
        return $this->hasOne('Models\Attachment', 'foreign_id', 'id')->where('class', 'JobApply');
    }
    public function foreigns()
    {
        return $this->morphMany('Models\Activity', 'foreign');
    }
    public function foreign_user()
    {
        return $this->belongsTo('Models\User', 'user_id', 'id')->select('id', 'username')->with('foreign_attachment');
    }
    public function activity()
    {
        return $this->belongsTo('Models\JobApply', 'id', 'id')->select('id', 'job_id', 'user_id')->with('foreign_job', 'foreign_user');
    }
    public function scopeFilter($query, $params = array())
    {
        parent::scopeFilter($query, $params);
        if (!empty($params['q'])) {
            $query->where(function ($q1) use ($params) {
                $search = $params['q'];
                $q1->orWhereHas('job', function ($q) use ($search) {
                    $q->where('title', 'ilike', "%$search%");
                });
                $q1->orWhereHas('user', function ($q) use ($search) {
                    $q->where('users.username', 'ilike', "%$search%");
                });
                $q1->orWhere('job_applies.cover_letter', 'ilike', "%$search%");
            });
        }
        if (!empty($params['job_apply_status_id'])) {
            $query->where('job_apply_status_id', $params['job_apply_status_id']);
        }
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
        self::updating(function ($data) use ($authUser) {
            $jobs = Job::where('id', $data->job_id)->select('user_id')->first();
            if (($authUser['role_id'] == \Constants\ConstUserTypes::Admin) || ($authUser['id'] == $jobs->user_id)) {
                return true;
            }
            return false;
        });
        self::created(function ($jobApply) {
            User::where('id', $jobApply->user_id)->increment('job_apply_count');
            Job::where('id', $jobApply->job_id)->increment('job_apply_count');
        });
        self::deleted(function ($jobApply) {
            User::where('id', $jobApply->user_id)->decrement('job_apply_count');
            Job::where('id', $jobApply->job_id)->decrement('job_apply_count');
        });
    }
}
