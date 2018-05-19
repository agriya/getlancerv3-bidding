'use strict';
/**
 * @ngdoc function
 * @name getlancerApp.controller:PluginsController
 * @description
 * # PluginsController
PluginsController * Controller of the getlancerApp
 */
angular.module('base')
    .controller('PluginsController', function($scope, $http, notification, $state, $window, $cookies) {
        $scope.languageArr = [];
        var enabled_plugin;
        $scope.plugindisabled = false;
        function getPluginDetails() {
            $http.get(admin_api_url + 'api/v1/plugins', {})
                .success(function(response) {
                    $scope.bidding_plugin = response.data.bidding_plugin;
                    $scope.contest_plugin = response.data.contest_plugin;
                    $scope.job_plugin = response.data.job_plugin;
                    $scope.portfolio_plugin = response.data.portfolio_plugin;
                    $scope.quote_plugin = response.data.quote_plugin;
                    $scope.other_plugin = response.data.other_plugin;
                    $scope.enabled_plugin = response.data.enabled_plugin;
                    enabled_plugin = response.data.enabled_plugin;
                    if(enabled_plugin.indexOf('Quote/Quote') === -1)
                    {
                       $scope.plugindisabled = true;   
                    }
                 
                    $cookies.put('enabled_plugins', JSON.stringify($scope.enabled_plugin), {
                        path: '/'
                    });
                }, function(error) {});
        }
        $scope.checkStatus = function(plugin, enabled_plugins) {
            if ($.inArray(plugin, enabled_plugins) > -1) {
                return true;
            } else {
                return false;
            }
        };
        $scope.updatePluginStatus = function(e, plugin_name, status, hash) {
            e.preventDefault();
            var target = angular.element(e.target);
            var checkDisabled = target.parent()
                .hasClass('disabled');
            if (checkDisabled === true) {
                return false;
            }
            if(plugin_name === 'Quote/Quote')
            {
                $scope.plugindisabled = true;
            }
            var params = {};
            var confirm_msg = '';
            var notification_msg = '';
            params.plugin = plugin_name;
            params.is_enabled = status;
            confirm_msg = (status === 0) ? "Are you sure want to disable?" : "Are you sure want to enable?";
            notification_msg = (status === 0) ? "disabled" : "enabled";
            if (confirm(confirm_msg)) {
                $http.put(admin_api_url + 'api/v1/plugins', params)
                    .success(function(response) {
                        if (response.error.code === 0) {
                            var plugin_flash_name = plugin_name.split("/")[1];
                            notification.log(plugin_flash_name + ' Plugin ' + notification_msg + ' successfully.', {
                                addnCls: 'humane-flatty-success'
                            });
                            getPluginDetails();
                        }
                    }, function(error) {});
            }
        };
        $scope.fullRefresh = function() {
            $window.location.reload();
        };
        getPluginDetails();
    });