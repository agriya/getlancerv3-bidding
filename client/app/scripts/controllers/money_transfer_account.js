'use strict';
/**
 * @ngdoc function
 * @name getlancerApp.controller:MoneyTransferAccountController
 * @description
 * # MoneyTransferAccountController
 * Controller of the getlancerApp
 */
angular.module('getlancerApp')
    .controller('MoneyTransferAccountController', ['$rootScope', '$scope', 'moneyTransferAccount', 'flash', '$filter', '$state', '$window','$location', function($rootScope, $scope, moneyTransferAccount, flash, $filter, $state, $window, $location) {
        $rootScope.header = $rootScope.settings.SITE_NAME + ' | ' + $filter("translate")("Money Transfer Accounts");
        $scope.index = function() {
            $rootScope.url_split = $location.path().split("/")[2];
            $scope.money_transfer_submit = false;
            var params = {};
            params.user_id = $rootScope.user.id;
            $scope.loader = true;
            moneyTransferAccount.get(params, function(response) {
                if (angular.isDefined(response.data)) {
                    $scope.moneyTransferAccLists = response.data;
                }
                $scope.loader = false;
            });
        };
        $scope.MoneyTransferAccSubmit = function($valid) {
            if ($valid) {
                $scope.money_transfer_submit = true;
                var params = {};
                params.account = $scope.account;
                params.is_active = 1;
                moneyTransferAccount.save({
                    'user_id': $rootScope.user.id
                }, params, function(response) {
                    $scope.response = response;
                    $state.reload();
                    flash.set($filter("translate")("Account added successfully"), 'success', true);
                }, function() {
                    flash.set($filter("translate")("Account could not be added"), 'error', false);
                });
            }
        };
        $scope.MoneyTransferAccDelete = function (id) {
                    swal({ //jshint ignore:line
                        title: $filter("translate")("Are you sure you want to delete?"),
                        text: "",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "OK",
                        cancelButtonText: "Cancel",
                        closeOnConfirm: true,
                        animation:false,
                    }).then(function (isConfirm) {
                        if (isConfirm) {
                            var param = {};
                            param.user_id = $rootScope.user.id;
                            param.account = id;
                            moneyTransferAccount.delete(param, function(response) {
                                $scope.response = response;
                                if ($scope.response.error.code === 0) {
                                    $state.reload();
                                    flash.set($filter("translate")("Account deleted successfully."), 'success', false);
                                } else {
                                    flash.set($filter("translate")("You have active withdraw request with this money transfer account. So you could not delete this account."), 'error', false);
                                }
                            });
                        }
                    });
        };
        $scope.index();
    }]);