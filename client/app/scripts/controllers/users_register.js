'use strict';
/**
 * @ngdoc function
 * @name getlancerApp.controller:UsersRegisterController
 * @description
 * # UsersRegisterController
 * Controller of the getlancerApp
 */
angular.module('getlancerApp')
    .controller('UsersRegisterController', ['$rootScope', '$scope', 'usersRegister', 'flash', '$location', '$timeout', 'vcRecaptchaService', '$filter', '$cookies', '$uibModalStack', 'providers', '$auth', '$window', '$state', function($rootScope, $scope, usersRegister, flash, $location, $timeout, vcRecaptchaService, $filter, $cookies, $uibModalStack, providers, $auth, $window, $state) {
        // $rootScope.header = $rootScope.settings.SITE_NAME + ' | ' + $filter("translate")("Register");
        var current_state = $state.current.name;
                if (current_state === 'register') {
                    $rootScope.header = $rootScope.settings.SITE_NAME + ' | ' + $filter("translate")("Register");
                }
        /*jshint -W117 */
        // function validatePassword() {
        //     var pass2 = document.getElementById("password")
        //         .value;
        //     var pass1 = document.getElementById("confirm-password")
        //         .value;
        //     if (pass2 !== null && pass1 !== null && pass1 !== pass2) {
        //         document.getElementById("confirm-password")
        //             .setCustomValidity("Password Mismatch");
        //     } else {
        //         document.getElementById("confirm-password")
        //             .setCustomValidity("");
        //     }
        // }
        // $(document)
        //     .on('blur change', "#password, #confirm-password", function() {
        //         validatePassword();
        //     });
        $(document)
            .ready(function() {
                if (document.getElementById("is_agree_terms_conditions")
                    .checked === false) {
                    document.getElementById("is_agree_terms_conditions")
                        .setCustomValidity("You must agree to the terms and conditions");
                } else {
                    document.getElementById("is_agree_terms_conditions")
                        .setCustomValidity("");
                }
            });
        var params = {};
        params.fields = 'name,icon_class,slug,button_class';
        params.is_active = true;
        providers.get(params, function(response) {
            $scope.providers = response.data;
        });
        $scope.save_btn = false;
        $scope.save = function() {
            if ($rootScope.settings.CAPTCHA_TYPE === 'Google reCAPTCHA') {
                var response = vcRecaptchaService.getResponse($scope.widgetId);
                if (response.length === 0) {
                    $scope.captchaErr = $filter("translate")("Please resolve the captcha and submit");
                } else {
                    $scope.captchaErr = '';
                }
            }
            if ($rootScope.settings.CAPTCHA_TYPE === 'Normal') {
                if ($rootScope.captchaFailed === false) {
                    $scope.userSignup.$valid = false;
                }
            }
            if ($scope.userSignup.$valid && !$scope.save_btn) {
                $scope.save_btn = true;
                if ($scope.userChoose === 'freelancer') {
                    $scope.user.is_freelancer = 1;
                } else if ($scope.userChoose === 'empolyer') {
                    $scope.user.is_employer = 1;
                } else {
                    $scope.user.is_freelancer = 1;
                    $scope.user.is_employer = 1;
                }
                if ($scope.userSignup.$valid) {
                    $scope.userSignup.$setPristine();
                    $scope.userSignup.$setUntouched();
                    usersRegister.create($scope.user, function(response) {
                        $scope.response = response;
                        delete $scope.response.scope;
                        if ($scope.response.error.code === 0) {
                            $scope.redirect = false;
                            if (parseInt($rootScope.settings.USER_IS_AUTO_LOGIN_AFTER_REGISTER)) {
                                $scope.redirect = true;
                                $cookies.put('auth', JSON.stringify($scope.response), {
                                    path: '/'
                                });
                                $cookies.put('token', $scope.response.access_token, {
                                    path: '/'
                                });
                                $rootScope.$broadcast('updateParent', {
                                    isAuth: true,
                                    auth: $scope.response
                                });
                                flash.set($filter("translate")("You have successfully registered with our site."), 'success', false);
                            } else if (parseInt($rootScope.settings.USER_IS_EMAIL_VERIFICATION_FOR_REGISTER) && parseInt($rootScope.settings.USER_IS_ADMIN_ACTIVATE_AFTER_REGISTER)) {
                                flash.set($filter("translate")("You have successfully registered with our site you can login after email verification and administrator approval. Your activation mail has been sent to your mail inbox."), 'success', false);
                            } else if (parseInt($rootScope.settings.USER_IS_ADMIN_ACTIVATE_AFTER_REGISTER)) {
                                flash.set($filter("translate")("You have successfully registered with our site. After administrator approval you can login to site."), 'success', false);
                            } else if (parseInt($rootScope.settings.USER_IS_EMAIL_VERIFICATION_FOR_REGISTER)) {
                                flash.set($filter("translate")("You have successfully registered with our site and your activation mail has been sent to your mail inbox."), 'success', false);
                            } else {
                                flash.set($filter("translate")("You have successfully registered with our site."), 'success', false);
                            }
                            if ($cookies.get("redirect_url") !== null && $cookies.get("redirect_url") !== undefined && $scope.redirect) {
                                $location.path($cookies.get("redirect_url"));
                                $cookies.remove('redirect_url');
                            } else {
                                $uibModalStack.dismissAll();
                                $timeout(function() {
                                    $location.path('/');
                                }, 1000);
                            }
                        } else {
                            if (angular.isDefined($scope.response.error.fields) && angular.isDefined($scope.response.error.fields.unique) && $scope.response.error.fields.unique.length !== 0) {
                                flash.set($filter("translate")("Please choose different " + $scope.response.error.fields.unique.join()), 'error', false);
                                $scope.save_btn = false;
                            } else {
                                flash.set($filter("translate")("User could not be added. Please, try again"), 'error', false);
                                $scope.save_btn = false;
                            }
                            if ($rootScope.settings.CAPTCHA_TYPE === 'Google reCAPTCHA') {
                                vcRecaptchaService.reload($scope.widgetId);
                            }
                        }
                    }, function(error) {
                        if (angular.isDefined(error.data.error.fields) && angular.isDefined(error.data.error.fields.unique) && error.data.error.fields.unique.length !== 0) {
                            flash.set($filter("translate")("Please choose different " + error.data.error.fields.unique.join()), 'error', false);
                            $scope.save_btn = false;
                        } else {
                            flash.set($filter("translate")("User could not be added. Please, try again"), 'error', false);
                            $scope.save_btn = false;
                        }
                        if ($rootScope.settings.CAPTCHA_TYPE === 'Google reCAPTCHA') {
                            vcRecaptchaService.reload($scope.widgetId);
                        }
                    });
                }
            }
        };
        $scope.authenticate = function(provider) {
            $auth.authenticate(provider)
                .then(function(response) {
                    $scope.response = response.data;
                    if ($scope.response.error.code === 0 && $scope.response.thrid_party_profile) {
                        $window.localStorage.setItem("twitter_auth", JSON.stringify($scope.response));
                        $state.go('get_email');
                    } else if ($scope.response.access_token) {
                        $cookies.put('auth', JSON.stringify($scope.response), {
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
    }]);