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
    'Skill Test' => array(
        'title' => 'Skill Test',
        'icon_template' => '<span class="fa fa-graduation-cap"></span>',
        'child_sub_menu' => array(
            'exams' => array(
                'title' => 'Exams',
                'icon_template' => '<span class="fa fa-graduation-cap"></span>',
                'suborder' => 1
            ) ,
            'questions' => array(
                'title' => 'Questions',
                'icon_template' => '<span class="glyphicon glyphicon-log-out"></span>',
                'suborder' => 2
            ) ,
            'exams_users' => array(
                'title' => 'Exams Attempts',
                'icon_template' => '<span class="glyphicon glyphicon-log-out"></span>',
            ) ,
            'exams_users' => array(
                'title' => "Exam Attendees",
                'icon_template' => '<span class="glyphicon glyphicon-log-out"></span>',
                'suborder' => 3
            ) ,
            'exam_answers' => array(
                'title' => 'Exam Answers',
                'icon_template' => '<span class="glyphicon glyphicon-log-out"></span>',
                'suborder' => 4
            ) ,
            'exams_questions' => array(
                'title' => 'Exam Questions',
                'icon_template' => '<span class="glyphicon glyphicon-log-out"></span>',
                'suborder' => 5
            ) ,
            'exam_views' => array(
                'title' => 'Exam Views',
                'icon_template' => '<span class="glyphicon glyphicon-log-out"></span>',
                'suborder' => 6
            )
        ) ,
        'order' => 5
    ) ,
    'Users' => array(
        'title' => 'Users',
        'icon_template' => '<span class="glyphicon glyphicon-user"></span>',
        'child_sub_menu' => array() ,
    ) ,
    'Master' => array(
        'title' => 'Master',
        'icon_template' => '<span class="glyphicon glyphicon-dashboard"></span>',
        'child_sub_menu' => array(
            'question_categories' => array(
                'title' => 'Exam Question Categories',
                'icon_template' => '<span class="glyphicon glyphicon-log-out"></span>',
                'suborder' => 15
            ) ,
            'exam_levels' => array(
                'title' => 'Exam Levels',
                'icon_template' => '<span class="glyphicon glyphicon-log-out"></span>',
                'suborder' => 16
            ) ,
            'exam_statuses' => array(
                'title' => 'Exam Statuses',
                'icon_template' => '<span class="glyphicon glyphicon-log-out"></span>',
                'suborder' => 17
            )
        ) ,
    ) ,
);
$tables = array(
    'exams' => array(
        'listview' => array(
            'fields' => array(
                0 => array(
                    'name' => 'id',
                    'label' => 'ID',
                    'isDetailLink' => true,
                ) ,
                1 => array(
                    'name' => 'title',
                    'label' => 'Exam',
                ) ,
                2 => array(
                    'name' => 'exam_level.name',
                    'label' => 'Difficulty Level',
                ) ,
                3 => array(
                    'name' => 'question_display_type.name',
                    'label' => 'Question Display Type',
                    'type' => 'wysiwyg',
                ),
                4 => array(
                    'name' => 'duration',
                    'label' => 'Duration (In Minuntes)',
                ) ,
                5 => array(
                    'name' => 'pass_mark_percentage',
                    'label' => 'Pass Mark (%)',
                ) ,
                6 => array(
                    'name' => 'fee',
                    'label' => 'Fee',
                ) ,
                7 => array(
                    'name' => 'total_fee_received',
                    'label' => 'Total Revenue',
                ) ,
                8 => array(
                    'name' => 'exams_question_count',
                    'label' => 'Questions',
                    'type' => 'number',
                    'template' => '<a href="#/exams_questions/list?search=%7B%22exam_id%22:{{entry.values.id}}%7D">{{entry.values.exams_question_count}}</a>',
                ) ,
                9 => array(
                    'name' => 'exams_user_count',
                    'label' => 'Attempts',
                    'type' => 'number',
                    'template' => '<a href="#/exams_users/list?search=%7B%22exam_id%22:{{entry.values.id}}%7D">{{entry.values.exams_user_count}}</a>',
                ) ,
                10 => array(
                    'name' => 'is_active',
                    'label' => 'Active?',
                    'type' => 'boolean',
                ) ,
            ) ,
            'title' => 'Exams',
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
                0 => '<batch-active type="active" action="exams" selection="selection"></batch-active>',
                1 => '<batch-in-active type="inactive" action="exams" selection="selection"></batch-in-active>',
                2 => 'delete'
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
                    'name' => 'filter',
                    'type' => 'choice',
                    'label' => 'Active?',
                    'choices' => array(
                        0 => array(
                            'label' => 'Active',
                            'value' => 'active',
                        ) ,
                        1 => array(
                            'label' => 'Inactive',
                            'value' => 'inactive',
                        ) ,
                    ) ,
                ) ,
                2 => array(
                    'name' => 'is_recommended',
                    'type' => 'choice',
                    'label' => 'Recommended?',
                    'choices' => array(
                        0 => array(
                            'label' => 'Yes',
                            'value' => true,
                        ) ,
                        1 => array(
                            'label' => 'No',
                            'value' => false,
                        ) ,
                    ) ,
                ) ,
                3 => array(
                    'name' => 'exam_level_id',
                    'label' => 'Levels',
                    'targetEntity' => 'exam_levels',
                    'targetField' => 'name',
                    'map' => array(
                        0 => 'truncate',
                    ) ,
                    'type' => 'reference',
                    'remoteComplete' => true,
                ) ,
                4 => array(
                    'name' => 'exam_category_id',
                    'label' => 'Categories',
                    'targetEntity' => 'exam_categories',
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
                2 => 'create',
            ) ,
        ) ,
        'creationview' => array(
            'fields' => array(
                0 => array(
                    'name' => 'question_display_type_id',
                    'label' => 'Question Display Type',
                    'targetEntity' => 'question_display_types',
                    'targetField' => 'name',
                    'remoteComplete' => true,
                    'type' => 'reference',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                1 => array(
                    'name' => 'exam_level_id',
                    'label' => 'Difficulty Level',
                    'targetEntity' => 'exam_levels',
                    'targetField' => 'name',
                    'type' => 'reference',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                2 => array(
                    'name' => 'title',
                    'label' => 'Title',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                3 => array(
                    'name' => 'duration',
                    'label' => 'Duration  (In Minutes)',
                    'type' => 'number',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                /*4 => array(
                    'name' => 'additional_time_to_expire',
                    'label' => 'Additional Time To Expire  (In Minutes)',
                    'type' => 'number'
                ) ,*/
                4 => array(
                    'name' => 'topics_covered',
                    'label' => 'Topics Covered',
                    'type' => 'wysiwyg',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                5 => array(
                    'name' => 'instructions',
                    'label' => 'Instructions',
                    'type' => 'wysiwyg',
                ) ,
                6 => array(
                    'name' => 'splash_content',
                    'label' => 'Splash Content',
                    'type' => 'wysiwyg',
                ) ,
                7 => array(
                    'name' => 'fee',
                    'label' => 'Fee',
                    'type' => 'number',
                    'defaultValue' => 0,
                    'validation' => array(
                        'required' => false,
                    ) ,
                ) ,
                8 => array(
                    'name' => 'pass_mark_percentage',
                    'label' => 'Pass Mark Percentage',
                    'type' => 'number',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                9 => array(
                    'name' => 'is_active',
                    'label' => 'Active?',
                    'type' => 'choice',
                    'defaultValue' => false,
                    'validation' => array(
                        'required' => false,
                    ) ,
                    'choices' => array(
                        0 => array(
                            'label' => 'Yes',
                            'value' => true,
                        ) ,
                        1 => array(
                            'label' => 'No',
                            'value' => false,
                        ) ,
                    ) ,
                ) ,
                10 => array(
                    'name' => 'is_recommended',
                    'label' => 'Recommended?',
                    'type' => 'choice',
                    'defaultValue' => false,
                    'validation' => array(
                        'required' => false,
                    ) ,
                    'choices' => array(
                        0 => array(
                            'label' => 'Yes',
                            'value' => true,
                        ) ,
                        1 => array(
                            'label' => 'No',
                            'value' => false,
                        ) ,
                    ) ,
                ) ,
                11 => array(
                    'name' => 'image',
                    'label' => 'Image',
                    'type' => 'file',
                    'uploadInformation' => array(
                        'url' => 'api/v1/attachments?class=Exam',
                        'apifilename' => 'attachment'
                    ) ,
                ) ,
            ) ,
        ) ,
        'editionview' => array(
            'fields' => array(
                0 => array(
                    'name' => 'question_display_type_id',
                    'label' => 'Question Display Type',
                    'targetEntity' => 'question_display_types',
                    'targetField' => 'name',
                    'remoteComplete' => true,
                    'type' => 'reference',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                1 => array(
                    'name' => 'exam_level_id',
                    'label' => 'Difficulty Level',
                    'targetEntity' => 'exam_levels',
                    'targetField' => 'name',
                    'type' => 'reference',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                2 => array(
                    'name' => 'title',
                    'label' => 'Title',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                3 => array(
                    'name' => 'duration',
                    'label' => 'Duration  (In Minutes)',
                    'type' => 'number',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
               /* 4 => array(
                    'name' => 'additional_time_to_expire',
                    'label' => 'Additional Time To Expire  (In Minutes)',
                    'type' => 'number',
                ) ,*/
                4 => array(
                    'name' => 'topics_covered',
                    'label' => 'Topics Covered',
                    'type' => 'wysiwyg',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                5 => array(
                    'name' => 'instructions',
                    'label' => 'Instructions',
                    'type' => 'wysiwyg',
                ) ,
                6 => array(
                    'name' => 'splash_content',
                    'label' => 'Splash Content',
                    'type' => 'wysiwyg',
                ) ,
                7 => array(
                    'name' => 'fee',
                    'label' => 'Fee',
                    'validation' => array(
                        'required' => false,
                    ) ,
                ) ,
                8 => array(
                    'name' => 'pass_mark_percentage',
                    'label' => 'Pass Mark Percentage',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                9 => array(
                    'name' => 'is_active',
                    'label' => 'Active?',
                    'type' => 'choice',
                    'defaultValue' => false,
                    'validation' => array(
                        'required' => false,
                    ) ,
                    'choices' => array(
                        0 => array(
                            'label' => 'Yes',
                            'value' => true,
                        ) ,
                        1 => array(
                            'label' => 'No',
                            'value' => false,
                        ) ,
                    ) ,
                ) ,
                10 => array(
                    'name' => 'is_recommended',
                    'label' => 'Recommended?',
                    'type' => 'choice',
                    'defaultValue' => false,
                    'validation' => array(
                        'required' => false,
                    ) ,
                    'choices' => array(
                        0 => array(
                            'label' => 'Yes',
                            'value' => true,
                        ) ,
                        1 => array(
                            'label' => 'No',
                            'value' => false,
                        ) ,
                    ) ,
                ) ,
                11 => array(
                    'name' => 'image',
                    'label' => 'Image',
                    'type' => 'file',
                    'uploadInformation' => array(
                        'url' => 'api/v1/attachments?class=Exam',
                        'apifilename' => 'attachment'
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
                    'name' => 'title',
                    'label' => 'Exam',
                ) ,
                2 => array(
                    'name' => 'exam_categories.name',
                    'label' => 'Category',
                ) ,
                3 => array(
                    'name' => 'exam_level.name',
                    'label' => 'Difficulty Level',
                ) ,
                4 => array(
                    'name' => 'question_display_type.name',
                    'label' => 'Question Display Type',
                ) ,
                5 => array(
                    'name' => 'duration',
                    'label' => 'Duration (In Minuntes)',
                ) ,
                6 => array(
                    'name' => 'pass_mark_percentage',
                    'label' => 'Pass Mark (%)',
                ) ,
                7 => array(
                    'name' => 'topics_covered',
                    'label' => 'Topics Covered',
                ) ,
                8 => array(
                    'name' => 'instructions',
                    'label' => 'Instructions',
                ) ,
                9 => array(
                    'name' => 'fee',
                    'label' => 'Fee',
                ) ,
                10 => array(
                    'name' => 'total_fee_received',
                    'label' => 'Total Revenue',
                ) ,
                11 => array(
                    'name' => 'exams_question_count',
                    'label' => 'Questions',
                    'type' => 'number',
                    'template' => '<a href="#/exams_users/list?search=%7B%22exam_id%22:{{entry.values.id}}%7D">{{entry.values.exams_user_count}}</a>',
                ) ,
                12 => array(
                    'name' => 'exams_user_count',
                    'label' => 'Attempts',
                    'type' => 'number',
                    'template' => '<a href="#/exams_users/list?search=%7B%22exam_id%22:{{entry.values.id}}%7D">{{entry.values.exams_user_count}}</a>',
                ) ,
                13 => array(
                    'name' => 'exams_user_passed_count',
                    'template' => '<a href="#/exams_users/list?search=%7B%22exam_status_id%22:3%7D">{{entry.values.exams_user_passed_count}}</a>',
                    'label' => 'Get Passed',
                ) ,
                14 => array(
                    'name' => 'view_count',
                    'template' => '<a href="#/exam_views/list?search=%7B%22class%22:%22Exam%22,%22foreign_id%22:{{entry.values.id}}%7D">{{entry.values.view_count}}</a>',
                    'label' => 'Views',
                ) ,
                15 => array(
                    'name' => 'is_active',
                    'label' => 'Active?',
                    'type' => 'boolean',
                ) ,
                16 => array(
                    'name' => 'is_recommended',
                    'label' => 'Recommended?',
                    'type' => 'boolean',
                ) ,
            ) ,
        ) ,
    ) ,
    'exam_answers' => array(
        'listview' => array(
            'fields' => array(
                0 => array(
                    'name' => 'id',
                    'label' => 'ID',
                    'isDetailLink' => true,
                ) ,
                1 => array(
                    'name' => 'user.username',
                    'label' => 'User',
                ) ,
                2 => array(
                    'name' => 'exam.title',
                    'label' => 'Exam',
                ) ,
                3 => array(
                    'name' => 'question.question',
                    'label' => 'Question',
                ) ,
                4 => array(
                    'name' => 'user_answer',
                    'label' => 'Submitted Answer',
                ) ,
                5 => array(
                    'name' => 'total_mark',
                    'label' => 'Total Mark',
                ) ,
                6 => array(
                    'name' => 'created_at',
                    'label' => 'Created On',
                ) ,
            ) ,
            'title' => 'Exam Answers',
            'perPage' => '10',
            'sortField' => '',
            'sortDir' => '',
            'infinitePagination' => false,
            'listActions' => array(
                0 => 'show',
                1 => 'delete'
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
                2 => array(
                    'name' => 'user_id',
                    'label' => 'User',
                    'targetEntity' => 'users',
                    'targetField' => 'username',
                    'map' => array(
                        0 => 'truncate',
                    ) ,
                    'type' => 'reference',
                    'remoteComplete' => true,
                ) ,
                3 => array(
                    'name' => 'exam_id',
                    'label' => 'Exam',
                    'targetEntity' => 'exams',
                    'targetField' => 'title',
                    'map' => array(
                        0 => 'truncate',
                    ) ,
                    'type' => 'reference',
                    'remoteComplete' => true,
                ) ,
                4 => array(
                    'name' => 'question_id',
                    'label' => 'Question',
                    'targetEntity' => 'questions',
                    'targetField' => 'question',
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
    ) ,
    'exam_levels' => array(
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
                    'name' => 'exam_count',
                    'label' => 'Exams',
                    'type' => 'number',
                    'template' => '<a href="#/exams/list?search=%7B%22exam_level_id%22:{{entry.values.id}}%7D">{{entry.values.exam_count}}</a>',
                ) ,
                3 => array(
                    'name' => 'created_at',
                    'label' => 'Created On',
                ) ,
            ) ,
            'title' => 'Exam Levels',
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
                2 => 'create',
            ) ,
        ) ,
        'creationview' => array(
            'fields' => array(
                0 => array(
                    'name' => 'name',
                    'label' => 'Name',
                    'type' => 'string',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
            ) ,
        ) ,
    ) ,
    'exams_questions' => array(
        'listview' => array(
            'fields' => array(
                0 => array(
                    'name' => 'id',
                    'label' => 'ID',
                    'isDetailLink' => true,
                ) ,
                1 => array(
                    'name' => 'exam.title',
                    'label' => 'Exam',
                    'type' => 'wysiwyg',
                ) ,
                2 => array(
                    'name' => 'question.question',
                    'label' => 'Question',
                    'type' => 'wysiwyg',
                ) ,
                3 => array(
                    'name' => 'created_at',
                    'label' => 'Created On',
                ) ,
            ) ,
            'title' => 'Exam Questions',
            'perPage' => '10',
            'sortField' => '',
            'sortDir' => '',
            'infinitePagination' => false,
            'listActions' => array(
                0 => 'show',
                1 => 'delete',
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
                    'name' => 'exam_id',
                    'label' => 'Exam',
                    'targetEntity' => 'exams',
                    'targetField' => 'title',
                    'map' => array(
                        0 => 'truncate',
                    ) ,
                    'type' => 'reference',
                    'remoteComplete' => true,
                ) ,
                2 => array(
                    'name' => 'question_id',
                    'label' => 'Question',
                    'targetEntity' => 'questions',
                    'targetField' => 'question',
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
    ) ,
    'exams_users' => array(
        'listview' => array(
            'fields' => array(
                0 => array(
                    'name' => 'id',
                    'label' => 'Id',
                    'isDetailLink' => true,
                ) ,
                1 => array(
                    'name' => 'exam.title',
                    'label' => 'Exam',
                ) ,
                2 => array(
                    'name' => 'exam_level.name',
                    'label' => 'Level',
                ) ,
                3 => array(
                    'name' => 'user.username',
                    'label' => 'User',
                ) ,
                4 => array(
                    'name' => 'fee_paid',
                    'label' => 'Fee Paid',
                ) ,
                5 => array(
                    'name' => 'exam_status.name',
                    'label' => 'Status',
                ) ,
                6 => array(
                    'name' => 'total_mark',
                    'label' => 'Total Mark',
                ) ,
                7 => array(
                    'name' => 'total_question_count',
                    'label' => 'Total Questions',
                ) ,
                8 => array(
                    'name' => 'exam_started_date',
                    'label' => 'Start Time',
                ) ,
                9 => array(
                    'name' => 'exam_end_date',
                    'label' => 'End Time',
                ) ,
                10 => array(
                    'name' => 'allow_duration',
                    'label' => 'Allocated Time',
                ) ,
                11 => array(
                    'name' => 'taken_time',
                    'label' => 'Time Consumed',
                ) ,
                12 => array(
                    'name' => 'percentile_rank',
                    'label' => 'Percentile Rank',
                ) ,
            ) ,
            'title' => 'Exam Attendees',
            'perPage' => '10',
            'sortField' => '',
            'sortDir' => '',
            'infinitePagination' => false,
            'listActions' => array(
                0 => 'show',
                1 => 'delete'
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
                    'name' => 'user_id',
                    'label' => 'User',
                    'targetEntity' => 'users',
                    'targetField' => 'username',
                    'map' => array(
                        0 => 'truncate',
                    ) ,
                    'type' => 'reference',
                    'remoteComplete' => true,
                ) ,
                3 => array(
                    'name' => 'exam_id',
                    'label' => 'Exam',
                    'targetEntity' => 'exams',
                    'targetField' => 'title',
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
        )
    ) ,
    'questions' => array(
        'listview' => array(
            'fields' => array(
                0 => array(
                    'name' => 'id',
                    'label' => 'ID',
                    'isDetailLink' => true,
                ) ,
                1 => array(
                    'name' => 'question_category.name',
                    'label' => 'Question Category',
                    'type' => 'wysiwyg',
                ) ,
                2 => array(
                    'name' => 'question',
                    'label' => 'Question',
                    'type' => 'wysiwyg',
                ) ,
                3 => array(
                    'name' => 'info_tip',
                    'label' => 'Info Tip',
                ) ,
                4 => array(
                    'name' => 'is_active',
                    'label' => 'Active?',
                    'type' => 'boolean',
                ) ,
                5 => array(
                    'name' => 'exams_question_count',
                    'template' => '<a href="#/exams_questions/list?search=%7B%22question_id%22:{{entry.values.id}}%7D">{{entry.values.exams_question_count}}</a>',
                    'label' => 'Exams',
                    'type' => 'number',
                ) ,
                6 => array(
                    'name' => 'created_at',
                    'label' => 'Created On',
                ) ,
            ) ,
            'title' => 'Questions',
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
                0 => '<batch-active type="active" action="questions" selection="selection"></batch-active>',
                1 => '<batch-in-active type="inactive" action="questions" selection="selection"></batch-in-active>',
                2 => 'delete'
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
                    'name' => 'filter',
                    'type' => 'choice',
                    'label' => 'Active',
                    'choices' => array(
                        0 => array(
                            'label' => 'Active',
                            'value' => 'active',
                        ) ,
                        1 => array(
                            'label' => 'Inactive',
                            'value' => 'inactive',
                        ) ,
                    ) ,
                ) ,
                2 => array(
                    'name' => 'question_category_id',
                    'label' => 'Question Category',
                    'targetEntity' => 'question_categories',
                    'targetField' => 'name',
                    'map' => array(
                        0 => 'truncate',
                    ) ,
                    'type' => 'reference',
                    'remoteComplete' => true,
                ) ,
                3 => array(
                    'name' => 'select_exam',
                    'pinned' => true,
                    'label' => 'Add questions to Exam',
                    'type' => 'template',
                    'template' => '<exam-lists></exam-lists>',
                ) ,
            ) ,
            'permanentFilters' => '',
            'actions' => array(
                0 => 'batch',
                1 => 'filter',
                2 => 'create',
            ) ,
        ) ,
        'creationview' => array(
            'fields' => array(
                0 => array(
                    'name' => 'question_category_id',
                    'label' => 'Question Category',
                    'targetEntity' => 'question_categories',
                    'targetField' => 'name',
                    'type' => 'reference',
                    'perPage' => 'all',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                1 => array(
                    'name' => 'question',
                    'label' => 'Question',
                    'type' => 'text',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                2 => array(
                    'name' => 'answer_options',
                    'label' => 'Answer Options (Comma seperated)',
                    'type' => 'text',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                3 => array(
                    'name' => 'current_answer',
                    'label' => 'Enter current answer',
                    'type' => 'text',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                4 => array(
                    'name' => 'info_tip',
                    'label' => 'Info Tip (This is help tip for candidate about the question)',
                    'validation' => array(
                        'required' => false,
                    ) ,
                ) ,
                5 => array(
                    'name' => 'is_active',
                    'label' => 'Active?',
                    'type' => 'choice',
                    'defaultValue' => false,
                    'validation' => array(
                        'required' => false,
                    ) ,
                    'choices' => array(
                        0 => array(
                            'label' => 'Yes',
                            'value' => true,
                        ) ,
                        1 => array(
                            'label' => 'No',
                            'value' => false,
                        ) ,
                    ) ,
                )
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
                    'name' => 'question_category.name',
                    'label' => 'Question Category',
                ) ,
                2 => array(
                    'name' => 'question',
                    'label' => 'Question',
                ) ,
                3 => array(
                    'name' => 'info_tip',
                    'label' => 'Info Tip',
                ) ,
                4 => array(
                    'name' => 'is_active',
                    'label' => 'Active?',
                    'type' => 'boolean',
                ) ,
                5 => array(
                    'name' => 'exams_question_count',
                    'label' => 'Exams',
                    'type' => 'number',
                ) ,
                6 => array(
                    'name' => 'created_at',
                    'label' => 'Created On',
                ) ,
                /*7 =>
                array (
                'name' => 'Answer Option',
                'label' => 'Answer Option',
                'targetEntity' => 'question_answer_options',
                'targetReferenceField' => 'question_id',
                'targetFields' =>
                array (
                0 =>
                array (
                'name' => 'option',
                'label' => 'Option'
                ),
                1 =>
                array (
                'name' => 'is_correct_answer',
                'label' => 'Correct Answer?',
                ),
                ),
                'map' =>
                array (
                0 => 'truncate',
                ),
                'type' => 'referenced_list',
                'perPage'=> 10
                ),*/
                7 => array(
                    'name' => 'Exams',
                    'label' => 'Exams',
                    'targetEntity' => 'exams_questions',
                    'targetReferenceField' => 'question_id',
                    'targetFields' => array(
                        0 => array(
                            'name' => 'id',
                            'label' => 'ID'
                        ) ,
                        1 => array(
                            'name' => 'exam.title',
                            'label' => 'Exam',
                        ) ,
                        2 => array(
                            'name' => 'exam.exam_level.name',
                            'label' => 'Level',
                        ) ,
                    ) ,
                    'map' => array(
                        0 => 'truncate',
                    ) ,
                    'type' => 'referenced_list',
                    'perPage' => 10
                ) ,
            ) ,
        ) ,
    ) ,
    'question_categories' => array(
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
                    'name' => 'question_count',
                    'template' => '<a href="#/questions/list?search=%7B%22question_category_id%22:{{entry.values.id}}%7D">{{entry.values.question_count}}</a>',
                    'label' => 'Questions',
                    'type' => 'number',
                ) ,
                3 => array(
                    'name' => 'created_at',
                    'label' => 'Created On',
                ) ,
            ) ,
            'title' => 'Exam Question Categories',
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
                2 => 'create',
            ) ,
        ) ,
        'creationview' => array(
            'fields' => array(
                0 => array(
                    'name' => 'name',
                    'label' => 'Name',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
            ) ,
        ) ,
    ) ,
    'question_display_types' => array(
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
                    'name' => 'created_at',
                    'label' => 'Created On',
                ) ,
            ) ,
            'title' => 'Question Display Types',
            'perPage' => '10',
            'sortField' => '',
            'sortDir' => '',
            'infinitePagination' => false,
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
                2 => 'create',
            ) ,
        ) ,
    ) ,
    'exam_statuses' => array(
        'listview' => array(
            'fields' => array(
                0 => array(
                    'name' => 'id',
                    'label' => 'ID',
                    'isDetailLink' => false,
                ) ,
                1 => array(
                    'name' => 'name',
                    'label' => 'Name',
                ) ,
                2 => array(
                    'name' => 'exams_user_count',
                    'label' => 'Exams Users',
                    'template' => '<a href="#/exams_users/list?search=%7B%22exam_status_id%22:{{entry.values.id}}%7D">{{entry.values.exams_user_count}}</a>',
                ) ,
            ) ,
            'title' => 'Exam Statuses',
            'perPage' => '10',
            'sortField' => '',
            'sortDir' => '',
            'infinitePagination' => false,
            'listActions' => array() ,
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
                    'name' => 'name',
                    'label' => 'Name',
                    'type' => 'string',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
            ) ,
        ) ,
        'editionview' => array(
            'fields' => array(
                0 => array(
                    'name' => 'name',
                    'label' => 'Name',
                    'type' => 'string',
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
                    'name' => 'name',
                    'label' => 'Name',
                ) ,
                2 => array(
                    'name' => 'exams_user_count',
                    'template' => '<a href="#/exams_users/list?search=%7B%22exam_status_id%22:{{entry.values.id}}%7D">{{entry.values.exams_user_count}}</a>',
                    'label' => 'Exams Users',
                ) ,
            ) ,
        ) ,
    ) ,
    'exam_views' => array(
        'listview' => array(
            'fields' => array(
                0 => array(
                    'name' => 'id',
                    'label' => 'ID',
                ) ,
                1 => array(
                    'name' => 'foreign_view.title',
                    'label' => 'Exam',
                ) ,
                2 => array(
                    'name' => 'user.username',
                    'label' => 'User',
                ) ,
                3 => array(
                    'name' => 'created_at',
                    'label' => 'Created On',
                ) ,
            ) ,
            'title' => 'Exam Views',
            'perPage' => '10',
            'sortField' => '',
            'sortDir' => '',
            'infinitePagination' => false,
            'listActions' => array(
                0 => 'delete'
            ) ,
            'batchActions' => array(
                0 => 'delete',
            ) ,
            'permanentFilters' => '',
            'actions' => array(
                0 => 'batch'
            ) ,
        ) ,
    ) ,
);
