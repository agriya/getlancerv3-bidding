<?php
/**
 * QuoteFaqAnswer
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
 * QuoteFaqAnswer
*/
class QuoteFaqAnswer extends AppModel
{
    protected $table = 'quote_faq_answers';
    protected $fillable = array(
        'quote_service_id',
        'quote_faq_question_template_id',
        'question',
        'answer'
    );
    public $rules = array(
        'user_id' => 'sometimes|required',
        'quote_service_id' => 'sometimes|required',
        'answer' => 'sometimes|required',
    );
    public function user()
    {
        return $this->belongsTo('Models\User', 'user_id', 'id');
    }
    public function quote_service()
    {
        return $this->belongsTo('Models\QuoteService', 'quote_service_id', 'id')->with('user');
    }
    public function quote_faq_question_template()
    {
        return $this->belongsTo('Models\QuoteFaqQuestionTemplate', 'quote_faq_question_template_id', 'id');
    }
    public function quote_user_faq_question()
    {
        return $this->belongsTo('Models\QuoteUserFaqQuestion', 'quote_user_faq_question_id', 'id');
    }
    public function scopeFilter($query, $params = array())
    {
        parent::scopeFilter($query, $params);
        if (!empty($params['quote_service_id'])) {
            $query->where('quote_service_id', '=', $params['quote_service_id']);
        }
        if (!empty($params['q'])) {
            $search = $params['q'];
            $query->orWhereHas('quote_service', function ($q) use ($search) {
                $q->where('business_name', 'ilike', "%$search%");
            });
            $query->orWhereHas('quote_service.user', function ($q) use ($search) {
                $q->where('username', 'ilike', "%$search%");
            });
            $query->orWhereHas('quote_user_faq_question', function ($q) use ($search) {
                $q->where('question', 'ilike', "%$search%");
            });
            $query->orwhere('answer', 'ilike', "%$search%");
        }
    }
}
