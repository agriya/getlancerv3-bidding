'use strict';
/**
 * @ngdoc function
 * @name getlancerApp.controller:ContactController
 * @description
 * # ContactController
 * Controller of the getlancerApp
 */
angular.module('getlancerApp')
    .controller('ContactController', ['$rootScope', '$scope', 'contact', 'flash', 'vcRecaptchaService', '$state','$filter', function($rootScope, $scope, contact, flash, vcRecaptchaService, $state, $filter) {
        $rootScope.header = $rootScope.settings.SITE_NAME + ' | ' + $filter("translate")("Contact us");
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
            if ($scope.contactForm.$valid && !$scope.save_btn) {
                $scope.save_btn = true;
                contact.create($scope.contact, function(response) {
                    $scope.response = response;
                    if ($scope.response.error.code === 0) {
                        flash.set($filter("translate")("Thank you, we received your message and will get back to you as soon as possible."), 'success', false);
                        $state.go('contact', {}, {reload:true});
                    } else {
                        flash.set($filter("translate")("Contact could not be submitted. Please try again."), 'error', false);
                    }
                    $scope.save_btn = false;
                     if ($rootScope.settings.CAPTCHA_TYPE === 'Google reCAPTCHA') {
                            vcRecaptchaService.reload($scope.widgetId);
                        }
                });
            }
        };
    }]);