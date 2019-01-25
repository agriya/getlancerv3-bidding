'use strict';
angular.module('getlancerApp.Bidding.Dispute')
    .directive('biddingDisputeMessage', function() {
        return {
            restrict: 'EA',
            templateUrl: 'scripts/plugins/Bidding/Dispute/views/default/bidding_project_dispute_message.html',
            scope: {
                bidid: '@',
                project: '@',
                biduser: '@',
                projectuser: '@',
                projectstatus: '@',
                disputeid: '@',
                disputestatus: '@'
            },
            controller: function($scope, $rootScope, $timeout, $state, $cookies, $filter, flash, md5, ProjectStatusConstant, Messages, Upload, DisputeMsgClass, DisputeStatusConstant) {
                $scope.DisputeStatusConstant = DisputeStatusConstant;
                $timeout(function() {
                    $scope.GetMessages = function() {
                        Messages.get({
                            foreign_id: $scope.disputeid,
                            class: DisputeMsgClass.class
                        }, function(response) {
                            if (parseInt(response.error.code) === 0) {
                                $scope.messages = response.data;
                                angular.forEach($scope.messages, function(value) {
                                    if (angular.isDefined(value.user.attachment) && value.user.attachment !== null) {
                                        value.user.user_avatar_url = 'images/big_thumb/UserAvatar/' + value.user.id + '.' + md5.createHash('UserAvatar' + value.user.id + 'png' + 'big_thumb') + '.png';
                                    } else {
                                        value.user.user_avatar_url = 'images/default.png';
                                    }
                                });
                            } else {
                                $scope.messages = [];
                            }
                        });
                    };
                    $scope.GetMessages();
                }, 2000);
                $scope.data = {};
                $scope.post_messages = false;
                $scope.PostMessages = function(messageFrm, $valid) {
                    if ($valid) {
                        $scope.post_messages = true;
                        var projectName = $state.params.slug;
                        var msgparams = {
                            foreign_id: $scope.disputeid,
                            class: DisputeMsgClass.class
                        };
                        msgparams.parent_id = 0;
                        msgparams.subject = $filter('capitalize')(projectName.replace(/-/g, '+'));
                        msgparams.message = $scope.data.message;
                        msgparams.image = $scope.file;
                        console.log(msgparams);
                        Messages.post(msgparams, function(response) {
                            var flashMessage = "";
                            console.log(response);
                            if (parseInt(response.error.code) === 0) {
                                $scope.post_messages = false;
                                flashMessage = $filter("translate")("Message sent successfully.");
                                flash.set(flashMessage, 'success', false);
                                $scope.data.message = '';
                                $scope.GetMessages();
                                messageFrm.$setPristine();
                                messageFrm.$setUntouched();
                            } else {
                                flashMessage = $filter("translate")(response.error.message);
                                flash.set(flashMessage, 'error', false);
                                $scope.post_messages = false;
                            }
                        });
                    }
                };
            }
        }
    });