<?php
/**
 * Ip
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

class Ip extends AppModel
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'ips';
    public function city()
    {
        return $this->belongsTo('Models\City', 'city_id', 'id')->select('id', 'name');
    }
    public function state()
    {
        return $this->belongsTo('Models\State', 'state_id', 'id')->select('id', 'name');
    }
    public function country()
    {
        return $this->belongsTo('Models\Country', 'country_id', 'id')->select('id', 'iso_alpha2', 'name');
    }
    public function timezone()
    {
        return $this->belongsTo('Models\Timezone', 'timezone_id', 'id');
    }
    public function scopeFilter($query, $params = array())
    {
        parent::scopeFilter($query, $params);
        if (!empty($params['city_id'])) {
            $query->where('city_id', $params['city_id']);
        }
        if (!empty($params['state_id'])) {
            $query->where('state_id', $params['state_id']);
        }
        if (!empty($params['country_id'])) {
            $query->where('country_id', $params['country_id']);
        }
        if (!empty($params['timezone_id'])) {
            $query->where('timezone_id', $params['timezone_id']);
        }
         if (!empty($params['q'])) {
             $query->orWhere('host', 'ilike', '%' . $params['q'] . '%');
             $query->orWhere('ip', 'ilike', '%' . $params['q'] . '%');    
        }
    }
}
