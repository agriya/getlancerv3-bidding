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
}])
.factory('CouponGetStatusFactory', ['$resource', function($resource) {
    return $resource('/api/v1/coupons/get_status/:coupon_code', {}, {
        get: {
            method: 'GET',
            params: {
                coupon_code: '@coupon_code',
                amount: '@amount'
            }
        }
    });
}]);