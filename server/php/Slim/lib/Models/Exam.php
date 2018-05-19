<?php
/**
 * Exam
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
 * Exam
*/
class Exam extends AppModel
{
    protected $table = 'exams';
    protected $fillable = array(
        'question_display_type_id',
        'topics_covered',
        'instructions',
        'splash_content',
        'title',
        'duration',
        'fee',
        'pass_mark_percentage',
        'additional_time_to_expire',
        'exam_level_id',
        'is_active',
        'is_recommended',
        'exam_category_id'
    );
    public $rules = array(
        'question_display_type_id' => 'sometimes|required',
        'exam_level_id' => 'sometimes|required',
        'title' => 'sometimes|required',
        'duration' => 'sometimes|required',
        'pass_mark_percentage' => 'sometimes|required',
    );
    public $hidden = array(
        'exams_user_count',
        'total_fee_received',
        'exams_user_passed_count'
    );
    public $qSearchFields = array(
        'title'
    );
    public function question_display_type()
    {
        return $this->belongsTo('Models\QuestionDisplayType', 'question_display_type_id', 'id');
    }
    public function exam_level()
    {
        return $this->belongsTo('Models\ExamLevel', 'exam_level_id', 'id');
    }
    public function parent_exam()
    {
        return $this->belongsTo('Models\Exam', 'parent_exam_id', 'id');
    }
    public function foreign_views()
    {
        return $this->morphMany('Models\View', 'foreign_view');
    }
    public function scopeFilter($query, $params = array())
    {
        parent::scopeFilter($query, $params);
        if (!empty($params['exam_level_id'])) {
            $query->where('exam_level_id', $params['exam_level_id']);
        }
        if (!empty($params['parent_exam_id'])) {
            $query->where('parent_exam_id', $params['parent_exam_id']);
        }
        if (!empty($params['question_display_type_id'])) {
            $query->where('question_display_type_id', $params['question_display_type_id']);
        }
        if (!empty($params['exam_category_id'])) {
            $query->where('exam_category_id', $params['exam_category_id']);
        }
        if (!empty($params['is_recommended'])) {
            $query->where('is_recommended', $params['is_recommended']);
        }
    }
    public function attachment()
    {
        return $this->hasOne('Models\Attachment', 'foreign_id', 'id')->where('class', 'Exam');
    }
    public function exams_users()
    {
        return $this->belongsTo('Models\ExamsUser', 'id', 'exam_id')->where('exam_status_id', \Constants\ExamStatus::Passed);
    }
    public function parent_exams_users()
    {
        return $this->hasMany('Models\ExamsUser', 'exam_id', 'id');
    }
    public function parent()
    {
        return $this->hasMany('Models\Exam', 'id', 'parent_exam_id')->with('parent_exams_users');
    }
    public function exam_categories()
    {
        return $this->belongsTo('Models\ExamCategory', 'exam_category_id', 'id');
    }
    protected static function boot()
    {
        $authUser = array();
        global $authUser;
        parent::boot();
        self::created(function ($data) use ($authUser) {
            /** Exam category count updation**/
            Exam::examCategoryCountUpdation($data->exam_category_id);
        });
        self::deleted(function ($data) use ($authUser) {
            /** Exam category count updation**/
            Exam::examCategoryCountUpdation($data->exam_category_id);
        });
    }
    /**
     * Exam Category Table count
     *
     * @params string $ExamId
     *
     * @return Exams
     */
    public function examCategoryCountUpdation($examCategoryId = '')
    {
        if (!empty($examCategoryId)) {
            $exam_count = Exam::where('exam_category_id', $examCategoryId)->count();
            $examCategory = ExamCategory::find($examCategoryId);
            $examCategory->exam_count = $exam_count;
            $examCategory->update();
        }
    }
}
