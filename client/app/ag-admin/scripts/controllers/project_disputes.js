'use strict';
/**
 * @ngdoc function
 * @name ofosApp.controller:TransactionController
 * @description
 * # TransactionController
TransactionController * Controller of the getlancerv3
 */
angular.module('base')
    .controller('ProjectDisputeController', function ($scope, $http, $filter, notification, $state, $window, $cookies, TransactionAdminMessage, ProjectDispute, md5, $stateParams, DisputeClosedTypes, $timeout) {
        $scope.dispute_id = $stateParams.id;
        $scope.index = function () {
            $scope.project_dispute();
            $timeout(function(){
            $scope.dispute_closed_type();
            },1000);
        }
       
        $scope.project_dispute = function () {
            var params = {};
            params.id = $scope.dispute_id;
            ProjectDispute.get(params, function (response) {
                if (parseInt(response.error.code) === 0) {
                    $scope.dispute = response.data; 
                    $scope.open_type_id = $scope.dispute.dispute_open_type_id;
                    $scope.dispute_project_user_id = $scope.dispute.user_id;
                    $scope.dispute_user_id = $scope.dispute.user_id;
                    $scope.dispute_resove_type = $scope.dispute.dispute_closed_type.resolve_type;
                }
            }, function (error) {
                console.log('ProjectDispute Get', error);
            })
        }
         $scope.dispute_closed_type = function () {
            var params = {};
             params.dispute_open_type_id = $scope.open_type_id;
            DisputeClosedTypes.get(params, function (response) {
                if (parseInt(response.error.code) === 0) {
                    $scope.dispute_closed_types = response.data;
                }
            }, function (error) {
                console.log('DisputeClosedTypes Get', error);
            })
        };
         $scope.save = function () {
            var params = {};
            params.id =  $scope.dispute_id;
            params.bid_id = $scope.dispute.bid_id
            params.dispute_closed_type_id = $scope.dispute_closed_type.id;
            ProjectDispute.put(params, function (response) {
                if (parseInt(response.error.code) === 0) {
                        notification.log($filter("translate")("Project status changed successfully."),{
                            addnCls: 'humane-flatty-success'
                        });
                         $state.go('project_dispute', {'id':$scope.dispute_id},{reload:true});
                    }
            }, function (error) {
                console.log('DisputeUpdate Put', error);
            })
        };

        $scope.index();
    });