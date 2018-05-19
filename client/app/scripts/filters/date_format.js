'use strict';
/**
 * @ngdoc filter
 * @name getlancerApp.filter:dateFormat
 * @function
 * @description
 * # dateFormat
 * Filter in the getlancerApp.
 */
angular.module('getlancerApp')
    .filter('medium', function myDateFormat($filter) {
        return function(text) {
            var tempdate = new Date(text.replace(/(.+) (.+)/, "$1T$2Z"));
            return $filter('date')(tempdate, "medium");
        };
    })
    .filter('subString', function() {
        return function(str, start, end) {
            if (str !== undefined) {
                return str.substr(start, end);
            }
        };
    });