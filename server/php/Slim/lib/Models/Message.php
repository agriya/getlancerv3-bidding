<?php
/**
 * Message
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

use Illuminate\Database\Eloquent\Relations\Relation;

/*
 * Message
*/
class Message extends AppModel
{
    protected $table = 'messages';
    protected $fillable = array(
        'parent_id',
        'foreign_id',
        'class',
        'subject',
        'message',
        'image',
        'is_private'
    );
    public $rules = array();
    public function user()
    {
        return $this->belongsTo('Models\User', 'user_id', 'id')->with('attachment');
    }
    public function other_user()
    {
        return $this->belongsTo('Models\User', 'other_user_id', 'id');
    }
    public function parent()
    {
        return $this->belongsTo('Models\Parent', 'parent_id', 'id');
    }
    public function message_content()
    {
        return $this->belongsTo('Models\MessageContent', 'message_content_id', 'id');
    }
    public function foreigns()
    {
        return $this->morphMany('Models\Activity', 'foreign');
    }
    public function activity()
    {
        return $this->belongsTo('Models\Message', 'id', 'id')->select('id', 'message_content_id', 'user_id', 'other_user_id', 'class', 'foreign_id')->with('foreign_user', 'foreign_other_user', 'message_content', 'quote_bid', 'bid', 'portfolio', 'project_dispute');
    }
    public function foreign_user()
    {
        return $this->belongsTo('Models\User', 'user_id', 'id')->select('id', 'username')->with('foreign_attachment');
    }
    public function foreign_other_user()
    {
        return $this->belongsTo('Models\User', 'other_user_id', 'id')->select('id', 'username')->with('foreign_attachment');
    }
    public function quote_bid()
    {
        return $this->belongsTo('Models\QuoteBid', 'foreign_id', 'id')->select('id', 'user_id', 'service_provider_user_id', 'quote_request_id')->with('foreign_user', 'foreign_service_provider_user', 'foreign_quote_request');
    }
    public function portfolio()
    {
        return $this->belongsTo('Models\Portfolio', 'foreign_id', 'id')->with('foreign_attachment');
    }
    public function bid()
    {
        return $this->belongsTo('Models\Bid', 'foreign_id', 'id')->with('foreign_project');
    }
    public function project_dispute()
    {
        return $this->belongsTo('Models\ProjectDispute', 'foreign_id', 'id')->with('foreign_project');
    }
    public function foreign_message()
    {
        return $this->morphTo(null, 'class', 'foreign_id');
    }
    public function scopeFilter($query, $params = array())
    {
        parent::scopeFilter($query, $params);
        if (!empty($params['class'])) {
            $query->where('class', $params['class']);
        }
        if (!empty($params['foreign_id'])) {
            $query->where('foreign_id', $params['foreign_id']);
        }
        if (!empty($params['model_id'])) {
            $query->where('model_id', $params['model_id']);
        }
    }
    public function child()
    {
        return $this->hasMany('Models\Message', 'parent_id', 'id')->with('message_content', 'user');
    }
    public function children()
    {
        return $this->child()->with('children');
    }
    public function attachment()
    {
        return $this->hasOne('Models\Attachment', 'foreign_id', 'message_content_id')->where('class', 'MessageContent');
    }
    protected static function boot()
    {
        Relation::morphMap(['ContestUser' => ContestUser::class , 'Contest' => Contest::class , 'QuoteService' => QuoteService::class , 'QuoteBid' => QuoteBid::class , 'Portfolio' => Portfolio::class , 'Project' => Project::class , 'HireRequest' => HireRequest::class , 'Bid' => Bid::class , 'ProjectDispute' => ProjectDispute::class , ]);
    }
    public function setChildPrivateMessage($authUser, $childrens)
    {
        if ($childrens) {
            foreach ($childrens as $ckey => $children) {
                if ((empty($authUser) && !empty($children['is_private'])) || (!empty($authUser) && $authUser['role_id'] != \Constants\ConstUserTypes::Admin && $authUser['id'] != $children['user_id'] && $authUser['id'] != $children['other_user_id'] && !empty($children['is_private']))) {
                    $childrens[$ckey]['message_content']['subject'] = '[Private Message]';
                    $childrens[$ckey]['message_content']['message'] = '[Private Message]';
                }
                if ($children['children']) {
                    $childrens[$ckey]['children'] = Message::setChildPrivateMessage($authUser, $children['children']);
                }
            }
        }
        return $childrens;
    }
}
