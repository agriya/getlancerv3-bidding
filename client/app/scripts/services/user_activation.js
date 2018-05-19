'use strict';
/**
 * @ngdoc service
 * @name getlancerApp.userActivation
 * @description
 * # userActivation
 * Factory in the getlancerApp.
 */
angular.module('getlancerApp')
    .factory('userActivation', ['$resource', function($resource) {
        return $resource('/api/v1/users/activation/:user_id/:hash', {}, {
            activation: {
                method: 'PUT',
                params: {
                    user_id: '@user_id',
                    hash: '@hash'
                }
            }
        });
  }]);