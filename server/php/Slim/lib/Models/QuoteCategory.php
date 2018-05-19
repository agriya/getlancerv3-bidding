<?php
/**
 * QuoteCategory
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
 * QuoteCategory
*/
class QuoteCategory extends AppModel
{
    protected $table = 'quote_categories';
    protected $fillable = array(
        'parent_category_id',
        'name',
        'is_active',
        'credit_point_for_sending_quote',
        'description',
        'is_featured'
    );
    public $rules = array(
        'name' => 'sometimes|required'
    );
    public function scopeFilter($query, $params = array())
    {
        parent::scopeFilter($query, $params);
        if (!empty($params['display_type'])) {
            if ($params['display_type'] == 'hierarchical') {
                $query->with(['children' => function ($q) use ($params) {
                    return $q->childFilter($params);
                }
                ])->where('parent_category_id', null);
            } elseif ($params['display_type'] == 'parent') {
                $query->where('parent_category_id', null);
            }
        }
        if (!empty($params['q'])) {
            $query->where('name', 'ilike', '%' . $params['q'] . '%');
        }
        if (!empty($params['parent_category_id'])) {
            $query->where('parent_category_id', $params['parent_category_id']);
        }
        if (!empty($params['is_featured'])) {
            $query->where('is_featured', '=', $params['is_featured']);
        }
        return $query;
    }
    public function scopeChildFilter($query, $params = array())
    {
        parent::scopeFilter($query, $params);
        return $query;
    }
    public function parent_category()
    {
        return $this->belongsTo('Models\QuoteCategory', 'parent_category_id', 'id')->where('parent_category_id', null);
    }
    public function child()
    {
        return $this->hasMany('Models\QuoteCategory', 'parent_category_id', 'id');
    }
    public function children()
    {
        return $this->child()->with('children');
    }
    public function attachment()
    {
        return $this->hasOne('Models\Attachment', 'foreign_id', 'id')->where('class', 'QuoteCategory');
    }
    public function form_field_groups()
    {
        return $this->hasMany('Models\FormFieldGroup', 'foreign_id', 'id')->where('class', 'QuoteCategory')->with('form_fields');
    }
}
