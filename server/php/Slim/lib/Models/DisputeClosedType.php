<?php
/**
 * DisputeClosedType
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
 * DisputeClosedType
*/
class DisputeClosedType extends AppModel
{
    protected $table = 'dispute_closed_types';
    public $rules = array();
    public function scopeFilter($query, $params = array())
    {
        parent::scopeFilter($query, $params);
        if (!empty($params['dispute_open_type_id'])) {
            $query->where('dispute_open_type_id', $params['dispute_open_type_id']);
        }
        if (!empty($params['project_role_id'])) {
            $query->where('project_role_id', $params['project_role_id']);
        }
    }
}
