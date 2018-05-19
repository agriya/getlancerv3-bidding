<?php
/**
 * QuestionCategory
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
 * QuestionCategory
*/
class QuestionAnswerOptions extends AppModel
{
    protected $table = 'question_answer_options';
    public $rules = array(
        'option' => 'sometimes|required',
    );
}
