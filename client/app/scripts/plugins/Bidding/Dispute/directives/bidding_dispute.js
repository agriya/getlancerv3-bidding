'use strict';
angular.module('getlancerApp.Bidding.Dispute')
    .directive('biddingDispute', function() {
        return {
            restrict: 'EA',
            templateUrl: 'scripts/plugins/Bidding/Dispute/views/default/bidding_project_dispute.html',
            scope: {
                bidid: '@',
                project: '@',
                biduser: '@',
                projectuser: '@',
                isdispute: '@',
                projectstatus: '@'
            },
            controller: function($scope, $rootScope, $cookies, $state, $filter, flash, DisputeStatus, ProjectDispute, md5) {
                $scope.auth = JSON.parse($cookies.get('auth'));
                if ($scope.isdispute !== 'true') {
                    $scope.data = {};
                    /* For close the form */
                    $scope.closefrm = function() {
                        $scope.project_dispute = $rootScope.project_dispute = false;
                        $state.go('Bid_ProjectView', {
                            id: $state.params.id,
                            slug: $state.params.slug,
                            action: 'messages'
                        }, {
                            reload: true
                        });
                    };
                    DisputeStatus.get({
                        id: $scope.bidid
                    }, function(response) {
                        if (parseInt(response.error.code) === 0) {
                            $scope.disputeTypes = response.data;
                        }
                    }, function(error) {
                        console.log('DisputeStatus', error);
                    });
                    $scope.dispute_submit = false;
                    $scope.disputeSubmit = function($valid, data) {
                        if ($valid) {
                            $scope.dispute_submit = true;
                            data.bid_id = $scope.bidid;
                            swal({ //jshint ignore:line
                                title: $filter("translate")('Are you sure you raise the dispute for this project?'),
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
                                    ProjectDispute.post(data, function(response) {
                                         $scope.dispute_submit = false;
                                        var flashMessage = "";
                                        if (parseInt(response.error.code) === 0) {
                                            flashMessage = $filter("translate")("Your dispute request sent successfully.");
                                            flash.set(flashMessage, 'success', false);
                                            $state.reload();
                                        } else {
                                            flashMessage = $filter("translate")("Your dispute request sending failed.");
                                            flash.set(flashMessage, 'error', false);
                                            $scope.dispute_submit = false;
                                        }
                                    }, function(error) {
                                        console.log(error);
                                    });
                                }
                                 $scope.dispute_submit = false;
                            });
                        }
                    }
                } else {
                    var params = {
                        project_id: $scope.project,
                        bid_id: $scope.bidid,
                        user_id: $scope.biduser,
                        fields: 'id,reason,user_id,dispute_status_id,created_at',
                    }
                    ProjectDispute.get(params, function(response) {
                        if (parseInt(response.error.code) === 0) {
                            $scope.dispute = response.data[0];
                             if (angular.isDefined($scope.dispute.user.attachment) && $scope.dispute.user.attachment !== null) {
                                $scope.user_avatar_url = 'images/normal_thumb/UserAvatar/' + $scope.dispute.user.id + '.' + md5.createHash('UserAvatar' + $scope.dispute.user.id + 'png' + 'normal_thumb') + '.png';
                            } else {
                                $scope.user_avatar_url = 'images/default.png';
                            }
                        }
                    }, function(error) {
                        console.log('ProjectDispute Get', error);
                    })
                }
            }
        }
    })