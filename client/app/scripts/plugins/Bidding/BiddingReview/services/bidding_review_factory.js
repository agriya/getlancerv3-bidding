'use strict';
angular.module('getlancerApp.Bidding.BiddingReview')
    .factory('BiddingReviews', ['$resource', function($resource) {
        return $resource('/api/v1/reviews', {}, {
            get: {
                method: 'GET',
            },
            create: {
                method: 'POST'
            }
        });
  }])
    .factory('BiddingReview', ['$resource', function($resource) {
        return $resource('/api/v1/reviews/:id', {}, {
            get: {
                method: 'GET',
                params: {
                    id: '@id'
                },
            },
            update: {
                method: 'PUT',
                params: {
                    id: '@id'
                },
            },
            remove: {
                method: 'DELETE',
                params: {
                    id: '@id'
                }
            }
        });
  }]);