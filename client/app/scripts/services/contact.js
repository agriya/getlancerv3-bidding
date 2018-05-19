'use strict';
/**
 * @ngdoc service
 * @name getlancerApp.contact
 * @description
 * # contact
 * Factory in the getlancerApp.
 */
angular.module('getlancerApp')
    .factory('contact', ['$resource', function($resource) {
        return $resource('/api/v1/contacts', {}, {
            create: {
                method: 'POST'
            }
        });
    }]);