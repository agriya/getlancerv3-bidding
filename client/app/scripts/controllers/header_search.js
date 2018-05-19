'use strict';
/**
 * @ngdoc function
 * @name getlancerApp.controller:HeaderSearchController
 * @description
 * # HeaderSearchController
 * Controller of the getlancerApp
 */
angular.module('getlancerApp')
    .controller('HeaderSearchController', ['$scope', '$rootScope', '$window', '$filter', '$state', 'anchorSmoothScroll', '$timeout', '$location', function ($scope, $rootScope, $window, $filter, $state, anchorSmoothScroll, $timeout, $location) {
        $rootScope.header = $rootScope.settings.SITE_NAME + ' | ' + $filter("translate")("Search");
        $scope.search = {};
        $scope.index = function () {

             if ($rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Portfolio/Portfolio') > -1=== true){
                $scope.search.searchpage = 'Portfolios';
            }
             else if ($rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Job/Job') > -1 === true) {
                $scope.search.searchpage = 'Jobs';
            }
            else if ($rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Bidding/Bidding') > -1 === true) {
                $scope.search.searchpage = 'Freelancers';
            }
             else if ($rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Quote/Quote') > -1 === true && !$rootScope.isAuth) {
                $scope.search.searchpage = 'Services';
            }
             else if ($rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Quote/Quote') > -1 === true && !$rootScope.Freelancer && $rootScope.isAuth) {
                $scope.search.searchpage = 'Services';
            }
             else if ($rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Quote/Quote') > -1 === true && $rootScope.Freelancer && $rootScope.isAuth) {
                $scope.search.searchpage = 'My Services';
            }
        };
        $scope.searchResult = function () {
            if ($scope.search.searchpage === 'Portfolios') {
                $location.path('/portfolios')
                    .search({
                        q: $scope.search.searchvalue
                    });
                    if($location.$$url === '/portfolios')
                    {
                        $state.reload();
                    }
            } else if ($scope.search.searchpage === 'Jobs') {
                $location.path('/jobs')
                    .search({
                        q: $scope.search.searchvalue
                    });
                    if($location.$$url === '/jobs')
                    {
                        $state.reload();
                    }
            } else if ($scope.search.searchpage === 'Freelance Projects') {
                $location.path('/projects')
                    .search({
                        q: $scope.search.searchvalue
                    });
            } else if ($scope.search.searchpage === 'Services') {
                $location.path('/quote_services')
                    .search({
                        q: $scope.search.searchvalue
                    });
                    if($location.$$url === '/quote_services')
                    {
                        $state.reload();
                    }
            } else if ($scope.search.searchpage === 'Skill Test') {
                $location.path('/exams')
                    .search({
                        q: $scope.search.searchvalue
                    });
            } else if ($scope.search.searchpage === 'My Services') {
                $location.path('/quote_services/my_services')
                    .search({
                        q: $scope.search.searchvalue
                    });
                if($location.$$url === '/quote_services/my_services')
                    {
                        $state.reload();
                    }
            }  
            else if ($scope.search.searchpage === 'Freelancers') {
                $location.path('/freelancers')
                    .search({
                        q: $scope.search.searchvalue
                    });
            }
        };
        $scope.index();
    }]);