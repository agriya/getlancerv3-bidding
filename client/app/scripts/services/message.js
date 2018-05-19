'use strict';
angular.module('getlancerApp')
    .factory('MessagesFactory', ['$resource', function($resource) {
        return $resource('/api/v1/messages', {}, {
            get: {
                method: 'GET'
            },
            create: {
                method: 'POST'
            }
        });
    }]);
angular.module('getlancerApp')
    .factory('MessageFactory', ['$resource', function($resource) {
        return $resource('/api/v1/messages/:id', {}, {
            get: {
                method: 'GET',
                params: {
                    id: '@id'
                }
            }
        });
    }]);