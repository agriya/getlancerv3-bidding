<?php
/**
 * ExamsQuestion
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
 * ExamsQuestion
*/
class ExamsQuestion extends AppModel
{
    protected $table = 'exams_questions';
    protected $fillable = array(
        'exam_id',
        'question_id',
        'display_order'
    );
    public $rules = array(
        'exam_id' => 'sometimes|required',
        'question_id' => 'sometimes|required',
    );
    public function exam()
    {
        return $this->belongsTo('Models\Exam', 'exam_id', 'id')->with('exam_level');
    }
    public function question()
    {
        return $this->belongsTo('Models\Question', 'question_id', 'id');
    }
    public function scopeFilter($query, $params = array())
    {
        parent::scopeFilter($query, $params);
        if (!empty($params['question_id'])) {
            $query->where('question_id', $params['question_id']);
        }
        if (!empty($params['exam_id'])) {
            $query->where('exam_id', $params['exam_id']);
        }
    }
    protected static function boot()
    {
        parent::boot();
        self::created(function ($examsQuestion) {
            ExamsQuestion::updateExamsQuestionCount($examsQuestion->exam_id, $examsQuestion->question_id);            
        });
        self::deleted(function ($examsQuestion) {
            ExamsQuestion::updateExamsQuestionCount($examsQuestion->exam_id, $examsQuestion->question_id);
        });
    }
    public function updateExamsQuestionCount($exam_id, $question_id)
    {
        $exams_count = ExamsQuestion::where('exam_id', $exam_id)->count();
        Exam::where('id', $exam_id)->update(['exams_question_count' => $exams_count]);
        $question_count = ExamsQuestion::where('question_id', $question_id)->count();
        Question::where('id', $question_id)->update(['exams_question_count' => $question_count]);
    }
}
