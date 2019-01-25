'use strict';
angular.module('getlancerApp.Bidding.Dispute')
    .factory('DisputeStatus', ['$resource', function($resource) {
        return $resource('/api/v1/bids/:id/dispute_open_types', {}, {
            get: {
                method: 'GET'
            }
        });
  }])
    .factory('ProjectDispute', function($resource) {
        return $resource('/api/v1/project_disputes', {}, {
            get: {
                method: 'GET'
            },
            post: {
                method: 'POST'
            }
        })
    })