'use strict';
angular.module('getlancerApp')
    .directive('profileViewShare', function($rootScope, md5, $window, $uibModal) {
        return {
            templateUrl: 'views/user_share.html',
            restrict: 'EA',
            replace: 'true',
            scope: 'true',
            link: function postLink(scope) {
                scope.ShareModel = function() {
                    scope.modalInstance = $uibModal.open({
                        templateUrl: 'views/user_share_modal.html',
                        backdrop: 'true',
                        controller: 'UserProfileController'
                    });
                };
            }
        };
    });