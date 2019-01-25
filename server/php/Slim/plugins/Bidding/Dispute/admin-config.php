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
            'project_disputes' => array(
                'title' => 'Disputes',
                'icon_template' => '<span class="fa fa-file-text-o"></span>',
                'suborder' => 5
            ) ,
        ) ,
    ) ,
);
$tables = array(
    'project_disputes' => array(
        'listview' => array(
            'fields' => array(
                0 => array(
                    'name' => 'user.username',
                    'label' => 'User',
                ) ,
                1 => array(
                    'name' => 'project.name',
                    'label' => 'Project',
                ),
                2 => array(
                    'name' => 'reason',
                    'label' => 'Reason',
                    'map' => array(
                        0 => 'truncate',
                    )
                ),
                3 => array(
                    'name' => 'dispute_open_type.name',
                    'label' => 'Dispute Type',
                ),
                4 => array(
                    'name' => 'dispute_closed_type.resolve_type',
                    'label' => 'Steps Taken',
                    'type' => 'wysiwyg'
                ),
                5 => array(
                    'name' => 'dispute_status.name',
                    'label' => 'Status',
                ),
                6 => array(
                    'name' => 'expected_rating',
                    'label' => 'Expected Rating',
                    'template' => '<star-rating stars="{{entry.values.expected_rating}}"></star-rating>'
                ),
                7 => array(
                    'name' => 'created_at',
                    'label' => 'Created On',
                ) ,
            ) ,
            'title' => 'Project Disputes',
            'perPage' => '10',
            'sortField' => '',
            'sortDir' => '',
            'infinitePagination' => false,
            'listActions' => array(
                0 => '<dispute-edit entry="entry" entity="entity" size="sm" label="Edit"></dispute-edit>',
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
                1 => array(
                    'name' => 'project_id',
                    'label' => 'Project',
                    'targetEntity' => 'projects',
                    'targetField' => 'name',
                    'map' => array(
                        0 => 'truncate',
                    ) ,
                    'type' => 'reference',
                    'remoteComplete' => true,
                ) ,
                2 => array(
                    'name' => 'dispute_open_type_id',
                    'label' => 'Dispute Open Type',
                    'targetEntity' => 'dispute_open_types',
                    'targetField' => 'name',
                    'map' => array(
                        0 => 'truncate',
                    ) ,
                    'type' => 'reference',
                    'remoteComplete' => true,
                ) ,
                3 => array(
                    'name' => 'dispute_open_type_id',
                    'label' => 'Dispute Open Type',
                    'targetEntity' => 'dispute_open_types',
                    'targetField' => 'name',
                    'map' => array(
                        0 => 'truncate',
                    ) ,
                    'type' => 'reference',
                    'remoteComplete' => true,
                ) ,
                4 => array(
                    'name' => 'dispute_status_id',
                    'label' => 'Status',
                    'targetEntity' => 'dispute_statuses',
                    'targetField' => 'name',
                    'map' => array(
                        0 => 'truncate',
                    ) ,
                    'type' => 'reference',
                    'remoteComplete' => true,
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
                    'name' => 'user_id',
                    'label' => 'User',
                    'type' => 'reference',
                    'targetEntity' => 'users',
                    'targetField' => 'username',
                    'remoteComplete' => true,
                    'validation' => array(
                        'required' => false,
                    ) ,
                ) ,
                1 => array(
                    'name' => 'project.name',
                    'label' => 'Project',
                    'type' => 'reference',
                    'targetEntity' => 'projects',
                    'targetField' => 'name',
                    'remoteComplete' => true,
                    'validation' => array(
                        'required' => false,
                    ) ,
                ) ,
                2 => array(
                    'name' => 'dispute_open_type.name',
                    'label' => 'Dispute Open Type',
                    'type' => 'number',
                    'validation' => array(
                        'required' => false,
                    ) ,
                ) ,
                3 => array(
                    'name' => 'reason',
                    'label' => 'Reason',
                    'type' => 'text',
                    'validation' => array(
                        'required' => false,
                    ) ,
                ) ,
                4 => array(
                    'name' => 'dispute_status_id',
                    'label' => 'Status',
                    'type' => 'number',
                    'validation' => array(
                        'required' => false,
                    ) ,
                ) ,
                5 => array(
                    'name' => 'resolved_date',
                    'label' => 'Resolved Date',
                    'type' => 'datetime',
                    'validation' => array(
                        'required' => false,
                    ) ,
                ) ,
                6 => array(
                    'name' => 'favour_role_id',
                    'label' => 'Favour Role',
                    'type' => 'number',
                    'validation' => array(
                        'required' => false,
                    ) ,
                ) ,
                7 => array(
                    'name' => 'last_replied_user_id',
                    'label' => 'Last Replied User',
                    'type' => 'number',
                    'validation' => array(
                        'required' => false,
                    ) ,
                ) ,
                8 => array(
                    'name' => 'last_replied_date',
                    'label' => 'Last Replied Date',
                    'type' => 'datetime',
                    'validation' => array(
                        'required' => false,
                    ) ,
                ) ,
                9 => array(
                    'name' => 'dispute_closed_type_id',
                    'label' => 'Dispute Closed Type',
                    'type' => 'number',
                    'validation' => array(
                        'required' => false,
                    ) ,
                ) ,
                10 => array(
                    'name' => 'expected_rating',
                    'label' => 'Expected Rating',
                    'type' => 'number',
                    'validation' => array(
                        'required' => false,
                    ) ,
                )
            ) ,
        ) ,
        'editionview' => array(
            'fields' => array(
                0 => array(
                    'name' => 'id',
                    'label' => 'ID',
                    'editable' => false,
                ) ,
                1 => array(
                    'name' => 'user_id',
                    'label' => 'User',
                    'type' => 'reference',
                    'targetEntity' => 'users',
                    'targetField' => 'username',
                    'remoteComplete' => true,
                    'validation' => array(
                        'required' => false,
                    ) ,
                    'editable' => false
                ) ,
                2 => array(
                    'name' => 'project.name',
                    'label' => 'Project',
                    'editable' => false
                ) ,
                3 => array(
                    'name' => 'reason',
                    'label' => 'Reason',
                    'type' => 'text',
                    'validation' => array(
                        'required' => false,
                    ) ,
                    'editable' => false
                ) ,
                4 => array(
                    'name' => 'dispute_open_type.name',
                    'label' => 'Dispute Type',
                    'type' => 'number',
                    'validation' => array(
                        'required' => false,
                    ) ,
                    'editable' => false
                ) ,
                5 => array(
                    'name' => 'dispute_status_id',
                    'label' => 'Status',
                    'type' => 'number',
                    'validation' => array(
                        'required' => false,
                    ) ,
                ) ,
                6 => array(
                    'name' => 'dispute_closed_type_id',
                    'label' => 'Display Close Type',
                    'targetEntity' => 'dispute_closed_types',
                    'targetField' => 'resolve_type',
                    'map' => array(
                        0 => 'truncate',
                    ) ,
                    'type' => 'reference',
                    'remoteComplete' => true,
                ) ,
            ) ,
        ) ,
        'showview' => array(
            'fields' => array(
                0 => array(
                    'name' => 'id',
                    'label' => 'ID',
                    'template' => '<a href="#/dispute_edit/{{entry.values.id}}">{{entry.values.id}}</a>',
                ) ,
                1 => array(
                    'name' => 'user.username',
                    'label' => 'User'
                ) ,
                2 => array(
                    'name' => 'project.name',
                    'label' => 'Project'
                ) ,
                3 => array(
                    'name' => 'reason',
                    'label' => 'Reason'
                ) ,
                4 => array(
                    'name' => 'dispute_open_type.name',
                    'label' => 'Dispute Type'
                ) ,
                5 => array(
                    'name' => 'dispute_closed_type.resolve_type',
                    'label' => 'Steps Taken'
                ),
                6 => array(
                    'name' => 'expected_rating',
                    'label' => 'Expected Rating',
                    'template' => '<star-rating stars="{{entry.values.expected_rating}}"></star-rating>'
                ),
                7 => array(
                    'name' => 'created_at',
                    'label' => 'Created On'
                ),                
                8 => array(
                    'name' => 'Messages',
                    'label' => 'Messages',
                    'targetEntity' => 'messages',
                    'targetReferenceField' => 'foreign_id',
                    'permanentFilters' => array (
                        'class' => 'ProjectDispute'
                    ),
                    'targetFields' => array(
                        0 => array(
                            'name' => 'id',
                            'label' => 'ID'
                        ) ,
                        1 => array(
                            'name' => 'user.username',
                            'label' => 'From',
                        ) ,
                        2 => array(
                            'name' => 'other_user.username',
                            'label' => 'To',
                        ) ,
                        3 => array(
                            'name' => 'message_content.message',
                            'label' => 'Message Contents',
                        ) ,
                        4 => array(
                            'name' => 'is_sender',
                            'label' => 'Sender?',
                            'type' => 'boolean'
                        ) ,
                        5 => array(
                            'name' => 'is_read',
                            'label' => 'Read?',
                            'type' => 'boolean'
                        ) ,
                        6 => array(
                            'name' => 'is_deleted',
                            'label' => 'Deleted?',
                            'type' => 'boolean'
                        ) ,
                        8 => array(
                            'name' => 'created_at',
                            'label' => 'Created On',
                        ) 
                    ) ,
                    'map' => array(
                        0 => 'truncate',
                    ),
                    'type' => 'referenced_list',
                    'perPage' => 10
                ),
            ),
            'actions' => array(
                0 => 'list',
                1 => 'delete',
            ) ,
        ) ,
    ) ,
);
if (isPluginEnabled('Common/Message')) {
    $milestone_table = array(
        'project_disputes' => array(
            'listview' => array(
                'fields' => array(
                    0 => array(
                        'name' => 'message_count',
                        'label' => 'Message',
                        'template' => '<a href="#/messages/list?search=%7B%22class%22:%22Project%22,%22foreign_id%22:{{entry.values.id}}%7D">{{entry.values.message_count}}</a>',
                    )
                )
            ) ,
            'showview' => array(
                'fields' => array(
                    0 => array(
                        'name' => 'message_count',
                        'template' => '<a href="#/messages/list?search=%7B%22class%22:%22Project%22,%22foreign_id%22:{{entry.values.id}}%7D">{{entry.values.message_count}}</a>',
                        'label' => 'Message'
                    )
                )
            )
        )
    );
    $tables = merge_details($tables, $milestone_table);
}
