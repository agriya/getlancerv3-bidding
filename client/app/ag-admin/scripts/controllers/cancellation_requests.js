'use strict';
/**
 * @ngdoc function
 * @name ofosApp.controller:CancelationController
 * @description
 * # CancelationController
CancelationController * Controller of the ofosApp
 */
angular.module('base')
    .controller('CancelationController', ['$scope', '$stateParams', 'ConstContest', 'ContestFactory', '$state', '$filter', 'notification', '$location', function($scope, $stateParams, ConstContest, ContestFactory, $state, $filter, notification, $location) {
        $scope.contest_id = $stateParams.id;
        $scope.ConstContest = ConstContest;
        $scope.cancel = function() {
            var params = {};
            params.id = $scope.contest_id,
                params.contest_status_id = ConstContest.CanceledByAdmin;
            ContestFactory.update(params, function(response) {
                if (response.error.code === 0) {
                    notification.log($filter("translate")("Contest Cancelled successfully"), 'success', false);
                    $location.path('/contests/list');
                };
            });
        };
        $scope.judging = function() {
            var params = {};
            params.id = $scope.contest_id,
                params.contest_status_id = ConstContest.Judging;
            ContestFactory.update(params, function(response) {
                if (response.error.code === 0) {
                    notification.log($filter("translate")("Contest moved to judging successfully"), 'success', false);
                    $location.path('/contests/list');
                };
            });
        };
    }]);