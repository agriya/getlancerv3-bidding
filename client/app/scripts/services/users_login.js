'use strict';
/**
 * @ngdoc service
 * @name getlancerApp.usersLogin
 * @description
 * # usersLogin
 * Factory in the getlancerApp.
 */
angular.module('getlancerApp')
    .factory('usersLogin', ['$resource', function($resource) {
        return $resource('/api/v1/users/login', {}, {
            login: {
                method: 'POST'
            }
        });
    }])
    .factory('twitterLogin', ['$resource', function($resource) {
        return $resource('/api/v1/users/social_login', {}, {
            login: {
                method: 'POST'
            }
        });
    }]);