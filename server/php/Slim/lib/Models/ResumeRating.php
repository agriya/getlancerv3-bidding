<?php
/**
 * ResumeRating
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
 * ResumeRating
*/
class ResumeRating extends AppModel
{
    protected $table = 'resume_ratings';
    protected $fillable = array(
        'job_id',
        'job_apply_id',
        'rating',
        'comment'
    );
    public $rules = array(
        'job_id' => 'sometimes|required',
        'job_apply_id' => 'sometimes|required',
        'rating' => 'sometimes|required',
        'comment' => 'sometimes|required',
    );
    public function user()
    {
        return $this->belongsTo('Models\User', 'user_id', 'id')->with('attachment');
    }
    public function job()
    {
        return $this->belongsTo('Models\Job', 'job_id', 'id');
    }
    public function job_apply()
    {
        return $this->belongsTo('Models\JobApply', 'job_apply_id', 'id');
    }
    protected static function boot()
    {
        global $authUser;
        parent::boot();
        self::creating(function ($data) use ($authUser) {
            return ResumeRating::resumeRatingPermission($data, $authUser);
        });
        self::created(function ($data) use ($authUser) {
            ResumeRating::updateResumeRatingCount($data->job_apply_id);
        });
        self::deleting(function ($data) use ($authUser) {
            return ResumeRating::resumeRatingPermission($data, $authUser);
        });
        self::deleted(function ($data) use ($authUser) {
            ResumeRating::updateResumeRatingCount($data->job_apply_id);
        });
        self::updating(function ($data) use ($authUser) {
            if (ResumeRating::resumeRatingPermission($data, $authUser)) {
                ResumeRating::updateResumeRatingCount($data->job_apply_id);
            } else {
                return false;
            }
        });
        self::saving(function ($data) use ($authUser) {
            if (ResumeRating::resumeRatingPermission($data, $authUser)) {
                ResumeRating::updateResumeRatingCount($data->job_apply_id);
            } else {
                return false;
            }
        });
    }
    public function resumeRatingPermission($data, $authUser)
    {
        $jobs = Job::where('id', $data->job_id)->select('user_id')->first();
        $jobApply = JobApply::where('id', $data->job_apply_id)->select('user_id')->first();
        if (($authUser['role_id'] == \Constants\ConstUserTypes::Admin) || ($authUser['id'] == $jobs->user_id) || ($authUser['id'] == $jobApply->user_id)) {
            return true;
        }
        return false;
    }
    public function updateResumeRatingCount($job_apply_id)
    {
        $resumeRating = ResumeRating::where('job_apply_id', $job_apply_id);
        $resume_rating_count = $resumeRating->count();
        $total_resume_rating = $resumeRating->sum('rating');
        JobApply::where('id', $job_apply_id)->update(['total_resume_rating' => $total_resume_rating, 'resume_rating_count' => $resume_rating_count]);
    }
    public function scopeFilter($query, $params = array())
    {
        parent::scopeFilter($query, $params);
        if (!empty($params['job_apply_id'])) {
            $query->where('job_apply_id', $params['job_apply_id']);
        }
        if (!empty($params['job_id'])) {
            $query->where('job_id', $params['job_id']);
        }
        if (!empty($params['q'])) {
            $query->where(function ($q1) use ($params) {
                $search = $params['q'];
                $q1->orWhereHas('user', function ($q) use ($search) {
                    $q->where('users.username', 'ilike', "%$search%");
                });
                $q1->orWhereHas('job', function ($q) use ($search) {
                    $q->where('jobs.title', 'ilike', "%$search%");
                });
                $q1->orwhere('comment', 'ilike', "%$search%");
            });
        }
    }
}
