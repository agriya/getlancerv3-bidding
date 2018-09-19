/**
 * Link to previous page
 *
 * Usage:
 * <ma-back-button entry="entry" size="xs"></ma-back-button>
 */
"use strict";
module.exports = maBackButtonDirective;

function maBackButtonDirective($window) {
    return {
        restrict: "E",
        scope: {
            size: "@",
            label: "@"
        },
        link: function link(scope) {
            scope.label = scope.label || "BACK";
            scope.back = function() {
                return $window.history.back();
            };
        },
        template: " <a class=\"btn btn-default\" ng-class=\"size ? 'btn-' + size : ''\" ng-click=\"back()\">\n<span class=\"glyphicon glyphicon-chevron-left\" aria-hidden=\"true\"></span>&nbsp;<span class=\"hidden-xs\" translate=\"{{ ::label }}\"></span>\n</a>"
    };
}
maBackButtonDirective.$inject = ["$window"];
//# sourceMappingURL=maBackButton.js.map