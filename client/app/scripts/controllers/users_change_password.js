'use strict';
/**
 * @ngdoc function
 * @name getlancerApp.controller:UsersChangePasswordController
 * @description
 * # UsersChangePasswordController
 * Controller of the getlancerApp
 */
angular.module('getlancerApp')
    .controller('UsersChangePasswordController', ['$rootScope', '$scope', '$location', 'flash', 'usersChangePassword', '$filter', '$cookies', function($rootScope, $scope, $location, flash, usersChangePassword, $filter, $cookies) {
        $rootScope.url_split = $location.path().split("/")[2];
        $rootScope.header = $rootScope.settings.SITE_NAME + ' | ' + $filter("translate")("Change Password");
        $scope.save_btn = false;
             $('#inputUsername3, #inputPassword3, #inputRepeatPassword3').on('keypress', function(e) {//jshint ignore:line
                if (e.which === 32){
                    return false;
                }
            });
        $scope.save = function() {
            if ($scope.userChangePassword.$valid && !$scope.save_btn) {
                $scope.save_btn = true;
                 $scope.userChangePassword.$setPristine();
                 $scope.userChangePassword.$setUntouched();
                $scope.changePassword.id = $rootScope.user.id;
                delete $scope.changePassword.repeat_password;
                usersChangePassword.changePassword($scope.changePassword, function(response) {
                    $scope.response = response;
                    if ($scope.response.error.code === 0) {
                        if (parseInt($rootScope.settings.USER_IS_LOGOUT_AFTER_CHANGE_PASSWORD)) {
                            $cookies.remove('auth');
                            $cookies.remove('token');
                            $scope.$emit('updateParent', {
                                isAuth: false
                            });
                            delete $rootScope.user;
                            $cookies.remove("auth", {
                                path: "/"
                            });
                            flash.set($filter("translate")("Your password has been changed successfully. Please login now"), 'success', false);
                            $location.path('/users/login');
                            $scope.userChangePassword.$setPristine();
                            $scope.userChangePassword.$setUntouched();
                        } else {
                            // $cookies.remove('auth');
                            // $cookies.remove('token');
                            delete $rootScope.user;
                            $cookies.remove("auth", {
                                path: "/"
                            });
                            $scope.$emit('updateParent', {
                                isAuth: false
                            });
                            $cookies.remove("token", {
                                path: "/"
                            });
                            $scope.changePassword = {};
                            $scope.save_btn = false;
                            flash.set($filter("translate")("Your password has been changed successfully.Please login now"), 'success', false);
                            $location.path('/users/login');
                            $scope.userChangePassword.$setPristine();
                            $scope.userChangePassword.$setUntouched();
                        }
                    } else if (response.error.code === 1) {
                        flash.set($filter("translate")("Your current password was incorrect."), 'error', false);
                        $scope.save_btn = false;
                        $scope.changePassword = '';
                        $scope.userChangePassword.$setPristine();
                        $scope.userChangePassword.$setUntouched();
                    }
                });
            }
        };
    }]);