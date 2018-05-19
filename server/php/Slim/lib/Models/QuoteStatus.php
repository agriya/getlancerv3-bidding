<?php
/**
 * QuoteStatus
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
 * QuoteStatus
*/
class QuoteStatus extends AppModel
{
    protected $table = 'quote_statuses';
    private $rules = array();
    public function getQuoteStatusSlugNameById($id)
    {
        $name = '';
        $quoteStatus = QuoteStatus::select('name')->where('id', $id)->first();
        if (!empty($quoteStatus)) {
            $name = \Inflector::slug(strtolower($quoteStatus->name), '-');
        }
        return $name;
    }
}
