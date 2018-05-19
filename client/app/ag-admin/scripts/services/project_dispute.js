'use strict';
/**
 * @ngdoc service
 * @name getlancerv3.servicelocation
 * @description
 * # paymentGateway
 * Factory in the getlancerv3.
 */
angular.module('base')
    .factory('DisputeStatus', ['$resource', function($resource) {
        return $resource('/api/v1/bids/:id/dispute_open_types', {}, {
            get: {
                method: 'GET'
            }
        });
  }])
    .factory('ProjectDispute', function($resource) {
        return $resource('/api/v1/project_disputes/:id', {}, {
            get: {
                method: 'GET'
            },
            put: {
                method: 'PUT',
                params: {
                    id: '@id'
                }
            }
        })
    })
      .factory('DisputeClosedTypes', function($resource) {
        return $resource('/api/v1/dispute_closed_types', {} ,{
            get: {
                method: 'GET'
            }
        })
    })