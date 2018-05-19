<?php
/**
 * View
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
 * View
*/
class View extends AppModel
{
    protected $table = 'views';
    protected $fillable = array(
        'foreign_id',
        'class'
    );
    public $rules = array(
        'foreign_id' => 'sometimes|required',
        'class' => 'sometimes|required',
    );
    public function user()
    {
        return $this->belongsTo('Models\User', 'user_id', 'id');
    }
    public function foreign_view()
    {
        return $this->morphTo(null, 'class', 'foreign_id');
    }
    public function ip()
    {
        return $this->belongsTo('Models\Ip', 'ip_id', 'id');
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
        if (!empty($params['q'])) {
            $query->where(function ($q1) use ($params) {
                $search = $params['q'];
                $q1->orWhereHas('user', function ($q) use ($search) {
                    $q->where('users.username', 'ilike', "%$search%");
                });
            });
        }
    }
    protected static function boot()
    {
        Relation::morphMap(['ContestUser' => ContestUser::class , 'User' => User::class , 'Contest' => Contest::class , 'Job' => Job::class , 'Portfolio' => Portfolio::class , 'QuoteService' => QuoteService::class , 'Exam' => Exam::class , 'Project' => Project::class , ]);
    }
}
