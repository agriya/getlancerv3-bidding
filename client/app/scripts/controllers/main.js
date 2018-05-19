'use strict';
/**
 * @ngdoc function
 * @name getlancerApp.controller:MainController
 * @description
 * # MainController
 * Controller of the getlancerApp
 */
angular.module('getlancerApp')
    .controller('MainController', ['$rootScope', '$scope', '$window', 'cities', 'pages', '$cookies', 'md5', 'refreshToken', '$location', '$timeout', 'cfpLoadingBar', '$uibModal', '$uibModalStack', '$state', 'anchorSmoothScroll', 'contact', '$filter', 'flash', 'ConstUserRole', 'ConstQuoteBuyOption', 'myUserFactory', 'ConstQuoteStatuses', 'providers', 'countries', function($rootScope, $scope, $window, cities, pages, $cookies, md5, refreshToken, $location, $timeout, cfpLoadingBar, $uibModal, $uibModalStack, $state, anchorSmoothScroll, contact, $filter, flash, ConstUserRole, ConstQuoteBuyOption, myUserFactory, ConstQuoteStatuses, providers, countries) {
        cfpLoadingBar.start();
        $scope.ConstQuoteStatuses = ConstQuoteStatuses;
        $scope.cdate = new Date();
        $scope.contact_home = {};
        $scope.site_url = window.location.protocol + '//' + window.location.host + '/ag-admin/#/dashboard';
        $rootScope.isAuth = false;
        $rootScope.user = null;
        $rootScope.cdate = new Date();
        $rootScope.ConstUserRole = ConstUserRole;
        $rootScope.ConstQuoteBuyOption = ConstQuoteBuyOption;
        $scope.status = [
            'Status not changed',
            'Payment Pending',
            'Waiting for Approval',
            'Open',
            'Rejected',
            'Request for Cancellation',
            'Canceled By Admin',
            'Judging',
            'Winner Selected',
            'Winner Selected By Admin',
            'Change Requested',
            'Change Completed',
            'Files Expectation',
            'Delivery Files Uploaded',
            'Completed',
            'Paid to Participant',
            'Pending Action to Admin'
        ];
        $scope.index = function() {
          /*  $scope.getActivities();*/
            $scope.getMyuser();
            $scope.get_providers();
            $scope.getCountries();
        };
        if ($cookies.get("auth") !== null && $cookies.get("auth") !== undefined) {
            $rootScope.isAuth = true;
            $rootScope.user = JSON.parse($cookies.get("auth"));
            if (angular.isDefined($rootScope.user.attachment) && $rootScope.user.attachment !== null) {
                var hash = md5.createHash($rootScope.user.attachment.class + $rootScope.user.attachment.foreign_id + 'png' + 'normal_thumb');
                $rootScope.user.userimage = 'images/normal_thumb/' + $rootScope.user.attachment.class + '/' + $rootScope.user.attachment.foreign_id + '.' + hash + '.png';
            } else {
                $rootScope.user.userimage = $window.theme + 'images/default.png';
            }
            if ($rootScope.user.role_id === ConstUserRole.Employer) {
                $rootScope.Employer = true;
                $rootScope.Freelancer = false;
            } else if ($rootScope.user.role_id === ConstUserRole.Freelancer) {
                $rootScope.Freelancer = true;
                $rootScope.Employer = false;
            } else if ($rootScope.user.role_id === ConstUserRole.User || $rootScope.user.role_id === ConstUserRole.Admin) {
                if ($window.localStorage.portal === '"Employer"') {
                    $rootScope.Freelancer = false;
                    $rootScope.Employer = true;
                } else {
                    $rootScope.Freelancer = true;
                    $rootScope.Employer = false;
                }
            }
        }
        $scope.getCountries = function() {
            var params = {};
            params.limit = 'all';
            countries.get(params, function(response) {
                $rootScope.countries = response.data;
            });
        };
        $scope.get_providers = function() {
            providers.get(function(providers) {
                angular.forEach(providers.data, function(res) {
                    if (res.slug === 'facebook') {
                        $rootScope.facebook_provider = res.api_key;
                    }
                    if (res.slug === 'google') {
                        $rootScope.google_provider = res.api_key;
                    }
                    if (res.slug === 'twitter') {
                        $rootScope.twitter_provider = res.api_key;
                    }
                });
            });
        };
        $rootScope.$on('updateParent', function(event, args) {
            $rootScope.isAuth = (args.isAuth === true) ? true : false;
            if (args.isAuth === true) {
                $rootScope.isAuth = true;
                if (args.auth !== undefined) {
                    $scope.Authuser = {
                        id: args.auth.id,
                        username: args.auth.username,
                        role_id: args.auth.role_id,
                        refresh_token: args.auth.refresh_token,
                        attachment: args.auth.attachment,
                    };
                    $cookies.put('auth', JSON.stringify($scope.Authuser), {
                        path: '/'
                    });
                    $rootScope.user = args.auth;
                    if (angular.isDefined($rootScope.user.attachment) && $rootScope.user.attachment !== null) {
                        var hash = md5.createHash($rootScope.user.attachment.class + $rootScope.user.attachment.foreign_id + 'png' + 'normal_thumb');
                        $rootScope.user.userimage = 'images/normal_thumb/' + $rootScope.user.attachment.class + '/' + $rootScope.user.attachment.foreign_id + '.' + hash + '.png';
                    } else {
                        $rootScope.user.userimage = $window.theme + 'images/default.png';
                    }
                    if ($rootScope.user.role_id === ConstUserRole.Employer) {
                        $rootScope.Employer = true;
                        $rootScope.Freelancer = false;
                    } else if ($rootScope.user.role_id === ConstUserRole.Freelancer) {
                        $rootScope.Freelancer = true;
                        $rootScope.Employer = false;
                    } else if ($rootScope.user.role_id === ConstUserRole.User || $rootScope.user.role_id === ConstUserRole.Admin) {
                        $rootScope.Freelancer = true;
                        $rootScope.Employer = false;
                    }
                }
            } else {
                $rootScope.isAuth = false;
            }
        });
        if ($window.localStorage.getItem("location") !== null) {
            var location = JSON.parse($window.localStorage.getItem("location"));
            $rootScope.lat = location.lat;
            $rootScope.lang = location.lang;
            $rootScope.address = location.address;
            $rootScope.location_name = location.location_name;
            $rootScope.city = location.city;
            $rootScope.state = location.state;
            $rootScope.country = location.country;
            $rootScope.zip_code = location.zip_code;
        }
        //jshint unused:false
        var unregisterUseRefreshToken = $rootScope.$on('useRefreshToken', function(event, args) {
            //jshint unused:false
            $rootScope.refresh_token_loading = true;
            var params = {};
            var auth = JSON.parse($cookies.get("auth"));
            params.token = auth.refresh_token;
            refreshToken.get(params, function(response) {
                if (angular.isDefined(response.access_token)) {
                    $rootScope.refresh_token_loading = false;
                    $cookies.put('token', response.access_token, {
                        path: '/'
                    });
                    $timeout(function() {
                        $window.location.reload();
                    }, 1000);
                } else {
                    $cookies.remove("auth", {
                        path: "/"
                    });
                    $cookies.remove("token", {
                        path: "/"
                    });
                    //var redirectto = $location.absUrl().split('/#!/');
                    var redirectto = $location.absUrl()
                        .split('/');
                    redirectto = redirectto[0] + '/users/login';
                    $rootScope.refresh_token_loading = false;
                    window.location.href = redirectto;
                }
            });
        });
        $scope.openLoginModal = function(tabactive, $redirect_url, $failed_url) {            
            if (tabactive === 'login') {
                $window.localStorage.setItem("need_login", JSON.stringify($location.url()));
                $rootScope.header = $rootScope.settings.SITE_NAME + ' | ' + $filter("translate")("Login");
                $state.go('users_login', {
                    reload: false
                });
            } else if (tabactive === 'register') {
                $rootScope.header = $rootScope.settings.SITE_NAME + ' | ' + $filter("translate")("Register");
                $state.go('users_register', {
                    reload: false
                });
            }
            var redirect_url = "";
            var failed_url = "";
            if ($redirect_url !== undefined) {
                redirect_url = $redirect_url;
                failed_url = $failed_url;
            } else {
                redirect_url = $location.url();
            }
            var current_state = $state.current.name;
            var exceptional_state = ['users_login', 'users_register'];
            if (exceptional_state.indexOf(current_state) === -1) {
                $cookies.put('redirect_url', redirect_url, {
                    path: '/'
                });
                $cookies.put('failed_url', failed_url, {
                    path: '/'
                });
                if (tabactive === 'login') {
                    $state.go('users_login', {
                        param: ''
                    }, {
                        notify: false
                    });
                }
                if (tabactive === 'register') {
                    $state.go('users_register', {
                        param: ''
                    }, {
                        notify: false
                    });
                }
                $scope.modalInstance = $uibModal.open({
                    templateUrl: 'views/login_modal.html',
                    backdrop: 'static',
                    controller: 'ModalLoginInstanceController',
                    resolve: {
                        tabactive: function() {
                            return tabactive;
                        }
                    }
                });
            } else {
                $location.path('/users/login');
            }
        };
        $scope.openQuoteRequestModal = function(Category_id, Service_id, type, title, service_type) {
            $scope.modalInstance = $uibModal.open({
                templateUrl: 'scripts/plugins/Quote/Quote/views/default/modalquote_request.html',
                backdrop: 'static',
                size: 'lg',
                controller: 'QuoteRequestModelController',
                windowClass: 'js-service-category',
                resolve: {
                    Category_id: function() {
                        return Category_id;
                    },
                    Service_id: function() {
                        return Service_id;
                    },
                    type: function() {
                        return type;
                    },
                    title: function() {
                        return title;
                    },
                    service_type: function() {
                        return service_type;
                    }
                }
            });
        };
        $scope.cancel = function() {
            var current_url = $window.localStorage.need_login.toString().replace(/"/g, "");   
            var redirect_url = $cookies.get("redirect_url");
            var failed_url = $cookies.get("failed_url");
            if ($rootScope.previousState.state_name === 'jobs_view') {
                $state.go($rootScope.previousState.state_name, {
                    id: $rootScope.previousState.params.id
                }, {
                    notify: false
                });
            } else if ($rootScope.previousState.state_name === 'ExamView') {
                $state.go($rootScope.previousState.state_name, {
                    id: $rootScope.previousState.params.id,
                    slug: $rootScope.previousState.params.slug
                }, {
                    notify: false
                });
            } else {                
                if (current_url !== ''){
                    $timeout(function() {
                        $location.path(current_url);
                        $window.localStorage.setItem("need_login", '');
                    },300);
                } else if (failed_url === '') {
                    $location.path(redirect_url);
                } else {
                    $location.path(failed_url);
                }
            }
            $uibModalStack.dismissAll();
        };
        $scope.switch_tab = function(tab) {
            $rootScope.header = $rootScope.settings.SITE_NAME + ' | ' + $filter("translate")("Login");
            if (tab === 'login') {
                $state.go('users_login', {
                    param: ''
                }, {
                    notify: false
                });
            } else {
                $rootScope.header = $rootScope.settings.SITE_NAME + ' | ' + $filter("translate")("Register");
                $state.go('users_register', {
                    param: ''
                }, {
                    notify: false
                });
            }
        };
        $scope.homePageScroll = function(eID) {
            var current_state = $state.current.name;
            if (current_state === 'home') {
                anchorSmoothScroll.scrollTo(eID);
            } else {
                $rootScope.scroll_position = eID;
                $location.path('/home');
            }
        };
        $scope.saveHomeContact = function() {
            contact.create($scope.contact_home, function(response) {
                $scope.response = response;
                if ($scope.response.error.code === 0) {
                    flash.set($filter("translate")("Thank you, we received your message and will get back to you as soon as possible."), 'success', false);
                    $scope.contact_home = {};
                } else {
                    flash.set($filter("translate")("Contact could not be submitted. Please try again."), 'error', false);
                }
            });
        };
        $scope.getMyuser = function() {
            if ($rootScope.isAuth) {
                myUserFactory.get(function(response) {
                    $rootScope.my_user = response.data;
                $timeout(function() {
                    $rootScope.my_user.available_wallet_amount = Number
                    ($rootScope.my_user.available_wallet_amount||0);
                },500);
                });
            }
        };
        $scope.navigate_dashbooard = function() {
            $scope.site_url = '/ag-admin/#/dashboard';
            var site_url = $scope.site_url;
            window.location.href = site_url;
            $cookies.put('site_name',$rootScope.settings.SITE_NAME);
        };
        $scope.onlydashbord = function(type) {
            if (type === 'employer') {
                $state.go('user_dashboard', {
                    'type': 'requests',
                    'status': 'All',
                });
            } else if (type === 'freelancer') {
                $state.go('user_dashboard', {
                    'type': 'my_service_active',
                    'status': 'All',
                });
            }
        };
        $scope.switch_portal = function(portal) {
            var absUrl = $location.absUrl()
                .split('?');
            if (portal === 'Employer') {
                $rootScope.Employer = true;
                $rootScope.Freelancer = false;
                $window.localStorage.setItem("portal", JSON.stringify('Employer'));
                if ($rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Portfolio/Portfolio') > -1 === true ||   $rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Quote/Quote') > -1 === true ||
                $rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Bidding/Bidding') > -1 === true) {
                    $timeout(function() {
                        $state.go('user_dashboard', {
                            'type': 'news_feed',
                            'status': 'news_feed',
                        });
                    }, 1000);
                }
                if ($rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Portfolio/Portfolio') > -1 === true && ($rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Quote/Quote') > -1 === false, $rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Job/Job') > -1 === false, $rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Contest/Contest') > -1 === false, $rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Bidding/Bidding') > -1 === false)) {
                    $state.go('user_dashboard', {
                            'type': 'news_feed',
                            'status': 'news_feed',
                        });
                    // window.location.href = absUrl[0];
                } else if ($rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Quote/Quote') > -1 === true && ($rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Portfolio/Portfolio') > -1 === false, $rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Job/Job') > -1 === false, $rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Contest/Contest') > -1 === false, $rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Bidding/Bidding') > -1 === false)) {
                    $location.path('/quote_bids/my_requests/all/' + $scope.ConstQuoteStatuses.UnderDiscussion + '/under_discussion');
                }
                else if ($rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Portfolio/Portfolio') > -1 === false && ($rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Quote/Quote') > -1 === false, $rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Job/Job') > -1 === false, $rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Contest/Contest') > -1 === false, $rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Bidding/Bidding') > -1 === true)) {
                    $state.go('user_dashboard', {
                            'type': 'news_feed',
                            'status': 'news_feed',
                        });
                } else if ($rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Job/Job') > -1 === true && ($rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Quote/Quote') > -1 === false, $rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Portfolio/Portfolio') > -1 === false, $rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Contest/Contest') > -1 === false, $rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Bidding/Bidding') > -1 === false)) {
                         $state.go('user_dashboard', {
                                'type': 'my_jobs',
                                'status': 'all',
                            });
                }  /*else {
                     $state.go('user_dashboard', {
                            'type': 'my_projects',
                            'status': 'open_bidding',
                        });
                    // window.location.href = absUrl[0];
                }*/
                //  window.location.href = absUrl[0];
                //$scope.index();
            } else if (portal === 'Freelancer') {
                $rootScope.Freelancer = true;
                $rootScope.Employer = false;
                $window.localStorage.setItem("portal", JSON.stringify('Freelancer'));
                if ($rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Portfolio/Portfolio') > -1 === true || $rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Quote/Quote') > -1 === true || $rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Bidding/Bidding') > -1 === true) {
                   $timeout(function() {
                        $state.go('user_dashboard', {
                            'type': 'news_feed',
                            'status': 'news_feed',
                        });
                    }, 1000);
                }
                if ($rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Portfolio/Portfolio') > -1 === true && ($rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Quote/Quote') > -1 === false, $rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Job/Job') > -1 === false, $rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Contest/Contest') > -1 === false, $rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Bidding/Bidding') > -1 === false)) {
                     $state.go('user_dashboard', {
                            'type': 'news_feed',
                            'status': 'news_feed',
                        });
                } else if ($rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Quote/Quote') > -1 === true && ($rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Portfolio/Portfolio') > -1 === false, $rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Job/Job') > -1 === false, $rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Contest/Contest') > -1 === false, $rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Bidding/Bidding') > -1 === false)) {
                    $location.path('/my_works');
                } else if ($rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Job/Job') > -1 === true && ($rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Quote/Quote') > -1 === false, $rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Portfolio/Portfolio') > -1 === false, $rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Contest/Contest') > -1 === false, $rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Bidding/Bidding') > -1 === false)) {
                         $state.go('user_dashboard', {
                            'type': 'jobs_applies',
                            'status': 'all',
                        });
                } /*else {
                   $state.go('user_dashboard', {
                            'type': 'news_feed',
                            'status': 'news_feed',
                        });
                    window.location.href = absUrl[0];
                }*/
                // window.location.href = absUrl[0];
                //$scope.index();
            }
            // $scope.$broadcast('tab_change', true);
        };
        $rootScope.ShowSearch = true;
        $scope.openSearch = function() {
            if ($rootScope.ShowSearch === true) {
                $rootScope.ShowSearch = false;
            } else {
                $rootScope.ShowSearch = true;
            }
        };
        cfpLoadingBar.complete();
        $scope.index();
    }]);
angular.module('getlancerApp')
    .controller('ModalLoginInstanceController', function($scope, $uibModalStack, tabactive, $location) {
        if (tabactive === 'login') {
            $scope.loginactive = 0;
        } else {
            $scope.loginactive = 1;
        }
        $scope.ok = function() {
            $uibModalStack.dismissAll();
        };
        $scope.$on('modal.closing', function() {
          $location.path('/');
        });
    });