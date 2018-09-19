<?php
/**
 * Job
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
 * Job
*/
class Job extends AppModel
{
    protected $table = 'jobs';
    protected $fillable = array(
        'job_status_id',
        'job_type_id',
        'job_category_id',
        'title',
        'description',
        'address',
        'address1',
        'city',
        'state',
        'country',
        'zip_code',
        'latitude',
        'longitude',
        'salary_from',
        'salary_to',
        'salary_type_id',
        'is_show_salary',
        'last_date_to_apply',
        'no_of_opening',
        'company_name',
        'company_website',
        'apply_via',
        'job_url',
        'is_featured',
        'is_urgent',
        'full_address',
        'minimum_experience',
        'maximum_experience'
    );
    public $hidden = array(
        'zazpay_revised_amount',
        'payment_gateway_id',
        'zazpay_payment_id',
        'zazpay_pay_key',
        'zazpay_gateway_id'
    );
    public $rules = array(
        'job_category_id' => 'sometimes|required',
        'title' => 'sometimes|required',
        'description' => 'sometimes|required',
        'no_of_opening' => 'sometimes|required',
        'company_name' => 'sometimes|required',
        'job_url' => 'sometimes|required|regex:/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/',
        'company_website' => 'sometimes|regex:/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/',
        'last_date_to_apply' => 'sometimes|required|date',
        'minimum_experience' => 'integer',
        'maximum_experience' => 'integer'
    );
    public function user()
    {
        return $this->belongsTo('Models\User', 'user_id', 'id')->select('id', 'username', 'total_rating_as_employer', 'review_count_as_employer', 'total_rating_as_freelancer', 'review_count_as_freelancer', 'is_made_deposite', 'job_count', 'project_count', 'first_name', 'last_name', 'contest_count', 'is_made_deposite')->with('attachment');
    }
    public function job_status()
    {
        return $this->belongsTo('Models\JobStatus', 'job_status_id', 'id');
    }
    public function job_type()
    {
        return $this->belongsTo('Models\JobType', 'job_type_id', 'id');
    }
    public function job_category()
    {
        return $this->belongsTo('Models\JobCategory', 'job_category_id', 'id');
    }
    public function city()
    {
        return $this->belongsTo('Models\City', 'city_id', 'id')->select('id', 'name');
    }
    public function state()
    {
        return $this->belongsTo('Models\State', 'state_id', 'id')->select('id', 'name');
    }
    public function country()
    {
        return $this->belongsTo('Models\Country', 'country_id', 'id')->select('id', 'name', 'iso_alpha2');
    }
    public function salary_type()
    {
        return $this->belongsTo('Models\SalaryType', 'salary_type_id', 'id');
    }
    public function company()
    {
        return $this->belongsTo('Models\Company', 'company_id', 'id');
    }
    public function ip()
    {
        return $this->belongsTo('Models\Ip', 'ip_id', 'id');
    }
    public function foreign_views()
    {
        return $this->morphMany('Models\View', 'foreign_view');
    }
    public function foreign_flags()
    {
        return $this->morphMany('Models\Flag', 'foreign_flag');
    }
    public function foreign_transactions()
    {
        return $this->morphMany('Models\Transaction', 'foreign_transaction');
    }
    public function payment_gateway()
    {
        return $this->belongsTo('Models\PaymentGateway', 'payment_gateway_id', 'id');
    }
    public function zazpay_gateway()
    {
        return $this->belongsTo('Models\ZazpayGateway', 'zazpay_gateway_id', 'id');
    }
    public function zazpay_payment()
    {
        return $this->belongsTo('Models\ZazpayPayment', 'zazpay_payment_id', 'id');
    }
    public function job_skill()
    {
        return $this->hasMany('Models\JobsSkill', 'job_id', 'id')->with('skill');
    }
    public function job_favorite()
    {
        return $this->hasMany('Models\JobFavorite', 'job_id', 'id');
    }
    public function foreigns()
    {
        return $this->morphMany('Models\Flag', 'foreign');
    }
    public function attachment()
    {
        return $this->hasOne('Models\Attachment', 'foreign_id', 'id')->where('class', 'Job');
    }
    public function foreign_models()
    {
        return $this->morphMany('Models\Activity', 'foreign_model');
    }
    public function activity()
    {
        return $this->belongsTo('Models\Job', 'id', 'id')->select('id', 'salary_type_id', 'job_type_id', 'user_id')->with('job_type', 'salary_type', 'foreign_user');
    }
    public function foreign_user()
    {
        return $this->belongsTo('Models\User', 'user_id', 'id')->select('id', 'username')->with('foreign_attachment');
    }
    public function job_apply()
    {
        $user_id = 0;
        global $authUser;
        if (!empty($authUser)) {
            $user_id = $authUser['id'];
        }
        return $this->hasMany('Models\JobApply', 'job_id', 'id')->where('user_id', $user_id)->with('job_apply_status');
    }
    public function flag()
    {
        $user_id = 0;
        global $authUser;
        if (!empty($authUser)) {
            $user_id = $authUser['id'];
        }
        return $this->hasMany('Models\Flag', 'foreign_id', 'id')->where('user_id', $user_id)->where('class', 'Job');
    }
    protected static function boot()
    {
        $authUser = array();
        global $authUser;
        parent::boot();
        self::creating(function ($job) use ($authUser) {
            if (($job->job_status_id == \Constants\JobStatus::Open) && ($authUser['role_id'] != \Constants\ConstUserTypes::Admin) && ($job->total_listing_fee > 0)) {
                $job->job_status_id = \Constants\JobStatus::PaymentPending;
            } elseif (!empty(IS_NEED_ADMIN_APPROVAL_FOR_NEW_JOBS) && (IS_NEED_ADMIN_APPROVAL_FOR_NEW_JOBS == 1) && ($job->job_status_id == \Constants\JobStatus::Open) && ($authUser['role_id'] != \Constants\ConstUserTypes::Admin)) {
                $job->job_status_id = \Constants\JobStatus::PendingApproval;
            }
        });
        self::created(function ($data) use ($authUser) {
            /** Job category count updation**/
            Job::jobCategoryCountUpdation($data->id);
        });
        self::deleting(function ($data) use ($authUser) {
            if (($authUser['role_id'] == \Constants\ConstUserTypes::Admin) || ($authUser['id'] == $data->user_id)) {
                return true;
            }
            return false;
        });
        self::deleted(function ($data) use ($authUser) {
            /** Job category count updation**/
            Job::jobCategoryCountUpdation('', $data->job_category_id, $data->user_id);
        });
        self::saving(function ($data) use ($authUser) {
            if (($authUser['role_id'] == \Constants\ConstUserTypes::Admin) || ($authUser['id'] == $data->user_id)) {
                return true;
            }
            return false;
        });
    }
    public function scopeFilter($query, $params = array())
    {
        $authUser = array();
        global $authUser;
        parent::scopeFilter($query, $params);
        if (!empty($params['skills'])) {
            $skill_id = explode(',', $params['skills']);
            $job_id = array();
            $job_skills = JobsSkill::select('job_id')->distinct()->whereIn('skill_id', $skill_id)->get()->toArray();
            foreach ($job_skills as $job_skill) {
                $job_id[] = $job_skill['job_id'];
            }
            $query->whereIn('id', $job_id);
        }
        if (!empty($params['job_categories'])) {
            $job_categories_id = explode(',', $params['job_categories']);
            $query->whereIn('job_category_id', $job_categories_id);
        }
        if (!empty($params['job_types'])) {
            $job_types_id = explode(',', $params['job_types']);
            $query->whereIn('job_type_id', $job_types_id);
        }
        if (!empty($params['user_id'])) {
            $query->where('user_id', $params['user_id']);
        }
        if (!empty($params['is_urgent'])) {
            $query->where('is_urgent', $params['is_urgent']);
        }
        if (!empty($params['is_featured'])) {
            $query->where('is_featured', $params['is_featured']);
        }
        if (!empty($params['q'])) {
            $query->where(function ($q1) use ($params) {
                $search = $params['q'];
                $q1->orWhereHas('user', function ($q) use ($search) {
                    $q->where('users.username', 'ilike', "%$search%");
                });
                $q1->orWhereHas('job_category', function ($q) use ($search) {
                    $q->where('job_categories.name', 'ilike', "%$search%");
                });
                $q1->orwhere('jobs.title', 'ilike', "%$search%");
                $q1->orwhere('jobs.company_name', 'ilike', "%$search%");
            });
        }
        if (!empty($params['job_status_id'])) {
            $job_status_id = explode(',', $params['job_status_id']);
            $query->whereIn('job_status_id', $job_status_id);
        }
    }
    /**
     * Job Category Table count
     *
     * @params string $jobId
     *
     * @return Jobs
     */
    public function jobCategoryCountUpdation($jobId = '', $jobCategoryId = '', $userId = '')
    {
        if (!empty($jobId)) {
            $job = Job::find($jobId);
            if (!empty($job)) {
                $jobCategoryId = $job->job_category_id;
                $userId = $job->user_id;
            }
        }
        if (!empty($jobCategoryId)) {
            $count = Job::where('job_category_id', $jobCategoryId);
            $job_count = $count->count();
            $active_job_count = $count->where('job_status_id', \Constants\JobStatus::Open)->count();
            $jobCategory = JobCategory::find($jobCategoryId);
            $jobCategory->job_count = $job_count;
            $jobCategory->active_job_count = $active_job_count;
            $jobCategory->update();
        }
        /**User table update count ***/
        if (!empty($userId)) {
            $userCount = Job::where('user_id', $userId)->count();
            $user = User::find($userId);
            $user->job_count = $userCount;
            $user->update();
            return $user;
        }
    }
    public function processCaptured($payment_response, $id)
    {
        global $_server_domain_url;
        $job = Job::whereIn('job_status_id', [\Constants\JobStatus::PaymentPending, \Constants\JobStatus::Draft])->find($id);
        if (!empty($job)) {
            $job->makeVisible(array(
                'payment_gateway_id'
            ));
            if (IS_NEED_ADMIN_APPROVAL_FOR_NEW_JOBS) {
                $job->job_status_id = \Constants\JobStatus::PendingApproval;
            } else {
                $job->job_open_date = date('Y-m-d h:i:s');                
                $job->job_status_id = \Constants\JobStatus::Open;
                $employerDetails = getUserHiddenFields($job->user_id);
                $emailFindReplace = array(
                    '##USERNAME##' => ucfirst($employerDetails->username) ,
                    '##JOB_NAME##' => ucfirst($job->title),
                    '##JOB_URL##' => $_server_domain_url . '/jobs/' . $job->id . '/' . $job->title 
                );
                sendMail('Job Published Notification', $emailFindReplace, $employerDetails->email);                
            }
            if (!empty($payment_response['paykey'])) {
                $job->paypal_pay_key = $payment_response['paykey'];
            }
            $job->is_paid = 1;
            $job->zazpay_pay_key = $payment_response['paykey'];
            $job->update();
            $adminId = User::select('id')->where('role_id', \Constants\ConstUserTypes::Admin)->first();
            insertTransaction($job->user_id, $adminId->id, $job->id, 'Job', \Constants\TransactionType::JobListingFee, $job->payment_gateway_id, $job->total_listing_fee, 0, 0, 0, 0, $job->id, $job->zazpay_gateway_id);
            $user = User::find($job->user_id);
            $user->makeVisible(['total_site_revenue_as_employer', 'total_spend_amount_as_employer']);
            $user->total_site_revenue_as_employer = $user->total_site_revenue_as_employer + $job->total_listing_fee;
            $user->total_spend_amount_as_employer = $user->total_spend_amount_as_employer + $job->total_listing_fee;
            $user->is_made_deposite = 1;
            $user->update();
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
        $job = Job::whereIn('job_status_id', [\Constants\JobStatus::PaymentPending, \Constants\JobStatus::Draft])->where('user_id', $authUser->id)->find($args['foreign_id']);
        $result = array();
        // Job payment process
        if (!empty($job)) {
            $job->payment_gateway_id = $args['payment_gateway_id'];
            $job->update();
            $job = $job->toArray();
            if ($job['total_listing_fee'] > 0) {
                $args['name'] = $args['description'] = "Listing fee for " . $job['title'] . " in " . SITE_NAME;
                $args['amount'] = $job['total_listing_fee'];
                $args['id'] = $job['id'];
                $args['notify_url'] = $_server_domain_url . '/ipn/process_ipn/Job/' . $job['id'] . '/' . md5(SECURITY_SALT . $job['id'] . SITE_NAME);
                $args['success_url'] = $_server_domain_url . '/jobs/view/' . $job['id'] . '/' . $job['slug'] . '?error_code=0';
                $args['cancel_url'] = $_server_domain_url . '/jobs/order/' . $job['id'] . '/tests?error_code=512';
                $result = Payment::processPayment($job['id'], $args, 'Job');
            } else {
                if (IS_NEED_ADMIN_APPROVAL_FOR_NEW_JOBS) {
                    $job_status_id = \Constants\JobStatus::PendingApproval;
                    $job_open_date = null;
                } else {
                    $job_status_id = \Constants\JobStatus::Open;
                    $job_open_date = date('Y-m-d h:i:s');                    
                }
                $job->is_paid = 1;
                Job::where('id', $job['id'])->update(['job_status_id' => $job_status_id, 'is_paid' => 1, 'job_open_date' => $job_open_date]);
                $result = $job;
            }
        }
        return $result;
    }
}
