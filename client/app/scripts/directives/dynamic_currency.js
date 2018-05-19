'use strict';
angular.module('getlancerApp')
    .directive('amountDisplay', function() {
        return {
            templateUrl: 'views/dynamic_currency.html',
            restrict: 'EA',
            replace: 'true',
            scope: 'true',
            link: function postLink(scope, element, attr) {
                scope.amount = attr.amount;
            }
        };
    });