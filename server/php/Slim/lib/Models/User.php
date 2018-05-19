<?php
/**
 * User
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

class User extends AppModel
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'users';
    protected $fillable = array(
        'username',
        'email',
        'password',
        'is_agree_terms_conditions',
        'is_active',
        'role_id',
        'gender_id',
        'is_email_confirmed',
        'first_name',
        'last_name',
        'add_fund',
        'deduct_fund',
        'zip_code',
        'hourly_rate',
        'designation',
        'about_me',
        'full_address',
        'is_have_unreaded_activity'
    );
    public $qSearchFields = array(
        'first_name',
        'last_name',
        'username',
        'email',
    );
    public $hidden = array(
        'role_id',
        'password',
        'email',
        'bid_count',
        'won_bid_count',
        'user_login_count',
        'project_flag_count',
        'job_flag_count',
        'quote_service_flag_count',
        'portfolio_flag_count',
        'available_wallet_amount',
        'ip_id',
        'last_login_ip_id',
        'last_logged_in_time',
        'is_agree_terms_conditions',
        'is_active',
        'total_amount_withdrawn',
        'zazpay_receiver_account_id',
        'available_credit_count',
        'total_credit_bought',
        'quote_credit_purchase_log_count',
        'total_site_revenue_as_freelancer',
        'total_site_revenue_as_employer',
        'total_earned_amount_as_freelancer',
        'total_spend_amount_as_employer'
    );
    public $rules = array(
       'username' => [
                'sometimes',
                'required',
                'min:3',
                'max:15',
                'regex:/^[A-Za-z][A-Za-z0-9]*(?:_[A-Za-z0-9]+)*$/',
            ],
        'email' => 'sometimes|required|email',
        'password' => 'sometimes|required'
    );
    // Admin scope
    protected $scopes_1 = array();
    // User scope
    protected $scopes_2 = array(
        'canViewUser',
        'canListUserTransactions',
        'canUserCreateUserCashWithdrawals',
        'canUserViewUserCashWithdrawals',
        'canUserListUserCashWithdrawals',
        'canUserCreateMoneyTransferAccount',
        'canUserUpdateMoneyTransferAccount',
        'canUserViewMoneyTransferAccount',
        'canUserListMoneyTransferAccount',
        'canUserDeleteMoneyTransferAccount',
        'canListQuoteBid',
        'canCreateQuoteRequest',
        'canListUserQuoteRequestFormField',
        'canPostQuoteFaqAnswer',
        'canDeleteQuoteFaqAnswerId',
        'canUpdateQuoteFaqAnswerId',
        'canAddQuoteService',
        'canDeleteQuoteService',
        'canUpdateQuoteService',
        'canCreateQuoteServicePhoto',
        'canUpdateQuoteServicePhoto',
        'canDeleteQuoteServicePhoto',
        'canCreateQuoteServiceVideo',
        'canDeleteQuoteServiceVideo',
        'canUpdateQuoteServiceVideo',
        'canCreateQuoteServiceAudio',
        'canDeleteQuoteServiceAudio',
        'canUpdateQuoteServiceAudio',
        'canGetQuoteFaqQuestionTemplate',
        'canCreateQuoteCreditPurchasLog',
        'canDeletePortfolio',
        'canUpdatePortfolio',
        'canCreatePortfolio',
        'canGetquoteBid',
        'canUpdateUser',
        'canCreateJob',
        'canUpdateJob',
        'canDeleteJob',
        'canUpdateJobApply',
        'canViewJobApply',
        'canCreateJobApply',
        'canListJobApplyStatus',
        'canCreateExamsQuestion',
        'canCreateExamAnswer',
        'canViewExamAnswer',
        'canDeleteExamAnswer',
        'canUpdateExamAnswer',
        'canListExamLevel',
        'canUpdateExamsAnswer',
        'canViewMyQuoteService',
        'canUserViewJob',
        'canUserPortfolio',
        'canViewMyContest',
        'canViewMyContestUser',
        'canDeleteContest',
        'canUpdateContest',
        'canCreateContest',
        'canDeleteContestUser',
        'canCreateContestUser',
        'canGetMe',
        'canUpdateContestUser',
        'canListJobStat',
        'canUserViewJobApply',
        'canListJobApplyStat',
        'canListResumeRating',
        'canCreateResumeRating',
        'canDeleteResumeRating',
        'canViewResumeRating',
        'canUpdateResumeRating',
        'canListEmployerJobApply',
        'canListJobApplyResumeRating',
        'canCreateMoneyTransferAccount',
        'canViewMoneyTransferAccount',
        'canUpdateMoneyTransferAccount',
        'canDeleteMoneyTransferAccount',
        'canListExamsQuestions',
        'canCreateExamUser',
        'canGetMyQuoteCreditPurchasLog',
        'canListMyQuoteRequest',
        'canUpdateQuoteBid',
        'canViewExamUser',
        'canUserViewExamsUsers',
        'canCreateProject',
        'canDeleteProject',
        'canUpdateProject',
        'canUserViewProjects',
        'canCreateBid',
        'canCreateFollower',
        'canUpdateBidUpdateStatus',
        'canUpdateProjectUpdateStatus',
        'canUpdateMilestoneUpdateStatus',
        'canCreateMilestone',
        'canListEmployerBid',
        'canListMyBid',
        'canUpdateMilestone',
        'canCreateMessage',
        'canCreateOrder',
        'canCreateProjectBidInvoice',
        'canUpdateProjectBidInvoice',
        'canListProjectBidInvoice',
        'canViewProjectBidInvoice',
        'canCreateWorkProfile',
        'canDeleteWorkProfile',
        'canUpdateWorkProfile',
        'canCreateEducation',
        'canUpdateEducation',
        'canDeleteEducation',
        'canCreateCertification',
        'canUpdateCertification',
        'canDeleteCertification',
        'canCreatePublication',
        'canDeletePublication',
        'canUpdatePublication',
        'canListBid',
        'canUpdatePaymentEscrow',
        'canListProjectDispute',
        'canCreateProjectDispute',
        'canGetQuoteFaqQuestionTemplateId',
        'canViewGetCoupon',
        'canListMilestone',
        'canListProjectStat',
        'canCreateHireRequest',
        'canListActiveProject',
        'canListDisputeOpenType',
        'canListProjectAttachment',
        'canCreateProjectAttachment',
        'canDeleteProjectAttachment',
        'canCreateWallet',
        'canDeleteFollower',
        'canCreateQuoteCategory',
        'canUpdateQuoteCategory',
        'canUpdateContestStatus',
        'canViewContestStatus',
        'canListContestStatus',
        'canListFollower',
        'canViewFollower',
        'canViewQuoteBid',
        'canViewContestType',
        'canUpdateQuoteRequest',
        'canDeleteBid',
        'canViewBid',
        'canUpdateBid',
        'canDeleteMilestone',
        'canViewMilestone',
        'canDeleteFlag',
        'canListMyMilestone',
        'canListMeProjectBidInvoice',
        'canListEmployerProjectBidInvoice',
        'canListMyEmployerMilestone',
        'canDeleteProjectBidInvoice',
        'canUpdateHireRequest',
        'canDeleteHireRequest',
        'canListHireRequest',
        'canQuoteServiceStats',
        'canViewFreelancerBidStats',
        'canEmployerPayStats',
        'canQuoteRequestStats',
        'canCreateValut',
        'canUpdateValut',
        'canDeleteValut',
        'canListMeActivity'
    );
    protected $scopes_3 = array(
        'canViewUser',
        'canListUserTransactions',
        'canUserCreateUserCashWithdrawals',
        'canUserViewUserCashWithdrawals',
        'canUserListUserCashWithdrawals',
        'canUserCreateMoneyTransferAccount',
        'canUserUpdateMoneyTransferAccount',
        'canUserViewMoneyTransferAccount',
        'canUserListMoneyTransferAccount',
        'canUserDeleteMoneyTransferAccount',
        'canListQuoteBid',
        'canCreateQuoteRequest',
        'canListUserQuoteRequestFormField',
        'canPostQuoteFaqAnswer',
        'canDeleteQuoteFaqAnswerId',
        'canUpdateQuoteFaqAnswerId',
        'canAddQuoteService',
        'canDeleteQuoteService',
        'canUpdateQuoteService',
        'canCreateQuoteServicePhoto',
        'canUpdateQuoteServicePhoto',
        'canDeleteQuoteServicePhoto',
        'canCreateQuoteServiceVideo',
        'canDeleteQuoteServiceVideo',
        'canUpdateQuoteServiceVideo',
        'canCreateQuoteServiceAudio',
        'canDeleteQuoteServiceAudio',
        'canUpdateQuoteServiceAudio',
        'canGetQuoteFaqQuestionTemplate',
        'canCreateQuoteCreditPurchasLog',
        'canDeletePortfolio',
        'canUpdatePortfolio',
        'canCreatePortfolio',
        'canGetquoteBid',
        'canUpdateUser',
        'canCreateJob',
        'canUpdateJob',
        'canDeleteJob',
        'canUpdateJobApply',
        'canViewJobApply',
        'canCreateJobApply',
        'canListJobApplyStatus',
        'canCreateExamsQuestion',
        'canCreateExamAnswer',
        'canViewExamAnswer',
        'canDeleteExamAnswer',
        'canUpdateExamAnswer',
        'canListExamLevel',
        'canUpdateExamsAnswer',
        'canViewMyQuoteService',
        'canUserViewJob',
        'canUserPortfolio',
        'canViewMyContest',
        'canViewMyContestUser',
        'canDeleteContest',
        'canUpdateContest',
        'canCreateContest',
        'canDeleteContestUser',
        'canCreateContestUser',
        'canGetMe',
        'canUpdateContestUser',
        'canListJobStat',
        'canUserViewJobApply',
        'canListJobApplyStat',
        'canListResumeRating',
        'canCreateResumeRating',
        'canDeleteResumeRating',
        'canViewResumeRating',
        'canUpdateResumeRating',
        'canListEmployerJobApply',
        'canListJobApplyResumeRating',
        'canCreateMoneyTransferAccount',
        'canViewMoneyTransferAccount',
        'canUpdateMoneyTransferAccount',
        'canDeleteMoneyTransferAccount',
        'canListExamsQuestions',
        'canCreateExamUser',
        'canGetMyQuoteCreditPurchasLog',
        'canListMyQuoteRequest',
        'canUpdateQuoteBid',
        'canViewExamUser',
        'canUserViewExamsUsers',
        'canCreateProject',
        'canDeleteProject',
        'canUpdateProject',
        'canUserViewProjects',
        'canCreateBid',
        'canCreateFollower',
        'canUpdateBidUpdateStatus',
        'canUpdateProjectUpdateStatus',
        'canUpdateMilestoneUpdateStatus',
        'canCreateMilestone',
        'canListEmployerBid',
        'canListMyBid',
        'canUpdateMilestone',
        'canCreateMessage',
        'canCreateOrder',
        'canCreateProjectBidInvoice',
        'canUpdateProjectBidInvoice',
        'canListProjectBidInvoice',
        'canViewProjectBidInvoice',
        'canCreateWorkProfile',
        'canDeleteWorkProfile',
        'canUpdateWorkProfile',
        'canCreateEducation',
        'canUpdateEducation',
        'canDeleteEducation',
        'canCreateCertification',
        'canUpdateCertification',
        'canDeleteCertification',
        'canCreatePublication',
        'canDeletePublication',
        'canUpdatePublication',
        'canListBid',
        'canUpdatePaymentEscrow',
        'canListProjectDispute',
        'canCreateProjectDispute',
        'canGetQuoteFaqQuestionTemplateId',
        'canViewGetCoupon',
        'canListMilestone',
        'canListProjectStat',
        'canListActiveProject',
        'canListDisputeOpenType',
        'canListProjectAttachment',
        'canCreateProjectAttachment',
        'canDeleteProjectAttachment',
        'canCreateWallet',
        'canDeleteFollower',
        'canCreateQuoteCategory',
        'canUpdateQuoteCategory',
        'canUpdateContestStatus',
        'canViewContestStatus',
        'canListContestStatus',
        'canListFollower',
        'canViewFollower',
        'canViewQuoteBid',
        'canViewContestType',
        'canUpdateQuoteRequest',
        'canDeleteBid',
        'canViewBid',
        'canUpdateBid',
        'canDeleteMilestone',
        'canViewMilestone',
        'canDeleteFlag',
        'canListMyMilestone',
        'canListMeProjectBidInvoice',
        'canListEmployerProjectBidInvoice',
        'canListMyEmployerMilestone',
        'canDeleteProjectBidInvoice',
        'canCreateHireRequest',
        'canUpdateHireRequest',
        'canDeleteHireRequest',
        'canListHireRequest',
        'canQuoteServiceStats',
        'canViewFreelancerBidStats',
        'canEmployerPayStats',
        'canQuoteRequestStats',
        'canCreateValut',
        'canUpdateValut',
        'canDeleteValut',
        'canListMeActivity'
    );
    protected $scopes_4 = array(
        'canViewUser',
        'canListUserTransactions',
        'canUserCreateUserCashWithdrawals',
        'canUserViewUserCashWithdrawals',
        'canUserListUserCashWithdrawals',
        'canUserCreateMoneyTransferAccount',
        'canUserUpdateMoneyTransferAccount',
        'canUserViewMoneyTransferAccount',
        'canUserListMoneyTransferAccount',
        'canUserDeleteMoneyTransferAccount',
        'canListQuoteBid',
        'canCreateQuoteRequest',
        'canListUserQuoteRequestFormField',
        'canPostQuoteFaqAnswer',
        'canDeleteQuoteFaqAnswerId',
        'canUpdateQuoteFaqAnswerId',
        'canAddQuoteService',
        'canDeleteQuoteService',
        'canUpdateQuoteService',
        'canCreateQuoteServicePhoto',
        'canUpdateQuoteServicePhoto',
        'canDeleteQuoteServicePhoto',
        'canCreateQuoteServiceVideo',
        'canDeleteQuoteServiceVideo',
        'canUpdateQuoteServiceVideo',
        'canCreateQuoteServiceAudio',
        'canDeleteQuoteServiceAudio',
        'canUpdateQuoteServiceAudio',
        'canGetQuoteFaqQuestionTemplate',
        'canCreateQuoteCreditPurchasLog',
        'canDeletePortfolio',
        'canUpdatePortfolio',
        'canCreatePortfolio',
        'canGetquoteBid',
        'canUpdateUser',
        'canCreateJob',
        'canUpdateJob',
        'canDeleteJob',
        'canUpdateJobApply',
        'canViewJobApply',
        'canCreateJobApply',
        'canListJobApplyStatus',
        'canCreateExamsQuestion',
        'canCreateExamAnswer',
        'canViewExamAnswer',
        'canDeleteExamAnswer',
        'canUpdateExamAnswer',
        'canListExamLevel',
        'canUpdateExamsAnswer',
        'canViewMyQuoteService',
        'canUserViewJob',
        'canUserPortfolio',
        'canViewMyContest',
        'canViewMyContestUser',
        'canDeleteContest',
        'canUpdateContest',
        'canCreateContest',
        'canDeleteContestUser',
        'canCreateContestUser',
        'canGetMe',
        'canUpdateContestUser',
        'canListJobStat',
        'canUserViewJobApply',
        'canListJobApplyStat',
        'canListResumeRating',
        'canCreateResumeRating',
        'canDeleteResumeRating',
        'canViewResumeRating',
        'canUpdateResumeRating',
        'canListEmployerJobApply',
        'canListJobApplyResumeRating',
        'canCreateMoneyTransferAccount',
        'canViewMoneyTransferAccount',
        'canUpdateMoneyTransferAccount',
        'canDeleteMoneyTransferAccount',
        'canListExamsQuestions',
        'canCreateExamUser',
        'canGetMyQuoteCreditPurchasLog',
        'canListMyQuoteRequest',
        'canUpdateQuoteBid',
        'canViewExamUser',
        'canUserViewExamsUsers',
        'canCreateProject',
        'canDeleteProject',
        'canUpdateProject',
        'canUserViewProjects',
        'canCreateBid',
        'canCreateFollower',
        'canUpdateBidUpdateStatus',
        'canUpdateProjectUpdateStatus',
        'canUpdateMilestoneUpdateStatus',
        'canCreateMilestone',
        'canListEmployerBid',
        'canListMyBid',
        'canUpdateMilestone',
        'canCreateMessage',
        'canCreateOrder',
        'canCreateProjectBidInvoice',
        'canUpdateProjectBidInvoice',
        'canListProjectBidInvoice',
        'canViewProjectBidInvoice',
        'canCreateWorkProfile',
        'canDeleteWorkProfile',
        'canUpdateWorkProfile',
        'canCreateEducation',
        'canUpdateEducation',
        'canDeleteEducation',
        'canCreateCertification',
        'canUpdateCertification',
        'canDeleteCertification',
        'canCreatePublication',
        'canDeletePublication',
        'canUpdatePublication',
        'canListBid',
        'canUpdatePaymentEscrow',
        'canListProjectDispute',
        'canCreateProjectDispute',
        'canGetQuoteFaqQuestionTemplateId',
        'canViewGetCoupon',
        'canListMilestone',
        'canListProjectStat',
        'canListActiveProject',
        'canListDisputeOpenType',
        'canListProjectAttachment',
        'canCreateProjectAttachment',
        'canDeleteProjectAttachment',
        'canCreateWallet',
        'canDeleteFollower',
        'canCreateQuoteCategory',
        'canUpdateQuoteCategory',
        'canUpdateContestStatus',
        'canViewContestStatus',
        'canListContestStatus',
        'canListFollower',
        'canViewFollower',
        'canViewQuoteBid',
        'canViewContestType',
        'canUpdateQuoteRequest',
        'canDeleteBid',
        'canViewBid',
        'canUpdateBid',
        'canDeleteMilestone',
        'canViewMilestone',
        'canDeleteFlag',
        'canListMyMilestone',
        'canListMeProjectBidInvoice',
        'canListEmployerProjectBidInvoice',
        'canListMyEmployerMilestone',
        'canDeleteProjectBidInvoice',
        'canCreateHireRequest',
        'canUpdateHireRequest',
        'canDeleteHireRequest',
        'canListHireRequest',
        'canQuoteServiceStats',
        'canViewFreelancerBidStats',
        'canEmployerPayStats',
        'canQuoteRequestStats',
        'canCreateValut',
        'canUpdateValut',
        'canDeleteValut',
        'canListMeActivity'
    );
    /**
     * To check if username already exist in user table, if so generate new username with append number
     *
     * @param string $username User name which want to check if already exsist
     *
     * @return mixed
     */
    public function checkUserName($username)
    {
        $userExist = User::where('username', $username)->first();
        if (count($userExist) > 0) {
            $org_username = $username;
            $i = 1;
            do {
                $username = $org_username . $i;
                $userExist = User::where('username', $username)->first();
                if (count($userExist) < 0) {
                    break;
                }
                $i++;
            } while ($i < 1000);
        }
        return $username;
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
        return $this->belongsTo('Models\Country', 'country_id', 'id')->select('id', 'iso_alpha2', 'name');
    }
    public function attachment()
    {
        return $this->hasOne('Models\Attachment', 'foreign_id', 'id')->where('class', 'UserAvatar');
    }
    public function foreign_attachment()
    {
        return $this->hasOne('Models\Attachment', 'foreign_id', 'id')->select('id', 'filename', 'class', 'foreign_id')->where('class', 'UserAvatar');
    }
    public function cover_photo()
    {
        return $this->hasOne('Models\Attachment', 'foreign_id', 'id')->where('class', 'CoverPhoto');
    }
    public function foreign_flags()
    {
        return $this->morphMany('Models\Flag', 'foreign');
    }
    public function foreign_views()
    {
        return $this->morphMany('Models\View', 'foreign_view');
    }
    public function foreign_followers()
    {
        return $this->morphMany('Models\Follower', 'foreign');
    }
    public function role()
    {
        return $this->belongsTo('Models\Role', 'role_id', 'id');
    }
    public function portfolio()
    {
        return $this->hasMany('Models\Portfolio', 'user_id', 'id')->limit(3)->with('attachment');
    }
    public function skill_users()
    {
        return $this->hasMany('Models\SkillsUser', 'user_id', 'id')->with('skills');
    }
    public function foreign()
    {
        return $this->morphTo(null, 'class', 'foreign_id');
    }
    public function activity()
    {
        return $this->belongsTo('Models\User', 'id', 'id')->select('id');
    }
    public function exams_users()
    {
        return $this->hasMany('Models\ExamsUser', 'user_id', 'id')->where('exam_status_id', \Constants\ExamStatus::Passed)->with('exam');
    }
    public function follower()
    {
        $user_id = 0;
        global $authUser;
        if (!empty($authUser)) {
            $user_id = $authUser['id'];
        }
        return $this->hasMany('Models\Follower', 'foreign_id', 'id')->where('user_id', $user_id)->where('class', 'User');
    }
    public function flags()
    {
        $user_id = 0;
        global $authUser;
        if (!empty($authUser)) {
            $user_id = $authUser['id'];
        }
        return $this->hasMany('Models\Flag', 'foreign_id', 'id')->where('user_id', $user_id)->where('class', 'User');
    }
    public function scopeFilter($query, $params = array())
    {
        global $authUser;
        parent::scopeFilter($query, $params);
        if (!empty($params['type']) && $params['type'] == 'portfolios') {
            $query->with('portfolio');
        }
        if (!empty($params['is_email_confirmed'])) {
            $query->where('is_email_confirmed', $params['is_email_confirmed']);
        }
        if (!empty($params['role_id'])) {
            $query->Where('role_id', $params['role_id']);
        }
        if (!empty($params['is_have_service'])) {
            $query->where('quote_service_count', '>', 0);
        }
        if (!empty($params['skills'])) {
            $skill_id = explode(',', $params['skills']);
            $user_id = array();
            $user_skills = SkillsUser::select('user_id')->distinct()->whereIn('skill_id', $skill_id)->get()->toArray();
            foreach ($user_skills as $user_skill) {
                $user_id[] = $user_skill['user_id'];
            }
            $query->whereIn('id', $user_id);
        }
        if (!empty($params['hourly_rate_min']) && !empty($params['hourly_rate_max'])) {
            $hourly_rate_min = $params['hourly_rate_min'];
            $hourly_rate_max = $params['hourly_rate_max'];
            $query->where(function ($query) use ($hourly_rate_min, $hourly_rate_max) {
                $query->where('hourly_rate', '>=', $hourly_rate_min)->where('hourly_rate', '<=', $hourly_rate_max);
            });
        } else {
            if (!empty($params['hourly_rate_min'])) {
                $query->where('hourly_rate', '>=', $params['hourly_rate_min']);
            }
            if (!empty($params['hourly_rate_max'])) {
                $query->where('hourly_rate', '<=', $params['hourly_rate_max']);
            }
        }
        if (!empty($authUser)) {
            if ($authUser['role_id'] != \Constants\ConstUserTypes::Admin) {
                $query->where('role_id', '!=', \Constants\ConstUserTypes::Admin);
            }
            if (!empty($params['role']) && $params['role'] == 'freelancer') {
                $query->whereIn('role_id', array(
                    \Constants\ConstUserTypes::User,
                    \Constants\ConstUserTypes::Freelancer
                ));
            } elseif (!empty($params['role']) && $params['role'] == 'employer') {
                $query->whereIn('role_id', array(
                    \Constants\ConstUserTypes::User,
                    \Constants\ConstUserTypes::Employer
                ));
            } elseif (!empty($params['role']) && $params['role'] == 'admin') {
                if ($authUser['role_id'] == \Constants\ConstUserTypes::Admin) {
                    $query->where('role_id', \Constants\ConstUserTypes::Admin);
                }
            }
        } else {
            $query->where('role_id', '!=', \Constants\ConstUserTypes::Admin);
        }
    }
}
