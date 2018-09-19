import menuBarView from '../../view/menuBar.html';
import angular from 'angular';
export default function maMenuBar($location, $rootScope, $compile) {
    return {
        restrict: 'E',
        scope: {
            'menu': '&'
        },
        link: function(scope, element) {
            scope.menu = scope.menu();
            scope.path = $location.path();
            var jqWindow = $(window);
            // initialize openMenus
            var openMenus = scope.menu.children()
                .filter(function(menu) {
                    return menu.isChildActive(scope.path);
                });
            // manually render on change to avoid checking menu.isActive at each dirty check
            var listener = $rootScope.$on('$locationChangeSuccess', function() {
                scope.path = $location.path();
                render();
            });
            $rootScope.$on('$destroy', listener);
            scope.toggleMenu = function(menu) {
                // handle click on parent menu manually
                // because we chose bindOnce in the template for performance reasons
                if (openMenus.indexOf(menu) !== -1) {
                    // menu is already open, the click closes it
                    // except if a submenu is open
                    if (menu.isChildActive(scope.path)) {
                        return;
                    }
                    openMenus.splice(openMenus.indexOf(menu), 1);
                    closeMenu(menu);
                } else {
                    // menu is closed, the click opens it
                    openMenus.push(menu);
                    openMenu(menu);
                }
                // we don't render() in that case because it would cut the animation
                return;
            };
            scope.activateLink = function(menu) {
                if (!menu.link()) {
                    return;
                }
                // close all open menus
                // no need to close the menus with animation using closeMenu(),
                // the menu will rerender anyway because of the listener on $locationChangeSuccess
                // so the animation don't work in that case
                if (menu.autoClose()) {
                    openMenus = [];
                }
            };
            scope.hoverItem = function($event) {
                scope.showHoverElem = true;
                scope.hoverElemHeight = $event.currentTarget.clientHeight;
                var menuTopValue = 66;
                scope.hoverElemTop = $event.currentTarget.getBoundingClientRect()
                    .top - menuTopValue;
            };
            scope.isOpen = function(menu) {
                return menu.isChildActive(scope.path) || openMenus.indexOf(menu) !== -1;
            };
            render();
            scope.shouldMenuBeCollapsed = shouldMenuBeCollapsed;
            scope.canSidebarBeHidden = canSidebarBeHidden;

            function setMenuCollapsed(isCollapsed) {
                console.log(isCollapsed);
                isMenuCollapsed = isCollapsed;
            }

            function isMenuCollapsed() {
                return isMenuCollapsed;
            }

            function toggleMenuCollapsed() {
                isMenuCollapsed = !isMenuCollapsed;
            }
            scope.$on('$stateChangeSuccess', function() {
                if (canSidebarBeHidden()) {
                    setMenuCollapsed(true);
                }
            });

            function shouldMenuBeCollapsed() {
                return window.innerWidth <= 1200;
            }

            function canSidebarBeHidden() {
                return window.innerWidth <= 500;
            }

            function render() {
                element.html(menuBarView);
                $compile(element.contents())(scope);
            }

            function closeMenu(menu) {
                var elements = getElementsForMenu(menu);
                elements.ul.addClass('collapsed');
                elements.arrow.removeClass('glyphicon-menu-down');
                elements.arrow.addClass('glyphicon-menu-right');
                var elements_sidebar = elements.ul.parents('.al-sidebar-list-item');
                elements_sidebar.removeClass('ba-sidebar-item-expanded');
            }

            function openMenu(menu) {
                var elements = getElementsForMenu(menu);
                elements.ul.removeClass('collapsed');
                elements.arrow.removeClass('glyphicon-menu-right');
                elements.arrow.addClass('glyphicon-menu-down');
                var elements_sidebar = elements.ul.parents('.al-sidebar-list-item');
                elements_sidebar.addClass('ba-sidebar-item-expanded');
            }

            function getElementsForMenu(menu) {
                var parentLi;
                angular.forEach(element.find('li'), function(li) {
                    var liElement = angular.element(li);
                    if (liElement.attr('data-menu-id') == menu.uuid) {
                        parentLi = liElement;
                    }
                });
                return {
                    arrow: angular.element(parentLi.find('a')[0].getElementsByClassName('arrow')[0]),
                    ul: parentLi.find('ul')
                        .eq(0)
                };
            }
            scope.menuHeight = element[0].childNodes[0].clientHeight - 84;
            jqWindow.on('click', _onWindowClick);
            jqWindow.on('resize', _onWindowResize);
            scope.$on('$destroy', function() {
                jqWindow.off('click', _onWindowClick);
                jqWindow.off('resize', _onWindowResize);
            });

            function _onWindowClick($evt) {
                if (isDescendant(element[0], $evt.target) && !$evt.originalEvent.$sidebarEventProcessed && !isMenuCollapsed() && canSidebarBeHidden()) {
                    $evt.originalEvent.$sidebarEventProcessed = true;
                    $timeout(function() {
                        setMenuCollapsed(true);
                    }, 10);
                }
            }

            function isDescendant(parent, child) {
                var node = child.parentNode;
                while (node != null) {
                    if (node == parent) {
                        return true;
                    }
                    node = node.parentNode;
                }
                return false;
            }
            // watch window resize to change menu collapsed state if needed
            function _onWindowResize() {
                var newMenuCollapsed = shouldMenuBeCollapsed();
                var newMenuHeight = _calculateMenuHeight();
                if (newMenuCollapsed != isMenuCollapsed() || scope.menuHeight != newMenuHeight) {
                    scope.$apply(function() {
                        scope.menuHeight = newMenuHeight;
                        setMenuCollapsed(newMenuCollapsed)
                    });
                }
            }

            function _calculateMenuHeight() {
                return element[0].childNodes[0].clientHeight - 84;
            }
        }
    };
}
maMenuBar.$inject = ['$location', '$rootScope', '$compile'];