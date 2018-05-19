'use strict';
/**
 * @ngdoc service
 * @name getlancerApp.QuoteCreditPurchaseLogsFactory
 * @description
 * # QuoteCreditPurchaseLogsFactory
 * Factory in the getlancerApp.
 */
angular.module('getlancerApp.Common.Subscription')
    .factory('QuoteCreditPurchaseLogsFactory', ['$resource', function($resource) {
        return $resource('/api/v1/credit_purchase_logs', {}, {
            get: {
                method: 'GET'
            },
            create: {
                method: 'POST'
            }
        });
  }])
    .factory('QuoteCreditPurchaseLogFactory', ['$resource', function($resource) {
        return $resource('/api/v1/credit_purchase_logs/:creditPurchaseLogId', {}, {
            get: {
                method: 'GET',
                params: {
                    creditPurchaseLogId: '@creditPurchaseLogId'
                }
            },
            update: {
                method: 'PUT',
                params: {
                    creditPurchaseLogId: '@creditPurchaseLogId'
                }
            },
            remove: {
                method: 'DELETE',
                params: {
                    creditPurchaseLogId: '@creditPurchaseLogId'
                }
            }
        });
  }])
    .factory('QuoteCreditPurchaseLogsMeFactory', ['$resource', function($resource) {
        return $resource('/api/v1/me/credit_purchase_logs', {}, {
            get: {
                method: 'GET'
            }
        });
  }]);