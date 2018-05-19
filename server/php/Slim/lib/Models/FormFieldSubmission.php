<?php
/**
 * FormFieldSubmission
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
 * FormFieldSubmission
*/
class FormFieldSubmission extends AppModel
{
    protected $table = 'form_field_submissions';
    protected $fillable = array(
        'field'
    );
    public $rules = array();
    public function form_field()
    {
        return $this->hasMany('Models\FormField', 'id', 'form_field_id')->with('input_types');
    }
}
