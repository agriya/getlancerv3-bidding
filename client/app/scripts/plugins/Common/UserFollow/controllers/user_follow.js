'use strict';
/**
 * @ngdoc function
 * @name getlancerApp.Common.UserFollow
 * @description
 * # UserFollowController
 * Controller of the getlancerApp
 */
angular.module('getlancerApp.Common.UserFollow')
.directive('profileViewFollower', function () {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: 'scripts/plugins/Common/UserFollow/views/default/user_follow.html',
            controller: function ($rootScope, $scope, $state, $filter, UnfollowFactory, FollowersFactory ,$stateParams, flash) {
            $scope.user_id = $stateParams.id;
            var model = this;
            var flash;
            var params = {};
        /*follow*/
       $scope.userFollow = function() {
            var follow = {};
            follow.foreign_id = $scope.user_id;
            follow.class = 'User';
            FollowersFactory.create(follow, function(response) {
                if (response.error.code === 0) {
                    flash.set($filter("translate")("Follow successfully."), 'success', false);
                    $scope.follow_id = response.id;
                    $scope.isfollow = true;
                }else{
                     flash.set($filter("translate")("Follow failure."), 'error', false);
                }
            });
        };
        $scope.UserUnFollow = function(follow_id) {
            var follow = {};
            follow.followerId = follow_id;
            UnfollowFactory.remove(follow, function(response) {
                if (response.error.code === 0) {
                    flash.set($filter("translate")("UnFollow successfully."), 'success', false);
                    $scope.follow_id = 0;
                    $scope.isfollow = false;
                }else{
                    flash.set($filter("translate")("UnFollow failure."), 'error', false);
                }
            });
        };
            }
        }
    });



