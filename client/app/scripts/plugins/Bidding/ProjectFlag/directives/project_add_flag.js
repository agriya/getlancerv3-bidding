'use strict';
angular.module('getlancerApp.Bidding.ProjectFlag')
    .directive('biddingFlag', function () {
        return {
            restrict: 'EA',
            //replace: true,
            template: '<span class="cursor" ng-click="reportModal()" ng-bind-html=templateBtn> </span>',
            scope: {
                classname: '@',
                foreignid: '@',
                appendhtml: '@'
            },
            controller: function ($scope, $rootScope, $state, $filter, flash, $uibModal, $uibModalStack, ReportProjectCategories, ReportProject, $sce) {
                if ($scope.classname === 'Project') {
                    $scope.modeltitle = "Report Project";
                } else {
                    $scope.modeltitle = "Report User";
                }
                if ($scope.appendhtml !== undefined) {
                    $scope.templateBtn = $scope.appendhtml;
                } else {
                    $scope.templateBtn = ($scope.classname === 'Project') ? 'Report Project' : 'Report User';
                }
                $rootScope.closemodel = function () {
                    $uibModalStack.dismissAll();
                }
                $scope.reportModal = function () {
                    $rootScope.project_id = $scope.foreignid;
                    $scope.modalInstance = $uibModal.open({
                        templateUrl: 'scripts/plugins/Bidding/Bidding/views/default/bidding_report.html',
                        animation: false,
                        controller: function ($scope, $rootScope, $stateParams, $filter, $state, $uibModal, ReportProjectCategories, ReportProject, flash, flagdatas) {
                            $scope.flag = $scope.flags = [];
                            $scope.ReportProjectCategories = function () {
                                var params = {}
                                params.class = 'Project',
                                    ReportProjectCategories.get(params, function (response) {
                                        $scope.flag = response.data;
                                    });
                            };
                            $scope.ReportProjectCategories();
                            /**
                             * @ngdoc method
                             * @name ReportProjectCtrl.reportProject.submit
                             * @methodOf module.ReportProjectCtrl
                             * @description
                             * This method is post the apply job details.
                             */
                            $scope.job_report = false;
                            $scope.submit = function ($valid) {
                                if ($valid) {
                                    $scope.job_report = true;
                                    var post_params = {
                                        foreign_id: flagdatas.foreignid,
                                        class: flagdatas.classname,
                                        flag_category_id: $scope.flags.flag_category_id,
                                        message: $scope.flags.message
                                    };
                                    var flashMessage = "";
                                    ReportProject.post(post_params, function (response) {
                                        $scope.response = response;
                                        if ($scope.response.error.code === 0) {
                                            $scope.flags = {};
                                            $rootScope.closemodel();
                                            flashMessage = $filter("translate")("Report posted successfully.");
                                            flash.set(flashMessage, 'success', false);
                                        } else {
                                            flashMessage = $filter("translate")($scope.response.error.message);
                                            flash.set(flashMessage, 'error', false);
                                            $scope.job_report = false;
                                        }
                                    });
                                }
                            };
                        },
                        size: 'lg',
                        resolve: {
                            flagdatas: function () {
                                var returnVal = {
                                    foreignid: $scope.foreignid,
                                    classname: $scope.classname
                                };
                                return returnVal;
                            }
                        }
                    });
                };
            }
        }
    });