'use strict';
/**
 * @ngdoc service
 * @name getlancerApp.usersLogout
 * @description
 * # usersLogout
 * Factory in the getlancerApp.
 */
angular.module('getlancerApp')
    .factory('usersLogout', ['$resource', function($resource) {
        return $resource('/api/v1/users/logout', {}, {
            logout: {
                method: 'GET'
            }
        });
    }]);