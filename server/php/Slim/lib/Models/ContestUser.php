<?php
/**
 * ContestUser
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
 * ContestUser
*/
class ContestUser extends AppModel
{
    protected $table = 'contest_users';
    protected $fillable = array(
        'contest_id',
        'description',
        'copyright_note',
        'contest_user_status_id'
    );
    public $rules = array(
        'description' => 'sometimes|required',
    );
    protected static function boot()
    {
        global $authUser;
        parent::boot();
        self::saving(function ($data) use ($authUser) {
            if (($authUser['role_id'] == \Constants\ConstUserTypes::Admin) || ($authUser['id'] == $data->user_id || $authUser['id'] == $data->contest_owner_user_id)) {
                return true;
            }
            return false;
        });
        self::deleting(function ($data) use ($authUser) {
            if (($authUser['role_id'] == \Constants\ConstUserTypes::Admin) || ($authUser['id'] == $data->user_id)) {
                return true;
            }
            return false;
        });
        self::created(function ($data) {
            ContestUser::updateContestcount($data);
        });
        self::updated(function ($data) {
            ContestUser::updateContestcount($data);
        });
        self::deleted(function ($data) {
            ContestUser::updateContestcount($data);
            Activity::where('class', 'ContestUser')->where('foreign_id', $data->id)->update(array(
                'foreign_id' => null
            ));
        });
    }
    public function scopeFilter($query, $params = array())
    {
        parent::scopeFilter($query, $params);
        if (!empty($params['q'])) {
            $search = $params['q'];
            $query->orWhereHas('contest', function ($q) use ($search) {
                $q->where('name', 'ilike', "%$search%");
            });
            $query->orWhereHas('contest_user_status', function ($q) use ($search) {
                $q->where('name', 'ilike', "%$search%");
            });
            $query->orWhere('description', 'ilike', "%$search%");
        }
        if (!empty($params['contest_user_status_id'])) {
            $query->where('contest_user_status_id', $params['contest_user_status_id']);
        }
        if (!empty($params['contest_id'])) {
            $query->where('contest_id', $params['contest_id']);
        }
        if (!empty($params['user_id'])) {
            $query->where('user_id', $params['user_id']);
        }
        if (isset($params['is_rated']) && empty($params['is_rated'])) {
            $query->where('contest_user_rating_count', '=', 0);
        }
        if (!empty($params['is_rated'])) {
            $query->where('contest_user_rating_count', '>', 0);
        }
    }
    public function updateContestcount($data)
    {
        $activeCount = ContestUser::where('contest_user_status_id', \Constants\ConstContestUserStatus::Active)->where('contest_id', $data->contest_id)->count();
        $wonCount = ContestUser::where('contest_user_status_id', \Constants\ConstContestUserStatus::Won)->where('contest_id', $data->contest_id)->count();
        $eliminatedCount = ContestUser::where('contest_user_status_id', \Constants\ConstContestUserStatus::Eliminated)->where('contest_id', $data->contest_id)->count();
        $withdrawnCount = ContestUser::where('contest_user_status_id', \Constants\ConstContestUserStatus::Withdrawn)->where('contest_id', $data->contest_id)->count();
        $totalCount = ContestUser::where('contest_id', $data->contest_id)->count();
        Contest::where('id', $data->contest_id)->update(array(
            'contest_user_count' => $totalCount,
            'contest_user_won_count' => $wonCount,
            'contest_user_eliminated_count' => $eliminatedCount,
            'contest_user_withdrawn_count' => $withdrawnCount,
            'contest_user_active_count' => $activeCount
        ));
        $contest_user_status_count = ContestUser::where('contest_user_status_id', $data->contest_user_status_id)->count();
        ContestUserStatus::where('id', $data->contest_user_status_id)->update(['contest_user_count' => $contest_user_status_count]);
    }
    public function user()
    {
        return $this->belongsTo('Models\User', 'user_id', 'id')->with('attachment');
    }
    public function foreigns()
    {
        return $this->morphMany('Models\Activity', 'foreign');
    }
    public function activity()
    {
        return $this->belongsTo('Models\ContestUser', 'id', 'id')->select('id', 'contest_id')->with('contest');
    }
    public function foreign_reviews()
    {
        return $this->morphMany('Models\Review', 'foreign_review');
    }
    public function foreign_messages()
    {
        return $this->morphMany('Models\Message', 'foreign_message');
    }
    public function foreign_views()
    {
        return $this->morphMany('Models\View', 'foreign_view');
    }
    public function foreign_flags()
    {
        return $this->morphMany('Models\Flag', 'foreign_flag');
    }
    public function contest_owner_user()
    {
        return $this->belongsTo('Models\ContestOwnerUser', 'contest_owner_user_id', 'id');
    }
    public function contest()
    {
        return $this->belongsTo('Models\Contest', 'contest_id', 'id')->with('contest_status', 'user');
    }
    public function contest_user_status()
    {
        return $this->belongsTo('Models\ContestUserStatus', 'contest_user_status_id', 'id');
    }
    public function zazpay_gateway()
    {
        return $this->belongsTo('Models\ZazpayGateway', 'zazpay_gateway_id', 'id');
    }
    public function attachment()
    {
        return $this->hasMany('Models\Attachment', 'foreign_id', 'id')->where('class', 'ContestUser');
    }
    public function messages()
    {
        return $this->hasMany('Models\Message', 'foreign_id', 'id')->select('messages.*')->join('contest_users', function ($join) {
            $join->on('messages.foreign_id', '=', 'contest_users.id');
            $join->on('messages.user_id', '=', 'contest_users.user_id');
        })->where('class', 'ContestUser')->with('message_content', 'user', 'attachment')->whereHas('attachment')->where('is_sender', 1);
    }
    public function contest_users()
    {
        if (!empty($_GET['contest_id'])) {
            return $this->hasMany('Models\ContestUser', 'user_id', 'user_id')->where('contest_id', $_GET['contest_id'])->with('contest_user_status', 'attachment');
        } else {
            return $this->hasMany('Models\ContestUser', 'user_id', 'user_id')->with('contest_user_status', 'attachment');
        }
    }
    public function contest_user_delivery_files()
    {
        return $this->belongsTo('Models\Attachment', 'id', 'foreign_id')->where('class', 'ContestUserDeliveryFile');
    }
    public function updateMaxumumEntryNo($contest_id, $contest_user_id)
    {
        $entry_no = ContestUser::where('contest_id', $contest_id)->max('entry_no') + 1;
        ContestUser::where('id', $contest_user_id)->update(array(
            'entry_no' => $entry_no
        ));
        return $entry_no;
    }
}
