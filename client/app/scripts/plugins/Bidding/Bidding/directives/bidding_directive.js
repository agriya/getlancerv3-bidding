'use strict';
/**
 * getlancerBidding - Angular Framework
 * Angula Version 1.5.8
 * @category   Js
 * @package    REST
 * @Framework  Angular
 * @authors    Mugundhan Asokan 
 * @email      a.mugundhan@agriya.in 
 * @copyright  2017 Agriya
 * @license    http://www.agriya.com/ Agriya Licence
 * @link       http://www.agriya.com
 * @since      2017-01-20
 */
angular.module('getlancerApp.Bidding')
    /**
     * @ngdoc directive
     * @name getlancerBidding.downloadFile
     * @param {object} value
     * @description
     * For download the files process (Resumes, Image). 
     * @author mugundhan_352at15 
     */
    .directive('fileDownload', function (md5, $location, $timeout) {
        var directive = {
            restrict: 'EA',
            //replace: true,
            template: '<a href="{{downloadUrl}}" class="cursor" target="_blank"> <span ng-bind-html="downloadlable"></span> </a>',
            scope: {
                attachment: '@',
                downloadlable: '@'
            },
            link: function (scope, element, attrs) {
                scope.attachment = JSON.parse(scope.attachment);                           
                var download_file = md5.createHash(scope.attachment.class + scope.attachment.foreign_id + 'docdownload') + '.doc';
                scope.downloadUrl = $location.protocol() + '://' + $location.host() + '/download/' + scope.attachment.class + '/' + scope.attachment.foreign_id + '/' + download_file;
                /* For check the download label is undeifed or not to fill the default text */
                if (scope.downloadlable === undefined) {
                    scope.downloadlable = '<i class="fa fa- download"> </i>';
                }
            },
        };
        return directive;
    })
    .directive('numberOnly', function () {
        return {
            restrict: 'EA',
            link: function (scope, elem, attr, ctrl) {
                elem.bind('keyup', function (e) {
                    var text = this.value;
                    this.value = text.replace(/[a-zA-Z]/g, '');
                });
            }
        };
    })
    /**
     * @ngdoc directive
     * @name getlancerBidding.biddingList
     * @param {object} value
     * @description
     * For listing all the bidding 
     * @author mugundhan_352at15 
     */
    .directive('biddingList', function () {
        return {
            restrict: 'EA',
            //replace: true,
            templateUrl: 'scripts/plugins/Bidding/Bidding/views/default/bidding_list.html',
            scope: {
                project: '@',
                projectuser: '@',
                projectstatus: '@',
                hiddienbid: '@',
                isbid: '@',
                projectbidid: '@',
                isprojectcancel: '@',
                isdispute: '@'
            },
            controller: function ($rootScope, $scope, $filter, $state, $timeout, ProjectBids, ProjectStatusConstant, BidStatusConstant, AwardedBids, md5, $cookies, ProjectEditView, anchorSmoothScroll, ConstUserRole, $anchorScroll, $uibModal, flash) {
                $scope.ConstUserRole = ConstUserRole;
                $scope.ProjectStatusConstant = ProjectStatusConstant;
                $scope.auth = JSON.parse($cookies.get('auth'));
                if (parseInt($scope.auth.id) !== parseInt($scope.projectuser)) {
                    $scope.is_freelancer = true;
                } else {
                    $scope.is_freelancer = false;
                }
                 if($state.params.action === 'withdraw')
                    {
                     $rootScope.withdrawthisfreelancer = true;
                }else{
                    $rootScope.withdrawthisfreelancer = false;
                }
                $scope.focusPortfolio = function (profile_user_id, profile_user_name) {
                    $state.go('user_profiles', {
                        'id': profile_user_id,
                        'slug': profile_user_name,
                        'portfolio': 'portfolios'
                    });
                };
                  /* For Contact Winner */
                $scope.contactFreelancer = function (projectbidid, messagecount) {
                    $rootScope.message_bid_id = projectbidid;
                    $scope.modalInstance = $uibModal.open({
                        templateUrl: 'scripts/plugins/Bidding/Bidding/views/default/contact_freelancer.html',
                        animation: false,
                        controller: function ($scope, $rootScope, $window, $stateParams, $filter, md5, $state, Upload, $timeout, $uibModal, $uibModalStack, Messages, biduser, authuser, ProjectBids) {
                            var flashMessage = "";
                            $scope.MessagePage = 1;
                            $rootScope.closemodel = function () {
                                $uibModalStack.dismissAll();
                            };
                        
                            $scope.contact_freelancer = false;
                            $scope.data = {};
                            $scope.ContactMessages = [];
                            var params = {
                                    id: $stateParams.id,
                                    is_freelancer_withdrawn: false
                                };
                                $rootScope.messagecount = messagecount;
                              
                            $scope.submit = function ($valid) {
                                if ($valid) {
                                    $scope.contact_freelancer = true;
                                    var contactData = {};
                                    contactData.foreign_id = projectbidid;
                                    contactData.to_user_id = biduser;
                                    contactData.message = $scope.data.message;
                                    contactData.class = 'Bid';
                                    contactData.subject = $state.params.slug;
                                    Messages.post(contactData, function (response) {
                                        /* $scope.closemodel();*/
                                         $scope.contact_freelancer = false;
                                        if (response.error.code === 0) {
                                            flashMessage = $filter("translate")("Message sent successfully.");
                                            flash.set(flashMessage, 'success', false);
                                            $scope.data.message = '';
                                            $scope.Contactfrm.$setPristine();
                                            $scope.Contactfrm.$setUntouched();
                                            $scope.ContactMessages = [];
                                            
                                            if($rootScope.messagecount === '0')
                                            {
                                                $state.reload();
                                            }
                                            $scope.MessagePage = 1;
                                            $scope.GetConactMessage();
                                            $scope.contact_freelancer = false;
                                            
                                        } else {
                                            flashMessage = $filter("translate")(response.error.message);
                                            flash.set(flashMessage, 'error', false);
                                        }
                                    });
                                };
                            };
                            $scope.GetConactMessage = function () {
                                var conactparams = {};
                                conactparams.foreign_id = $rootScope.message_bid_id;
                                conactparams.limit = 5;
                                conactparams.sortby = 'desc'
                                conactparams.class = 'Bid';
                                conactparams.page = $scope.MessagePage;
                                Messages.get(conactparams, function (response) {
                                    if (angular.isDefined(response.data)) {
                                        if (angular.isDefined(response._metadata)) {
                                            $scope.messageNoOfPages = response._metadata.last_page;
                                            $scope.ConactmessageTotal = response._metadata.total - (response._metadata.current_page * response._metadata.per_page);
                                        }
                                        if (parseInt(response.error.code) === 0) {
                                            angular.forEach(response.data, function (value) {
                                                if (angular.isDefined(value.user.attachment) && value.user.attachment !== null) {
                                                    value.user.user_avatar_url = 'images/big_thumb/UserAvatar/' + value.user.id + '.' + md5.createHash('UserAvatar' + value.user.id + 'png' + 'big_thumb') + '.png';
                                                } else {
                                                    value.user.user_avatar_url = 'images/default.png';
                                                }
                                                $scope.ContactMessages.push(value);
                                            });
                                        } else {
                                            $scope.ContactMessages = [];
                                        }
                                    }
                                });
                            };
                            $scope.contactmessage_pagination = function () {
                                $scope.MessagePage = parseInt($scope.MessagePage) + 1;
                                $scope.GetConactMessage();
                            };
                            $scope.GetConactMessage();
                        },
                        size: 'lg',
                        resolve: {
                            biduser: function () {
                                return $scope.biduser;
                            },
                            authuser: function () {
                                return $scope.auth.id;
                            }
                        }
                    });
                };
                $scope.showLoader = true;
                $scope.awardLoader = true;
                $scope.is_awarded = false;
                $scope.biddings = [];
                $scope.mutual_cancel = false;
                $scope.project_dispute = false;
                $scope.project_review = false;
                if ($state.params.action === 'mutual_cancel') {
                    $scope.mutual_cancel = true;
                    $timeout(function () {
                        $anchorScroll('mutual-cancel');
                    }, 2500);
                } else if ($state.params.action === 'dispute') {
                    $scope.project_dispute = true;
                    $timeout(function () {
                        $anchorScroll('dispute-block');
                    }, 2500);
                } else if ($state.params.action === 'review-form') {
                    $scope.project_review = true;
                    $timeout(function () {
                        $anchorScroll('update');
                    }, 2500);
                }
                $timeout(function () {
                    if (parseInt($scope.projectstatus) >= parseInt(ProjectStatusConstant.WinnerSelected)) {
                        $scope.is_awarded = true;
                        $rootScope.getData = function () {
                            if ($scope.is_show_lost || ProjectStatusConstant.Closed) {
                               var params = {
                                        id: $scope.project,
                                    };
                                if (parseInt($scope.auth.id) !== parseInt($scope.projectuser)) {
                                    if ($scope.hiddienbid === 'false') {
                                        $scope.otherBids();
                                         $scope.userbids(params);
                                        $scope.hiddienbidShow = true;
                                    } else {
                                        $scope.biddings = [];
                                        $scope.hiddienbidShow = false;
                                    }
                                } else {
                                    $scope.hiddienbidShow = true;
                                    $scope.otherBids();
                                     $scope.userbids(params);
                                }
                            }
                        };
                        $rootScope.getData();
                        AwardedBids.get({
                            id: $scope.project,
                            status: BidStatusConstant.Won,
                            project_bid_id: $scope.projectbidid
                        }, function (response) {
                            if (parseInt(response.error.code) === 0) {
                                $scope.awarded = response.data;
                                angular.forEach($scope.awarded, function (value) {
                                    if (angular.isDefined(value.user.attachment) && value.user.attachment !== null) {
                                        value.user.user_avatar_url = 'images/big_thumb/UserAvatar/' + value.user.id + '.' + md5.createHash('UserAvatar' + value.user.id + 'png' + 'big_thumb') + '.png';
                                    } else {
                                        value.user.user_avatar_url = 'images/default.png';
                                    }
                                    $scope.project_failed_count = Number(value.user.project_failed_count || 0);
                                    $scope.project_completed_count = Number(value.user.project_completed_count || 0);
                                    $scope.total_count = $scope.project_failed_count + $scope.project_completed_count;
                                    $scope.mul = $scope.project_completed_count / $scope.total_count;
                                    value.completetion_rate = $scope.mul * 100;
                                });
                                if (parseInt($scope.auth.id) === parseInt($scope.awarded[0]['user_id'])) {
                                    $rootScope.bid_awarded = false;
                                } else {
                                    $rootScope.bid_awarded = true;
                                }
                                /* here for show the follow button */
                                if (!$rootScope.bid_awarded && $scope.is_freelancer) {
                                    $scope.$emit('is_show_follow', 'showfollow');
                                }
                            } else {
                                $scope.awarded = [];
                            }
                            $scope.awardLoader = false;
                        }, function (error) {
                            console.log('Bidding List Directive', error);
                        });
                    } else {
                        var params = {};
                        if ($scope.hiddienbid !== 'false') {
                            if (parseInt($scope.auth.id) === parseInt($scope.projectuser)) {
                                params = {
                                    id: $scope.project,
                                    is_freelancer_withdrawn: false
                                };
                                $scope.userbids(params);
                                $scope.hiddienbidShow = true;
                            } else {
                                if ($scope.isbid) {
                                    params = {
                                        id: $scope.project,
                                        user_id: $scope.auth.id,
                                        is_freelancer_withdrawn: false
                                    };
                                    $scope.userbids(params);
                                } else {
                                    $scope.biddings = [];
                                    params = {
                                        id: $scope.project,
                                        user_id: $scope.auth.id,
                                        is_freelancer_withdrawn: false
                                    };
                                    $scope.userbids(params);
                                }
                                $scope.hiddienbidShow = true;
                            }
                        } else {
                            $scope.hiddienbidShow = true;
                            params = {
                                id: $scope.project,
                                is_freelancer_withdrawn: false
                            };
                            $scope.userbids(params);
                        }
                    }
                }, 2000);
                $scope.$on('showlostbids', function (event, data) {
                    $scope.is_show_lost = data.is_show_lost;
                   // $rootScope.getData();
                });
              
                $scope.userbids = function (params) {
                   
                    params.project_id = $state.params.id;
                    ProjectBids.get(params, function (response) {
                        if (parseInt(response.error.code) === 0) {
                            $scope.biddings = response.data; 
                            angular.forEach($scope.biddings, function (value) {
                                if(value.exams_users !== undefined){
                                if (value.exams_users.length != 0) {
                                    $scope.exam_users = value.exams_users;
                                    angular.forEach($scope.exam_users, function (exams) {
                                        $scope.total_mark = Number(exams.total_mark || 0);
                                        $scope.total_question_count = Number(exams.total_question_count || 0);
                                        $scope.average = $scope.total_mark / $scope.total_question_count;
                                        exams.exam_user_per = parseInt($scope.average * 100);
                                        if (angular.isDefined(exams.exam.attachment) && exams.exam.attachment !== null) {
                                            var hash = md5.createHash('Exam' + exams.exam.attachment.foreign_id + 'png' + 'small_thumb');
                                            exams.exam_image = 'images/small_thumb/Exam/' + exams.exam.attachment.foreign_id + '.' + md5.createHash('Exam' + exams.exam.attachment.foreign_id + 'png' + 'small_thumb') + '.png';
                                        } else {
                                            exams.exam_image = 'images/no-image.png';
                                        }
                                    });
                                }
                                if (angular.isDefined(value.user.attachment) && value.user.attachment !== null) {
                                    value.user.user_avatar_url = 'images/big_thumb/UserAvatar/' + value.user.id + '.' + md5.createHash('UserAvatar' + value.user.id + 'png' + 'big_thumb') + '.png';
                                } else {
                                    value.user.user_avatar_url = 'images/default.png';
                                }
                                $scope.project_failed_count = Number(value.user.project_failed_count || 0);
                                $scope.project_completed_count = Number(value.user.project_completed_count || 0);
                                $scope.total_count = $scope.project_failed_count + $scope.project_completed_count;
                                $scope.mul = $scope.project_completed_count / $scope.total_count;
                                value.completetion_rate = $scope.mul * 100;
                                }
                            });
                            if ($rootScope.scrollBids === true) {
                                $timeout(function () {
                                    $anchorScroll('bidsAll');
                                }, 100);
                            }
                        } else {
                            $scope.biddings = [];
                        }
                        $scope.showLoader = false;
                    }, function (error) {
                        console.log('Bidding List Directive', error);
                    });
                }
                $scope.otherBids = function () {
                    AwardedBids.get({
                        id: $scope.project,
                        status: BidStatusConstant.Lost,
                        project_bid_id: $scope.projectbidid
                    }, function (response) {
                        if (parseInt(response.error.code) === 0) {
                            $scope.biddings = response.data;
                            angular.forEach($scope.biddings, function (value) {
                                if (angular.isDefined(value.user.attachment) && value.user.attachment !== null) {
                                    value.user.user_avatar_url = 'images/big_thumb/UserAvatar/' + value.user.id + '.' + md5.createHash('UserAvatar' + value.user.id + 'png' + 'big_thumb') + '.png';
                                } else {
                                    value.user.user_avatar_url = 'images/default.png';
                                }
                            });
                        } else {
                            $scope.biddings = [];
                        }
                        $scope.showLoader = false;
                    }, function (error) {
                        console.log('Bidding List Directive', error);
                    });
                };
                /* For the purpose of after the xxx days freelancer not reponse if the employer choose the new freelancer show the action button */
                $scope.$on('choosenewfreelancer', function (event, data) {
                    $scope.choosenewfreelancer = true;
                });
                /* For the purpose of show skill div */
                $scope.showhideSkills = function (id, is_show) {
                    var skillId = 'skills-' + id;
                    if (parseInt(is_show) === 1) {
                        $('#' + skillId)
                            .attr('style', 'display:block');
                    } else {
                        $('.user-certificate-skills')
                            .attr('style', 'display:none');
                    }
                };
                var getParams = {
                    id: $state.params.id,
                    fields: 'id,project_status_id,is_dispute,is_cancel_request_freelancer,is_cancel_request_employer,user_id'
                };
                ProjectEditView.get(getParams, function (response) {
                    if (response.data.bid_winner != null) {
                        $scope.AwardedUserId = response.data.bid_winner.user_id;
                        $rootScope.other_user_reviews =  response.data.other_user_reviews
                    }
                    $rootScope.project_is_dispute = response.data.is_dispute;
                    $scope.projectbidcount = response.data.project_bid.bid_count;
                    if($scope.projectbidcount > '1')
                    {
                        $rootScope.newFreelancerSelect = true;
                    }
                    if (response.data.project_status_id == ProjectStatusConstant.FinalReviewPending && ProjectStatusConstant.Closed) {
                        $rootScope.reviewShow = true;
                    } else {
                        $rootScope.reviewShow = false;
                    }
                    $scope.reviewsLists = response.data.reviews;
                    $rootScope.userReview = true;
                    var sucesscount = 0;
                    angular.forEach($scope.reviewsLists, function (reviewList) {
                        if (angular.isDefined(reviewList.user.attachment) && reviewList.user.attachment !== null) {
                            reviewList.user.user_avatar_url = 'images/big_thumb/UserAvatar/' + reviewList.user.id + '.' + md5.createHash('UserAvatar' + reviewList.user.id + 'png' + 'big_thumb') + '.png';
                        } else {
                            reviewList.user.user_avatar_url = 'images/default.png';
                        }
                        if (sucesscount < 1) {
                            if (reviewList.user_id == $rootScope.user.id) {
                                $rootScope.userReview = false;
                                sucesscount++;
                            } else {
                                $rootScope.userReview = true;
                            }
                        }
                    });
                });
                if($state.params.action === 'withdraw')
                {   
                 $timeout(function () {
                        $anchorScroll('withdaw_scroll');
                    }, 1000);
                }
            }
        }
    })
    .directive('biddingPost', function () {
        return {
            restrict: 'EA',
            //replace: true,
            templateUrl: 'scripts/plugins/Bidding/Bidding/views/default/bidding_add.html',
            scope: {
                project: '@',
            },
            controller: function ($rootScope, $scope, $state, $filter, $timeout, $location, flash, BidPost, BidUpdate, EditBid, $cookies, UserFactory) {
                $scope.buttonText = "Place Bid";
                $scope.showInfo = true;
                var absUrl = $location.absUrl()
                    .split('?');
                if ($state.params.placebid) {
                    $rootScope.is_bid_enable = true;
                    $scope.is_bid_enable = true;
                } else {
                    $rootScope.is_bid_enable = false;
                    $scope.is_bid_enable = false;
                }
                $rootScope.bidProject = function () {
                    $rootScope.is_bid_enable = true;
                    $scope.is_bid_enable = true;
                    var params = $state.params;
                    params.placebid = true;
                    $state.go('Bid_ProjectView', params);
                };
                $scope.cancleBid = function () {
                    $rootScope.is_bid_enable = false;
                    $scope.is_bid_enable = false;
                    window.location.href = absUrl[0];
                };
                UserFactory.get({}, function (response) {
                    $scope.available_credit_count = parseInt(response.data.available_credit_count);
                });
                $timeout(function () {
                    if ($state.params.edit !== undefined) {
                        $scope.buttonText = "Update Bid";
                        $scope.showInfo = false;
                        $scope.auth = JSON.parse($cookies.get('auth'));
                        /* Get the Project Bid Value */
                        $scope.data = {};
                        EditBid.get({
                            id: $scope.project,
                            user: $scope.auth.id
                        }, function (response) {
                            $scope.showLoader = false;
                            if (parseInt(response.error.code) === 0) {
                                $scope.editBidId = parseInt(response.data[0].id);
                                $scope.data = {
                                    amount: parseInt(response.data[0].amount),
                                    duration: parseInt(response.data[0].duration),
                                    description: response.data[0].description
                                }
                            }
                        }, function (error) {
                            console.log('Bidding List Directive', error);
                        });
                    } else {
                        $scope.buttonText = "Place Bid";
                    }
                }, 1000);
                $scope.data = {};
                $scope.save_btn = false;
                $scope.postBid = function ($valid, data) {
                    if ($valid) {
                        $scope.save_btn = true;
                        data.project_id = $scope.project;
                        if ($state.params.edit === undefined) {
                            BidPost.post(data, function (response) {
                                 $scope.save_btn = false;
                                var flashMessage = "";
                                if (parseInt(response.error.code) === 0) {
                                    flashMessage = $filter("translate")("Bid posted successfully.");
                                    flash.set(flashMessage, 'success', false);
                                    $state.reload();
                                } else {
                                    flashMessage = $filter("translate")(response.error.message);
                                    flash.set(flashMessage, 'error', false);
                                    $scope.save_btn = false;
                                }
                            }, function (error) {
                                console.log('Bidding Directive', error);
                            });
                        } else {
                            BidUpdate.put({
                                id: $scope.editBidId
                            }, data, function (response) {
                                var flashMessage = "";
                                if (parseInt(response.error.code) === 0) {
                                    flashMessage = $filter("translate")("Bid updated successfully.");
                                    flash.set(flashMessage, 'success', false);
                                    window.location.href = absUrl[0];
                                } else {
                                    flashMessage = $filter("translate")(response.error.message);
                                    flash.set(flashMessage, 'error', false);
                                }
                            });
                        }
                    }
                };
            }
        }
    })
    .directive('biddingActions', function () {
        return {
            restrict: 'EA',
            //replace: true,
            templateUrl: 'scripts/plugins/Bidding/Bidding/views/default/bidding_actions.html',
            scope: {
                bidid: '@',
                project: '@',
                biduser: '@',
                projectuser: '@',
                projectstatus: '@',
                reopenbid: '@'
            },
            controller: function ($rootScope, $scope, $state, $filter, $location, flash, $timeout, $cookies, BidRetake, UpdateBidStatus, BidStatusConstant, ProjectStatusConstant, $uibModal) {
                $scope.project_closed = ProjectStatusConstant.Closed;
                $scope.auth = JSON.parse($cookies.get('auth'));
                if ($state.params.placebid) {
                    $scope.is_bid_enable = true;
                } else {
                    $scope.is_bid_enable = false;
                }
                /* For disable the action Select Winner */
                if (parseInt($scope.projectstatus) > parseInt(ProjectStatusConstant.WinnerSelected)) {
                    $scope.is_disable_select_winner = true;
                    $rootScope.bid_awarded = true;
                    $rootScope.contact_winner = true;
                }
                else if (parseInt($scope.projectstatus) === parseInt(ProjectStatusConstant.WinnerSelected)) {
                    $scope.is_disable_select_winner = false;
                    $rootScope.bid_awarded = false;
                    $rootScope.contact_winner = false;
                } else {
                    $scope.is_disable_select_winner = false;
                    $rootScope.bid_awarded = false;
                    $rootScope.contact_winner = true;
                }
                if (parseInt($scope.auth.id) !== parseInt($scope.projectuser)) {
                    $scope.is_freelancer = true;
                } else {
                    $scope.is_freelancer = false;
                }
                $scope.editBid = function () {
                    $scope.is_bid_enable = true;
                    var params = $state.params;
                    params.placebid = true;
                    params.edit = true;
                    $state.go('Bid_ProjectView', params);
                };
                $scope.data = {};
                /* For Retake Bid */
                $scope.retakeBid = function () {
                    swal({ //jshint ignore:line
                        title: $filter("translate")("Are you sure you want to withdraw this bid?"),
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
                            var flashMessage = "";
                            var params = {};
                            params.is_freelancer_withdrawn = 1;
                            BidRetake.put({ id: $scope.bidid }, params, function (response) {
                                if (response.error.code === 0) {
                                    flashMessage = $filter("translate")("Your bid withdrawn successfully.");
                                    flash.set(flashMessage, 'success', false);
                                    var params = $state.params;
                                    params.placebid = true;
                                    $state.go('Bid_ProjectView', params);
                                } else {
                                    flashMessage = $filter("translate")("Please try again.");
                                    flash.set(flashMessage, 'error', false);
                                }
                            });
                        }
                    });
                }
                /* For Select Winner */
                $scope.selectWinner = function () {
                    swal({ //jshint ignore:line
                        title: $filter("translate")("Are you sure you want to select this freelancer as a winner?"),
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
                            var flashMessage = "";
                            if ($scope.reopenbid !== undefined) {
                                var updateParams = {
                                    id: $scope.bidid,
                                    bid_status_id: BidStatusConstant.Won,
                                    new_winer_bid_id: $scope.bidid
                                };
                            } else {
                                var updateParams = {
                                    id: $scope.bidid,
                                    bid_status_id: BidStatusConstant.Won,
                                };
                            }
                            UpdateBidStatus.put(updateParams, function (response) {
                                if (parseInt(response.error.code) === 0) {
                                    flashMessage = $filter("translate")("Winner selected successfully");
                                    flash.set(flashMessage, 'success', false);
                                    $state.go('Bid_ProjectView', {
                                            id: $state.params.id,
                                            slug: $state.params.slug,
                                            action: ''
                                    }, {
                                        reload: true
                                    });
                                  
                                } else {
                                    flashMessage = $filter("translate")(response.error.message);
                                    flash.set(flashMessage, 'error', false);
                                }
                            }, function (error) {
                                console.log(error);
                            });
                        }
                    });
                }
            }
        }
    })
    .directive('biddingAwarded', function () {
        return {
            restrict: 'EA',
            templateUrl: 'scripts/plugins/Bidding/Bidding/views/default/bidding_awarded.html',
            replace: 'true',
            scope: {
                bidid: '@',
                project: '@',
                projectuser: '@',
                projectstatus: '@',
                windate: '@',
            },
            controller: function ($scope, $rootScope, $state, $timeout, $cookies, $filter, flash, UpdateProjectStatus, ProjectStatusConstant, UpdateBidStatus, ProjectEditView) {
                $scope.auth = JSON.parse($cookies.get('auth'));
                $scope.choosenewfreelancer = false;
                if (parseInt($scope.projectstatus) === ProjectStatusConstant.WinnerSelected) {
                    if (moment($scope.windate)
                        .add($rootScope.settings.PROJECT_WITHDRAW_FREELANCER_DAYS, 'days')
                        .unix() <= moment()
                            .unix()) {
                        $scope.is_hide_action = false;
                    } else {
                        $scope.is_hide_action = true;
                    }
                }
                if (parseInt($scope.projectuser) === parseInt($scope.auth.id)) {
                    $scope.is_freelancer = false;
                } else {
                    $scope.is_freelancer = true;
                }
                $scope.awardedprocess = function (ftype) {
                    var alertTitle = "";
                    if (parseInt(ftype) === 1) {
                        alertTitle = $filter("translate")("Are you sure you want to accept this project?");
                    } else if (parseInt(ftype) === 2) {
                        alertTitle = $filter("translate")("Are you sure you want to reject this project?");
                    }
                    swal({ //jshint ignore:line
                        title: alertTitle,
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
                            var flashMessage = "";
                            var msgstr = "";
                            if (parseInt(ftype) === 1) {
                                UpdateProjectStatus.put({
                                    id: $scope.project,
                                    project_status_id: ProjectStatusConstant.UnderDevelopment
                                }, function (response) {
                                    if (parseInt(response.error.code) === 0) {
                                        flashMessage = $filter("translate")('Project successfully accepted and moved under developement status.');
                                        flash.set(flashMessage, 'success', false);
                                        $state.reload();
                                    } else {
                                        flashMessage = $filter("translate")("Check your wallet");
                                        flash.set(flashMessage, 'error', false);
                                    }
                                }, function (error) {
                                    console.log(error);
                                });
                            } else {
                                var params = {};
                                params.id = $scope.bidid;
                                UpdateBidStatus.put(params, { is_offered_rejected: 1 }, function (response) {
                                    if (parseInt(response.error.code) === 0) {
                                        flashMessage = $filter("translate")("You are successfully ignore this project request.");
                                        flash.set(flashMessage, 'success', false);
                                        $state.reload();
                                    } else {
                                        flashMessage = $filter("translate")("Project couldn't rejected. Please try again.");
                                        flash.set(flashMessage, 'error', false);
                                    }
                                }, function (error) {
                                    console.log('BiddingAwardDirective', error);
                                })
                            }
                        }
                    });
                };
                ProjectEditView.get({
                    id: $state.params.id
                }, function (response) {
                    $scope.biddinglist = response.data;
                    $scope.bidEndDate = $scope.biddinglist.bid_winner.is_reached_response_end_date_for_freelancer;
                });
                $scope.reopen = function (rtype) {
                    swal({ //jshint ignore:line
                        title: (parseInt(rtype) === 1) ? $filter("translate")('Are you sure you want to choose a new freelancer?') : $filter("translate")('Are you sure you want to reopen this project?'),
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
                            if (parseInt(rtype) === 1) {
                                    $state.go('Bid_ProjectView', {
                                            id: $state.params.id,
                                            slug: $state.params.slug,
                                            action: 'withdraw'
                                    }, {
                                                    reload: true
                                    });
                                $scope.choosenewfreelancer = true;
                                $scope.$emit('choosenewfreelancer', 'true');
                            } else {
                                UpdateProjectStatus.put({
                                    id: $scope.project,
                                    project_status_id: ProjectStatusConstant.OpenForBidding,
                                    withdraw_bid_id: $scope.bidid
                                }, function (response) {
                                    if (parseInt(response.error.code) === 0) {
                                        flash.set($filter("translate")('Project reopen successfully'), 'success', false);
                                        $state.reload();
                                    } else {
                                        flash.set($filter("translate")('Project reopen failed'), 'error', false);
                                    }
                                })
                            }
                        }
                    });
                };
            }
        }
    })
    .directive('biddingAwardedTabs', function () {
        return {
            restrict: 'EA',
            //replace: true,
            templateUrl: 'scripts/plugins/Bidding/Bidding/views/default/bidding_awarded_tabs.html',
            scope: {
                bidid: '@',
                project: '@',
                projectuser: '@',
                projectstatus: '@',
            },
            controller: function ($scope, $rootScope, $timeout, $state, $cookies, $filter, flash, md5, ProjectStatusConstant, Messages, Upload, Invoice, BiddingMsgClass, FileFormat, BiddingfileClass, Files, MilestoneStatusConstant, biddingProjectTransactions, TransactionUserMessage) {
                $scope.TransactionUserMessage = TransactionUserMessage;
                $scope.project_is_dispute = $rootScope.project_is_dispute;
                $scope.ProjectStatusConstant = ProjectStatusConstant;
                $scope.BiddingMsgClass = BiddingMsgClass;
                $scope.FileFormat = FileFormat;
                $scope.messages = [];
                $scope.MessagePage = 1;
                $scope.projectBid = {
                    id: $state.params.id,
                    slug: $state.params.slug,
                    action: $state.params.action
                };
                $scope.renderpage = "";
                $scope.auth = JSON.parse($cookies.get('auth'));
                if (parseInt($scope.projectuser) === parseInt($scope.auth.id)) {
                    $scope.is_freelancer = false;
                } else {
                    $scope.is_freelancer = true;
                }
                $scope.selectedTab = function (tabSelected) {
                    $scope.projectBid.action = tabSelected;
                    $scope.is_show_loader = true;
                  /*  $scope.loadmore = false;*/
                    $scope.buttonName = ($scope.is_freelancer === true) ? 'Request Milestone' : 'Create Milestone';
                    if (tabSelected === 'messages') {
                        $scope.MessagePage = 1;
                        $scope.renderpage = 'scripts/plugins/Bidding/Bidding/views/default/bidding_message.html';
                        if ($state.params.action === undefined || $state.params.action !== 'messages') {
                            $state.go('Bid_ProjectView', $scope.projectBid, {
                                notify: false
                            });
                        }
                        $scope.data = {};
                        $scope.message_Frm = false;
                        $scope.PostMessages = function (messageFrm, $valid) {
                            var msgparams = {
                                class: $scope.BiddingMsgClass.class,
                                foreign_id: $scope.bidid
                            };
                            if ($valid) {
                                $scope.message_Frm = true;
                                msgparams.parent_id = 0;
                                msgparams.subject = 'Project Bidding Message';
                                msgparams.message = $scope.data.message;
                                msgparams.image = $scope.file;
                                delete msgparams.type;
                                Messages.post(msgparams, function (response) {
                                    var flashMessage = "";
                                    if (parseInt(response.error.code) === 0) {
                                        flashMessage = $filter("translate")("Message sent successfully.");
                                        flash.set(flashMessage, 'success', false);
                                        $scope.data.message = '';
                                        $scope.messages = [];
                                        $scope.MessagePage = 1;
                                        $scope.GetMessages();
                                        messageFrm.$setPristine();
                                        messageFrm.$setUntouched();
                                    } else {
                                        flashMessage = $filter("translate")(response.error.message);
                                        flash.set(flashMessage, 'error', false);
                                        $scope.message_Frm = false;
                                    }
                                });
                            }
                        };
                        $scope.GetMessages = function () {
                            var msgparams = {
                                class: $scope.BiddingMsgClass.class,
                                foreign_id: $scope.bidid,
                                limit: 10,
                                page: $scope.MessagePage,
                                sortby: 'desc'
                            };
                            $scope.message_Frm = false;
                            Messages.get(msgparams, function (response) {
                                if (angular.isDefined(response.data)) {
                                    if (angular.isDefined(response._metadata)) {
                                        $scope.messageNoOfPages = response._metadata.last_page;
                                        $scope.messageTotal = response._metadata.total - (response._metadata.current_page * response._metadata.per_page);
                                    }
                                    if (parseInt(response.error.code) === 0) {
                                        if($scope.loadmore === false){
                                           $scope.messages = [];
                                        }
                                        angular.forEach(response.data, function (value) {
                                            if (angular.isDefined(value.user.attachment) && value.user.attachment !== null) {
                                                value.user.user_avatar_url = 'images/big_thumb/UserAvatar/' + value.user.id + '.' + md5.createHash('UserAvatar' + value.user.id + 'png' + 'big_thumb') + '.png';
                                            } else {
                                                value.user.user_avatar_url = 'images/default.png';
                                            }
                                            $scope.messages.push(value);
                                        });
                                    } else {
                                        $scope.messages = [];
                                    }
                                }
                            });
                        };
                        $scope.message_pagination = function () {
                            $scope.loadmore = true;
                            $scope.MessagePage = parseInt($scope.MessagePage) + 1;
                            $scope.GetMessages();
                        };
                        $scope.GetMessages();
                    } else if (tabSelected === 'invoices') {
                        $scope.loadmore = false;
                        $scope.renderpage = 'scripts/plugins/Bidding/Invoice/views/default/bidding_invoice.html';
                        if ($state.params.action === undefined || $state.params.action !== 'invoices') {
                            $state.go('Bid_ProjectView', $scope.projectBid, {
                                notify: false
                            });
                        }
                        $scope.invoiceparams = {
                            bid_id: $scope.bidid
                        };
                    } else if (tabSelected === 'files') {
                         $scope.loadmore = false;
                        $scope.renderpage = 'scripts/plugins/Bidding/Bidding/views/default/bidding_files.html';
                        $scope.is_show_upload_form = false;
                        $scope.showUpload = function (val) {
                            if (val === false) {
                                $scope.is_show_upload_form = true;
                            } else {
                                $scope.is_show_upload_form = false;
                            }
                        };
                        if ($state.params.action === undefined || $state.params.action !== 'files') {
                            $state.go('Bid_ProjectView', $scope.projectBid, {
                                notify: false
                            });
                        }
                        $scope.BiddingfileClass = BiddingfileClass;
                        $scope.GetFiles = function () {
                            Files.get({
                                project_id: $scope.project
                            }, function (response) {
                                if (parseInt(response.error.code) === 0) {
                                    $scope.ProjectFiles = response.data;
                                } else {
                                    $scope.ProjectFiles = [];
                                }
                            });
                        };
                        $scope.uploadFile = function (file) {
                            Upload.upload({
                                url: '/api/v1/attachments?class=Project',
                                data: {
                                    file: file,
                                }
                            })
                                .then(function (response) {
                                    if (response.data.error.code === 0) {
                                        $scope.uploadfile = response.data.attachment;
                                        $scope.error_message = '';
                                    } else {
                                        $scope.error_message = response.data.error.message;
                                    }
                                });
                        };
                        $scope.file_Frm = false;
                        $scope.PostFiles = function ($fileValid, fileFrm) {
                            if ($fileValid & !$scope.error_message) {
                                $scope.file_Frm = true;
                                var flashMessage = "";
                                $scope.projectfile = {};
                                $scope.projectfile.files = [{
                                    file: $scope.uploadfile
                                }];
                                $scope.projectfile.class = $scope.BiddingfileClass.class;
                                $scope.projectfile.project_id = $scope.project;
                                Files.post($scope.projectfile, function (response) {
                                    $scope.response = response;
                                    if (parseInt($scope.response.error.code) === 0) {
                                        $scope.file_Frm = false;
                                        $scope.showUpload = false;
                                        flashMessage = $filter("translate")("File added successfully.");
                                        flash.set(flashMessage, 'success', false);
                                        fileFrm.$setPristine();
                                        fileFrm.$setUntouched();
                                        $scope.GetFiles();
                                        $scope.is_show_upload_form = false;
                                        var myEl = angular.element(document.querySelector('#resetAttr'));
                                        var myFileName = angular.element(document.querySelector('#resetFile'));
                                        myFileName.empty();
                                        myEl.removeAttr('src');
                                        myEl.removeAttr('title');
                                        myEl.removeAttr('alt');
                                    } else {
                                        flashMessage = $filter("translate")($scope.response.error.message);
                                        flash.set(flashMessage, 'error', false);
                                        fileFrm.$setPristine();
                                        fileFrm.$setUntouched();
                                        $scope.file_Frm = false;
                                    }
                                });
                            }
                        };
                        $scope.GetFiles();
                    } else if(tabSelected === 'activities') {
                        $scope.loadmore = false;
                        $scope.renderpage = 'scripts/plugins/Bidding/Bidding/views/default/bidding_activities.html';
                        $scope.is_show_upload_form = false;
                        $scope.showUpload = function (val) {
                            if (val === false) {
                                $scope.is_show_upload_form = true;
                            } else {
                                $scope.is_show_upload_form = false;
                            }
                        };
                        if ($state.params.action === undefined || $state.params.action !== 'activities') {
                            $state.go('Bid_ProjectView', $scope.projectBid, {
                                notify: false
                            });
                        }
                    } else if(tabSelected === 'transactions') {
                        $scope.loadmore = false;
                        $scope.renderpage = 'scripts/plugins/Bidding/Bidding/views/default/bidding_transactions.html';
                        $scope.is_show_upload_form = false;
                        $scope.showUpload = function (val) {
                            if (val === false) {
                                $scope.is_show_upload_form = true;
                            } else {
                                $scope.is_show_upload_form = false;
                            }
                        };
                        if ($state.params.action === undefined || $state.params.action !== 'transactions') {
                            $state.go('Bid_ProjectView', $scope.projectBid, {
                                notify: false
                            });
                        }
                        $scope.currentPageTransaction = 1;
                        $scope.GetTransactions = function () {
                            var params = {};
                            biddingProjectTransactions.get({user_id : $rootScope.user.id, model_id : $state.params.id, model_class :'Project', page : $scope.currentPageTransaction , limit : 10},  function (response) {
                                     $scope.currentPage = params.page;
                                        if (angular.isDefined(response._metadata)) {
                                            $scope.totalItems = response._metadata.total;
                                            $scope.itemsPerPage = response._metadata.per_page;
                                            $scope.noOfPages = response._metadata.last_page;
                                            $scope.currentPageTransaction = response._metadata.current_page;
                                        }
                                        angular.forEach(response.data, function(value) {
                                            var trans = value.transaction_type;
                                            var exam = {};
                                            var project = {};
                                            var job = {};
                                            var commission = {};
                                            var subscription = {};
                                            var payment_gateway = {};
                                            if ($rootScope.isAuth === true && $rootScope.user.id === 1) {
                                                $scope.transaction_messages = $scope.TransactionAdminMessage[parseInt(trans)];
                                                value.transactionAmount = {
                                                    credit: value.amount,
                                                    debit: '--'
                                                };
                                            } else if ($rootScope.isAuth === true) {
                                              if(trans === '5' && $rootScope.Freelancer && value.site_revenue_from_freelancer !== '0')
                                                {
                                                $scope.transaction_messages = $scope.TransactionUserMessage[22];
                                                }
                                                else if(trans === '7' && $rootScope.Freelancer && value.site_revenue_from_freelancer === '0')
                                                {
                                                $scope.transaction_messages = $scope.TransactionUserMessage[parseInt(24)];
                                                }
                                                else if(trans === '6' && $rootScope.Freelancer && value.site_revenue_from_freelancer === '0')
                                                {
                                                $scope.transaction_messages = $scope.TransactionUserMessage[parseInt(25)];
                                                }
                                                else if(trans === '5' && $rootScope.Freelancer && value.site_revenue_from_freelancer === '0')
                                                {
                                                    $scope.transaction_messages = $scope.TransactionUserMessage[23];
                                                }else if(trans === '7' && $rootScope.Employer && value.site_revenue_from_employer === '0')
                                                {
                                                    $scope.transaction_messages = $scope.TransactionUserMessage[24];
                                                }else if(trans === '7' && $rootScope.Employer && value.site_revenue_from_employer !== '0')
                                                {
                                                    $scope.transaction_messages = $scope.TransactionUserMessage[parseInt(trans)];
                                                }else if(trans === '5' && $rootScope.Employer && value.site_revenue_from_employer === '0')
                                                {
                                                    $scope.transaction_messages = $scope.TransactionUserMessage[parseInt(23)];
                                                }else if(trans === '7' && $rootScope.Freelancer && value.site_revenue_from_employer === '0')
                                                {
                                                        $scope.transaction_messages = $scope.TransactionUserMessage[parseInt(24)];
                                                    }
                                                else{
                                                $scope.transaction_messages = $scope.TransactionUserMessage[parseInt(trans)];
                                                }
                                                if (value.user.id === $rootScope.user.id) {
                                                    if (value.class === 'Wallet') {
                                                        value.transactionAmount = {
                                                            credit: value.amount,
                                                            debit: '--'
                                                        };
                                                    } else {
                                                        value.transactionAmount = {
                                                            credit: '--',
                                                            debit: value.amount
                                                        };
                                                    }
                                                } else if (value.other_user.id === $rootScope.user.id) {
                                                    if (value.class === 'UserCashWithdrawal') {
                                                        value.transactionAmount = {
                                                            credit: '--',
                                                            debit: value.amount
                                                        };
                                                    } else {
                                                        value.transactionAmount = {
                                                            credit: value.amount,
                                                            debit: '--'
                                                        };
                                                    }
                                                }
                                            }
                                             if (value.user.id === $rootScope.user.id && trans === "7") {
                                                            commission = value.site_revenue_from_employer; 
                                                        } else if(value.user.id !== $rootScope.user.id && trans === "7") {
                                                            commission = value.site_revenue_from_freelancer;
                                                        } 
                                                        if (value.user.id === $rootScope.user.id && trans === "22") {
                                                            commission = value.site_revenue_from_employer;
                                                        }
                                                        if (value.user.id === $rootScope.user.id && trans === "6") {
                                                            commission = value.site_revenue_from_employer;
                                                        }
                                                        if (value.user.id !== $rootScope.user.id && trans === "6") {
                                                            commission = value.site_revenue_from_freelancer;
                                                        }
                                                        if (value.user.id === $rootScope.user.id && trans === "5") {
                                                                commission = value.site_revenue_from_employer;
                                                            } 
                                                        if (value.user.id !== $rootScope.user.id && trans === "5") {
                                                                commission = value.site_revenue_from_freelancer;
                                                        } 
                                            if (angular.isDefined(value.exam)) {
                                                exam = '<a href =exam/' + value.exam.id + '/' + value.exam.title + '>' + value.exam.title + '</a>';
                                            }
                                            if (angular.isDefined(value.project)) {
                                                project = '<a href =projects/view/' + value.project.id + '/' + value.project.slug + '>' + value.project.name + '</a>';
                                            }
                                            if (angular.isDefined(value.job)) {
                                                job = '<a href =jobs/view/' + value.job.id + '/' + value.job.id + '>' + value.job.name + '</a>';
                                            }
                                            if (angular.isDefined(value.creditPurchasePlan)) {
                                                subscription = value.creditPurchasePlan.name;
                                            }
                                           if (angular.isDefined(value.payment_gateway)) {
                                                payment_gateway = value.payment_gateway.display_name;
                                            }
                                          if (value.user.id === $rootScope.user.id) {
                                              value.user.username = 'You have'; 
                                            }
                                          if (value.user.id !== $rootScope.user.id){
                                              value.user.username = '<a href =users/' + value.user.id + '/' + value.user.username + '>' + value.user.username + '</a>' + ' ' + 'has'; 
                                            }
                                            var name = {
                                                '##CONTEST##': '<a href =contests/' + value.foreign_transaction.id + '/' + value.foreign_transaction.slug + '>' + value.foreign_transaction.name + '</a>',
                                                '##CONTEST_AMOUNT##': $rootScope.settings.CURRENCY_SYMBOL + value.foreign_transaction.prize,
                                                '##USER##':  value.user.username,
                                                '##EXAM##': exam,
                                                '##PROJECT##': project,
                                                '##JOB##': job,
                                                '##SUBSCRIPTION##': subscription,
                                                 '##PAYMENTGATEWAY##': payment_gateway,
                                                '##PROJECT_NAME##': '<a href =projects/view/' + value.foreign_transaction.id + '/' + value.foreign_transaction.slug + '>' + value.foreign_transaction.name + '</a>',
                                                '##SITE_FEE##': $rootScope.settings.CURRENCY_SYMBOL + value.foreign_transaction.site_commision,
                                                '##OTHERUSER##': '<a href =users/' + value.other_user.id + '/' + value.other_user.username + '>' + value.other_user.username + '</a>',
                                                 '##COMMISSION##': commission
                                            };
                                            value.transaction_message = $scope.transaction_messages.replace(/##CONTEST##|##CONTEST_AMOUNT##|##USER##|##SITE_FEE##|##OTHERUSER##|##EXAM##|##PROJECT##|##PROJECT_NAME##|##PAYMENTGATEWAY##|##SUBSCRIPTION##|##JOB##|##COMMISSION##/gi, function(matched) {
                                                return name[matched];
                                            });
                                        });
                                        $scope.transactions = response.data;
                                        $scope.from_date = $scope.temp_from_date;
                                        $scope.to_date = $scope.temp_to_date;
                            });
                        };
                          $scope.paginateTransaction = function (page) {
                                $scope.currentPageTransaction = page;
                                $scope.GetTransactions();
                            };
                        $scope.GetTransactions();
                    } else if (tabSelected === 'milestones') {
                        $scope.renderpage = 'scripts/plugins/Bidding/Milestone/views/default/bidding_milestone.html';
                         $scope.loadmore = false;
                        var flashMessage = "";
                        if ($state.params.action === undefined || $state.params.action !== 'milestones') {
                            if (($state.params.action !== 'mutual_cancel') && ($state.params.action !== 'dispute')) {
                                $state.go('Bid_ProjectView', $scope.projectBid, {
                                    notify: false
                                });
                            }
                        }
                    } else {
                    $scope.selectedTab('messages');
                }
                };
                $scope.is_file_error = false;
                $scope.upload = function (file) {
                    if (checkFileFormat(file, FileFormat.project)) {
                        $scope.is_file_error = false;
                        Upload.upload({
                            url: '/api/v1/attachments?class=Project',
                            data: {
                                file: file,
                            }
                        })
                            .then(function (response) {
                                $scope.uploadfile = response.data.attachment;
                            });
                    } else {
                        $scope.is_file_error = true;
                    }
                };
                if ($state.params.action) {
                    /*if ($state.params.action === 'mutual_cancel') {
                      $scope.mutual_cancel = $rootScope.mutual_cancel = true;
                    } else if ($state.params.action === 'dispute') {
                      $scope.project_dispute = $rootScope.project_dispute = true;
                    }*/
                    $scope.selectedTab($state.params.action);
                } else {
                    $scope.selectedTab('messages');
                }
            }
        }
    })
    .directive('biddingProjectAction', function () {
        return {
            restrict: 'EA',
            templateUrl: 'scripts/plugins/Bidding/Bidding/views/default/bidding_project_actions.html',
            scope: {
                bidid: '@',
                project: '@',
                projectstatus: '@',
                biduser: '@',
                projectuser: '@',
                isprojectcancel: '@',
                isdispute: '@'
            },
            controller: function ($scope, $rootScope, $cookies, $state, $filter, flash, ProjectStatusConstant, UpdateProjectStatus, ProjectEditView, $location, $anchorScroll, $timeout, $uibModal, $uibModalStack) {
                $scope.auth = JSON.parse($cookies.get('auth'));
                $scope.ProjectStatusConstant = ProjectStatusConstant;
                $scope.is_show_actions = {
                    mutual: true,
                    dispute: true,
                    review: true
                };
                /* For the purpose to hide the action button */
                if ($state.params.action === 'mutual_cancel') {
                    $scope.is_show_actions.mutual = false;
                } else if ($state.params.action === 'dispute' || ($rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Bidding/BiddingReview') > -1 && ($scope.projectstatus === $scope.ProjectStatusConstant.FinalReviewPending || $scope.projectstatus === $scope.ProjectStatusConstant.Closed) && angular.isDefined($rootScope.other_user_reviews) && $rootScope.other_user_reviews !== null)) {
                    $scope.is_show_actions.dispute = false;
                } else if ($state.params.action === 'review-form') {
                    $scope.is_show_actions.review = false;
                }
                /* For check the freelancer or employer */
                if (parseInt($scope.projectuser) === parseInt($scope.auth.id)) {
                    $scope.is_freelancer = false;
                } else {
                    $scope.is_freelancer = true;
                }
                if ($scope.isprojectcancel !== 'false') {
                    var getParams = {
                        id: $scope.project,
                        fields: 'id,project_status_id,is_dispute,is_cancel_request_freelancer,is_cancel_request_employer,user_id'
                    };
                    ProjectEditView.get(getParams, function (response) {
                        if (parseInt(response.error.code) === 0) {
                            $rootScope.projectmutual = response.data;
                            if ($scope.is_freelancer) {
                                if (response.data.is_cancel_request_freelancer !== true) {
                                    $scope.show_request = $rootScope.show_request = true;
                                } else {
                                    $scope.show_request = $rootScope.show_request = false;
                                }
                            } else {
                                if (response.data.is_cancel_request_employer !== true) {
                                    $scope.show_request = $rootScope.show_request = true;
                                } else {
                                    $scope.show_request = $rootScope.show_request = false;
                                }
                            }
                        }
                    }, function (error) {
                        console.log(error);
                    });
                }
                $scope.projectstatuschange = function (statusType) {
                    var alerttitle = "";
                    if (statusType !== 8 && statusType !== 9) {
                        if ($scope.is_freelancer && statusType === 1) {
                            /* Mark as Completed */
                            alerttitle = "Are you sure you completed this project?";
                        } else if (statusType === 2) {
                            /*Accept as Completed*/
                            alerttitle = "Are you sure you accept this project as completed?";
                        } else if (statusType === 3) {
                            /*Cancel this Project*/
                            alerttitle = "Are you sure you want to request to cancel this project?";
                        } else if (statusType === 4) {
                            /*Accept Cancel Request*/
                            alerttitle = "Are you sure you accept the cancel request of this project?";
                        } else if (statusType === 5) {
                            /*Reject Cancel Request*/
                            alerttitle = "Are you sure you reject the cancel request of this project?";
                        } else if (statusType === 6) {
                            /*Dispute Request*/
                            alerttitle = "Are you sure you raise the dispute for this project?";
                        } else if (statusType === 7) {
                            /*Dispute Request*/
                            alerttitle = "Are you sure reject this dispute request?";
                        }
                        else if (statusType === 10) {
                            /*cancel the complete Request*/
                            alerttitle = "Are you sure you want to cancel this request?";
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
                                if ($scope.is_freelancer && statusType === 1) {
                                    var acceptparams = {
                                        id: $scope.project,
                                        project_status_id: ProjectStatusConstant.Completed
                                    };
                                    updateprojectstatus(acceptparams);
                                } else if (statusType === 2) {
                                    var acceptparams = {
                                        id: $scope.project,
                                        project_status_id: ProjectStatusConstant.FinalReviewPending
                                    };
                                    updateprojectstatus(acceptparams);
                                } else if (statusType === 3) {
                                    $scope.mutual_cancel = $rootScope.mutual_cancel = true;
                                    $state.go('Bid_ProjectView', {
                                        id: $state.params.id,
                                        slug: $state.params.slug,
                                        action: 'mutual_cancel'
                                    }, {
                                            reload: true
                                        });
                                    $timeout(function () {
                                        $anchorScroll('cancel_scroll');
                                    }, 2500);
                                } else if (statusType === 4) {
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
                                else if (statusType === 6) {
                                    $scope.project_dispute = $rootScope.project_dispute = true;
                                    $state.go('Bid_ProjectView', {
                                        id: $state.params.id,
                                        slug: $state.params.slug,
                                        action: 'dispute'
                                    }, {
                                            reload: true
                                        });
                                    $timeout(function () {
                                        $anchorScroll('dispute_scroll');
                                    }, 3500);
                                }
                              else if (statusType === 10) {
                                var acceptparams = {
                                    id: $scope.project,
                                    project_status_id: ProjectStatusConstant.UnderDevelopment
                                    };
                                updateprojectstatus(acceptparams)
                               }
                            }
                        });
                    } else {
                        if (statusType === 8) {
                            $state.go('Bid_ProjectView', {
                                id: $state.params.id,
                                slug: $state.params.slug,
                                action: 'review-form'
                            }, {
                                    reload: true
                                });
                            $timeout(function () {
                                $anchorScroll('add_review_scroll');
                            }, 2500);
                        } else if (statusType === 9) {
                            $state.go('Bid_ProjectView', {
                                id: $state.params.id,
                                slug: $state.params.slug,
                                action: 'review-form'
                            }, {
                                    reload: true
                                });
                            $timeout(function () {
                                $anchorScroll('update_review_scroll');
                            }, 3500);
                        }
                    }
                };

                function updateprojectstatus(acceptparams) {
                    var flashMessage = "";
                    UpdateProjectStatus.put(acceptparams, function (response) {
                        var msgStr = "";
                        if (parseInt(response.error.code) === 0) {
                            msgStr = (acceptparams.project_status_id === ProjectStatusConstant.Completed) ? 'Project marked as completed successfully.' : (acceptparams.project_status_id === ProjectStatusConstant.MutuallyCanceled) ? 'Your reject cancel request has been sended successfully.' : (acceptparams.project_status_id === ProjectStatusConstant.UnderDevelopment) ? 'Project moved to under developement successfully' : 'Project is successfully completed';
                            flashMessage = $filter("translate")(msgStr);
                            flash.set(flashMessage, 'success', false);
                            $state.reload();
                            if($rootScope.Employer === true && acceptparams.project_status_id === ProjectStatusConstant.FinalReviewPending && $rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Bidding/Dispute') > -1)
                            {
                              $state.go('Bid_ProjectView', {
                                id: $state.params.id,
                                slug: $state.params.slug,
                                action: 'messages'
                                }, {
                                   reload: true
                            });
                            }
                        } else if (parseInt(response.error.code) === 1) {
                            msgStr = (acceptparams.project_status_id === ProjectStatusConstant.FinalReviewPending) ? 'Clear all the milestone payment and complete the project' : '';
                            flashMessage = $filter("translate")(msgStr);
                            flash.set(flashMessage, 'error', false);
                        } else {
                            flashMessage = $filter("translate")(response.error.message);
                            flash.set(flashMessage, 'error', false);
                        }
                    }, function (error) {
                        console.log(error);
                    });
                }
                $scope.contactFreelancer = function (projectid) {
                     $rootScope.message_bid_id =  projectid;
                    $scope.modalInstance = $uibModal.open({
                        templateUrl: 'scripts/plugins/Bidding/Bidding/views/default/contact_freelancer.html',
                        animation: false,
                        controller: function ($scope, $rootScope, $window, $stateParams, $filter, md5, $state, Upload, $timeout, $uibModal, $uibModalStack, Messages, biduser, authuser) {
                            var flashMessage = "";
                            $scope.MessagePage = 1;
                            $rootScope.closemodel = function () {
                                $uibModalStack.dismissAll();
                            };
                            $scope.contact_freelancer = false;
                            $scope.data = {};
                            $scope.ContactMessages = [];
                            $scope.submit = function ($valid) {
                                if ($valid) {
                                    $scope.contact_freelancer = true;
                                    var contactData = {};
                                    contactData.foreign_id = projectid;
                                    contactData.to_user_id = biduser;
                                    contactData.message = $scope.data.message;
                                    contactData.class = 'Bid';
                                    contactData.subject = $state.params.slug;
                                    Messages.post(contactData, function (response) {
                                        /* $scope.closemodel();*/
                                        if (response.error.code === 0) {
                                            flashMessage = $filter("translate")("Message sent successfully.");
                                            flash.set(flashMessage, 'success', false);
                                            $scope.data.message = '';
                                            $scope.Contactfrm.$setPristine();
                                            $scope.Contactfrm.$setUntouched();
                                            $scope.ContactMessages = [];
                                            $scope.MessagePage = 1;
                                            $scope.GetConactMessage();
                                            $scope.contact_freelancer = false;
                                        } else {
                                            flashMessage = $filter("translate")(response.error.message);
                                            flash.set(flashMessage, 'error', false);
                                        }
                                    });
                                };
                            };
                            $scope.GetConactMessage = function () {
                                var conactparams = {};
                                conactparams.foreign_id = $rootScope.message_bid_id;
                                conactparams.limit = 5;
                                conactparams.sortby = 'desc'
                                conactparams.page = $scope.MessagePage;
                                conactparams.class = 'Bid';
                                Messages.get(conactparams, function (response) {
                                    if (angular.isDefined(response.data)) {
                                        if (angular.isDefined(response._metadata)) {
                                            $scope.messageNoOfPages = response._metadata.last_page;
                                            $scope.ConactmessageTotal = response._metadata.total - (response._metadata.current_page * response._metadata.per_page);
                                        }
                                        if (parseInt(response.error.code) === 0) {
                                            angular.forEach(response.data, function (value) {
                                                if (angular.isDefined(value.user.attachment) && value.user.attachment !== null) {
                                                    value.user.user_avatar_url = 'images/big_thumb/UserAvatar/' + value.user.id + '.' + md5.createHash('UserAvatar' + value.user.id + 'png' + 'big_thumb') + '.png';
                                                } else {
                                                    value.user.user_avatar_url = 'images/default.png';
                                                }
                                                $scope.ContactMessages.push(value);
                                            });
                                        } else {
                                            $scope.ContactMessages = [];
                                        }
                                    }
                                });
                            };
                            $scope.contactmessage_pagination = function () {
                                $scope.MessagePage = parseInt($scope.MessagePage) + 1;
                                $scope.GetConactMessage();
                            };
                            $scope.GetConactMessage();
                        },
                        size: 'lg',
                        resolve: {
                            biduser: function () {
                                return $scope.biduser;
                            },
                            authuser: function () {
                                return $scope.auth.id;
                            }
                        }
                    });
                };
                $rootScope.cancelresp = false;
                $rootScope.$watch('cancelresp', function (newValue, oldValue) {
                    if (newValue !== false) {
                        $scope.projectstatuschange(parseInt(newValue));
                        $rootScope.cancelresp = false;
                    }
                });
                /* For the purpose get the broadcast value is_show_accept note from projectview ctrl */
                $scope.$on('mutualcancel', function (event, data) {
                    $scope.is_show_accept = data.is_show_accept;
                });
            }
        }
    })
    .directive('biddingHomeSkills', function (ProjectSkills) {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: 'scripts/plugins/Bidding/Bidding/views/default/bidding_home_skills.html',
            link: function postLink(scope, element, attrs) {
                var params = {
                    limit: 30,
                    sort: 'name',
                    sortby: 'DSC',
                    field: 'id,name,slug,description'
                };
                
                ProjectSkills.get(params, function(response) {
                  scope.project_skills = response.data;
                });
            }
        }
    })
     .directive('biddingHomeCategories', function (ProjectCategory) {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: 'scripts/plugins/Bidding/Bidding/views/default/bidding_home_categories.html',
            link: function postLink(scope, element, attrs) {
                var params = {
                    limit: 8,
                    sort: 'name',
                    sortby: 'DSC',
                    field: 'id,name,slug,description'
                };
                ProjectCategory.get(params, function(response) {
                  scope.project_categories = response.data;
                });
            }
        }
    })
     .directive('biddingCategories', function (ProjectCategory, $filter) {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: 'scripts/plugins/Bidding/Bidding/views/default/bidding_categories.html',
            link: function postLink(scope, element, attrs) {
                var params = {
                    limit: 8,
                    sort: 'name',
                    sortby: 'DSC',
                    field: 'id,name,slug,description'
                };
                ProjectCategory.get(params, function(response) {
                  scope.project_categories = response.data;
                  scope.project_categories = $filter('orderBy')(response.data, 'id');
                });
            }
        }
    })
    .directive('ajaxSearchInput', function Directive() {
        return {
            template: '<input class="form-control" style="margin-left:0px"/>',
            replace: true,
            restrict: 'E',
            require: 'ngModel',
            scope: {
                selectedItem: '=',
                textAttr: '@',
                queryParam: '@',
                containerCssClass: '@',
                minimumInputLength: '@'
            },
            link: function (_scope, _element) {
                var selectOptions = {
                    minimumInputLength: _scope.minimumInputLength || 3,
                    containerCssClass: _scope.containerCssClass,
                    initSelection: function (_elem, _callback) {
                        if (_scope.selectedItem) {
                            var data = {
                                id: _scope.selectedItem.id,
                                text: _scope.selectedItem[_scope.textAttr] || ''
                            };

                            _callback(data);
                        }
                    },
                    ajax: {
                        url: '/api/v1/users?type=employer&fields=id,username',
                        quietMillis: 250,
                        dataType: 'json',
                        data: function (term) {
                            var d = {};
                            d[_scope.queryParam || 'q'] = term;
                            return d;
                        },
                        results: function (_data) {
                            return {
                                results: _.map(_data['data'], function (_item) {
                                    var d = {
                                        id: _item.id,
                                        text: _item[_scope.textAttr]
                                    };
                                    return d;
                                })
                            };
                        }
                    }
                };

                $(_element).select2(selectOptions);
            }
        };
    })
