'use strict';
/**
 * @ngdoc function
 * @name getlancerApp.controller:UsersSettingsController
 * @description
 * # UsersSettingsController
 * Controller of the getlancerApp
 */
angular.module('getlancerApp')
    .controller('UsersSettingsController', ['$rootScope', '$scope', 'userSettings', 'flash', '$filter', 'md5', 'Upload', '$location', '$cookies', function ($rootScope, $scope, userSettings, flash, $filter, md5, Upload, $location,  $cookies) {
        $rootScope.header = $rootScope.settings.SITE_NAME + ' | ' + $filter("translate")("Profile");
        $scope.save_btn = false;
        $rootScope.url_split = $location.path().split("/")[2];
            if ($cookies.get("auth") !== null && $cookies.get("auth") !== undefined) {
                $scope.auth_user_detail = $cookies.getObject("auth");
            }
        $scope.save = function (form) {
            if (form && !$scope.save_btn) {
                $scope.save_btn = true;
                $scope.usersSettings.id = $rootScope.user.id;
                var user_details = {};
                user_details.id = $rootScope.user.id;
                user_details = $scope.usersSettings;
                userSettings.update(user_details, function (response) {
                    $scope.response = response;
                    if ($scope.response.error.code === 0) {
                        $cookies.remove('auth');
                        $scope.Authuser = { 
                         id: $scope.auth_user_detail.id,
                         username: $scope.auth_user_detail.username,
                         role_id: $scope.auth_user_detail.role_id,
                         refresh_token: $scope.auth_user_detail.refresh_token,
                         attachment: user_details.attachment
                    };
                    $cookies.put('auth', JSON.stringify($scope.Authuser), {
                                    path: '/'
                                });
                        flash.set($filter("translate")("User Profile has been updated."), 'success', false);
                    } else {
                        flash.set($filter("translate")("User Profile could not be updated. Please try again."), 'error', false);
                    }
                    $scope.save_btn = false;
                });
            }
        };
        $scope.index = function () {
            var params = {};
            params.id = $rootScope.user.id;
            userSettings.get(params, function (response) {
                $scope.usersSettings = response.data;
                $scope.usersSettings.zip_code = response.data.zip_code;
                $scope.place = $scope.usersSettings.full_address;
                $scope.usersSettings.hourly_rate = parseInt($scope.usersSettings.hourly_rate);
                delete $scope.usersSettings.image_name;
                if (angular.isDefined(response.data.attachment) && response.data.attachment !== null) {
                    var c = new Date();
                    var hash = md5.createHash(response.data.attachment.class + response.data.attachment.foreign_id + 'png' + 'normal_thumb');
                    $scope.usersSettings.image_name = 'images/normal_thumb/' + response.data.attachment.class + '/' + response.data.attachment.foreign_id + '.' + hash + '.png?' + c.getTime();
                }
                $scope.gender_type = [
                    {
                        name: $filter("translate")("Male"),
                        value: 1
                    },
                    {
                        name: $filter("translate")("Female"),
                        value: 2
                    }
                ];
            });
        };
        $scope.location = function () {
            $scope.usersSettings.city = {};
            $scope.usersSettings.state = {};
            $scope.usersSettings.country = {};
            var k = 0;
            if ($scope.place !== undefined) {
                angular.forEach($scope.place.address_components, function (value) {
                    if (value.types[0] === 'locality' || value.types[0] === 'administrative_area_level_2') {
                        if (value.types[0] === 'locality') {
                            k = 1;
                        }
                    }
                    if (value.types[0] === 'administrative_area_level_1') {
                        $scope.usersSettings.city.name = value.long_name;
                        //   $scope.disable_state = true;
                    }
                    if (value.types[0] === 'administrative_area_level_1') {
                        $scope.usersSettings.state.name = value.long_name;
                        //  $scope.disable_state = true;
                    }
                    if (value.types[0] === 'country') {
                        $scope.usersSettings.country.iso_alpha2 = value.short_name;
                        //   $scope.disable_country = true;
                    }
                    if (value.types[0] === 'postal_code') {
                        $scope.disable_zip = true;
                        $scope.required_message = '';
                        $scope.usersSettings.zip_code = parseInt(value.long_name);
                    } else {
                        $scope.disable_zip = false;
                        $scope.usersSettings.zip_code = '';
                        $scope.country_zip_code = (parseInt(value.long_name) ||0);
                        if ($scope.country_zip_code === 0) {
                            $scope.required_message = 'Required';
                        } else {
                            $scope.required_message = '';
                        }

                    }
                    $scope.usersSettings.latitude = $scope.place.geometry.location.lat();
                    $scope.disable_latitude = true;
                    $scope.usersSettings.longitude = $scope.place.geometry.location.lng();
                    $scope.disable_longitude = true;
                    $scope.usersSettings.address = $scope.place.name + " " + $scope.place.vicinity;
                    $scope.usersSettings.full_address = $scope.place.formatted_address;
                });
            }
        };
        $scope.index();
        $scope.uploadUserAvatare = function (file) {
            angular.element('#custom-upload')
                .val(file.name);
            Upload.upload({
                url: '/api/v1/attachments?class=UserAvatar',
                data: {
                    file: file
                }
            })
                .then(function (response) {
                    if (response.data.error.code === 0) {
                        var user_image = {};
                        user_image.image = response.data.attachment;
                        user_image.id = $rootScope.user.id;
                        $scope.error_message = '';
                        userSettings.update(user_image, function (response) {
                            if (angular.isDefined(response.data.attachment) && response.data.attachment !== null) {
                                var c = new Date();
                                var hash = md5.createHash(response.data.attachment.class + response.data.attachment.foreign_id + 'png' + 'normal_thumb');
                                $rootScope.user.userimage = 'images/normal_thumb/' + response.data.attachment.class + '/' + response.data.attachment.foreign_id + '.' + hash + '.png?' + c.getTime();
                                $scope.usersSettings.image_name = 'images/normal_thumb/' + response.data.attachment.class + '/' + response.data.attachment.foreign_id + '.' + hash + '.png?' + c.getTime();
                            }
                        });
                    } else {
                        $scope.error_message = response.data.error.message;
                    }
                });
        };
    }]);