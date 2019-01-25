  'use strict';
  angular.module('getlancerApp.Bidding.ProjectFlag')
      .factory('ReportProjectCategories', ['$resource', function($resource) {
          return $resource('/api/v1/flag_categories', {}, {
              get: {
                  method: 'GET'
              }
          });
 }]);