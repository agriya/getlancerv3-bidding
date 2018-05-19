<?php
/**
 * ExamAnswer
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
 * ExamAnswer
*/
class ExamAnswer extends AppModel
{
    protected $table = 'exam_answers';
    protected $fillable = array(
        'exams_user_id',
        'user_answer',
        'is_exam_completed'
    );
    public $rules = array(
        'question_id' => 'sometimes|required',
        'exam_id' => 'sometimes|required',
    );
    public function user()
    {
        return $this->belongsTo('Models\User', 'user_id', 'id')->with('attachment');
    }
    public function exam()
    {
        return $this->belongsTo('Models\Exam', 'exam_id', 'id')->with('exam_level');
    }
    public function question()
    {
        return $this->belongsTo('Models\Question', 'question_id', 'id');
    }
    public function exams_user()
    {
        return $this->belongsTo('Models\ExamsUser', 'exams_user_id', 'id');
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
        if (!empty($params['exams_user_id'])) {
            $query->where('exams_user_id', $params['exams_user_id']);
        }
        if (!empty($params['question_id'])) {
            $query->where('question_id', $params['question_id']);
        }
    }
    protected static function boot()
    {
        global $authUser;
        parent::boot();
        self::creating(function ($examAnswer) use ($authUser) {
            $examsUser = ExamsUser::select('user_id', 'exam_status_id', 'exam_id')->where('id', $examAnswer->exams_user_id)->first();
            $examAnswer->exam_id = $examsUser->exam_id;
            if ((($authUser['role_id'] == \Constants\ConstUserTypes::Admin) || $authUser['id'] == $examsUser->user_id) && ($examsUser->exam_status_id == \Constants\ExamStatus::Inprogress || $examsUser->exam_status_id == \Constants\ExamStatus::FeePaidOrNotStarted)) {
                return true;
            } else {
                return false;
            }
        });
    }
    /**
     * update Mark And Status
     *
     * @params string $exams_user_id , $question_id
     *
     */
    public function updateMarkAndStatus($exams_user_id, $question_id = '', $answer = '')
    {
        if (!empty($question_id)) {
            $examAnswer = ExamAnswer::join('question_answer_options', 'exam_answers.question_id', '=', 'question_answer_options.question_id')->where('exam_answers.exams_user_id', $exams_user_id)->where('exam_answers.question_id', $question_id)->where('question_answer_options.option', '=', $answer)->where('question_answer_options.is_correct_answer', true)->count();
            $examAnswer = ExamAnswer::where('exams_user_id', $exams_user_id)->where('exam_answers.question_id', $question_id)->update(['total_mark' => $examAnswer]);
        } else {
            $examAnswer = ExamAnswer::where('exams_user_id', $exams_user_id);
            $examId = $examAnswer->select('exam_id')->first();
            $exam = Exam::select('exams_question_count')->find($examId->exam_id);
            $total_mark = $examAnswer->sum('total_mark');
            $mark_percentage = ((1 / $exam->exams_question_count) * $total_mark) * 100;
            $pass_mark_percentage = ExamsUser::where('id', $exams_user_id)->where('pass_mark_percentage', '<=', $mark_percentage)->first();
            if ($pass_mark_percentage) {
                ExamsUser::where('id', $exams_user_id)->update(['total_mark' => $total_mark, 'exam_status_id' => \Constants\ExamStatus::Passed]);
                $exam->exams_user_passed_count = $exam->exams_user_passed_count + 1;
                $exam->update();
                ExamsUser::_updatePercentileRank($examId->exam_id);
            } else {
                ExamsUser::where('id', $exams_user_id)->update(['total_mark' => $total_mark, 'exam_status_id' => \Constants\ExamStatus::Failed]);
            }
        }
    }
}
