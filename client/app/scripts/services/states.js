'use strict';
/**
 * @ngdoc service
 * @name getlancerApp.states
 * @description
 * # states
 * Factory in the getlancerApp.
 */
angular.module('getlancerApp')
    .factory('states', ['$resource', function($resource) {
        return $resource('/api/v1/states', {}, {
            get: {
                method: 'GET'
            }
        });
  }]);