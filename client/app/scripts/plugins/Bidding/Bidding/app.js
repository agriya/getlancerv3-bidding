/**
 * getlancerBidding - Angular Framework
 * Angula Version 1.5.3
 * @category   Js
 * @package    REST
 * @Framework  Angular
 * @authors     Mugundhan Asokan 
 * @email      a.mugundhan@agriya.in 
 * @copyright  2017 Agriya
 * @license    http://www.agriya.com/ Agriya Licence
 * @link       http://www.agriya.com
 * @since      2017-01-20
 */
/*globals $:false */
'use strict';
/**
 * @ngdoc overview
 * @name getlancerBidding
 * @description
 * # getlancerBidding
 *
 * Main module of the application.
 */
angular.module('getlancerApp.Bidding', [
    'getlancerApp.Bidding.Constant',
    'ngResource',
    'ngSanitize',
    'satellizer',
    'ngAnimate',
    'ui.bootstrap',
    'ui.bootstrap.datetimepicker',
    'ui.router',
    'angular-growl',
    'google.places',
    'angular.filter',
    'ngCookies',
    'angular-md5',
    'ui.select2',
    'http-auth-interceptor',
    'angulartics',
    'pascalprecht.translate',
    'angulartics.google.analytics',
    'tmh.dynamicLocale',
    'ngFileUpload',
    'infinite-scroll',
    'ngTagsInput',
    'angularMoment',
    'bc.Flickity',
    'afkl.lazyImage',
    'angular-loading-bar',
    'ngAnimate',
    'oitozero.ngSweetAlert',
    'slugifier',
    'checklist-model',
    'angularjs-dropdown-multiselect',
    'rzModule',
	'getlancerApp.Bidding.ProjectFlag',
	'getlancerApp.Bidding.ProjectFollow'
  ])
    /**
     * @ngdoc function
     * @name getStorgae
     * @methodOf global getStorgae
     * @description
     * @param {string, string} type, val
     * This funciton is used to get the localstorage.
     * @returns {string} local stored string
     */
    .config(function($stateProvider, $urlRouterProvider) {
        var getToken = {
            'TokenServiceData': function(TokenService, $q) {
                return $q.all({
                    AuthServiceData: TokenService.promise,
                    SettingServiceData: TokenService.promiseSettings
                });
            }
        };
        $urlRouterProvider.otherwise('/');
        $stateProvider.state('Bid_ProjectAdd', {
                url: '/projects/add?enable_hide',
                templateUrl: 'scripts/plugins/Bidding/Bidding/views/default/project_add.html',
                controller: 'ProjectAddCtrl',
                resolve: getToken
            })
            .state('Bid_ProjectEdit', {
                url: '/projects/edit/:id?status',
                templateUrl: 'scripts/plugins/Bidding/Bidding/views/default/project_edit.html',
                controller: 'ProjectEditCtrl',
                resolve: getToken
            })
            .state('Bid_ProjectView', {
                url: '/projects/view/:id/:slug?placebid&edit&action',
                templateUrl: 'scripts/plugins/Bidding/Bidding/views/default/project_view.html',
                controller: 'ProjectViewCtrl',
                resolve: getToken
            })
            .state('Bid_Projects', {
                url: '/projects?q&page&type&project_categories&skills&price_range_min&price_range_max',
                templateUrl: 'scripts/plugins/Bidding/Bidding/views/default/projects.html',
                controller: 'ProjectsListCtrl',
                resolve: getToken
            })
            .state('Bid_MeProjects', {
                url: '/projects/me?status',
                templateUrl: 'scripts/plugins/Bidding/Bidding/views/default/my_projects.html',
                controller: 'MyProjectsCtrl',
                resolve: getToken,
            })
            .state('Bid_MeBids', {
                url: '/projects/bids/me',
                templateUrl: 'scripts/plugins/Bidding/Bidding/views/default/my_bids.html',
                controller: 'MyBidsCtrl',
                resolve: getToken,
            })
            .state('Bid_ProjectPayment', {
                url: '/projects/order/:id/:slug',
                templateUrl: 'scripts/plugins/Bidding/Bidding/views/default/project_payment.html',
                controller: 'ProjectPaymentController',
                resolve: getToken,
            })
    })
    /**
     * @ngdoc filter
     * @name getlancerJobsApp.date_format
     * @param {date, string} date, format
     * @description
     * For change the date format in html view page.
     */
    .filter('date_format', function($filter) {
        return function(input, format) {
            return $filter('date')(new Date(input), format);
        };
    })
    /**
     * @ngdoc filter
     * @name getlancerJobsApp.capitalize
     * @param {string} value
     * @description
     * For change the first character upper case in give string.
     */
    .filter('capitalize', function() {
        return function(input) {
            return (!!input) ? input.charAt(0)
                .toUpperCase() + input.substr(1)
                .toLowerCase() : '';
        };
    })
    .filter('milestone_status', function($filter) {
        return function(input, format) {
            return "Completed";
        };
    })
    .config(function(tagsInputConfigProvider) {
        tagsInputConfigProvider.setDefaults('tagsInput', {
                placeholder: '',
                minLength: 1,
                addOnEnter: false
            })
            .setDefaults('autoComplete', {
                debounceDelay: 200,
                loadOnDownArrow: true,
                loadOnEmpty: true
            })
    });
/**
 * @ngdoc function
 * @name checkFileFormat
 * @methodOf global checkFileFormat
 * @description
 * @param {object, array} type, val
 * This funciton is used to check the upload file validation.
 * @returns {boolean}
 */
//jshint unused:false
function checkFileFormat(file, validFormats) {
    if (file) {
        var value = file.name;
        var ext = value.substring(value.lastIndexOf('.') + 1)
            .toLowerCase();
        return validFormats.indexOf(ext) !== -1;
    } else {
        return false;
    }
}