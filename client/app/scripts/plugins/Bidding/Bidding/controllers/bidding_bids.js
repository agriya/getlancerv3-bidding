angular.module('getlancerApp.Bidding')
    .controller('MyBidsCtrl', function($scope, $rootScope, $state, $filter, flash, MyBids, BidMilestone, BidRetake, MeMilestone, MilestoneStatusConstant, MeInvoice, SweetAlert) {
        $scope.index = function(params) {
            if (params.type === 'milestone') {
                delete params.type;
                if ($state.params.status === undefined || $state.params.status !== 'milestone') {
                    $state.go('Bid_MeBids', {
                        status: 'milestone'
                    }, {
                        notify: false
                    });
                }
                $scope.MilestoneStatusConstant = MilestoneStatusConstant;
                $scope.milestones = [];
                MeMilestone.get(params, function(response) {
                    if (parseInt(response.error.code) === 0) {
                        $scope.milestones = response.data;
                    }
                }, function(error) {});
            } else if (params.type === 'invoice') {
                if ($state.params.status === undefined || $state.params.status !== 'invoice') {
                    $state.go('Bid_MeBids', {
                        status: 'invoice'
                    }, {
                        notify: false
                    });
                }
                delete params.type;
                $scope.invoices = [];
                MeInvoice.get(params, function(response) {
                    if (parseInt(response.error.code) === 0) {
                        $scope.invoices = response.data;
                    }
                }, function(error) {})
            } else {
                if (params.type === 'active') {
                    if ($state.params.status === undefined || $state.params.status !== 'active') {
                        $state.go('Bid_MeBids', {
                            status: 'active'
                        }, {
                            notify: false
                        });
                    }
                } else if (params.type === 'my_bids') {
                    if ($state.params.status === undefined || $state.params.status !== 'my_bids') {
                        $state.go('Bid_MeBids', {
                            status: 'my_bids'
                        }, {
                            notify: false
                        });
                    }
                } else {
                    if ($state.params.status === undefined || $state.params.status !== 'past_projects') {
                        $state.go('Bid_MeBids', {
                            status: 'past_projects'
                        }, {
                            notify: false
                        });
                    }
                }
                MyBids.get(params, function(response) {
                    if (parseInt(response.error.code) === 0) {
                        $scope.currentPage = response._metadata.current_page;
                        $scope.totalItems = response._metadata.total;
                        $scope.itemsPerPage = response._metadata.per_page;
                        $scope.noOfPages = response._metadata.last_page;
                    }
                    if (parseInt(response.error.code) === 0) {
                        $scope.mybids = response.data;
                    } else {
                        $scope.mybids = [];
                        $scope.errorMessage = "";
                        if (angular.isDefined(response.error)) {
                            $scope.errorMessage = response.error.message;
                        }
                        $scope.currentPage = 0;
                        $scope.totalItems = 0;
                        $scope.itemsPerPage = 0;
                        $scope.noOfPages = 0;
                    }
                });
            }
        };
        if ($state.params.status) {
            alert('in bddd');
            if ($state.params.status === 'my_bids') {
                $scope.activeStatus = 1;
            } else if ($state.params.status === 'past_projects') {
                $scope.activeStatus = 2;
            } else if ($state.params.status === 'milestone') {
                $scope.activeStatus = 3;
            } else if ($state.params.status === 'invoice') {
                $scope.activeStatus = 4;
            } else {
                $scope.activeStatus = 0;
            }
            $scope.index({
                type: $state.params.status
            });
        } else {
            $scope.activeStatus = 0;
        }
        /**
         * @ngdoc method
         * @name projectController.job
         * @methodOf module.projectController
         * @description
         * This method is used to get the project listings
         */
        $scope.paginate = function() {
            $scope.currentPage = parseInt($scope.currentPage);
            $scope.index();
        };
        $scope.getBidsShow = function(tabType) {
            $scope.params = {
                type: tabType,
                page: ($scope.currentPage !== undefined) ? $scope.currentPage : 1
            };
            $scope.index($scope.params);
        };
        $scope.bidAction = function(indexVal, atype, bidId) {
            if (parseInt(atype)) {
                var title = "";
                var cbuton = "";
                if (parseInt(atype) == 1) {
                    title = $filter("translate")("Are you sure you want to edit this bid?");
                    cbuton = "Edit";
                } else {
                    title = $filter("translate")("Are you sure you want to withdraw this bid?");
                    cbuton = "Withdraw";
                }
                SweetAlert.swal({
                    title: title,
                    text: "",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "OK",
                    cancelButtonText: "Cancel",
                    closeOnConfirm: true,
                    animation:false,
                }, function(isConfirm) {
                    if (isConfirm) {
                        var flashMessage = "";
                        if (parseInt(atype) == 1) {
                            $state.go('Bid_ProjectView', {
                                id: $scope.mybids[indexVal]['project']['id'],
                                slug: $scope.mybids[indexVal]['project']['slug'],
                                placebid: true,
                                edit: true
                            })
                        } else {
                            var params ={}
                            params.is_freelancer_withdrawn = 1;
                            BidRetake.put({
                                id: bidId
                            }, params, function(response) {
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
                    }
                });
            }
        }
    })