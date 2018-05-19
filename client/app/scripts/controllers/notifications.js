  'use strict';
  angular.module('getlancerApp')
      .controller('NotificationsController', ['$rootScope', '$scope', 'MessagesFactory', function($rootScope, $scope, MessagesFactory) {
          $scope.current_page = 1;
          $scope.index = function() {
              $scope.getNotifications();
          };
          $scope.getNotifications = function() {
              var params = {};
              params.page = $scope.current_page;
              params.type = 'notification';
              MessagesFactory.get(params, function(response) {
                  if (angular.isDefined(response._metadata)) {
                      $scope.total_items = response._metadata.total;
                      $scope.items_per_page = response._metadata.per_page;
                      $scope.no_of_pages = response._metadata.last_page;
                      $scope.current_page = response._metadata.current_page;
                  }
                  $scope.notifications = response.data;
              });
          };
          $scope.notificationPaginate = function() {
              $scope.getNotifications();
          };
          $scope.index();
    }]);