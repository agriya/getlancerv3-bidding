'use strict';
/**
 * @ngdoc function
 * @name getlancerApp.controller:BiddingMilestoneCtrl
 * @description
 * # QuoteServicePhotosManageController
 * Controller of the getlancerApp
 */
angular.module('getlancerApp.Bidding.Milestone')
    .directive('milestoneActions', function() {
        return {
            restrict: 'EA',
            templateUrl: 'scripts/plugins/Bidding/Milestone/views/default/bidding_milestone_actions.html',
            scope: {
                projectuser: '@',
                milestoneid: '@',
                milestonestatus: '@',
                actiontype: '@',
            },
            controller: function($scope, $rootScope, $cookies, $state, $filter, flash, MilestoneStatusConstant, MilestoneStatusChange) {
                $scope.auth = JSON.parse($cookies.get('auth'));
                $scope.MilestoneStatusConstant = MilestoneStatusConstant;
                if (parseInt($scope.projectuser) === parseInt($scope.auth.id)) {
                    $scope.is_freelancer = false;
                } else {
                    $scope.is_freelancer = true;
                }
                $scope.actiontype = parseInt($scope.actiontype);
                $scope.milestoneStatueChange = function(milestoneId, statusId, status) {
                    if (statusId !== 'pay') {
                        swal({ //jshint ignore:line
                            title: $filter("translate")('Are you sure you want to do this action?'),
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
                                if(status === 'workcompleted')
                                {
                                 MilestoneStatusChange.put({id: milestoneId,milestone_status_id: $scope.MilestoneStatusConstant.Completed}, function(response) {
                                     if (response.error.code === 0) {
                                          MilestoneStatusChange.put({id: milestoneId,milestone_status_id: statusId}, function(response) {
                                    var flashMessage = "";
                                    if (parseInt(response.error.code) === 0) {
                                        flashMessage = $filter("translate")("Milestone status changed");
                                        flash.set(flashMessage, 'success', false);
                                        /* Here need to pass the parent controller to reload */
                                        $scope.$emit('isupdated', 'true');
                                    } else {
                                        flashMessage = $filter("translate")(response.error.message);
                                        flash.set(flashMessage, 'error', false);
                                    }
                                });
                            } else {
                                flashMessage = $filter("translate")(response.error.message);
                                        flash.set(flashMessage, 'error', false);
                            }
                                  });
                     } else {
                                MilestoneStatusChange.put({id: milestoneId,milestone_status_id: statusId}, function(response) {
                                    var flashMessage = "";
                                    if (parseInt(response.error.code) === 0) {
                                        flashMessage = $filter("translate")("Milestone status changed");
                                        flash.set(flashMessage, 'success', false);
                                        /* Here need to pass the parent controller to reload */
                                        $scope.$emit('isupdated', 'true');
                                    } else {
                                        flashMessage = $filter("translate")(response.error.message);
                                        flash.set(flashMessage, 'error', false);
                                    }
                                });
                            }
                            }
                        });
                    } else {
                        /* Go to the payment page */
                        $state.go('Bidding_MilestonePayment', {
                            id: milestoneId,
                            name: 'milestone'
                        });
                    }
                };
            }
        }
    })