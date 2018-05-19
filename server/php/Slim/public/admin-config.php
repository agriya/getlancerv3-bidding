<?php
/**
 * For Admin config
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
    'Users' => array(
        'title' => 'Users',
        'icon_template' => '<span class="fa fa-users"></span>',
        'child_sub_menu' => array(
            'users' => array(
                'title' => 'Users',
                'icon_template' => '<span class="glyphicon glyphicon-user"></span>',
                'suborder' => 1
            ) ,
            'contacts' => array(
                'title' => 'Contacts',
                'icon_template' => '<span class="fa fa-file-text-o"></span>',
                'suborder' => 6
            ) ,
            'user_logins' => array(
                'title' => 'User Logins',
                'icon_template' => '<span class="glyphicon glyphicon-log-out"></span>',
                'suborder' => 7
            ) ,
            'user_views' => array(
                'title' => 'User Views',
                'icon_template' => '<span class="glyphicon glyphicon-log-out"></span>',
                'suborder' => 10
            )
        ) ,
        'order' => 1
    ) ,
    'Master' => array(
        'title' => 'Master',
        'icon_template' => '<span class="glyphicon glyphicon-dashboard"></span>',
        'child_sub_menu' => array(
            'cities' => array(
                'title' => 'Cities',
                'icon_template' => '<span class="fa fa-flag"></span>',
                'suborder' => 1
            ) ,
            'states' => array(
                'title' => 'States',
                'icon_template' => '<span class="fa fa-globe"></span>',
                'suborder' => 2
            ) ,
            'countries' => array(
                'title' => 'Countries',
                'icon_template' => '<span class="fa fa-globe"></span>',
                'suborder' => 3
            ) ,
            'pages' => array(
                'title' => 'Pages',
                'icon_template' => '<span class="fa fa-table"></span>',
                'suborder' => 4
            ) ,
            'languages' => array(
                'title' => 'Languages',
                'icon_template' => '<span class="fa fa-language"></span>',
                'suborder' => 5
            ) ,
            'translations' => array(
                'title' => 'Translations',
                'icon_template' => '<span class="fa fa-language"></span>',
                'link' => '/translations/all',
                'suborder' => 5
            ) ,
            'ips' => array(
                'title' => 'IPs',
                'icon_template' => '<span class="fa fa-barcode"></span>',
                'suborder' => 6
            ) ,
            'email_templates' => array(
                'title' => 'Email Templates',
                'icon_template' => '<span class="fa fa-inbox"></span>',
                'suborder' => 7
            ) ,
            'skills' => array(
                'title' => 'Skills',
                'icon_template' => '<span class="glyphicon glyphicon-log-out"></span>',
                'suborder' => 8
            ) ,
            'providers' => array(
                'title' => 'Providers',
                'icon_template' => '<span class="glyphicon glyphicon-log-out"></span>',
                'suborder' => 32
            )
        ) ,
        'order' => 11
    ) ,
    'Payments' => array(
        'title' => 'Payments',
        'icon_template' => '<span class="glyphicon glyphicon-usd"></span>',
        'child_sub_menu' => array(
            'payment_gateways' => array(
                'title' => 'Payment Gateways',
                'icon_template' => '<span class="glyphicon glyphicon-log-out"></span>',
                'suborder' => 1
            ) ,
            'transactions' => array(
                'title' => 'Transactions',
                'icon_template' => '<span class="glyphicon glyphicon-log-out"></span>',
                'link' => '/transactions/all',
                'suborder' => 2
            ) ,
        ) ,
        'order' => 9
    ) ,
    'Settings' => array(
        'title' => 'Settings',
        'icon_template' => '<span class="glyphicon glyphicon-cog"></span>',
        'child_sub_menu' => array(
            'setting_categories' => array(
                'title' => 'Site Settings',
                'icon_template' => '<span class="fa fa-cog"></span>',
                'suborder' => 1
            )
        ) ,
        'order' => 10
    ) ,
);
$tables = array(
    'users' => array(
        'listview' => array(
            'fields' => array(
                0 => array(
                    'name' => 'id',
                    'label' => 'ID',
                    'template' => '<a href="#/users/show/{{entry.values.id}}">{{entry.values.id}}</a>',
                ) ,
                1 => array(
                    'name' => 'role.name',
                    'label' => 'Category',
                ) ,
                2 => array(
                    'name' => 'username',
                    'label' => 'Username',
                ) ,
                3 => array(
                    'name' => 'email',
                    'label' => 'Email',
                ) ,
                8 => array(
                    'name' => 'user_login_count',
                    'template' => '<a href="#/user_logins/list?search=%7B%22user_id%22:{{entry.values.id}}%7D">{{entry.values.user_login_count}}</a>',
                    'label' => 'Logins',
                ) ,
                9 => array(
                    'name' => 'created_at',
                    'label' => 'Created On',
                ) ,
                10 => array(
                    'name' => 'is_active',
                    'label' => 'Active?',
                    'type' => 'boolean',
                ) ,
            ) ,
            'title' => 'Users',
            'perPage' => '10',
            'sortField' => '',
            'sortDir' => '',
            'infinitePagination' => false,
            'listActions' => array(
                0 => 'edit',
                1 => 'show',
                2 => 'delete',
                3 => '<change-password entry="entry" entity="entity" size="sm" label="Change Password" ></change-password>',
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
                    'template' => '<div class="input-group"><input type="text" ng-model="value" placeholder="Search" class="form-control"></input><span class="input-group-addon"><i class="fa fa-search text-primary"></i></span></div>',
                ) ,
                1 => array(
                    'name' => 'role_id',
                    'label' => 'Category',
                    'targetEntity' => 'roles',
                    'targetField' => 'name',
                    'map' => array(
                        0 => 'truncate',
                    ) ,
                    'type' => 'reference',
                    'remoteComplete' => true,
                ) ,
                2 => array(
                    'name' => 'filter',
                    'label' => 'Active?',
                    'type' => 'choice',
                    'defaultValue' => false,
                    'validation' => array(
                        'required' => true,
                    ) ,
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
                3 => array(
                    'name' => 'is_email_confirmed',
                    'label' => 'Email confirmation status?',
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
                    'name' => 'role_id',
                    'label' => 'Category',
                    'targetEntity' => 'roles',
                    'targetField' => 'name',
                    'map' => array(
                        0 => 'truncate',
                    ) ,
                    'type' => 'reference',
                    'remoteComplete' => true,
                ) ,
                1 => array(
                    'name' => 'username',
                    'label' => 'Username',
                    'type' => 'string',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                2 => array(
                    'name' => 'email',
                    'label' => 'Email',
                    'type' => 'string',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                3 => array(
                    'name' => 'password',
                    'label' => 'Password',
                    'type' => 'password',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                4 => array(
                    'name' => 'first_name',
                    'label' => 'First Name',
                    'type' => 'string',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                5 => array(
                    'name' => 'last_name',
                    'label' => 'Last Name',
                    'type' => 'string',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                6 => array(
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
                7 => array(
                    'name' => 'is_agree_terms_conditions',
                    'label' => 'Agree Terms Conditions?',
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
        'editionview' => array(
            'fields' => array(
                0 => array(
                    'name' => 'role_id',
                    'label' => 'Category',
                    'targetEntity' => 'roles',
                    'targetField' => 'name',
                    'map' => array(
                        0 => 'truncate',
                    ) ,
                    'type' => 'reference',
                    'remoteComplete' => true,
                ) ,
                1 => array(
                    'name' => 'first_name',
                    'label' => 'First Name',
                    'type' => 'string',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                2 => array(
                    'name' => 'last_name',
                    'label' => 'Last Name',
                    'type' => 'string',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                3 => array(
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
                4 => array(
                    'name' => 'is_email_confirmed',
                    'label' => 'Email confirmation status?',
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
                5 => array(
                    'name' => 'is_agree_terms_conditions',
                    'label' => 'Agree Terms Conditions?',
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
                    'label' => 'ID',
                    'isDetailLink' => true,
                ) ,
                1 => array(
                    'name' => 'role.name',
                    'label' => 'Category',
                ) ,
                2 => array(
                    'name' => 'username',
                    'label' => 'Username',
                ) ,
                3 => array(
                    'name' => 'email',
                    'label' => 'Email',
                ) ,
                4 => array(
                    'name' => 'about_me',
                    'label' => 'Bio',
                ) ,
                5 => array(
                    'name' => 'city.name',
                    'label' => 'City',
                ) ,
                6 => array(
                    'name' => 'state.name',
                    'label' => 'State',
                ) ,
                7 => array(
                    'name' => 'country.name',
                    'label' => 'Country',
                ) ,
                12 => array(
                    'name' => 'is_made_deposite',
                    'label' => 'Made Deposite?',
                    'type' => 'boolean'
                ) ,
                13 => array(
                    'name' => 'hourly_rate',
                    'label' => 'Hourly Rate',
                ) ,
                19 => array(
                    'name' => 'user_login_count',
                    'label' => 'Logins',
                ) ,
                20 => array(
                    'name' => 'created_at',
                    'label' => 'Created On',
                ) ,
                21 => array(
                    'name' => 'is_email_confirmed',
                    'label' => 'Email confirmation statusd?',
                    'type' => 'boolean',
                ) ,
                22 => array(
                    'name' => 'is_active',
                    'label' => 'Active?',
                    'type' => 'boolean',
                ) ,
                23 => array(
                    'name' => 'Educations',
                    'label' => 'Educations',
                    'targetEntity' => 'educations',
                    'targetReferenceField' => 'user_id',
                    'targetFields' => array(
                        0 => array(
                            'name' => 'id',
                            'label' => 'ID',
                            'isDetailLink' => true,
                        ) ,
                        1 => array(
                            'name' => 'country.name',
                            'label' => 'Country',
                        ) ,
                        2 => array(
                            'name' => 'title',
                            'label' => 'Title',
                        ) ,
                        3 => array(
                            'name' => 'from_year',
                            'label' => 'From',
                        ) ,
                        4 => array(
                            'name' => 'to_year',
                            'label' => 'To',
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
                24 => array(
                    'name' => 'Work Profile',
                    'label' => 'Work Profile',
                    'targetEntity' => 'work_profiles',
                    'targetReferenceField' => 'user_id',
                    'targetFields' => array(
                        0 => array(
                            'name' => 'id',
                            'label' => 'ID',
                            'isDetailLink' => true,
                        ) ,
                        1 => array(
                            'name' => 'title',
                            'label' => 'Title',
                        ) ,
                        2 => array(
                            'name' => 'description',
                            'label' => 'Description',
                        ) ,
                        3 => array(
                            'name' => 'from_month_year',
                            'label' => 'From',
                        ) ,
                        4 => array(
                            'name' => 'to_month_year',
                            'label' => 'To',
                        ) ,
                        5 => array(
                            'name' => 'currently_working',
                            'label' => 'Under Employment?',
                            'type' => 'boolean'
                        ) ,
                        6 => array(
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
                25 => array(
                    'name' => 'Certification',
                    'label' => 'Certification',
                    'targetEntity' => 'certifications',
                    'targetReferenceField' => 'user_id',
                    'targetFields' => array(
                        0 => array(
                            'name' => 'id',
                            'label' => 'ID',
                            'isDetailLink' => true,
                        ) ,
                        1 => array(
                            'name' => 'title',
                            'label' => 'Title',
                        ) ,
                        2 => array(
                            'name' => 'conferring_organization',
                            'label' => 'Organization',
                        ) ,
                        3 => array(
                            'name' => 'description',
                            'label' => 'Description',
                        ) ,
                        4 => array(
                            'name' => 'year',
                            'label' => 'Year',
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
                26 => array(
                    'name' => 'Publications',
                    'label' => 'Publications',
                    'targetEntity' => 'publications',
                    'targetReferenceField' => 'user_id',
                    'targetFields' => array(
                        0 => array(
                            'name' => 'id',
                            'label' => 'ID',
                            'isDetailLink' => true,
                        ) ,
                        1 => array(
                            'name' => 'title',
                            'label' => 'Title',
                        ) ,
                        2 => array(
                            'name' => 'publisher',
                            'label' => 'Publisher',
                        ) ,
                        3 => array(
                            'name' => 'description',
                            'label' => 'Description',
                        ) ,
                        4 => array(
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
            ) ,
        ) ,
    ) ,
    'settings' => array(
        'listview' => array(
            'fields' => array(
                0 => array(
                    'name' => 'id',
                    'label' => 'id',
                    'isDetailLink' => true,
                ) ,
                1 => array(
                    'name' => 'created',
                    'label' => 'Created',
                ) ,
                2 => array(
                    'name' => 'modified',
                    'label' => 'Modified',
                ) ,
            ) ,
        ) ,
        array(
            'title' => 'Settings',
            'perPage' => '10',
            'sortField' => '',
            'sortDir' => '',
            'infinitePagination' => false,
            'listActions' => array(
                0 => 'edit',
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
                    'name' => 'setting_category_id',
                    'label' => 'Setting Category',
                    'targetEntity' => 'setting_categories',
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
                0 => '',
            ) ,
        ) ,
        'editionview' => array(
            'fields' => array(
                0 => array(
                    'name' => 'label',
                    'label' => 'Name',
                    'editable' => false
                ) ,
                2 => array(
                    'name' => 'value',
                    'label' => 'Value',
                    'template' => '<input-type entry="entry" entity="entity"></input-type>',
                ) ,
                1 => array(
                    'name' => 'description',
                    'label' => 'Description',
                    'type' => 'wysiwyg',
                    'editable' => false
                ) ,
            ) ,
            'actions' => array ()
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
                    'name' => 'value',
                    'label' => 'Value',
                    'template' => '',
                ) ,
                2 => array(
                    'name' => 'description',
                    'label' => 'Description',
                    'validation' => array(
                        'required' => false,
                    ) ,
                ) ,
            ) ,
        ) ,
    ) ,
    'setting_categories' => array(
        'listview' => array(
            'fields' => array(
                0 => array(
                    'name' => 'name',
                    'label' => 'Name',
                ) ,
                1 => array(
                    'name' => 'description',
                    'label' => 'Description',
                    'map' => array(
                        0 => 'truncate',
                    ) ,
                ) ,
            ) ,
            'title' => 'Site Settings',
            'perPage' => '25',
            'sortField' => '',
            'sortDir' => 'ASC',
            'infinitePagination' => false,
            'listActions' => array(
                0 => '<ma-show-button entry="entry" entity="entity" size="sm" label="Config" ></ma-show-button>',
            ) ,
            'filters' => array(
            ) ,
            'permanentFilters' => '',
            'actions' => array(
                'setting_category_action_tpl' => '<ma-filter-button filters="filters()" enabled-filters="enabledFilters" enable-filter="enableFilter()"></ma-filter-button><ma-export-to-csv-button entry="entry" entity="entity" size="sm" datastore="::datastore"></ma-export-to-csv-button>',
                'settings_category_edit_template' => '<ma-list-button entry="entry" entity="entity" size="sm"></ma-list-button>',
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
                    'name' => 'description',
                    'label' => 'Description',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
            ) ,
        ) ,
        'showview' => array(
            'fields' => array(
                0 => array(
                    'name' => 'name',
                    'label' => 'Name',
                    'type' => 'string'
                ) ,
                1 => array(
                    'name' => 'description',
                    'label' => 'Description'
                ) ,
                2 => array(
                    'name' => 'setting_category_id',
                    'label' => 'Related Settings',
                    'targetEntity' => 'settings',
                    'targetReferenceField' => 'setting_category_id',
                    'targetFields' => array(
                        0 => array(
                            'name' => 'label',
                            'label' => 'Name',
                        ) ,
                        1 => array(
                            'name' => 'value',
                            'label' => 'Value',
                        ) ,
                    ) ,
                    'listActions' => array(
                        0 => 'edit',
                    ) ,
                    'map' => array(
                        0 => 'truncate',
                    ) ,
                    'type' => 'referenced_list',
                ) ,
                3 => array(
                    'name' => 'icon',
                    'label' => '',
                    'template' => '<add-sync entry="entry" entity="entity" size="sm" label="Synchronize" ></add-sync>'
                ) ,
                4 => array(
                    'name' => 'icon',
                    'label' => '',
                    'type' => 'template',
                    'template' => '<mooc-sync entry="entry" entity="entity" size="sm" label="Synchronize" ></mooc-sync>'
                ) ,
            ) ,
            'actions' => array ('list')
        ) ,
    ) ,
    'cities' => array(
        'listview' => array(
            'fields' => array(
                0 => array(
                    'name' => 'id',
                    'label' => 'ID',
                    'isDetailLink' => true,
                ) ,
                1 => array(
                    'name' => 'country_name',
                    'label' => 'Country',
                ) ,
                2 => array(
                    'name' => 'state_name',
                    'label' => 'State',
                ) ,
                3 => array(
                    'name' => 'name',
                    'label' => 'Name',
                ) ,
                4 => array(
                    'name' => 'city_code',
                    'label' => 'City Code',
                ) ,
                5 => array(
                    'name' => 'is_active',
                    'type' => 'boolean',
                    'label' => 'Active?',
                ) ,
                6 => array(
                    'name' => 'created_at',
                    'label' => 'Created',
                ) ,
            ) ,
            'title' => 'Cities',
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
                    'label' => 'Status',
                    'type' => 'choice',
                    'defaultValue' => false,
                    'validation' => array(
                        'required' => true,
                    ) ,
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
                    'name' => 'country_id',
                    'label' => 'Country',
                    'targetEntity' => 'countries',
                    'targetField' => 'name',
                    'map' => array(
                        0 => 'truncate',
                    ) ,
                    'type' => 'reference',
                    'remoteComplete' => true,
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                1 => array(
                    'name' => 'state_id',
                    'label' => 'State',
                    'targetEntity' => 'states',
                    'targetField' => 'name',
                    'map' => array(
                        0 => 'truncate',
                    ) ,
                    'type' => 'reference',
                    'remoteComplete' => true,
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                2 => array(
                    'name' => 'name',
                    'label' => 'Name',
                    'type' => 'string',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                3 => array(
                    'name' => 'city_code',
                    'label' => 'City Code',
                ) ,
                4 => array(
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
                    'label' => 'ID',
                    'isDetailLink' => true,
                ) ,
                1 => array(
                    'name' => 'country.name',
                    'label' => 'Country',
                ) ,
                2 => array(
                    'name' => 'state.name',
                    'label' => 'State',
                ) ,
                3 => array(
                    'name' => 'name',
                    'label' => 'Name',
                ) ,
                4 => array(
                    'name' => 'city_code',
                    'label' => 'City Code',
                ) ,
                5 => array(
                    'name' => 'is_active',
                    'type' => 'boolean',
                    'label' => 'Active?',
                ) ,
                6 => array(
                    'name' => 'created_at',
                    'label' => 'Created',
                ) ,
            ) ,
        ) ,
    ) ,
    'states' => array(
        'listview' => array(
            'fields' => array(
                0 => array(
                    'name' => 'id',
                    'label' => 'ID',
                    'isDetailLink' => true,
                ) ,
                1 => array(
                    'name' => 'created_at',
                    'label' => 'created',
                ) ,
                2 => array(
                    'name' => 'country_name',
                    'label' => 'Country',
                ) ,
                3 => array(
                    'name' => 'name',
                    'label' => 'Name',
                ) ,
                4 => array(
                    'name' => 'code',
                    'label' => 'Code',
                ) ,
                5 => array(
                    'name' => 'is_active',
                    'label' => 'Active?',
                    'type' => 'boolean',
                ) ,
            ) ,
            'title' => 'States',
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
                    'name' => 'country_id',
                    'label' => 'Country',
                    'targetEntity' => 'countries',
                    'targetField' => 'name',
                    'map' => array(
                        0 => 'truncate',
                    ) ,
                    'type' => 'reference',
                    'remoteComplete' => true,
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                1 => array(
                    'name' => 'name',
                    'label' => 'Name',
                    'type' => 'string',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                2 => array(
                    'name' => 'code',
                    'label' => 'Code',
                    'type' => 'string',
                    'validation' => array(
                        'required' => false,
                    ) ,
                ) ,
                3 => array(
                    'name' => 'is_active',
                    'label' => 'Active?',
                    'type' => 'choice',
                    'defaultValue' => true,
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
                    'name' => 'created_at',
                    'label' => 'created',
                ) ,
                1 => array(
                    'name' => 'country.name',
                    'label' => 'Country',
                ) ,
                2 => array(
                    'name' => 'name',
                    'label' => 'Name',
                ) ,
                3 => array(
                    'name' => 'code',
                    'label' => 'Code',
                ) ,
                4 => array(
                    'name' => 'is_active',
                    'type' => 'boolean',
                    'label' => 'Active?',
                ) ,
            ) ,
        ) ,
    ) ,
    'countries' => array(
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
                    'name' => 'fips_code',
                    'label' => 'Fips Code',
                ) ,
                3 => array(
                    'name' => 'iso_alpha2',
                    'label' => 'Iso2',
                ) ,
                4 => array(
                    'name' => 'iso_alpha3',
                    'label' => 'Iso3',
                ) ,
                5 => array(
                    'name' => 'iso_numeric',
                    'label' => 'Iso Numeric',
                ) ,
            ) ,
            'title' => 'Countries',
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
                    'name' => 'fips_code',
                    'label' => 'Fips Code',
                    'type' => 'string',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                1 => array(
                    'name' => 'name',
                    'label' => 'Name',
                    'type' => 'string',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                2 => array(
                    'name' => 'iso_alpha2',
                    'label' => 'Iso Alpha2',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                3 => array(
                    'name' => 'iso_alpha3',
                    'label' => 'Iso Alpha3',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                4 => array(
                    'name' => 'iso_numeric',
                    'label' => 'Iso Numeric',
                    'type' => 'number',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                5 => array(
                    'name' => 'capital',
                    'label' => 'Capital',
                    'type' => 'string',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                6 => array(
                    'name' => 'areainsqkm',
                    'label' => 'Areainsqkm',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                7 => array(
                    'name' => 'population',
                    'label' => 'Population',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                8 => array(
                    'name' => 'continent',
                    'label' => 'Continent',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                9 => array(
                    'name' => 'tld',
                    'label' => 'Tld',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                10 => array(
                    'name' => 'currency',
                    'label' => 'Currency',
                    'type' => 'string',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                11 => array(
                    'name' => 'currencyname',
                    'label' => 'Currencyname',
                    'type' => 'string',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                12 => array(
                    'name' => 'phone',
                    'label' => 'Phone',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                13 => array(
                    'name' => 'postalcodeformat',
                    'label' => 'Postalcodeformat',
                    'type' => 'string',
                    'validation' => array(
                        'required' => false,
                    ) ,
                ) ,
                14 => array(
                    'name' => 'postalcoderegex',
                    'label' => 'Postalcoderegex',
                    'type' => 'string',
                    'validation' => array(
                        'required' => false,
                    ) ,
                ) ,
                15 => array(
                    'name' => 'geonameid',
                    'label' => 'Geonameid',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                16 => array(
                    'name' => 'neighbours',
                    'label' => 'Neighbours',
                    'type' => 'string',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                17 => array(
                    'name' => 'equivalentfipscode',
                    'label' => 'Equivalentfipscode',
                    'validation' => array(
                        'required' => false,
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
                    'name' => 'iso_alpha2',
                    'label' => 'Iso Alpha2',
                ) ,
                2 => array(
                    'name' => 'iso_alpha3',
                    'label' => 'Iso Alpha3',
                ) ,
                3 => array(
                    'name' => 'iso_numeric',
                    'label' => 'Iso Numeric',
                ) ,
                4 => array(
                    'name' => 'fips_code',
                    'label' => 'Fips Code',
                ) ,
                5 => array(
                    'name' => 'name',
                    'label' => 'Name',
                ) ,
                6 => array(
                    'name' => 'capital',
                    'label' => 'Capital',
                ) ,
                7 => array(
                    'name' => 'areainsqkm',
                    'label' => 'Areainsqkm',
                ) ,
                8 => array(
                    'name' => 'population',
                    'label' => 'Population',
                ) ,
                9 => array(
                    'name' => 'continent',
                    'label' => 'Continent',
                ) ,
                10 => array(
                    'name' => 'tld',
                    'label' => 'Tld',
                ) ,
                11 => array(
                    'name' => 'currency',
                    'label' => 'Currency',
                ) ,
                12 => array(
                    'name' => 'currencyname',
                    'label' => 'Currencyname',
                ) ,
                13 => array(
                    'name' => 'phone',
                    'label' => 'Phone',
                ) ,
                14 => array(
                    'name' => 'postalcodeformat',
                    'label' => 'Postalcodeformat',
                ) ,
                15 => array(
                    'name' => 'postalcoderegex',
                    'label' => 'Postalcoderegex',
                ) ,
                16 => array(
                    'name' => 'geonameid',
                    'label' => 'Geonameid',
                ) ,
                17 => array(
                    'name' => 'neighbours',
                    'label' => 'Neighbours',
                ) ,
                18 => array(
                    'name' => 'equivalentfipscode',
                    'label' => 'Equivalentfipscode',
                ) ,
            ) ,
        ) ,
    ) ,
    'pages' => array(
        'listview' => array(
            'fields' => array(
                0 => array(
                    'name' => 'title',
                    'label' => 'Title',
                ) ,
                1 => array(
                    'name' => 'content',
                    'label' => 'Content',
                    'type' => 'wysiwyg',
                ) ,
                2 => array(
                    'name' => 'is_default',
                    'label' => 'Active?',
                    'type' => 'boolean',
                ) ,
                3 => array(
                    'name' => 'created_at',
                    'label' => 'Created',
                ) ,
            ) ,
            'title' => 'Pages',
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
                    'label' => ' Active?',
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
                    'name' => 'title',
                    'label' => 'Title',
                    'type' => 'string',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                1 => array(
                    'name' => 'content',
                    'label' => 'Content',
                    'type' => 'wysiwyg',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                2 => array(
                    'name' => 'meta_keywords',
                    'label' => 'Meta Keywords',
                    'type' => 'string',
                    'validation' => array(
                        'required' => false,
                    ) ,
                ) ,
                3 => array(
                    'name' => 'meta_description',
                    'label' => 'Meta Description',
                    'type' => 'wysiwyg',
                    'validation' => array(
                        'required' => false,
                    ) ,
                ) ,
                4 => array(
                    'name' => 'is_default',
                    'label' => 'Active?',
                    'type' => 'boolean',
                    'defaultValue' => true,
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
                    'name' => 'title',
                    'label' => 'Title',
                ) ,
                1 => array(
                    'name' => 'content',
                    'label' => 'Content',
                    'type' => 'wysiwyg',
                ) ,
                2 => array(
                    'name' => 'meta_keywords',
                    'label' => 'Meta Keywords',
                ) ,
                3 => array(
                    'name' => 'meta_description',
                    'label' => 'Meta Description',
                ) ,
                4 => array(
                    'name' => 'is_default',
                    'label' => 'Active?',
                    'type' => 'boolean',
                ) ,
                5 => array(
                    'name' => 'created_at',
                    'label' => 'Created',
                ) ,
            ) ,
        ) ,
    ) ,
    'languages' => array(
        'listview' => array(
            'fields' => array(
                0 => array(
                    'name' => 'created_at',
                    'label' => 'Created',
                ) ,
                1 => array(
                    'name' => 'name',
                    'label' => 'Name',
                ) ,
                2 => array(
                    'name' => 'iso2',
                    'label' => 'Iso2',
                ) ,
                3 => array(
                    'name' => 'iso3',
                    'label' => 'Iso3',
                ) ,
                4 => array(
                    'name' => 'is_active',
                    'label' => 'Active?',
                    'type' => 'boolean',
                ) ,
            ) ,
            'title' => 'Languages',
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
                    'label' => ' Active?',
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
                    'name' => 'iso2',
                    'label' => 'Iso2',
                    'type' => 'text',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                2 => array(
                    'name' => 'iso3',
                    'label' => 'Iso3',
                    'type' => 'text',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                3 => array(
                    'name' => 'is_active',
                    'label' => 'Active?',
                    'type' => 'choice',
                    'defaultValue' => true,
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
                    'name' => 'iso2',
                    'label' => 'Iso2',
                    'type' => 'text',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                2 => array(
                    'name' => 'iso3',
                    'label' => 'Iso3',
                    'type' => 'text',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                3 => array(
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
            ) ,
        ) ,
    ) ,
    'email_templates' => array(
        'listview' => array(
            'fields' => array(
                0 => array(
                    'name' => 'display_name',
                    'label' => 'Name',
                ) ,
                1 => array(
                    'name' => 'from',
                    'label' => 'Sender Name',
                ) ,
                2 => array(
                    'name' => 'subject',
                    'label' => 'Subject',
                ) ,
                3 => array(
                    'name' => 'html_email_content',
                    'label' => ' Content',
                    'type' => 'wysiwyg',
                ) ,
            ) ,
            'title' => 'Email Templates',
            'perPage' => '10',
            'sortField' => '',
            'sortDir' => '',
            'infinitePagination' => false,
            'listActions' => array(
                0 => 'edit',
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
                0 => 'filter',
            ) ,
        ) ,
        'creationview' => array(
            'fields' => array(
                0 => array(
                    'name' => 'from',
                    'label' => 'From',
                    'type' => 'string',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                1 => array(
                    'name' => 'reply_to',
                    'label' => 'Reply To',
                    'type' => 'string',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                2 => array(
                    'name' => 'name',
                    'label' => 'Name',
                    'type' => 'string',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                3 => array(
                    'name' => 'description',
                    'label' => 'Description',
                    'type' => 'wysiwyg',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                4 => array(
                    'name' => 'subject',
                    'label' => 'Subject',
                    'type' => 'string',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                5 => array(
                    'name' => 'text_email_content',
                    'label' => 'Text Email Content',
                    'type' => 'wysiwyg',
                    'validation' => array(
                        'required' => false,
                    ) ,
                ) ,
                6 => array(
                    'name' => 'html_email_content',
                    'label' => 'Html Email Content',
                    'type' => 'wysiwyg',
                    'validation' => array(
                        'required' => false,
                    ) ,
                ) ,
                7 => array(
                    'name' => 'notification_content',
                    'label' => 'Notification Content',
                    'type' => 'wysiwyg',
                    'validation' => array(
                        'required' => false,
                    ) ,
                ) ,
                8 => array(
                    'name' => 'email_variables',
                    'label' => 'Email Variables',
                    'type' => 'string',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                9 => array(
                    'name' => 'is_html',
                    'label' => 'Htmls?',
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
                10 => array(
                    'name' => 'is_notify',
                    'label' => 'Notifies?',
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
                    'name' => 'display_name',
                    'label' => 'Display Name',
                    'type' => 'string',
                    'validation' => array(
                        'required' => false,
                    ) ,
                ) ,
            ) ,
        ) ,
        'editionview' => array(
            'fields' => array(
                0 => array(
                    'name' => 'display_name',
                    'label' => 'Display Name',
                    'editable' => false,
                    'validation' => array(
                        'required' => false,
                    ) ,
                ) ,
                1 => array(
                    'name' => 'from',
                    'label' => 'Sender Name',
                    'type' => 'string',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                2 => array(
                    'name' => 'subject',
                    'label' => 'Subject',
                    'type' => 'string',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                3 => array(
                    'name' => 'html_email_content',
                    'label' => ' Content',
                    'type' => 'wysiwyg',
                    'validation' => array(
                        'required' => false,
                    ) ,
                ) ,
                4 => array(
                    'name' => 'text_email_content',
                    'label' => 'Text Email Content',
                    'type' => 'template',
                    'template' => '<div class="input-group"><textarea ng-model="value" name="text_email_content" class="form-control" id="text_email_content"></textarea></div>',                        
                    'validation' => array(
                        'required' => false,
                    ) ,
                ) ,
                5 => array(
                    'name' => 'is_html',
                    'label' => 'Send HMTL content?',
                    'type' => 'choice',                   
                    'validation' => array(
                        'required' => false,
                    ),
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
                6 => array(
                    'name' => 'email_variables',
                    'label' => 'Constant for Subject and Content',
                    'type' => 'string',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
            ) ,
            'actions' => array ('list')
        ) ,
    ) ,
    'contacts' => array(
        'listview' => array(
            'fields' => array(
                0 => array(
                    'name' => 'ip',
                    'label' => 'IP',
                ) ,
                1 => array(
                    'name' => 'first_name',
                    'label' => 'First Name',
                ) ,
                2 => array(
                    'name' => 'last_name',
                    'label' => 'Last Name',
                ) ,
                3 => array(
                    'name' => 'email',
                    'label' => 'Email',
                ) ,
                4 => array(
                    'name' => 'subject',
                    'label' => 'Subject',
                ) ,
                5 => array(
                    'name' => 'message',
                    'label' => 'Message',
                    'type' => 'wysiwyg',
                ) ,
                6 => array(
                    'name' => 'phone',
                    'label' => 'Mobile',
                ),
                7 => array(
                    'name' => 'created_at',
                    'label' => 'Created',
                ) ,
            
            ) ,
            'title' => 'Contacts',
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
                    'template' => '<div class="input-group"><input type="text" ng-model="value" placeholder="Search" class="form-control"></input><span class="input-group-addon"><i class="fa fa-search text-primary"></i></span></div>',
                ) ,
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
                    'name' => 'ip',
                    'label' => 'IP',
                ) ,
                1 => array(
                    'name' => 'first_name',
                    'label' => 'First Name',
                ) ,
                2 => array(
                    'name' => 'last_name',
                    'label' => 'Last Name',
                ) ,
                3 => array(
                    'name' => 'email',
                    'label' => 'Email',
                ) ,
                4 => array(
                    'name' => 'subject',
                    'label' => 'Subject',
                ) ,
                5 => array(
                    'name' => 'message',
                    'label' => 'Message',
                    'type' => 'wysiwyg',
                ) ,
                6 => array(
                    'name' => 'phone',
                    'label' => 'Mobile',
                ) ,
                7 => array(
                    'name' => 'created_at',
                    'label' => 'Created',
                ) ,
                 
            ) ,
        ) ,
    ) ,
    'publications' => array(
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
                    'name' => 'title',
                    'label' => 'Title',
                    'type' => 'wysiwyg',
                ) ,
                3 => array(
                    'name' => 'publisher',
                    'label' => 'Publisher',
                    'type' => 'wysiwyg',
                ) ,
                4 => array(
                    'name' => 'description',
                    'label' => 'Description',
                    'type' => 'wysiwyg',
                ) ,
                5 => array(
                    'name' => 'created_at',
                    'label' => 'Created On',
                ) ,
            ) ,
            'title' => 'Publications',
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
                    'targetEntity' => 'users',
                    'targetField' => 'username',
                    'type' => 'reference',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                1 => array(
                    'name' => 'title',
                    'label' => 'Title',
                    'type' => 'string',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                2 => array(
                    'name' => 'publisher',
                    'label' => 'Publisher',
                    'type' => 'string',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                3 => array(
                    'name' => 'description',
                    'label' => 'Description',
                    'type' => 'text',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
            ) ,
        ) ,
        'editionview' => array(
            'fields' => array(
                0 => array(
                    'name' => 'user_id',
                    'label' => 'User',
                    'targetEntity' => 'users',
                    'targetField' => 'username',
                    'type' => 'reference',
                    'editable' => false,
                ) ,
                1 => array(
                    'name' => 'title',
                    'label' => 'Title',
                    'type' => 'string',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                2 => array(
                    'name' => 'publisher',
                    'label' => 'Publisher',
                    'type' => 'string',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                3 => array(
                    'name' => 'description',
                    'label' => 'Description',
                    'type' => 'text',
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
                    'name' => 'user.username',
                    'label' => 'User',
                ) ,
                2 => array(
                    'name' => 'title',
                    'label' => 'Title',
                ) ,
                3 => array(
                    'name' => 'publisher',
                    'label' => 'Publisher',
                ) ,
                4 => array(
                    'name' => 'description',
                    'label' => 'Description',
                ) ,
                5 => array(
                    'name' => 'created_at',
                    'label' => 'Created On',
                ) ,
            ) ,
        ) ,
    ) ,
    'work_profiles' => array(
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
                    'name' => 'title',
                    'label' => 'Title',
                ) ,
                3 => array(
                    'name' => 'description',
                    'label' => 'Description',
                    'map' => array(
                        0 => 'truncate',
                    )
                ) ,
                4 => array(
                    'name' => 'from_month_year',
                    'label' => 'From',
                ) ,
                5 => array(
                    'name' => 'to_month_year',
                    'label' => 'To',
                ) ,
                6 => array(
                    'name' => 'currently_working',
                    'label' => 'Under Employment?',
                    'type' => 'boolean'
                ) ,
                7 => array(
                    'name' => 'created_at',
                    'label' => 'Created On',
                ) ,
            ) ,
            'title' => 'Work Profiles',
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
                    'targetEntity' => 'users',
                    'targetField' => 'username',
                    'type' => 'reference',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                1 => array(
                    'name' => 'title',
                    'label' => 'Title',
                    'type' => 'string',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                2 => array(
                    'name' => 'description',
                    'label' => 'Description',
                    'type' => 'text',
                    'validation' => array(
                        'required' => false,
                    ) ,
                ) ,
                3 => array(
                    'name' => 'from_month_year',
                    'label' => 'From Month Year',
                    'type' => 'string',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                4 => array(
                    'name' => 'to_month_year',
                    'label' => 'To Month Year',
                    'type' => 'string',
                    'validation' => array(
                        'required' => false,
                    ) ,
                ) ,
            ) ,
        ) ,
        'editionview' => array(
            'fields' => array(
                0 => array(
                    'name' => 'user_id',
                    'label' => 'User',
                    'targetEntity' => 'users',
                    'targetField' => 'username',
                    'type' => 'reference',
                    'editable' => false
                ) ,
                1 => array(
                    'name' => 'title',
                    'label' => 'Title',
                    'type' => 'string',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                2 => array(
                    'name' => 'description',
                    'label' => 'Description',
                    'type' => 'text',
                    'validation' => array(
                        'required' => false,
                    ) ,
                ) ,
                3 => array(
                    'name' => 'from_month_year',
                    'label' => 'From Month Year',
                    'type' => 'string',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                4 => array(
                    'name' => 'to_month_year',
                    'label' => 'To Month Year',
                    'type' => 'string',
                    'validation' => array(
                        'required' => false,
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
                    'name' => 'user.username',
                    'label' => 'User',
                ) ,
                2 => array(
                    'name' => 'title',
                    'label' => 'Title',
                ) ,
                3 => array(
                    'name' => 'description',
                    'label' => 'Description',
                ) ,
                4 => array(
                    'name' => 'from_month_year',
                    'label' => 'From',
                ) ,
                5 => array(
                    'name' => 'to_month_year',
                    'label' => 'To',
                ) ,
                6 => array(
                    'name' => 'currently_working',
                    'label' => 'Under Employment?',
                    'type' => 'boolean'
                ) ,
                7 => array(
                    'name' => 'created_at',
                    'label' => 'Created On',
                ) ,
            ) ,
        ) ,
    ) ,
    'payment_gateways' => array(
        'listview' => array(
            'fields' => array(
                0 => array(
                    'name' => 'id',
                    'label' => 'id',
                ) ,
                1 => array(
                    'name' => 'name',
                    'label' => 'Name',
                ) ,
                2 => array(
                    'name' => 'is_test_mode',
                    'label' => 'Is Test Mode',
                    'type' => 'boolean',
                ) ,
            ) ,
            'title' => 'Payment Gateways',
            'perPage' => '10',
            'sortField' => '',
            'sortDir' => '',
            'infinitePagination' => false,
            'listActions' => array(
                0 => 'edit',
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
                    'name' => 'name',
                    'label' => 'Name',
                    'type' => 'string',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                1 => array(
                    'name' => 'display_name',
                    'label' => 'Display Name',
                    'type' => 'string',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                2 => array(
                    'name' => 'slug',
                    'label' => 'Slug',
                    'type' => 'string',
                    'validation' => array(
                        'required' => false,
                    ) ,
                ) ,
                3 => array(
                    'name' => 'description',
                    'label' => 'Description',
                    'type' => 'text',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                4 => array(
                    'name' => 'gateway_fees',
                    'label' => 'Gateway Fees',
                    'type' => 'number',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                5 => array(
                    'name' => 'is_test_mode',
                    'label' => ' Test Mode?',
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
                6 => array(
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
                7 => array(
                    'name' => 'is_enable_for_wallet',
                    'label' => 'Is Enable For Wallet',
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
        'editionview' => array(
            'fields' => array(
                0 => array(
                    'name' => 'name',
                    'label' => 'Name',
                    'editable' => false,
                ) ,
                1 => array(
                    'name' => 'description',
                    'label' => 'description',
                    'editable' => false,
                ) ,
                2 => array(
                    'name' => 'is_test_mode',
                    'label' => '',
                    'template' => '<payment-gateways entry="entry" entity="entity" label="Edit"></payment-gateways>',
                ) ,
            ) ,
            'actions' => array()
        ) ,
    ) ,
    'transactions' => array(
        'listview' => array(
            'fields' => array(
                0 => array(
                    'name' => 'id',
                    'label' => 'ID',
                    'isDetailLink' => true,
                ) ,
                1 => array(
                    'name' => 'user_id',
                    'label' => 'User',
                    'targetEntity' => 'users',
                    'targetField' => 'username',
                ) ,
                2 => array(
                    'name' => 'to_user_id',
                    'label' => 'To User',
                    'targetEntity' => 'to_users',
                    'targetField' => 'name',
                ) ,
                3 => array(
                    'name' => 'foreign_id',
                    'label' => 'Foreign',
                    'targetEntity' => 'foreigns',
                    'targetField' => 'name',
                ) ,
                4 => array(
                    'name' => 'class',
                    'label' => 'Class',
                ) ,
                5 => array(
                    'name' => 'transaction_type',
                    'label' => 'Transaction Type',
                ) ,
                6 => array(
                    'name' => 'payment_gateway_id',
                    'label' => 'Payment Gateway',
                    'targetEntity' => 'payment_gateways',
                    'targetField' => 'name',
                ) ,
                7 => array(
                    'name' => 'amount',
                    'label' => 'Amount',
                ) ,
                8 => array(
                    'name' => 'site_revenue',
                    'label' => 'Site Revenue',
                ) ,
                9 => array(
                    'name' => 'gateway_fees',
                    'label' => 'Gateway Fees',
                ) ,
                10 => array(
                    'name' => 'coupon_id',
                    'label' => 'Coupon',
                    'targetEntity' => 'coupons',
                    'targetField' => 'coupon_code',
                ) ,
            ) ,
            'title' => 'Transactions',
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
            ) ,
            'permanentFilters' => '',
            'actions' => array(
                0 => 'batch',
                1 => 'filter',
                2 => 'create',
            ) ,
        ) ,
    ) ,
    'user_logins' => array(
        'listview' => array(
            'fields' => array(
                0 => array(
                    'name' => 'id',
                    'label' => 'id',
                    'isDetailLink' => true,
                ) ,
                1 => array(
                    'name' => 'user.username',
                    'label' => 'User',
                ) ,
                2 => array(
                    'name' => 'ip.ip',
                    'label' => 'Ip',
                    'targetEntity' => 'ips',
                    'targetField' => 'ip',
                ) ,
                3 => array(
                    'name' => 'user_agent',
                    'label' => 'User Agent',
                ) ,
                4 => array(
                    'name' => 'created_at',
                    'label' => 'Created On',
                ) ,
            ) ,
            'title' => 'User Logins',
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
            ) ,
            'permanentFilters' => '',
            'actions' => array(
                0 => 'batch',
                1 => 'filter',
            ) ,
        ) ,
    ) ,
    'ips' => array(
        'listview' => array(
            'fields' => array(
                0 => array(
                    'name' => 'id',
                    'label' => 'id',
                    'isDetailLink' => true,
                ) ,
                1 => array(
                    'name' => 'ip',
                    'label' => 'Ip',
                ) ,
                2 => array(
                    'name' => 'host',
                    'label' => 'Host',
                ) ,
                3 => array(
                    'name' => 'city.name',
                    'label' => 'City',
                ) ,
                4 => array(
                    'name' => 'state.name',
                    'label' => 'State',
                ) ,
                5 => array(
                    'name' => 'country.name',
                    'label' => 'Country',
                ) ,
                6 => array(
                    'name' => 'created_at',
                    'label' => 'Created On',
                ) ,
            ) ,
            'title' => 'IPs',
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
                    'name' => 'city_id',
                    'label' => 'City',
                    'targetEntity' => 'cities',
                    'targetField' => 'name',
                    'map' => array(
                        0 => 'truncate',
                    ) ,
                    'type' => 'reference',
                    'remoteComplete' => true,
                ) ,
                2 => array(
                    'name' => 'state_id',
                    'label' => 'State',
                    'targetEntity' => 'states',
                    'targetField' => 'name',
                    'map' => array(
                        0 => 'truncate',
                    ) ,
                    'type' => 'reference',
                    'remoteComplete' => true,
                ) ,
                3 => array(
                    'name' => 'country_id',
                    'label' => 'Country',
                    'targetEntity' => 'countries',
                    'targetField' => 'name',
                    'map' => array(
                        0 => 'truncate',
                    ) ,
                    'type' => 'reference',
                    'remoteComplete' => true,
                ) ,
                4 => array(
                    'name' => 'timezone_id',
                    'label' => 'Timezone',
                    'targetEntity' => 'timezones',
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
                1 => 'filter'
            ) ,
        ) ,
    ) ,
    'skills' => array(
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
                    'label' => 'Projects',
                ) ,
                3 => array(
                    'name' => 'job_count',
                    'label' => 'Jobs',
                ) ,
                4 => array(
                    'name' => 'user_count',
                    'label' => 'Users',
                ) ,
                5 => array(
                    'name' => 'is_active',
                    'label' => 'Active?',
                    'type' => 'boolean'
                ) ,
            ) ,
            'title' => 'Skills',
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
                0 => '<batch-active type="active" action="skills" selection="selection"></batch-active>',
                1 => '<batch-in-active type="inactive" action="skills" selection="selection"></batch-in-active>',
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
    ) ,
    'certifications' => array(
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
                    'name' => 'title',
                    'label' => 'Title',
                ) ,
                3 => array(
                    'name' => 'conferring_organization',
                    'label' => 'Organization',
                ) ,
                4 => array(
                    'name' => 'description',
                    'label' => 'Description',
                ) ,
                5 => array(
                    'name' => 'year',
                    'label' => 'Year',
                ) ,
                6 => array(
                    'name' => 'created_at',
                    'label' => 'Created On',
                ) ,
            ) ,
            'title' => 'Certifications',
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
                    'remoteComplete' => true,
                    'targetEntity' => 'users',
                    'targetField' => 'username',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                1 => array(
                    'name' => 'title',
                    'label' => 'Title',
                    'type' => 'string',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                2 => array(
                    'name' => 'conferring_organization',
                    'label' => 'Organization',
                    'type' => 'string',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                3 => array(
                    'name' => 'description',
                    'label' => 'Description',
                    'type' => 'text',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                4 => array(
                    'name' => 'year',
                    'label' => 'Year',
                    'type' => 'date',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
            ) ,
        ) ,
        'editionview' => array(
            'fields' => array(
                0 => array(
                    'name' => 'user_id',
                    'label' => 'User',
                    'type' => 'reference',
                    'remoteComplete' => true,
                    'targetEntity' => 'users',
                    'targetField' => 'username',
                    'editable' => false,
                ) ,
                1 => array(
                    'name' => 'title',
                    'label' => 'Title',
                    'type' => 'string',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                2 => array(
                    'name' => 'conferring_organization',
                    'label' => 'Organization',
                    'type' => 'string',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                3 => array(
                    'name' => 'description',
                    'label' => 'Description',
                    'type' => 'text',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                4 => array(
                    'name' => 'year',
                    'label' => 'Year',
                    'type' => 'date',
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
                    'name' => 'user.username',
                    'label' => 'User',
                ) ,
                2 => array(
                    'name' => 'title',
                    'label' => 'Title',
                ) ,
                3 => array(
                    'name' => 'conferring_organization',
                    'label' => 'Organization',
                ) ,
                4 => array(
                    'name' => 'description',
                    'label' => 'Description',
                ) ,
                5 => array(
                    'name' => 'year',
                    'label' => 'Year',
                ) ,
                6 => array(
                    'name' => 'created_at',
                    'label' => 'Created On',
                ) ,
            ) ,
        ) ,
    ) ,
    'educations' => array(
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
                    'name' => 'country.name',
                    'label' => 'Country',
                ) ,
                3 => array(
                    'name' => 'title',
                    'label' => 'Title',
                ) ,
                4 => array(
                    'name' => 'from_year',
                    'label' => 'From',
                ) ,
                5 => array(
                    'name' => 'to_year',
                    'label' => 'To',
                ) ,
                6 => array(
                    'name' => 'created_at',
                    'label' => 'Created On',
                ) ,
            ) ,
            'title' => 'Education',
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
                    'targetEntity' => 'users',
                    'targetField' => 'username',
                    'type' => 'reference',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                1 => array(
                    'name' => 'country_id',
                    'label' => 'Country',
                    'targetEntity' => 'countries',
                    'targetField' => 'name',
                    'type' => 'reference',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                2 => array(
                    'name' => 'title',
                    'label' => 'Title',
                    'type' => 'string',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                3 => array(
                    'name' => 'from_year',
                    'label' => 'From Year',
                    'type' => 'date',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                4 => array(
                    'name' => 'to_year',
                    'label' => 'To Year',
                    'type' => 'date',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
            ) ,
        ) ,
        'editionview' => array(
            'fields' => array(
                0 => array(
                    'name' => 'user_id',
                    'label' => 'User',
                    'targetEntity' => 'users',
                    'targetField' => 'username',
                    'type' => 'reference',
                    'editable' => false,
                ) ,
                1 => array(
                    'name' => 'country_id',
                    'label' => 'Country',
                    'targetEntity' => 'countries',
                    'targetField' => 'name',
                    'type' => 'reference',
                    'remoteComplete' => true,
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                2 => array(
                    'name' => 'title',
                    'label' => 'Title',
                    'type' => 'string',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                3 => array(
                    'name' => 'from_year',
                    'label' => 'From Year',
                    'type' => 'date',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                4 => array(
                    'name' => 'to_year',
                    'label' => 'To Year',
                    'type' => 'date',
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
                    'name' => 'user.username',
                    'label' => 'User',
                ) ,
                2 => array(
                    'name' => 'country.name',
                    'label' => 'Country',
                ) ,
                3 => array(
                    'name' => 'title',
                    'label' => 'Title',
                ) ,
                4 => array(
                    'name' => 'from_year',
                    'label' => 'From',
                ) ,
                5 => array(
                    'name' => 'to_year',
                    'label' => 'To',
                ) ,
                6 => array(
                    'name' => 'created_at',
                    'label' => 'Created On',
                ) ,
            ) ,
        ) ,
    ) ,
    'user_views' => array(
        'listview' => array(
            'fields' => array(
                0 => array(
                    'name' => 'id',
                    'label' => 'ID',
                ) ,
                1 => array(
                    'name' => 'foreign_view.username',
                    'label' => 'Viewed',
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
            'title' => 'User Views',
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
            ) ,
            'permanentFilters' => '',
            'actions' => array(
                0 => 'batch',
                1 => 'filter',
            ) ,
        ) ,
    ) ,
    'providers' => array(
        'listview' => array(
            'fields' => array(
                0 => array(
                    'name' => 'name',
                    'label' => 'Name',
                ) ,
                1 => array(
                    'name' => 'secret_key',
                    'label' => 'Secret Key',
                ) ,
                2 => array(
                    'name' => 'api_key',
                    'label' => 'Client ID',
                ) ,
                3 => array(
                    'name' => 'is_active',
                    'label' => 'Active?',
                    'type' => 'boolean',
                ) ,
            ) ,
            'title' => 'Providers',
            'perPage' => '10',
            'sortField' => '',
            'sortDir' => '',
            'infinitePagination' => false,
            'listActions' => array(
                0 => 'edit',
            ) ,
            'filters' => array(
                0 => array(
                    'name' => 'q',
                    'pinned' => true,
                    'label' => 'Search',
                    'type' => 'template',
                    'template' => '<div class="input-group"><input type="text" ng-model="value" placeholder="Search" class="form-control"></input><span class="input-group-addon"><i class="fa fa-search text-primary"></i></span></div>',
                ) ,
                1 => array(
                    'name' => 'filter',
                    'label' => ' Active?',
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
                    ) ,
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
                        'required' => false,
                    ) ,
                ) ,
                1 => array(
                    'name' => 'slug',
                    'label' => 'Slug',
                    'type' => 'string',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                2 => array(
                    'name' => 'secret_key',
                    'label' => 'Secret Key',
                    'type' => 'string',
                    'validation' => array(
                        'required' => false,
                    ) ,
                ) ,
                3 => array(
                    'name' => 'api_key',
                    'label' => 'Api Key',
                    'type' => 'string',
                    'validation' => array(
                        'required' => false,
                    ) ,
                ) ,
                4 => array(
                    'name' => 'icon_class',
                    'label' => 'Icon Class',
                    'type' => 'string',
                    'validation' => array(
                        'required' => false,
                    ) ,
                ) ,
                5 => array(
                    'name' => 'button_class',
                    'label' => 'Button Class',
                    'type' => 'string',
                    'validation' => array(
                        'required' => false,
                    ) ,
                ) ,
                6 => array(
                    'name' => 'is_active',
                    'label' => 'Active?',
                    'type' => 'choice',
                    'defaultValue' => true,
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
                7 => array(
                    'name' => 'position',
                    'label' => 'Position',
                    'type' => 'number',
                    'validation' => array(
                        'required' => false,
                    ) ,
                ) ,
            ) ,
            'title' => 'Providers',
        ) ,
        'editionview' => array(
            'fields' => array(
                0 => array(
                    'name' => 'name',
                    'label' => 'Name',
                    'type' => 'string',
                    'validation' => array(
                        'required' => false,
                    ) ,
                ) ,
                1 => array(
                    'name' => 'secret_key',
                    'label' => 'Secret Key',
                    'type' => 'string',
                    'validation' => array(
                        'required' => false,
                    ) ,
                ) ,
                2 => array(
                    'name' => 'api_key',
                    'label' => 'Client ID',
                    'type' => 'string',
                    'validation' => array(
                        'required' => false,
                    ) ,
                ) ,
                3 => array(
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
            ) ,
            'title' => 'Providers',
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
                    'name' => 'slug',
                    'label' => 'Slug',
                ) ,
                3 => array(
                    'name' => 'secret_key',
                    'label' => 'Secret Key',
                ) ,
                4 => array(
                    'name' => 'api_key',
                    'label' => 'Api Key',
                ) ,
                5 => array(
                    'name' => 'icon_class',
                    'label' => 'Icon Class',
                ) ,
                6 => array(
                    'name' => 'button_class',
                    'label' => 'Button Class',
                ) ,
                7 => array(
                    'name' => 'is_active',
                    'label' => 'Active?',
                ) ,
                8 => array(
                    'name' => 'position',
                    'label' => 'Position',
                ) ,
            ) ,
            'title' => 'Providers',
        ) ,
    ) ,
);
$dashboard = array(
    'users' => array(
        'addCollection' => array(
            'fields' => array(
                0 => array(
                    'name' => 'role.name',
                    'label' => 'Category'
                ) ,
                1 => array(
                    'name' => 'username',
                    'label' => 'Username'
                ) ,
                2 => array(
                    'name' => 'email',
                    'label' => 'Email'
                ) ,
                3 => array(
                    'name' => 'is_email_confirmed',
                    'label' => 'Email confirmation status?',
                    'type' => 'boolean'
                )
            ) ,
            'title' => 'Recent Users',
            'name' => 'recent_users',
            'perPage' => 5,
            'order' => 1,
            'template' => '<div class="col-lg-6"><div class="panel"><ma-dashboard-panel collection="dashboardController.collections.recent_users" entries="dashboardController.entries.recent_users" datastore="dashboardController.datastore"> </ma-dashboard-panel></div></div>'
        )
    )
);
if (isPluginEnabled('Quote/Quote')) {
    $invoice_table = array(
        'users' => array(
            'listview' => array(
                'fields' => array(
                    0 => array(
                        'name' => 'quote_service_count',
                        'template' => '<a href="#/quote_services/list?search=%7B%22user_id%22:{{entry.values.id}}%7D">{{entry.values.quote_service_count}}</a>',
                        'label' => 'Services'
                    ) ,
                    1 => array(
                        'name' => 'quote_request_count',
                        'template' => '<a href="#/quote_requests/list?search=%7B%22user_id%22:{{entry.values.id}}%7D">{{entry.values.quote_request_count}}</a>',
                        'label' => 'Requests'
                    )
                )
            ) ,
            'showview' => array(
                'fields' => array(
                    0 => array(
                        'name' => 'quote_service_count',
                        'label' => 'Services'
                    ) ,
                    1 => array(
                        'name' => 'quote_request_count',
                        'label' => 'Requests'
                    )
                )
            )
        )
    );
    $tables = merge_details($tables, $invoice_table);
}
if (isPluginEnabled('Bidding/Bidding')) {
    $milestone_table = array(
        'users' => array(
            'listview' => array(
                'fields' => array(
                    0 => array(
                        'name' => 'project_count',
                        'template' => '<a href="#/projects/list?search=%7B%22user_id%22:{{entry.values.id}}%7D">{{entry.values.project_count}}</a>',
                        'label' => 'Projects'
                    ) ,
                    1 => array(
                        'name' => 'bid_count',
                        'template' => '<a href="#/bids/list?search=%7B%22user_id%22:{{entry.values.id}}%7D">{{entry.values.bid_count}}</a>',
                        'label' => 'Bids Made',
                    )
                )
            ) ,
            'showview' => array(
                'fields' => array(
                    0 => array(
                        'name' => 'project_count',
                        'label' => 'Projects'
                    ) ,
                    1 => array(
                        'name' => 'bid_count',
                        'label' => 'Bids Made'
                    ) ,
                    2 => array(
                        'name' => 'project_completed_count',
                        'label' => 'Project Completed count as Freelancer'
                    ) ,
                    3 => array(
                        'name' => 'project_failed_count',
                        'label' => 'Failure Project count as Freelancer'
                    ) ,
                )
            )
        )
    );
    $tables = merge_details($tables, $milestone_table);
}
if (isPluginEnabled('Contest/Contest')) {
    $milestone_table = array(
        'users' => array(
            'listview' => array(
                'fields' => array(
                    8 => array(
                        'name' => 'contest_count',
                        'template' => '<a href="#/contests/list?search=%7B%22user_id%22:{{entry.values.id}}%7D">{{entry.values.contest_count}}</a>',
                        'label' => 'Contests',
                    ) ,
                    9 => array(
                        'name' => 'contest_user_count',
                        'template' => '<a href="#/contest_users/list?search=%7B%22user_id%22:{{entry.values.id}}%7D">{{entry.values.contest_user_count}}</a>',
                        'label' => 'Contest Participates',
                    ) ,
                )
            ) ,
            'showview' => array(
                'fields' => array(
                    8 => array(
                        'name' => 'contest_count',
                        'template' => '<a href="#/contests/list?search=%7B%22user_id%22:{{entry.values.id}}%7D">{{entry.values.contest_count}}</a>',
                        'label' => 'Contests',
                    ) ,
                    9 => array(
                        'name' => 'contest_user_count',
                        'template' => '<a href="#/contest_users/list?search=%7B%22user_id%22:{{entry.values.id}}%7D">{{entry.values.contest_user_count}}</a>',
                        'label' => 'Contest Participates',
                    ) ,
                )
            )
        )
    );
    $tables = merge_details($tables, $milestone_table);
}
if (isPluginEnabled('Job/Job')) {
    $milestone_table = array(
        'users' => array(
            'listview' => array(
                'fields' => array(
                    0 => array(
                        'name' => 'job_count',
                        'template' => '<a href="#/jobs/list?search=%7B%22user_id%22:{{entry.values.id}}%7D">{{entry.values.job_count}}</a>',
                        'label' => 'Jobs'
                    ) ,
                    1 => array(
                        'name' => 'job_apply_count',
                        'template' => '<a href="#/job_applies/list?search=%7B%22user_id%22:{{entry.values.id}}%7D">{{entry.values.job_apply_count}}</a>',
                        'label' => 'Job Applies'
                    )
                )
            ) ,
            'showview' => array(
                'fields' => array(
                    0 => array(
                        'name' => 'job_count',
                        'label' => 'Jobs'
                    ) ,
                    1 => array(
                        'name' => 'job_apply_count',
                        'label' => 'Job Applies'
                    )
                )
            )
        )
    );
    $tables = merge_details($tables, $milestone_table);
}
if (isPluginEnabled('Portfolio/Portfolio')) {
    $milestone_table = array(
        'users' => array(
            'listview' => array(
                'fields' => array(
                    0 => array(
                        'name' => 'portfolio_count',
                        'template' => '<a href="#/portfolios/list?search=%7B%22user_id%22:{{entry.values.id}}%7D">{{entry.values.portfolio_count}}</a>',
                        'label' => 'Portfolios'
                    )
                )
            ) ,
            'showview' => array(
                'fields' => array(
                    0 => array(
                        'name' => 'portfolio_count',
                        'label' => 'Portfolios'
                    )
                )
            )
        )
    );
    $tables = merge_details($tables, $milestone_table);
}
if (isPluginEnabled('Common/UserFollow')) {
    $milestone_table = array(
        'users' => array(
            'showview' => array(
                'fields' => array(
                    0 => array(
                        'name' => 'follower_count',
                        'label' => 'Followers',
                    )
                )
            )
        )
    );
    $tables = merge_details($tables, $milestone_table);
}
if (isPluginEnabled('Bidding/Bidding') || isPluginEnabled('Job/Job') || isPluginEnabled('Contest/Contest')) {
    $milestone_table = array(
        'users' => array(
            'listview' => array(
                'fields' => array(
                    6 => array(
                        'name' => 'total_site_revenue_as_employer',
                        'label' => 'Site Revenue From Employer'
                    )
                )
            ) ,
            'showview' => array(
                'fields' => array(
                    17 => array(
                        'name' => 'total_site_revenue_as_employer',
                        'label' => 'Site Revenue From Employer'
                    )
                )
            )
        )
    );
    $tables = merge_details($tables, $milestone_table);
}
if (isPluginEnabled('Bidding/Bidding') || isPluginEnabled('Contest/Contest') || (isPluginEnabled('Quote/Quote') && isPluginEnabled('Common/Subscription'))) {
    $milestone_table = array(
        'users' => array(
            'listview' => array(
                'fields' => array(
                    7 => array(
                        'name' => 'total_site_revenue_as_freelancer',
                        'label' => 'Site Revenue From Freelancer'
                    )
                )
            ) ,
            'showview' => array(
                'fields' => array(
                    18 => array(
                        'name' => 'total_site_revenue_as_freelancer',
                        'label' => 'Site Revenue From Freelancer'
                    )
                )
            )
        )
    );
    $tables = merge_details($tables, $milestone_table);
}
if (isPluginEnabled('Common/Subscription')) {
    $milestone_table = array(
        'users' => array(
            'listview' => array(
                'fields' => array(
                    5 => array(
                        'name' => 'available_credit_count',
                        'label' => 'Available Credit Points'
                    )
                )
            ) ,
            'showview' => array(
                'fields' => array(
                    16 => array(
                        'name' => 'available_credit_count',
                        'label' => 'Available Credit Points'
                    )
                )
            )
        )
    );
    $tables = merge_details($tables, $milestone_table);
}
if (isPluginEnabled('Common/Wallet')) {
    $milestone_table = array(
        'users' => array(
            'listview' => array(
                'fields' => array(
                    4 => array(
                        'name' => 'available_wallet_amount',
                        'label' => 'Available Balance'
                    )
                )
            ) ,
            'showview' => array(
                'fields' => array(
                    15 => array(
                        'name' => 'available_wallet_amount',
                        'label' => 'Available Balance'
                    )
                )
            )
        )
    );
    $tables = merge_details($tables, $milestone_table);
}
if (isPluginEnabled('Bidding/BiddingReview') || isPluginEnabled('Contest/ContestReview') || isPluginEnabled('Quote/QuoteReview')) {
    $milestone_table = array(
        'users' => array(
            'showview' => array(
                'fields' => array(
                    8 => array(
                        'name' => 'total_rating_as_freelancer',
                        'label' => 'Total Rating as Freelancer',
                    ) ,
                    9 => array(
                        'name' => 'review_count_as_freelancer',
                        'label' => 'Total Review Received as Freelancer',
                    ) ,
                    10 => array(
                        'name' => 'total_rating_as_employer',
                        'label' => 'Total Rating as Employer',
                    ) ,
                    11 => array(
                        'name' => 'review_count_as_employer',
                        'label' => 'Total Review Received as Employer',
                    ) ,
                )
            )
        )
    );
    $tables = merge_details($tables, $milestone_table);
}
if (isPluginEnabled('Bidding/Bidding') || isPluginEnabled('Job/Job') || isPluginEnabled('Contest/Contest')) {
    $milestone_table = array(
        'users' => array(
            'showview' => array(
                'fields' => array(
                    14 => array(
                        'name' => 'total_spend_amount_as_employer',
                        'label' => 'Total Spend Amount as Employer',
                    )
                )
            )
        )
    );
    $tables = merge_details($tables, $milestone_table);
}
if (isPluginEnabled('Bidding/Bidding') || isPluginEnabled('Job/Job') || isPluginEnabled('Contest/Contest') || isPluginEnabled('Portfolio/Portfolio')) {
    $user_menu = array(
        'Users' => array(
            'title' => 'Users',
            'icon_template' => '<span class="fa fa-users"></span>',
            'child_sub_menu' => array(
                'work_profiles' => array(
                    'title' => 'Work Profiles',
                    'icon_template' => '<span class="fa fa-file-text-o"></span>',
                    'suborder' => 2
                ) ,
                'educations' => array(
                    'title' => 'Education',
                    'icon_template' => '<span class="fa fa-file-text-o"></span>',
                    'suborder' => 3
                ) ,
                'certifications' => array(
                    'title' => 'Certifications',
                    'icon_template' => '<span class="fa fa-file-text-o"></span>',
                    'suborder' => 4
                ) ,
                'publications' => array(
                    'title' => 'Publications',
                    'icon_template' => '<span class="fa fa-file-text-o"></span>',
                    'suborder' => 5
                ) 
            )
        )
    );
    $menus = merged_menus($menus, $user_menu);
}
