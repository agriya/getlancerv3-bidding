<?php
/**
 * Plugin
 *
 * PHP version 5
 *
 * @category   PHP
 * @package    GetlancerV3
 * @subpackage Core
 * @author     Agriya <info@agriya.com>
 * @copyright  2018 Agriya Infoway Private Ltd
 * @license    http://www.agriya.com/ Agriya Infoway Licence
 * @link       http://www.agriya.com
 */
$menus = array(
    'projects' => array(
        'title' => 'Projects',
        'icon_template' => '<span class="fa fa-file-text-o"></span>',
        'child_sub_menu' => array(
            'milestones' => array(
                'title' => 'Milestones',
                'icon_template' => '<span class="fa fa-file-text-o"></span>',
                'suborder' => 3
            ) ,
        ) ,
    ) ,
    'Master' => array(
        'title' => 'Master',
        'icon_template' => '<span class="glyphicon glyphicon-dashboard"></span>',
        'child_sub_menu' => array(
            'milestone_statuses' => array(
                'title' => 'Milestone Statuses',
                'icon_template' => '<span class="fa fa-file-text-o"></span>',
                'suborder' => 14
            ) ,
        ) ,
    ) ,
);
$tables = array(
    'milestones' => array(
        'listview' => array(
            'fields' => array(
                0 => array(
                    'name' => 'id',
                    'label' => 'ID',
                    'isDetailLink' => true,
                ) ,
                1 => array(
                    'name' => 'project.name',
                    'label' => 'Project',
                ) ,
                2 => array(
                    'name' => 'amount',
                    'label' => 'Amount',
                ) ,
                3 => array(
                    'name' => 'deadline_date',
                    'label' => 'Deadline',
                ) ,
                4 => array(
                    'name' => 'milestone_status.name',
                    'label' => 'Milestone Status',
                ) ,
                5 => array(
                    'name' => 'site_commission_from_employer',
                    'label' => 'Site Commission From Employer',
                ) ,
                6 => array(
                    'name' => 'site_commission_from_freelancer',
                    'label' => 'Commission From Freelancer',
                ) ,
                7 => array(
                    'name' => 'created_at',
                    'label' => 'Created On',
                ) ,
            ) ,
            'title' => 'Milestones',
            'perPage' => '10',
            'sortField' => '',
            'sortDir' => '',
            'infinitePagination' => false,
            'listActions' => array(
                0 => 'edit',
                1 => 'show',
                2 => 'delete',
            ) ,
            'batchActions' => array(
                0 => 'delete',
            ) ,
            'filters' => array(
                0 => array(
                    'name' => 'q',
                    'pinned' => true,
                    'label' => 'Search',
                    'type' => 'template',
                    'template' => '',
                ) ,
            ) ,
            'permanentFilters' => '',
            'actions' => array(
                0 => 'batch',
                1 => 'filter',
            ) ,
        ) ,
        'creationview' => array(
            'fields' => array(
                0 => array(
                    'name' => 'project_id',
                    'label' => 'Project',
                    'targetEntity' => 'projects',
                    'targetField' => 'name',
                    'type' => 'reference',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                1 => array(
                    'name' => 'user_id',
                    'label' => 'User',
                    'targetEntity' => 'users',
                    'targetField' => 'username',
                    'type' => 'reference',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                2 => array(
                    'name' => 'name',
                    'label' => 'Name',
                    'validation' => array(
                        'required' => false,
                    ) ,
                ) ,
                3 => array(
                    'name' => 'amount',
                    'label' => 'Amount',
                    'type' => 'number',
                    'validation' => array(
                        'required' => false,
                    ) ,
                ) ,
                4 => array(
                    'name' => 'description',
                    'label' => 'Description',
                    'type' => 'text',
                    'validation' => array(
                        'required' => false,
                    ) ,
                ) ,
                5 => array(
                    'name' => 'work_completion_percentage',
                    'label' => 'Work Completion Percentage',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                6 => array(
                    'name' => 'due_date',
                    'label' => 'Due Date',
                    'type' => 'date',
                    'validation' => array(
                        'required' => false,
                    ) ,
                ) ,
                7 => array(
                    'name' => 'requested_date',
                    'label' => 'Requested Date',
                    'type' => 'date',
                    'validation' => array(
                        'required' => false,
                    ) ,
                ) ,
                8 => array(
                    'name' => 'paid_date',
                    'label' => 'Paid Date',
                    'type' => 'date',
                    'validation' => array(
                        'required' => false,
                    ) ,
                ) ,
                9 => array(
                    'name' => 'milestone_status_id',
                    'label' => 'Milestone Status',
                    'targetEntity' => 'milestone_statuses',
                    'targetField' => 'name',
                    'type' => 'reference',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
            ) ,
        ) ,
        'editionview' => array(
            'fields' => array(
                0 => array(
                    'name' => 'project_id',
                    'label' => 'Project',
                    'targetEntity' => 'projects',
                    'targetField' => 'name',
                    'type' => 'reference',
                    'editable' => false
                ) ,
                1 => array(
                    'name' => 'user_id',
                    'label' => 'User',
                    'targetEntity' => 'users',
                    'targetField' => 'username',
                    'type' => 'reference',
                    'editable' => false
                ) ,
                2 => array(
                    'name' => 'amount',
                    'label' => 'Amount',
                    'validation' => array(
                        'required' => false,
                    ) ,
                ) ,
                3 => array(
                    'name' => 'deadline_date',
                    'label' => 'Deadline',
                    'type' => 'date',
                ) ,
                4 => array(
                    'name' => 'description',
                    'label' => 'Description',
                    'type' => 'text',
                    'validation' => array(
                        'required' => false,
                    ) ,
                ) ,
                5 => array(
                    'name' => 'milestone_status_id',
                    'label' => 'Status',
                    'targetEntity' => 'milestone_statuses',
                    'targetField' => 'name',
                    'type' => 'reference',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
            ) ,
        ) ,
        'showview' => array(
            'fields' => array(
                0 => array(
                    'name' => 'id',
                    'label' => 'ID',
                    'isDetailLink' => true,
                ) ,
                1 => array(
                    'name' => 'project.name',
                    'label' => 'Project',
                ) ,
                2 => array(
                    'name' => 'amount',
                    'label' => 'Amount',
                ) ,
                3 => array(
                    'name' => 'deadline_date',
                    'label' => 'Deadline',
                ) ,
                4 => array(
                    'name' => 'description',
                    'label' => 'Description',
                ) ,
                5 => array(
                    'name' => 'milestone_status.name',
                    'label' => 'Milestone Status',
                ) ,
                6 => array(
                    'name' => 'site_commission_from_employer',
                    'label' => 'Site Commission From Employer',
                ) ,
                7 => array(
                    'name' => 'site_commission_from_freelancer',
                    'label' => 'Commission From Freelancer',
                ) ,
                8 => array(
                    'name' => 'created_at',
                    'label' => 'Created On',
                ) ,
            ) ,
        ) ,
    ) ,
    'milestone_statuses' => array(
        'listview' => array(
            'fields' => array(
                0 => array(
                    'name' => 'id',
                    'label' => 'ID',
                    'isDetailLink' => true,
                ) ,
                1 => array(
                    'name' => 'name',
                    'label' => 'Name',
                ) ,
                2 => array(
                    'name' => 'milestone_count',
                    'label' => 'Milestones',
                    'template' => '<a href="#/milestones/list?search=%7B%22milestone_status_id%22:{{entry.values.id}}%7D">{{entry.values.milestone_count}}</a>',
                ) ,
                3 => array(
                    'name' => 'created_at',
                    'label' => 'Created On',
                ) ,
            ) ,
            'title' => 'Milestone Statuses',
            'perPage' => '10',
            'sortField' => '',
            'sortDir' => '',
            'infinitePagination' => false,
            'listActions' => array() ,
            'permanentFilters' => '',
            'actions' => array(
                0 => 'batch'
            ) ,
        ) ,
    ) ,
);
