'use strict';
/**
 * @ngdoc service
 * @name getlancerApp.cashWithdrawals
 * @description
 * # cashWithdrawals
 * Factory in the getlancerApp.
 */
angular.module('getlancerApp.Common.Withdrawal')
    .factory('cashWithdrawals', ['$resource', function($resource) {
        return $resource('/api/v1/users/:user_id/user_cash_withdrawals', {}, {
            get: {
                method: 'GET',
                params: {
                    user_id: '@user_id'
                }
            },
            save: {
                method: 'POST',
                params: {
                    user_id: '@user_id'
                }
            },
        });
  }]);