<?php
/**
 * Coupon
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
 * Coupon
*/
class Coupon extends AppModel
{
    protected $table = 'coupons';
    protected $fillable = array(
        'coupon_code',
        'max_number_of_time_can_use',
        'max_number_of_time_can_use_per_user',
        'discount',
        'discount_type_id',
        'min_amount',
        'coupon_expiry_date',
        'is_active',
    );
    public $qSearchFields = array(
        'coupon_code'
    );
    public $rules = array(
        'couponCode' => 'sometimes|required',
        'max_number_of_time_can_use' => 'sometimes|required',
        'max_number_of_time_can_use_per_user' => 'sometimes|required',
        'discount' => 'sometimes|required',
        'discount_type_id' => 'sometimes|required',
        'min_amount' => 'sometimes|required',
        'coupon_expiry_date' => 'sometimes|required',
        'is_active' => 'sometimes|required',
    );
    public function discount_type()
    {
        return $this->belongsTo('Models\DiscountType', 'discount_type_id', 'id');
    }
    public function calculateDiscountPrice($original_price, $discount, $discount_type_id)
    {
        if ($discount_type_id == \Constants\DiscountTypes::Percentage) {
            $discount_price = ($discount / 100) * $original_price;
            $original_price = $original_price - $discount_price;
        } elseif ($discount_type_id == \Constants\DiscountTypes::Amount) {
            $original_price = $original_price - $discount;
        }
        return $original_price;
    }
    public function updateCouponCount($id)
    {
        $coupon = Coupon::find($id);
        if (!empty($coupon)) {
            $coupon->coupon_used_count = $coupon->coupon_used_count + 1;
            if ($coupon->coupon_used_count >= $coupon->max_number_of_time_can_use) {
                $coupon->is_active = 0;
            }
            $coupon->save();
        }
    }
    public function verifyAndCouponCode($coupon_code, $amount)
    {
        $result['error'] = array(
            'code' => 1
        );
        $coupon = Coupon::where('coupon_code', $coupon_code)->where('is_active', 1)->where('min_amount', '<=', $amount)->first();
        if (!empty($coupon)) {
            $maxNumberOfTimeCanUsePerUser = Transaction::where('coupon_id', $coupon->id)->count();
            if ($maxNumberOfTimeCanUsePerUser >= $coupon->max_number_of_time_can_use_per_user) {
                return $result;
            }
            $result['data'] = $coupon->toArray();
            $result['error'] = array(
                'code' => 0
            );
        }
        return $result;
    }
}
