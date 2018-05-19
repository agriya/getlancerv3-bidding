<?php
/**
 * QuoteCreditPurchasePlan
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
 * QuoteCreditPurchasePlan
*/
class CreditPurchasePlan extends AppModel
{
    protected $table = 'credit_purchase_plans';
    protected $fillable = array(
        'name',
        'day_limit',
        'no_of_credits',
        'discount_percentage',
        'original_price',
        'is_active',
        'is_welcome_plan'
    );
    public $rules = array(
        'name' => 'sometimes|required',
        'no_of_credits' => 'sometimes|required',
        'price' => 'sometimes|required',
        'discount_percentage' => 'sometimes|required',
        'original_price' => 'sometimes|required',
    );
    public $qSearchFields = array(
        'name'
    );
    public function scopeFilter($query, $params = array())
    {
        parent::scopeFilter($query, $params);
    }
}
