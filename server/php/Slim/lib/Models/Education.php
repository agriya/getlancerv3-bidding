<?php
/**
 * Education
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
 * Education
*/
class Education extends AppModel
{
    protected $table = 'educations';
    protected $fillable = array(
        'country_id',
        'title',
        'from_year',
        'to_year'
    );
    public $rules = array(
        'country_id' => 'sometimes|required',
        'title' => 'sometimes|required',
        'from_year' => 'sometimes|required',
        'to_year' => 'sometimes|required',
    );
    public $qSearchFields = array(
        'title'
    );
    public function user()
    {
        return $this->belongsTo('Models\User', 'user_id', 'id')->with('attachment');
    }
    public function country()
    {
        return $this->belongsTo('Models\Country', 'country_id', 'id')->select('id', 'iso_alpha2', 'name');
    }
    public function scopeFilter($query, $params = array())
    {
        $authUser = array();
        global $authUser;
        parent::scopeFilter($query, $params);
        if (!empty($params['user_id'])) {
            $query->where('user_id', $params['user_id']);
        }
    }
    protected static function boot()
    {
        global $authUser;
        self::saving(function ($data) use ($authUser) {
            if (($authUser['role_id'] == \Constants\ConstUserTypes::Admin) || ($authUser['id'] == $data->user_id)) {
                return true;
            }
            return false;
        });
        self::deleting(function ($data) use ($authUser) {
            if (($authUser['role_id'] == \Constants\ConstUserTypes::Admin) || ($authUser['id'] == $data->user_id)) {
                return true;
            }
            return false;
        });
        self::created(function ($education) {
            User::where('id', $education->user_id)->increment('education_count');
        });
        self::deleted(function ($education) {
            User::where('id', $education->user_id)->decrement('education_count');
        });
    }
}
