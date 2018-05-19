<?php
/**
 * Certification
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
 * Certification
*/
class Certification extends AppModel
{
    protected $table = 'certifications';
    protected $fillable = array(
        'title',
        'conferring_organization',
        'description',
        'year'
    );
    public $rules = array(
        'title' => 'sometimes|required',
        'conferring_organization' => 'sometimes|required',
        'description' => 'sometimes|required',
        'year' => 'sometimes|required',
    );
    public $qSearchFields = array(
        'title'
    );
    public function user()
    {
        return $this->belongsTo('Models\User', 'user_id', 'id')->with('attachment');
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
        self::created(function ($certificate) {
            User::where('id', $certificate->user_id)->increment('certificate_count');
        });
        self::deleted(function ($certificate) {
            User::where('id', $certificate->user_id)->decrement('certificate_count');
        });
    }
}
