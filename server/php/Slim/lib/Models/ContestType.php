<?php
/**
 * ContestType
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
 * ContestType
*/
class ContestType extends AppModel
{
    protected $table = 'contest_types';
    protected $fillable = array(
        'name',
        'description',
        'minimum_prize',
        'maximum_entries_allowed',
        'maximum_entries_allowed_per_user',
        'blind_fee',
        'private_fee',
        'featured_fee',
        'highlight_fee',
        'site_revenue',
        'is_active',
        'is_template',
        'is_blind',
        'is_featured'
    );
    public $rules = array(
        'name' => 'sometimes|required',
        'description' => 'sometimes|required',
        'minimum_prize' => 'sometimes|required',
        'maximum_entries_allowed' => 'sometimes|required',
        'maximum_entries_allowed_per_user' => 'sometimes|required',
    );
    public function scopeFilter($query, $params = array())
    {
        parent::scopeFilter($query, $params);
        if (!empty($params['q'])) {
            $search = $params['q'];
            $query->orWhere('name', 'ilike', "%$search%");
            $query->orWhere('description', 'ilike', "%$search%");
        }
    }
    public function form_field_groups()
    {
        return $this->hasMany('Models\FormFieldGroup', 'foreign_id', 'id')->where('class', 'ContestType')->with('form_fields');
    }
    public function resource()
    {
        return $this->belongsTo('Models\Resource', 'resource_id', 'id');
    }
    public function attachment()
    {
        return $this->hasOne('Models\Attachment', 'foreign_id', 'id')->where('class', 'ContestType');
    }
}
