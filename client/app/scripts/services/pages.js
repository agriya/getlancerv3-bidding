'use strict';
/**
 * @ngdoc service
 * @name getlancerApp.page
 * @description
 * # page
 * Factory in the getlancerApp.
 */
angular.module('getlancerApp')
    .factory('pages', ['$resource', function($resource) {
        return $resource('/api/v1/pages', {}, {
            get: {
                method: 'GET'
            }
        });
  }]);