<?php
/**
 * JobStatus
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
 * JobStatus
*/
class JobStatus extends AppModel
{
    protected $table = 'job_statuses';
    public $rules = array();
    public $qSearchFields = array(
        'name'
    );
}
