'use strict';
/**
 * @ngdoc service
 * @name olxApp.ChangePasswordFactory
 * @description
 * # ChangePasswordFactory
 * Factory in the olxApp.
 */
angular.module('base')
    .factory('ChangePasswordFactory', function($resource) {
        return $resource('/api/v1/users/:id/change_password', {}, {
            update: {
                method: 'PUT',
                params: {
                    id: '@id'
                }
            }
        });
    })