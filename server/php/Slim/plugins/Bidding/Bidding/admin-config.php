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
        'icon_template' => '<span class="fa fa-industry"></span>',
        'child_sub_menu' => array(
            'projects' => array(
                'title' => 'Projects',
                'icon_template' => '<span class="fa fa-file-text-o"></span>',
                'suborder' => 1
            ) ,
            'bids' => array(
                'title' => 'Bids',
                'icon_template' => '<span class="fa fa-file-text-o"></span>',
                'suborder' => 2
            ) ,
            'project_views' => array(
                'title' => 'Project Views',
                'icon_template' => '<span class="glyphicon glyphicon-log-out"></span>',
                'suborder' => 10
            )
        ) ,
        'order' => 4
    ) ,
    'Master' => array(
        'title' => 'Master',
        'icon_template' => '<span class="glyphicon glyphicon-dashboard"></span>',
        'child_sub_menu' => array(
            'project_ranges' => array(
                'title' => 'Project Ranges',
                'icon_template' => '<span class="fa fa-file-text-o"></span>',
                'suborder' => 12
            ) ,
            'project_categories' => array(
                'title' => 'Project Categories',
                'icon_template' => '<span class="fa fa-file-text-o"></span>',
                'suborder' => 13
            ) ,
        ) ,
    ) ,
);
$tables = array(
    'projects' => array(
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
                    'name' => 'user.username',
                    'label' => 'Employer',
                ) ,
                3 => array(
                    'name' => 'freelancer.username',
                    'label' => 'Freelancer',
                ) ,
                4 => array(
                    'name' => 'project_range.name',
                    'label' => 'Budget Range',
                    'template' => '<budget-range entry="entry"  entity="entity"></budget-range>'
                ) ,
                5 => array(
                    'name' => 'project_status.name',
                    'label' => 'Project Status',
                ) ,
                6 => array(
                    'name' => 'total_listing_fee',
                    'label' => 'Listing Fee',
                ) ,
                7 => array(
                    'name' => 'site_commission_from_employer',
                    'label' => 'Site Commission From Employer',
                ) ,
                8 => array(
                    'name' => 'site_commission_from_freelancer',
                    'label' => 'Site Commission From Freelancer',
                ) ,
                9 => array(
                    'name' => 'is_featured',
                    'label' => 'Featured?',
                    'type' => 'boolean',
                ) ,
                10 => array(
                    'name' => 'is_urgent',
                    'label' => 'Urgent?',
                    'type' => 'boolean',
                ) ,
                11 => array(
                    'name' => 'is_private',
                    'label' => 'Private?',
                    'type' => 'boolean',
                ) ,
                12 => array(
                    'name' => 'is_hidded_bid',
                    'label' => 'Hidded Bid?',
                    'type' => 'boolean',
                ) ,
                14 => array(
                    'name' => 'created_at',
                    'label' => 'Created On',
                ) ,
            ) ,
            'title' => 'Projects',
            'perPage' => '10',
            'sortField' => '',
            'sortDir' => '',
            'infinitePagination' => false,
            'listActions' => array(
                0 => '<project-edit entity="project" id="{{entry.values.id}}"></project-edit>',
                1 => '<project-show entity="project" id="{{entry.values.id}}" slug="{{entry.values.slug}}" ></project-show>',
                2 => 'delete',
            ) ,
            'batchActions' => array(
                0 => 'delete',
                1 => '<batch-project-approved type="approved" action="projects" selection="selection"></batch-project-approved>',
                2 => '<batch-project-cancelled type="cancelled" action="projects" selection="selection"></batch-project-cancelled>'
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
                    'remoteCompleteAdditionalParams' => array(
                        'role' => 'employer'
                    ) ,
                    'permanentFilters' => array(
                        'role' => 'employer'
                    )
                ) ,
                1 => array(
                    'name' => 'project_status_id',
                    'label' => 'Status',
                    'type' => 'choice',
                    'choices' => array(
                        0 => array(
                            'label' => 'Draft',
                            'value' => 1,
                        ) ,
                        1 => array(
                            'label' => 'PaymentPending',
                            'value' => 2,
                        ) ,
                        2 => array(
                            'label' => 'PendingForApproval',
                            'value' => 3,
                        ) ,
                        3 => array(
                            'label' => 'OpenForBidding',
                            'value' => 4,
                        ) ,
                        4 => array(
                            'label' => 'BiddingExpired',
                            'value' => 5,
                        ) ,
                        5 => array(
                            'label' => 'WinnerSelected',
                            'value' => 6,
                        ) ,
                        6 => array(
                            'label' => 'WaitingForEscrow',
                            'value' => 7,
                        ) ,
                        7 => array(
                            'label' => 'FundedInEscrow',
                            'value' => 8,
                        ) ,
                        8 => array(
                            'label' => 'BiddingClosed',
                            'value' => 9,
                        ) ,
                        9 => array(
                            'label' => 'EmployerCanceled',
                            'value' => 10,
                        ) ,
                        10 => array(
                            'label' => 'UnderDevelopment',
                            'value' => 11,
                        ) ,
                        11 => array(
                            'label' => 'MutuallyCanceled',
                            'value' => 12,
                        ) ,
                        12 => array(
                            'label' => 'CanceledByAdmin',
                            'value' => 13,
                        ) ,
                        13 => array(
                            'label' => 'FinalReviewPending',
                            'value' => 14,
                        ) ,
                        14 => array(
                            'label' => 'Completed',
                            'value' => 15,
                        ) ,
                        15 => array(
                            'label' => 'Closed',
                            'value' => 16,
                        ) ,
                    )
                ) ,
            ) ,
            'permanentFilters' => '',
            'actions' => array(
                0 => 'batch',
                1 => 'filter',
                2 => '<project-create entity="project"></project-create>',
            ) ,
        ) ,
        'creationview' => array(
            'fields' => array(
                0 => array(
                    'name' => 'project_status_id',
                    'type' => 'reference',
                    'label' => 'Project Status',
                    'targetEntity' => 'project_statuses',
                    'targetField' => 'name',
                    'remoteComplete' => true,
                ) ,
                1 => array(
                    'name' => 'address',
                    'label' => 'Full Address',
                    'type' => 'string',
                    'template' => '<google-places entry="entry" entity="entity"></google-places>',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                2 => array(
                    'name' => 'address1',
                    'label' => 'Address',
                    'type' => 'string',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                3 => array(
                    'name' => 'city.name',
                    'label' => 'City',
                    'type' => 'string',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                4 => array(
                    'name' => 'state.name',
                    'label' => 'State',
                    'type' => 'string',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                5 => array(
                    'name' => 'country.iso_alpha2',
                    'label' => 'Country',
                    'type' => 'string',
                    'validation' => array(
                        'required' => false,
                    ) ,
                ) ,
                6 => array(
                    'name' => 'zip_code',
                    'label' => 'Zip Code',
                    'type' => 'string',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                7 => array(
                    'name' => 'latitude',
                    'label' => 'Latitude',
                    'type' => 'string',
                    'validation' => array(
                        'required' => false,
                    ) ,
                ) ,
                8 => array(
                    'name' => 'longitude',
                    'label' => 'Longitude',
                    'type' => 'string',
                    'validation' => array(
                        'required' => false,
                    ) ,
                ) ,
                9 => array(
                    'name' => 'project_range_id',
                    'type' => 'reference',
                    'label' => 'Project Range',
                    'targetEntity' => 'project_ranges',
                    'targetField' => 'name',
                    'remoteComplete' => true,
                ) ,
                10 => array(
                    'name' => 'name',
                    'label' => 'Name',
                    'type' => 'string',
                    'validation' => array(
                        'required' => false,
                    )
                ) ,
                11 => array(
                    'name' => 'description',
                    'label' => 'Description',
                    'type' => 'text',
                    'validation' => array(
                        'required' => false,
                    )
                ) ,
                12 => array(
                    'name' => 'bid_duration',
                    'label' => 'Bid Duration',
                    'type' => 'number',
                    'validation' => array(
                        'required' => false,
                    )
                ) ,
                13 => array(
                    'name' => 'is_featured',
                    'label' => 'Featured?',
                    'type' => 'choice',
                    'validation' => array(
                        'required' => true,
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
                14 => array(
                    'name' => 'is_urgent',
                    'label' => 'Is Urgent',
                    'type' => 'boolean',
                    'validation' => array(
                        'required' => true,
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
                15 => array(
                    'name' => 'is_active',
                    'label' => 'Active?',
                    'type' => 'choice',
                    'validation' => array(
                        'required' => true,
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
                16 => array(
                    'name' => 'is_notification_sent',
                    'label' => 'Notification Sent?',
                    'type' => 'choice',
                    'validation' => array(
                        'required' => true,
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
                17 => array(
                    'name' => 'address1',
                    'label' => 'Address1',
                    'type' => 'string',
                    'validation' => array(
                        'required' => true,
                    )
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
                    'name' => 'user.username',
                    'label' => 'Employer',
                ) ,
                3 => array(
                    'name' => 'freelancer.username',
                    'label' => 'Freelancer',
                ) ,
                4 => array(
                    'name' => 'project_range.name',
                    'label' => 'Budget Range',
                    'template' => '<budget-range entry="entry"  entity="entity"></budget-range>'
                ) ,
                5 => array(
                    'name' => 'description',
                    'label' => 'Description',
                ) ,
                6 => array(
                    'name' => 'project_status.name',
                    'label' => 'Project Status',
                ) ,
                7 => array(
                    'name' => 'total_paid_amount',
                    'label' => 'Total Paid Amount to Freelancer',
                ) ,
                8 => array(
                    'name' => 'total_listing_fee',
                    'label' => 'Listing Fee',
                ) ,
                9 => array(
                    'name' => 'site_commission_from_employer',
                    'label' => 'Site Commission From Employer',
                ) ,
                10 => array(
                    'name' => 'site_commission_from_freelancer',
                    'label' => 'Site Commission From Freelancer',
                ) ,
                11 => array(
                    'name' => 'is_featured',
                    'label' => 'Featured?',
                    'type' => 'boolean',
                ) ,
                12 => array(
                    'name' => 'is_urgent',
                    'label' => 'Urgent?',
                    'type' => 'boolean',
                ) ,
                13 => array(
                    'name' => 'is_private',
                    'label' => 'Private?',
                    'type' => 'boolean',
                ) ,
                14 => array(
                    'name' => 'is_hidded_bid',
                    'label' => 'Hidded Bid?',
                    'type' => 'boolean',
                ) ,
                15 => array(
                    'name' => 'is_dispute',
                    'label' => 'Disputed?',
                    'type' => 'boolean',
                ) ,
                16 => array(
                    'name' => 'is_cancel_request_employer',
                    'label' => 'Cancel Request From Employer?',
                    'type' => 'boolean',
                ) ,
                17 => array(
                    'name' => 'is_cancel_request_freelancer',
                    'label' => 'Cancel Request From Freelancer?',
                    'type' => 'boolean',
                ) ,
                18 => array(
                    'name' => 'follower_count',
                    'template' => '<a href="#/project_followers/list?search=%7B%22class%22:%22Project%22,%22foreign_id%22:{{entry.values.id}}%7D">{{entry.values.follower_count}}</a>',
                    'label' => 'Follows',
                ) ,
                20 => array(
                    'name' => 'view_count',
                    'template' => '<a href="#/project_views/list?search=%7B%22class%22:%22Project%22,%22foreign_id%22:{{entry.values.id}}%7D">{{entry.values.view_count}}</a>',
                    'label' => 'Views',
                ) ,
                21 => array(
                    'name' => 'Bids',
                    'label' => 'Bids',
                    'targetEntity' => 'bids',
                    'targetReferenceField' => 'project_id',
                    'targetFields' => array(
                        0 => array(
                            'name' => 'id',
                            'label' => 'ID',
                            'isDetailLink' => true,
                        ) ,
                        1 => array(
                            'name' => 'user.username',
                            'label' => 'Freelancer',
                        ) ,
                        2 => array(
                            'name' => 'amount',
                            'label' => 'Quote Amount',
                        ) ,
                        3 => array(
                            'name' => 'duration',
                            'label' => 'Duration',
                        ) ,
                        4 => array(
                            'name' => 'bid_status.name',
                            'label' => 'Status',
                        ) ,
                    ) ,
                    'map' => array(
                        0 => 'truncate',
                    ) ,
                    'type' => 'referenced_list',
                    'perPage' => 10
                ) ,
                22 => array(
                    'name' => 'Milestones',
                    'label' => 'Milestones',
                    'targetEntity' => 'milestones',
                    'targetReferenceField' => 'project_id',
                    'targetFields' => array(
                        0 => array(
                            'name' => 'id',
                            'label' => 'ID',
                            'isDetailLink' => true,
                        ) ,
                        1 => array(
                            'name' => 'amount',
                            'label' => 'Amount',
                        ) ,
                        2 => array(
                            'name' => 'milestone_status.name',
                            'label' => 'Milestone Status',
                        ) ,
                        3 => array(
                            'name' => 'site_commission_from_employer',
                            'label' => 'Site Commission From Employer',
                        ) ,
                        4 => array(
                            'name' => 'site_commission_from_freelancer',
                            'label' => 'Commission From Freelancer',
                        ) ,
                        5 => array(
                            'name' => 'created_at',
                            'label' => 'Created On',
                        ) ,
                    ) ,
                    'map' => array(
                        0 => 'truncate',
                    ) ,
                    'type' => 'referenced_list',
                    'perPage' => 10
                ) ,
                23 => array(
                    'name' => 'Invoices',
                    'label' => 'Invoices',
                    'targetEntity' => 'project_bid_invoices',
                    'targetReferenceField' => 'project_id',
                    'targetFields' => array(
                        0 => array(
                            'name' => 'id',
                            'label' => 'ID',
                            'isDetailLink' => true,
                        ) ,
                        1 => array(
                            'name' => 'amount',
                            'label' => 'Amount',
                        ) ,
                        2 => array(
                            'name' => 'site_fee',
                            'label' => 'Site Fee',
                        ) ,
                        3 => array(
                            'name' => 'is_paid',
                            'label' => 'Paid?',
                            'type' => 'boolean',
                        ) ,
                        4 => array(
                            'name' => 'paid_on',
                            'label' => 'Paid On',
                        ) ,
                        5 => array(
                            'name' => 'pay_key',
                            'label' => 'Pay Key',
                        ) ,
                        6 => array(
                            'name' => 'zazpay_pay_key',
                            'label' => 'Zazpay Pay Key',
                        ) ,
                        7 => array(
                            'name' => 'zazpay_payment.name',
                            'label' => 'Zazpay Payment',
                        ) ,
                        8 => array(
                            'name' => 'zazpay_gateway.name',
                            'label' => 'Zazpay Gateway',
                        ) ,
                        9 => array(
                            'name' => 'zazpay_revised_amount',
                            'label' => 'Zazpay Revised Amount',
                        ) ,
                        10 => array(
                            'name' => 'site_commission_from_employer',
                            'label' => 'Site Commission From Employer',
                        ) ,
                        11 => array(
                            'name' => 'site_commission_from_freelancer',
                            'label' => 'Site Commission From Freelancer',
                        ) ,
                        12 => array(
                            'name' => 'user.username',
                            'label' => 'User',
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
    'project_categories' => array(
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
                    'name' => 'project_count',
                    'label' => 'Project Count',
                    'template' => '<a href="#/projects/list?search=%7B%22project_categories%22:{{entry.values.name}}%7D">{{entry.values.project_count}}</a>'
                ) ,
                3 => array(
                    'name' => 'is_active',
                    'label' => 'Active?',
                    'type' => 'boolean',
                ) ,
                4 => array(
                    'name' => 'active_project_count',
                    'template' => '<a href="#/projects/list?search=%7B%22project_status_id%22:4%7D">{{entry.values.active_project_count}}</a>',
                    'label' => 'Active Projects',
                ) ,
                5 => array(
                    'name' => 'created_at',
                    'label' => 'Created On',
                ) ,
            ) ,
            'title' => 'Project Categories',
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
                1 => array(
                    'name' => 'filter',
                    'label' => 'Active?',
                    'type' => 'choice',
                    'choices' => array(
                        0 => array(
                            'label' => 'Active',
                            'value' => true,
                        ) ,
                        1 => array(
                            'label' => 'Inactive',
                            'value' => false,
                        ) ,
                    ) ,
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
                1 => array(
                    'name' => 'is_active',
                    'label' => 'Active?',
                    'type' => 'boolean',
                    'defaultValue' => false,
                    'validation' => array(
                        'required' => true,
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
                2 => array(
                    'name' => 'icon_class',
                    'label' => 'Icon Class',
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
                1 => array(
                    'name' => 'is_active',
                    'label' => 'Active?',
                    'type' => 'boolean',
                    'defaultValue' => false,
                    'validation' => array(
                        'required' => true,
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
                2 => array(
                    'name' => 'icon_class',
                    'label' => 'Icon Class',
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
                    'name' => 'project_count',
                    'label' => 'Project Count',
                    'template' => '<a href="#/projects/list?search=%7B%22project_categories%22:{{entry.values.name}}%7D">{{entry.values.project_count}}</a>'
                ) ,
                3 => array(
                    'name' => 'is_active',
                    'label' => 'Active?',
                    'type' => 'boolean',
                ) ,
                4 => array(
                    'name' => 'active_project_count',
                    'template' => '<a href="#/projects/list?search=%7B%22project_status_id%22:4%7D">{{entry.values.active_project_count}}</a>',
                    'label' => 'Active Projects',
                ) ,
                5 => array(
                    'name' => 'created_at',
                    'label' => 'Created On',
                ) ,
                 6 => array(
                    'name' => 'icon_class',
                    'label' => 'Icon Class',
                ) ,
            ) ,
        ) ,
    ) ,
    'project_ranges' => array(
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
                    'name' => 'min_amount',
                    'label' => 'Min Amount',
                ) ,
                3 => array(
                    'name' => 'max_amount',
                    'label' => 'Max Amount',
                ) ,
                4 => array(
                    'name' => 'is_active',
                    'label' => 'Is It Active',
                    'type' => 'boolean',
                ) ,
                5 => array(
                    'name' => 'project_count',
                    'label' => 'Projects',
                    'template' => '<a href="#/projects/list?search=%7B%22project_range_id%22:{{entry.values.id}}%7D">{{entry.values.project_count}}</a>',
                ) ,
                6 => array(
                    'name' => 'active_project_count',
                    'template' => '<a href="#/projects/list?search=%7B%22project_status_id%22:4%7D">{{entry.values.active_project_count}}</a>',
                    'label' => 'Active Projects',
                ) ,
                7 => array(
                    'name' => 'created_at',
                    'label' => 'Created On',
                ) ,
            ) ,
            'title' => 'Project Ranges',
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
                1 => array(
                    'name' => 'filter',
                    'label' => 'Active?',
                    'type' => 'choice',
                    'choices' => array(
                        0 => array(
                            'label' => 'Yes',
                            'value' => 'active',
                        ) ,
                        1 => array(
                            'label' => 'No',
                            'value' => 'inactive',
                        ) ,
                    )
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
                1 => array(
                    'name' => 'min_amount',
                    'label' => 'Min Amount',
                    'type' => 'number',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                2 => array(
                    'name' => 'max_amount',
                    'label' => 'Max Amount',
                    'type' => 'number',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                3 => array(
                    'name' => 'is_active',
                    'label' => 'Active?',
                    'type' => 'boolean',
                    'defaultValue' => false,
                    'validation' => array(
                        'required' => true,
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
                1 => array(
                    'name' => 'min_amount',
                    'label' => 'Min Amount',
                    'type' => 'number',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                2 => array(
                    'name' => 'max_amount',
                    'label' => 'Max Amount',
                    'type' => 'number',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                3 => array(
                    'name' => 'is_active',
                    'label' => 'Active?',
                    'type' => 'boolean',
                    'defaultValue' => false,
                    'validation' => array(
                        'required' => true,
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
                    'name' => 'min_amount',
                    'label' => 'Min Amount',
                ) ,
                3 => array(
                    'name' => 'max_amount',
                    'label' => 'Max Amount',
                ) ,
                4 => array(
                    'name' => 'is_active',
                    'label' => 'Is It Active',
                    'type' => 'boolean',
                ) ,
                5 => array(
                    'name' => 'project_count',
                    'template' => '<a href="#/projects/list?search=%7B%22project_range_id%22:{{entry.values.id}}%7D">{{entry.values.project_count}}</a>',
                    'label' => 'Projects',
                ) ,
                6 => array(
                    'name' => 'active_project_count',
                    'template' => '<a href="#/projects/list?search=%7B%22project_status_id%22:4%7D">{{entry.values.active_project_count}}</a>',
                    'label' => 'Active Projects',
                ) ,
                7 => array(
                    'name' => 'created_at',
                    'label' => 'Created On',
                ) ,
            ) ,
        ) ,
    ) ,
    'bids' => array(
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
                    'name' => 'user.username',
                    'label' => 'Freelancer',
                ) ,
                3 => array(
                    'name' => 'amount',
                    'label' => 'Quote Amount',
                ) ,
                4 => array(
                    'name' => 'duration',
                    'label' => 'Duration',
                ) ,
                5 => array(
                    'name' => 'bid_status.name',
                    'label' => 'Status',
                ) ,
            ) ,
            'title' => 'Bids',
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
                1 => array(
                    'name' => 'bid_status_id',
                    'label' => 'Status',
                    'type' => 'choice',
                    'choices' => array(
                        0 => array(
                            'label' => 'Pending',
                            'value' => 1,
                        ) ,
                        1 => array(
                            'label' => 'Won',
                            'value' => 2,
                        ) ,
                        2 => array(
                            'label' => 'Lost',
                            'value' => 3,
                        ) ,
                    )
                ) ,
                2 => array(
                    'name' => 'is_freelancer_withdrawn',
                    'label' => 'Freelancer Withdraws?',
                    'type' => 'choice',
                    'choices' => array(
                        0 => array(
                            'label' => 'Yes',
                            'value' => true,
                        ) ,
                        1 => array(
                            'label' => 'No',
                            'value' => false,
                        ) ,
                    )
                ) ,
                3 => array(
                    'name' => 'user_id',
                    'label' => 'User',
                    'targetEntity' => 'users',
                    'targetField' => 'username',
                    'map' => array(
                        0 => 'truncate',
                    ) ,
                    'type' => 'reference',
                    'remoteComplete' => true,
                    'remoteCompleteAdditionalParams' => array(
                        'role' => 'freelancer'
                    ) ,
                    'permanentFilters' => array(
                        'role' => 'freelancer'
                    )
                ) ,
                4 => array(
                    'name' => 'project_id',
                    'label' => 'Projects',
                    'targetEntity' => 'projects',
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
    ) ,
    'project_flags' => array(
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
                    'name' => 'foreign_flag.name',
                    'label' => 'Project',
                ) ,
                3 => array(
                    'name' => 'flag_category.name',
                    'label' => 'Category',
                ) ,
                4 => array(
                    'name' => 'message',
                    'label' => 'Message',
                    'map' => array(
                        0 => 'truncate',
                    ) ,
                ) ,
                5 => array(
                    'name' => 'created_at',
                    'label' => 'Created On',
                )
            ) ,
            'title' => 'Project Flags',
            'perPage' => '10',
            'sortField' => '',
            'sortDir' => '',
            'infinitePagination' => false,
            'listActions' => array(
                0 => 'edit',
                1 => 'show',
                2 => 'delete',
            ) ,
            'permanentFilters' => '',
            'actions' => array(
                0 => 'batch',
                1 => 'filter',
            ) ,
        ) ,
        'showview' => array(
            'fields' => array(
                0 => array(
                    'name' => 'id',
                    'label' => 'ID'
                ) ,
                1 => array(
                    'name' => 'user.username',
                    'label' => 'User',
                ) ,
                2 => array(
                    'name' => 'foreign_flag.name',
                    'label' => 'Project',
                ) ,
                3 => array(
                    'name' => 'flag_category.name',
                    'label' => 'Category',
                ) ,
                4 => array(
                    'name' => 'message',
                    'label' => 'Message',
                ) ,
                5 => array(
                    'name' => 'created_at',
                    'label' => 'Created On',
                ) ,
            ) ,
        ) ,
    ) ,
    'project_followers' => array(
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
                    'name' => 'foreign_follower.name',
                    'label' => 'Project',
                ) ,
                3 => array(
                    'name' => 'created_at',
                    'label' => 'Created On',
                ) ,
            ) ,
            'title' => 'Project Bookmarks',
            'perPage' => '10',
            'sortField' => '',
            'sortDir' => '',
            'infinitePagination' => false,
            'listActions' => array(
                0 => 'edit',
                1 => 'show',
                2 => 'delete',
            ) ,
            'permanentFilters' => '',
            'actions' => array(
                0 => 'batch',
                1 => 'filter',
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
                    'name' => 'user.username',
                    'label' => 'User',
                ) ,
                2 => array(
                    'name' => 'foreign_follower.name',
                    'label' => 'Project',
                ) ,
                3 => array(
                    'name' => 'created_at',
                    'label' => 'Created On',
                ) ,
            ) ,
        ) ,
    ) ,
    'project_flag_categories' => array(
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
                    'name' => 'flag_count',
                    'template' => '<a href="#/project_flags/list?search=%7B%22class%22:%22Project%22,%22foreign_id%22:{{entry.values.id}}%7D">{{entry.values.flag_count}}</a>',
                    'label' => 'Flags',
                ) ,
                3 => array(
                    'name' => 'is_active',
                    'label' => 'Active?',
                    'type' => 'boolean',
                ) ,
            ) ,
            'title' => 'Project Flag Categories',
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
                2 => array(
                    'name' => 'is_active',
                    'label' => 'Active?',
                    'type' => 'choice',
                    'defaultValue' => false,
                    'validation' => array(
                        'required' => true,
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
            ) ,
            'prepare' => array(
                'class' => 'Project'
            )
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
                1 => array(
                    'name' => 'class',
                    'label' => 'Class',
                    'type' => 'string',
                    'validation' => array(
                        'required' => false,
                    ) ,
                ) ,
                2 => array(
                    'name' => 'is_active',
                    'label' => 'Active?',
                    'type' => 'choice',
                    'defaultValue' => false,
                    'validation' => array(
                        'required' => true,
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
            ) ,
        ) ,
        'showview' => array(
            'fields' => array(
                0 => array(
                    'name' => 'id',
                    'label' => 'id',
                    'isDetailLink' => true,
                ) ,
                1 => array(
                    'name' => 'name',
                    'label' => 'Name',
                ) ,
                2 => array(
                    'name' => 'flag_count',
                    'template' => '<a href="#/project_flags/list?search=%7B%22class%22:%22Project%22,%22foreign_id%22:{{entry.values.id}}%7D">{{entry.values.flag_count}}</a>',
                    'label' => 'Flags',
                ) ,
                3 => array(
                    'name' => 'is_active',
                    'label' => 'Active?',
                    'type' => 'boolean'
                ) ,
            ) ,
        ) ,
    ) ,
    'project_reviews' => array(
        'listview' => array(
            'fields' => array(
                0 => array(
                    'name' => 'id',
                    'label' => 'ID',
                    'isDetailLink' => true,
                ) ,
                1 => array(
                    'name' => 'foreign_review_model.name',
                    'label' => 'Project',
                ) ,
                2 => array(
                    'name' => 'user.username',
                    'label' => 'Reviewed By',
                ) ,
                3 => array(
                    'name' => 'other_user.username',
                    'label' => 'Reviewed To',
                ) ,
                4 => array(
                    'name' => 'rating',
                    'label' => 'Rating',
                    'template' => '<star-rating stars="{{entry.values.rating}}"></star-rating>',
                ) ,
                5 => array(
                    'name' => 'message',
                    'label' => 'Review',
                    'map' => array(
                        0 => 'truncate',
                    ) ,
                ) ,
                6 => array(
                    'name' => 'created_at',
                    'label' => 'Created On',
                ) ,
            ) ,
            'title' => 'Project Reviews',
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
            'permanentFilters' => '',
            'actions' => array(
                0 => 'batch'
            ) ,
        ) ,
        'editionview' => array(
            'fields' => array(
                0 => array(
                    'name' => 'id',
                    'label' => 'ID',
                    'editable' => false
                ) ,
                1 => array(
                    'name' => 'foreign_review_model.name',
                    'label' => 'Project',
                    'editable' => false
                ) ,
                2 => array(
                    'name' => 'user.username',
                    'label' => 'Reviewed By',
                    'editable' => false
                ) ,
                3 => array(
                    'name' => 'other_user.username',
                    'label' => 'Reviewed To',
                    'editable' => false
                ) ,
                4 => array(
                    'name' => 'rating',
                    'label' => 'Rating',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                5 => array(
                    'name' => 'message',
                    'label' => 'Review',
                    'type' => 'text',
                    'validation' => array(
                        'required' => false,
                    ) ,
                ) ,
            ) ,
            'prepare' => array(
                'class' => 'Bid'
            )
        ) ,
        'showview' => array(
            'fields' => array(
                0 => array(
                    'name' => 'id',
                    'label' => 'ID',
                    'isDetailLink' => true,
                ) ,
                1 => array(
                    'name' => 'foreign_review_model.name',
                    'label' => 'Project',
                ) ,
                2 => array(
                    'name' => 'user.username',
                    'label' => 'Reviewed By',
                ) ,
                3 => array(
                    'name' => 'other_user.username',
                    'label' => 'Reviewed To',
                ) ,
                4 => array(
                    'name' => 'rating',
                    'label' => 'Rating',
                    'template' => '<star-rating stars="{{entry.values.rating}}"></star-rating>',
                ) ,
                5 => array(
                    'name' => 'message',
                    'label' => 'Review'
                ) ,
                6 => array(
                    'name' => 'created_at',
                    'label' => 'Created On',
                ) ,
            ) ,
        ) ,
        'creationview' => array(
            'fields' => array(
                0 => array(
                    'name' => 'rating',
                    'label' => 'Rating',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                1 => array(
                    'name' => 'message',
                    'label' => 'Message',
                ) ,
            ) ,
        ) ,
    ) ,
    'project_views' => array(
        'listview' => array(
            'fields' => array(
                0 => array(
                    'name' => 'id',
                    'label' => 'ID',
                ) ,
                1 => array(
                    'name' => 'foreign_view.name',
                    'label' => 'Project',
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
            'title' => 'Project Views',
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
$dashboard = array(
    'projects' => array(
        'addCollection' => array(
            'fields' => array(
                0 => array(
                    'name' => 'user.username',
                    'label' => 'User'
                ) ,
                1 => array(
                    'name' => 'name',
                    'label' => 'Project'
                ) ,
                2 => array(
                    'name' => 'project_status.name',
                    'label' => 'Status'
                ) ,
                3 => array(
                    'name' => 'project_range.name',
                    'label' => 'Budget'
                ) ,
            ) ,
            'title' => 'Recent Projects',
            'name' => 'recent_projects',
            'perPage' => 5,
            'order' => 3,
            'template' => '<div class="col-lg-6"><div class="panel"><ma-dashboard-panel collection="dashboardController.collections.recent_projects" entries="dashboardController.entries.recent_projects" datastore="dashboardController.datastore"></ma-dashboard-panel></div></div>'
        )
    )
);
if (isPluginEnabled('Bidding/Milestone')) {
    $milestone_table = array(
        'projects' => array(
            'listview' => array(
                'fields' => array(
                    0 => array(
                        'name' => 'milestone_count',
                        'label' => 'Milestones',
                        'template' => '<a href="#/milestones/list?search=%7B%22project_id%22:{{entry.values.id}}%7D">{{entry.values.milestone_count}}</a>'
                    )
                )
            ) ,
            'showview' => array(
                'fields' => array(
                    0 => array(
                        'name' => 'milestone_count',
                        'label' => 'Milestones',
                        'template' => '<a href="#/milestones/list?search=%7B%22project_id%22:{{entry.values.id}}%7D">{{entry.values.milestone_count}}</a>'
                    )
                )
            )
        )
    );
    $tables = merge_details($tables, $milestone_table);
}
if (isPluginEnabled('Bidding/Invoice')) {
    $invoice_table = array(
        'projects' => array(
            'listview' => array(
                'fields' => array(
                    0 => array(
                        'name' => 'project_bid_invoice_count',
                        'template' => '<a href="#/project_bid_invoices/list?search=%7B%22project_id%22:{{entry.values.id}}%7D">{{entry.values.project_bid_invoice_count}}</a>',
                        'label' => 'Invoices',
                    )
                )
            ) ,
            'showview' => array(
                'fields' => array(
                    0 => array(
                        'name' => 'project_bid_invoice_count',
                        'template' => '<a href="#/project_bid_invoices/list?search=%7B%22project_id%22:{{entry.values.id}}%7D">{{entry.values.project_bid_invoice_count}}</a>',
                        'label' => 'Invoices',
                    )
                )
            )
        )
    );
    $tables = merge_details($tables, $invoice_table);
}
if (isPluginEnabled('Bidding/ProjectFollow')) {
    $portfolio_menu = array(
        'projects' => array(
            'title' => 'Projects',
            'icon_template' => '<span class="fa fa-file-text-o"></span>',
            'child_sub_menu' => array(
                'project_followers' => array(
                    'title' => 'Project Bookmarks',
                    'icon_template' => '<span class="glyphicon glyphicon-log-out"></span>',
                    'suborder' => 7
                )
            )
        )
    );
    $menus = merged_menus($menus, $portfolio_menu);
}
if (isPluginEnabled('Bidding/ProjectFlag')) {
    $portfolio_menu = array(
        'projects' => array(
            'title' => 'Projects',
            'icon_template' => '<span class="fa fa-file-text-o"></span>',
            'child_sub_menu' => array(
                'project_flags' => array(
                    'title' => 'Project Flags',
                    'icon_template' => '<span class="glyphicon glyphicon-log-out"></span>',
                    'suborder' => 6
                )
            )
        )
    );
    $menus = merged_menus($menus, $portfolio_menu);
}
if (isPluginEnabled('Bidding/ProjectFlag')) {
    $portfolio_menu = array(
        'Master' => array(
            'title' => 'Master',
            'icon_template' => '<span class="glyphicon glyphicon-dashboard"></span>',
            'child_sub_menu' => array(
                'project_flag_categories' => array(
                    'title' => 'Project Flag Categories',
                    'icon_template' => '<span class="glyphicon glyphicon-log-out"></span>',
                    'suborder' => 28
                ) ,
            )
        )
    );
    $menus = merged_menus($menus, $portfolio_menu);
}
if (isPluginEnabled('Bidding/BiddingReview')) {
    $portfolio_menu = array(
        'projects' => array(
            'title' => 'Projects',
            'icon_template' => '<span class="fa fa-file-text-o"></span>',
            'child_sub_menu' => array(
                'project_reviews' => array(
                    'title' => 'Project Reviews',
                    'icon_template' => '<span class="glyphicon glyphicon-log-out"></span>',
                    'suborder' => 8
                )
            )
        )
    );
    $menus = merged_menus($menus, $portfolio_menu);
}
if (isPluginEnabled('Common/Flag')) {
    $project_table = array(
        'projects' => array(
            'listview' => array(
                'fields' => array(
                    13 => array(
                        'name' => 'flag_count',
                        'label' => 'Flags',
                        'template' => '<a href="#/service_flags/list?search=%7B%22class%22:%22Project%22,%22foreign_id%22:{{entry.values.id}}%7D">{{entry.values.flag_count}}</a>',
                    )
                )
            ),
            'showview' => array(
                'fields' => array(
                    19 => array(
                        'name' => 'flag_count',
                        'template' => '<a href="#/project_flags/list?search=%7B%22class%22:%22Project%22,%22foreign_id%22:{{entry.values.id}}%7D">{{entry.values.flag_count}}</a>',
                        'label' => 'Flags',
                    )
                )
            )
        )
    );
    $tables = merge_details($tables, $project_table);
}
