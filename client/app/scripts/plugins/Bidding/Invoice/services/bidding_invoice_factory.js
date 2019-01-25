'use strict';
/**
 * @ngdoc function
 * @name getlancerApp.controller:BiddingMilestoneCtrl
 * @description
 * # QuoteServicePhotosManageController
 * Controller of the getlancerApp
 */
angular.module('getlancerApp.Bidding.Invoice')
    .factory('MeInvoice', function($resource) {
        return $resource('/api/v1/me/project_bid_invoices', {}, {
            get: {
                method: 'GET'
            }
        });
    });