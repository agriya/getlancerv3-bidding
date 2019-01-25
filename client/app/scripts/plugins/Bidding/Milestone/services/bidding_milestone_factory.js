'use strict';
/**
 * @ngdoc function
 * @name getlancerApp.controller:BiddingMilestoneCtrl
 * @description
 * # QuoteServicePhotosManageController
 * Controller of the getlancerApp
 */
angular.module('getlancerApp.Bidding.Milestone')
    .factory('Milestone', ['$resource', function($resource) {
        return $resource('/api/v1/milestones/:id', {
            id: '@id'
        }, {
            put: {
                method: 'PUT'
            },
            get: {
                method: 'GET'
            },
            delete: {
                method: 'DELETE'
            }
        });
  }])
    .factory('BidMilestone', ['$resource', function($resource) {
        return $resource('/api/v1/milestones', {}, {
            get: {
                method: 'GET'
            },
            post: {
                method: 'POST'
            },
        });
  }])
    .factory('MeMilestone', ['$resource', function($resource) {
        return $resource('/api/v1/me/milestones', {}, {
            get: {
                method: 'GET'
            }
        });
  }])
    .factory('MilestoneStatus', ['$resource', function($resource) {
        return $resource('/api/v1/milestone_statuses', {}, {
            get: {
                method: 'GET'
            }
        });
  }])
  .factory('GetMilestoneStatus', ['$resource', function($resource) {
        return $resource('/api/v1/milestone_statuses', {}, {
            get: {
                method: 'GET'
            }
        });
  }])
