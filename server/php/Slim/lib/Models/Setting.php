<?php
/**
 * Setting
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

class Setting extends AppModel
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'settings';
    protected $fillable = array(
        'name',
        'value'
    );
    public function scopeFilter($query, $params = array())
    {
        parent::scopeFilter($query, $params);
        global $authUser;
        if (!empty($params['setting_category_id'])) {
            $query->where('setting_category_id', $params['setting_category_id']);
        }
        if (empty($params['setting_category_id']) && ((!empty($authUser->role_id) && $authUser->role_id != \Constants\ConstUserTypes::Admin))) {
            $query->where(function ($q1) use ($params) {
                $q1->where('is_send_to_frontend', 1);
                $q1->orwhere('setting_category_id', '!=', 0);
            });
        }
    }
    public function setting_category()
    {
        return $this->belongsTo('Models\SettingCategory', 'setting_category_id', 'id');
    }
}
