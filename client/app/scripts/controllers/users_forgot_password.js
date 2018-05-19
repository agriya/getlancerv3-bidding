'use strict';
/**
 * @ngdoc function
 * @name getlancerApp.controller:UsersForgotPasswordController
 * @description
 * # UsersForgotPasswordController
 * Controller of the getlancerApp
 */
angular.module('getlancerApp')
    .controller('UsersForgotPasswordController', ['$rootScope', '$scope', '$location', 'flash', 'usersForgotPassword', '$filter', 'vcRecaptchaService', '$uibModalStack', '$cookies', function($rootScope, $scope, $location, flash, usersForgotPassword, $filter, vcRecaptchaService, $uibModalStack, $cookies) {
        $rootScope.header = $rootScope.settings.SITE_NAME + ' | ' + $filter("translate")("Forgot Password");
        $scope.save_btn = false;
        $uibModalStack.dismissAll();
        if (parseInt($rootScope.settings.USER_IS_CAPTCHA_ENABLED_FORGOT_PASSWORD)) {
            $scope.show_recaptcha = true;
        }
        if ($cookies.get('auth') !== null && $cookies.get('auth') !== undefined) {
            $rootScope.$emit('updateParent', {
                isAuth: true
            });
            $rootScope.header = $rootScope.settings.SITE_NAME + ' | Home';
            $location.path('/');
        }
        $scope.user = {};
        $scope.save = function(isvalid, userForgotPassword) {
            if (isvalid && !$scope.save_btn && !$rootScope.isAuth) {
                $scope.save_btn = true;
                usersForgotPassword.forgetPassword($scope.user, function(response) {
                    $scope.response = response;
                    if ($scope.response.error.code === 0) {
                        flash.set($filter("translate")("We have sent an email to " + $scope.user.email + " with further instructions."), 'success', false);
                        $location.path('/users/login');
                    } else {
                        $scope.save_btn = false;
                        flash.set($filter("translate")("There is no user registered with the email " + $scope.user.email + " or admin deactivated your account. If you spelled the E-mail incorrectly or entered the wrong E-mail, please try again."), 'error', false);
                        userForgotPassword.$setPristine();
                        userForgotPassword.$setUntouched();
                        $scope.user = {};
                        if (parseInt($rootScope.settings.USER_IS_CAPTCHA_ENABLED_FORGOT_PASSWORD)) {
                            vcRecaptchaService.reload($scope.widgetId);
                        }
                    }
                });
            }
        };
    }]);