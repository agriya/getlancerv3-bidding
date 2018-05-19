'use strict';
/**
 * @ngdoc directive
 * @name getlancerApp.directive:Newsfeeds
 * @description
 * # Newsfeeds
 */
angular.module('getlancerApp')
	.controller('newsFeedsCtrl', function($rootScope, NewsFeedsFactory, md5, $window, ActivityType, $scope, $state, ConstUserRole, QuoteStatus, MilestoneStatus, MeNewsFeedsFactory, ProjectStatusConstant, ConstQuoteStatuses, UserProfile, $location, ExamsUsers, ConstExamStatus, ProjectStatuses, MilestoneStatusConstant, MilestoneStatues, SweetAlert, $filter, flash, $timeout, UpdateProjectStatues, UpdateBidsStatus, ConstJobStatus, ConstWithdrawStatus) {
		$scope.enabled = true;
		$scope.ConstExamStatus = ConstExamStatus;
		$scope.lastpage = 1;
		$scope.currentpage = 1;
		$scope.news_feeds =[];
		$scope.ActivityType = ActivityType;
		$scope.ConstUserRole = ConstUserRole;
		$scope.QuoteStatus = QuoteStatus;
		$scope.ProjectStatusConstant = ProjectStatusConstant;
		$scope.ProjectStatus = ProjectStatuses;
		$scope.MilestoneStatus = MilestoneStatus;
		$scope.ConstQuoteStatuses = ConstQuoteStatuses;
		$scope.MilestoneStatusConstant = MilestoneStatusConstant;
		$scope.ConstJobStatus =  ConstJobStatus;
		$scope.ConstWithdrawStatus = ConstWithdrawStatus;
		$scope.getActivity = false;
		var params = {}; 
		$scope.getNewsfeeds = function (type) {
			$scope.viewall = true;
			/*$scope.news_feeds = [];*/
			params.page = $scope.currentpage;
			$scope.loader = true;
			$scope.scroll_flag = true;
			if($location.$$url === '/newsfeed' || $location.$$url === '/users/dashboard?type=news_feed&status=news_feed' || $location.$$url === '/users/dashboard?type=news_feed')
			 {
				 $scope.getActivity = true;
			 }
			 /*&& $scope.getActivity === true*/
			if($rootScope.isAuth && $scope.getActivity === true)
			{
		if($rootScope.user.role_id === ConstUserRole.Admin)
			{
				MeNewsFeedsFactory.get(params, function(response) {
				if (angular.isDefined(response._metadata)) {
                    $scope.lastpage = response._metadata.last_page;
                    $scope.currentpage = response._metadata.current_page;
                }
				if (angular.isDefined(response.data)) {
					if (angular.isDefined(response._metadata)) {
						$scope.totalItems = response._metadata.total;
						$scope.itemsPerPage = response._metadata.per_page;
						$scope.noOfPages = response._metadata.last_page;
					}
						if(parseInt(response.data.length) === 0 && $scope.currentpage === 1)
						{
							$scope.NorecordFound = true;
						}else{
								$scope.NorecordFound = false;
								$scope.viewall = false;
						}
					if(type === "update")
					{
					 $scope.news_feeds = [];
					 $scope.news_feeds_value = response.data;
					 $scope.news_feeds.push($scope.news_feeds_value);
					}else{
					 $scope.news_feeds_value = response.data;
					 $scope.news_feeds.push($scope.news_feeds_value);

					}

					$scope.Projectstatus = [];
					$scope.Projectstatus.push('ProjectStatus');

					angular.forEach($scope.ProjectStatus, function(value , key) {
						$scope.Projectstatus.push(key);
					});
					
					$scope.JobStatus = [];
					$scope.JobStatus.push('JobStatus');

					angular.forEach($scope.ConstJobStatus, function(value , key) {
						$scope.JobStatus.push(key);
					});
					
					$scope.withdrawStatus = [];
					$scope.withdrawStatus.push('pending');

					angular.forEach($scope.ConstWithdrawStatus, function(value , key) {
						$scope.withdrawStatus.push(key);
					});

					 angular.forEach($scope.news_feeds, function(news_feed) {
						 angular.forEach(news_feed, function(news_feed) {
								news_feed.formStatus = $scope.Projectstatus[news_feed.from_status_id];
								news_feed.ToStatus = $scope.Projectstatus[news_feed.to_status_id];
								news_feed.JobformStatus = $scope.JobStatus[news_feed.from_status_id];
								news_feed.jobToStatus = $scope.JobStatus[news_feed.to_status_id];
								news_feed.withdrawStatus = $scope.withdrawStatus[news_feed.to_status_id];
							if (news_feed.foreign !== null && news_feed.class === "Portfolio") {
								news_feed.portfolio_url = 'images/medium_thumb/Portfolio/' + news_feed.foreign.activity.id + '.' + md5.createHash('Portfolio' + news_feed.foreign.activity.id + 'png' + 'medium_thumb') + '.png';
							} else {
								news_feed.portfolio_url = 'images/no-image.png';
							}

						});	
					 });
					 $scope.loader = false;
				}		
			}, function() {
                $scope.scroll_flag = true;
            });
			}else{
				MeNewsFeedsFactory.get(params, function(response) {
				if (angular.isDefined(response.data)) {
				if (angular.isDefined(response._metadata)) {
                    $scope.lastpage = response._metadata.last_page;
                    $scope.currentpage = response._metadata.current_page;
                   }
						if(parseInt(response.data.length) === 0 && $scope.currentpage === 1)
						{
							$scope.NorecordFound = true;
						}else{
								$scope.NorecordFound = false;
								$scope.viewall = false;
						}
				   	if(type === "update")
					{
					 $scope.news_feeds = [];
					 $scope.news_feeds_value = response.data;
					 $scope.news_feeds.push($scope.news_feeds_value);
					}else{
					 $scope.news_feeds_value = response.data;
					 $scope.news_feeds.push($scope.news_feeds_value);
					}

					$scope.Projectstatus = [];
					$scope.Projectstatus.push('ProjectStatus');

					$scope.withdrawStatus = [];
					$scope.withdrawStatus.push('withdraw');
						
					angular.forEach($scope.ConstWithdrawStatus, function(value , key) {
							$scope.withdrawStatus.push(key);
						});

					angular.forEach($scope.ProjectStatus, function(value , key) {
						$scope.Projectstatus.push(key);
					});

				angular.forEach($scope.news_feeds, function(news_feed) {
					 angular.forEach(news_feed, function(news_feed) {
						news_feed.formStatus = $scope.Projectstatus[news_feed.from_status_id];
            			news_feed.ToStatus = $scope.Projectstatus[news_feed.to_status_id];
						news_feed.withdrawStatus = $scope.withdrawStatus[news_feed.to_status_id];
						if (news_feed.foreign !== null && news_feed.class === "Portfolio") {
							news_feed.portfolio_url = 'images/medium_thumb/Portfolio/' + news_feed.foreign.activity.id + '.' + md5.createHash('Portfolio' + news_feed.foreign.activity.id + 'png' + 'medium_thumb') + '.png';
						} else {
							news_feed.portfolio_url = 'images/no-image.png';
						}
					   });
					  });
					 $scope.loader = false;
				}
				}, function() {
					$scope.scroll_flag = true;
				});
			}
			}
		};

		function userprofileDetail() {
            UserProfile.getbyId({
                id: $rootScope.user.id
            }, params, function(response) {
				 if (parseInt(response.error.code) === 0) {
					 $scope.userprofile = response.data;
				     }
				  });
		    }
				  userprofileDetail();


		$scope.GetExamCeritifications = function() {
            var params = {};
            params.user_id = $rootScope.user.id;
            params.exam_status_id = $scope.ConstExamStatus.Passed;
            ExamsUsers.getall(params, function(response) {
                $scope.examCertifications = response.data;
                angular.forEach($scope.examCertifications, function(value) {
                    $scope.total_mark = Number(value.total_mark || 0);
                    $scope.total_question_count = Number(value.total_question_count || 0);
                    $scope.average = $scope.total_mark / $scope.total_question_count;
                    value.exam_user_per = parseInt($scope.average * 100);
                    if (angular.isDefined(value.exam.attachment) && value.exam.attachment !== null) {
                        value.logo_url = 'images/small_normal_thumb/' + value.exam.attachment.class + '/' + value.exam.attachment.foreign_id + '.' + md5.createHash(value.exam.attachment.class + value.exam.attachment.foreign_id + 'png' + 'small_normal_thumb') + '.png';
                    } else {
                        value.logo_url = 'images/no-image.png';
                    }
                });
            });
        };
		$timeout(function() {
		if($rootScope.isAuth){
			if ($rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Bidding/Exam') > -1 === true) {
					$scope.GetExamCeritifications();}
		   }
		}, 1000);
	/*	unreadedActivity function */
	var userparams ={};
		$scope.unreadedActivity = function()
		{
		$scope.getActivity = true;
		 userparams.is_have_unreaded_activity  = 0;
			UserProfile.update({id: $rootScope.user.id,
				}, userparams, function() {
					$scope.is_have_unreaded_activity = false;
			 });
			 $scope.getNewsfeeds('update');
		};
		$scope.viewAll = function()
		{
		  if($location.$$url === '/users/dashboard?type=news_feed&status=news_feed' || $location.$$url === '/users/dashboard?type=news_feed')
			 {
				 $state.reload();
			 }
		};
		if($location.$$url === '/newsfeed')
		{
			userparams.is_have_unreaded_activity  = 0;
			UserProfile.update({id: $rootScope.user.id,
				}, userparams, function() {
					$scope.is_have_unreaded_activity = false;
			 });
		}
		/*	 user profile get function*/
		$scope.UserProfile = function(){
		  UserProfile.getbyId({
                id: $rootScope.user.id,
            }, params, function(response) {
				if (angular.isDefined(response)) {
				$scope.is_have_unreaded_activity = response.data.is_have_unreaded_activity;
					$timeout(function() {
							$scope.UserProfile();
					}, 60000);
				}
			});
		};
		$scope.UserProfile();
		/*	milestone satatus change function */
			 $scope.milestoneStatueChange = function(milestoneId) {
                        SweetAlert.swal({
                            title: $filter("translate")('Are you sure you want to do this action?'),
                            text: "",
                            type: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "OK",
                            cancelButtonText: "Cancel",
                            closeOnConfirm: true,
                            animation:false,
                        }, function(isConfirm) {
                            if (isConfirm && $rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Bidding/Milestone') > -1) {
                                MilestoneStatues.put({id: milestoneId,milestone_status_id: $scope.MilestoneStatusConstant.EscrowReleased}, function(response) {
									var flashMessage = "";
                                     if (response.error.code === 0) { 
										if (parseInt(response.error.code) === 0) {
											flashMessage = $filter("translate")("Milestone status changed");
											flash.set(flashMessage, 'success', false);
											 $state.reload();
										} else {
											flashMessage = $filter("translate")(response.error.message);
											flash.set(flashMessage, 'error', false);
										}
								} else {
									flashMessage = $filter("translate")(response.error.message);
											flash.set(flashMessage, 'error', false);
								}
                            });
                     } else {
                        /* Go to the payment page */
                        $state.go('newsfeeds');
                    }
                });
			 };
			/* awardedprocess function*/
			    $scope.awardedprocess = function (ftype, projectid, bidid) {
                    var alertTitle = "";
                    if (parseInt(ftype) === 1) {
                        alertTitle = $filter("translate")("Are you sure you want to accept this project?");
                    } else if (parseInt(ftype) === 2) {
                        alertTitle = $filter("translate")("Are you sure you want to reject this project?");
                    }
                    SweetAlert.swal({
                        title: alertTitle,
                        text: "",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "OK",
                        cancelButtonText: "Cancel",
                        closeOnConfirm: true,
                        animation: false,
                    }, function (isConfirm) {
                        if (isConfirm) {
                            var flashMessage = "";
                            if (parseInt(ftype) === 1) {
                               UpdateProjectStatues.put({
                                    id: projectid,
                                    project_status_id: $scope.ProjectStatusConstant.UnderDevelopment
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
                                params.id = bidid;
                                UpdateBidsStatus.put(params, { is_offered_rejected: 1 }, function (response) {
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
                                });
                            }
                        }
                    });
                };
	//pagination Function
        $scope.firstVisit = 0;
		$scope.page = $scope.currentpage;
		 $scope.pagination = function() {
			 $scope.scrolloder = true;
			 $timeout(function() {
				$scope.scrolloder = false;
				if ($scope.enabled === true && $scope.scroll_flag === true) {
					if ($scope.currentpage <= $scope.lastpage) {
						if ($scope.firstVisit !== 0) {
							$scope.currentpage += 1;
							$scope.scroll_flag = false;
									$scope.getNewsfeeds();								
						}
						$scope.firstVisit = 1;
					} else {
						$scope.enabled = false;
					}
				}
				}, 2000);
			};
		 $scope.getNewsfeeds();
       
});
        