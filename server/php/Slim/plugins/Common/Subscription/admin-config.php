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
    'Master' => array(
        'title' => 'Master',
        'icon_template' => '<span class="glyphicon glyphicon-dashboard"></span>',
        'child_sub_menu' => array(
            'credit_purchase_plans' => array(
                'title' => 'Credit Plans',
                'icon_template' => '<span class="glyphicon glyphicon-log-out"></span>',
                'link' => '/credit_purchase_plans/list?search={"filter":"all"}',
                'suborder' => 8
            ) ,
        ) ,
    ) ,
    'Payments' => array(
        'title' => 'Payments',
        'icon_template' => '<span class="glyphicon glyphicon-usd"></span>',
        'child_sub_menu' => array(
            'credit_purchase_logs' => array(
                'title' => 'Credit Purchases',
                'icon_template' => '<span class="glyphicon glyphicon-log-out"></span>',
                'suborder' => 3
            ) ,
        ) ,
    ) ,
);
$tables = array(
    'credit_purchase_plans' => array(
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
                    'name' => 'no_of_credits',
                    'label' => 'Credits',
                ) ,
                3 => array(
                    'name' => 'original_price',
                    'label' => 'Original Price',
                ) ,
                4 => array(
                    'name' => 'discount_percentage',
                    'label' => 'Discount Percentage',
                ) ,
                5 => array(
                    'name' => 'price',
                    'label' => 'Final Price',
                ) ,
                6 => array(
                    'name' => 'day_limit',
                    'label' => 'Days Limit',
                ) ,
                7 => array(
                    'name' => 'is_active',
                    'label' => 'Active?',
                    'type' => 'boolean',
                ) ,
                8 => array(
                    'name' => 'is_welcome_plan',
                    'label' => 'Welcome Plan?',
                    'type' => 'boolean',
                ),
                9 => array(
                    'name' => 'created_at',
                    'label' => 'Created On',
                ) ,
            ) ,
            'title' => 'Credit Plans',
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
                0 => '<batch-active type="active" action="credit_purchase_plans" selection="selection"></batch-active>',
                1 => '<batch-in-active type="inactive" action="credit_purchase_plans" selection="selection"></batch-in-active>',
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
                    'name' => 'no_of_credits',
                    'label' => 'Credits',
                    'type' => 'number',
                    'defaultValue' => '0',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                2 => array(
                    'name' => 'original_price',
                    'label' => 'Original Price',
                    'type' => 'number',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                3 => array(
                    'name' => 'discount_percentage',
                    'label' => 'Discount Percentage',
                    'type' => 'number',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                4 => array(
                    'name' => 'day_limit',
                    'label' => 'Days Limit',
                    'validation' => array(
                        'required' => false,
                    ) ,
                ) ,
                5 => array(
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
                6 => array(
                    'name' => 'is_welcome_plan',
                    'label' => 'Welcome Plan?',
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
                ) 
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
                    'name' => 'no_of_credits',
                    'label' => 'Credits',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                2 => array(
                    'name' => 'original_price',
                    'label' => 'Original Price',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                3 => array(
                    'name' => 'discount_percentage',
                    'label' => 'Discount Percentage',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                4 => array(
                    'name' => 'day_limit',
                    'label' => 'Days Limit',
                    'validation' => array(
                        'required' => false,
                    ) ,
                ) ,
                5 => array(
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
                6 => array(
                    'name' => 'is_welcome_plan',
                    'label' => 'Welcome Plan?',
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
                ) 
            ) ,
        ) ,
    ) ,
    'credit_purchase_logs' => array(
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
                    'name' => 'quote_credit_purchase_plan.name',
                    'label' => 'Plan',
                ) ,
                3 => array(
                    'name' => 'credit_count',
                    'label' => 'Credits',
                    'type' => 'number',
                ) ,
                4 => array(
                    'name' => 'price',
                    'label' => 'Price',
                ) ,
                5 => array(
                    'name' => 'discount_percentage',
                    'label' => 'Discount Percentage',
                ) ,
                6 => array(
                    'name' => 'original_price',
                    'label' => 'Original Price',
                ) ,
                7 => array(
                    'name' => 'is_payment_completed',
                    'label' => 'Paid?',
                    'type' => 'boolean'
                ) ,
                8 => array(
                    'name' => 'is_payment_completed',
                    'label' => 'Expired?',
                    'type' => 'wysiwyg',
                    'map' => array(
                        0 => 'statusdisplay',
                    ) ,
                ) ,
                9 => array(
                    'name' => 'created_at',
                    'label' => 'Created On',
                ) ,
            ) ,
            'title' => 'Service Credit Purchase Logs',
            'perPage' => '10',
            'sortField' => '',
            'sortDir' => '',
            'infinitePagination' => false,
            'listActions' => array(
                0 => 'edit',
                1 => 'show',
                2 => 'delete'
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
                    'name' => 'credit_purchase_plan_id',
                    'label' => 'Plan',
                    'targetEntity' => 'credit_purchase_plans',
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
                    'name' => 'credit_purchase_plan_id',
                    'label' => 'Credit Purchase Plan',
                    'targetEntity' => 'credit_purchase_plans',
                    'targetField' => 'name',
                    'type' => 'reference',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                2 => array(
                    'name' => 'price',
                    'label' => 'Price',
                    'type' => 'number',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                3 => array(
                    'name' => 'discount_percentage',
                    'label' => 'Discount Percentage',
                    'type' => 'number',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                4 => array(
                    'name' => 'original_price',
                    'label' => 'Original Price',
                    'type' => 'number',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                5 => array(
                    'name' => 'payment_gateway_id',
                    'label' => 'Payment Gateway',
                    'targetEntity' => 'payment_gateways',
                    'targetField' => 'name',
                    'type' => 'reference',
                    'validation' => array(
                        'required' => false,
                    ) ,
                ) ,
                6 => array(
                    'name' => 'gateway_id',
                    'label' => 'Gateway',
                    'targetEntity' => 'gateways',
                    'targetField' => 'name',
                    'type' => 'reference',
                    'validation' => array(
                        'required' => false,
                    ) ,
                ) ,
                7 => array(
                    'name' => 'is_payment_completed',
                    'label' => 'Payment Completed?',
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
                8 => array(
                    'name' => 'coupon_id',
                    'label' => 'Coupon',
                    'targetEntity' => 'coupons',
                    'targetField' => 'coupon_code',
                    'type' => 'reference',
                    'validation' => array(
                        'required' => false,
                    ) ,
                ) ,
                9 => array(
                    'name' => 'is_active',
                    'label' => 'Actives?',
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
                    'name' => 'user_id',
                    'label' => 'User',
                    'targetEntity' => 'users',
                    'targetField' => 'username',
                    'type' => 'reference',
                    'editable' => false,
                ) ,
                1 => array(
                    'name' => 'credit_purchase_plan_id',
                    'label' => 'Plan',
                    'targetEntity' => 'credit_purchase_plans',
                    'targetField' => 'name',
                    'type' => 'reference',
                    'editable' => false,
                ) ,
                2 => array(
                    'name' => 'price',
                    'label' => 'Price',
                    'editable' => false,
                ) ,
                3 => array(
                    'name' => 'discount_percentage',
                    'label' => 'Discount Percentage',
                    'editable' => false,
                ) ,
                4 => array(
                    'name' => 'original_price',
                    'label' => 'Original Price',
                    'editable' => false,
                ) ,
                5 => array(
                    'name' => 'credit_count',
                    'label' => 'Credits',
                ) ,
                6 => array(
                    'name' => 'is_payment_completed',
                    'label' => 'Paid?',
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
);
