<?php
/**
 * Question
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
 * Question
*/
class Question extends AppModel
{
    protected $table = 'questions';
    protected $fillable = array(
        'question_category_id',
        'question',
        'info_tip',
        'is_active'
    );
    public $rules = array(
        'question_category_id' => 'sometimes|required',
        'question' => 'sometimes|required',
    );
    public function scopeFilter($query, $params = array())
    {
        parent::scopeFilter($query, $params);
        if (!empty($params['q'])) {
            $search = $params['q'];
            $query->orWhereHas('question_category', function ($q) use ($search) {
                $q->where('name', 'ilike', "%$search%");
            });
            $query->orWhere('question', 'ilike', "%$search%");
        }
        if (!empty($params['question_category_id'])) {
            $query->where('question_category_id', $params['question_category_id']);
        }
    }
    public function question_category()
    {
        return $this->belongsTo('Models\QuestionCategory', 'question_category_id', 'id');
    }
    public function exam_answer()
    {
        return $this->belongsTo('Models\ExamAnswer', 'id', 'question_id');
    }
    public function question_answer_options()
    {
        return $this->hasMany('Models\QuestionAnswerOptions', 'question_id', 'id');
    }
    protected static function boot()
    {
        parent::boot();
        self::created(function ($question) {
            /** Question category count updation**/
            Question::questionCategoryCountUpdation($question->question_category_id);
        });
        self::deleted(function ($question) {
            /** Question category count updation**/
            Question::questionCategoryCountUpdation($question->question_category_id);
        });
    }
    /**
     * Job Category Table count
     *
     * @params string $jobId
     *
     * @return Jobs
     */
    public function questionCategoryCountUpdation($questionCategoryId)
    {
        if (!empty($questionCategoryId)) {
            $question_count = Question::where('question_category_id', $questionCategoryId)->count();
            $questionCategory = QuestionCategory::find($questionCategoryId);
            $questionCategory->question_count = $question_count;
            $questionCategory->update();
        }
    }
}
