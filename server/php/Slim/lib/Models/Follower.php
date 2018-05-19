<?php
/**
 * Follower
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
 * Follower
*/
class Follower extends AppModel
{
    protected $table = 'followers';
    protected $fillable = array(
        'foreign_id',
        'class'
    );
    public $rules = array(
        'foreign_id' => 'sometimes|required',
        'class' => 'sometimes|required',
    );
    public function ip()
    {
        return $this->belongsTo('Models\Ip', 'ip_id', 'id');
    }
    public function user()
    {
        return $this->belongsTo('Models\User', 'user_id', 'id')->with('attachment');
    }
    public function foreign_follower()
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
    }
    protected static function boot()
    {
        Relation::morphMap(['User' => User::class , 'Contest' => Contest::class , 'Portfolio' => Portfolio::class , 'Project' => Project::class , ]);
    }
}
