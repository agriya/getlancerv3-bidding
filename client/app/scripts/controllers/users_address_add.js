'use strict';
/**
 * @ngdoc function
 * @name getlancerApp.controller:UsersAddressAddController
 * @description
 * # UsersAddressAddController
 * Controller of the getlancerApp
 */
angular.module('getlancerApp')
    .controller('UsersAddressAddController', ['$rootScope', '$scope', 'usersAddresses', 'flash', '$timeout', '$location', '$filter', function($rootScope, $scope, usersAddresses, flash, $timeout, $location, $filter) {
        $rootScope.header = $rootScope.settings.SITE_NAME + ' | ' + $filter("translate")("Users Addresses Add");
        $scope.save_btn = false;
        $scope.address = {};
        $scope.address.city = {};
        $scope.address.state = {};
        $scope.address.country = {};
        $scope.place = null;
        $scope.autocompleteOptions = {
            types: ['cities']
        };
        $scope.location = function() {
            var k = 0;
            angular.forEach($scope.place.address_components, function(value, key) {
                //jshint unused:false
                if (value.types[0] === 'locality' || value.types[0] === 'administrative_area_level_2') {
                    if (k === 0) {
                        $scope.address.city.name = value.long_name;
                        $scope.disable_city = true;
                    }
                    if (value.types[0] === 'locality') {
                        k = 1;
                    }
                }
                if (value.types[0] === 'administrative_area_level_1') {
                    $scope.address.state.name = value.long_name;
                    $scope.disable_state = true;
                }
                if (value.types[0] === 'country') {
                    $scope.address.country.iso_alpha2 = value.short_name;
                    $scope.disable_country = true;
                }
                if (value.types[0] === 'postal_code') {
                    $scope.address.zip_code = parseInt(value.long_name);
                    $scope.disable_zip = true;
                }
                $scope.address.latitude = $scope.place.geometry.location.lat();
                $scope.disable_latitude = true;
                $scope.address.longitude = $scope.place.geometry.location.lng();
                $scope.disable_longitude = true;
            });
        };
        $scope.save = function() {
            if ($scope.userAddress.$valid && !$scope.save_btn) {
                $scope.save_btn = true;
                $scope.address.user_id = $rootScope.user.id;
                if ($scope.place !== null) {
                    $scope.address.latitude = $scope.place.geometry.location.lat();
                    $scope.address.longitude = $scope.place.geometry.location.lng();
                }
                usersAddresses.create($scope.address, function(response) {
                    $scope.response = response;
                    if ($scope.response.error.code === 0) {
                        flash.set($filter("translate")("User address added successfully."), 'success', false);
                        $timeout(function() {
                            $location.path('/users/addresses');
                        }, 1000);
                    } else {
                        flash.set($filter("translate")("User address could not be added."), 'error', false);
                        $scope.save_btn = false;
                    }
                });
            }
        };
    }]);