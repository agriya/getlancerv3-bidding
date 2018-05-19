<?php
/**
 * QuoteCategoryQuoteService
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
 * QuoteCategoryQuoteService
*/
class QuoteCategoryQuoteService extends AppModel
{
    protected $table = 'quote_categories_quote_services';
    public function quote_categories()
    {
        return $this->belongsTo('Models\QuoteCategory', 'quote_category_id', 'id');
    }
}
