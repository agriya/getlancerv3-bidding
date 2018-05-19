angular.module('getlancerApp.Common.Subscription', [
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
    'ui.select',
    'http-auth-interceptor',
    'vcRecaptcha',
    'angulartics',
    'pascalprecht.translate',
    'angulartics.google.analytics',
    'tmh.dynamicLocale',
    'ngMap',
    'chieffancypants.loadingBar',
    'payment',
    'builder',
    'builder.components',
    'validator.rules',
    'angularMoment',
    'ngFileUpload',
    'oitozero.ngSweetAlert',
    '720kb.socialshare',
    'slugifier'
  ]);
    // .config(function($stateProvider, $urlRouterProvider) {
    //     var getToken = {
    //         'TokenServiceData': function(TokenService, $q) {
    //             return $q.all({
    //                 AuthServiceData: TokenService.promise,
    //                 SettingServiceData: TokenService.promiseSettings
    //             });
    //         }
    //     };
    //     $urlRouterProvider.otherwise('/');
    //     $stateProvider.state('quote_credit_purchase_plan', {
    //             url: '/purchase_plan?error_code',
    //             templateUrl: 'scripts/plugins/Common/Subscription/views/default/quote_credit_purchase_plan.html',
    //             resolve: getToken
    //         })
    //         .state('quote_credit_purchase_logs_me', {
    //             url: '/purchase_logs?page',
    //             templateUrl: 'scripts/plugins/Common/Subscription/views/default/quote_credit_purchase_logs.html',
    //             resolve: getToken
    //         });
    // });