'use strict';
/**
 * @ngdoc function
 * @name getlancerApp.controller:UserActivationController
 * @description
 * # UserActivationController
 * Controller of the getlancerApp
 */
angular.module('getlancerApp')
    .controller('UserActivationController', ['$rootScope', '$scope', '$location', 'flash', 'userActivation', '$stateParams', '$filter', '$cookies', function($rootScope, $scope, $location, flash, userActivation, $stateParams, $filter, $cookies) {
        var element = {};
        element.user_id = $stateParams.user_id;
        element.hash = $stateParams.hash;
        userActivation.activation(element, function(response) {
            var flashMessage = "";
            $scope.response = response;
            if ($scope.response.error.code === 0) {
                delete $scope.response.scope;
                if (parseInt($rootScope.settings.USER_IS_AUTO_LOGIN_AFTER_REGISTER)) {
                      flashMessage = $filter("translate")("You have successfully activated and logged in to your  account.");
                     flash.set(flashMessage, 'success', false);
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
                    flash.set($filter("translate")("You have successfully activated and logged in to your account."), 'success', false);
                } else if (parseInt($rootScope.settings.USER_IS_ADMIN_ACTIVATE_AFTER_REGISTER)) {
                    flash.set($filter("translate")("You have successfully activated your account. But you can login after admin activate your account."), 'success', false);
                } else {
                    flash.set($filter("translate")("You have successfully activated your account. Now you can login."), 'success', false);
                }
                $location.path('/users/login');
            } else {
                flash.set($filter("translate")("Invalid activation request."), 'error', false);
                 $location.path('/');
            }
        });
    }]);