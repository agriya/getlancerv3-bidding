<?php
/**
 * JobApplyStatus
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
 * JobApplyStatus
*/
class JobApplyStatus extends AppModel
{
    protected $table = 'job_apply_statuses';
    public $rules = array(
        'name' => 'sometimes|required',
    );
    public function scopeFilter($query, $params = array())
    {
        parent::scopeFilter($query, $params);
        if (!empty($params['q'])) {
            $query->Where('name', 'ilike', '%' . $params['q'] . '%');
        }
    }
}
