'use strict';
/**
 * @ngdoc service
 * @name ofos.paymentGateway
 * @description
 * # paymentGateway
 * Factory in the ofos.
 */
angular.module('base')
    .factory('paymentGateway', function($resource) {
        return $resource('/api/v1/payment_gateway_settings/:id', {}, {
            update: {
                method: 'PUT',
                params: {
                    id: '@id'
                }
            }
        });
    })
    .factory('ExamListsFactory', function($resource) {
        return $resource('/api/v1/exams', {'limit': 'all'}, {
            get: {
                method: 'GET',
            }
        });
    })
    .factory('ExamQuestions', function($resource) {
        return $resource('/api/v1/exams_questions', {}, {
            post: {
                method: 'POST',
            }
        });
    });