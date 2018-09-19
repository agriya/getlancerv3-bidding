<?php
/**
 * ExamsUser
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
 * ExamsUser
*/
class ExamsUser extends AppModel
{
    protected $table = 'exams_users';
    protected $fillable = array(
        'exam_id',
        'user_id',
        'payment_gateway_id'
    );
    public $rules = array(
        'exam_id' => 'sometimes|required',
        'exam_status_id' => 'sometimes|required',
        'no_of_times' => 'sometimes|required',
        'allow_duration' => 'sometimes|required',
        'taken_time' => 'sometimes|required',
        'exam_started_date' => 'sometimes|required|date',
        'exam_end_date' => 'sometimes|required|date',
    );
    public function exam()
    {
        return $this->belongsTo('Models\Exam', 'exam_id', 'id')->with('attachment', 'exam_level');
    }
    public function user()
    {
        return $this->belongsTo('Models\User', 'user_id', 'id')->with('attachment');
    }
    public function exam_status()
    {
        return $this->belongsTo('Models\ExamStatus', 'exam_status_id', 'id');
    }
    public function exam_level()
    {
        return $this->belongsTo('Models\ExamLevel', 'exam_level_id', 'id');
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
    public function transaction()
    {
        return $this->belongsTo('Models\ExamsUser', 'id', 'id')->select('id', 'user_id');
    }
    public function foreign_transactions()
    {
        return $this->morphMany('Models\Transaction', 'foreign_transaction');
    }
    public function scopeFilter($query, $params = array())
    {
        parent::scopeFilter($query, $params);
        if (!empty($params['user_id'])) {
            $query->where('user_id', $params['user_id']);
        }
        if (!empty($params['exam_id'])) {
            $query->where('exam_id', $params['exam_id']);
        }
        if (!empty($params['exam_status_id'])) {
            $query->where('exam_status_id', $params['exam_status_id']);
        }
    }
    protected static function boot()
    {
        parent::boot();
        self::creating(function ($data) {
            if (!empty(Exam::where('id', $data->exam_id)->where('is_active', true)->count())) {
                return true;
            } else {
                return false;
            }
        });
        self::created(function ($examsUser) {
            ExamsUser::updateExamsUserCount($examsUser->exam_id);
        });
        self::deleted(function ($examsUser) {
            ExamsUser::updateExamsUserCount($examsUser->exam_id);
        });
    }
    public function updateExamsUserCount($exam_id)
    {
        $exams_user_count = ExamsUser::where('exam_id', $exam_id)->count();
        Exam::where('id', $exam_id)->update(['exams_user_count' => $exams_user_count]);
    }
    function _updatePercentileRank($exam_id)
    {
        global $capsule;
        try {
            $examsUsersRecords = ExamsUser::select('id', $capsule::raw('(total_mark / total_question_count) * 100 as total'))->where('exam_id', $exam_id)->where('exam_status_id', \Constants\ExamStatus::Passed)->where('total_question_count', '>', 0)->get()->toArray();
            $total_mark_arr = array();
            foreach ($examsUsersRecords as $value) {
                $total_mark_arr[] = $value['total'];
            }
            sort($total_mark_arr);
            $duplicate_count = array_count_values($total_mark_arr);
            foreach ($examsUsersRecords as $examsUsersRecord) {
                $checkLowestNumbersCount = 0;
                foreach ($total_mark_arr as $value) {
                    if ($value == $examsUsersRecord['total']) {
                        break;
                    }
                    $checkLowestNumbersCount++;
                }
                $capsule::statement("update exams_users set percentile_rank = eu2.percentile_rank from ( select exam_id,((( " . $checkLowestNumbersCount . " + (0.5 * " . $duplicate_count[$examsUsersRecord['total']] . ")) / (select count(*) from exams_users where exam_id = " . $exam_id . " and exam_status_id = " . \Constants\ExamStatus::Passed . ")) * 100) as percentile_rank from exams_users ) eu2 where exams_users.id = " . $examsUsersRecord['id'] . " and exams_users.exam_id = " . $exam_id . " and exams_users.exam_status_id = " . \Constants\ExamStatus::Passed);
            }
        } catch (Exception $e) {
        }
    }
    public function processCaptured($payment_response, $id)
    {
        global $_server_domain_url;
        $examsUser = ExamsUser::where('exam_status_id', \Constants\ExamStatus::ExamFeePaymentPending)->find($id);
        if (!empty($examsUser)) {
            $examsUser->exam_status_id = \Constants\ExamStatus::FeePaidOrNotStarted;
            $examsUser->zazpay_pay_key = $payment_response['paykey'];
            if (!empty($payment_response['paykey'])) {
                $examsUser->paypal_pay_key = $payment_response['paykey'];
            }
            $examsUser->fee_paid = $examsUser->exam->fee;
            $examsUser->update();
            $exam = Exam::where('id', $examsUser->exam_id)->first();
            $exam->total_fee_received = $exam->total_fee_received + $examsUser->fee_paid;
            $exam->update();
            if (!empty($examsUser->fee_paid)) {
                $userDetails = getUserHiddenFields($examsUser->user_id);
                $emailFindReplace = array(
                    '##USERNAME##' => ucfirst($userDetails->username) ,
                    '##EXAM##' => $exam->title,
                    '##EXAM_LINK##' => $_server_domain_url . '/exams/' . $exam->id . '/' . $exam->slug
                    );
                sendMail('Start Skill Test Notification', $emailFindReplace, $userDetails->email);                
                $user = User::find($examsUser->user_id);
                $user->makeVisible(['total_site_revenue_as_freelancer', 'total_earned_amount_as_freelancer']);
                $user->total_site_revenue_as_freelancer = $user->total_site_revenue_as_freelancer + $examsUser->fee_paid;
                $user->is_made_deposite = 1;
                $user->update();
                $adminId = User::select('id')->where('role_id', \Constants\ConstUserTypes::Admin)->first();
                insertTransaction($examsUser->user_id, $adminId['id'], $examsUser->id, 'ExamsUser', \Constants\TransactionType::ExamFee, $examsUser->payment_gateway_id, $examsUser->fee_paid, 0, 0, 0, 0, $examsUser->id, $examsUser->zazpay_gateway_id);
            }
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
        $examsUser = ExamsUser::where('exam_status_id', \Constants\ExamStatus::ExamFeePaymentPending)->where('user_id', $authUser->id)->find($args['foreign_id']);
        $result = array();
        if (!empty($examsUser)) {
            $examsUser->payment_gateway_id = $args['payment_gateway_id'];
            $examsUser->update();
            if ($examsUser->exam->fee > 0) {
                $args['name'] = $args['description'] = "Skill Test Fee for " . $examsUser->exam->title . " " . $examsUser->exam_level->name . " in " . SITE_NAME;
                $args['amount'] = $examsUser->exam->fee;
                $args['id'] = $examsUser->id;
                $args['user_id'] = isset($args['user_id']) ? $args['user_id'] : $authUser->id;
                $args['notify_url'] = $_server_domain_url . '/ipn/process_ipn/ExamsUser/' . $examsUser->id . '/' . md5(SECURITY_SALT . $examsUser->id . SITE_NAME);
                $args['success_url'] = $_server_domain_url . '/exams/online_test/' . $examsUser->id . '?error_code=0';
                $args['cancel_url'] = $_server_domain_url . '/exams/' . $examsUser->exam_id . '/' . $examsUser->exam->slug . '?error_code=512';
                $result = Payment::processPayment($examsUser->id, $args, 'ExamsUser');
            } else {
                $examsUser->exam_status_id = \Constants\ExamStatus::FeePaidOrNotStarted;
                $examsUser->save();
                $result = $examsUser->toArray();
            }
        }
        return $result;
    }
}
