<?php
/**
 * Project
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
 * Project
*/
class Project extends AppModel
{
    protected $table = 'projects';
    protected $fillable = array(
        'name',
        'description',
        'project_status_id',
        'project_range_id',
        'project_type_id',
        'bid_duration',
        'is_featured',
        'is_urgent',
        'is_private',
        'is_hidded_bid',
        'is_active'
    );
    public $rules = array(
        'user_id' => 'sometimes|required',
        'project_range_id' => 'sometimes|required',
        'name' => 'sometimes|required',
        'description' => 'sometimes|required',
        'bid_duration' => 'sometimes|required',
        'is_featured' => 'sometimes|required|boolean',
        'is_private' => 'sometimes|required|boolean',
        'is_hidded_bid' => 'sometimes|required|boolean',
        'is_pre_paid' => 'sometimes|required|boolean',
        'is_urgent' => 'sometimes|required|boolean',
        'is_active' => 'sometimes|required|boolean',
        'is_dispute' => 'sometimes|required|boolean',
        'is_cancel_request_freelancer' => 'sometimes|required|boolean',
        'is_cancel_request_employer' => 'sometimes|required|boolean',
        'commision_amount_paid' => 'sometimes|required',
        'listing_fee' => 'sometimes|required',
        'is_paid' => 'sometimes|required|boolean',
        'is_reopened' => 'sometimes|required|boolean',
        'is_notification_sent' => 'sometimes|required|boolean',
    );
    public $hidden = array(
        'zazpay_gateway_id',
        'zazpay_payment_id',
        'zazpay_pay_key',
        'zazpay_revised_amount'
    );
    public function user()
    {
        return $this->belongsTo('Models\User', 'user_id', 'id')->with('attachment', 'follower', 'country', 'state', 'city');
    }
    public function freelancer()
    {
        return $this->belongsTo('Models\User', 'freelancer_user_id', 'id')->with('attachment', 'follower', 'country', 'state', 'city');
    }
    public function foreign_freelancer()
    {
        return $this->belongsTo('Models\User', 'freelancer_user_id', 'id')->select('id', 'username')->with('foreign_attachment');
    }
    public function created_user()
    {
        return $this->belongsTo('Models\User', 'created_user_id', 'id');
    }
    public function project_status()
    {
        return $this->belongsTo('Models\ProjectStatus', 'project_status_id', 'id');
    }
    public function project_range()
    {
        return $this->belongsTo('Models\ProjectRange', 'project_range_id', 'id');
    }
    public function ip()
    {
        return $this->belongsTo('Models\Ip', 'ip_id', 'id');
    }
    public function skills_projects()
    {
        return $this->hasMany('Models\SkillsProjects', 'project_id', 'id')->with('skills');
    }
    public function projects_project_categories()
    {
        return $this->hasMany('Models\ProjectsProjectCategory', 'project_id', 'id')->with('project_categories');
    }
    public function salary_type()
    {
        return $this->belongsTo('Models\SalaryType', 'salary_type_id', 'id');
    }
    public function zazpay_gateway()
    {
        return $this->belongsTo('Models\ZazpayGateway', 'zazpay_gateway_id', 'id');
    }
    public function zazpay_payment()
    {
        return $this->belongsTo('Models\ZazpayPayment', 'zazpay_payment_id', 'id');
    }
    public function project_bid()
    {
        return $this->belongsTo('Models\ProjectBid', 'id', 'project_id')->where('is_active', true)->with('user', 'bid');
    }
    public function bid()
    {
        return $this->hasMany('Models\Bid', 'project_id', 'id');
    }
    public function owner_bid()
    {
        $user_id = 0;
        global $authUser;
        if (!empty($authUser)) {
            $user_id = $authUser['id'];
        }
        return $this->belongsTo('Models\Bid', 'id', 'project_id')->where('user_id', $user_id);
    }
    public function bid_winner()
    {
        return $this->belongsTo('Models\Bid', 'id', 'project_id')->where('bid_status_id', \Constants\BidStatus::Won)->with('user');
    }
    public function milestones()
    {
        return $this->hasMany('Models\Milestone', 'project_id', 'id');
    }
    public function project_dispute()
    {
        return $this->belongsTo('Models\ProjectDispute', 'id', 'project_id')->with('dispute_open_type', 'dispute_status', 'dispute_closed_type');
    }
    public function reviews()
    {
        return $this->hasMany('Models\Review', 'model_id', 'id')->where('class', 'Bid')->with('user', 'other_user');
    }
    public function foreign_transactions()
    {
        return $this->morphMany('Models\Transaction', 'foreign_transaction');
    }
    public function foreign_reviews()
    {
        return $this->morphMany('Models\Review', 'foreign_review');
    }
    public function bid_reviews()
    {
        global $authUser;
        return $this->hasMany('Models\Review', 'model_id', 'id')->where('class', 'Bid')->where('user_id', $authUser->id);
    }
    public function other_user_reviews()
    {
        global $authUser;
        return $this->hasMany('Models\Review', 'model_id', 'id')->where('class', 'Bid')->where('to_user_id', $authUser->id);
    }
    public function follower()
    {
        $user_id = 0;
        global $authUser;
        if (!empty($authUser)) {
            $user_id = $authUser['id'];
        }
        return $this->hasMany('Models\Follower', 'foreign_id', 'id')->where('user_id', $user_id)->where('class', 'Project');
    }
    public function flag()
    {
        $user_id = 0;
        global $authUser;
        if (!empty($authUser)) {
            $user_id = $authUser['id'];
        }
        return $this->hasMany('Models\Flag', 'foreign_id', 'id')->where('user_id', $user_id)->where('class', 'Project');
    }
    public function foreign_models()
    {
        return $this->morphMany('Models\Activity', 'foreign_model');
    }
    public function foreigns()
    {
        return $this->morphMany('Models\Activity', 'foreign');
    }
    public function activity()
    {
        return $this->belongsTo('Models\Project', 'id', 'id')->select('id', 'user_id', 'freelancer_user_id', 'project_range_id')->with('foreign_user', 'foreign_freelancer', 'project_range', 'skills_projects');
    }
    public function foreign_user()
    {
        return $this->belongsTo('Models\User', 'user_id', 'id')->select('id', 'username')->with('foreign_attachment');
    }
    public function invoice()
    {
        return $this->hasMany('Models\ProjectBidInvoice', 'project_id', 'id');
    }
    public function foreign_views()
    {
        return $this->morphMany('Models\View', 'foreign_view');
    }
    public function foreign_followers()
    {
        return $this->morphMany('Models\Follower', 'foreign_follower');
    }
    public function foreign_flags()
    {
        return $this->morphMany('Models\Flag', 'foreign_flag');
    }
    public function foreign_review_models()
    {
        return $this->morphMany('Models\Review', 'foreign_model');
    }
    public function processCaptured($payment_response, $id)
    {
        global $_server_domain_url;
        $project = Project::where('id', $id)->where('is_paid', false)->first();
        if (!empty($project)) {
            if (!empty(PROJECT_IS_AUTO_APPROVE)) {               
                $project->project_status_id = \Constants\ProjectStatus::OpenForBidding;
                $getuserName = getUserHiddenFields($project->user_id);
                $projectpushedNotification = array(
                            '##USERNAME##' => $getuserName->username,
                            '##PROJECT_NAME##' => $project->name,
                            '##PROJECT_URL##' => $_server_domain_url . '/projects/view/' . $project->id.'/'.$project->slug);
                sendMail('Project Published Notification', $projectpushedNotification, $getuserName->email);


            } else {
                $project->project_status_id = \Constants\ProjectStatus::PendingForApproval;                
            }
            if (!empty($payment_response['paykey'])) {
                $wallet->paypal_pay_key = $payment_response['paykey'];
            }
             $dispatcher = Project::getEventDispatcher();
             Project::unsetEventDispatcher();
            $project->is_paid = true;
            $project->zazpay_pay_key = $payment_response['paykey'];
            $project->update();
            $adminId = User::select('id')->where('role_id', \Constants\ConstUserTypes::Admin)->first();
            insertTransaction($project->user_id, $adminId->id, $project->id, 'Project', \Constants\TransactionType::ProjectListingFee, $project->payment_gateway_id, $project->total_listing_fee, 0, 0, 0, 0, $project->id, $project->zazpay_gateway_id);
            $user = User::find($project->user_id);
            $user->makeVisible(['total_site_revenue_as_employer', 'total_spend_amount_as_employer']);
            $user->total_site_revenue_as_employer = $user->total_site_revenue_as_employer + $project->total_listing_fee;
            $user->total_spend_amount_as_employer = $user->total_spend_amount_as_employer + $project->total_listing_fee;
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
    protected static function boot()
    {
        global $authUser;
        parent::boot();
        self::deleting(function ($project) use ($authUser) {
            $allowed_status = array(
                \Constants\ProjectStatus::Draft,
                \Constants\ProjectStatus::PaymentPending,
                \Constants\ProjectStatus::PendingForApproval
            );
            if (!empty($authUser) && ($authUser['role_id'] == \Constants\ConstUserTypes::Admin || ($authUser['id'] == $project->user_id && in_array($project->project_status_id, $allowed_status)))) {
                SkillsProjects::where('project_id', $project->id)->get()->each(function ($skillsProjects) {
                    $skillsProjects->delete();
                });
                ProjectsProjectCategory::where('project_id', $project->id)->get()->each(function ($projectsProjectCategory) {
                    $projectsProjectCategory->delete();
                });
                Milestone::where('project_id', $project->id)->get()->each(function ($milestones) {
                    $milestones->delete();
                });
                ProjectBid::where('project_id', $project->id)->get()->each(function ($projectBid) {
                    $projectBid->delete();
                });
                return true;
            }
            return false;
        });
        self::deleted(function ($project) {
            Project::ProjectRangeCountUpdation($project->project_range_id);
            Project::ProjectStatusCountUpdation($project->project_status_id);
        });
        self::saved(function ($project) {
            Project::ProjectRangeCountUpdation($project->project_range_id);
            Project::ProjectStatusCountUpdation($project->project_status_id);
            ProjectsProjectCategory::where('project_id', $project->id)->each(function ($projectsProjectCategory) {
                ProjectsProjectCategory::projectCategoryCountUpdation($projectsProjectCategory->project_category_id);
            });
            /* Send Mail to User follower*/
            if ($project->project_status_id == \Constants\ProjectStatus::OpenForBidding) {
                global $_server_domain_url;
                $projectOwnerDetails = getUserHiddenFields($project->user_id);
                $followers = Follower::where('class', 'User')->where('foreign_id', $project->user_id)->select('user_id')->get();
                foreach ($followers as $follower) {
                    $userDetails = User::select('email', 'username')->where('id', $follower->user_id)->first();
                    $userDetails->makeVisible(array(
                        'email'
                    ));
                    if ($userDetails) {
                        $emailFindReplace = array(
                            '##PROJECT_NAME##' => $project->name,
                            '##PROJECT_DESCRIPTION##' => $project->description,
                            '##CUSTOMER_NAME##' => $userDetails->username,
                            '##PROJECT_URL##' => $_server_domain_url . '/projects/view/' . $project->id.'/'.$project->slug
                        );
                        $template = 'projectopenstatus';
                        sendMail($template, $emailFindReplace, $userDetails->email);
                    }
                }
            }
            /* Send Mail to User follower*/
        });
        self::saving(function ($project) use ($authUser) {
            Project::ProjectStatusCountUpdation($project->project_status_id);
            if (($authUser['role_id'] == \Constants\ConstUserTypes::Admin) || ($authUser['id'] == $project->user_id)) {
                return true;
            }
            return false;
        });
        self::updated(function ($project) {
            Project::ProjectStatusCountUpdation($project->project_status_id);
        });
        self::addGlobalScope('is_private', function (\Illuminate\Database\Eloquent\Builder $builder) use ($authUser) {
            if (empty($authUser['id'])) {
                $builder->where('is_private', false);
            }
        });
    }
    public function ProjectRangeCountUpdation($project_range_id)
    {
        $project = Project::where('project_range_id', $project_range_id);
        $project_range_count = $project->count();
        $active_project_range_count = $project->where('project_status_id', \Constants\ProjectStatus::OpenForBidding)->count();
        ProjectRange::where('id', $project_range_id)->update(['project_count' => $project_range_count, 'active_project_count' => $active_project_range_count]);
    }
    public function ProjectStatusCountUpdation($project_status_id)
    {
        $project_status_count = Project::where('project_status_id', $project_status_id)->count();
        ProjectStatus::where('id', $project_status_id)->update(['project_count' => $project_status_count]);
    }
    public function updateUserProjectCount($user_id)
    {
        $project_count = Project::where('user_id', $user_id)->count();
        User::where('id', $user_id)->update(['project_count' => $project_count]);
    }
    public function attachment()
    {
        return $this->hasOne('Models\Attachment', 'foreign_id', 'id')->where('class', 'Project');
    }
    public function scopeFilter($query, $params = array())
    {
        global $authUser;
        parent::scopeFilter($query, $params);
        if (!empty($params['project_status_id'])) {
            $project_status_id = explode(',', $params['project_status_id']);
            $query->whereIn('project_status_id', $project_status_id);
        }
        if (!empty($params['skills'])) {
            $skill_id = explode(',', $params['skills']);
            $project_id = array();
            $project_skills = SkillsProjects::select('project_id')->distinct()->whereIn('skill_id', $skill_id)->get()->toArray();
            foreach ($project_skills as $project_skill) {
                $project_id[] = $project_skill['project_id'];
            }
            $query->whereIn('id', $project_id);
        }
        if (!empty($params['project_categories'])) {
            $category_id = explode(',', $params['project_categories']);
            $project_id = array();
            $project_categories = ProjectsProjectCategory::select('project_id')->distinct()->whereIn('project_category_id', $category_id)->get()->toArray();
            foreach ($project_categories as $project_category) {
                $project_id[] = $project_category['project_id'];
            }
            $query->whereIn('id', $project_id);
        }
        if (!empty($params['project_range_id'])) {
            $query->where('project_range_id', $params['project_range_id']);
        }
        if (!empty($params['user_id'])) {
            $query->where('user_id', $params['user_id']);
        }
        if (!empty($params['q'])) {
            $query->where(function ($q1) use ($params) {
                $search = $params['q'];
                $q1->orWhereHas('user', function ($q) use ($search) {
                    $q->where('users.username', 'ilike', "%$search%");
                });
                $q1->orwhere('projects.name', 'ilike', "%$search%");
            });
        }
        if (!empty($params['type'])) {
            if ($params['type'] == 'bookmarked') {
                $follower = Follower::where('user_id', $authUser['id'])->where('class', 'Project')->pluck('foreign_id')->toArray();
                $query->whereIn('id', $follower);
            } elseif ($params['type'] == 'my_skills') {
                $skillsProjects = SkillsProjects::select('project_id')->Join('skills_users', 'skills_users.skill_id', 'skills_projects.skill_id')->where('user_id', $authUser['id'])->pluck('project_id')->toArray();
                $query->whereIn('id', $skillsProjects);
            }
        }
        if (!empty($params['is_urgent'])) {
            $query->where('is_urgent', $params['is_urgent']);
        }
        if (!empty($params['is_featured'])) {
            $query->where('is_featured', $params['is_featured']);
        }
        if (!empty($params['price_range_min']) && !empty($params['price_range_max'])) {
            $price_range_min = $params['price_range_min'];
            $price_range_max = $params['price_range_max'];
            $projectRange = ProjectRange::where(function ($query) use ($price_range_min, $price_range_max) {
                $query->where(function ($query) use ($price_range_min, $price_range_max) {
                    $query->where('min_amount', '>=', $price_range_min)->where('min_amount', '<=', $price_range_max);
                });
                $query->orWhere(function ($query) use ($price_range_min, $price_range_max) {
                    $query->where('max_amount', '>=', $price_range_min)->where('max_amount', '<=', $price_range_max);
                });
                $query->orWhere(function ($query) use ($price_range_min, $price_range_max) {
                    $query->whereRaw("'" . $price_range_min . "' >= min_amount AND '" . $price_range_max . "' <= max_amount");
                });
            })->pluck('id')->toArray();
            $query->whereIn('project_range_id', $projectRange);
        } else {
            if (!empty($params['price_range_min'])) {
                $projectRange = ProjectRange::where('min_amount', '>=', $params['price_range_min'])->pluck('id')->toArray();
                $query->whereIn('project_range_id', $projectRange);
            }
            if (!empty($params['price_range_max'])) {
                $projectRange = ProjectRange::where('max_amount', '<=', $params['price_range_max'])->pluck('id')->toArray();
                $query->whereIn('project_range_id', $projectRange);
            }
        }
    }
    public function under_development($args, $id = '')
    {
        global $authUser, $_server_domain_url;
        $result = array();
        try {
            if (is_null($id)) {
                return array(
                    'message' => 'Project could not be updated. Invalid request',
                    'code' => '1'
                );
            }
            $project = Project::where('id', $id)->with(['bid' => function ($q) use ($authUser) {
                $q->where('bid_status_id', \Constants\BidStatus::Won);
                $q->with(['user', 'project_bid', function ($q1) {
                    return $q1->where('is_active', 1);
                }
                ]);
            }
            ])->first();
            if (!empty($project) && ($authUser->role_id == \Constants\ConstUserTypes::Admin || $project['user_id'] == $authUser->id || $project['freelancer_user_id'] == $authUser->id)) {
                $oldProjectStatus = $project->project_status_id;
                $project = $project->toArray();
                $projectArray = array(
                    'project_status_id' => \Constants\ProjectStatus::UnderDevelopment
                );
                $oldProjectStatus = $project['project_status_id'];
                $newProjectStatus =$projectArray['project_status_id'];
                Project::where('id', $id)->update($projectArray);
                Project::ProjectStatusCountUpdation(\Constants\ProjectStatus::UnderDevelopment);
                Bid::where('id', $project['bid']['id'])->update(array(
                    'development_start_date' => date('Y-m-d H:i:s')
                ));               
               $employerDetails = getUserHiddenFields($project['user_id']);
                $userDetails = getUserHiddenFields($project['freelancer_user_id']);
                $emailFindReplace = array(
                    '##USERNAME##' => ucfirst($employerDetails->username) ,
                    '##BUYER_USERNAME##' => ucfirst($userDetails->username) ,
                    '##PROJECT_NAME##' => ucfirst($project['name']),
                    '##PROJECT_LINK##' => $_server_domain_url . '/projects/view/' . $project['id'] . '/' . $project['slug'] 
                );
                sendMail('Winner Acceptance Notification', $emailFindReplace, $employerDetails->email); 
                if ($oldProjectStatus == \Constants\ProjectStatus::WinnerSelected) {
                     insertActivities($project['freelancer_user_id'], $project['user_id'], 'Project', $project['id'], $oldProjectStatus, \Constants\ProjectStatus::UnderDevelopment, \Constants\ActivityType::ProjectAcceptedToWork, $project['id']);
                } elseif ($oldProjectStatus == \Constants\ProjectStatus::Completed) {
                     insertActivities($project['user_id'], $project['freelancer_user_id'], 'Project', $project['id'], $oldProjectStatus, \Constants\ProjectStatus::UnderDevelopment, \Constants\ActivityType::ProjectStatusChanged, $project['id']);
                }
                $getAdminDetails = User::select('email')->where('role_id',1)->first();
                $getOldProjectStatus = ProjectStatus::select('name')->where('id', $oldProjectStatus)->first();
                $getNewProjectStatus = ProjectStatus::select('name')->where('id', $newProjectStatus)->first();
                    $emailFindReplace = array(
                        '##PROJECT_NAME##' => ucfirst($project['name']) ,
                        '##OLD_STATUS##' => $getOldProjectStatus->name ,
                        '##NEW_STATUS##' => $getNewProjectStatus->name,
                        '##PROJECT_URL##' => $_server_domain_url . '/projects/view/' . $project['id'] . '/' . $project['slug'] 
                    );
                    sendMail('Admin Project Status Alert', $emailFindReplace, $getAdminDetails->email);
                return $project;
            } else {
                return array(
                    'message' => 'Project could not be updated. Please, try again',
                    'code' => '1'
                );
            }
        } catch (Exception $e) {
            return array(
                'message' => 'Project could not be updated. Please, try again',
                'code' => '1'
            );
        }
    }
    public function cancel($id = '')
    {

        global $authUser, $_server_domain_url;
        $result = array();
        try {                
            if (is_null($id)) {
                return array(
                    'message' => 'Project could not be updated. Invalid request',
                    'code' => '1'
                );
            }
           
            $project = Project::with('user', 'project_bid')->where('is_dispute', 0)->where('project_status_id', '=', \Constants\ProjectStatus::OpenForBidding)->find($id);
            if (empty($project) || (!empty($project) && ((!PROJECT_IS_ALLOW_EMPLOYER_TO_CANCEL_PROJECT && $authUser->id == $project->user_id) || $authUser->id != $project->user_id && $authUser->role_id != \Constants\ConstUserTypes::Admin))) {
                return array(
                    'message' => 'Project could not be updated. Invalid request.',
                    'code' => '1'
                );
            }
            $oldProjectStatus = $project->project_status_id;
            $project->project_status_id = \Constants\ProjectStatus::EmployerCanceled;
            if ($authUser->role_id == \Constants\ConstUserTypes::Admin) {
                $project->project_status_id = \Constants\ProjectStatus::CanceledByAdmin;
                updateProjectFailedCount($project->project_bid->user_id);
            }
            $project->cancelled_date = date('Y-m-d H:i:s');
            if ($project->update()) {
                $userId = $project->user_id;
                $otherUserId = $project->freelancer_user_id;
                $newProjectStatus =$project->project_status_id;                
                if ($authUser->id == $project->freelancer_user_id) {
                    $userId = $project->freelancer_user_id;
                    $otherUserId = $project->user_id;
                }
                if ($authUser->role_id == \Constants\ConstUserTypes::Admin) {
                    if (!empty($project->freelancer_user_id)) {
                        insertActivities($project->freelancer_user_id, $project->user_id, 'Project', $project->id, $oldProjectStatus, \Constants\ProjectStatus::EmployerCanceled, \Constants\ActivityType::ProjectRejectedToWork, $project->id);
                        insertActivities($project->user_id, $project->freelancer_user_id, 'Project', $project->id, $oldProjectStatus, \Constants\ProjectStatus::EmployerCanceled, \Constants\ActivityType::ProjectRejectedToWork, $project->id);
                    }
                } else {
                    if (!empty($otherUserId)) {
                         insertActivities($userId, $otherUserId, 'Project', $project->id, $oldProjectStatus, \Constants\ProjectStatus::EmployerCanceled, \Constants\ActivityType::ProjectRejectedToWork, $project->id);
                    }   
                }
                // sending Mail to employer
                if ($project->project_status_id == \Constants\ProjectStatus::EmployerCanceled && !empty($project->freelancer_user_id)) {
                    $employerDetails = getUserHiddenFields($project->user_id);
                    $userDetails = getUserHiddenFields($project->freelancer_user_id);
                    $emailFindReplace = array(
                        '##FREELANCER##' => ucfirst($userDetails->username) ,
                        '##EMPLOYER##' => ucfirst($employerDetails->username) ,
                        '##PROJECT_NAME##' => ucfirst($project->name),
                        '##PROJECT_URL##' => $_server_domain_url . '/projects/view/' . $project->id . '/' . $project->slug 
                    );
                    sendMail('Work Completion Reject Notification', $emailFindReplace, $userDetails->email);                
                }
                // Send mail to admin
                if ($project->project_status_id == \Constants\ProjectStatus::EmployerCanceled || $project->project_status_id == \Constants\ProjectStatus::CanceledByAdmin) {
                        $employerDetails = getUserHiddenFields($project->user_id);
                        $emailFindReplace = array(
                            '##USERNAME##' => ucfirst($employerDetails->username) ,
                            '##PROJECT_NAME##' => ucfirst($project->name),
                        );
                        sendMail('Project Cancelled Alert', $emailFindReplace, $employerDetails->email);     
                        foreach ($project->project_bid->bid as $bid){
                            $userDetails = getUserHiddenFields($bid->user_id);
                            $emailFindReplace = array(
                                '##USERNAME##' => ucfirst($userDetails->username) ,
                                '##PROJECT_NAME##' => ucfirst($project->name),
                            );
                            sendMail('Project Cancelled Alert', $emailFindReplace, $userDetails->email);                            
                        }               
                }
                    $getAdminDetails = User::select('email')->where('role_id',1)->first();
                    $getOldProjectStatus =ProjectStatus::select('name')->where('id', $oldProjectStatus)->first();
                    $getNewProjectStatus = ProjectStatus::select('name')->where('id', $newProjectStatus)->first();
                    $emailFindReplace = array(
                        '##PROJECT_NAME##' => ucfirst($project->name) ,
                        '##OLD_STATUS##' => $getOldProjectStatus->name ,
                        '##NEW_STATUS##' => $getNewProjectStatus->name,
                        '##PROJECT_URL##' => $_server_domain_url . '/projects/view/' . $project->id . '/' . $project->slug 
                    ); 
                    sendMail('Admin Project Status Alert', $emailFindReplace, $getAdminDetails->email); 
                   
                $project = $project->toArray();
                return $project;
            } else {
                return array(
                    'message' => 'Project could not be updated. Access Denied',
                    'code' => '1'
                );
            }
        } catch (Exception $e) {
            return array(
                'message' => 'Project could not be updated. Please, try again',
                'code' => '1'
            );
        }
    }
    /**************************************************
    - user have option to send cancel request
    - one user send request to others by email
    - is_cancel_request_freelancer or is_cancel_request_employer will set to 1
    - others can click accept or reject.
    if accept
    - project moved to MutualCancelled, remaining escrow move to employer, and mail to both
    if reject
    - is_cancel_request_freelancer and is_cancel_request_employer both will set to 0, mail send
    **************************************************/
    public function mutual_cancel($args = array(), $id = '')
    {
        try {
            global $authUser, $_server_domain_url;
            $result = array();
            $oldProjectStatus = '';
            $conditions_project_status = array(
                \Constants\ProjectStatus::WinnerSelected,
                \Constants\ProjectStatus::UnderDevelopment
            );
            $project = Project::select('projects.*')->where('projects.is_dispute', 0)->with('user', 'project_bid', 'bid', 'bid_winner')->leftJoin('project_bids', 'project_bids.project_id', '=', 'projects.id')->leftJoin('bids', 'bids.project_bid_id', '=', 'project_bids.id')->where('project_bids.is_active', true)->whereIn('project_status_id', $conditions_project_status)->find($id);
            if (empty($project) || (!empty($project) && (($authUser->id != $project->project_bid->user_id && $authUser->id != $project->user_id) && $authUser->role_id != \Constants\ConstUserTypes::Admin))) {
                return array(
                    'message' => 'Project could not be updated. Invalid request',
                    'code' => '1'
                );
            }
            if (!empty($args)) {
                $is_pending_approval = 0;
                if (!empty($project->is_cancel_request_freelancer) && empty($project->is_cancel_request_employer) && $authUser->id == $project->user_id) {
                    $is_pending_approval = 1;
                }
                if (!empty($project->is_cancel_request_employer) && empty($project->is_cancel_request_freelancer) && $authUser->id == $project->project_bid->user_id) {
                    $is_pending_approval = 1;
                }
                $oldProjectStatus = $project->project_status_id;    
                if (!empty($is_pending_approval) && isset($args['is_accept_mutual_cancel'])) {
                    $otherUserId = $project->freelancer_user_id;
                    $userId = $project->user_id;
                    if ($authUser->id == $project->freelancer_user_id) {
                        $otherUserId = $project->user_id;
                        $userId = $project->freelancer_user_id;
                    }                    
                    if ($is_pending_approval && !empty($args['is_accept_mutual_cancel'])) {
                        $project->is_cancel_request_freelancer = true;
                        $project->is_cancel_request_employer = true;
                        $project->project_status_id = \Constants\ProjectStatus::MutuallyCanceled;
                        $project->cancelled_date = date('Y-m-d');
                        insertActivities($userId, $otherUserId, 'Project', $project->id, $oldProjectStatus, \Constants\ProjectStatus::MutuallyCanceled, \Constants\ActivityType::ProjectMutualCancelAccept, $project->id);
                        $employerDetails = getUserHiddenFields($userId);
                        $userDetails = getUserHiddenFields($otherUserId);
                        $emailFindReplace = array(
                            '##USER##' => ucfirst($employerDetails->username) ,
                            '##TO_USER##' => ucfirst($userDetails->username) ,
                            '##PROJECT_NAME##' => ucfirst($project->name),
                            '##PROJECT_LINK##' => $_server_domain_url . '/projects/view/' . $project->id . '/' . $project->slug 
                        );
                        sendMail('Accept Mutual Cancel', $emailFindReplace, $userDetails->email);                         
                    } else {
                        $project->is_cancel_request_freelancer = false;
                        $project->is_cancel_request_employer = false;
                        insertActivities($userId, $otherUserId, 'Project', $project->id, $project->project_status_id, 0, \Constants\ActivityType::ProjectMutualCancelReject, $project->id);
                        $employerDetails = getUserHiddenFields($userId);
                        $userDetails = getUserHiddenFields($otherUserId);
                        $emailFindReplace = array(
                            '##USER##' => ucfirst($employerDetails->username) ,
                            '##TO_USER##' => ucfirst($userDetails->username) ,
                            '##PROJECT_NAME##' => ucfirst($project->name),
                            '##PROJECT_LINK##' => $_server_domain_url . '/projects/view/' . $project->id . '/' . $project->slug 
                        );
                        sendMail('Reject Mutual Cancel', $emailFindReplace, $userDetails->email);                      
                    }
                } else {
                    $project->mutual_cancel_note = !empty($args['mutual_cancel_note']) ? $args['mutual_cancel_note'] : '';
                    $otherUserId = $project->freelancer_user_id;
                    $userId = $project->user_id;
                    if ($authUser->id == $project->project_bid->user_id) {
                        $project->is_cancel_request_freelancer = true;
                        $reqested_by = "dev";
                        $otherUserId = $project->user_id;
                        $userId = $project->freelancer_user_id;
                    } else {
                        $project->is_cancel_request_employer = true;
                        $reqested_by = "owner";
                    }
                    insertActivities($userId, $otherUserId, 'Project', $project->id, $project->project_status_id, 0, \Constants\ActivityType::ProjectMutualCancelRequest, $project->id);
                    $employerDetails = getUserHiddenFields($userId);
                    $userDetails = getUserHiddenFields($otherUserId);
                    $emailFindReplace = array(
                        '##USER##' => ucfirst($employerDetails->username) ,
                        '##TO_USER##' => ucfirst($userDetails->username) ,
                        '##PROJECT_NAME##' => ucfirst($project->name),
                        '##PROJECT_LINK##' => $_server_domain_url . '/projects/view/' . $project->id . '/' . $project->slug 
                    );
                    sendMail('Mutual Cancel Alert', $emailFindReplace, $userDetails->email);                     
                }
                $dispatcher = Project::getEventDispatcher();
                Project::unsetEventDispatcher();
                if ($project->update()) {
                    $employer = $project->user_id;
                    $freelancer = $project->project_bid->user_id;
                    $project_id = $project->id;
                    if (!empty($args['project_status_id']) && $args['project_status_id'] == \Constants\ProjectStatus::MutuallyCanceled && $project->project_status_id == \Constants\ProjectStatus::MutuallyCanceled) {
                        $amount = 0;
                        $milestoneAmount = Milestone::whereIn('milestone_status_id', [\Constants\MilestoneStatus::EscrowFunded, \Constants\MilestoneStatus::Completed])->where('bid_id', $project->bid_winner->id)->selectRaw('sum(amount) as amount, sum(site_commission_from_employer) as site_commission_from_employer')->first()->toArray(); 
                        if (!empty($milestoneAmount['amount'])) {
                            $amount = $milestoneAmount['amount'] + $milestoneAmount['site_commission_from_employer'];
                        }
                        $adminId = User::select('id')->where('role_id', \Constants\ConstUserTypes::Admin)->first();
                        $transaction_id = insertTransaction($adminId['id'], $project->user_id, $project->id, 'Project', \Constants\TransactionType::AmountRefundedToWalletForCanceledProjectPayment, 0, $amount, 0, 0, 0, 0, $project->id, 0);
                        if ($transaction_id) {
                            User::where('id', $project->user_id)->increment('available_wallet_amount', $amount);
                        }
                        $newProjectStatus = $project->project_status_id;
                        $getAdminDetails = User::select('email')->where('role_id',1)->first();
                        $getOldProjectStatus = ProjectStatus::select('name')->where('id', $oldProjectStatus)->first();
                        $getNewProjectStatus = ProjectStatus::select('name')->where('id', $newProjectStatus)->first();
                            $emailFindReplace = array(
                                '##PROJECT_NAME##' => ucfirst($project->name) ,
                                '##OLD_STATUS##' => $getOldProjectStatus->name ,
                                '##NEW_STATUS##' => $getNewProjectStatus->name,
                                '##PROJECT_URL##' => $_server_domain_url . '/projects/view/' . $project->id . '/' . $project->slug 
                                );
                                sendMail('Admin Project Status Alert', $emailFindReplace, $getAdminDetails->email);
                    }
                    Project::setEventDispatcher($dispatcher);
                    $project = $project->toArray();
                    return $project;
                } else {
                    return array(
                        'message' => 'Project could not be updated. Access Denied',
                        'code' => '1'
                    );
                }
            }
        } catch (Exception $e) {
            return array(
                'message' => 'Project could not be updated. Please, try again',
                'code' => '1'
            );
        }
    }
    /**************************************************
    - employer have option to withdraw freelancer or reopen project for bidding
    - in the each cases the remain escrow, employer commission moved to employer wallet.
    - freealncer commission won't moved to freelancer
    - if choose another bidder as winer
    - old winner moved to lost
    - new bidder update as winner
    - if choose reopen
    - only remain escrow, employer commission moved to employer wallet, and project moved to bidding status
    **************************************************/
    public function withdraw_freelancer($args, $id = null)
    {
        try {
            global $authUser;
            global $_server_domain_url;
            $result = array();
            $conditions_project_status = array(
                \Constants\ProjectStatus::BiddingClosed,
                \Constants\ProjectStatus::BiddingExpired,
                \Constants\ProjectStatus::WinnerSelected
            );
            $project = Project::with('user')->with(['project_bid' => function ($join) {
                $join->where('is_active', true);
            }
            , 'bid_winner' => function ($q) {
                $q->where('bid_status_id', \Constants\BidStatus::Won);
            }
            ])->whereIn('project_status_id', $conditions_project_status)->where('is_dispute', 0)->find($id);
            if (empty($project) || (!empty($project) && (($authUser->id != $project->project_bid->user_id && $authUser->id != $project->user_id) && $authUser->role_id != \Constants\ConstUserTypes::Admin))) {
                return array(
                    'message' => 'Project could not be updated. Invalid request',
                    'code' => '1'
                );
            } 
            if ($project->project_status_id == \Constants\ProjectStatus::WinnerSelected && !empty($project->bid_winner) && empty($project->bid_winner->is_reached_response_end_date_for_freelancer)) {
                return array(
                    'message' => 'Project could not be updated. This bid not reached the withdraw date',
                    'code' => '1'
                );
            }
            if (!empty(count($project->project_bid))) {
                if (!empty($project->freelancer_user_id)) {
                    User::where('id', $project->freelancer_user_id)->decrement('won_bid_count', 1);
                }
                if (!empty($project->bid_winner)) {
                    Bid::where('id', $project->bid_winner->id)->update(array(
                        'bid_status_id' => \Constants\BidStatus::Lost,
                        'is_withdrawn' => 1
                    ));
                }
                //Start reopen bidding
                $projectUpdate = Project::find($project->id);
                $oldProjectStatus = $projectUpdate->project_status_id;
                $projectUpdate->project_status_id = \Constants\ProjectStatus::OpenForBidding;
                $newProjectStatus = $projectUpdate->project_status_id;
                $projectUpdate->is_reopened = 1;
                $projectUpdate->last_reopened_date = date('Y-m-d');
                $projectUpdate->save();
                insertActivities($project->user_id, 0, 'Project', $project->id, $oldProjectStatus, \Constants\ProjectStatus::OpenForBidding, \Constants\ActivityType::ProjectStatusChanged, $project->id);
                ProjectBid::where('id', $project->project_bid->id)->where('project_id', $project->id)->update(['is_active' => false]);
                $projectBid = new ProjectBid;
                $projectBid->is_active = true;
                $projectBid->project_id = $project->id;
                $projectBid->amount = $project->total_listing_fee;
                $projectBid->bid_count = $project->project_bid->bid_count;
                $projectBid->user_id = $project->project_bid->user_id;
                $projectBid->bidding_start_date = date('Y-m-d');
                $projectBid->bidding_end_date = date('Y-m-d', strtotime(date('Y-m-d') . "+" . $project->bid_duration . " days"));
                $projectBid->save();
                // End reopen bidding
                $getAdminDetails = User::select('email')->where('role_id',1)->first();
                $getOldProjectStatus = ProjectStatus::select('name')->where('id', $oldProjectStatus)->first();
                $getNewProjectStatus = ProjectStatus::select('name')->where('id', $newProjectStatus)->first();
                    $emailFindReplace = array(
                        '##PROJECT_NAME##' => ucfirst($project->name) ,
                        '##OLD_STATUS##' => $getOldProjectStatus->name ,
                        '##NEW_STATUS##' => $getNewProjectStatus->name,
                        '##PROJECT_URL##' => $_server_domain_url . '/projects/view/' . $project->id . '/' . $project->slug 
                    );
                    sendMail('Admin Project Status Alert', $emailFindReplace, $getAdminDetails->email);
                $project = $project->toArray();
                return $project;
            }
        } catch (Exception $e) {
            return array(
                'message' => 'Project could not be updated. Please, try again.',
                'code' => '1'
            );
        }
    }
    public function completed($args, $id = null)
    {
        $result = array();
        try {
            global $authUser, $_server_domain_url;
            $project = Project::with('user')->with(['project_bid' => function ($join) {
                $join->where('is_active', true);
            }
            , 'bid' => function ($join) {
                $join->where('bid_status_id', \Constants\BidStatus::Won);
            }
            , 'milestones' => function ($join) {
                $join->where('milestone_status_id', '<', \Constants\MilestoneStatus::RequestedForRelease);
            }
            ])->where('is_dispute', 0)->find($id);
            if (empty($project) || (!empty($project) && (($authUser->id != $project->bid[0]->user_id && $authUser->id != $project->user_id) && $authUser->role_id != \Constants\ConstUserTypes::Admin))) {
                return array(
                    'message' => 'Project could not be updated. Invalid request.',
                    'code' => '1'
                );
            }
            if (count($project->milestones) > 0) {
                return array(
                    'message' => 'Before Mark as Completed, you need to complete all pending milestones.',
                    'code' => '2'
                );
            }
            $oldProjectStatus = $project->project_status_id;
            if ($project->project_status_id == \Constants\ProjectStatus::UnderDevelopment) {
                // Update project status as Completed
                Project::where('id', $id)->update(['project_status_id' => \Constants\ProjectStatus::Completed]);
                Project::ProjectStatusCountUpdation(\Constants\ProjectStatus::Completed);
                Bid::where('id', $project->bid[0]->id)->update(array(
                    'development_end_date' => date('Y-m-d H:i:s')
                ));
                $newProjectStatus = \Constants\ProjectStatus::Completed;
                insertActivities($project->freelancer_user_id, $project->user_id, 'Project', $project->id, \Constants\ProjectStatus::UnderDevelopment, \Constants\ProjectStatus::Completed, \Constants\ActivityType::ProjectStatusChanged, $project->id);
                    $userDetails = getUserHiddenFields($project->user_id);
                    $employerDetails = getUserHiddenFields($authUser->id);
                    $emailFindReplace = array(
                    '##USERNAME##' => ucfirst($userDetails->username) ,
                    '##BUYER_USERNAME##' => ucfirst($employerDetails->username) ,
                    '##PROJECT_NAME##' => $project->name,
                    '##PROJECT_LINK##' => $_server_domain_url . '/projects/view/' . $project->id . '/' . $project->slug
                        );
                        sendMail('Work Completed Alert For Project Owner', $emailFindReplace, $userDetails->email);

            } else {
                $user_review_count = Review::where('foreign_id', $id)->where('class', 'Project')->count();
                if ($user_review_count == 2) {
                    // Update project status as Completed
                    insertActivities($project->user_id, $project->project_bid->user_id, 'Project', $project->id, $project->project_status_id, \Constants\ProjectStatus::Closed, \Constants\ActivityType::ProjectStatusChanged, $project->id);
                    $project->project_status_id = \Constants\ProjectStatus::Closed;
                    $project->update();
                    $newProjectStatus =$project->project_status_id;
                    // send mail to employer
                } else {
                    // Update project status as FinalReviewPending
                    $project_status_id = \Constants\ProjectStatus::Closed;
                    if (isPluginEnabled('Bidding/BiddingReview')) {
                        $project_status_id = \Constants\ProjectStatus::FinalReviewPending;
                    }
                    Project::where('id', $id)->update(['project_status_id' => $project_status_id]);
                    Project::ProjectStatusCountUpdation($project_status_id);
                    insertActivities($project->user_id, $project->project_bid->user_id, 'Project', $project->id, $project->project_status_id, $project_status_id, \Constants\ActivityType::ProjectStatusChanged, $project->id);
                    $newProjectStatus =$project_status_id;
                }
                if ($project->project_status_id == \Constants\ProjectStatus::Closed) {
                    $employerDetails = getUserHiddenFields($project->user_id);
                    $emailFindReplace = array(
                        '##USERNAME##' => ucfirst($employerDetails->username) ,
                        '##PROJECT_NAME##' => $project->name,
                        '##PROJECT_URL##' => $_server_domain_url . '/projects/view/' . $project->id . '/' . $project->slug
                            );
                    sendMail('Project Closed Alert', $emailFindReplace, $employerDetails->email);    
                    $userDetails = getUserHiddenFields($project->freelancer_user_id);
                    $emailFindReplace = array(
                        '##USERNAME##' => ucfirst($userDetails->username) ,
                        '##PROJECT_NAME##' => $project->name,
                        '##PROJECT_URL##' => $_server_domain_url . '/projects/view/' . $project->id . '/' . $project->slug
                            );
                    sendMail('Project Closed Alert', $emailFindReplace, $userDetails->email);                        
                }
            }
            $getAdminDetails = User::select('email')->where('role_id',1)->first();
            $getOldProjectStatus = ProjectStatus::select('name')->where('id', $oldProjectStatus)->first();
            $getNewProjectStatus = ProjectStatus::select('name')->where('id', $newProjectStatus)->first();
                    $emailFindReplace = array(
                        '##PROJECT_NAME##' => ucfirst($project->name) ,
                        '##OLD_STATUS##' => $getOldProjectStatus->name ,
                        '##NEW_STATUS##' => $getNewProjectStatus->name,
                        '##PROJECT_URL##' => $_server_domain_url . '/projects/view/' . $project->id . '/' . $project->slug 
                    );
                    sendMail('Admin Project Status Alert', $emailFindReplace, $getAdminDetails->email);
            $project = $project->toArray();
            return $project;
        } catch (Exception $e) {
            return array(
                'message' => 'Project could not be updated. Please, try again.',
                'code' => '1'
            );
        }
    }
    public function final_review_pending($args, $id = null)
    {
        $result = array();
        try {
            global $authUser, $_server_domain_url;
            $project = Project::with('user', 'bid_winner')->with(['project_bid' => function ($join) {
                $join->where('is_active', true);
            }
            , 'milestones' => function ($join) {
                $join->where('milestone_status_id', '<', \Constants\MilestoneStatus::RequestedForRelease);
            }
            , 'invoice' => function ($join) {
                $join->where('is_paid', 0);
            }
            ])->where('is_dispute', 0)->find($id);
            if (empty($project) || (!empty($project) && (($authUser->id != $project->bid_winner->user_id && $authUser->id != $project->user_id) && $authUser->role_id != \Constants\ConstUserTypes::Admin))) {
                return array(
                    'message' => 'Project could not be updated. Invalid request',
                    'code' => '1'
                );
            }
            if (count($project->milestones) > 0 || count($project->invoice) > 0) {
                return array(
                    'message' => 'Before Accept as Completed, you need to release/pay all pending milestones/invoice payments',
                    'code' => '2'
                );
            }
            $oldProjectStatus = $project->project_status_id;
            if ($project->project_status_id == \Constants\ProjectStatus::UnderDevelopment || $project->project_status_id == \Constants\ProjectStatus::Completed) {
                Project::where('id', $id)->update(['project_status_id' => \Constants\ProjectStatus::FinalReviewPending]);
                Project::ProjectStatusCountUpdation(\Constants\ProjectStatus::FinalReviewPending);
                $newProjectStatus = \Constants\ProjectStatus::FinalReviewPending;
            } else {
                return array(
                    'message' => 'Project could not be updated. Please, try again.',
                    'code' => '1'
                );
            }
            $getAdminDetails = User::select('email')->where('role_id',1)->first();
            $getOldProjectStatus = ProjectStatus::select('name')->where('id', $oldProjectStatus)->first();
            $getNewProjectStatus = ProjectStatus::select('name')->where('id', $newProjectStatus)->first();
            $emailFindReplace = array(
                '##PROJECT_NAME##' => ucfirst($project->name) ,
                '##OLD_STATUS##' => $getOldProjectStatus->name ,
                '##NEW_STATUS##' => $getNewProjectStatus->name,
                '##PROJECT_URL##' => $_server_domain_url . '/projects/view/' . $project->id . '/' . $project->slug 
            );
            sendMail('Admin Project Status Alert', $emailFindReplace, $getAdminDetails->email);
            $otherUserId = $project->freelancer_user_id;
            $userId = $project->user_id;
            if ($authUser->id == $project->freelancer_user_id) {
                $otherUserId = $project->user_id;
                $userId = $project->freelancer_user_id;
            }      
            insertActivities($userId, $otherUserId, 'Project', $project->id, $oldProjectStatus, \Constants\ProjectStatus::FinalReviewPending, \Constants\ActivityType::ProjectStatusChanged, $project->id);
            $project = $project->toArray();
            return $project;
        } catch (Exception $e) {
            return array(
                'message' => 'Project could not be updated. Please, try again.',
                'code' => '1'
            );
        }
    }
    public function processOrder($args)
    {
        global $authUser, $_server_domain_url;
        $project = Project::whereIn('project_status_id', [\Constants\ProjectStatus::PaymentPending, \Constants\ProjectStatus::Draft])->where('user_id', $authUser->id)->find($args['foreign_id']);
        $result = array();
        if (!empty($project)) {
            $project->payment_gateway_id = $args['payment_gateway_id'];
            $project->update();
            if ($project->total_listing_fee > 0) {
                $args['name'] = $args['description'] = "Listing fee for " . $project->name . " in " . SITE_NAME;
                $args['amount'] = $project->total_listing_fee;
                $args['id'] = $project->id;
                $args['notify_url'] = $_server_domain_url . '/ipn/process_ipn/Project/' . $project->id . '/' . md5(SECURITY_SALT . $project->id . SITE_NAME);
                $args['success_url'] = $_server_domain_url . '/projects/view/' . $project->id . '/' . $project->slug . '?error_code=0';
                $args['cancel_url'] = $_server_domain_url . '/projects/order/' . $project->id . '/tests?error_code=512';
                $result = Payment::processPayment($project->id, $args, 'Project');
            } else {
                if (!empty(PROJECT_IS_AUTO_APPROVE)) {
                    $project->project_status_id = \Constants\ProjectStatus::OpenForBidding;
                } else {
                    $project->project_status_id = \Constants\ProjectStatus::PendingForApproval;
                }
                $project->is_paid = 1;
                $project->update();
                $result = $project->toArray();
            }
        }
        return $result;
    }
}
