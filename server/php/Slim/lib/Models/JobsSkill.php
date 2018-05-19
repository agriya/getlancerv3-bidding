<?php
/**
 * JobsSkill
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
 * JobsSkill
*/
class JobsSkill extends AppModel
{
    protected $table = 'jobs_skills';
    public $rules = array(
        'job_id' => 'sometimes|required',
        'skill_id' => 'sometimes|required',
    );
    public function job()
    {
        return $this->belongsTo('Models\Job', 'job_id', 'id');
    }
    public function skill()
    {
        return $this->belongsTo('Models\Skill', 'skill_id', 'id');
    }
    protected static function boot()
    {
        parent::boot();
        self::created(function ($data) {
            $jobsSkill = JobsSkill::where('skill_id', $data->skill_id);
            $jobs_skill_count = $jobsSkill->count();
            $jobsSkill->join('jobs', 'jobs_skills.job_id', '=', 'jobs.id')->where('job_status_id', \Constants\JobStatus::Open);
            $jobs_skill_open_count = $jobsSkill->count();
            Skill::where('id', $data->skill_id)->update(['job_count' => $jobs_skill_count, 'active_job_count' => $jobs_skill_open_count]);
        });
        self::deleted(function ($data) {
            $jobsSkill = JobsSkill::where('skill_id', $data->skill_id);
            $jobs_skill_count = $jobsSkill->count();
            $jobsSkill->join('jobs', 'jobs_skills.job_id', '=', 'jobs.id')->where('job_status_id', \Constants\JobStatus::Open);
            $jobs_skill_open_count = $jobsSkill->count();
            Skill::where('id', $data->skill_id)->update(['job_count' => $jobs_skill_count, 'active_job_count' => $jobs_skill_open_count]);
        });
    }
}
