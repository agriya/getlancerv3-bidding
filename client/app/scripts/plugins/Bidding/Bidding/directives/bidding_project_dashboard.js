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
  .directive('biddingProjectDashboard', function () {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'scripts/plugins/Bidding/Bidding/views/default/bidding_project_dashboard.html',
      controller: 'biddingProjectDashboardCtrl'
    }
  })
  .controller('biddingProjectDashboardCtrl', function ($rootScope, $scope, $state, $filter, flash, $window, $cookies, MyProjects, SweetAlert, DelProject, ProjectStatsCount, ProjectStatusConstant, ProjectStatusUpdate, MyBids, UpdateProjectStatus, UpdateBidStatus, projectMilestone, projectInvoice, MilestoneStatusChange, MyMilestone, MyInvoices, MilestoneStatusConstant, BidStatusConstant, BidRetake, EmployerStatsCount, FreelancerStatusCount, $uibModal, $stateParams) {
    $rootScope.header = $rootScope.settings.SITE_NAME + ' | ' + $filter("translate")("My Projects");
    $scope.projectConstant = ProjectStatusConstant;
    $scope.portal = $window.localStorage.getItem('portal');
    $scope.auth = JSON.parse($cookies.get('auth'));
    $scope.renderSubPage = 'scripts/plugins/Bidding/Bidding/views/default/my_bids_current_projects.html';
    $scope.MilestoneStatusConstant = MilestoneStatusConstant;
    $scope.BidStatusConstant = BidStatusConstant;
    $scope.milestonePage = function (id, action, type) {
      if (type == 1) {
        $state.go('Bid_ProjectView', {
          id: id,
          action: 'milestones'
        })
      }
      else if (type == 2) {
        $state.go('Bid_ProjectView', {
          id: id,
          action: 'invoices'
        })
      }
      else if (type == 3) {
        $state.go('Bid_ProjectView', {
          id: id,
          action: 'dispute'
        }, {
            reload: true
          });
      }
      else if (type == 4) {
        $state.go('Bid_ProjectView', {
          id: id,
          action: 'messages'
        })
      }

    };

    $scope.milestoneStatueChange = function (milestoneId, statusId, status) {
      $scope.milestoneid = milestoneId;
      if (statusId !== 'pay') {
        SweetAlert.swal({
          title: $filter("translate")('Are you sure you want to do this action?'),
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
            if (status === 'workcompleted') {
              MilestoneStatusChange.put({ id: milestoneId, milestone_status_id: $scope.MilestoneStatusConstant.Completed}, function (response) {
                if (response.error.code === 0) {
                  MilestoneStatusChange.put({ id: milestoneId, milestone_status_id: statusId }, function (response) {
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
              MilestoneStatusChange.put({ id: milestoneId, milestone_status_id: statusId}, function (response) {
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
    $scope.$on('isupdated', function(event, data) {
            $state.reload();
        });
    $scope.bidcount = function () {
      $rootScope.scrollBids = true;
    };

    $scope.CancelProject = function (project_id) {
      SweetAlert.swal({
        title: $filter("translate")("Are you sure you want to cancel this project?"),
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        closeOnConfirm: true,
        animation: false,
      }, function (isConfirm) {
        if (isConfirm) {
          ProjectStatusUpdate.put({ id: project_id, project_status_id: $scope.projectConstant.EmployerCanceled }, function (response) {
            if (response.error.code === 0) {
              flashMessage = $filter("translate")("Your project has been cancelled successfully.");
              flash.set(flashMessage, 'success', false);
              $state.reload();
            } else {
              flashMessage = $filter("translate")("Your project couldn't cancelled. Please try again.");
              flash.set(flashMessage, 'error', false);
              $state.reload();
            }
          });
        }
      });
    };
  /*  project reopen function*/
      $scope.reopen = function (projid) {
              SweetAlert.swal({
            title: $filter("translate")('Are you sure you want to reopen this project?'),
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
                                UpdateProjectStatus.put({
                                    id: projid,
                                    project_status_id: ProjectStatusConstant.OpenForBidding,
                                }, function (response) {
                                    if (parseInt(response.error.code) === 0) {
                                        flash.set($filter("translate")('Project reopen successfully'), 'success', false);
                                        $state.reload();
                                    } else {
                                        flash.set($filter("translate")('Project reopen failed'), 'error', false);
                                    }
                              })
                        }
                    });
                };

    $scope.AcceptCompleted = function (project_id, type) {
      var alertTitle
      if (type === 'accept') {
        alertTitle = "Are you sure you completed this project?"
      } else {
        alertTitle = "Are you sure you want to cancel this request?"
      }
      SweetAlert.swal({
        title: $filter("translate")(alertTitle),
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        closeOnConfirm: true,
        animation: false,
      }, function (isConfirm) {
        if (isConfirm) {
          var params = {};
          if (type === 'accept') {
            params.id = project_id;
            params.project_status_id = $scope.projectConstant.Completed;
          } else {
            params.id = project_id;
            params.project_status_id = $scope.projectConstant.UnderDevelopment;
          }
          ProjectStatusUpdate.put(params, function (response) {
            if (response.error.code === 0) {
              var flgmsg = '';
              flgmsg = (params.project_status_id === $scope.projectConstant.Completed) ? 'Your project has been Completed successfully.' : 'Project moved to under developement successfully.'
              flashMessage = $filter("translate")(flgmsg);
              flash.set(flashMessage, 'success', false);
              $state.reload();
            }
            else {
              flashMessage = (response.error.message);
              flash.set(flashMessage, 'error', false);
              $state.reload();
            }
          });
        }
      });
    };
    // $scope.getMilestone = function (tabType) {
    //   projectMilestone.get({
    //     id: $scope.auth.id
    //   }, function (response) {
    //     console.log(response.data);
    //     if (parseInt(response.error.code) === 0) {
    //       $scope.milestones = response.data; 
    //     }
    //   }, function (error) {
    //     console.log(error);
    //   });
    // };

    $scope.endpoint = 'projects';
    $scope.GetProjectStatus = function () {
      $scope.loader = true;
      ProjectStatsCount.get({
        id: $scope.auth.id
      }, function (response) {
        $scope.loader = false;
        if (parseInt(response.error.code) === 0) {
          $scope.projectStatus = $filter('orderBy')(response.data, 'id');
        }
      }, function (error) {
        console.log(error);
      });
    };
    if ($rootScope.Employer === true) {
      $scope.EmployerMilestoneCount = function () {
        EmployerStatsCount.get(function (response) {
          $scope.employer_count = response.data;
        });
      };
    };
    $scope.FreelancerMilestoneCount = function () {
      FreelancerStatusCount.get(function (response) {
        $scope.freelancer_count = response.data;
      });
    };

    //  if($rootScope.Employer === true){
    $scope.getProjects = function (tabType) {
      $scope.loader = true;
      $scope.tabType = tabType;
        $scope.GetProjectStatus();
      if ($rootScope.Employer === true) {
        $scope.EmployerMilestoneCount();
        if (!isNaN(tabType)) {
          if (tabType === 1) {
            $scope.project_status = "Draft";
            if ($state.params.status === undefined || $state.params.status !== 'draft_payment_pending') {
              $state.go('user_dashboard', {
                status: 'draft_payment_pending',
                type: 'my_projects'
              }, {
                  notify: false
                });
            }
            // }
            //  else if (tabType === 'Milestone') {
            //   console.log(tabType)
            //     $state.go('user_dashboard', {
            //       status: 'mile_stone',
            //       type: 'my_projects'
            //     }, {
            //         notify: false
            //       });
            //   }
          } else if (tabType === 3) {
            $scope.project_status = "waiting for approval ";
            if ($state.params.status === undefined || $state.params.status !== 'waiting_for_approval') {
              $state.go('user_dashboard', {
                status: 'waiting_for_approval',
                type: 'my_projects'
              }, {
                  notify: false
                });
            }
          } else if (tabType === 5) {
            $scope.project_status = "Bidding Expired";
            if ($state.params.status === undefined || $state.params.status !== 'close_expiry') {
              $state.go('user_dashboard', {
                status: 'close_expiry',
                type: 'my_projects'
              }, {
                  notify: false
                });
            }
          } else if (tabType === 6) {
            $scope.project_status = "Winner Selected";
            if ($state.params.status === undefined || $state.params.status !== 'winner_selected') {
              $state.go('user_dashboard', {
                status: 'winner_selected',
                type: 'my_projects'
              }, {
                  notify: false
                });
            }
          } else if (tabType === 11) {
            $scope.project_status = "Under Development";
            if ($state.params.status === undefined || $state.params.status !== 'under_development') {
              $state.go('user_dashboard', {
                status: 'under_development',
                type: 'my_projects'
              }, {
                  notify: false
                });
            }
          } else if (tabType === 14) {
            $scope.project_status = "Pending Review";
            if ($state.params.status === undefined || $state.params.status !== 'final_review') {
              $state.go('user_dashboard', {
                status: 'final_review',
                type: 'my_projects'
              }, {
                  notify: false
                });
            }
          } else if (tabType === 16) {
            $scope.project_status = "Closed";
            if ($state.params.status === undefined || $state.params.status !== 'closed') {
              $state.go('user_dashboard', {
                status: 'closed',
                type: 'my_projects'
              }, {
                  notify: false
                });
            }
          }
          else if (tabType === 9) {
            $scope.project_status = "Closed / Expired";
            if ($state.params.status === undefined || $state.params.status !== 'bid_closed') {
              $state.go('user_dashboard', {
                status: 'bid_closed',
                type: 'my_projects'
              }, {
                  notify: false
                });
            }
          } else if (tabType === 13) {
            $scope.project_status = "Canceled";
            if ($state.params.status === undefined || $state.params.status !== 'admin_cancel') {
              $state.go('user_dashboard', {
                status: 'admin_cancel',
                type: 'my_projects'
              }, {
                  notify: false
                });
            }
          } else if (tabType === 12) {
            $scope.project_status = "Mutually Canceled";
            if ($state.params.status === undefined || $state.params.status !== 'cancel') {
              $state.go('user_dashboard', {
                status: 'cancel',
                type: 'my_projects'
              }, {
                  notify: false
                });
            }
          } else {
            $scope.project_status = "Open for Bidding";
            if ($state.params.status === undefined || $state.params.status !== 'open_bidding') {
              $state.go('user_dashboard', {
                status: 'open_bidding',
                type: 'my_projects'
              }, {
                  notify: false
                });
            }
          }

          $scope.params = {};
          if (parseInt(tabType) === ProjectStatusConstant.Draft) {
            $scope.params.project_status_id = ProjectStatusConstant.Draft + ',' + ProjectStatusConstant.PaymentPending;
          } else if (parseInt(tabType) === ProjectStatusConstant.CanceledByAdmin) {
            $scope.params.project_status_id = ProjectStatusConstant.EmployerCanceled + ',' + ProjectStatusConstant.MutuallyCanceled + ',' + ProjectStatusConstant.CanceledByAdmin;
          } else if (parseInt(tabType) === ProjectStatusConstant.BiddingClosed) {
            $scope.params.project_status_id = ProjectStatusConstant.BiddingClosed + ',' + ProjectStatusConstant.BiddingExpired;
          } else if (parseInt(tabType) === ProjectStatusConstant.UnderDevelopment) {
            $scope.params.project_status_id = ProjectStatusConstant.UnderDevelopment + ',' + ProjectStatusConstant.Completed;
          } else {
            $scope.params.project_status_id = (tabType === -1) ? ProjectStatusConstant.OpenForBidding : tabType;
          }
          $scope.params.page =  $scope.projectcurrentPage;
          MyProjects.get($scope.params, function (response) {
             if (angular.isDefined(response._metadata)) {
                    $scope.projectcurrentPage = response._metadata.current_page;
                    $scope.totalItems = response._metadata.total;
                    $scope.itemsPerPage = response._metadata.per_page;
                    $scope.noOfPages = response._metadata.last_page;
                }
              if (angular.isDefined(response.data)) {
                $scope.projects = response.data;
                angular.forEach($scope.projects, function (value) {
                  $rootScope.dispute_project = value.is_dispute;
                });
              }
            $scope.loader = false;
            if (parseInt(response.error.code) === 0) {
              // $scope.projects = response.data;
              $scope.endpoint = 'projects';
            }
          }, function (error) {
            console.log(error);
          });
        }
        // $scope.getbidStatus();
        if (tabType === 'milestone') {
          $scope.project_status = "Milestones";
          if ($state.params.status === undefined || $state.params.status !== 'milestone') {
            $state.go('user_dashboard', {
              status: 'milestone',
              type: 'projects'
            }, { reload: true });
          }
          projectMilestone.get({ id: $scope.auth.id }, function (response) {
            $scope.loader = false;
            if (parseInt(response.error.code) === 0) {
              $scope.milestones = response.data;
              $scope.endpoint = 'milestone';
              $scope.GetProjectStatus();
            }
          }, function (error) { });
        } else if (tabType === 'invoice') {
          $scope.project_status = "Invoices";
          if ($state.params.status === undefined || $state.params.status !== 'invoice') {
            $state.go('user_dashboard', {
              status: 'invoice',
              type: 'projects'
            }, { reload: true });
          }
          $scope.invoices = [];
          projectInvoice.get({ id: $scope.auth.id }, function (response) {
            $scope.GetProjectStatus();
            $scope.loader = false;
            if (parseInt(response.error.code) === 0) {
              $scope.invoices = response.data;
              $scope.endpoint = 'invoice';
            }
          }, function (error) { })
        }
      } else {

        // if (tabType === 'active') {
        //   $scope.renderSubPage = 'scripts/plugins/Bidding/Bidding/views/default/my_bids_active.html';
        //   $scope.project_status = "Active";
        //   if ($state.params.status === undefined || $state.params.status !== 'active') {
        //     $state.go('user_dashboard', {
        //       status: 'active_bids',
        //       type: 'projects'
        //     }, {
        //         notify: false
        //       });
        //   }
        // } 
        if (tabType === 'my_bids') {
          $scope.project_status = "Current Projects";
          $scope.renderSubPage = 'scripts/plugins/Bidding/Bidding/views/default/my_bids_current_projects.html';
          if ($state.params.status === undefined || $state.params.status !== 'my_bids') {
            $state.go('user_dashboard', {
              status: 'my_bids',
              type: 'projects'
            }, {
                notify: false
              });
          }
        }

        else if (tabType === 'active') {
          $scope.project_status = "Active Bids";
          $scope.renderSubPage = 'scripts/plugins/Bidding/Bidding/views/default/my_bids_active.html';
          if ($state.params.status === undefined || $state.params.status !== 'active_bids') {
            $state.go('user_dashboard', {
              status: 'active_bids',
              type: 'projects'
            }, {
                notify: false
              });
          }
        }

        else if (tabType === 'past_projects') {
          $scope.renderSubPage = 'scripts/plugins/Bidding/Bidding/views/default/my_bids_past_projects.html';
          $scope.project_status = "Past Projects";
          if ($state.params.status === undefined || $state.params.status !== 'past_projects') {
            $state.go('user_dashboard', {
              status: 'past_projects',
              type: 'projects'
            }, {
                notify: false
              });
          }
        }
        var params = {};
        params.page = ($scope.currentPage !== undefined) ? $scope.currentPage : 1;
        if ($state.params.status === 'my_bids') {
          params.type = 'current_work';
        }
        if ($state.params.status === 'active_bids') {
          params.type = 'active';
        }
        if ($state.params.status === 'past_projects') {
          params.type = 'past_projects';
        }
        // if(angular.isDefined($rootScope.Freelancer)){}
        MyBids.get(params, function (response) {
          $scope.FreelancerMilestoneCount();
          $scope.loader = false;
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

        if (tabType === 'milestones') {
          $scope.project_status = "Milestones";
          $scope.renderSubPage = 'scripts/plugins/Bidding/Bidding/views/default/milestone_supplier_portal.html';
          if ($state.params.status === undefined || $state.params.status !== 'milestone') {
            $state.go('user_dashboard', {
              status: 'milestones',
              type: 'projects'
            }, {
                notify: false
              });
          } MyMilestone.get({ id: $scope.auth.id, page: $scope.currentPageMilestone }, function (response) {
            if (parseInt(response.error.code) === 0) {
              $scope.my_milestones = response.data;
              $scope.currentPageMilestone = response._metadata.current_page;
              $scope.totalItemsMilestone = response._metadata.total;
              $scope.itemsPerPageMilestone = response._metadata.per_page;
              $scope.noOfPagesMilestone = response._metadata.last_page;
              $scope.endpoint = 'milestone';
            }
          }, function (error) { });
        } else if (tabType === 'invoices') {
          $scope.renderSubPage = 'scripts/plugins/Bidding/Bidding/views/default/supplier_portal_invoice.html';
          $scope.project_status = "Invoices";
          if ($state.params.status === undefined || $state.params.status !== 'invoice') {
            $state.go('user_dashboard', {
              status: 'invoices',
              type: 'projects'
            }, {
                notify: false
              });
          } MyInvoices.get({ id: $scope.auth.id }, function (response) {
            if (parseInt(response.error.code) === 0) {
              $scope.my_invoices = response.data;
              $scope.endpoint = 'milestone';
            }
          }, function (error) { });
        }
      }
    };
    /* pagination function */
    $scope.paginate = function (page) {
      $scope.currentPageMilestone = parseInt(page);
      $scope.getProjects('milestone');
    };
    /* common pagination function*/
    $scope.pagination = function (page) {
      $scope.projectcurrentPage = parseInt(page);
          if ($state.params.status) {
          if ($state.params.status === 'draft_payment_pending') {
            $scope.getProjects(1);
          } else if ($state.params.status === 'waiting_for_approval') {
            $scope.getProjects(3);
          } else if ($state.params.status === 'open_bidding') {
            $scope.getProjects(4);
          } else if ($state.params.status === 'close_expiry') {
            $scope.getProjects(5);
          } else if ($state.params.status === 'winner_selected') {
            $scope.getProjects(6);
          } else if ($state.params.status === 'under_development') {
            $scope.getProjects(11);
          } else if ($state.params.status === 'final_review') {
            $scope.getProjects(14);
          } else if ($state.params.status === 'closed') {
            $scope.getProjects(16);
          } else if ($state.params.status === 'milestone') {
            $scope.getProjects('milestone');
          }
          else if ($state.params.status === 'invoice') {
            $scope.getProjects('invoice');
          }
          else if ($state.params.status === 'bid_closed') {
            $scope.getProjects(9);
          } else if ($state.params.status === 'admin_cancel') {
            $scope.getProjects(13);
          } else if ($state.params.status === 'cancel') {
            $scope.getProjects(10);
          } else if ($state.params.status === 'my_bids') {
            $scope.getProjects('my_bids');
          } else if ($state.params.status === 'past_projects') {
            $scope.getProjects('past_projects');
          }
          else if ($state.params.status === 'milestones') {
            $scope.getProjects('milestones');
          } else if ($state.params.status === 'invoices') {
            $scope.getProjects('invoices');
          }
          else if ($state.params.status === 'active_bids') {
            $scope.getProjects('active');
          }
          else if ($state.params.status === 'past_projects') {
            $scope.getProjects('past_projects');
          } else {
            if ($scope.portal === '"Employer"') {
              $scope.getProjects(4);
            } else {
              $scope.getProjects('my_bids');
            }
          }
        }
        else {
          if ($scope.portal === '"Employer"') {
            $scope.getProjects(4);
          } else {
            $scope.getProjects('my_bids');
          }
        }
    };
    // };
    if ($state.params.status) {
      if ($state.params.status === 'draft_payment_pending') {
        $scope.getProjects(1);
      } else if ($state.params.status === 'waiting_for_approval') {
        $scope.getProjects(3);
      } else if ($state.params.status === 'open_bidding') {
        $scope.getProjects(4);
      } else if ($state.params.status === 'close_expiry') {
        $scope.getProjects(5);
      } else if ($state.params.status === 'winner_selected') {
        $scope.getProjects(6);
      } else if ($state.params.status === 'under_development') {
        $scope.getProjects(11);
      } else if ($state.params.status === 'final_review') {
        $scope.getProjects(14);
      } else if ($state.params.status === 'closed') {
        $scope.getProjects(16);
      } else if ($state.params.status === 'milestone') {
        $scope.getProjects('milestone');
      }
      else if ($state.params.status === 'invoice') {
        $scope.getProjects('invoice');
      }
      else if ($state.params.status === 'bid_closed') {
        $scope.getProjects(9);
      } else if ($state.params.status === 'admin_cancel') {
        $scope.getProjects(13);
      } else if ($state.params.status === 'cancel') {
        $scope.getProjects(10);
      } else if ($state.params.status === 'my_bids') {
        $scope.getProjects('my_bids');
      } else if ($state.params.status === 'past_projects') {
        $scope.getProjects('past_projects');
      }
      else if ($state.params.status === 'milestones') {
        $scope.getProjects('milestones');
      } else if ($state.params.status === 'invoices') {
        $scope.getProjects('invoices');
      }
      else if ($state.params.status === 'active_bids') {
        $scope.getProjects('active');
      }
      else if ($state.params.status === 'past_projects') {
        $scope.getProjects('past_projects');
      } else {
        if ($scope.portal === '"Employer"') {
          $scope.getProjects(4);
        } else {
          $scope.getProjects('my_bids');
        }
      }
    }
    else {
      if ($scope.portal === '"Employer"') {
        $scope.getProjects(4);
      } else {
        $scope.getProjects('my_bids');
      }
    }
    var flashMessage;
    $scope.deleteProject = function (project_id) {
      SweetAlert.swal({
        title: $filter("translate")("Are you sure you want to delete?"),
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
          DelProject.delete({
            id: project_id
          }, function (response) {
            if (response.error.code === 0) {
              flashMessage = $filter("translate")("Your project has been deleted successfully.");
              flash.set(flashMessage, 'success', false);
              $state.reload();
            } else {
              flashMessage = $filter("translate")("Your project couldn't deleted. Please try again.");
              flash.set(flashMessage, 'error', false);
              $state.reload();
            }
          });
        }
      });
    };
    $scope.withdrawfreelancer = function (rtype, projectid) {
      SweetAlert.swal({
        title: (parseInt(rtype) === 1) ? $filter("translate")('Are you sure you want to choose a new freelancer?') : $filter("translate")('Are you sure you want to reopen this project?'),
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
          if (parseInt(rtype) === 1) {
            UpdateProjectStatus.put({
              id: projectid,
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
    $scope.cancelProject = function (project_id) {
      SweetAlert.swal({
        title: $filter("translate")("Are you sure you want to cancel this project?"),
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        closeOnConfirm: true,
        animation: false,
      }, function (isConfirm) {
        ProjectStatusUpdate.put({
          id: project_id,
          project_status_id: $scope.projectConstant.EmployerCanceled
        }, function (response) {
          if (response.error.code === 0) {
            flashMessage = $filter("translate")("Your project has been cancelled successfully.");
            flash.set(flashMessage, 'success', false);
            $state.reload();
          } else {
            flashMessage = $filter("translate")("Your project couldn't cancelled. Please try again.");
            flash.set(flashMessage, 'error', false);
            $state.reload();
          }
        });
      });
    };
    /* For Contact Winner */
    $scope.contactFreelancer = function (projectbidid, projectname, projectbidusername, disputestatus) {
      $scope.modalInstance = $uibModal.open({
        templateUrl: 'scripts/plugins/Bidding/Bidding/views/default/contact_freelancer.html',
        animation: false,
        controller: function ($scope, $rootScope, $window, $stateParams, $filter, md5, $state, Upload, $timeout, $uibModal, $uibModalStack, Messages, biduser, authuser) {
          $rootScope.project_dispute = disputestatus;
          var flashMessage = "";
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
              contactData.foreign_id = projectbidid;
              contactData.to_user_id = projectbidusername;
              contactData.message = $scope.data.message;
              contactData.class = 'Bid';
              contactData.subject = projectname;
              Messages.post(contactData, function (response) {
                /*   $scope.closemodel();*/
                 $scope.contact_freelancer = false;
                if (response.error.code === 0) {
                  flashMessage = $filter("translate")("Message sent successfully.");
                  flash.set(flashMessage, 'success', false);
                  $scope.ContactMessages = [];
                  $scope.GetConactMessage();
                  $scope.data.message = '';
                  $scope.contact_freelancer = false;
                  $scope.Contactfrm.$setPristine();
                  $scope.Contactfrm.$setUntouched();
                } else {
                  flashMessage = $filter("translate")(response.error.message);
                  flash.set(flashMessage, 'error', false);
                }
              });
            };
          };
          /*      get conact message function */
          $scope.GetConactMessage = function () {
            var conactparams = {};
            conactparams.foreign_id = projectbidid;
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
          $scope.MessagePage = 1;
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
    /* bidding awared process */
    $scope.awardedprocess = function (ftype, projectbidid, bidid) {
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
          var msgstr = "";
          if (parseInt(ftype) === 1) {
            UpdateProjectStatus.put({
              id: projectbidid,
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
            params.id = bidid;
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
    $scope.bidAction = function (indexVal, atype, bidId) {
      if (parseInt(atype)) {
        var title = "";
        var cbuton = "";
        if (parseInt(atype) === 1) {
          title = $filter("translate")("Are you sure you want to edit this bid?");
        } else if (parseInt(atype) === 2) {
          title = $filter("translate")("Are you sure you want to withdraw this bid?");
        } else if (parseInt(atype) === 3) {
          title = $filter("translate")("Are you sure you want to accept this project?");
        } else if (parseInt(atype) === 4) {
          title = $filter("translate")("Are you sure you want to reject this project?");
        } else if (parseInt(atype) === 5) {
          title = $filter("translate")("Are you sure you want to withdraw this bid?");
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
          animation: false,
        }, function (isConfirm) {
          if (isConfirm) {
            var flashMessage = "";
            if (parseInt(atype) === 1) {
              $state.go('Bid_ProjectView', {
                id: $scope.mybids[indexVal]['project']['id'],
                slug: $scope.mybids[indexVal]['project']['slug'],
                placebid: true,
                edit: true
              })
            } else if (parseInt(atype) === 2) {
              var params = {};
              params.is_freelancer_withdrawn = 1;
              BidRetake.put({
                id: $scope.mybids[indexVal]['id']
              }, params, function (response) {
                if (response.error.code === 0) {
                  flashMessage = $filter("translate")("Your bid withdrawn successfully.");
                  flash.set(flashMessage, 'success', false);
                  $state.reload();
                } else {
                  flashMessage = $filter("translate")("Please try again.");
                  flash.set(flashMessage, 'error', false);
                  $state.reload();
                }
              });
            } else if (parseInt(atype) === 3) {
              $scope.activeBidChange(3, indexVal);
            } else if (parseInt(atype) === 4) {
              $scope.activeBidChange(4, indexVal);
            }
          }
        });
      }
    };

    $scope.activeBidChange = function (tval, indexVal) {
      var flashMessage = "";
      if (parseInt(tval) === 3) {
        UpdateProjectStatus.put({
          'id': $scope.mybids[indexVal]['project']['id'],
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
      } else if (parseInt(tval) === 4) {
        UpdateBidStatus.put({
          'id': $scope.mybids[indexVal]['id'],
          is_offered_rejected: 1
        }, function (response) {
          if (parseInt(response.error.code) === 0) {
            flashMessage = $filter("translate")('You have successfully rejected this project.');
            flash.set(flashMessage, 'success', false);
            $state.reload();
          } else {
            flashMessage = $filter("translate")('You have successfully rejected this project.');
            flash.set(flashMessage, 'error', false);
          }
        }, function (error) {
          console.log('BiddingAwardDirective', error);
        })
      }
    };
  })



  .directive('biddingActiveBids', function ($rootScope, $state, $filter, flash, MyBids, BidMilestone, BidRetake, MeMilestone, MilestoneStatusConstant, MeInvoice, SweetAlert) {
    return {
      restrict: 'E',
      templateUrl: ''
    }
  })

  .directive('biddingDashboarProjectAction', function () {
    return {
      restrict: 'EA',
      templateUrl: 'scripts/plugins/Bidding/Bidding/views/default/bidding_dasboard_project_action.html',
      scope: {
        /*project: '@',*/
        projstatus: '@',
        projid: '@',
        projname: '@',
        projbidid: '@',
        projectstatusid: '@',
        projisreachedresponseenddateforfreelancer: '@',
        bidusername: '@',
        disputestatus: '@',
      },
      controller: 'biddingProjectDashboardCtrl'
      // controller: function ($rootScope, $scope, $filter, ProjectStatusConstant) {
      //   $scope.ProjectStatusConstant = ProjectStatusConstant;
      // }

    }
  })