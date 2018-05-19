/*globals $:false */
'use strict';
/**
 * @ngdoc function
 * @name getlancerApp.controller:UsersDashboardController
 * @description
 * # UsersDashboardController
 * Controller of the getlancerApp
 */
angular.module('getlancerApp')
    .controller('UsersDashboardController', ['$rootScope', '$scope', '$filter', '$stateParams', '$state', '$window', '$timeout', function($rootScope, $scope, $filter, $stateParams, $state, $window, $timeout) {
        $rootScope.header = $rootScope.settings.SITE_NAME + ' | ' + $filter("translate")("Dashboard");
        $scope.pageview = $stateParams.type;
        $scope.tabparams = {};
        if ($state.params.type === undefined || $scope.renderPage === undefined) {
            var tabState = "";
            $timeout(function() {
                if ($state.params.type === undefined) {
                    if ($rootScope.Employer) {
                        tabState = $('.empolyer-dashboard li')
                            .first()
                            .data('class');
                    } else {
                        tabState = $('.freelancer-dashboard li')
                            .first()
                            .data('class');
                    }
                } else {
                    tabState = $state.params.type;
                }
                $scope.tabChange(tabState);
                $state.go('user_dashboard', {
                    type: tabState,
                }, {
                    notify: false
                });
            }, 500);
        }
        /* here need to check the pageview undefined condition */
        if ($scope.pageview === undefined) {
            if ($rootScope.Employer) {
                $scope.tab = 'news_feed';
            } else {
                $scope.tab = 'news_feed';
            }
        }
        $scope.index = function() {
            //empolyer
            if ($rootScope.Employer) {
                $scope.tab = 'news_feed';
                if (($rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Bidding/Bidding') > -1) && ($scope.pageview === 'my_projects')) {
                    $scope.tab = 'my_projects';
                } else if (($rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Contest/Contest') > -1) && ($scope.pageview === 'my_contests')) {
                    $scope.tab = 'my_contests';
                } else if (($rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Job/Job') > -1) && ($scope.pageview === 'my_jobs')) {
                    $scope.tab = 'my_jobs';
                } else if (($rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Job/JOb') > -1) && ($scope.pageview === 'applied_resumes')) {
                    $scope.tab = 'applied_resumes';
                } else if (($rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Quote/Quote') > -1) && ($scope.pageview === 'requests')) {
                    $scope.tab = 'requests';
                }
            }
            //freelancer
            if ($rootScope.Freelancer) {
                $scope.tab = 'news_feed';
                if (($rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Bidding/Bidding') > -1) && ($scope.pageview === 'projects')) {
                    $scope.tab = 'projects';
                } else if (($rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Bidding/Bidding') > -1) && ($scope.pageview === 'active_bidding')) {
                    $scope.tab = 'active_bidding';
                } else if (($rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Job/Job') > -1) && ($scope.pageview === 'jobs_applies')) {
                    $scope.tab = 'job_applies';
                } else if (($rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Quote/Quote') > -1) && ($scope.pageview === 'my_service_active')) {
                    $scope.tab = 'my_service_active';
                } else if (($rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Quote/Quote') > -1) && ($scope.pageview === 'my_works')) {
                    $scope.tab = 'my_works';
                } else if (($rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Contest/Contest') > -1) && ($scope.pageview === 'my_entries')) {
                    $scope.tab = 'my_entries';
                } else if (($rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Portfolio/Portfolio') > -1) && ($scope.pageview === 'my_portfolios')) {
                    $scope.tab = 'portfolios';
                }
            }
        };
        $scope.tabChange = function(tab) {
            $scope.tabparams.type = tab;
            $scope.tab = tab;
            if ($scope.tab === 'my_projects') {
                $rootScope.header = $rootScope.settings.SITE_NAME + ' | ' + $filter("translate")("My Projects");
                $scope.renderPage = "scripts/plugins/Bidding/Bidding/views/default/bidding_project_dashboard.html";
            } else if ($scope.tab === 'my_contests') {
                $rootScope.header = $rootScope.settings.SITE_NAME + ' | ' + $filter("translate")("My Contests");
                $scope.tabparams.status = "all";
                $scope.renderPage = "scripts/plugins/Contest/Contest/views/default/my_contests_dashboard.html";
            } else if ($scope.tab === 'my_jobs') {
                $rootScope.header = $rootScope.settings.SITE_NAME + ' | ' + $filter("translate")("My Jobs");
                $scope.tabparams.status = "all";
                $scope.renderPage = "scripts/plugins/Job/Job/views/default/my_jobs_dashboard.html";
            } else if ($scope.tab === 'applied_resumes') {
                $rootScope.header = $rootScope.settings.SITE_NAME + ' | ' + $filter("translate")("Applied Resumes");
                $scope.tabparams.status = "all";
                $scope.renderPage = "scripts/plugins/Job/Job/views/default/job_applies_dashboard.html";
            } else if ($scope.tab === 'requests') {
                $rootScope.header = $rootScope.settings.SITE_NAME + ' | ' + $filter("translate")("My Requests");
                $scope.renderPage = "scripts/plugins/Quote/Quote/views/default/quote_my_requests_dashboard.html";
                $scope.tabparams.status = "All";
            } else if ($scope.tab === 'projects') {
                $rootScope.header = $rootScope.settings.SITE_NAME + ' | ' + $filter("translate")("My Projects");
                $scope.tabparams.status = "my_bids";
                $scope.renderPage = "scripts/plugins/Bidding/Bidding/views/default/bidding_project_dashboard.html";
            } else if ($scope.tab === 'active_bidding') {
                $rootScope.header = $rootScope.settings.SITE_NAME + ' | ' + $filter("translate")("Active Bidding");
                $scope.tabparams.status = "active";
                $scope.renderPage = "scripts/plugins/Bidding/Bidding/views/default/my_bids_active.html";
            } else if ($scope.tab === 'my_entries') {
                $rootScope.header = $rootScope.settings.SITE_NAME + ' | ' + $filter("translate")("My Entries");
                $scope.tabparams.status = "all";
                $scope.renderPage = "scripts/plugins/Contest/Contest/views/default/my_contest_user_dashboard.html";
            } else if ($scope.tab === 'jobs_applies') {
                $rootScope.header = $rootScope.settings.SITE_NAME + ' | ' + $filter("translate")("Job Applies");
                $scope.renderPage = "scripts/plugins/Job/Job/views/default/job_applied_dashboard.html";
            } else if ($scope.tab === 'my_service_active') {
                $scope.tabparams.status = "all";
                $rootScope.header = $rootScope.settings.SITE_NAME + ' | ' + $filter("translate")("My Services");
                $scope.renderPage = "scripts/plugins/Quote/Quote/views/default/quote_my_services_dashboard.html";
            } else if ($scope.tab === 'my_works') {
                $scope.tabparams.status = "all";
                $rootScope.header = $rootScope.settings.SITE_NAME + ' | ' + $filter("translate")("My Works");
                $scope.renderPage = "scripts/plugins/Quote/Quote/views/default/quote_my_works_dashboard.html";
            } else if ($scope.tab === 'portfolios') {
                $scope.tabparams.status = "my_portfolios";
                $rootScope.header = $rootScope.settings.SITE_NAME + ' | ' + $filter("translate")("My Portfolios");
                $scope.renderPage = "scripts/plugins/Portfolio/Portfolio/views/default/portfolioshome.html";
            } else if($scope.tab === 'news_feed') {
                $scope.tabparams.status = "news_feed";
                $rootScope.header = $rootScope.settings.SITE_NAME + ' | ' + $filter("translate")("Dashboard");
                $scope.renderPage = "views/news_feeds.html";
            }
            $state.go('user_dashboard', $scope.tabparams, {
                notify: false
            });
        };
        $scope.$watch("Freelancer", function() {
            $scope.index();
        });
        $scope.index();
        //jshint unused:false
        $scope.$on('tab_change', function(event, data) {
            $scope.portal = $window.localStorage.getItem('portal');
            if ($scope.portal === '"Employer"') {
                $scope.tabChange('news_feed');
                $state.go('user_dashboard', {
                    type: 'news_feed',
                }, {
                    notify: false
                });
            } else {
                $scope.tabChange('news_feed');
                $state.go('user_dashboard', {
                    type: 'news_feed',
                    status: 'news_feed'
                }, {
                    notify: false
                });
            }
        });
  }]);