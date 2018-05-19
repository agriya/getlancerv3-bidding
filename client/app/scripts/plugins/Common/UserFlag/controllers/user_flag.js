'use strict';
/**
 * @ngdoc function
 * @name getlancerApp.Common.UserFlag
 * @description
 * # UserFlagController
 * Controller of the getlancerApp
 */

angular.module('getlancerApp.Common.UserFlag')
.directive('profileViewFlag', function ($uibModal, $rootScope) {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: 'scripts/plugins/Common/UserFlag/views/default/users_profile_flag.html',
            link: function postLink(scope, element, attr) {
                scope.flag = {};
                scope.FlagModel = function(user_id) {
                    $rootScope.quote_user_id = user_id;
                    scope.modalInstance = $uibModal.open({
                        templateUrl: 'scripts/plugins/Common/UserFlag/views/default/users_flag_model.html',
                        backdrop: 'true',
                        controller: 'UserFlagController'
                    });
                };
            }
        };
    });
     