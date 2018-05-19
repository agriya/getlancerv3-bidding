'use strict';
/**
 * @ngdoc service
 * @name getlancerv3.servicelocation
 * @description
 * # paymentGateway
 * Factory in the getlancerv3.
 */
angular.module('base')
    .factory('ServiceLocation', function($resource) {
        return $resource('/api/v1/settings/:id', {}, {
            get: {
                method: 'GET',
                params: {
                    id: '@id'
                }
            },
			put: {
                method: 'PUT',
                params: {
                    id: '@id'
                }
            }
        });
    })
	.factory('CitiesFactory', function($resource) {
        return $resource('/api/v1/cities?limit=all', {}, {
            get: {
                method: 'GET',
            }
        });
    })
	.factory('CountriesFactory', function($resource) {
        return $resource('/api/v1/countries?limit=all', {}, {
            get: {
                method: 'GET',
            }
        });
    });    