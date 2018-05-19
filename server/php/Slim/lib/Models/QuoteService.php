<?php
/**
 * QuoteService
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
 * QuoteService
*/
class QuoteService extends AppModel
{
    protected $table = 'quote_services';
    protected $fillable = array(
        'business_name',
        'how_does_your_service_stand_out',
        'full_address',
        'address',
        'city_name',
        'state_name',
        'country_iso2',
        'zip_code',
        'latitude',
        'longitude',
        'website_url',
        'phone_number',
        'is_service_provider_travel_to_customer_place',
        'service_provider_travels_upto',
        'is_customer_travel_to_me',
        'is_over_phone_or_internet',
        'is_active',
        'year_founded',
        'number_of_employees',
        'what_do_you_enjoy_about_the_work_you_do',
        'is_admin_suspend'
    );
    public $rules = array(
        'user_id' => 'sometimes|required|numeric',
        'business_name' => 'sometimes|required',
        'how_does_your_service_stand_out' => 'sometimes|required',
        'address' => 'sometimes|required',
        'city_id' => 'sometimes|required|numeric',
        'state_id' => 'sometimes|required|numeric',
        'country_id' => 'sometimes|required|numeric',
        'city_name' => 'sometimes|required',
        'state_name' => 'sometimes|required',
        'country_iso2' => 'sometimes|required',
        'latitude' => 'sometimes|required|numeric',
        'longitude' => 'sometimes|required|numeric',
        'website_url' => 'sometimes|url',
        'phone_number' => 'sometimes|required',
        'is_service_provider_travel_to_customer_place' => 'sometimes|required',
        'is_customer_travel_to_me' => 'sometimes|required',
        'is_over_phone_or_internet' => 'sometimes|required',
        'is_active' => 'sometimes|required',
        'year_founded' => 'sometimes|required|min:4|date_format:"Y"',
    );
    public function user()
    {
        return $this->belongsTo('Models\User', 'user_id', 'id')->with('attachment');
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
    public function foreign_reviews()
    {
        return $this->morphMany('Models\Review', 'foreign_review');
    }
    public function foreign_messages()
    {
        return $this->morphMany('Models\Message', 'foreign_message');
    }
    public function foreign_views()
    {
        return $this->morphMany('Models\View', 'foreign_view');
    }
    public function foreign_transactions()
    {
        return $this->morphMany('Models\Transaction', 'foreign_transaction');
    }
    public function foreign_flags()
    {
        return $this->morphMany('Models\Flag', 'foreign_flag');
    }
    public function attachment()
    {
        return $this->hasOne('Models\Attachment', 'foreign_id', 'id')->where('class', 'QuoteService');
    }
    public function quote_categories_quote_services()
    {
        return $this->hasMany('Models\QuoteCategoryQuoteService', 'quote_service_id')->with('quote_categories');
    }
    public function foreign_models()
    {
        return $this->morphMany('Models\Activity', 'foreign_model');
    }
    public function foreign_review_models()
    {
        return $this->morphMany('Models\Review', 'foreign_model');
    }
    public function scopeFilter($query, $params = array())
    {
        parent::scopeFilter($query, $params);
        if (!empty($params['user_id'])) {
            $query->where('user_id', $params['user_id']);
        }
        if (!empty($params['categories'])) {
            $quote_category_id = explode(',', $params['categories']);
            $quote_service_id = array();
            $quoteCategoriesQuoteServices = QuoteCategoryQuoteService::select('quote_service_id')->distinct()->whereIn('quote_category_id', $quote_category_id)->get()->toArray();
            foreach ($quoteCategoriesQuoteServices as $quoteCategoriesQuoteService) {
                $quote_service_id[] = $quoteCategoriesQuoteService['quote_service_id'];
            }
            $query->whereIn('id', $quote_service_id);
        }
        if (!empty($params['q'])) {
            $query->where(function ($q1) use ($params) {
                $search = $params['q'];
                $q1->orWhereHas('user', function ($q) use ($search) {
                    $q->where('users.username', 'ilike', "%$search%");
                });
                $q1->orwhere('quote_services.business_name', 'ilike', "%$search%");
            });
        }
    }
    protected static function boot()
    {
        global $authUser;
        parent::boot();
        self::created(function ($data) use ($authUser) {
            User::where('id', $data->user_id)->increment('quote_service_count', 1);
        });
        $allowuUserTypes = array(
            \Constants\ConstUserTypes::Admin,
            \Constants\ConstUserTypes::User,
            \Constants\ConstUserTypes::Freelancer
        );
        self::saving(function ($data) use ($authUser, $allowuUserTypes) {
            if (in_array($authUser['role_id'], $allowuUserTypes) || ($authUser['id'] == $data->user_id)) {
                QuoteService::updateQuoteServiceCount($data->user_id);
                return true;
            }
            return false;
        });
        self::deleting(function ($data) use ($authUser, $allowuUserTypes) {
            if (in_array($authUser['role_id'], $allowuUserTypes) || ($authUser['id'] == $data->user_id)) {
                return true;
            }
            return false;
        });
        self::deleted(function ($data) use ($authUser) {
            QuoteService::updateQuoteServiceCount($data->user_id);
        });
    }
    public function updateQuoteServiceCount($user_id)
    {
        $serviceCount = QuoteService::where('user_id', $user_id)->count();
        $user = User::where('id', $user_id)->first();
        $user->quote_service_count = $serviceCount;
        $user->update();
    }
    public function stats()
    {
        $result = array();
        $result['quote_services'] = QuoteService::where('is_active', 1)->count();
        $result['quote_requests'] = QuoteRequest::count();
        $result['quote_bids'] = QuoteBid::where('quote_status_id', '!=', \Constants\QuoteStatus::NewBid)->count();
        return $result;
    }
}
