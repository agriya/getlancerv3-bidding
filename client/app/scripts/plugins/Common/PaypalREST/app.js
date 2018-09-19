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
angular.module('getlancerApp.Common.PaypalREST', [
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
    '720kb.socialshare',
    'slugifier'
  ]);
