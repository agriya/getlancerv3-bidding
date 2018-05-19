'use strict';
/**
 * @ngdoc function
 * @name getlancerApp.controller:HomeController
 * @description
 * # HomeController
 * Controller of the getlancerApp
 */
angular.module('getlancerApp')
    .controller('HomeController', ['$scope', '$rootScope', '$window', '$filter', '$state', 'anchorSmoothScroll', '$timeout', '$cookies', '$location', function($scope, $rootScope, $window, $filter, $state, anchorSmoothScroll, $timeout, $cookies, $location) {
         if (($cookies.get("auth") === null || $cookies.get("auth") === undefined)) { //jshint ignore:line
                     $rootScope.header = $rootScope.settings.SITE_NAME + ' | ' + $filter("translate")("Home");
         }
        if (angular.isDefined($rootScope.scroll_position)) {
            $timeout(function() {
                anchorSmoothScroll.scrollTo($rootScope.scroll_position);
                delete $rootScope.scroll_position;
            }, 1000);
        }
        if (($cookies.get("auth") != null || $cookies.get("auth") != undefined)) { //jshint ignore:line
            if ($rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Portfolio/Portfolio') > -1 === true && ($rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Quote/Quote') > -1 === false, $rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Job/Job') > -1 === false, $rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Contest/Contest') > -1 === false, $rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Bidding/Bidding') > -1 === false)) {
                 $state.go('user_dashboard', {
                            'type': 'news_feed',
                            'status': 'news_feed',
                        });
            } else if ($rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Job/Job') > -1 === true && ($rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Quote/Quote') > -1 === false, $rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Portfolio/Portfolio') > -1 === false, $rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Contest/Contest') > -1 === false, $rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Bidding/Bidding') > -1 === false)) {
                $state.go('user_dashboard', {
                            'type': 'news_feed',
                            'status': 'news_feed',
                        });
            }  else if ($rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Quote/Quote') > -1 === true && ($rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Job/Job') > -1 === false, $rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Portfolio/Portfolio') > -1 === false, $rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Contest/Contest') > -1 === false, $rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Bidding/Bidding') > -1 === false)) {
                 if ($rootScope.Freelancer) {
                                 $state.go('quote_service_add');
                                                } else {
                                                    $location.path('/my_works/all/' + $scope.ConstQuoteStatuses.New + '/new');
                                                }
            }
             else {
                $state.go('user_dashboard');
            }
        } else {
            $location.path('/');
        }
		if(($rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Quote/Quote') > -1) && ($rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Portfolio/Portfolio') > -1 === false && $rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Bidding/Bidding') > -1 === false && $rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Contest/Contest') > -1 === false && $rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Job/Job') > -1 === false)) {
            $rootScope.home_display = 'Quote';
        } else if(($rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Bidding/Bidding') > -1) && ($rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Portfolio/Portfolio') > -1 === false && $rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Quote/Quote') > -1 === false && $rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Contest/Contest') > -1 === false && $rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Job/Job') > -1 === false)) {
            $rootScope.home_display = 'Bidding';
        } else if(($rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Job/Job') > -1) && ($rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Portfolio/Portfolio') > -1 === false && $rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Quote/Quote') > -1 === false && $rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Contest/Contest') > -1 === false && $rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Bidding/Bidding') > -1 === false)) {
            $rootScope.home_display = 'Job';
        } else if(($rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Contest/Contest') > -1) && ($rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Portfolio/Portfolio') > -1 === false && $rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Quote/Quote') > -1 === false && $rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Job/Job') > -1 === false && $rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Bidding/Bidding') > -1 === false)) {
            $rootScope.home_display = 'Contest';
        } else if(($rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Portfolio/Portfolio') > -1) && ($rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Contest/Contest') > -1 === false && $rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Quote/Quote') > -1 === false && $rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Job/Job') > -1 === false && $rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Bidding/Bidding') > -1 === false)) {
            $rootScope.home_display = 'Portfolio';
        } else {
            $rootScope.home_display = 'Common';
        }
  }]);