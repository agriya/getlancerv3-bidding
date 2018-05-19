<?php
/**
 * ProjectBidInvoiceItems
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
 * ProjectBidInvoiceItems
*/
class ProjectBidInvoiceItems extends AppModel
{
    protected $table = 'project_bid_invoice_items';
    protected $fillable = array(
        'amount',
        'description'
    );
    public $rules = array();
}
