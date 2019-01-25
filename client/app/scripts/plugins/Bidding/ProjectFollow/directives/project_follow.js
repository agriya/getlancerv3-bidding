'use strict';
angular.module('getlancerApp.Bidding.ProjectFollow')
     .directive('bookmarkFollow', function () {
        return {
            restrict: 'EA',
            //replace: true,
            templateUrl: 'scripts/plugins/Bidding/ProjectFollow/views/default/project_follow.html',
            scope: {
                classname: '@',
            },
            controller: 'ProjectFollowController'
        }
    });