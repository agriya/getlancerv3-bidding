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
;/*$menus = array (
  'Revenues' => 
  array (
    'title' => 'Revenues',
    'icon_template' => '<span class="fa fa-inr"></span>',
        'child_sub_menu' => array (
        'coupons' => 
        array (
            'title' => 'Coupons',
            'icon_template' => '<span class="glyphicon glyphicon-log-out"></span>',
        ), 
      ),
  ),
);
$tables = array (
  'coupons' => 
  array (
    'listview' => 
    array (
      'fields' => 
      array (
        0 => 
        array (
          'name' => 'id',
          'label' => 'ID',
          'isDetailLink' => true,
        ),
        1 => 
        array (
          'name' => 'coupon_code',
          'label' => 'Coupon Code',
        ),
        2 => 
        array (
          'name' => 'max_number_of_time_can_use',
          'label' => 'Max Number Of Time Can Use',
        ),
        3 => 
        array (
          'name' => 'max_number_of_time_can_use_per_user',
          'label' => 'Max Number Of Time Can Use Per User',
        ),
        4 => 
        array (
          'name' => 'coupon_used_count',
          'label' => 'Coupon Useds',
        ),
        5 => 
        array (
          'name' => 'discount',
          'label' => 'Discount',
        ),
        6 => 
        array (
          'name' => 'discount_type.name',
          'label' => 'Discount Type',
        ),
        7 => 
        array (
          'name' => 'min_amount',
          'label' => 'Min Amount',
        ),
        8 => 
        array (
          'name' => 'coupon_expiry_date',
          'label' => 'Coupon Expiry Date',
        ),
        9 => 
        array (
          'name' => 'is_active',
          'label' => 'Active?',
          'type' => 'boolean',
        ),
        10 => 
        array (
          'name' => 'created_at',
          'label' => 'Created On',
        ),
      ),
      'title' => 'Coupons',
      'perPage' => '10',
      'sortField' => '',
      'sortDir' => '',
      'infinitePagination' => false,
      'listActions' => 
      array (
        0 => 'edit',
        1 => 'show',
        2 => 'delete',
      ),
      'batchActions' => 
      array (
        0 => '<batch-active type="active" action="coupons" selection="selection"></batch-active>',
        1 => '<batch-in-active type="inactive" action="coupons" selection="selection"></batch-in-active>',
      ),
      'filters' => 
      array (
        0 => 
        array (
          'name' => 'q',
          'pinned' => true,
          'label' => 'Search',
          'type' => 'template',
          'template' => '',
        ),
        1 =>  
        array (
          'name' => 'is_active',
          'type' => 'choice',
          'label' => 'Active?',
          'choices' => 
          array (
            0 => 
            array (
              'label' => 'Active',
              'value' => true,
            ),
            1 => 
            array (
              'label' => 'Inactive',
              'value' => false,
            ),
          ),
        ),
      ),
      'permanentFilters' => '',
      'actions' => 
      array (
        0 => 'batch',
        1 => 'filter',
        2 => 'create',
      ),
    ),
    'creationview' => 
    array (
      'fields' => 
      array (
        0 => 
        array (
          'name' => 'coupon_code',
          'label' => 'Coupon Code',
          'type' => 'string',
          'validation' => 
          array (
            'required' => true,
          ),
        ),
        1 => 
        array (
          'name' => 'max_number_of_time_can_use',
          'label' => 'Max Number Of Time Can Use',
          'validation' => 
          array (
            'required' => true,
          ),
        ),
        2 => 
        array (
          'name' => 'max_number_of_time_can_use_per_user',
          'label' => 'Max Number Of Time Can Use Per User',
          'validation' => 
          array (
            'required' => true,
          ),
        ),
        3 => 
        array (
          'name' => 'discount',
          'label' => 'Discount',
          'validation' => 
          array (
            'required' => true,
          ),
        ),
        4 => 
        array (
          'name' => 'discount_type_id',
          'label' => 'Discount Type',
          'targetEntity' => 'discount_types',
          'targetField' => 'name',
          'type' => 'reference',
          'singleApiCall' => 'getdiscountType',
          'validation' => 
          array (
            'required' => true,
          ),
        ),
        5 => 
        array (
          'name' => 'min_amount',
          'label' => 'Min Amount',
          'validation' => 
          array (
            'required' => true,
          ),
        ),
        6 => 
        array (
          'name' => 'coupon_expiry_date',
          'label' => 'Coupon Expiry Date',
          'type' => 'date',
          'format' => 'yyyy-MM-dd',
          'validation' => 
          array (
            'required' => true,
          ),
        ),
        7 => 
        array (
          'name' => 'is_active',
          'label' => 'Active?',
          'type' => 'choice',
          'defaultValue' => false,
          'validation' => 
          array (
            'required' => true,
          ),
          'choices' => 
          array (
            0 => 
            array (
              'label' => 'Yes',
              'value' => true,
            ),
            1 => 
            array (
              'label' => 'No',
              'value' => false,
            ),
          ),
        ),
      ),
    ),
  ),
);*/
