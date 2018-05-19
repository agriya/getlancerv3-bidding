'use strict';
/**
 * @ngdoc service
 * @name getlancerApp.usersAddresses
 * @description
 * # usersAddresses
 * Factory in the getlancerApp.
 */
angular.module('getlancerApp')
    .factory('usersAddresses', ['$resource', function($resource) {
        return $resource('/api/v1/users/:user_id/user_addresses', {}, {
            create: {
                method: 'POST',
                params: {
                    user_id: '@user_id'
                }
            },
            get: {
	
                method: 'GET',
                params: {
                    iuser_idd: '@user_id'
                }
            }
        });
    }]);