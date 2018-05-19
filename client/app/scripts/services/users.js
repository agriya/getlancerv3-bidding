'use strict';
/**
 * @ngdoc service
 * @name getlancerApp.UsersFactory
 * @description
 * # UsersFactory
 * Factory in the getlancerApp.
 */
angular.module('getlancerApp')
    .factory('UsersFactory', ['$resource', function($resource) {
        return $resource('/api/v1/users', {}, {
            get: {
                method: 'GET'
            }
        });
  }])
    .factory('myUserFactory', ['$resource', function($resource) {
        return $resource('/api/v1/me', {}, {
            get: {
                method: 'GET'
            }
        });
    }])
    .factory('FreelancerSkills', ['$resource', function($resource) {
        return $resource('/api/v1/skills', {}, {
            get: {
                method: 'GET'
            }
        });
  }]);