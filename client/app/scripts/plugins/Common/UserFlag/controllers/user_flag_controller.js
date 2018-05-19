 angular.module('getlancerApp.Common.UserFlag')
 .controller('UserFlagController', ['$rootScope', '$scope', '$stateParams', '$state', 'flash', '$uibModal', '$uibModalStack', 'FlagCategoriesFactory', 'FlagsFactory','$filter', function($rootScope, $scope, $stateParams, $state, flash, $uibModal, $uibModalStack, FlagCategoriesFactory, FlagsFactory, $filter) {
        $scope.user_id = $stateParams.id;
        var model = this;
        var flashMessage;
        var params = {};
        $scope.init = function() {
            $scope.getFlagCategories();
        };
        /*Flag*/
        $scope.getFlagCategories = function() {
            var params = {};
            params.foreign_id = $scope.user_id;
            params.class = 'User';
            FlagCategoriesFactory.get(params, function(response) {
                $scope.flagcategories = response.data;
            });
        };
        $scope.submit = function() {
            var params = {};
            if ($scope.flagform.$valid) {
                params.foreign_id = $state.params.id;
                params.flag_category_id = $scope.flag.flag_category_id;
                params.message = $scope.flag.message;
                params.class = 'User';
                FlagsFactory.create(params, function(response) {
                    if (response.error.code === 0) {
                        $scope.is_flag = true;
                        flash.set($filter("translate")("Flagged successfully."), 'success', false);
                        $state.reload();
                        $uibModalStack.dismissAll();
                    }
                });
            }
        };
        $scope.closeInstance = function() {
            $uibModalStack.dismissAll();
        };
       
        $scope.init();
      }]);