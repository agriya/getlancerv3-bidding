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
            'project_bid_invoices' => array(
                'title' => 'Invoices',
                'icon_template' => '<span class="glyphicon glyphicon-log-out"></span>',
                'suborder' => 4
            ) ,
        )
    ) ,
);
$tables = array(
    'project_bid_invoices' => array(
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
                    'label' => 'Amount',
                ) ,
                4 => array(
                    'name' => 'site_commission_from_employer',
                    'label' => 'Site Commission From Employer',
                ) ,
                5 => array(
                    'name' => 'site_commission_from_freelancer',
                    'label' => 'Site Commission From Freelancer',
                ) ,
                6 => array(
                    'name' => 'is_paid',
                    'label' => 'Paid?',
                    'type' => 'boolean'
                ) ,
                7 => array(
                    'name' => 'created_at',
                    'label' => 'Created On',
                ) ,
            ) ,
            'title' => 'Project Bid Invoices',
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
                1 => '<batch-invoice-paid type="paid" action="project_bid_invoices" selection="selection"></batch-invoice-paid>',
                2 => '<batch-invoice-unpaid type="unpaid" action="project_bid_invoices" selection="selection"></batch-invoice-unpaid>'
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
                    'name' => 'bid_id',
                    'label' => 'Bid',
                    'targetEntity' => 'bids',
                    'targetField' => 'name',
                    'type' => 'reference',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                2 => array(
                    'name' => 'amount',
                    'label' => 'Amount',
                    'type' => 'number',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                3 => array(
                    'name' => 'site_fee',
                    'label' => 'Site Fee',
                    'type' => 'number',
                    'defaultValue' => '0',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                4 => array(
                    'name' => 'is_paid',
                    'label' => 'Paid?',
                    'type' => 'number',
                    'defaultValue' => '0',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                5 => array(
                    'name' => 'paid_on',
                    'label' => 'Paid On',
                    'type' => 'string',
                    'validation' => array(
                        'required' => false,
                    ) ,
                ) ,
                6 => array(
                    'name' => 'pay_key',
                    'label' => 'Pay Key',
                    'type' => 'string',
                    'validation' => array(
                        'required' => false,
                    ) ,
                ) ,
                7 => array(
                    'name' => 'zazpay_pay_key',
                    'label' => 'Zazpay Pay Key',
                    'type' => 'string',
                    'validation' => array(
                        'required' => false,
                    ) ,
                ) ,
                8 => array(
                    'name' => 'zazpay_payment_id',
                    'label' => 'Zazpay Payment',
                    'targetEntity' => 'zazpay_payments',
                    'targetField' => 'name',
                    'type' => 'reference',
                    'validation' => array(
                        'required' => false,
                    ) ,
                ) ,
                9 => array(
                    'name' => 'zazpay_gateway_id',
                    'label' => 'Zazpay Gateway',
                    'targetEntity' => 'zazpay_gateways',
                    'targetField' => 'name',
                    'type' => 'reference',
                    'validation' => array(
                        'required' => false,
                    ) ,
                ) ,
                10 => array(
                    'name' => 'zazpay_revised_amount',
                    'label' => 'Zazpay Revised Amount',
                    'type' => 'number',
                    'validation' => array(
                        'required' => false,
                    ) ,
                ) ,
                11 => array(
                    'name' => 'site_commission_from_employer',
                    'label' => 'Site Commission From Employer',
                    'type' => 'number',
                    'validation' => array(
                        'required' => false,
                    ) ,
                ) ,
                12 => array(
                    'name' => 'site_commission_from_freelancer',
                    'label' => 'Site Commission From Freelancer',
                    'type' => 'number',
                    'validation' => array(
                        'required' => false,
                    ) ,
                ) ,
                13 => array(
                    'name' => 'user_id',
                    'label' => 'User',
                    'targetEntity' => 'users',
                    'targetField' => 'username',
                    'type' => 'reference',
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
                    'editable' => false,
                ) ,
                1 => array(
                    'name' => 'project_id',
                    'label' => 'Project',
                    'targetEntity' => 'projects',
                    'targetField' => 'name',
                    'type' => 'reference',
                    'editable' => false,
                ) ,
                2 => array(
                    'name' => 'amount',
                    'label' => 'Amount',
                    'validation' => array(
                        'required' => true,
                    ) ,
                ) ,
                3 => array(
                    'name' => 'is_paid',
                    'label' => 'Paid?',
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
);
