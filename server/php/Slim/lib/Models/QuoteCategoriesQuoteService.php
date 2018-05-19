<?php
/**
 * QuoteCategoriesQuoteService
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
 * QuoteCategoriesQuoteService
*/
class QuoteCategoriesQuoteService extends AppModel
{
    protected $table = 'quote_categories_quote_services';
    public $rules = array();
    public function quote_categories()
    {
        return $this->belongsTo('Models\QuoteCategory', 'quote_category_id', 'id')->with('attachment');
    }
    public function quote_service()
    {
        return $this->belongsTo('Models\QuoteService', 'quote_service_id', 'id');
    }
    public function scopeFilter($query, $params = array())
    {
        parent::scopeFilter($query, $params);
        if (!empty($params['quote_category_id'])) {
            $query->where('quote_category_id', $params['quote_category_id']);
        }
        if (!empty($params['quote_service_id'])) {
            $query->where('quote_service_id', $params['quote_service_id']);
        }
        if (!empty($params['display_type']) && $params['display_type'] == 'child') {
            $query->whereHas('quote_categories', function ($q) {
                $q->whereNotNull('parent_category_id');
            });
        }
    }
}
