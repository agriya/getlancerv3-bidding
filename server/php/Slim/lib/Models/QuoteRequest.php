<?php
/**
 * QuoteRequest
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
 * QuoteRequest
*/
class QuoteRequest extends AppModel
{
    protected $table = 'quote_requests';
    protected $fillable = array(
        'quote_category_id',
        'quote_service_id',
        'title',
        'description',
        'best_day_time_for_work',
        'full_address',
        'address',
        'city_name',
        'state_name',
        'country_iso2',
        'zip_code',
        'latitude',
        'longitude',
        'phone_no',
        'is_send_request_to_other_service_providers',
        'is_request_for_buy',
        'is_archived'
    );
    public $rules = array(
        'title' => 'sometimes|required',
        'description' => 'sometimes|required',
        'best_day_time_for_work' => 'sometimes|required',
        'city_id' => 'sometimes|required|numeric',
        'state_id' => 'sometimes|required|numeric',
        'quote_category_id' => 'sometimes|numeric|min:1',
        'is_archived' => 'sometimes|boolean',
        'is_send_request_to_other_service_providers' => 'sometimes|boolean',
        'latitude' => 'sometimes|required',
        'longitude' => 'sometimes|required',
    );
    public function quote_category()
    {
        return $this->belongsTo('Models\QuoteCategory', 'quote_category_id', 'id');
    }
    public function foreign_quote_category()
    {
        return $this->belongsTo('Models\QuoteCategory', 'quote_category_id', 'id')->select('id', 'name');
    }
    public function user()
    {
        return $this->belongsTo('Models\User', 'user_id', 'id');
    }
    public function quote_service()
    {
        return $this->belongsTo('Models\QuoteService', 'quote_service_id', 'id');
    }
    public function city()
    {
        return $this->belongsTo('Models\City', 'city_id', 'id')->select('id', 'name', 'slug');
    }
    public function state()
    {
        return $this->belongsTo('Models\State', 'state_id', 'id')->select('id', 'name');
    }
    public function country()
    {
        return $this->belongsTo('Models\Country', 'country_id', 'id')->select('id', 'name', 'iso_alpha2');
    }
    public function form_field_submission()
    {
        return $this->hasMany('Models\FormFieldSubmission', 'foreign_id', 'id')->where('class', 'QuoteRequest')->with('form_field');
    }
    public function quote_bids()
    {
        return $this->hasMany('Models\QuoteBid', 'quote_request_id', 'id')->with('quote_service', 'quote_status');
    }
    public function activity()
    {
        return $this->belongsTo('Models\QuoteRequest', 'id', 'id')->select('id');
    }
    protected static function boot()
    {
        global $authUser;
        parent::boot();
        $allowuUserTypes = array(
            \Constants\ConstUserTypes::Admin,
            \Constants\ConstUserTypes::User,
            \Constants\ConstUserTypes::Employer
        );
        self::deleting(function ($data) use ($authUser, $allowuUserTypes) {
            if (in_array($authUser['role_id'], $allowuUserTypes) || ($authUser['id'] == $data->user_id)) {
                return true;
            }
            return false;
        });
    }
    public function scopeFilter($query, $params = array())
    {
        parent::scopeFilter($query, $params);
        if (!empty($params['user_id'])) {
            $query->where('user_id', $params['user_id']);
        }
        if (isset($params['is_request_for_buy']) && ($params['is_request_for_buy']) == 1) {
            $query->where('is_request_for_buy', $params['is_request_for_buy']);
        } elseif (isset($params['is_request_for_buy'])) {
            $query->where('is_request_for_buy', $params['is_request_for_buy']);
        }
        if (isset($params['is_archived']) && ($params['is_archived']) == 1) {
            $query->where('is_archived', $params['is_archived']);
        } elseif (isset($params['is_archived'])) {
            $query->where('is_archived', $params['is_archived']);
        }
        if (!empty($params['q'])) {
            $search = $params['q'];
            $query->orWhereHas('quote_category', function ($q) use ($search) {
                $q->where('name', 'ilike', "%$search%");
            });
            $query->orWhereHas('quote_bids.quote_service', function ($q) use ($search) {
                $q->where('business_name', 'ilike', "%$search%");  
            });
            $query->orWhereHas('user', function ($q) use ($search) {
                $q->where('username', 'ilike', "%$search%");
            });
            $query->orwhere('title', 'ilike', "%$search%");
        }
    }
}
