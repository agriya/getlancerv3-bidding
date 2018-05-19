'use strict';
/**
 * @ngdoc  service
 * @name getlancerApp.jobsController
 * @description
 * # jobsController
 * Factory in the  getlancerApp
 */
angular.module('getlancerApp.Bidding')
    .factory('Projects', ['$resource', function($resource) {
        return $resource('/api/v1/projects', {}, {
            get: {
                method: 'GET'
            },
            post: {
                method: 'POST'
            }
        });
  }])
    .factory('DelProject', ['$resource', function($resource) {
        return $resource('/api/v1/projects/:id', {}, {
            delete: {
                method: 'DELETE'
            }
        });
  }])
    .factory('ProjectEditView', ['$resource', function($resource) {
        return $resource('/api/v1/projects/:id', {}, {
            get: {
                method: 'GET'
            },
            put: {
                method: 'PUT'
            }
        });
  }])
    .factory('ProjectStatus', ['$resource', function($resource) {
        return $resource('/api/v1/project_statuses', {}, {
            get: {
                method: 'GET'
            }
        });
  }])
    .factory('ProjectStatusUpdate', ['$resource', function($resource) {
        return $resource('/api/v1/projects/:id/update_status', {
            id: '@id'
        }, {
            put: {
                method: 'PUT'
            }
        });
  }])
    .factory('ProjectSkills', ['$resource', function($resource) {
        return $resource('/api/v1/skills', {}, {
            get: {
                method: 'GET'
            }
        });
  }])
    .factory('ProjectCategory', ['$resource', function($resource) {
        return $resource('/api/v1/project_categories', {}, {
            get: {
                method: 'GET'
            }
        });
  }])
    .factory('ProjectRange', ['$resource', function($resource) {
        return $resource('/api/v1/project_ranges', {}, {
            get: {
                method: 'GET'
            }
        });
  }])
    .factory('ProjectBids', ['$resource', function($resource) {
        return $resource('/api/v1/bids?project_id=:id', {}, {
            get: {
                method: 'GET'
            }
        });
  }])
    .factory('MyProjects', ['$resource', function($resource) {
        return $resource('/api/v1/me/projects', {}, {
            get: {
                method: 'GET'
            }
        });
  }])
   .factory('MyMilestone', ['$resource', function($resource) {
        return $resource('/api/v1/me/milestones', {}, {
            get: {
                method: 'GET'
            }
        });
  }])
   .factory('MyInvoices', ['$resource', function($resource) {
        return $resource('/api/v1/me/project_bid_invoices', {}, {
            get: {
                method: 'GET'
            }
        });
  }])
//   .factory('BidsStatus', ['$resource', function($resource) {
//         return $resource('/api/v1/bids/:id/project_stats', {}, {
//             get: {
//                 method: 'GET'
//             }
//         });
//   }])
    .factory('UpdateProjectStatus', ['$resource', function($resource) {
        return $resource('/api/v1/projects/:id/update_status', {
            id: '@id'
        }, {
            put: {
                method: 'PUT'
            }
            
        });
  }])
    .factory('BidPost', ['$resource', function($resource) {
        return $resource('/api/v1/bids', {}, {
            post: {
                method: 'POST'
            }
        });
  }])
    .factory('BidRetake', ['$resource', function($resource) {
        return $resource('/api/v1/bids/:id', {}, {
            delete: {
                method: 'DELETE'
            },
            put: {
                method: 'PUT'
            }
        });
  }])
      
    .factory('EditBid', ['$resource', function($resource) {
        return $resource('/api/v1/bids?project_id=:id&user_id=:user&fields=id,amount,duration,description', {}, {
            get: {
                method: 'GET'
            }
        });
  }])
    .factory('BidUpdate', ['$resource', function($resource) {
        return $resource('/api/v1/bids/:id', {}, {
            put: {
                method: 'PUT'
            }
        });
  }])
    .factory('AwardedBids', ['$resource', function($resource) {
        return $resource('/api/v1/bids?project_id=:id&bid_status_id=:status', {
            id: '@id',
            status: '@status'
        }, {
            get: {
                method: 'GET'
            }
        });
  }])
    .factory('MyBids', ['$resource', function($resource) {
        return $resource('/api/v1/me/bids', {}, {
            get: {
                method: 'GET'
            }
        });
  }])
    .factory('UpdateBidStatus', ['$resource', function($resource) {
        return $resource('/api/v1/bids/:id/update_status', {
            id: '@id'
        }, {
            put: {
                method: 'PUT'
            }
        });
  }])
    .factory('Messages', ['$resource', function($resource) {
        return $resource('/api/v1/messages/:id', {}, {
            get: {
                method: 'GET'
            },
            post: {
                method: 'POST'
            }
        });
  }])
    .factory('Bookmarks', ['$resource', function($resource) {
        return $resource('/api/v1/projects', {}, {
            get: {
                method: 'GET'
            }
        });
  }])
    .factory('Files', ['$resource', function($resource) {
        return $resource('/api/v1/project_attachment/:id', {}, {
            get: {
                method: 'GET'
            },
            post: {
                method: 'POST'
            }
        });
  }])
    .factory('FollowUser', ['$resource', function($resource) {
        return $resource('/api/v1/followers', {}, {
            post: {
                method: 'POST'
            }
        });
  }])
    .factory('FollowUserDelete', ['$resource', function($resource) {
        return $resource('/api/v1/followers/:id', {
            id: '@id'
        }, {
            delete: {
                method: 'DELETE'
            }
        });
  }])
   .factory('ProjectStatsCount', ['$resource', function($resource) {
        return $resource('/api/v1/employer/me/projects/stats', {}, {
            get: {
                method: 'GET'
            }
        });
  }])
   .factory('EmployerStatsCount', ['$resource', function($resource) {
        return $resource('/api/v1/employer/me/pay_stats', {}, {
            get: {
                method: 'GET'
            }
        });
  }])
   .factory('FreelancerStatusCount', ['$resource', function($resource) {
        return $resource('/api/v1/freelancer/me/bids/stats', {}, {
            get: {
                method: 'GET'
            }
        });
  }])
    .factory('projectMilestone', ['$resource', function($resource) {
        return $resource('/api/v1/employer/:id/milestones', {}, {
            get: {
                method: 'GET'
            }
        });
  }])
    .factory('projectInvoice', ['$resource', function($resource) {
        return $resource('/api/v1/employer/:id/project_bid_invoices', {}, {
            get: {
                method: 'GET'
            }
        });
  }])
    .factory('UserFactory', ['$resource', function($resource) {
        return $resource('/api/v1/me', {}, {
            get: {
                method: 'GET'
            }
        });
  }])
    .factory('biddingReviewFactory', ['$resource', function($resource) {
        return $resource('/api/v1/reviews/:id', {
            id: '@id'
        }, {
            get: {
                method: 'GET'
            },
            post: {
                method: 'POST'
            },
            put: {
                method: 'PUT'
            }
        });
  }])
    .factory('biddingProjectFactory', ['$resource', function($resource) {
        return $resource('/api/v1/projects/:id', {}, {
            get: {
                method: 'GET'
            }
        });
  }])
	 .factory('AutocompleteUsers', ['$resource', function($resource) {
        return $resource('/api/v1/users?type=employer', {}, {
            get: {
                method: 'GET'
            }
        });
  }])
   .factory('biddingProjectTransactions', ['$resource', function($resource) {
        return $resource('/api/v1/users/:user_id/transactions', {}, {
             user_id: '@user_id'
        }, {
            get: {
                method: 'GET'
            }
        });
  }])
   .factory('Invoice', ['$resource', function($resource) {
        return $resource('/api/v1/project_bid_invoices/:id', {}, {
            get: {
                method: 'GET'
            },
            post: {
                method: 'POST'
            },
            put: {
                method: 'PUT',
                params: {
                    id: '@id'
                }
            },
            delete: {
                method: 'DELETE',
                params: {
                    id: '@id'
                }
            },
        });
  }])
   .factory('MilestoneStatusChange', ['$resource', function($resource) {
        return $resource('/api/v1/milestones/:id/update_status', {
            id: '@id'
        }, {
            put: {
                method: 'PUT'
            }
        });
  }])