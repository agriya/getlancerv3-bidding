'use strict';
/**
 * @ngdoc function
 * @name getlancerApp.controller:QuoteCreditPurchaseLogsController
 * @description
 * # QuoteCreditPurchaseLogsController
 * Controller of the getlancerApp
 */
angular.module('getlancerApp.Common.Subscription')
    .controller('QuoteCreditPurchaseLogsController', ['$rootScope', '$scope', '$stateParams', 'flash', 'md5', '$filter', '$location', 'QuoteCreditPurchaseLogsMeFactory', 'UserMeFactory',function($rootScope, $scope, $stateParams, flash, md5, $filter, $location, QuoteCreditPurchaseLogsMeFactory, UserMeFactory) {
        $rootScope.url_split = $location.path().split("/")[1];
        $rootScope.header = $rootScope.settings.SITE_NAME + ' | ' + $filter("translate")("Credit Purchase Log");
        $scope.loader = true;
        $scope.index = function() {
            $scope.loader = true;
            $scope.maxSize = 5;
            $scope.currentPage = ($stateParams.page !== undefined) ? parseInt($stateParams.page) : 1;
            var params = {};
            params.page = $scope.currentPage;
            params.is_payment_completed = 1;
            QuoteCreditPurchaseLogsMeFactory.get(params,function(response) {
                 $scope.credit_purchase_logs = response.data;
                $scope.currentPage = params.page;
                if (angular.isDefined(response._metadata)) {
                    $scope.totalItems = response._metadata.total;
                    $scope.itemsPerPage = response._metadata.per_page;
                    $scope.noOfPages = response._metadata.last_page;
                }
                  angular.forEach($scope.credit_purchase_logs, function(value) {
                      $scope.credit_count = Number(value.credit_count || 0);
                      $scope.used_count =  Number(value.used_credit_count || 0);
                       value.availale_credit_count = $scope.credit_count -  $scope.used_count;
                     });
                $scope.loader = false;
            });
        };
        $scope.userCreditPoints = function()
        {
            UserMeFactory.get({}, function(response) {
                $scope.user_available_credit_count = Number(response.data.available_credit_count || 0);
            });
        };
        $scope.userCreditPoints();
        $scope.$on('$locationChangeSuccess', function() {
            $scope.currentPage = ($stateParams.page !== undefined) ? parseInt($stateParams.page) : 1;
        });
        $scope.paginate_credit_log = function() {
            $location.search('page', parseInt($scope.currentPage));
        };
        $scope.index();
    }]);