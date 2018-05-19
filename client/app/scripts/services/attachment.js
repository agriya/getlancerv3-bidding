'use strict';
/**
 * @ngdoc service
 * @name getlancerApp.attachment
 * @description
 * # attachment
 * Factory in the getlancerApp.
 */
angular.module('getlancerApp')
    .factory('attachment', ['$resource', function($resource) {
        return $resource('/api/v1/attachments/', {}, {
            create: {
                method: 'POST'
            }
        });
  }]);