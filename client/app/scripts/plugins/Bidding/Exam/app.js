/*globals $:false */
'use strict';
/**
 * @ngdoc overview
 * @name getlancerApp
 * @description
 * # getlancerApp
 *
 * Main module of the application.
 */
angular.module('getlancerApp.Bidding.Exam', [
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
    'slugifier',
    'checklist-model',
    'angularjs-dropdown-multiselect',
    'rzModule'
  ])
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
        $stateProvider.state('Exam', {
                url: '/exams?q&page&enable_hide',
                templateUrl: 'scripts/plugins/Bidding/Exam/views/default/exams.html',
                controller: 'ExamListCtrl',
                resolve: getToken,
            })
            .state('MyExams', {
                url: '/exams/my_attempts',
                templateUrl: 'scripts/plugins/Bidding/Exam/views/default/my_exams.html',
                controller: 'MyExamController',
                resolve: getToken,
            })
            .state('ExamCertified', {
                url: '/exams/my_attempts/status/certified',
                templateUrl: 'scripts/plugins/Bidding/Exam/views/default/my_exams.html',
                controller: 'MyExamController',
                resolve: getToken,
            })
            .state('Exam_Payment', {
                url: '/exams/order/:id',
                templateUrl: 'scripts/plugins/Bidding/Exam/views/default/exam_payment.html',
                controller: 'ExamPaymentController',
                resolve: getToken,
            })
            .state('ExamStart', {
                url: '/exams/start/:id',
                templateUrl: 'scripts/plugins/Bidding/Exam/views/default/exam_start.html',
                controller: 'ExamStartController',
                resolve: getToken,
            })
            .state('OnlineTest', {
                url: '/exams/online_test/:id',
                templateUrl: 'scripts/plugins/Bidding/Exam/views/default/exam_online.html',
                controller: 'ExamOnlineTestCtrl',
                resolve: getToken,
            })
            .state('ExamResult', {
                url: '/exams/result/:id',
                templateUrl: 'scripts/plugins/Bidding/Exam/views/default/exam_result.html',
                controller: 'ExamResultController',
                resolve: getToken,
            })
            .state('ExamView', {
                url: '/exams/:id/:slug',
                templateUrl: 'scripts/plugins/Bidding/Exam/views/default/exam_view.html',
                controller: 'ExamViewCtrl',
                resolve: getToken,
            })
    });