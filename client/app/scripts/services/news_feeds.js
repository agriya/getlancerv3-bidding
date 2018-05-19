'use strict';
/**
 * @ngdoc service
 * @name getlancerApp.localeService
 * @description
 * # localeService
 * Service in the getlancerApp.
 */
angular.module('getlancerApp')
    .factory('NewsFeedsFactory', ['$resource', function ($resource) {
		return $resource('/api/v1/activities', {}, {
            get: {
                method: 'GET'
            }
        });
	}])
    .factory('MeNewsFeedsFactory', ['$resource', function ($resource) {
		return $resource('/api/v1/me/activities', {}, {
            get: {
                method: 'GET'
            }
        });
	}])
     .factory('MilestoneStatues', ['$resource', function($resource) {
        return $resource('/api/v1/milestones/:id/update_status', {
            id: '@id'
        }, {
            put: {
                method: 'PUT'
            }
        });
  }])
  .factory('UpdateProjectStatues', ['$resource', function($resource) {
        return $resource('/api/v1/projects/:id/update_status', {
            id: '@id'
        }, {
            put: {
                method: 'PUT'
            }
            
        });
  }])
   .factory('UpdateBidsStatus', ['$resource', function($resource) {
        return $resource('/api/v1/bids/:id/update_status', {
            id: '@id'
        }, {
            put: {
                method: 'PUT'
            }
        });
  }])
  .factory('ExamsUsers', ['$resource', function($resource) {
        return $resource('/api/v1/exams_users', {}, {
            getall: {
                method: 'GET'
            }
        });
}])
.factory('PaymentOrderFactory', ['$resource', function($resource) {
        return $resource('/api/v1/order', {}, {
           create: {
                method: 'POST'
            }
        });
}]);