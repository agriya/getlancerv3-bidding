'use strict';
/*
-User avatar directive for activities page
-attachment class name, username and foreignid as isolatedscope params
-replace template with image url
*/
angular.module('getlancerApp')
     .directive('userAvatar', function (md5) {
        return {
            restrict: 'EA',
            replace: true,
            template: '<img ng-src="{{image_name}}" alt="{{username}}" class="img-circle user-small" target="_black">',
            scope: {
                username: '@',
                userclass: '@',
				foreignid: '@'
            },
            link: function (scope) {
                var hash = md5.createHash(scope.userclass + scope.foreignid + 'png' + 'small_thumb');
				scope.image_name = 'images/small_thumb/' + scope.userclass + '/' + scope.foreignid + '.' + hash + '.png';
	        },
        };
    });