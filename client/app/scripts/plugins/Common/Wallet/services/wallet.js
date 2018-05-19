'use strict';
/**
 * @ngdoc service
 * @name getlancerApp.wallet
 * @description
 * # wallet
 * Factory in the getlancerApp.
 */
angular.module('getlancerApp.Common.Wallet')
    .factory('wallet', ['$resource', function($resource) {
        return $resource('/api/v1/wallets', {}, {
            create: {
                method: 'POST'
            }
        });
    }]);