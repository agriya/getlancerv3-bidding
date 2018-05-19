'use strict';
/**
 * @ngdoc service
 * @name getlancerApp.QuoteCreditPurchasePlanFactory
 * @description
 * # QuoteCreditPurchasePlanFactory
 * Factory in the getlancerApp.
 */
angular.module('getlancerApp.Common.Subscription')
    .factory('QuoteCreditPurchasePlansFactory', ['$resource', function($resource) {
        return $resource('/api/v1/credit_purchase_plans', {}, {
            get: {
                method: 'GET'
            },
            post: {
                method: 'POST'
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
  }])
  
    .factory('QuoteCreditPurchasePlanFactory', ['$resource', function($resource) {
        return $resource('/api/v1/credit_purchase_plans/:/creditPurchasePlanId', {}, {
            get: {
                method: 'GET',
                params: {
                    creditPurchasePlanId: '@creditPurchasePlanId'
                }
            },
            put: {
                method: 'PUT',
                params: {
                    creditPurchasePlanId: '@creditPurchasePlanId'
                }
            },
            delete: {
                method: 'DELETE',
                params: {
                    creditPurchasePlanId: '@creditPurchasePlanId'
                }
            }
        });
  }]);