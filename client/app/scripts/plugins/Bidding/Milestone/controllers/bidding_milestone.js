'use strict';
/**
 * @ngdoc function
 * @name getlancerApp.controller:BiddingMilestoneCtrl
 * @description
 * # QuoteServicePhotosManageController
 * Controller of the getlancerApp
 */
angular.module('getlancerApp.Bidding.Milestone')
    .controller('BiddingMilestoneCtrl', function($scope, $rootScope, $timeout, $state, $cookies, $filter, flash, md5, ProjectStatusConstant, MeMilestone, BidMilestone, GetMilestoneStatus, MilestoneStatusChange, Milestone, MilestoneStatusConstant, DateFormat) {
        $scope.MilestoneStatusConstant = MilestoneStatusConstant;
        var flashMessage = "";
        $scope.isupdated = false;
        $scope.milestones = [];
        $scope.data = {};
        $scope.form_value = false;
        $scope.milestoneinit = function() {
            $scope.milestoneindex(1);
            $scope.milestoneindex(2);
        };
        //Milestone pending list get based on milestone_status_id(1)
        $scope.milestoneindex = function(reqType) {
            if(reqType === 1)
            {
                $scope.milestoneParams = {
                page: $scope.currentPageMilestone,
                limit: 3,
                bid_id: $scope.bidid,
            };
            }else if(reqType === 2)
            {
                $scope.milestoneParams = {
                page: $scope.currentPage,
                limit: 3,
                bid_id: $scope.bidid,
                };
            }else {
                    $scope.milestoneParams = {
                    page: ($scope.currentPage !== undefined) ? $scope.currentPage : 1,
                    limit: 3,
                    bid_id: $scope.bidid,
                };
            }
            if (parseInt(reqType) === 1) {
                $scope.milestoneParams.milestone_status_id = 1;
                $scope.totalAmount = 0;
            } else {
                var milestone_status_id = [2, 3, 4, 5, 6, 7, 8];
                $scope.milestoneParams.milestone_status_id = milestone_status_id.toString();
                $scope.all = 0;
            }
            BidMilestone.get($scope.milestoneParams, function(response) {
                if (parseInt(response.error.code) === 0) {
                    angular.forEach(response.data, function(value) {
                        if (parseInt(reqType) === 1) {
                            $scope.totalAmount += parseInt(value.amount);
                        } else {
                            if(value.milestone_status.id !== $scope.MilestoneStatusConstant.Canceled){
                                $scope.all += parseInt(value.amount);
                            }
                        }
                    });
                    if (parseInt(reqType) === 1) {
                        $scope.milestones = response.data;
                        /* For the purpose of Pagination */
                        $scope.currentPageMilestone = response._metadata.current_page;
                        $scope.totalItemsMilestone = response._metadata.total;
                        $scope.itemsPerPageMilestone = response._metadata.per_page;
                        $scope.noOfPagesMilestone = response._metadata.last_page;
                        $scope.is_show_loader = false;
                    } else {
                        $scope.milestonesGet = response.data;
                        /* For the purpose of Pagination */
                        $scope.currentPage = response._metadata.current_page;
                        $scope.totalItems = response._metadata.total;
                        $scope.itemsPerPage = response._metadata.per_page;
                        $scope.noOfPages = response._metadata.last_page;
                        $scope.is_show_loader = false;
                    }
                }
            }, function(error) {
                if (parseInt(reqType) === 1) {
                    $scope.currentPageMilestone = 0;
                    $scope.totalItemsMilestone = 0;
                    $scope.itemsPerPageMilestone = 0;
                    $scope.noOfPagesMilestone = 0;
                } else {
                    $scope.currentPage = 0;
                    $scope.totalItems = 0;
                    $scope.itemsPerPage = 0;
                    $scope.noOfPages = 0;
                }
            });
        };
        GetMilestoneStatus.get(function(response) {
            $scope.is_show_loader = false;
            if (parseInt(response.error.code) === 0) {
                $scope.milestoneStatus = response.data;
            }
        }, function(error) {
            console.log('Milestone directive', error);
        });
        //Button value changing function
        $scope.form = function() {
            $scope.data = {};
            if ($scope.form_value == false) {
                $scope.create_mile = true;
                $scope.form_value = true;
                 $scope.milestone_set_status_id = false;
                $scope.buttonName = 'Cancel';
            } else {
                $scope.form_value = false;
                $scope.buttonName = ($scope.is_freelancer === true) ? 'Request Milestone' : 'Create Milestone';
            }
        }
        //Milestone submit based on sumbit or edit
        $scope.milestone_set = false;
        $scope.submit = function(id, $valid) {
            if ($valid) {
                $scope.milestone_set = true;
                if (!angular.isDefined(id)) {
                    $scope.data.bid_id = $scope.bidid;
                    $scope.data.deadline_date = $filter('date')(Date.parse($scope.data.deadline_date), DateFormat.created);
                    BidMilestone.post($scope.data, function(response) {
                        $scope.milestonesss = response.data;
                        if (response.error.code === 0) {
                            $scope.form_value = false;
                            flashMessage = $filter("translate")("Milestone added successfully.");
                            flash.set(flashMessage, 'success', false);
                            $scope.milestone_set = false;
                            $scope.buttonName = ($scope.is_freelancer === true) ? 'Request Milestone' : 'Create Milestone';
                        } else {
                            $scope.milestone_set = false;
                            flashMessage = $filter("translate")(response.error.message);
                            flash.set(flashMessage, 'error', false);
                        }
                        $scope.milestoneinit();
                    })
                } else {
                    $scope.approveButton = true;
                    $scope.data.id = id;
                    $scope.data.bid_id = $scope.bidid;
                    if (!$scope.is_freelancer) {
                        $scope.data.milestone_status_id = MilestoneStatusConstant.MilestoneSet;
                    }
                    Milestone.put($scope.data, function(response) {
                        $scope.milestone_set = false;
                        $scope.milestonesss = response.data;
                        if (response.error.code === 0) {
                            $scope.form_value = false;
                            flashMessage = $filter("translate")("Milestone updated successfully.");
                            flash.set(flashMessage, 'success', false);
                            $scope.milestone_set = false;
                            $scope.buttonName = ($scope.is_freelancer === true) ? 'Request Milestone' : 'Create Milestone';
                        } else {
                            $scope.milestone_set = false;
                            flashMessage = $filter("translate")(response.error.message);
                            flash.set(flashMessage, 'error', false);
                        }
                        $scope.milestoneinit();
                    })
                }
            }
        };
        //MIlestine delete by id 
        $scope.milestoneDelete = function(id) {
            Milestone.delete({
                id: id
            }, function(response) {
                $scope.data = response.data
                var flashMessage = "";
                if (parseInt(response.error.code) === 0) {
                    flashMessage = $filter("translate")("Milestone is deleted");
                    flash.set(flashMessage, 'success', false);
                    $scope.milestoneinit();
                } else {
                    flashMessage = $filter("translate")(response.error.message);
                    flash.set(flashMessage, 'error', false);
                }
            });
        };
        //Milestone get by id for edit
        $scope.MilestoneEdit = function(id) {
            $scope.milestone_set = false;
            $scope.create_mile = false;
            $scope.data = {};
            $scope.buttonName = 'Cancel';
            $scope.form_value = true;
            Milestone.get({
                'id': id
            }, function(response) {
                $scope.milestone_set_status_id = response.data.milestone_status_id;
                response.data.amount = parseInt(response.data.amount);
                $scope.data = response.data
                $scope.setDate($scope.data.deadline_date);
            })
        };
        // Pagination for Milestone and Milestone Request list
        $scope.paginate = function(value, page) {
            if (value === 1) {
                $scope.currentPageMilestone = parseInt(page);
                $scope.milestoneindex(1);
            } else {
                $scope.currentPage = parseInt(page);
                $scope.milestoneindex(2);
            }
        };
        $scope.milestoneinit();
        /* For the purpose of milestone status updated recall */
        $scope.$on('isupdated', function(event, data) {
            $scope.milestoneinit();
        });
      /*  today date */
        $scope.today = function() {
            $scope.dt = new Date();
        };
        $scope.today();
        $scope.clear = function() {
            $scope.dt = null;
        };
        $scope.inlineOptions = {
            customClass: getDayClass,
            minDate: new Date(),
            showWeeks: true
        };
        $scope.dateOptions = {
            formatYear: 'yy',
            maxDate: new Date(2020, 12, 31),
            minDate: new Date(),
            startingDay: 1
        };

        function toggleMin() {
            $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
            $scope.dateOptions.minDate = new Date();
        };
        toggleMin();
        $scope.open1 = function() {
            $scope.popup1.opened = true;
        };
        $scope.open2 = function() {
            $scope.popup2.opened = true;
        };
        $scope.setDate = function(date) {
            $scope.data.deadline_date = new Date(date);
        };
        $scope.formats = ['yyyy-MM-dd', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[1];
        $scope.altInputFormats = $scope.formats[1];
        $scope.popup1 = {
            opened: false
        };
        $scope.popup2 = {
            opened: false
        };
        function getDayClass(data) {
            var date = data.date,
                mode = data.mode;
            if (mode === 'day') {
                var dayToCheck = new Date(date)
                    .setHours(0, 0, 0, 0);
                for (var i = 0; i < $scope.events.length; i++) {
                    var currentDay = new Date($scope.events[i].date)
                        .setHours(0, 0, 0, 0);
                    if (dayToCheck === currentDay) {
                        return $scope.events[i].status;
                    }
                }
            }
            return '';
        }
    })