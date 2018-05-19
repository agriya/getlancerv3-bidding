'use strict';
/**
 * @ngdoc service
 * @name getlancerApp.paymentGateways
 * @description
 * # paymentGateways
 * Factory in the getlancerApp.
 */
angular.module('getlancerApp')
    .factory('paymentGateways', ['$resource', function($resource) {
        return $resource('/api/v1/payment_gateways/list', {}, {
            get: {
                method: 'GET'
            }
        });
}]);