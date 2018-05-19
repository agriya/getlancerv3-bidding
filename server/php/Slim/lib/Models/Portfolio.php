<?php
/**
 * Portfolio
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
 * Portfolio
*/
class Portfolio extends AppModel
{
    protected $table = 'portfolios';
    protected $fillable = array(
        'title',
        'description',
        'is_admin_suspend'
    );
    public $rules = array(
        'title' => 'sometimes|required',
        'image' => 'sometimes|required',
        'description' => 'sometimes|required'
    );
    public $qSearchFields = array(
        'description',
        'title'
    );
    public function user()
    {
        return $this->belongsTo('Models\User', 'user_id', 'id')->with('attachment', 'follower');
    }
    public function attachment()
    {
        return $this->hasOne('Models\Attachment', 'foreign_id', 'id')->where('class', 'Portfolio');
    }
    public function foreign_attachment()
    {
        return $this->hasOne('Models\Attachment', 'foreign_id', 'id')->select('id', 'filename', 'class', 'foreign_id')->where('class', 'Portfolio');
    }
    public function foreigns()
    {
        return $this->morphMany('Models\Flag', 'foreign');
    }
    public function activity()
    {
        return $this->belongsTo('Models\Portfolio', 'id', 'id')->select('id', 'user_id')->with('foreign_user', 'foreign_attachment', 'follower');
    }
    public function foreign_user()
    {
        return $this->belongsTo('Models\User', 'user_id', 'id')->select('id', 'username')->with('foreign_attachment');
    }
    public function follower()
    {
        global $authUser;
        if (!empty($authUser)) {
            return $this->hasMany('Models\Follower', 'foreign_id', 'id')->where('user_id', $authUser['id'])->where('class', 'Portfolio');
        }
    }
    public function flag()
    {
        global $authUser;
        if (!empty($authUser)) {
            return $this->hasMany('Models\Flag', 'foreign_id', 'id')->where('user_id', $authUser['id'])->where('class', 'Portfolio');
        }
    }
    public function message()
    {
        return $this->hasMany('Models\Message', 'foreign_id', 'id')->where('class', 'Portfolio');
    }
    public function portfolios_skill()
    {
        return $this->hasMany('Models\SkillsPortfolios', 'portfolio_id', 'id')->with('skill');
    }
    public function foreign_views()
    {
        return $this->morphMany('Models\View', 'foreign_view');
    }
    public function foreign_flags()
    {
        return $this->morphMany('Models\Flag', 'foreign_flag');
    }
    public function foreign_messages()
    {
        return $this->morphMany('Models\Message', 'foreign_message');
    }
    protected static function boot()
    {
        $authUser = array();
        global $authUser;
        parent::boot();
        self::created(function ($data) use ($authUser) {
            $portfolio_count = Portfolio::where('user_id', $authUser['id'])->count();
            $user = User::where('id', $authUser['id'])->update(array(
                'portfolio_count' => $portfolio_count
            ));
        });
        self::deleted(function ($data) use ($authUser) {
            $portfolio_count = Portfolio::where('user_id', $authUser['id'])->count();
            $user = User::where('id', $authUser['id'])->update(array(
                'portfolio_count' => $portfolio_count
            ));
        });
        self::deleting(function ($portfolio) use ($authUser) {
            if (($authUser['id'] == $portfolio->user_id) || ($authUser['role_id'] == \Constants\ConstUserTypes::Admin)) {
                return true;
            } else {
                return false;
            }
        });
        self::saving(function ($portfolio) use ($authUser) {
            if (($authUser['id'] == $portfolio->user_id) || ($authUser['role_id'] == \Constants\ConstUserTypes::Admin)) {
                return true;
            } else {
                return false;
            }
        });
    }
    public function scopeFilter($query, $params = array())
    {
        parent::scopeFilter($query, $params);
        if (!empty($params['user_id'])) {
            $query->Where('user_id', $params['user_id']);
        }
        if (!empty($params['skill'])) {
            $skill = $params['skill'];
            $skillsPortfolio = SkillsPortfolios::join('skills', 'skills_portfolios.skill_id', '=', 'skills.id')->where('skills.slug', 'ilike', "%$skill%")->select('skills_portfolios.portfolio_id as id')->get()->toArray();
            $query->whereIn('id', $skillsPortfolio);
        }
    }
    public function user_follow()
    {
        return $this->hasMany('Models\UserFollow', 'other_user_id', 'id')->with('user');
    }
}
