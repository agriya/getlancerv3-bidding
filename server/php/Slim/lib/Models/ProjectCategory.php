<?php
/**
 * ProjectCategory
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
 * ProjectCategory
*/
class ProjectCategory extends AppModel
{
    protected $table = 'project_categories';
    protected $fillable = array(
        'name',
        'is_active',
        'icon_class'
    );
    public $rules = array(
        'name' => 'sometimes|required',
        'is_active' => 'sometimes|required|boolean',
    );
}
