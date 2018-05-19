<?php
/**
 * DiscountType
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
 * DiscountType
*/
class DiscountType extends AppModel
{
    protected $table = 'discount_types';
    protected $fillable = array(
        'id',
        'created_at',
        'updated_at',
        'name',
    );
    public $rules = array();
}
