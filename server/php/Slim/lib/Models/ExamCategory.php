<?php
/**
 * ExamCategory
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
 * ExamCategory
*/
class ExamCategory extends AppModel
{
    protected $table = 'exam_categories';
    protected $fillable = array(
        'name'
    );
    public $rules = array(
        'name' => 'sometimes|required',
        'exam_count' => 'sometimes|required',
    );
    public function exam()
    {
        return $this->hasMany('Models\Exam', 'id', 'exam_category_id ')->with('attachment', 'exam_level');
    }
}
