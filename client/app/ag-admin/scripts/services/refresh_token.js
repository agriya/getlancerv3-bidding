'use strict';
/**
 * @ngdoc service
 * @name baseApp.refreshToken
 * @description
 * # refreshToken
 * Factory in the baseApp.
 */
angular.module('base')
    .factory('refreshToken', ['$resource', function($resource) {
        return $resource('/api/v1/oauth/refresh_token', {}, {
            get: {
                method: 'GET'
            }
        });
  }]);