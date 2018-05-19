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
$dashboard = array(
    'reviews' => array(
        'addCollection' => array(
            'fields' => array(
                0 => array(
                    'name' => 'user.username',
                    'label' => 'User'
                ) ,
                1 => array(
                    'name' => 'other_user.username',
                    'label' => 'To User'
                ) ,
                2 => array(
                    'name' => 'rating',
                    'label' => 'Rating',
                    'template' => '<star-rating stars="{{entry.values.rating}}"></star-rating>'
                ) ,
                3 => array(
                    'name' => 'message',
                    'label' => 'Message'
                ) ,
            ) ,
            'title' => 'Recent Reviews',
            'name' => 'recent_reviews',
            'perPage' => 5,
            'order' => 7,
            'template' => '<div class="col-lg-6"><div class="panel"><ma-dashboard-panel collection="dashboardController.collections.recent_reviews" entries="dashboardController.entries.recent_reviews" datastore="dashboardController.datastore"></ma-dashboard-panel></div></div>'
        )
    )
);
