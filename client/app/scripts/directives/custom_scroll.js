'use strict';
/**
 * @ngdoc directive
 * @name getlancerApp.directive:googleAnalytics
 * @description
 * # googleAnalytics
 */
angular.module('getlancerApp')
    .directive('customScroll', function() {
        return {
            restrict: 'A',
            link: function postLink(scope, iElement) {
                iElement.mCustomScrollbar({
                    autoHideScrollbar: true,
                    theme: "rounded-dark",
                    mouseWheel: {
                        scrollAmount: 188
                    },
                    autoExpandScrollbar: true,
                    snapAmount: 188,
                    snapOffset: 65,
                    advanced: {
                        updateOnImageLoad: true
                    },
                    keyboard: {
                        scrollType: "stepped"
                    },
                    scrollButtons: {
                        enable: true,
                        scrollType: "stepped"
                    }
                });
            }
        };
    })
    .directive('showMore', [function() {
        return {
            restrict: 'AE',
            replace: true,
            scope: {
                text: '=',
                limit: '='
            },
            template: '<div><p ng-if="largeText" class="word-break"> {{ text | subString :0 :end }}<span ng-if="isShowMore">....</span><a ng-if="isShowMore" class="btn btn-link" ng-click="showMore()" >{{"Show More"|translate}}</a></p><p ng-if="!largeText">{{ text }}</p><span  ng-if="!isShowMore" class="btn btn-link" ng-click="showLess()">{{"Show Less"|translate}}</span></div>',
            link: function(scope) {
                scope.end = scope.limit;
                scope.isShowMore = true;
                scope.largeText = true;
                if (scope.text.length <= scope.limit) {
                    scope.largeText = false;
                }
                scope.showMore = function() {
                    scope.isShowMore = false;
                    scope.end = scope.text.length;
                };
                scope.showLess = function() {
                    scope.isShowMore = true;
                    scope.end = scope.limit;
                };
                /*$(document).ready(function() {
                    $(".quote-myrequest .builtrip-blk .btn-link").click(function() {
                        $(".quote_my_works").toggle("slow");
                        alert("sdf");
                    });
                });*/
            }
        };
}])
    .directive('fileDownloadAll', function(md5, $location) {
        var directive = {
            restrict: 'EA',
            replace: true,
            template: '<a href="{{downloadUrl}}" class="cursor" target="_blank"> <i class="fa fa-download"> </i> </a>',
            scope: {
                attachment: '@',
                downloadlable: '@'
            },
            link: function(scope) {
                scope.attachment = JSON.parse(scope.attachment);
                var download_file = md5.createHash(scope.attachment.class + scope.attachment.foreign_id + 'docdownload') + '.png';
                scope.downloadUrl = $location.protocol() + '://' + $location.host() + '/download/' + scope.attachment.class + '/' + scope.attachment.foreign_id + '/' + download_file;
                if (scope.downloadlable === undefined) {
                    scope.downloadlable = "Download";
                }
            },
        };
        return directive;
    });