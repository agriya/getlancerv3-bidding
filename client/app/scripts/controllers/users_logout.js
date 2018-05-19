	'use strict';
	/**
	 * @ngdoc function
	 * @name getlancerApp.controller:UsersLogutController
	 * @description
	 * # UsersLogutController
	 * Controller of the getlancerApp
	 */
	angular.module('getlancerApp')
	    .controller('UsersLogoutController', ['$rootScope', '$scope', 'usersLogout', '$location', '$window', '$filter', '$cookies', 'flash', function($rootScope, $scope, usersLogout, $location, $window, $filter, $cookies, flash) {
	        usersLogout.logout('', function(response) {
	            $scope.response = response;
	            if ($scope.response.error.code === 0) {
	                flash.set($filter("translate")("You are now logged out of the site."), 'success', false);
	                delete $rootScope.user;
					delete $rootScope.Freelancer;
	                $cookies.remove("auth", {
	                    path: "/"
	                });
	                $cookies.remove("token", {
	                    path: "/"
	                });
	                $cookies.remove("new_cart_cookie");
	                $scope.$emit('updateParent', {
	                    isAuth: false
	                });
	                $location.path('/');
	            }
	        });
    }]);