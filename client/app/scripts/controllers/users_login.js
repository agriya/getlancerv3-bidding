'use strict';
/**
 * @ngdoc function
 * @name getlancerApp.controller:UsersLoginController
 * @description
 * # UsersLoginController
 * Controller of the getlancerApp
 */
angular.module('getlancerApp')
    .controller('UsersLoginController', ['$rootScope', '$scope', 'usersLogin', 'providers', '$auth', 'flash', '$window', '$location', '$filter', '$cookies', '$state', '$uibModalStack', '$timeout', 'ConstUserRole', 'myUserFactory', 'ConstQuoteStatuses', function($rootScope, $scope, usersLogin, providers, $auth, flash, $window, $location, $filter, $cookies, $state, $uibModalStack, $timeout, ConstUserRole, myUserFactory, ConstQuoteStatuses) {
        $rootScope.header = $rootScope.settings.SITE_NAME + ' | ' + $filter("translate")("Login");
        $scope.ConstUserRole = ConstUserRole;
        $scope.ConstQuoteStatuses = ConstQuoteStatuses;
        /* init function */

        $scope.init = function() {
            var current_state = $state.current.name;
            $timeout(function() {
                if (current_state === 'users_login') {
                    $rootScope.header = $rootScope.settings.SITE_NAME + ' | ' + $filter("translate")("Login");
                }
            }, 100);
        };
        $scope.init();

       /* $cookies.get('auth') set*/
        if ($cookies.get('auth') !== null && $cookies.get('auth') !== undefined) {
            $rootScope.$emit('updateParent', {
                isAuth: true
            });
            $state.go('user_dashboard', {
                'type': 'news_feed',
                'status': 'news_feed',
            });
        }
          
        $scope.user = {};
        $scope.save_btn = false;
            $scope.forgot_password = function() {
                $location.path('users/forgot_password');
            };
        /* normal login submit function */
        $scope.save = function($event) {
            if ($event === undefined || $event.keyCode === 13) {
                $scope.userLogin.$submitted = true;
                if ($scope.userLogin.$valid && !$scope.save_btn) {
                    $scope.save_btn = true;
                     /*  For login username or email check */
                     if ($rootScope.settings.USER_USING_TO_LOGIN === 'username') {
                        $scope.user.username = $scope.user_name;
                    }
                    if ($rootScope.settings.USER_USING_TO_LOGIN === 'email') {
                        $scope.user.email = $scope.user_name;
                    }
                   /* user login post factory */
                    usersLogin.login($scope.user, function(response) {
                            $scope.userLogin.$setPristine();
                            $scope.userLogin.$setUntouched();
                            $scope.response = response;
                            delete $scope.response.scope;
                            if ($scope.response.error.code === 0) {
                              /* login user details get factory*/
                                myUserFactory.get(function(response) {
                                    $rootScope.my_user = response.data;
                                    $rootScope.my_user.available_wallet_amount = Number($rootScope.my_user.available_wallet_amount||0);
                                });
                                $timeout(function() {
                                    $scope.UserDetails  = $scope.my_user;
                                }, 500);
                                $scope.Authuser = {
                                    id: $scope.response.id,
                                    username: $scope.response.username,
                                    role_id: $scope.response.role_id,
                                    refresh_token: $scope.response.refresh_token,
                                    attachment: $scope.response.attachment,
                                };
                                $cookies.put('auth', JSON.stringify($scope.Authuser), {
                                    path: '/'
                                });
                                $cookies.put('token', $scope.response.access_token, {
                                    path: '/'
                                });
                                $rootScope.$broadcast('updateParent', {
                                    isAuth: true,
                                    auth: $scope.response
                                });
                                if ($cookies.get("redirect_url") !== null && $cookies.get("redirect_url") !== undefined && $cookies.get("redirect_url") !== '/') {                 
                                    $uibModalStack.dismissAll();
                                    $cookies.remove("redirect_url", {
                                        path: "/"
                                    });
                                    $location.path($cookies.get("redirect_url"));
                                } else {
                                    $uibModalStack.dismissAll();
                                    if ($rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Quote/Quote') > -1) {
                                        if ($scope.response.role_id === ConstUserRole.Freelancer) {
                                            $window.location.href = 'my_works';
                                        } else if ($scope.response.role_id === ConstUserRole.Employer) {
                                            $window.location.href = 'quote_bids/my_requests/all/' + $scope.ConstQuoteStatuses.UnderDiscussion + '/under_discussion';
                                        } else {
                                            $window.location.href = 'users/dashboard';
                                        }
                                    } else if ($rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Bidding/Bidding') > -1 &&  $scope.my_auth_user.user_login_count === '1') {
                                        $window.location.href = 'users/' + $scope.my_auth_user.id + '/' + $scope.my_auth_user.username;
                                    } else {
                                        $state.go('user_dashboard', {
                                            'type': 'news_feed',
                                            'status': 'news_feed',
                                        });
                                    }
                                }
                            } else {
                                flash.set($filter("translate")("Sorry, login failed. Either your username or password are incorrect or admin deactivated your account."), 'error', false);
                                $scope.save_btn = false;
                                $scope.user = {};
                            }
                        }, //jshint unused:false 
                        function(error) {
                            flash.set($filter("translate")("Sorry, login failed. Either your username or password are incorrect or admin deactivated your account."), 'error', false);
                            $scope.save_btn = false;
                        });
                }
            }
        };

       /* social login submit function*/
        $scope.authenticate = function(provider) {
            $scope.social_login_provider = provider;
             $cookies.put('provider_name', $scope.social_login_provider);
            $auth.authenticate(provider)
                .then(function(response) {
                    $scope.response = response.data;
                              /* login user details get factory*/
                  
                        if ($scope.response.already_register === '1') {
                             myUserFactory.get(function(response) {
                                $rootScope.my_auth_user = response.data;
                            });
                            if ($rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Quote/Quote') > -1) {
                                if ($scope.response.role_id === ConstUserRole.Freelancer) {
                                    $window.location.href = 'my_works';
                                } else if ($scope.response.role_id === ConstUserRole.Employer) {
                                    $window.location.href = 'quote_bids/my_requests/all/' + $scope.ConstQuoteStatuses.UnderDiscussion + '/under_discussion';
                                } else {
                                    $window.location.href = 'users/dashboard';
                                }
                            } else if ($rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Bidding/Bidding') > -1 &&  $scope.my_auth_user.user_login_count === '1') {
                                $window.location.href = 'users/' + $scope.my_auth_user.id + '/' + $scope.my_auth_user.username;
                            } else {
                                $state.go('user_dashboard', {
                                    'type': 'news_feed',
                                    'status': 'news_feed',
                                });
                            }
                        }
                    if ($scope.response.error.code === 0 && $scope.response.thrid_party_profile && $scope.response.already_register !== '1') {
                        $window.localStorage.setItem("twitter_auth", JSON.stringify($scope.response));
                        $state.go('get_email');
                    } else if ($scope.response.access_token) {
                        $scope.Authuser = {
                            id: $scope.response.id,
                            username: $scope.response.username,
                            role_id: $scope.response.role_id,
                            refresh_token: $scope.response.refresh_token,
                        };
                        $cookies.put('auth', JSON.stringify($scope.Authuser), {
                            path: '/'
                        });
                        $cookies.put('token', $scope.response.access_token, {
                            path: '/'
                        });
                        $rootScope.user = $scope.response;
                        $rootScope.$emit('updateParent', {
                            isAuth: true
                        });
                        if ($cookies.get("redirect_url") !== null && $cookies.get("redirect_url") !== undefined) {
                            $location.path($cookies.get("redirect_url"));
                            $cookies.remove('redirect_url');
                        } else {
                            $location.path('/');
                        }
                    }
                    $uibModalStack.dismissAll();
                })
                .catch(function(error) {
                    console.log("error in login", error);
                });
        };
        var params = {};
        params.fields = 'name,icon_class,slug,button_class';
        params.is_active = true;
        providers.get(params, function(response) {
            $scope.providers = response.data;
            $rootScope.provider = $scope.providers;
        });
    }])

  /*  twitter controller*/

    .controller('TwitterLoginController', ['$rootScope', '$scope', 'twitterLogin', 'providers', '$auth', 'flash', '$window', '$location', '$state', '$cookies', '$filter', '$timeout', 'ConstUserRole', 'ConstQuoteStatuses', 'myUserFactory', function($rootScope, $scope, twitterLogin, providers, $auth, flash, $window, $location, $state, $cookies, $filter, $timeout, ConstUserRole, ConstQuoteStatuses, myUserFactory) {
        $scope.ConstUserRole = ConstUserRole;
        $scope.ConstQuoteStatuses = ConstQuoteStatuses;
        $scope.provider_login = $cookies.get('provider_name', $scope.social_login_provider);
        $scope.save_btn = false;
        myUserFactory.get(function(response) {
            $rootScope.my_auth_user = response.data;
        });
        
        $scope.loginNow = function(form) {
            if (form) {
                $scope.user = {};
                $scope.save_btn = true;
                $scope.twitterEmail.$setPristine();
                $scope.twitterEmail.$setUntouched();
                var params = {};
                $scope.user = JSON.parse($window.localStorage.getItem("twitter_auth"));
                $window.localStorage.removeItem("twitter_auth");
                if ($scope.userChoose === 'freelancer') {
                    $scope.user.is_freelancer = 1;
                } else if ($scope.userChoose === 'empolyer') {
                    $scope.user.is_employer = 1;
                } else {
                    $scope.user.is_freelancer = 1;
                    $scope.user.is_employer = 1;
                }
                if ($scope.provider_login === 'twitter') {
                    $scope.user.email = $scope.user_email;
                    params.type = 'twitter';
                }
                if ($scope.provider_login === 'facebook') {
                    params.type = 'facebook';
                }
                if ($scope.provider_login === 'google') {
                    params.type = 'google';
                }
                twitterLogin.login(params, $scope.user, function(response) {
                    $scope.response = response;
                    $scope.save_btn = false;
                    if ($scope.response.error.code === 0) {
                        myUserFactory();
                        if ($scope.provider_login === 'facebook' || $scope.provider_login === 'google') {
                            $scope.Authuser = {
                                id: $scope.response.id,
                                username: $scope.response.username,
                                role_id: $scope.response.role_id,
                                refresh_token: $scope.response.refresh_token,
                            };
                            $cookies.put('auth', JSON.stringify($scope.Authuser), {
                                path: '/'
                            });
                            $cookies.put('token', $scope.response.access_token, {
                                path: '/'
                            });
                            $rootScope.user = $scope.response;
                            $rootScope.$emit('updateParent', {
                                isAuth: true
                            });
                            flash.set($filter("translate")("You have successfully registered with our site."), 'success', false);
                            if ($cookies.get("redirect_url") !== null && $cookies.get("redirect_url") !== undefined) {
                                $location.path($cookies.get("redirect_url"));
                                $cookies.remove('redirect_url');
                            }
                            if ($rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Quote/Quote') > -1) {
                                if ($scope.response.role_id === ConstUserRole.Freelancer) {
                                    $window.location.href = 'my_works';
                                } else if ($scope.response.role_id === ConstUserRole.Employer) {
                                    $window.location.href = 'quote_bids/my_requests/all/' + $scope.ConstQuoteStatuses.UnderDiscussion + '/under_discussion';
                                } else {
                                    $window.location.href = 'users/dashboard';
                                }
                            } else if ($rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Bidding/Bidding') > -1 &&  $scope.my_auth_user.user_login_count === '1') {
                                $window.location.href = 'users/' + $scope.my_auth_user.id + '/' + $scope.my_auth_user.username;
                            } else {
                                $state.go('user_dashboard', {
                                    'type': 'news_feed',
                                    'status': 'news_feed',
                                });
                            }
                        }
                        if ($scope.provider_login === 'twitter') {
                            if (parseInt($rootScope.settings.USER_IS_AUTO_LOGIN_AFTER_REGISTER)) {
                                $scope.Authuser = {
                                    id: $scope.response.id,
                                    username: $scope.response.username,
                                    role_id: $scope.response.role_id,
                                    refresh_token: $scope.response.refresh_token,
                                };
                                $cookies.put('auth', JSON.stringify($scope.Authuser), {
                                    path: '/'
                                });
                                $cookies.put('token', $scope.response.access_token, {
                                    path: '/'
                                });
                                $rootScope.user = $scope.response;
                                $rootScope.$emit('updateParent', {
                                    isAuth: true
                                });
                                flash.set($filter("translate")("You have successfully registered with our site."), 'success', false);
                                if ($cookies.get("redirect_url") !== null && $cookies.get("redirect_url") !== undefined) {
                                    $location.path($cookies.get("redirect_url"));
                                    $cookies.remove('redirect_url');
                                }
                                if ($rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Quote/Quote') > -1) {
                                    if ($scope.response.role_id === ConstUserRole.Freelancer) {
                                        $window.location.href = 'my_works';
                                    } else if ($scope.response.role_id === ConstUserRole.Employer) {
                                        $window.location.href = 'quote_bids/my_requests/all/' + $scope.ConstQuoteStatuses.UnderDiscussion + '/under_discussion';
                                    } else {
                                        $window.location.href = 'users/dashboard';
                                    }
                                } else if ($rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Bidding/Bidding') > -1 &&  $scope.my_auth_user.user_login_count === '1') {
                                    $window.location.href = 'users/' + $scope.my_auth_user.id + '/' + $scope.my_auth_user.username;
                                } else {
                                    $state.go('user_dashboard', {
                                        'type': 'news_feed',
                                        'status': 'news_feed',
                                    });
                                }
                            } else if (parseInt($rootScope.settings.USER_IS_EMAIL_VERIFICATION_FOR_REGISTER)) {
                                flash.set($filter("translate")("You have successfully registered with our site and your activation mail has been sent to your mail inbox."), 'success', false);
                                $state.go('home');
                            } else if (parseInt($rootScope.settings.USER_IS_ADMIN_ACTIVATE_AFTER_REGISTER)) {
                                flash.set($filter("translate")("You have successfully registered with our site. After administrator approval you can login to site."), 'success', false);
                                $state.go('home');
                            } else if (parseInt($rootScope.settings.USER_IS_EMAIL_VERIFICATION_FOR_REGISTER) && parseInt($rootScope.settings.USER_IS_ADMIN_ACTIVATE_AFTER_REGISTER)) {
                                flash.set($filter("translate")("You have successfully registered with our site you can login after email verification and administrator approval. Your activation mail has been sent to your mail inbox."), 'success', false);
                                $state.go('home');
                            } else {
                                $scope.Authuser = {
                                    id: $scope.response.id,
                                    username: $scope.response.username,
                                    role_id: $scope.response.role_id,
                                    refresh_token: $scope.response.refresh_token,
                                };
                                $cookies.put('auth', JSON.stringify($scope.Authuser), {
                                    path: '/'
                                });
                                $cookies.put('token', $scope.response.access_token, {
                                    path: '/'
                                });
                                $rootScope.user = $scope.response;
                                $rootScope.$emit('updateParent', {
                                    isAuth: true
                                });
                                flash.set($filter("translate")("You have successfully registered with our site."), 'success', false);
                                if ($cookies.get("redirect_url") !== null && $cookies.get("redirect_url") !== undefined) {
                                    $location.path($cookies.get("redirect_url"));
                                    $cookies.remove('redirect_url');
                                }
                                if ($rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Quote/Quote') > -1) {
                                    if ($scope.response.role_id === ConstUserRole.Freelancer) {
                                        $window.location.href = 'my_works';
                                    } else if ($scope.response.role_id === ConstUserRole.Employer) {
                                        $window.location.href = 'quote_bids/my_requests/all/' + $scope.ConstQuoteStatuses.UnderDiscussion + '/under_discussion';
                                    } else {
                                        $window.location.href = 'users/dashboard';
                                    }
                                } else if ($rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Bidding/Bidding') > -1 &&  $scope.my_auth_user.user_login_count === '1') {
                                    $window.location.href = 'users/' + $scope.my_auth_user.id + '/' + $scope.my_auth_user.username;
                                } else {
                                    $state.go('user_dashboard', {
                                        'type': 'news_feed',
                                        'status': 'news_feed',
                                    });
                                }
                            }
                        }
                    }
                });
            }
        };
    }]);