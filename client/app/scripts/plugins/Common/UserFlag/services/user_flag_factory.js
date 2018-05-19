'use strict';
/**
 * @ngdoc service
 * @name Getlancerv3
 * @UserFlagFactory
 * # Customservices
 * Factory in the Getlancerv3.
 */
angular.module('getlancerApp.Common.UserFlag')
    .factory('FlagsFactory', ['$resource', function($resource) {
        return $resource('/api/v1/flags', {}, {
            create: {
                method: 'POST'
            }
        });
    }])
    .factory('FlagCategoriesFactory', ['$resource', function($resource) {
        return $resource('/api/v1/flag_categories', {}, {
            get: {
                method: 'GET'
            }
        });
    }]);