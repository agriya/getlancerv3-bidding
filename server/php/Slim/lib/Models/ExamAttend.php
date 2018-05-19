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
 * ExamAttend
*/
class ExamAttend extends AppModel
{
    protected $table = 'exam_attends';
    public $rules = array(
        'user_id' => 'sometimes|required',
        'exams_user_id' => 'sometimes|required',
        'exam_id' => 'sometimes|required',
    );
}
