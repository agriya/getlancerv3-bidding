<?php
/**
 * QuoteRequestFormField
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
 * QuoteRequestFormField
*/
class QuoteRequestFormField extends AppModel
{
    protected $table = 'quote_request_form_fields';
    protected $fillable = array(
        'form_field_id',
        'quote_request_id',
        'response'
    );
    public $rules = array(
        'form_field_id' => 'sometimes|required',
        'quote_bid_id' => 'sometimes|required',
    );
    public function form_field()
    {
        return $this->belongsTo('Models\FormField', 'form_field_id', 'id');
    }
    public function quote_request()
    {
        return $this->belongsTo('Models\QuoteRequest', 'quote_request_id', 'id');
    }
}
