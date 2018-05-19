<?php
/**
 * ContestStatus
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
 * ContestStatus
*/
class ContestStatus extends AppModel
{
    protected $table = 'contest_statuses';
    protected $fillable = array(
        'message'
    );
    public $rules = array(
        'message' => 'sometimes|required',
    );
    public function scopeFilter($query, $params = array())
    {
        parent::scopeFilter($query, $params);
        if (!empty($params['q'])) {
            $search = $params['q'];
            $query->orWhere('name', 'ilike', "%$search%");
            $query->orWhere('message', 'ilike', "%$search%");
        }
    }
}
