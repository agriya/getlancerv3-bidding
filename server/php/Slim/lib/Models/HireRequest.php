<?php
/**
 * HireRequest
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
 * HireRequest
*/
class HireRequest extends AppModel
{
    protected $table = 'hire_requests';
    protected $fillable = array(
        'message',
        'class',
        'user_id',
    );
    public $rules = array(
        'message' => 'sometimes|required',
        'projects' => 'sometimes|required',
    );
    public function user()
    {
        return $this->belongsTo('Models\User', 'user_id', 'id');
    }
    public function requested_user()
    {
        return $this->belongsTo('Models\User', 'requested_user_id', 'id');
    }
    public function foreign_messages()
    {
        return $this->morphMany('Models\Message', 'foreign_message');
    }
    public function foreigns()
    {
        return $this->morphMany('Models\Activity', 'foreign');
    }
    public function activity()
    {
        return $this->belongsTo('Models\HireRequest', 'id', 'id')->select('id', 'user_id', 'foreign_id')->with('foreign_user', 'foreign_project');
    }
    public function foreign_user()
    {
        return $this->belongsTo('Models\User', 'user_id', 'id')->select('id', 'username')->with('foreign_attachment');
    }
    public function foreign_project()
    {
        return $this->belongsTo('Models\Project', 'foreign_id', 'id');
    }
    public function checkExitsHireRequest($data)
    {
        $hireRequest = HireRequest::where('user_id', $data->user_id)->where('requested_user_id', $data->requested_user_id)->where('foreign_id', $data->foreign_id)->where('class', $data->class)->first();
        if (!empty($hireRequest)) {
            return $hireRequest->id;
        }
        return false;
    }
}
