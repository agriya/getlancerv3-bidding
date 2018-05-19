'use strict';
/**
 * @ngdoc service
 * @name getlancerApp.usersAddress
 * @description
 * # usersAddress
 * Factory in the getlancerApp.
 */
angular.module('getlancerApp')
    .factory('usersAddress', ['$resource', function($resource) {
        return $resource('/api/v1/users/:user_id/user_addresses/:user_address_id', {}, {
            remove: {
                method: 'DELETE',
                params: {
                    user_id: '@user_id',
                    address_id: '@user_address_id'
                }
            }
        });
  }]);