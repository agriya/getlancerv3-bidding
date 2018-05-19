'use strict';
/**
 * @ngdoc directive
 * @name getlancerApp.directive:notifications
 * @notifications
 * # notifications
 */
angular.module('getlancerApp')
 .directive('headerNotification', function () {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'views/header_notifications.html'
     /* controller: 'newsFeedsCtrl'*/
    };
  });