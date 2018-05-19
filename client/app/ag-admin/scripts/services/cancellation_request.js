'use strict';
/**
 * @ngdoc service
 * @name ofos.paymentGateway
 * @description
 * # paymentGateway
 * Factory in the ofos.
 */
angular.module('base')
    .factory('ContestFactory', ['$resource', function($resource) {
        return $resource('/api/v1/contests/:id', {}, {
            get: {
                method: 'GET',
                params: {
                    id: '@id'
                },
            },
            update: {
                method: 'PUT',
                params: {
                    id: '@id'
                },
            },
            remove: {
                method: 'DELETE',
                params: {
                    id: '@id'
                }
            }
        });
 }]);