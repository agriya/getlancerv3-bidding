<?php
/**
 * QuoteFaqQuestionTemplate
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
 * QuoteFaqQuestionTemplate
*/
class QuoteFaqQuestionTemplate extends AppModel
{
    protected $table = 'quote_faq_question_templates';
    protected $fillable = array(
        'question',
        'is_active'
    );
    public $rules = array(
        'question' => 'sometimes|required',
    );
    public function scopeFilter($query, $params = array())
    {
        parent::scopeFilter($query, $params);
        if (!empty($params['q'])) {
            $query->where('question', 'ilike', '%' . $params['q'] . '%');
        }
        return $query;
    }
}
