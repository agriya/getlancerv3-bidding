<?php
/**
 * WorkProfile
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
 * WorkProfile
*/
class WorkProfile extends AppModel
{
    protected $table = 'work_profiles';
    protected $fillable = array(
        'title',
        'description',
        'from_month_year',
        'to_month_year',
        'company',
        'currently_working'
    );
    public $rules = array(
        'title' => 'sometimes|required',
        'description' => 'sometimes|required',
        'from_month_year' => 'sometimes|required',
        'to_month_year ' => 'sometimes|required',
    );
    public $qSearchFields = array(
        'title'
    );
    public function user()
    {
        return $this->belongsTo('Models\User', 'user_id', 'id')->with('attachment');
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
        self::created(function ($workProfile) {
            User::where('id', $workProfile->user_id)->increment('work_profile_count');
        });
        self::deleted(function ($workProfile) {
            User::where('id', $workProfile->user_id)->decrement('work_profile_count');
        });
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
}
