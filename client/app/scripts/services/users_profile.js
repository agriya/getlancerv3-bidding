'use strict';
/**
 * @ngdoc service
 * @name getlancerApp.usersProfile
 * @description
 * # usersProfile
 * Factory in the getlancerApp.
 */
angular.module('getlancerApp')
    .factory('usersProfile', function() {
        // Service logic
        // ...
        var meaningOfLife = 42;
        // Public API here
        return {
            someMethod: function() {
                return meaningOfLife;
            }
        };
    });