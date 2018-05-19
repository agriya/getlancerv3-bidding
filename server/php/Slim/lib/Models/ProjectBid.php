<?php
/**
 * ProjectBid
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
 * ProjectBid
*/
class ProjectBid extends AppModel
{
    protected $table = 'project_bids';
    public function user()
    {
        return $this->belongsTo('Models\User', 'user_id', 'id');
    }
    public function project()
    {
        return $this->belongsTo('Models\Project', 'project_id', 'id');
    }
    protected static function boot()
    {
        global $authUser;
        parent::boot();
        self::deleting(function ($projectBid) use ($authUser) {
            if ($authUser['role_id'] == \Constants\ConstUserTypes::Admin) {
                Bid::where('project_id', $projectBid->project_id)->get()->each(function ($bid) {
                    $bid->delete();
                });
                return true;
            }
            return false;
        });
    }
    public function bid()
    {
        return $this->hasMany('Models\Bid', 'project_bid_id', 'id');
    }
}
