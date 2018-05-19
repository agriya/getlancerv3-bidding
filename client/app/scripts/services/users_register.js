'use strict';
/**
 * @ngdoc service
 * @name getlancerApp.usersRegister
 * @description
 * # usersRegister
 * Factory in the getlancerApp.
 */
angular.module('getlancerApp')
    .factory('usersRegister', ['$resource', function($resource) {
        return $resource('/api/v1/users/register', {}, {
            create: {
                method: 'POST'
            }
        });
    }]);