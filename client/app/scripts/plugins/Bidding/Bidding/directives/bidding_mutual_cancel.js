'use strict';
angular.module('getlancerApp.Bidding')
    .directive('biddingMutualCancel', function() {
        return {
            restrict: 'EA',
            templateUrl: 'scripts/plugins/Bidding/Bidding/views/default/bidding_project_mutual_cancel.html',
            scope: {
                bidid: '@',
                isfreelancercancel:'@',
                isemployercancel:'@',
                project: '@',
                biduser: '@',
                projectuser: '@',
                isprojectcancel: '@',
                projectstatus: '@'
            },
            controller: function($scope, $rootScope, $cookies, $state, $filter, flash, ProjectStatusConstant, UpdateProjectStatus, md5) {
                $scope.show_request = $rootScope.show_request;
                $scope.ProjectStatusConstant = ProjectStatusConstant;
              if (angular.isDefined($rootScope.broadCastDataempolyer)) {
                if($scope.isemployercancel === 'true')
                {
                    $rootScope.broadCastDataempolyer;
                    $scope.mutualcancelnote = $rootScope.broadCastDataempolyer.notes;
                    $scope.userinfo = $rootScope.broadCastDataempolyer.userinfo;
                    $scope.is_show_accept = $rootScope.broadCastDataempolyer.is_show_accept;
                    $scope.userid =  $rootScope.broadCastDataempolyer.userId;
                    $scope.created_at = $rootScope.broadCastDatafreelancer.createdAt;
                    if (angular.isDefined($rootScope.broadCastDataempolyer.userImage) && $rootScope.broadCastDataempolyer.userImage !== null) {
                        var c = new Date();
                        var hash = md5.createHash($rootScope.broadCastDataempolyer.userImage.class + $rootScope.broadCastDataempolyer.userImage.foreign_id + 'png' + 'big_thumb');

                        $scope.user_image = 'images/big_thumb/' + $rootScope.broadCastDataempolyer.userImage.class + '/' + $rootScope.broadCastDataempolyer.userImage.foreign_id + '.' + hash + '.png?' + c.getTime();
                    } else {

                        $scope.user_image = 'images/default.png';
                    }
                }else{
                    $rootScope.broadCastDatafreelancer;
                    $scope.mutualcancelnote = $rootScope.broadCastDatafreelancer.notes;
                    $scope.userinfo = $rootScope.broadCastDatafreelancer.userinfo;
                    $scope.is_show_accept = $rootScope.broadCastDatafreelancer.is_show_accept;
                    $scope.userid =  $rootScope.broadCastDataempolyer.userId;
                    $scope.created_at =  $rootScope.broadCastDataempolyer.createdAt
                     if (angular.isDefined($rootScope.broadCastDatafreelancer.userImage) && $rootScope.broadCastDatafreelancer.userImage !== null) {
                        var c = new Date();
                        var hash = md5.createHash($rootScope.broadCastDatafreelancer.userImage.class + $rootScope.broadCastDatafreelancer.userImage.foreign_id + 'png' + 'big_thumb');

                        $scope.user_image = 'images/big_thumb/' + $rootScope.broadCastDatafreelancer.userImage.class + '/' + $rootScope.broadCastDatafreelancer.userImage.foreign_id + '.' + hash + '.png?' + c.getTime();

                    } else {
                        
                        $scope.user_image = 'images/default.png';
                    }
                }
              }
                /* For close the form */
                $scope.closefrm = function() {
                    $state.go('Bid_ProjectView', {
                        id: $state.params.id,
                        slug: $state.params.slug,
                        action: 'messages'
                    }, {
                        reload: true
                    });
                };
                $scope.mutual_Cancel = false;
                $scope.mutualCancel = function($valid, data) {
                    if ($valid) {
                        $scope.mutual_Cancel = true;
                        var params = {
                            id: $scope.project,
                            project_status_id: ProjectStatusConstant.MutuallyCanceled,
                            mutual_cancel_note: data.mutual_cancel_note,
                        }
                        swal({ //jshint ignore:line
                        title: $filter("translate")('Are you sure you want to request to cancel this project?'),
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
                                var flashMessage = "";
                                UpdateProjectStatus.put(params, function(response) {
                                   $scope.mutual_canceled_note = response.data.mutual_cancel_note;
                                    if (parseInt(response.error.code) === 0) {
                                        flashMessage = $filter("translate")("Your cancel request has been rejected successfully.");
                                        flash.set(flashMessage, 'success', false);
                                        $state.reload();
                                    } else {
                                        flashMessage = $filter("translate")("Your cancel request sending failed.");
                                        $scope.mutual_Cancel = false;
                                        flash.set(flashMessage, 'error', false);
                                    }
                                }, function(error) {
                                    console.log(error);
                                });
                            } else {
                                $scope.mutual_Cancel = false;
                            }
                        });
                    }
                };
                 /* For the purpose get the broadcast value mutualcancel note from projectview ctrl */
             /*   $scope.$on('mutualcancel', function(event, data) {
                    $scope.mutualcancelnote = data.notes;
                    $scope.userinfo = data.userinfo;
                    $scope.is_show_accept = data.is_show_accept;
                });*/

                $scope.cancelreponse = function(statusType) {
                     // $rootScope.cancelresp = ctype;
                     var alerttitle = "";
                      if (statusType === 4) {
                            /*Accept Cancel Request*/
                            alerttitle = "Are you sure you accept the cancel request of this project?";
                        }  else if (statusType === 5) {
                            /*Reject Cancel Request*/
                            alerttitle = "Are you sure you reject the cancel request of this project?";
                        }
                          swal({ //jshint ignore:line
                            title: $filter("translate")(alerttitle),
                            text: "",
                            type: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "OK",
                            cancelButtonText: "Cancel",
                            closeOnConfirm: true,
                            animation: false,
                       }).then(function (isConfirm) {
                            if (isConfirm) {
                                if (statusType === 4) {
                                    var acceptparams = {
                                        id: $scope.project,
                                        project_status_id: ProjectStatusConstant.MutuallyCanceled,
                                        is_accept_mutual_cancel: 1,
                                        mutual_cancel_note: $scope.mutual_canceled_note,
                                    }
                                    updateprojectstatus(acceptparams)
                                } else if (statusType === 5) {
                                     var acceptparams = {
                                        id: $scope.project,
                                        project_status_id: ProjectStatusConstant.MutuallyCanceled,
                                        is_accept_mutual_cancel: 0,
                                         mutual_cancel_note: $scope.mutual_canceled_note,
                                    }
                                     updateprojectstatus(acceptparams)
                                 }
                            }
                        });
                    }
                 function updateprojectstatus(acceptparams) {
                    var flashMessage = "";
                    UpdateProjectStatus.put(acceptparams, function (response) {
                         if (parseInt(response.error.code) === 0) {
                              flashMessage = $filter("translate")("Your cancel request has been accepted successfully.");
                               flash.set(flashMessage, 'success', false);
                              {
                              $state.go('Bid_ProjectView', {
                                id: $state.params.id,
                                slug: $state.params.slug,
                                action:'messages'
                                }, {
                                   reload: true
                            });
                            }
                         } else {
                             flashMessage = $filter("translate")("Please Try again");
                               flash.set(flashMessage, 'success', false);
                         }

                    })
                };
            }
        }
    })