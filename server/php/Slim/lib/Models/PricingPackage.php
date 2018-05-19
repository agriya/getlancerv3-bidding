<?php
/**
 * PricingPackage
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
 * PricingPackage
*/
class PricingPackage extends AppModel
{
    protected $table = 'pricing_packages';
    protected $fillable = array(
        'name',
        'description',
        'global_price',
        'participant_commision',
        'maximum_entry_allowed',
        'features',
        'is_active'
    );
    public $rules = array(
        'name' => 'sometimes|required',
        'description' => 'sometimes|required',
        'global_price' => 'sometimes|required',
        'participant_commision' => 'sometimes|required',
        'maximum_entry_allowed' => 'sometimes|required',
    );
    public function scopeFilter($query, $params = array())
    {
        parent::scopeFilter($query, $params);
        if (!empty($params['q'])) {
            $search = $params['q'];
            $query->orWhere('name', 'ilike', "%$search%");
            $query->orWhere('description', 'ilike', "%$search%");
            $query->orWhere('globalPrice', 'ilike', "%$search%");
        }
    }
    public function contest_types_pricing_package()
    {
        return $this->hasOne('Models\ContestTypesPricingPackage', 'pricing_package_id', 'id');
    }
}
