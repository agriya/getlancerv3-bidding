'use strict';
/**
 * @ngdoc service
 * @name getlancerApp.refreshToken
 * @description
 * # refreshToken
 * Factory in the getlancerApp.
 */
angular.module('getlancerApp')
    .factory('refreshToken', ['$resource', function($resource) {
        return $resource('/api/v1/oauth/refresh_token', {}, {
            get: {
                method: 'GET'
            }
        });
  }]);