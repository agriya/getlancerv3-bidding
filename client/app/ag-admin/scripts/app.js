/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
! function() {
    "use strict";

    function e(e, a) {
        e.otherwise("/dashboard"), a.addStaticItem({
            title: "Pages",
            icon: "ion-document",
            subMenu: [{
                title: "Sign In",
                fixedHref: "auth.html",
                blank: !0
            }, {
                title: "Sign Up",
                fixedHref: "reg.html",
                blank: !0
            }, {
                title: "User Profile",
                stateRef: "profile"
            }, {
                title: "404 Page",
                fixedHref: "404.html",
                blank: !0
            }]
        }), a.addStaticItem({
            title: "Menu Level 1",
            icon: "ion-ios-more",
            subMenu: [{
                title: "Menu Level 1.1",
                disabled: !0
            }, {
                title: "Menu Level 1.2",
                subMenu: [{
                    title: "Menu Level 1.2.1",
                    disabled: !0
                }]
            }]
        })
    }
    e.$inject = ["$urlRouterProvider", "baSidebarServiceProvider"], angular.module("BlurAdmin.pages", ["ui.router", "BlurAdmin.pages.dashboard", "BlurAdmin.pages.ui", "BlurAdmin.pages.components", "BlurAdmin.pages.form", "BlurAdmin.pages.tables", "BlurAdmin.pages.charts", "BlurAdmin.pages.maps", "BlurAdmin.pages.profile"])
        .config(e)
}(),
function() {
    "use strict";
    angular.module("BlurAdmin.theme", ["toastr", "chart.js", "angular-chartist", "angular.morris-chart", "textAngular", "BlurAdmin.theme.components"])
}(),
function() {
    "use strict";

    function e(e) {
        e.state("charts", {
            url: "/charts",
            "abstract": !0,
            template: "<div ui-view></div>",
            title: "Charts",
            sidebarMeta: {
                icon: "ion-stats-bars",
                order: 150
            }
        })
    }
    e.$inject = ["$stateProvider"], angular.module("BlurAdmin.pages.charts", ["BlurAdmin.pages.charts.amCharts", "BlurAdmin.pages.charts.chartJs", "BlurAdmin.pages.charts.chartist", "BlurAdmin.pages.charts.morris"])
        .config(e)
}(),
function() {
    "use strict";

    function e(e) {
        e.state("components", {
            url: "/components",
            template: "<ui-view></ui-view>",
            "abstract": !0,
            title: "Components",
            sidebarMeta: {
                icon: "ion-gear-a",
                order: 100
            }
        })
    }
    e.$inject = ["$stateProvider"], angular.module("BlurAdmin.pages.components", ["BlurAdmin.pages.components.mail", "BlurAdmin.pages.components.timeline", "BlurAdmin.pages.components.tree"])
        .config(e)
}(),
function() {
    "use strict";

    function e(e) {
        e.state("dashboard", {
            url: "/dashboard",
            templateUrl: "app/pages/dashboard/dashboard.html",
            title: "Dashboard",
            sidebarMeta: {
                icon: "ion-android-home",
                order: 0
            }
        })
    }
    e.$inject = ["$stateProvider"], angular.module("BlurAdmin.pages.dashboard", [])
        .config(e)
}(),
function() {
    "use strict";

    function e(e) {
        e.state("form", {
                url: "/form",
                template: "<ui-view></ui-view>",
                "abstract": !0,
                title: "Form Elements",
                sidebarMeta: {
                    icon: "ion-compose",
                    order: 250
                }
            })
            .state("form.inputs", {
                url: "/inputs",
                templateUrl: "app/pages/form/inputs/inputs.html",
                title: "Form Inputs",
                sidebarMeta: {
                    order: 0
                }
            })
            .state("form.layouts", {
                url: "/layouts",
                templateUrl: "app/pages/form/layouts/layouts.html",
                title: "Form Layouts",
                sidebarMeta: {
                    order: 100
                }
            })
            .state("form.wizard", {
                url: "/wizard",
                templateUrl: "app/pages/form/wizard/wizard.html",
                controller: "WizardCtrl",
                controllerAs: "vm",
                title: "Form Wizard",
                sidebarMeta: {
                    order: 200
                }
            })
    }
    e.$inject = ["$stateProvider"], angular.module("BlurAdmin.pages.form", [])
        .config(e)
}(),
function() {
    "use strict";

    function e(e) {
        e.state("maps", {
                url: "/maps",
                templateUrl: "app/pages/maps/maps.html",
                "abstract": !0,
                title: "Maps",
                sidebarMeta: {
                    icon: "ion-ios-location-outline",
                    order: 500
                }
            })
            .state("maps.gmap", {
                url: "/gmap",
                templateUrl: "app/pages/maps/google-maps/google-maps.html",
                controller: "GmapPageCtrl",
                title: "Google Maps",
                sidebarMeta: {
                    order: 0
                }
            })
            .state("maps.leaflet", {
                url: "/leaflet",
                templateUrl: "app/pages/maps/leaflet/leaflet.html",
                controller: "LeafletPageCtrl",
                title: "Leaflet Maps",
                sidebarMeta: {
                    order: 100
                }
            })
            .state("maps.bubble", {
                url: "/bubble",
                templateUrl: "app/pages/maps/map-bubbles/map-bubbles.html",
                controller: "MapBubblePageCtrl",
                title: "Bubble Maps",
                sidebarMeta: {
                    order: 200
                }
            })
            .state("maps.line", {
                url: "/line",
                templateUrl: "app/pages/maps/map-lines/map-lines.html",
                controller: "MapLinesPageCtrl",
                title: "Line Maps",
                sidebarMeta: {
                    order: 300
                }
            })
    }
    e.$inject = ["$stateProvider"], angular.module("BlurAdmin.pages.maps", [])
        .config(e)
}(),
function() {
    "use strict";

    function e(e) {
        e.state("profile", {
            url: "/profile",
            title: "Profile",
            templateUrl: "app/pages/profile/profile.html",
            controller: "ProfilePageCtrl"
        })
    }
    e.$inject = ["$stateProvider"], angular.module("BlurAdmin.pages.profile", [])
        .config(e)
}(),
function() {
    "use strict";

    function e(e, a) {
        e.state("tables", {
                url: "/tables",
                template: "<ui-view></ui-view>",
                "abstract": !0,
                controller: "TablesPageCtrl",
                title: "Tables",
                sidebarMeta: {
                    icon: "ion-grid",
                    order: 300
                }
            })
            .state("tables.basic", {
                url: "/basic",
                templateUrl: "app/pages/tables/basic/tables.html",
                title: "Basic Tables",
                sidebarMeta: {
                    order: 0
                }
            })
            .state("tables.smart", {
                url: "/smart",
                templateUrl: "app/pages/tables/smart/tables.html",
                title: "Smart Tables",
                sidebarMeta: {
                    order: 100
                }
            }), a.when("/tables", "/tables/basic")
    }
    e.$inject = ["$stateProvider", "$urlRouterProvider"], angular.module("BlurAdmin.pages.tables", [])
        .config(e)
}(),
function() {
    "use strict";

    function e(e) {
        e.state("ui", {
            url: "/ui",
            template: "<ui-view></ui-view>",
            "abstract": !0,
            title: "UI Features",
            sidebarMeta: {
                icon: "ion-android-laptop",
                order: 200
            }
        })
    }
    e.$inject = ["$stateProvider"], angular.module("BlurAdmin.pages.ui", ["BlurAdmin.pages.ui.typography", "BlurAdmin.pages.ui.buttons", "BlurAdmin.pages.ui.icons", "BlurAdmin.pages.ui.modals", "BlurAdmin.pages.ui.grid", "BlurAdmin.pages.ui.alerts", "BlurAdmin.pages.ui.progressBars", "BlurAdmin.pages.ui.notifications", "BlurAdmin.pages.ui.tabs", "BlurAdmin.pages.ui.slider", "BlurAdmin.pages.ui.panels"])
        .config(e)
}(),
function() {
    "use strict";
    angular.module("BlurAdmin.theme.components", [])
}(),
function() {
    "use strict";

    function e(e) {
        e.state("charts.amCharts", {
            url: "/amCharts",
            templateUrl: "app/pages/charts/amCharts/charts.html",
            title: "amCharts",
            sidebarMeta: {
                order: 0
            }
        })
    }

    function a(e) {
        var a = e.colors;
        AmCharts.themes.blur = {
            themeName: "blur",
            AmChart: {
                color: a.defaultText,
                backgroundColor: "#FFFFFF"
            },
            AmCoordinateChart: {
                colors: [a.primary, a.danger, a.warning, a.success, a.info, a.primaryDark, a.warningLight, a.successDark, a.successLight, a.primaryLight, a.warningDark]
            },
            AmStockChart: {
                colors: [a.primary, a.danger, a.warning, a.success, a.info, a.primaryDark, a.warningLight, a.successDark, a.successLight, a.primaryLight, a.warningDark]
            },
            AmSlicedChart: {
                colors: [a.primary, a.danger, a.warning, a.success, a.info, a.primaryDark, a.warningLight, a.successDark, a.successLight, a.primaryLight, a.warningDark],
                labelTickColor: "#FFFFFF",
                labelTickAlpha: .3
            },
            AmRectangularChart: {
                zoomOutButtonColor: "#FFFFFF",
                zoomOutButtonRollOverAlpha: .15,
                zoomOutButtonImage: "lens.png"
            },
            AxisBase: {
                axisColor: "#FFFFFF",
                axisAlpha: .3,
                gridAlpha: .1,
                gridColor: "#FFFFFF"
            },
            ChartScrollbar: {
                backgroundColor: "#FFFFFF",
                backgroundAlpha: .12,
                graphFillAlpha: .5,
                graphLineAlpha: 0,
                selectedBackgroundColor: "#FFFFFF",
                selectedBackgroundAlpha: .4,
                gridAlpha: .15
            },
            ChartCursor: {
                cursorColor: a.primary,
                color: "#FFFFFF",
                cursorAlpha: .5
            },
            AmLegend: {
                color: "#FFFFFF"
            },
            AmGraph: {
                lineAlpha: .9
            },
            GaugeArrow: {
                color: "#FFFFFF",
                alpha: .8,
                nailAlpha: 0,
                innerRadius: "40%",
                nailRadius: 15,
                startWidth: 15,
                borderAlpha: .8,
                nailBorderAlpha: 0
            },
            GaugeAxis: {
                tickColor: "#FFFFFF",
                tickAlpha: 1,
                tickLength: 15,
                minorTickLength: 8,
                axisThickness: 3,
                axisColor: "#FFFFFF",
                axisAlpha: 1,
                bandAlpha: .8
            },
            TrendLine: {
                lineColor: a.danger,
                lineAlpha: .8
            },
            AreasSettings: {
                alpha: .8,
                color: a.info,
                colorSolid: a.primaryDark,
                unlistedAreasAlpha: .4,
                unlistedAreasColor: "#FFFFFF",
                outlineColor: "#FFFFFF",
                outlineAlpha: .5,
                outlineThickness: .5,
                rollOverColor: a.primary,
                rollOverOutlineColor: "#FFFFFF",
                selectedOutlineColor: "#FFFFFF",
                selectedColor: "#f15135",
                unlistedAreasOutlineColor: "#FFFFFF",
                unlistedAreasOutlineAlpha: .5
            },
            LinesSettings: {
                color: "#FFFFFF",
                alpha: .8
            },
            ImagesSettings: {
                alpha: .8,
                labelColor: "#FFFFFF",
                color: "#FFFFFF",
                labelRollOverColor: a.primaryDark
            },
            ZoomControl: {
                buttonFillAlpha: .8,
                buttonIconColor: a.defaultText,
                buttonRollOverColor: a.danger,
                buttonFillColor: a.primaryDark,
                buttonBorderColor: a.primaryDark,
                buttonBorderAlpha: 0,
                buttonCornerRadius: 0,
                gridColor: "#FFFFFF",
                gridBackgroundColor: "#FFFFFF",
                buttonIconAlpha: .6,
                gridAlpha: .6,
                buttonSize: 20
            },
            SmallMap: {
                mapColor: "#000000",
                rectangleColor: a.danger,
                backgroundColor: "#FFFFFF",
                backgroundAlpha: .7,
                borderThickness: 1,
                borderAlpha: .8
            },
            PeriodSelector: {
                color: "#FFFFFF"
            },
            PeriodButton: {
                color: "#FFFFFF",
                background: "transparent",
                opacity: .7,
                border: "1px solid rgba(0, 0, 0, .3)",
                MozBorderRadius: "5px",
                borderRadius: "5px",
                margin: "1px",
                outline: "none",
                boxSizing: "border-box"
            },
            PeriodButtonSelected: {
                color: "#FFFFFF",
                backgroundColor: "#b9cdf5",
                border: "1px solid rgba(0, 0, 0, .3)",
                MozBorderRadius: "5px",
                borderRadius: "5px",
                margin: "1px",
                outline: "none",
                opacity: 1,
                boxSizing: "border-box"
            },
            PeriodInputField: {
                color: "#FFFFFF",
                background: "transparent",
                border: "1px solid rgba(0, 0, 0, .3)",
                outline: "none"
            },
            DataSetSelector: {
                color: "#FFFFFF",
                selectedBackgroundColor: "#b9cdf5",
                rollOverBackgroundColor: "#a8b0e4"
            },
            DataSetCompareList: {
                color: "#FFFFFF",
                lineHeight: "100%",
                boxSizing: "initial",
                webkitBoxSizing: "initial",
                border: "1px solid rgba(0, 0, 0, .3)"
            },
            DataSetSelect: {
                border: "1px solid rgba(0, 0, 0, .3)",
                outline: "none"
            }
        }
    }
    e.$inject = ["$stateProvider"], a.$inject = ["baConfigProvider"], angular.module("BlurAdmin.pages.charts.amCharts", [])
        .config(e)
        .config(a)
}(),
function() {
    "use strict";

    function e(e) {
        e.state("charts.chartJs", {
            url: "/chartJs",
            templateUrl: "app/pages/charts/chartJs/chartJs.html",
            title: "Chart.js",
            sidebarMeta: {
                order: 200
            }
        })
    }

    function a(e, a) {
        var t = a.colors;
        e.setOptions({
            colours: [t.primary, t.danger, t.warning, t.success, t.info, t["default"], t.primaryDark, t.successDark, t.warningLight, t.successLight, t.primaryLight],
            responsive: !0,
            scaleFontColor: t.defaultText,
            scaleLineColor: t.border,
            pointLabelFontColor: t.defaultText
        }), e.setOptions("Line", {
            datasetFill: !1
        })
    }
    e.$inject = ["$stateProvider"], a.$inject = ["ChartJsProvider", "baConfigProvider"], angular.module("BlurAdmin.pages.charts.chartJs", [])
        .config(e)
        .config(a)
}(),
function() {
    "use strict";

    function e(e) {
        e.state("charts.chartist", {
            url: "/chartist",
            templateUrl: "app/pages/charts/chartist/chartist.html",
            title: "Chartist",
            sidebarMeta: {
                order: 100
            }
        })
    }
    e.$inject = ["$stateProvider"], angular.module("BlurAdmin.pages.charts.chartist", [])
        .config(e)
}(),
function() {
    "use strict";

    function e(e) {
        e.state("charts.morris", {
            url: "/morris",
            templateUrl: "app/pages/charts/morris/morris.html",
            title: "Morris",
            sidebarMeta: {
                order: 300
            }
        })
    }
    e.$inject = ["$stateProvider"], angular.module("BlurAdmin.pages.charts.morris", [])
        .config(e)
        .config(["baConfigProvider", function(e) {
            var a = e.colors;
            Morris.Donut.prototype.defaults.backgroundColor = "transparent", Morris.Donut.prototype.defaults.labelColor = a.defaultText, Morris.Grid.prototype.gridDefaults.gridLineColor = a.borderDark, Morris.Grid.prototype.gridDefaults.gridTextColor = a.defaultText
        }])
}(),
function() {
    "use strict";

    function e(e, a) {
        e.state("components.mail", {
                url: "/mail",
                "abstract": !0,
                templateUrl: "app/pages/components/mail/mail.html",
                controller: "MailTabCtrl",
                controllerAs: "tabCtrl",
                title: "Mail",
                sidebarMeta: {
                    order: 0
                }
            })
            .state("components.mail.label", {
                url: "/:label",
                templateUrl: "app/pages/components/mail/list/mailList.html",
                title: "Mail",
                controller: "MailListCtrl",
                controllerAs: "listCtrl"
            })
            .state("components.mail.detail", {
                url: "/:label/:id",
                templateUrl: "app/pages/components/mail/detail/mailDetail.html",
                title: "Mail",
                controller: "MailDetailCtrl",
                controllerAs: "detailCtrl"
            }), a.when("/components/mail", "/components/mail/inbox")
    }
    e.$inject = ["$stateProvider", "$urlRouterProvider"], angular.module("BlurAdmin.pages.components.mail", [])
        .config(e)
}(),
function() {
    "use strict";

    function e(e) {
        e.state("components.timeline", {
            url: "/timeline",
            templateUrl: "app/pages/components/timeline/timeline.html",
            title: "Timeline",
            sidebarMeta: {
                icon: "ion-ios-pulse",
                order: 100
            }
        })
    }
    e.$inject = ["$stateProvider"], angular.module("BlurAdmin.pages.components.timeline", [])
        .config(e)
}(),
function() {
    "use strict";

    function e(e) {
        e.state("components.tree", {
            url: "/tree",
            templateUrl: "app/pages/components/tree/tree.html",
            title: "Tree View",
            sidebarMeta: {
                order: 200
            }
        })
    }
    e.$inject = ["$stateProvider"], angular.module("BlurAdmin.pages.components.tree", [])
        .config(e)
        .config(function() {
            $.jstree.defaults.core.themes.url = !0, $.jstree.defaults.core.themes.dir = "assets/img/theme/vendor/jstree/dist/themes"
        })
}(),
function() {
    "use strict";

    function e(e) {
        e.state("ui.alerts", {
            url: "/alerts",
            templateUrl: "app/pages/ui/alerts/alerts.html",
            title: "Alerts",
            sidebarMeta: {
                order: 500
            }
        })
    }
    e.$inject = ["$stateProvider"], angular.module("BlurAdmin.pages.ui.alerts", [])
        .config(e)
}(),
function() {
    "use strict";

    function e(e) {
        e.state("ui.buttons", {
            url: "/buttons",
            templateUrl: "app/pages/ui/buttons/buttons.html",
            controller: "ButtonPageCtrl",
            title: "Buttons",
            sidebarMeta: {
                order: 100
            }
        })
    }
    e.$inject = ["$stateProvider"], angular.module("BlurAdmin.pages.ui.buttons", [])
        .config(e)
}(),
function() {
    "use strict";

    function e(e) {
        e.state("ui.grid", {
            url: "/grid",
            templateUrl: "app/pages/ui/grid/grid.html",
            title: "Grid",
            sidebarMeta: {
                order: 400
            }
        })
    }
    e.$inject = ["$stateProvider"], angular.module("BlurAdmin.pages.ui.grid", [])
        .config(e)
}(),
function() {
    "use strict";

    function e(e) {
        e.state("ui.icons", {
            url: "/icons",
            templateUrl: "app/pages/ui/icons/icons.html",
            controller: "IconsPageCtrl",
            title: "Icons",
            sidebarMeta: {
                order: 200
            }
        })
    }
    e.$inject = ["$stateProvider"], angular.module("BlurAdmin.pages.ui.icons", [])
        .config(e)
}(),
function() {
    "use strict";

    function e(e) {
        e.state("ui.modals", {
            url: "/modals",
            templateUrl: "app/pages/ui/modals/modals.html",
            controller: "ModalsPageCtrl",
            title: "Modals",
            sidebarMeta: {
                order: 300
            }
        })
    }
    e.$inject = ["$stateProvider"], angular.module("BlurAdmin.pages.ui.modals", [])
        .config(e)
}(),
function() {
    "use strict";

    function e(e) {
        e.state("ui.notifications", {
            url: "/notifications",
            templateUrl: "app/pages/ui/notifications/notifications.html",
            controller: "NotificationsPageCtrl",
            title: "Notifications",
            sidebarMeta: {
                order: 700
            }
        })
    }
    e.$inject = ["$stateProvider"], angular.module("BlurAdmin.pages.ui.notifications", [])
        .config(e)
}(),
function() {
    "use strict";

    function e(e) {
        e.state("ui.panels", {
            url: "/panels",
            templateUrl: "app/pages/ui/panels/panels.html",
            controller: "NotificationsPageCtrl",
            title: "Panels",
            sidebarMeta: {
                order: 1100
            }
        })
    }
    e.$inject = ["$stateProvider"], angular.module("BlurAdmin.pages.ui.panels", [])
        .config(e)
}(),
function() {
    "use strict";

    function e(e) {
        e.state("ui.progressBars", {
            url: "/progressBars",
            templateUrl: "app/pages/ui/progressBars/progressBars.html",
            title: "Progress Bars",
            sidebarMeta: {
                order: 600
            }
        })
    }
    e.$inject = ["$stateProvider"], angular.module("BlurAdmin.pages.ui.progressBars", [])
        .config(e)
}(),
function() {
    "use strict";

    function e(e) {
        e.state("ui.slider", {
            url: "/slider",
            templateUrl: "app/pages/ui/slider/slider.html",
            title: "Sliders",
            sidebarMeta: {
                order: 1e3
            }
        })
    }
    e.$inject = ["$stateProvider"], angular.module("BlurAdmin.pages.ui.slider", [])
        .config(e)
}(),
function() {
    "use strict";

    function e(e) {
        e.state("ui.tabs", {
            url: "/tabs",
            templateUrl: "app/pages/ui/tabs/tabs.html",
            title: "Tabs & Accordions",
            sidebarMeta: {
                order: 800
            }
        })
    }
    e.$inject = ["$stateProvider"], angular.module("BlurAdmin.pages.ui.tabs", [])
        .config(e)
}(),
function() {
    "use strict";

    function e(e) {
        e.state("ui.typography", {
            url: "/typography",
            templateUrl: "app/pages/ui/typography/typography.html",
            title: "Typography",
            sidebarMeta: {
                order: 0
            }
        })
    }
    e.$inject = ["$stateProvider"], angular.module("BlurAdmin.pages.ui.typography", [])
        .config(e)
}(), angular.module("BlurAdmin", ["ngAnimate", "ui.bootstrap", "ui.sortable", "ui.router", "ngTouch", "toastr", "smart-table", "xeditable", "ui.slimscroll", "ngJsTree", "angular-progress-button-styles", "BlurAdmin.theme", "BlurAdmin.pages"]),
    function() {
        "use strict";

        function e(e, a) {}
        e.$inject = ["baConfigProvider", "colorHelper"], angular.module("BlurAdmin.theme")
            .config(e)
    }(),
    function() {
        "use strict";

        function e(e) {
            var s = {
                theme: {
                    blur: !1
                },
                colors: {
                    "default": a["default"],
                    defaultText: a.defaultText,
                    border: a.border,
                    borderDark: a.borderDark,
                    primary: t.primary,
                    info: t.info,
                    success: t.success,
                    warning: t.warning,
                    danger: t.danger,
                    primaryLight: e.tint(t.primary, 30),
                    infoLight: e.tint(t.info, 30),
                    successLight: e.tint(t.success, 30),
                    warningLight: e.tint(t.warning, 30),
                    dangerLight: e.tint(t.danger, 30),
                    primaryDark: e.shade(t.primary, 15),
                    infoDark: e.shade(t.info, 15),
                    successDark: e.shade(t.success, 15),
                    warningDark: e.shade(t.warning, 15),
                    dangerDark: e.shade(t.danger, 15),
                    dashboard: {
                        blueStone: i.blueStone,
                        surfieGreen: i.surfieGreen,
                        silverTree: i.silverTree,
                        gossip: i.gossip,
                        white: i.white
                    }
                }
            };
            return s.changeTheme = function(e) {
                angular.merge(s.theme, e)
            }, s.changeColors = function(e) {
                angular.merge(s.colors, e)
            }, s.$get = function() {
                return delete s.$get, s
            }, s
        }
        e.$inject = ["colorHelper"];
        var a = {
                "default": "#ffffff",
                defaultText: "#666666",
                border: "#dddddd",
                borderDark: "#aaaaaa"
            },
            t = {
                primary: "#209e91",
                info: "#2dacd1",
                success: "#90b900",
                warning: "#dfb81c",
                danger: "#e85656"
            },
            i = {
                blueStone: "#005562",
                surfieGreen: "#0e8174",
                silverTree: "#6eba8c",
                gossip: "#b9f2a1",
                white: "#10c4b5"
            };
        angular.module("BlurAdmin.theme")
            .provider("baConfig", e)
    }(),
    function() {
        "use strict";

        function e(e, a, t) {
            function i(e) {
                return e.toString(16)
            }

            function s(e) {
                return parseInt(e, 16)
            }
            for (var l = "#", o = 1; 7 > o; o += 2) {
                var n = s(e.substr(o, 2)),
                    r = s(a.substr(o, 2)),
                    d = i(Math.floor(r + (n - r) * (t / 100)));
                l += ("0" + d)
                    .slice(-2)
            }
            return l
        }
        var a = "assets/img/";
        angular.module("BlurAdmin.theme")
            .constant("layoutSizes", {
                resWidthCollapseSidebar: 1200,
                resWidthHideSidebar: 500
            })
            .constant("layoutPaths", {
                images: {
                    root: a,
                    profile: a + "app/profile/",
                    amMap: "assets/img/theme/vendor/ammap//dist/ammap/images/",
                    amChart: "assets/img/theme/vendor/amcharts/dist/amcharts/images/"
                }
            })
            .constant("colorHelper", {
                tint: function(a, t) {
                    return e("#ffffff", a, t)
                },
                shade: function(a, t) {
                    return e("#000000", a, t)
                }
            })
    }(),
    function() {
        "use strict";

        function e(e, a, t, i, s, l, o) {
            var n = [i.loadAmCharts(), e(3e3)],
                r = o;
            r.blur && (r.mobile ? n.unshift(i.loadImg(t.images.root + "blur-bg-mobile.jpg")) : (n.unshift(i.loadImg(t.images.root + "blur-bg.jpg")), n.unshift(i.loadImg(t.images.root + "blur-bg-blurred.jpg")))), s.all(n)
                .then(function() {
                    a.$pageFinishedLoading = !0
                }), e(function() {
                    a.$pageFinishedLoading || (a.$pageFinishedLoading = !0)
                }, 7e3), a.$baSidebarService = l
        }
        e.$inject = ["$timeout", "$rootScope", "layoutPaths", "preloader", "$q", "baSidebarService", "themeLayoutSettings"], angular.module("BlurAdmin.theme")
            .run(e)
    }(),
    function() {
        "use strict";

        function e(e) {
            var a = /android|webos|iphone|ipad|ipod|blackberry|windows phone/.test(navigator.userAgent.toLowerCase()),
                t = a ? "mobile" : "",
                i = e.theme.blur ? "blur-theme" : "";
            return angular.element(document.body)
                .addClass(t)
                .addClass(i), {
                    blur: e.theme.blur,
                    mobile: a
                }
        }
        e.$inject = ["baConfig"], angular.module("BlurAdmin.theme")
            .service("themeLayoutSettings", e)
    }(),
    function() {
        "use strict";

        function e(e, a) {
            e.link = "", e.ok = function() {
                a.close(e.link)
            }
        }
        e.$inject = ["$scope", "$uibModalInstance"], angular.module("BlurAdmin.pages.profile")
            .controller("ProfileModalCtrl", e)
    }(),
    function() {
        "use strict";

        function e(e, a, t, i) {
            e.picture = t("profilePicture")("Nasta"), e.removePicture = function() {
                e.picture = t("appImage")("theme/no-photo.png"), e.noPicture = !0
            }, e.uploadPicture = function() {
                var e = document.getElementById("uploadFile");
                e.click()
            }, e.socialProfiles = [{
                name: "Facebook",
                href: "https://www.facebook.com/akveo/",
                icon: "socicon-facebook"
            }, {
                name: "Twitter",
                href: "https://twitter.com/akveo_inc",
                icon: "socicon-twitter"
            }, {
                name: "Google",
                icon: "socicon-google"
            }, {
                name: "LinkedIn",
                href: "https://www.linkedin.com/company/akveo",
                icon: "socicon-linkedin"
            }, {
                name: "GitHub",
                href: "https://github.com/akveo",
                icon: "socicon-github"
            }, {
                name: "StackOverflow",
                icon: "socicon-stackoverflow"
            }, {
                name: "Dribbble",
                icon: "socicon-dribble"
            }, {
                name: "Behance",
                icon: "socicon-behace"
            }], e.unconnect = function(e) {
                e.href = void 0
            }, e.showModal = function(e) {
                i.open({
                        animation: !1,
                        controller: "ProfileModalCtrl",
                        templateUrl: "app/pages/profile/profileModal.html"
                    })
                    .result.then(function(a) {
                        e.href = a
                    })
            }, e.getFile = function() {
                a.readAsDataUrl(e.file, e)
                    .then(function(a) {
                        e.picture = a
                    })
            }, e.switches = [!0, !0, !1, !0, !0, !1]
        }
        e.$inject = ["$scope", "fileReader", "$filter", "$uibModal"], angular.module("BlurAdmin.pages.profile")
            .controller("ProfilePageCtrl", e)
    }(),
    function() {
        "use strict";

        function e(e, a, t, i) {
            e.smartTablePageSize = 10, e.smartTableData = [{
                id: 1,
                firstName: "Mark",
                lastName: "Otto",
                username: "@mdo",
                email: "mdo@gmail.com",
                age: "28"
            }, {
                id: 2,
                firstName: "Jacob",
                lastName: "Thornton",
                username: "@fat",
                email: "fat@yandex.ru",
                age: "45"
            }, {
                id: 3,
                firstName: "Larry",
                lastName: "Bird",
                username: "@twitter",
                email: "twitter@outlook.com",
                age: "18"
            }, {
                id: 4,
                firstName: "John",
                lastName: "Snow",
                username: "@snow",
                email: "snow@gmail.com",
                age: "20"
            }, {
                id: 5,
                firstName: "Jack",
                lastName: "Sparrow",
                username: "@jack",
                email: "jack@yandex.ru",
                age: "30"
            }, {
                id: 6,
                firstName: "Ann",
                lastName: "Smith",
                username: "@ann",
                email: "ann@gmail.com",
                age: "21"
            }, {
                id: 7,
                firstName: "Barbara",
                lastName: "Black",
                username: "@barbara",
                email: "barbara@yandex.ru",
                age: "43"
            }, {
                id: 8,
                firstName: "Sevan",
                lastName: "Bagrat",
                username: "@sevan",
                email: "sevan@outlook.com",
                age: "13"
            }, {
                id: 9,
                firstName: "Ruben",
                lastName: "Vardan",
                username: "@ruben",
                email: "ruben@gmail.com",
                age: "22"
            }, {
                id: 10,
                firstName: "Karen",
                lastName: "Sevan",
                username: "@karen",
                email: "karen@yandex.ru",
                age: "33"
            }, {
                id: 11,
                firstName: "Mark",
                lastName: "Otto",
                username: "@mark",
                email: "mark@gmail.com",
                age: "38"
            }, {
                id: 12,
                firstName: "Jacob",
                lastName: "Thornton",
                username: "@jacob",
                email: "jacob@yandex.ru",
                age: "48"
            }, {
                id: 13,
                firstName: "Haik",
                lastName: "Hakob",
                username: "@haik",
                email: "haik@outlook.com",
                age: "48"
            }, {
                id: 14,
                firstName: "Garegin",
                lastName: "Jirair",
                username: "@garegin",
                email: "garegin@gmail.com",
                age: "40"
            }, {
                id: 15,
                firstName: "Krikor",
                lastName: "Bedros",
                username: "@krikor",
                email: "krikor@yandex.ru",
                age: "32"
            }, {
                id: 16,
                firstName: "Francisca",
                lastName: "Brady",
                username: "@Gibson",
                email: "franciscagibson@comtours.com",
                age: 11
            }, {
                id: 17,
                firstName: "Tillman",
                lastName: "Figueroa",
                username: "@Snow",
                email: "tillmansnow@comtours.com",
                age: 34
            }, {
                id: 18,
                firstName: "Jimenez",
                lastName: "Morris",
                username: "@Bryant",
                email: "jimenezbryant@comtours.com",
                age: 45
            }, {
                id: 19,
                firstName: "Sandoval",
                lastName: "Jacobson",
                username: "@Mcbride",
                email: "sandovalmcbride@comtours.com",
                age: 32
            }, {
                id: 20,
                firstName: "Griffin",
                lastName: "Torres",
                username: "@Charles",
                email: "griffincharles@comtours.com",
                age: 19
            }, {
                id: 21,
                firstName: "Cora",
                lastName: "Parker",
                username: "@Caldwell",
                email: "coracaldwell@comtours.com",
                age: 27
            }, {
                id: 22,
                firstName: "Cindy",
                lastName: "Bond",
                username: "@Velez",
                email: "cindyvelez@comtours.com",
                age: 24
            }, {
                id: 23,
                firstName: "Frieda",
                lastName: "Tyson",
                username: "@Craig",
                email: "friedacraig@comtours.com",
                age: 45
            }, {
                id: 24,
                firstName: "Cote",
                lastName: "Holcomb",
                username: "@Rowe",
                email: "coterowe@comtours.com",
                age: 20
            }, {
                id: 25,
                firstName: "Trujillo",
                lastName: "Mejia",
                username: "@Valenzuela",
                email: "trujillovalenzuela@comtours.com",
                age: 16
            }, {
                id: 26,
                firstName: "Pruitt",
                lastName: "Shepard",
                username: "@Sloan",
                email: "pruittsloan@comtours.com",
                age: 44
            }, {
                id: 27,
                firstName: "Sutton",
                lastName: "Ortega",
                username: "@Black",
                email: "suttonblack@comtours.com",
                age: 42
            }, {
                id: 28,
                firstName: "Marion",
                lastName: "Heath",
                username: "@Espinoza",
                email: "marionespinoza@comtours.com",
                age: 47
            }, {
                id: 29,
                firstName: "Newman",
                lastName: "Hicks",
                username: "@Keith",
                email: "newmankeith@comtours.com",
                age: 15
            }, {
                id: 30,
                firstName: "Boyle",
                lastName: "Larson",
                username: "@Summers",
                email: "boylesummers@comtours.com",
                age: 32
            }, {
                id: 31,
                firstName: "Haynes",
                lastName: "Vinson",
                username: "@Mckenzie",
                email: "haynesmckenzie@comtours.com",
                age: 15
            }, {
                id: 32,
                firstName: "Miller",
                lastName: "Acosta",
                username: "@Young",
                email: "milleryoung@comtours.com",
                age: 55
            }, {
                id: 33,
                firstName: "Johnston",
                lastName: "Brown",
                username: "@Knight",
                email: "johnstonknight@comtours.com",
                age: 29
            }, {
                id: 34,
                firstName: "Lena",
                lastName: "Pitts",
                username: "@Forbes",
                email: "lenaforbes@comtours.com",
                age: 25
            }, {
                id: 35,
                firstName: "Terrie",
                lastName: "Kennedy",
                username: "@Branch",
                email: "terriebranch@comtours.com",
                age: 37
            }, {
                id: 36,
                firstName: "Louise",
                lastName: "Aguirre",
                username: "@Kirby",
                email: "louisekirby@comtours.com",
                age: 44
            }, {
                id: 37,
                firstName: "David",
                lastName: "Patton",
                username: "@Sanders",
                email: "davidsanders@comtours.com",
                age: 26
            }, {
                id: 38,
                firstName: "Holden",
                lastName: "Barlow",
                username: "@Mckinney",
                email: "holdenmckinney@comtours.com",
                age: 11
            }, {
                id: 39,
                firstName: "Baker",
                lastName: "Rivera",
                username: "@Montoya",
                email: "bakermontoya@comtours.com",
                age: 47
            }, {
                id: 40,
                firstName: "Belinda",
                lastName: "Lloyd",
                username: "@Calderon",
                email: "belindacalderon@comtours.com",
                age: 21
            }, {
                id: 41,
                firstName: "Pearson",
                lastName: "Patrick",
                username: "@Clements",
                email: "pearsonclements@comtours.com",
                age: 42
            }, {
                id: 42,
                firstName: "Alyce",
                lastName: "Mckee",
                username: "@Daugherty",
                email: "alycedaugherty@comtours.com",
                age: 55
            }, {
                id: 43,
                firstName: "Valencia",
                lastName: "Spence",
                username: "@Olsen",
                email: "valenciaolsen@comtours.com",
                age: 20
            }, {
                id: 44,
                firstName: "Leach",
                lastName: "Holcomb",
                username: "@Humphrey",
                email: "leachhumphrey@comtours.com",
                age: 28
            }, {
                id: 45,
                firstName: "Moss",
                lastName: "Baxter",
                username: "@Fitzpatrick",
                email: "mossfitzpatrick@comtours.com",
                age: 51
            }, {
                id: 46,
                firstName: "Jeanne",
                lastName: "Cooke",
                username: "@Ward",
                email: "jeanneward@comtours.com",
                age: 59
            }, {
                id: 47,
                firstName: "Wilma",
                lastName: "Briggs",
                username: "@Kidd",
                email: "wilmakidd@comtours.com",
                age: 53
            }, {
                id: 48,
                firstName: "Beatrice",
                lastName: "Perry",
                username: "@Gilbert",
                email: "beatricegilbert@comtours.com",
                age: 39
            }, {
                id: 49,
                firstName: "Whitaker",
                lastName: "Hyde",
                username: "@Mcdonald",
                email: "whitakermcdonald@comtours.com",
                age: 35
            }, {
                id: 50,
                firstName: "Rebekah",
                lastName: "Duran",
                username: "@Gross",
                email: "rebekahgross@comtours.com",
                age: 40
            }, {
                id: 51,
                firstName: "Earline",
                lastName: "Mayer",
                username: "@Woodward",
                email: "earlinewoodward@comtours.com",
                age: 52
            }, {
                id: 52,
                firstName: "Moran",
                lastName: "Baxter",
                username: "@Johns",
                email: "moranjohns@comtours.com",
                age: 20
            }, {
                id: 53,
                firstName: "Nanette",
                lastName: "Hubbard",
                username: "@Cooke",
                email: "nanettecooke@comtours.com",
                age: 55
            }, {
                id: 54,
                firstName: "Dalton",
                lastName: "Walker",
                username: "@Hendricks",
                email: "daltonhendricks@comtours.com",
                age: 25
            }, {
                id: 55,
                firstName: "Bennett",
                lastName: "Blake",
                username: "@Pena",
                email: "bennettpena@comtours.com",
                age: 13
            }, {
                id: 56,
                firstName: "Kellie",
                lastName: "Horton",
                username: "@Weiss",
                email: "kellieweiss@comtours.com",
                age: 48
            }, {
                id: 57,
                firstName: "Hobbs",
                lastName: "Talley",
                username: "@Sanford",
                email: "hobbssanford@comtours.com",
                age: 28
            }, {
                id: 58,
                firstName: "Mcguire",
                lastName: "Donaldson",
                username: "@Roman",
                email: "mcguireroman@comtours.com",
                age: 38
            }, {
                id: 59,
                firstName: "Rodriquez",
                lastName: "Saunders",
                username: "@Harper",
                email: "rodriquezharper@comtours.com",
                age: 20
            }, {
                id: 60,
                firstName: "Lou",
                lastName: "Conner",
                username: "@Sanchez",
                email: "lousanchez@comtours.com",
                age: 16
            }], e.editableTableData = e.smartTableData.slice(0, 36), e.peopleTableData = [{
                id: 1,
                firstName: "Mark",
                lastName: "Otto",
                username: "@mdo",
                email: "mdo@gmail.com",
                age: "28",
                status: "info"
            }, {
                id: 2,
                firstName: "Jacob",
                lastName: "Thornton",
                username: "@fat",
                email: "fat@yandex.ru",
                age: "45",
                status: "primary"
            }, {
                id: 3,
                firstName: "Larry",
                lastName: "Bird",
                username: "@twitter",
                email: "twitter@outlook.com",
                age: "18",
                status: "success"
            }, {
                id: 4,
                firstName: "John",
                lastName: "Snow",
                username: "@snow",
                email: "snow@gmail.com",
                age: "20",
                status: "danger"
            }, {
                id: 5,
                firstName: "Jack",
                lastName: "Sparrow",
                username: "@jack",
                email: "jack@yandex.ru",
                age: "30",
                status: "warning"
            }], e.metricsTableData = [{
                image: "app/browsers/chrome.svg",
                browser: "Google Chrome",
                visits: "10,392",
                isVisitsUp: !0,
                purchases: "4,214",
                isPurchasesUp: !0,
                percent: "45%",
                isPercentUp: !0
            }, {
                image: "app/browsers/firefox.svg",
                browser: "Mozilla Firefox",
                visits: "7,873",
                isVisitsUp: !0,
                purchases: "3,031",
                isPurchasesUp: !1,
                percent: "28%",
                isPercentUp: !0
            }, {
                image: "app/browsers/ie.svg",
                browser: "Internet Explorer",
                visits: "5,890",
                isVisitsUp: !1,
                purchases: "2,102",
                isPurchasesUp: !1,
                percent: "17%",
                isPercentUp: !1
            }, {
                image: "app/browsers/safari.svg",
                browser: "Safari",
                visits: "4,001",
                isVisitsUp: !1,
                purchases: "1,001",
                isPurchasesUp: !1,
                percent: "14%",
                isPercentUp: !0
            }, {
                image: "app/browsers/opera.svg",
                browser: "Opera",
                visits: "1,833",
                isVisitsUp: !0,
                purchases: "83",
                isPurchasesUp: !0,
                percent: "5%",
                isPercentUp: !1
            }], e.users = [{
                id: 1,
                name: "Esther Vang",
                status: 4,
                group: 3
            }, {
                id: 2,
                name: "Leah Freeman",
                status: 3,
                group: 1
            }, {
                id: 3,
                name: "Mathews Simpson",
                status: 3,
                group: 2
            }, {
                id: 4,
                name: "Buckley Hopkins",
                group: 4
            }, {
                id: 5,
                name: "Buckley Schwartz",
                status: 1,
                group: 1
            }, {
                id: 6,
                name: "Mathews Hopkins",
                status: 4,
                group: 2
            }, {
                id: 7,
                name: "Leah Vang",
                status: 4,
                group: 1
            }, {
                id: 8,
                name: "Vang Schwartz",
                status: 4,
                group: 2
            }, {
                id: 9,
                name: "Hopkin Esther",
                status: 1,
                group: 2
            }, {
                id: 10,
                name: "Mathews Schwartz",
                status: 1,
                group: 3
            }], e.statuses = [{
                value: 1,
                text: "Good"
            }, {
                value: 2,
                text: "Awesome"
            }, {
                value: 3,
                text: "Excellent"
            }], e.groups = [{
                id: 1,
                text: "user"
            }, {
                id: 2,
                text: "customer"
            }, {
                id: 3,
                text: "vip"
            }, {
                id: 4,
                text: "admin"
            }], e.showGroup = function(t) {
                if (t.group && e.groups.length) {
                    var i = a("filter")(e.groups, {
                        id: t.group
                    });
                    return i.length ? i[0].text : "Not set"
                }
                return "Not set"
            }, e.showStatus = function(t) {
                var i = [];
                return t.status && (i = a("filter")(e.statuses, {
                    value: t.status
                })), i.length ? i[0].text : "Not set"
            }, e.removeUser = function(a) {
                e.users.splice(a, 1)
            }, e.addUser = function() {
                e.inserted = {
                    id: e.users.length + 1,
                    name: "",
                    status: null,
                    group: null
                }, e.users.push(e.inserted)
            }, t.theme = "bs3", i.bs3.submitTpl = '<button type="submit" class="btn btn-primary btn-with-icon"><i class="ion-checkmark-round"></i></button>', i.bs3.cancelTpl = '<button type="button" ng-click="$form.$cancel()" class="btn btn-default btn-with-icon"><i class="ion-close-round"></i></button>'
        }
        e.$inject = ["$scope", "$filter", "editableOptions", "editableThemes"], angular.module("BlurAdmin.pages.tables")
            .controller("TablesPageCtrl", e)
    }(),
    function() {
        "use strict";

        function e(e) {
            angular.extend(e, {
                closeButton: !0,
                closeHtml: "<button>&times;</button>",
                timeOut: 5e3,
                autoDismiss: !1,
                containerId: "toast-container",
                maxOpened: 0,
                newestOnTop: !0,
                positionClass: "toast-top-right",
                preventDuplicates: !1,
                preventOpenDuplicates: !1,
                target: "body"
            })
        }
        e.$inject = ["toastrConfig"], angular.module("BlurAdmin.theme.components")
            .config(e)
    }(),
    function() {
        "use strict";

        function e(e) {
            return {
                link: function(a, t) {
                    e(function() {
                        function a(a) {
                            e(function() {
                                t.html(a)
                            }, 30)
                        }
                        var i = t.attr("new-value"),
                            s = parseInt(t.html());
                        if (i > s)
                            for (var l = s; i >= l; l++) a(l);
                        else
                            for (var o = s; o >= i; o--) a(o);
                        e(function() {
                            t.next()
                                .find("i")
                                .addClass("show-arr")
                        }, 500)
                    }, 3500)
                }
            }
        }
        e.$inject = ["$timeout"], angular.module("BlurAdmin.theme")
            .directive("animatedChange", e)
    }(),
    function() {
        "use strict";

        function e() {
            return {
                restrict: "A",
                link: function(e, a) {
                    a.bind("keydown", function(e) {
                        var a = e.target;
                        $(a)
                            .height(0);
                        var t = $(a)[0].scrollHeight;
                        t = 16 > t ? 16 : t, $(a)
                            .height(t)
                    }), setTimeout(function() {
                        var e = a;
                        $(e)
                            .height(0);
                        var t = $(e)[0].scrollHeight;
                        t = 16 > t ? 16 : t, $(e)
                            .height(t)
                    }, 0)
                }
            }
        }
        angular.module("BlurAdmin.theme")
            .directive("autoExpand", e)
    }(),
    function() {
        "use strict";

        function e(e, a) {
            return {
                link: function(t, i, s) {
                    var l = a(s.autoFocus);
                    t.$watch(l, function(a) {
                        a === !0 && e(function() {
                            i[0].focus(), i[0].select()
                        })
                    }), i.bind("blur", function() {
                        t.$apply(l.assign(t, !1))
                    })
                }
            }
        }
        e.$inject = ["$timeout", "$parse"], angular.module("BlurAdmin.theme")
            .directive("autoFocus", e)
    }(),
    function() {
        "use strict";

        function e() {
            return {
                restrict: "AE",
                templateUrl: function(e, a) {
                    return a.includeWithScope
                }
            }
        }
        angular.module("BlurAdmin.theme")
            .directive("includeWithScope", e)
    }(),
    function() {
        "use strict";

        function e(e) {
            return {
                restrict: "EA",
                template: "<div></div>",
                replace: !0,
                scope: {
                    min: "=",
                    max: "=",
                    type: "@",
                    prefix: "@",
                    maxPostfix: "@",
                    prettify: "=",
                    prettifySeparator: "@",
                    grid: "=",
                    gridMargin: "@",
                    postfix: "@",
                    step: "@",
                    hideMinMax: "@",
                    hideFromTo: "@",
                    from: "=",
                    to: "=",
                    disable: "=",
                    onChange: "=",
                    onFinish: "=",
                    values: "=",
                    timeout: "@"
                },
                link: function(a, t) {
                    t.ionRangeSlider({
                        min: a.min,
                        max: a.max,
                        type: a.type,
                        prefix: a.prefix,
                        maxPostfix: a.maxPostfix,
                        prettify_enabled: a.prettify,
                        prettify_separator: a.prettifySeparator,
                        grid: a.grid,
                        gridMargin: a.gridMargin,
                        postfix: a.postfix,
                        step: a.step,
                        hideMinMax: a.hideMinMax,
                        hideFromTo: a.hideFromTo,
                        from: a.from,
                        to: a.to,
                        disable: a.disable,
                        onChange: a.onChange,
                        onFinish: a.onFinish,
                        values: a.values
                    }), a.$watch("min", function(a) {
                        e(function() {
                            t.data("ionRangeSlider")
                                .update({
                                    min: a
                                })
                        })
                    }, !0), a.$watch("max", function(a) {
                        e(function() {
                            t.data("ionRangeSlider")
                                .update({
                                    max: a
                                })
                        })
                    }), a.$watch("from", function(a) {
                        e(function() {
                            t.data("ionRangeSlider")
                                .update({
                                    from: a
                                })
                        })
                    }), a.$watch("to", function(a) {
                        e(function() {
                            t.data("ionRangeSlider")
                                .update({
                                    to: a
                                })
                        })
                    }), a.$watch("disable", function(a) {
                        e(function() {
                            t.data("ionRangeSlider")
                                .update({
                                    disable: a
                                })
                        })
                    })
                }
            }
        }
        e.$inject = ["$timeout"], angular.module("BlurAdmin.theme")
            .directive("ionSlider", e)
    }(),
    function() {
        "use strict";

        function e() {
            return {
                link: function(e, a) {
                    a.bind("change", function(a) {
                        e.file = (a.srcElement || a.target)
                            .files[0], e.getFile()
                    })
                }
            }
        }
        angular.module("BlurAdmin.theme")
            .directive("ngFileSelect", e)
    }(),
    function() {
        "use strict";

        function e() {
            return {
                scope: {
                    scrollPosition: "=",
                    maxHeight: "="
                },
                link: function(e) {
                    $(window)
                        .on("scroll", function() {
                            var a = $(window)
                                .scrollTop() > e.maxHeight;
                            a !== e.prevScrollTop && e.$apply(function() {
                                e.scrollPosition = a
                            }), e.prevScrollTop = a
                        })
                }
            }
        }
        angular.module("BlurAdmin.theme")
            .directive("scrollPosition", e)
    }(),
    function() {
        "use strict";

        function e() {
            return {
                scope: {
                    trackWidth: "=",
                    minWidth: "="
                },
                link: function(e, a) {
                    e.trackWidth = $(a)
                        .width() < e.minWidth, e.prevTrackWidth = e.trackWidth, $(window)
                        .resize(function() {
                            var t = $(a)
                                .width() < e.minWidth;
                            t !== e.prevTrackWidth && e.$apply(function() {
                                e.trackWidth = t;
                            }), e.prevTrackWidth = t
                        })
                }
            }
        }
        angular.module("BlurAdmin.theme")
            .directive("trackWidth", e)
    }(),
    function() {
        "use strict";

        function e(e, a) {
            return {
                restrict: "A",
                link: function(t, i) {
                    var s = 1e3;
                    a.$pageFinishedLoading && (s = 100), e(function() {
                        i.removeClass("full-invisible"), i.addClass("animated zoomIn")
                    }, s)
                }
            }
        }
        e.$inject = ["$timeout", "$rootScope"], angular.module("BlurAdmin.theme")
            .directive("zoomIn", e)
    }(),
    function() {
        "use strict";

        function e() {
            this.isDescendant = function(e, a) {
                for (var t = a.parentNode; null != t;) {
                    if (t == e) return !0;
                    t = t.parentNode
                }
                return !1
            }, this.hexToRGB = function(e, a) {
                var t = parseInt(e.slice(1, 3), 16),
                    i = parseInt(e.slice(3, 5), 16),
                    s = parseInt(e.slice(5, 7), 16);
                return "rgba(" + t + ", " + i + ", " + s + ", " + a + ")"
            }
        }
        angular.module("BlurAdmin.theme")
            .service("baUtil", e)
    }(),
    function() {
        "use strict";

        function e(e) {
            var a = function(e, a, t) {
                    return function() {
                        t.$apply(function() {
                            a.resolve(e.result)
                        })
                    }
                },
                t = function(e, a, t) {
                    return function() {
                        t.$apply(function() {
                            a.reject(e.result)
                        })
                    }
                },
                i = function(e, a) {
                    return function(e) {
                        a.$broadcast("fileProgress", {
                            total: e.total,
                            loaded: e.loaded
                        })
                    }
                },
                s = function(e, s) {
                    var l = new FileReader;
                    return l.onload = a(l, e, s), l.onerror = t(l, e, s), l.onprogress = i(l, s), l
                },
                l = function(a, t) {
                    var i = e.defer(),
                        l = s(i, t);
                    return l.readAsDataURL(a), i.promise
                };
            return {
                readAsDataUrl: l
            }
        }
        e.$inject = ["$q"], angular.module("BlurAdmin.theme")
            .service("fileReader", e)
    }(),
    function() {
        "use strict";

        function e(e) {
            return {
                loadImg: function(a) {
                    var t = e.defer(),
                        i = new Image;
                    return i.src = a, i.onload = function() {
                        t.resolve()
                    }, t.promise
                },
                loadAmCharts: function() {
                    var a = e.defer();
                    return AmCharts.ready(function() {
                        a.resolve()
                    }), a.promise
                }
            }
        }
        e.$inject = ["$q"], angular.module("BlurAdmin.theme")
            .service("preloader", e)
    }(),
    function() {
        "use strict";

        function e(e) {
            return {
                start: function(a, t, i) {
                    function s() {
                        return a(t, i)
                    }
                    var l = s();
                    angular.element(e)
                        .bind("focus", function() {
                            l && a.cancel(l), l = s()
                        }), angular.element(e)
                        .bind("blur", function() {
                            l && a.cancel(l)
                        })
                }
            }
        }
        e.$inject = ["$window"], angular.module("BlurAdmin.theme")
            .service("stopableInterval", e)
    }(),
    function() {
        "use strict";

        function e(e) {
            function a(e) {
                for (var a, t, i = e.length; i; a = Math.floor(Math.random() * i), t = e[--i], e[i] = e[a], e[a] = t);
                return e
            }
            e.labels = ["Sleeping", "Designing", "Coding", "Cycling"], e.data = [20, 40, 5, 35], e.options = {
                segmentShowStroke: !1
            }, e.polarOptions = {
                scaleShowLabelBackdrop: !1,
                segmentShowStroke: !1
            }, e.changeData = function() {
                e.data = a(e.data)
            }
        }
        e.$inject = ["$scope"], angular.module("BlurAdmin.pages.charts.chartJs")
            .controller("chartJs1DCtrl", e)
    }(),
    function() {
        "use strict";

        function e(e) {
            function a(e) {
                for (var a, t, i = e.length; i; a = Math.floor(Math.random() * i), t = e[--i], e[i] = e[a], e[a] = t);
                return e
            }
            e.labels = ["May", "June", "Jule", "August", "September", "October", "November"], e.data = [[65, 59, 90, 81, 56, 55, 40], [28, 48, 40, 19, 88, 27, 45]], e.series = ["Product A", "Product B"], e.changeData = function() {
                e.data[0] = a(e.data[0]), e.data[1] = a(e.data[1])
            }
        }
        e.$inject = ["$scope"], angular.module("BlurAdmin.pages.charts.chartJs")
            .controller("chartJs2DCtrl", e)
    }(),
    function() {
        "use strict";

        function e(e, a, t) {
            e.labels = ["April", "May", "June", "Jule", "August", "September", "October", "November", "December"], e.data = [[1, 9, 3, 4, 5, 6, 7, 8, 2].map(function(e) {
                return 25 * Math.sin(e) + 25
            })], t.start(a, function() {
                e.data[0].unshift(e.data[0].pop())
            }, 300)
        }
        e.$inject = ["$scope", "$interval", "stopableInterval"], angular.module("BlurAdmin.pages.charts.chartJs")
            .controller("chartJsWaveCtrl", e)
    }(),
    function() {
        "use strict";

        function e(e, a, t) {
            function i(e, a) {
                return [["screen and (min-width: 1550px)", {
                    chartPadding: e,
                    labelOffset: a,
                    labelDirection: "explode",
                    labelInterpolationFnc: function(e) {
                        return e
                    }
                }], ["screen and (max-width: 1200px)", {
                    chartPadding: e,
                    labelOffset: a,
                    labelDirection: "explode",
                    labelInterpolationFnc: function(e) {
                        return e
                    }
                }], ["screen and (max-width: 600px)", {
                    chartPadding: 0,
                    labelOffset: 0,
                    labelInterpolationFnc: function(e) {
                        return e[0]
                    }
                }]]
            }
            e.simpleLineOptions = {
                color: t.colors.defaultText,
                fullWidth: !0,
                height: "300px",
                chartPadding: {
                    right: 40
                }
            }, e.simpleLineData = {
                labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
                series: [[20, 20, 12, 45, 50], [10, 45, 30, 14, 12], [34, 12, 12, 40, 50], [10, 43, 25, 22, 16], [3, 6, 30, 33, 43]]
            }, e.areaLineData = {
                labels: [1, 2, 3, 4, 5, 6, 7, 8],
                series: [[5, 9, 7, 8, 5, 3, 5, 4]]
            }, e.areaLineOptions = {
                fullWidth: !0,
                height: "300px",
                low: 0,
                showArea: !0
            }, e.biLineData = {
                labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                series: [[1, 2, 3, 1, -2, 0, 1], [-2, -1, -2, -1, -2.5, -1, -2], [0, 0, 0, 1, 2, 2.5, 2], [2.5, 2, 1, .5, 1, .5, -1]]
            }, e.biLineOptions = {
                height: "300px",
                high: 3,
                low: -3,
                showArea: !0,
                showLine: !1,
                showPoint: !1,
                fullWidth: !0,
                axisX: {
                    showGrid: !1
                }
            }, e.simpleBarData = {
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                series: [[15, 24, 43, 27, 5, 10, 23, 44, 68, 50, 26, 8], [13, 22, 49, 22, 4, 6, 24, 46, 57, 48, 22, 4]]
            }, e.simpleBarOptions = {
                fullWidth: !0,
                height: "300px"
            }, e.multiBarData = {
                labels: ["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"],
                series: [[5, 4, 3, 7], [3, 2, 9, 5], [1, 5, 8, 4], [2, 3, 4, 6], [4, 1, 2, 1]]
            }, e.multiBarOptions = {
                fullWidth: !0,
                height: "300px",
                stackBars: !0,
                axisX: {
                    labelInterpolationFnc: function(e) {
                        return e.split(/\s+/)
                            .map(function(e) {
                                return e[0]
                            })
                            .join("")
                    }
                },
                axisY: {
                    offset: 20
                }
            }, e.multiBarResponsive = [["screen and (min-width: 400px)", {
                reverseData: !0,
                horizontalBars: !0,
                axisX: {
                    labelInterpolationFnc: Chartist.noop
                },
                axisY: {
                    offset: 60
                }
            }], ["screen and (min-width: 700px)", {
                stackBars: !1,
                reverseData: !1,
                horizontalBars: !1,
                seriesBarDistance: 15
            }]], e.stackedBarData = {
                labels: ["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"],
                series: [[8e5, 12e5, 14e5, 13e5], [2e5, 4e5, 5e5, 3e5], [1e5, 2e5, 4e5, 6e5]]
            }, e.stackedBarOptions = {
                fullWidth: !0,
                height: "300px",
                stackBars: !0,
                axisY: {
                    labelInterpolationFnc: function(e) {
                        return e / 1e3 + "k"
                    }
                }
            }, e.simplePieData = {
                series: [5, 3, 4]
            }, e.simplePieOptions = {
                fullWidth: !0,
                height: "300px",
                weight: "300px",
                labelInterpolationFnc: function(e) {
                    return Math.round(e / 12 * 100) + "%"
                }
            }, e.labelsPieData = {
                labels: ["Bananas", "Apples", "Grapes"],
                series: [20, 15, 40]
            }, e.labelsPieOptions = {
                fullWidth: !0,
                height: "300px",
                weight: "300px",
                labelDirection: "explode",
                labelInterpolationFnc: function(e) {
                    return e[0]
                }
            }, e.simpleDonutData = {
                labels: ["Bananas", "Apples", "Grapes"],
                series: [20, 15, 40]
            }, e.simpleDonutOptions = {
                fullWidth: !0,
                donut: !0,
                height: "300px",
                weight: "300px",
                labelDirection: "explode",
                labelInterpolationFnc: function(e) {
                    return e[0]
                }
            }, e.donutResponsive = i(5, 40), e.pieResponsive = i(20, 80), a(function() {
                new Chartist.Line("#line-chart", e.simpleLineData, e.simpleLineOptions), new Chartist.Line("#area-chart", e.areaLineData, e.areaLineOptions), new Chartist.Line("#bi-chart", e.biLineData, e.biLineOptions), new Chartist.Bar("#simple-bar", e.simpleBarData, e.simpleBarOptions), new Chartist.Bar("#multi-bar", e.multiBarData, e.multiBarOptions, e.multiBarResponsive), new Chartist.Bar("#stacked-bar", e.stackedBarData, e.stackedBarOptions), new Chartist.Pie("#simple-pie", e.simplePieData, e.simplePieOptions, e.pieResponsive), new Chartist.Pie("#label-pie", e.labelsPieData, e.labelsPieOptions), new Chartist.Pie("#donut", e.simpleDonutData, e.simpleDonutOptions, e.donutResponsive)
            })
        }
        e.$inject = ["$scope", "$timeout", "baConfig"], angular.module("BlurAdmin.pages.charts.chartist")
            .controller("chartistCtrl", e)
    }(),
    function() {
        "use strict";

        function e(e, a, t) {
            var i = t.colors;
            e.colors = [i.primary, i.warning, i.danger, i.info, i.success, i.primaryDark], e.lineData = [{
                    y: "2006",
                    a: 100,
                    b: 90
                }, {
                    y: "2007",
                    a: 75,
                    b: 65
                }, {
                    y: "2008",
                    a: 50,
                    b: 40
                }, {
                    y: "2009",
                    a: 75,
                    b: 65
                }, {
                    y: "2010",
                    a: 50,
                    b: 40
                }, {
                    y: "2011",
                    a: 75,
                    b: 65
                }, {
                    y: "2012",
                    a: 100,
                    b: 90
                }], e.areaData = [{
                    y: "2006",
                    a: 100,
                    b: 90
                }, {
                    y: "2007",
                    a: 75,
                    b: 65
                }, {
                    y: "2008",
                    a: 50,
                    b: 40
                }, {
                    y: "2009",
                    a: 75,
                    b: 65
                }, {
                    y: "2010",
                    a: 50,
                    b: 40
                }, {
                    y: "2011",
                    a: 75,
                    b: 65
                }, {
                    y: "2012",
                    a: 100,
                    b: 90
                }], e.barData = [{
                    y: "2006",
                    a: 100,
                    b: 90
                }, {
                    y: "2007",
                    a: 75,
                    b: 65
                }, {
                    y: "2008",
                    a: 50,
                    b: 40
                }, {
                    y: "2009",
                    a: 75,
                    b: 65
                }, {
                    y: "2010",
                    a: 50,
                    b: 40
                }, {
                    y: "2011",
                    a: 75,
                    b: 65
                }, {
                    y: "2012",
                    a: 100,
                    b: 90
                }], e.donutData = [{
                    label: "Download Sales",
                    value: 12
                }, {
                    label: "In-Store Sales",
                    value: 30
                }, {
                    label: "Mail-Order Sales",
                    value: 20
                }], angular.element(a)
                .bind("resize", function() {})
        }
        e.$inject = ["$scope", "$window", "baConfig"], angular.module("BlurAdmin.pages.charts.morris")
            .controller("morrisCtrl", e)
    }(),
    function() {
        "use strict";

        function e(e, a) {
            var t = this;
            t.navigationCollapsed = !0, t.showCompose = function(a, t, i) {
                e.open({
                    subject: a,
                    to: t,
                    text: i
                })
            }, t.tabs = a.getTabs()
        }
        e.$inject = ["composeModal", "mailMessages"], angular.module("BlurAdmin.pages.components.mail")
            .controller("MailTabCtrl", e)
    }(),
    function() {
        "use strict";

        function e(e) {
            var a = [{
                    id: "4563faass",
                    name: "Nasta Linnie",
                    subject: "Great text",
                    date: "2015-08-28T07:57:09",
                    body: e.trustAsHtml("<p>Hey John, </p><p>Check out this cool text.</p>"),
                    pic: "img/Nasta.png",
                    email: "petraramsey@mail.com",
                    attachment: "poem.txt",
                    position: "Great Employee",
                    tag: "friend",
                    labels: ["inbox"]
                }, {
                    id: "4563fdfvd",
                    name: "Nasta Linnie",
                    subject: "Lores ipsum",
                    date: "2015-11-19T03:30:45",
                    important: !1,
                    body: e.trustAsHtml("<p>Hey John, </p><br><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ex mauris, ultrices vel lectus quis, scelerisque hendrerit ipsum. Suspendisse ullamcorper turpis neque, eget dapibus magna placerat ac. Suspendisse rhoncus ligula ac mi tempus varius ut sed lacus. Sed et commodo nulla, et placerat leo. Nam rhoncus vulputate sem non pharetra. Praesent fringilla massa in laoreet convallis. Aliquam lobortis dui a congue facilisis. Aenean dapibus semper semper. Quisque aliquam, nibh dapibus interdum condimentum, ex velit tempor tortor, at vestibulum magna leo quis leo. Morbi pulvinar varius erat ac rutrum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In hac habitasse platea dictumst.</p><br><p>Cras rhoncus quam ipsum, vel dignissim nisl egestas sed. Aliquam erat volutpat. Integer eu nisl elit. Donec malesuada diam vitae tellus luctus tincidunt. Donec tempus blandit neque, rutrum egestas ipsum sagittis tempor. Curabitur volutpat ligula enim, nec vehicula purus molestie at. Sed a facilisis enim, nec molestie magna. Donec in augue non est viverra dapibus vel tempus risus. Nam porttitor purus sit amet hendrerit ullamcorper. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>"),
                    pic: "img/Nasta.png",
                    email: "petraramsey@mail.com",
                    position: "Great Employee",
                    tag: "study",
                    labels: ["inbox"]
                }, {
                    id: "4563zxcss",
                    name: "Nasta Linnie",
                    subject: "Lores ipsum",
                    date: "2015-10-19T03:30:45",
                    important: !1,
                    body: e.trustAsHtml("<p>Hey Nasta, </p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>"),
                    pic: "img/Nasta.png",
                    email: "petraramsey@mail.com",
                    position: "Great Employee",
                    tag: "work",
                    labels: ["sent", "important"]
                }, {
                    id: "8955sddf",
                    name: "Nick Cat",
                    subject: "New Design",
                    date: "2015-05-05T12:59:45",
                    body: e.trustAsHtml("<p>Hey John, Consectetur adipiscing elit</p><br><p>Cras rhoncus quam ipsum, vel dignissim nisl egestas sed. Aliquam erat volutpat. Integer eu nisl elit. Donec malesuada diam vitae tellus luctus tincidunt. Donec tempus blandit neque, rutrum egestas ipsum sagittis tempor. Curabitur volutpat ligula enim, nec vehicula purus molestie at. Sed a facilisis enim, nec molestie magna. Donec in augue non est viverra dapibus vel tempus risus. Nam porttitor purus sit amet hendrerit ullamcorper. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>"),
                    pic: "img/Nick.png",
                    email: "barlowshort@mail.com",
                    position: "Graphical designer",
                    attachment: "design.psd",
                    tag: "work",
                    labels: ["inbox"]
                }, {
                    id: "8955sdfcc",
                    name: "Nick Cat",
                    subject: "Gift card",
                    date: "2015-07-18T10:19:01",
                    body: e.trustAsHtml("<p>Hey John, </p><br><p>Consectetur adipiscing elit, Lorem ipsum dolor sit amet</p>"),
                    pic: "img/Nick.png",
                    email: "barlowshort@mail.com",
                    position: "Graphical designer",
                    tag: "study",
                    labels: ["inbox"]
                }, {
                    id: "8955asewf",
                    name: "Nick Cat",
                    subject: "Some news",
                    date: "2015-09-23T03:04:10",
                    body: e.trustAsHtml("<p>Hey John, </p><br><p>Integer eu nisl elit. Donec malesuada diam vitae tellus luctus tincidunt. Donec tempus blandit neque, rutrum egestas ipsum sagittis tempor. Curabitur volutpat ligula enim, nec vehicula purus molestie at. Sed a facilisis enim, nec molestie magna. Donec in augue non est viverra dapibus vel tempus risus. Nam porttitor purus sit amet hendrerit ullamcorper. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>"),
                    pic: "img/Nick.png",
                    email: "barlowshort@mail.com",
                    position: "Graphical designer",
                    tag: "work",
                    labels: ["inbox", "important"]
                }, {
                    id: "2334uudsa",
                    name: "Kostya Danovsky",
                    subject: "Street Art",
                    date: "2015-11-22T10:05:09",
                    body: e.trustAsHtml("<p>Hey John, </p><p>Aliquam eu facilisis eros, quis varius est.</p><p>Consectetur adipiscing elit. Aliquam sodales sem in nibh pellentesque, ac dignissim mi dapibus.</p><p>Lorem ipsum dolor sit amet! Nullam imperdiet justo a ipsum laoreet euismod.</p><br><p>Cras tincidunt fermentum lectus, quis scelerisque lorem volutpat sed.Sed quis orci sed nisl sagittis viverra id at mauris. Nam venenatis mi nibh. Sed fringilla mattis vehic</p>"),
                    pic: "img/Kostya.png",
                    email: "schwart@mail.com",
                    position: "Technical Chef",
                    attachment: "file.doc",
                    tag: "family",
                    labels: ["inbox", "important"]
                }, {
                    id: "2334aefvv",
                    name: "Kostya Danovsky",
                    subject: "New product",
                    date: "2015-06-22T06:26:10",
                    body: e.trustAsHtml("<p>Hello John, </p><p>Lorem ipsum dolor sit amet!</p><p>Consectetur adipiscing elit. Aliquam sodales sem in nibh pellentesque, ac dignissim mi dapibus.</p><p>Aliquam eu facilisis eros, quis varius est. Nullam imperdiet justo a ipsum laoreet euismod.</p><br><p>Nulla facilisi. Nulla congue, arcu eget blandit lacinia, leo ante ullamcorper lectus, vel pulvinar justo ipsum vitae justo.Cras tincidunt fermentum lectus, quis scelerisque lorem volutpat sed. Sed quis orci sed nisl sagittis viverra id at mauris. Nam venenatis mi nibh. Sed fringilla mattis vehic</p>"),
                    pic: "img/Kostya.png",
                    email: "schwart@mail.com",
                    position: "Technical Chef",
                    tag: "family",
                    labels: ["inbox", "important"]
                }, {
                    id: "2334cvdss",
                    name: "Kostya Danovsky",
                    subject: "Old product",
                    date: "2015-06-22T06:26:10",
                    body: e.trustAsHtml("<p>Hello John, </p><p>Consectetur adipiscing elit. Aliquam sodales sem in nibh pellentesque, ac dignissim mi dapibus.</p><br><p>Cras tincidunt fermentum lectus, quis scelerisque lorem volutpat sed. Sed quis orci sed nisl sagittis viverra id at mauris. Nam venenatis mi nibh. Sed fringilla mattis vehic</p>"),
                    pic: "img/Kostya.png",
                    email: "schwart@mail.com",
                    position: "Technical Chef",
                    tag: "study",
                    labels: ["trash"]
                }, {
                    id: "8223xzxfn",
                    name: "Andrey Hrabouski",
                    subject: "Skype moji",
                    date: "2015-07-16T06:47:53",
                    body: e.trustAsHtml("<p>Hello John, </p><p>Aliquam sodales sem in nibh pellentesque</p><p>Lorem ipsum dolor I find moji in skype sit amet!.</p>"),
                    pic: "img/Andrey.png",
                    email: "lakeishaphillips@mail.com",
                    position: "Mobile Developer",
                    tag: "family",
                    labels: ["trash"]
                }, {
                    id: "8223sdffn",
                    name: "Andrey Hrabouski",
                    subject: "My App",
                    date: "2015-06-20T07:05:02",
                    body: e.trustAsHtml("<p>Hey Vlad. </p><p>Lorem ipsum dolor sit amet!</p><p>Consectetur My Falasson App elit. Aliquam sodales sem in nibh pellentesque, ac dignissim mi dapibus.</p>"),
                    pic: "img/Andrey.png",
                    email: "lakeishaphillips@mail.com",
                    position: "Mobile Developer",
                    tag: "family",
                    labels: ["spam"]
                }, {
                    id: "9391xdsff",
                    name: "Vlad Lugovsky",
                    subject: "Cool",
                    date: "2015-03-31T11:52:58",
                    body: e.trustAsHtml("<p>Hey Vlad. </p><p>Aliquam sodales sem in nibh pellentesque</p><p>Cras tincidunt fermentum lectus, quis scelerisque lorem volutpat sed.</p>"),
                    pic: "img/Vlad.png",
                    email: "carlsongoodman@mail.com",
                    position: "Fullstack man",
                    tag: "study",
                    labels: ["draft"]
                }, {
                    id: "8223xsdaa",
                    name: "Andrey Hrabouski",
                    subject: "Car rent",
                    date: "2015-02-25T10:58:58",
                    body: e.trustAsHtml("<p>Hey Andrey. </p><p>Cras tincidunt fermentum lectus, quis scelerisque lorem volutpat sed. Sed quis orci sed nisl sagittis viverra id at mauris. Nam venenatis mi nibh. Sed fringilla mattis vehic</p>"),
                    pic: "img/Andrey.png",
                    email: "lakeishaphillips@mail.com",
                    position: "Mobile Developer",
                    tag: "family",
                    labels: ["draft"]
                }, {
                    id: "9391xdsff",
                    name: "Vlad Lugovsky",
                    subject: "What next",
                    date: "2015-03-31T11:52:58",
                    body: e.trustAsHtml("<p>Hey Vlad. </p><p>Lorem ipsum dolor sit amet!</p><p>Esse esse labore tempor ullamco ullamco. Id veniam laborum c.</p>"),
                    pic: "img/Vlad.png",
                    email: "carlsongoodman@mail.com",
                    position: "Fullstack man",
                    tag: "study",
                    labels: ["sent"]
                }].sort(function(e, a) {
                    return e.date > a.date ? 1 : e.date < a.date ? -1 : void 0
                })
                .reverse(),
                t = [{
                    label: "inbox",
                    name: "Inbox",
                    newMails: 7
                }, {
                    label: "sent",
                    name: "Sent Mail"
                }, {
                    label: "important",
                    name: "Important"
                }, {
                    label: "draft",
                    name: "Draft",
                    newMails: 2
                }, {
                    label: "spam",
                    name: "Spam"
                }, {
                    label: "trash",
                    name: "Trash"
                }];
            return {
                getTabs: function() {
                    return t
                },
                getMessagesByLabel: function(e) {
                    return a.filter(function(a) {
                        return -1 != a.labels.indexOf(e)
                    })
                },
                getMessageById: function(e) {
                    return a.filter(function(a) {
                        return a.id == e
                    })[0]
                }
            }
        }
        e.$inject = ["$sce"], angular.module("BlurAdmin.pages.components.mail")
            .service("mailMessages", e)
    }(),
    function() {
        "use strict";

        function e() {
            function e(e, a) {
                e.each(function() {
                    $(this)
                        .offset()
                        .top > $(window)
                        .scrollTop() + $(window)
                        .height() * a && $(this)
                        .find(".cd-timeline-img, .cd-timeline-content")
                        .addClass("is-hidden")
                })
            }

            function a(e, a) {
                e.each(function() {
                    $(this)
                        .offset()
                        .top <= $(window)
                        .scrollTop() + $(window)
                        .height() * a && $(this)
                        .find(".cd-timeline-img")
                        .hasClass("is-hidden") && $(this)
                        .find(".cd-timeline-img, .cd-timeline-content")
                        .removeClass("is-hidden")
                        .addClass("bounce-in")
                })
            }
            var t = $(".cd-timeline-block"),
                i = .8;
            e(t, i), $(window)
                .on("scroll", function() {
                    window.requestAnimationFrame ? window.requestAnimationFrame(function() {
                        a(t, i)
                    }) : setTimeout(function() {
                        a(t, i)
                    }, 100)
                })
        }
        angular.module("BlurAdmin.pages.components.timeline")
            .controller("TimelineCtrl", e)
    }(),
    function() {
        "use strict";

        function e(e, a) {
            function t() {
                return [{
                    id: "n1",
                    parent: "#",
                    type: "folder",
                    text: "Node 1",
                    state: {
                        opened: !0
                    }
                }, {
                    id: "n2",
                    parent: "#",
                    type: "folder",
                    text: "Node 2",
                    state: {
                        opened: !0
                    }
                }, {
                    id: "n3",
                    parent: "#",
                    type: "folder",
                    text: "Node 3",
                    state: {
                        opened: !0
                    }
                }, {
                    id: "n5",
                    parent: "n1",
                    text: "Node 1.1",
                    state: {
                        opened: !0
                    }
                }, {
                    id: "n6",
                    parent: "n1",
                    text: "Node 1.2",
                    state: {
                        opened: !0
                    }
                }, {
                    id: "n7",
                    parent: "n1",
                    text: "Node 1.3",
                    state: {
                        opened: !0
                    }
                }, {
                    id: "n8",
                    parent: "n1",
                    text: "Node 1.4",
                    state: {
                        opened: !0
                    }
                }, {
                    id: "n9",
                    parent: "n2",
                    text: "Node 2.1",
                    state: {
                        opened: !0
                    }
                }, {
                    id: "n10",
                    parent: "n2",
                    text: "Node 2.2 (Custom icon)",
                    icon: "ion-help-buoy",
                    state: {
                        opened: !0
                    }
                }, {
                    id: "n12",
                    parent: "n3",
                    text: "Node 3.1",
                    state: {
                        opened: !0
                    }
                }, {
                    id: "n13",
                    parent: "n3",
                    type: "folder",
                    text: "Node 3.2",
                    state: {
                        opened: !0
                    }
                }, {
                    id: "n14",
                    parent: "n13",
                    text: "Node 3.2.1",
                    state: {
                        opened: !0
                    }
                }, {
                    id: "n15",
                    parent: "n13",
                    text: "Node 3.2.2",
                    state: {
                        opened: !0
                    }
                }, {
                    id: "n16",
                    parent: "n3",
                    text: "Node 3.3",
                    state: {
                        opened: !0
                    }
                }, {
                    id: "n17",
                    parent: "n3",
                    text: "Node 3.4",
                    state: {
                        opened: !0
                    }
                }, {
                    id: "n18",
                    parent: "n3",
                    text: "Node 3.5",
                    state: {
                        opened: !0
                    }
                }, {
                    id: "n19",
                    parent: "n3",
                    text: "Node 3.6",
                    state: {
                        opened: !0
                    }
                }]
            }
            e.ignoreChanges = !1;
            var i = 0;
            e.ignoreChanges = !1, e.newNode = {}, e.basicConfig = {
                core: {
                    multiple: !1,
                    check_callback: !0,
                    worker: !0
                },
                types: {
                    folder: {
                        icon: "ion-ios-folder"
                    },
                    "default": {
                        icon: "ion-document-text"
                    }
                },
                plugins: ["types"],
                version: 1
            }, e.dragConfig = {
                core: {
                    check_callback: !0,
                    themes: {
                        responsive: !1
                    }
                },
                types: {
                    folder: {
                        icon: "ion-ios-folder"
                    },
                    "default": {
                        icon: "ion-document-text"
                    }
                },
                plugins: ["dnd", "types"]
            }, e.addNewNode = function() {
                e.ignoreChanges = !0;
                var a = this.basicTree.jstree(!0)
                    .get_selected()[0];
                a && e.treeData.push({
                    id: (i++)
                        .toString(),
                    parent: a,
                    text: "New node " + i,
                    state: {
                        opened: !0
                    }
                }), e.basicConfig.version++
            }, e.refresh = function() {
                e.ignoreChanges = !0, i = 0, e.treeData = t(), e.basicConfig.version++
            }, e.expand = function() {
                e.ignoreChanges = !0, e.treeData.forEach(function(e) {
                    e.state.opened = !0
                }), e.basicConfig.version++
            }, e.collapse = function() {
                e.ignoreChanges = !0, e.treeData.forEach(function(e) {
                    e.state.opened = !1
                }), e.basicConfig.version++
            }, e.readyCB = function() {
                a(function() {
                    e.ignoreChanges = !1
                })
            }, e.applyModelChanges = function() {
                return !e.ignoreChanges
            }, e.treeData = t(), e.dragData = [{
                id: "nd1",
                parent: "#",
                type: "folder",
                text: "Node 1",
                state: {
                    opened: !0
                }
            }, {
                id: "nd2",
                parent: "#",
                type: "folder",
                text: "Node 2",
                state: {
                    opened: !0
                }
            }, {
                id: "nd3",
                parent: "#",
                type: "folder",
                text: "Node 3",
                state: {
                    opened: !0
                }
            }, {
                id: "nd4",
                parent: "#",
                type: "folder",
                text: "Node 4",
                state: {
                    opened: !0
                }
            }, {
                id: "nd5",
                parent: "nd1",
                text: "Node 1.1",
                state: {
                    opened: !0
                }
            }, {
                id: "nd6",
                parent: "nd1",
                text: "Node 1.2",
                state: {
                    opened: !0
                }
            }, {
                id: "nd7",
                parent: "nd1",
                text: "Node 1.3",
                state: {
                    opened: !0
                }
            }, {
                id: "nd8",
                parent: "nd2",
                text: "Node 2.1",
                state: {
                    opened: !0
                }
            }, {
                id: "nd9",
                parent: "nd2",
                text: "Node 2.2",
                state: {
                    opened: !0
                }
            }, {
                id: "nd10",
                parent: "nd2",
                text: "Node 2.3",
                state: {
                    opened: !0
                }
            }, {
                id: "nd11",
                parent: "nd3",
                text: "Node 3.1",
                state: {
                    opened: !0
                }
            }, {
                id: "nd12",
                parent: "nd3",
                text: "Node 3.2",
                state: {
                    opened: !0
                }
            }, {
                id: "nd13",
                parent: "nd3",
                text: "Node 3.3",
                state: {
                    opened: !0
                }
            }, {
                id: "nd14",
                parent: "nd4",
                text: "Node 4.1",
                state: {
                    opened: !0
                }
            }, {
                id: "nd15",
                parent: "nd4",
                text: "Node 4.2",
                state: {
                    opened: !0
                }
            }, {
                id: "nd16",
                parent: "nd4",
                text: "Node 4.3",
                state: {
                    opened: !0
                }
            }]
        }
        e.$inject = ["$scope", "$timeout"], angular.module("BlurAdmin.pages.components.tree")
            .controller("treeCtrl", e)
    }(),
    function() {
        "use strict";

        function e(e) {
            e.feed = [{
                type: "text-message",
                author: "Kostya",
                surname: "Danovsky",
                header: "Posted new message",
                text: 'Guys, check this out: \nA police officer found a perfect hiding place for watching for speeding motorists. One day, the officer was amazed when everyone was under the speed limit, so he investigated and found the problem. A 10 years old boy was standing on the side of the road with a huge hand painted sign which said "Radar Trap Ahead." A little more investigative work led the officer to the boy\'s accomplice: another boy about 100 yards beyond the radar trap with a sign reading "TIPS" and a bucket at his feet full of change.',
                time: "Today 11:55 pm",
                ago: "25 minutes ago",
                expanded: !1
            }, {
                type: "video-message",
                author: "Andrey",
                surname: "Hrabouski",
                header: "Added new video",
                text: '"Vader and Me"',
                preview: "app/feed/vader-and-me-preview.png",
                link: "https://www.youtube.com/watch?v=IfcpzBbbamk",
                time: "Today 9:30 pm",
                ago: "3 hrs ago",
                expanded: !1
            }, {
                type: "image-message",
                author: "Vlad",
                surname: "Lugovsky",
                header: "Added new image",
                text: '"My little kitten"',
                preview: "app/feed/my-little-kitten.png",
                link: "http://api.ning.com/files/DtcI2O2Ry7A7VhVxeiWfGU9WkHcMy4WSTWZ79oxJq*h0iXvVGndfD7CIYy-Ax-UAFCBCdqXI4GCBw3FOLKTTjQc*2cmpdOXJ/1082127884.jpeg",
                time: "Today 2:20 pm",
                ago: "10 hrs ago",
                expanded: !1
            }, {
                type: "text-message",
                author: "Nasta",
                surname: "Linnie",
                header: "Posted new message",
                text: "Haha lol",
                time: "11.11.2015",
                ago: "2 days ago",
                expanded: !1
            }, {
                type: "geo-message",
                author: "Nick",
                surname: "Cat",
                header: "Posted location",
                text: '"New York, USA"',
                preview: "app/feed/new-york-location.png",
                link: "https://www.google.by/maps/place/New+York,+NY,+USA/@40.7201111,-73.9893872,14z",
                time: "11.11.2015",
                ago: "2 days ago",
                expanded: !1
            }, {
                type: "text-message",
                author: "Vlad",
                surname: "Lugovsky",
                header: "Posted new message",
                text: "First snake: I hope I'm not poisonous. Second snake: Why? First snake: Because I bit my lip!",
                time: "12.11.2015",
                ago: "3 days ago",
                expanded: !1
            }, {
                type: "text-message",
                author: "Andrey",
                surname: "Hrabouski",
                header: "Posted new message",
                text: 'How do you smuggle an elephant across the border? Put a slice of bread on each side, and call him "lunch".',
                time: "14.11.2015",
                ago: "5 days ago",
                expanded: !1
            }, {
                type: "text-message",
                author: "Nasta",
                surname: "Linnie",
                header: "Posted new message",
                text: "When your hammer is C++, everything begins to look like a thumb.",
                time: "14.11.2015",
                ago: "5 days ago",
                expanded: !1
            }, {
                type: "text-message",
                author: "Alexander",
                surname: "Demeshko",
                header: "Posted new message",
                text: 'â€œI mean, they say you die twice. One time when you stop breathing and a second time, a bit later on, when somebody says your name for the last time." Â©',
                time: "15.11.2015",
                ago: "6 days ago",
                expanded: !1
            }, {
                type: "image-message",
                author: "Nick",
                surname: "Cat",
                header: "Posted photo",
                text: '"Protein Heroes"',
                preview: "app/feed/genom.png",
                link: "https://dribbble.com/shots/2504810-Protein-Heroes",
                time: "16.11.2015",
                ago: "7 days ago",
                expanded: !1
            }, {
                type: "text-message",
                author: "Kostya",
                surname: "Danovsky",
                header: "Posted new message",
                text: "Why did the CoffeeScript developer keep getting lost? Because he couldn't find his source without a map",
                time: "18.11.2015",
                ago: "9 days ago",
                expanded: !1
            }], e.expandMessage = function(e) {
                e.expanded = !e.expanded
            }
        }
        e.$inject = ["$scope"], angular.module("BlurAdmin.pages.dashboard")
            .controller("BlurFeedCtrl", e)
    }(),
    function() {
        "use strict";

        function e() {
            return {
                restrict: "E",
                controller: "BlurFeedCtrl",
                templateUrl: "app/pages/dashboard/blurFeed/blurFeed.html"
            }
        }
        angular.module("BlurAdmin.pages.dashboard")
            .directive("blurFeed", e)
    }(),
    function() {
        "use strict";

        function e() {}
        angular.module("BlurAdmin.pages.dashboard")
            .service("dashboardCalendar", e)
    }(),
    function() {
        "use strict";

        function e(e) {
            var a = e.colors.dashboard,
                t = $("#calendar")
                .fullCalendar({
                    header: {
                        left: "prev,next today",
                        center: "title",
                        right: "month,agendaWeek,agendaDay"
                    },
                    defaultDate: "2016-03-08",
                    selectable: !0,
                    selectHelper: !0,
                    select: function(e, a) {
                        var i, s = prompt("Event Title:");
                        s && (i = {
                            title: s,
                            start: e,
                            end: a
                        }, t.fullCalendar("renderEvent", i, !0)), t.fullCalendar("unselect")
                    },
                    editable: !0,
                    eventLimit: !0,
                    events: [{
                        title: "All Day Event",
                        start: "2016-03-01",
                        color: a.silverTree
                    }, {
                        title: "Long Event",
                        start: "2016-03-07",
                        end: "2016-03-10",
                        color: a.blueStone
                    }, {
                        title: "Dinner",
                        start: "2016-03-14T20:00:00",
                        color: a.surfieGreen
                    }, {
                        title: "Birthday Party",
                        start: "2016-04-01T07:00:00",
                        color: a.gossipDark
                    }]
                })
        }
        e.$inject = ["baConfig"], angular.module("BlurAdmin.pages.dashboard")
            .controller("DashboardCalendarCtrl", e)
    }(),
    function() {
        "use strict";

        function e() {
            return {
                restrict: "E",
                controller: "DashboardCalendarCtrl",
                templateUrl: "app/pages/dashboard/dashboardCalendar/dashboardCalendar.html"
            }
        }
        angular.module("BlurAdmin.pages.dashboard")
            .directive("dashboardCalendar", e)
    }(),
    function() {
        "use strict";

        function e(e, a, t) {
            function i() {
                n.zoomToDates(new Date(2013, 3), new Date(2014, 0))
            }
            var s = e.colors,
                l = e.theme.blur ? "#000000" : s.primary,
                o = [{
                    date: new Date(2012, 11),
                    value: 0,
                    value0: 0
                }, {
                    date: new Date(2013, 0),
                    value: 15e3,
                    value0: 19e3
                }, {
                    date: new Date(2013, 1),
                    value: 3e4,
                    value0: 2e4
                }, {
                    date: new Date(2013, 2),
                    value: 25e3,
                    value0: 22e3
                }, {
                    date: new Date(2013, 3),
                    value: 21e3,
                    value0: 25e3
                }, {
                    date: new Date(2013, 4),
                    value: 24e3,
                    value0: 29e3
                }, {
                    date: new Date(2013, 5),
                    value: 31e3,
                    value0: 26e3
                }, {
                    date: new Date(2013, 6),
                    value: 4e4,
                    value0: 25e3
                }, {
                    date: new Date(2013, 7),
                    value: 37e3,
                    value0: 2e4
                }, {
                    date: new Date(2013, 8),
                    value: 18e3,
                    value0: 22e3
                }, {
                    date: new Date(2013, 9),
                    value: 5e3,
                    value0: 26e3
                }, {
                    date: new Date(2013, 10),
                    value: 4e4,
                    value0: 3e4
                }, {
                    date: new Date(2013, 11),
                    value: 2e4,
                    value0: 25e3
                }, {
                    date: new Date(2014, 0),
                    value: 5e3,
                    value0: 13e3
                }, {
                    date: new Date(2014, 1),
                    value: 3e3,
                    value0: 13e3
                }, {
                    date: new Date(2014, 2),
                    value: 1800,
                    value0: 13e3
                }, {
                    date: new Date(2014, 3),
                    value: 10400,
                    value0: 13e3
                }, {
                    date: new Date(2014, 4),
                    value: 25500,
                    value0: 13e3
                }, {
                    date: new Date(2014, 5),
                    value: 2100,
                    value0: 13e3
                }, {
                    date: new Date(2014, 6),
                    value: 6500,
                    value0: 13e3
                }, {
                    date: new Date(2014, 7),
                    value: 1100,
                    value0: 13e3
                }, {
                    date: new Date(2014, 8),
                    value: 17200,
                    value0: 13e3
                }, {
                    date: new Date(2014, 9),
                    value: 26900,
                    value0: 13e3
                }, {
                    date: new Date(2014, 10),
                    value: 14100,
                    value0: 13e3
                }, {
                    date: new Date(2014, 11),
                    value: 35300,
                    value0: 13e3
                }, {
                    date: new Date(2015, 0),
                    value: 54800,
                    value0: 13e3
                }, {
                    date: new Date(2015, 1),
                    value: 49800,
                    value0: 13e3
                }],
                n = AmCharts.makeChart("amchart", {
                    type: "serial",
                    theme: "blur",
                    marginTop: 15,
                    marginRight: 15,
                    dataProvider: o,
                    categoryField: "date",
                    categoryAxis: {
                        parseDates: !0,
                        gridAlpha: 0,
                        color: s.defaultText,
                        axisColor: s.defaultText
                    },
                    valueAxes: [{
                        minVerticalGap: 50,
                        gridAlpha: 0,
                        color: s.defaultText,
                        axisColor: s.defaultText
                    }],
                    graphs: [{
                        id: "g0",
                        bullet: "none",
                        useLineColorForBulletBorder: !0,
                        lineColor: t.hexToRGB(l, .3),
                        lineThickness: 1,
                        negativeLineColor: s.danger,
                        type: "smoothedLine",
                        valueField: "value0",
                        fillAlphas: 1,
                        fillColorsField: "lineColor"
                    }, {
                        id: "g1",
                        bullet: "none",
                        useLineColorForBulletBorder: !0,
                        lineColor: t.hexToRGB(l, .5),
                        lineThickness: 1,
                        negativeLineColor: s.danger,
                        type: "smoothedLine",
                        valueField: "value",
                        fillAlphas: 1,
                        fillColorsField: "lineColor"
                    }],
                    chartCursor: {
                        categoryBalloonDateFormat: "MM YYYY",
                        categoryBalloonColor: "#4285F4",
                        categoryBalloonAlpha: .7,
                        cursorAlpha: 0,
                        valueLineEnabled: !0,
                        valueLineBalloonEnabled: !0,
                        valueLineAlpha: .5
                    },
                    dataDateFormat: "MM YYYY",
                    "export": {
                        enabled: !0
                    },
                    creditsPosition: "bottom-right",
                    zoomOutButton: {
                        backgroundColor: "#fff",
                        backgroundAlpha: 0
                    },
                    zoomOutText: "",
                    pathToImages: a.images.amChart
                });
            n.addListener("rendered", i), i(), n.zoomChart && n.zoomChart()
        }
        e.$inject = ["baConfig", "layoutPaths", "baUtil"], angular.module("BlurAdmin.pages.dashboard")
            .controller("DashboardLineChartCtrl", e)
    }(),
    function() {
        "use strict";

        function e() {
            return {
                restrict: "E",
                controller: "DashboardLineChartCtrl",
                templateUrl: "app/pages/dashboard/dashboardLineChart/dashboardLineChart.html"
            }
        }
        angular.module("BlurAdmin.pages.dashboard")
            .directive("dashboardLineChart", e)
    }(),
    function() {
        "use strict";

        function e(e, a) {
            var t = e.colors;
            AmCharts.makeChart("amChartMap", {
                type: "map",
                theme: "blur",
                zoomControl: {
                    zoomControlEnabled: !1,
                    panControlEnabled: !1
                },
                dataProvider: {
                    map: "worldLow",
                    zoomLevel: 3.5,
                    zoomLongitude: 10,
                    zoomLatitude: 52,
                    areas: [{
                        title: "Austria",
                        id: "AT",
                        color: t.primary,
                        customData: "1 244",
                        groupId: "1"
                    }, {
                        title: "Ireland",
                        id: "IE",
                        color: t.primary,
                        customData: "1 342",
                        groupId: "1"
                    }, {
                        title: "Denmark",
                        id: "DK",
                        color: t.primary,
                        customData: "1 973",
                        groupId: "1"
                    }, {
                        title: "Finland",
                        id: "FI",
                        color: t.primary,
                        customData: "1 573",
                        groupId: "1"
                    }, {
                        title: "Sweden",
                        id: "SE",
                        color: t.primary,
                        customData: "1 084",
                        groupId: "1"
                    }, {
                        title: "Great Britain",
                        id: "GB",
                        color: t.primary,
                        customData: "1 452",
                        groupId: "1"
                    }, {
                        title: "Italy",
                        id: "IT",
                        color: t.primary,
                        customData: "1 321",
                        groupId: "1"
                    }, {
                        title: "France",
                        id: "FR",
                        color: t.primary,
                        customData: "1 112",
                        groupId: "1"
                    }, {
                        title: "Spain",
                        id: "ES",
                        color: t.primary,
                        customData: "1 865",
                        groupId: "1"
                    }, {
                        title: "Greece",
                        id: "GR",
                        color: t.primary,
                        customData: "1 453",
                        groupId: "1"
                    }, {
                        title: "Germany",
                        id: "DE",
                        color: t.primary,
                        customData: "1 957",
                        groupId: "1"
                    }, {
                        title: "Belgium",
                        id: "BE",
                        color: t.primary,
                        customData: "1 011",
                        groupId: "1"
                    }, {
                        title: "Luxembourg",
                        id: "LU",
                        color: t.primary,
                        customData: "1 011",
                        groupId: "1"
                    }, {
                        title: "Netherlands",
                        id: "NL",
                        color: t.primary,
                        customData: "1 213",
                        groupId: "1"
                    }, {
                        title: "Portugal",
                        id: "PT",
                        color: t.primary,
                        customData: "1 291",
                        groupId: "1"
                    }, {
                        title: "Lithuania",
                        id: "LT",
                        color: t.successLight,
                        customData: "567",
                        groupId: "2"
                    }, {
                        title: "Latvia",
                        id: "LV",
                        color: t.successLight,
                        customData: "589",
                        groupId: "2"
                    }, {
                        title: "Czech Republic ",
                        id: "CZ",
                        color: t.successLight,
                        customData: "785",
                        groupId: "2"
                    }, {
                        title: "Slovakia",
                        id: "SK",
                        color: t.successLight,
                        customData: "965",
                        groupId: "2"
                    }, {
                        title: "Estonia",
                        id: "EE",
                        color: t.successLight,
                        customData: "685",
                        groupId: "2"
                    }, {
                        title: "Hungary",
                        id: "HU",
                        color: t.successLight,
                        customData: "854",
                        groupId: "2"
                    }, {
                        title: "Cyprus",
                        id: "CY",
                        color: t.successLight,
                        customData: "754",
                        groupId: "2"
                    }, {
                        title: "Malta",
                        id: "MT",
                        color: t.successLight,
                        customData: "867",
                        groupId: "2"
                    }, {
                        title: "Poland",
                        id: "PL",
                        color: t.successLight,
                        customData: "759",
                        groupId: "2"
                    }, {
                        title: "Romania",
                        id: "RO",
                        color: t.success,
                        customData: "302",
                        groupId: "3"
                    }, {
                        title: "Bulgaria",
                        id: "BG",
                        color: t.success,
                        customData: "102",
                        groupId: "3"
                    }, {
                        title: "Slovenia",
                        id: "SI",
                        color: t.danger,
                        customData: "23",
                        groupId: "4"
                    }, {
                        title: "Croatia",
                        id: "HR",
                        color: t.danger,
                        customData: "96",
                        groupId: "4"
                    }]
                },
                areasSettings: {
                    rollOverOutlineColor: t.border,
                    rollOverColor: t.primaryDark,
                    alpha: .8,
                    unlistedAreasAlpha: .2,
                    unlistedAreasColor: t.defaultText,
                    balloonText: "[[title]]: [[customData]] users"
                },
                legend: {
                    width: "100%",
                    marginRight: 27,
                    marginLeft: 27,
                    equalWidths: !1,
                    backgroundAlpha: .3,
                    backgroundColor: t.border,
                    borderColor: t.border,
                    borderAlpha: 1,
                    top: 362,
                    left: 0,
                    horizontalGap: 10,
                    data: [{
                        title: "over 1 000 users",
                        color: t.primary
                    }, {
                        title: "500 - 1 000 users",
                        color: t.successLight
                    }, {
                        title: "100 - 500 users",
                        color: t.success
                    }, {
                        title: "0 - 100 users",
                        color: t.danger
                    }]
                },
                "export": {
                    enabled: !0
                },
                creditsPosition: "bottom-right",
                pathToImages: a.images.amChart
            })
        }
        e.$inject = ["baConfig", "layoutPaths"], angular.module("BlurAdmin.pages.dashboard")
            .controller("DashboardMapCtrl", e)
    }(),
    function() {
        "use strict";

        function e() {
            return {
                restrict: "E",
                controller: "DashboardMapCtrl",
                templateUrl: "app/pages/dashboard/dashboardMap/dashboardMap.html"
            }
        }
        angular.module("BlurAdmin.pages.dashboard")
            .directive("dashboardMap", e)
    }(),
    function() {
        "use strict";

        function e(e, a, t, i) {
            function s(e, a) {
                return Math.random() * (a - e) + e
            }

            function l() {
                $(".chart")
                    .each(function() {
                        var e = $(this);
                        e.easyPieChart({
                            easing: "easeOutBounce",
                            onStep: function(e, a, t) {
                                $(this.el)
                                    .find(".percent")
                                    .text(Math.round(t))
                            },
                            barColor: e.attr("rel"),
                            trackColor: "rgba(0,0,0,0)",
                            size: 84,
                            scaleLength: 0,
                            animation: 2e3,
                            lineWidth: 9,
                            lineCap: "round"
                        })
                    }), $(".refresh-data")
                    .on("click", function() {
                        o()
                    })
            }

            function o() {
                $(".pie-charts .chart")
                    .each(function(e, a) {
                        $(a)
                            .data("easyPieChart")
                            .update(s(55, 90))
                    })
            }
            var n = i.hexToRGB(t.colors.defaultText, .2);
            e.charts = [{
                color: n,
                description: "New Visits",
                stats: "57,820",
                icon: "person"
            }, {
                color: n,
                description: "Purchases",
                stats: "$ 89,745",
                icon: "money"
            }, {
                color: n,
                description: "Active Users",
                stats: "178,391",
                icon: "face"
            }, {
                color: n,
                description: "Returned",
                stats: "32,592",
                icon: "refresh"
            }], a(function() {
                l(), o()
            }, 1e3)
        }
        e.$inject = ["$scope", "$timeout", "baConfig", "baUtil"], angular.module("BlurAdmin.pages.dashboard")
            .controller("DashboardPieChartCtrl", e)
    }(),
    function() {
        "use strict";

        function e() {
            return {
                restrict: "E",
                controller: "DashboardPieChartCtrl",
                templateUrl: "app/pages/dashboard/dashboardPieChart/dashboardPieChart.html"
            }
        }
        angular.module("BlurAdmin.pages.dashboard")
            .directive("dashboardPieChart", e)
    }(),
    function() {
        "use strict";

        function e(e, a) {
            function t() {
                var e = Math.floor(Math.random() * (s.length - 1));
                return s[e]
            }
            e.transparent = a.theme.blur;
            var i = a.colors.dashboard,
                s = [];
            for (var l in i) s.push(i[l]);
            e.todoList = [{
                text: "Check me out"
            }, {
                text: "Lorem ipsum dolor sit amet, possit denique oportere at his, etiam corpora deseruisse te pro"
            }, {
                text: "Ex has semper alterum, expetenda dignissim"
            }, {
                text: "Vim an eius ocurreret abhorreant, id nam aeque persius ornatus."
            }, {
                text: "Simul erroribus ad usu"
            }, {
                text: "Ei cum solet appareat, ex est graeci mediocritatem"
            }, {
                text: "Get in touch with akveo team"
            }, {
                text: "Write email to business cat"
            }, {
                text: "Have fun with blur admin"
            }, {
                text: "What do you think?"
            }], e.todoList.forEach(function(e) {
                e.color = t()
            }), e.newTodoText = "", e.addToDoItem = function(a, i) {
                (i || 13 === a.which) && (e.todoList.unshift({
                    text: e.newTodoText,
                    color: t()
                }), e.newTodoText = "")
            }
        }
        e.$inject = ["$scope", "baConfig"], angular.module("BlurAdmin.pages.dashboard")
            .controller("DashboardTodoCtrl", e)
    }(),
    function() {
        "use strict";

        function e() {
            return {
                restrict: "EA",
                controller: "DashboardTodoCtrl",
                templateUrl: "app/pages/dashboard/dashboardTodo/dashboardTodo.html"
            }
        }
        angular.module("BlurAdmin.pages.dashboard")
            .directive("dashboardTodo", e)
    }(),
    function() {
        "use strict";

        function e() {}
        angular.module("BlurAdmin.pages.dashboard")
            .service("dashboardPieChart", e)
    }(),
    function() {
        "use strict";

        function e() {
            return {
                restrict: "E",
                templateUrl: "app/pages/dashboard/popularApp/popularApp.html"
            }
        }
        angular.module("BlurAdmin.pages.dashboard")
            .directive("popularApp", e)
    }(),
    function() {
        "use strict";

        function e(e, a, t) {
            e.transparent = a.theme.blur;
            var i = a.colors.dashboard;
            e.doughnutData = [{
                value: 2e3,
                color: i.white,
                highlight: t.shade(i.white, 15),
                label: "Other",
                percentage: 87,
                order: 1
            }, {
                value: 1500,
                color: i.blueStone,
                highlight: t.shade(i.blueStone, 15),
                label: "Search engines",
                percentage: 22,
                order: 4
            }, {
                value: 1e3,
                color: i.surfieGreen,
                highlight: t.shade(i.surfieGreen, 15),
                label: "Referral Traffic",
                percentage: 70,
                order: 3
            }, {
                value: 1200,
                color: i.silverTree,
                highlight: t.shade(i.silverTree, 15),
                label: "Direct Traffic",
                percentage: 38,
                order: 2
            }, {
                value: 400,
                color: i.gossip,
                highlight: t.shade(i.gossip, 15),
                label: "Ad Campaigns",
                percentage: 17,
                order: 0
            }];
            var s = document.getElementById("chart-area")
                .getContext("2d");
            window.myDoughnut = new Chart(s)
                .Doughnut(e.doughnutData, {
                    segmentShowStroke: !1,
                    percentageInnerCutout: 64,
                    responsive: !0
                })
        }
        e.$inject = ["$scope", "baConfig", "colorHelper"], angular.module("BlurAdmin.pages.dashboard")
            .controller("TrafficChartCtrl", e)
    }(),
    function() {
        "use strict";

        function e() {
            return {
                restrict: "E",
                controller: "TrafficChartCtrl",
                templateUrl: "app/pages/dashboard/trafficChart/trafficChart.html"
            }
        }
        angular.module("BlurAdmin.pages.dashboard")
            .directive("trafficChart", e)
    }(),
    function() {
        "use strict";

        function e(e, a, t, i) {
            function s() {
                a.jsonp("http://www.geoplugin.net/json.gp?jsoncallback=JSON_CALLBACK")
                    .then(function(a) {
                        e.geoData = a.data, e.updateWeather()
                    }, function() {
                        console.log("GEO FAILED")
                    })
            }

            function l(e) {
                AmCharts.makeChart("tempChart", {
                        type: "serial",
                        theme: "blur",
                        handDrawn: !0,
                        categoryField: "time",
                        dataProvider: e,
                        valueAxes: [{
                            axisAlpha: .3,
                            gridAlpha: 0
                        }],
                        graphs: [{
                            bullet: "square",
                            fillAlphas: .3,
                            fillColorsField: "lineColor",
                            legendValueText: "[[value]]",
                            lineColorField: "lineColor",
                            title: "Temp",
                            valueField: "temp"
                        }],
                        categoryAxis: {
                            gridAlpha: 0,
                            axisAlpha: .3
                        }
                    })
                    .write("tempChart")
            }

            function o(a) {
                var t = a.list[0],
                    s = {
                        days: [{
                            date: new Date,
                            timeTemp: [],
                            main: t.weather[0].main,
                            description: t.weather[0].description,
                            icon: t.weather[0].icon,
                            temp: t.main.temp
                        }],
                        current: 0
                    };
                a.list.forEach(function(e, t) {
                    var i = new Date(e.dt_txt);
                    i.getDate() !== s.days[s.days.length - 1].date.getDate() && s.days.push({
                        date: i,
                        timeTemp: []
                    });
                    var l = s.days[s.days.length - 1];
                    l.timeTemp.push({
                        time: i.getHours(),
                        temp: e.main.temp
                    }), (s.days.length > 1 && i.getHours() == c || t == a.list.length - 1) && (l.main = e.weather[0].main, l.description = e.weather[0].description, l.icon = e.weather[0].icon, l.temp = e.main.temp, l.date.setHours(t == a.list.length - 1 ? 0 : c), l.date.setMinutes(0))
                }), console.log(s.days[s.current].date), s.days = s.days.slice(0, i.attr("forecast") || 5), e.weather = s
            }
            var n = "http://api.openweathermap.org/data/2.5/forecast",
                r = "GET",
                d = "2de143494c0b295cca9337e1e96b00e0",
                c = 15;
            e.units = "metric", e.weatherIcons = {
                "01d": "ion-ios-sunny-outline",
                "02d": "ion-ios-partlysunny-outline",
                "03d": "ion-ios-cloud-outline",
                "04d": "ion-ios-cloud",
                "09d": "ion-ios-rainy",
                "10d": "ion-ios-rainy-outline",
                "11d": "ion-ios-thunderstorm-outline",
                "13d": "ion-ios-snowy",
                "50d": "ion-ios-cloudy-outline",
                "01n": "ion-ios-cloudy-night-outline",
                "02n": "ion-ios-cloudy-night",
                "03n": "ion-ios-cloud-outline",
                "04n": "ion-ios-cloud",
                "09n": "ion-ios-rainy",
                "10n": "ion-ios-rainy-outline",
                "11n": "ion-ios-thunderstorm",
                "13n": "ion-ios-snowy",
                "50n": "ion-ios-cloudy-outline"
            }, e.weather = {}, e.switchUnits = function(a) {
                e.units = a, e.updateWeather()
            }, e.switchDay = function(a) {
                e.weather.current = a, l(e.weather.days[e.weather.current].timeTemp)
            }, e.updateWeather = function() {
                a({
                        method: r,
                        url: n,
                        params: {
                            appid: d,
                            lat: e.geoData.geoplugin_latitude,
                            lon: e.geoData.geoplugin_longitude,
                            units: e.units
                        }
                    })
                    .then(function(a) {
                        o(a.data), l(e.weather.days[e.weather.current].timeTemp)
                    }, function() {
                        console.log("WEATHER FAILED")
                    })
            }, s()
        }
        e.$inject = ["$scope", "$http", "$timeout", "$element"], angular.module("BlurAdmin.pages.dashboard")
            .controller("WeatherCtrl", e)
    }(),
    function() {
        "use strict";

        function e() {
            return {
                restrict: "EA",
                controller: "WeatherCtrl",
                templateUrl: "app/pages/dashboard/weather/weather.html"
            }
        }
        angular.module("BlurAdmin.pages.dashboard")
            .directive("weather", e)
    }(),
    function() {
        "use strict";

        function e(e) {
            var a = this;
            a.personalInfo = {}, a.productInfo = {}, a.shipment = {}, a.arePersonalInfoPasswordsEqual = function() {
                return a.personalInfo.confirmPassword && a.personalInfo.password == a.personalInfo.confirmPassword
            }
        }
        e.$inject = ["$scope"], angular.module("BlurAdmin.pages.form")
            .controller("WizardCtrl", e)
    }(),
    function() {
        "use strict";

        function e(e) {
            function a() {
                var e = document.getElementById("google-maps"),
                    a = {
                        center: new google.maps.LatLng(44.5403, -78.5463),
                        zoom: 8,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    };
                new google.maps.Map(e, a)
            }
            e(function() {
                a()
            }, 100)
        }
        e.$inject = ["$timeout"], angular.module("BlurAdmin.pages.maps")
            .controller("GmapPageCtrl", e)
    }(),
    function() {
        "use strict";

        function e(e) {
            function a() {
                L.Icon.Default.imagePath = "assets/img/theme/vendor/leaflet/dist/images";
                var e = L.map(document.getElementById("leaflet-map"))
                    .setView([51.505, -.09], 13);
                L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
                        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    })
                    .addTo(e), L.marker([51.5, -.09])
                    .addTo(e)
                    .bindPopup("A pretty CSS3 popup.<br> Easily customizable.")
                    .openPopup()
            }
            e(function() {
                a()
            }, 100)
        }
        e.$inject = ["$timeout"], angular.module("BlurAdmin.pages.maps")
            .controller("LeafletPageCtrl", e)
    }(),
    function() {
        "use strict";

        function e(e, a, t) {
            var i = e.colors,
                s = {};
            s.AD = {
                latitude: 42.5,
                longitude: 1.5
            }, s.AE = {
                latitude: 24,
                longitude: 54
            }, s.AF = {
                latitude: 33,
                longitude: 65
            }, s.AG = {
                latitude: 17.05,
                longitude: -61.8
            }, s.AI = {
                latitude: 18.25,
                longitude: -63.1667
            }, s.AL = {
                latitude: 41,
                longitude: 20
            }, s.AM = {
                latitude: 40,
                longitude: 45
            }, s.AN = {
                latitude: 12.25,
                longitude: -68.75
            }, s.AO = {
                latitude: -12.5,
                longitude: 18.5
            }, s.AP = {
                latitude: 35,
                longitude: 105
            }, s.AQ = {
                latitude: -90,
                longitude: 0
            }, s.AR = {
                latitude: -34,
                longitude: -64
            }, s.AS = {
                latitude: -14.3333,
                longitude: -170
            }, s.AT = {
                latitude: 47.3333,
                longitude: 13.3333
            }, s.AU = {
                latitude: -27,
                longitude: 133
            }, s.AW = {
                latitude: 12.5,
                longitude: -69.9667
            }, s.AZ = {
                latitude: 40.5,
                longitude: 47.5
            }, s.BA = {
                latitude: 44,
                longitude: 18
            }, s.BB = {
                latitude: 13.1667,
                longitude: -59.5333
            }, s.BD = {
                latitude: 24,
                longitude: 90
            }, s.BE = {
                latitude: 50.8333,
                longitude: 4
            }, s.BF = {
                latitude: 13,
                longitude: -2
            }, s.BG = {
                latitude: 43,
                longitude: 25
            }, s.BH = {
                latitude: 26,
                longitude: 50.55
            }, s.BI = {
                latitude: -3.5,
                longitude: 30
            }, s.BJ = {
                latitude: 9.5,
                longitude: 2.25
            }, s.BM = {
                latitude: 32.3333,
                longitude: -64.75
            }, s.BN = {
                latitude: 4.5,
                longitude: 114.6667
            }, s.BO = {
                latitude: -17,
                longitude: -65
            }, s.BR = {
                latitude: -10,
                longitude: -55
            }, s.BS = {
                latitude: 24.25,
                longitude: -76
            }, s.BT = {
                latitude: 27.5,
                longitude: 90.5
            }, s.BV = {
                latitude: -54.4333,
                longitude: 3.4
            }, s.BW = {
                latitude: -22,
                longitude: 24
            }, s.BY = {
                latitude: 53,
                longitude: 28
            }, s.BZ = {
                latitude: 17.25,
                longitude: -88.75
            }, s.CA = {
                latitude: 54,
                longitude: -100
            }, s.CC = {
                latitude: -12.5,
                longitude: 96.8333
            }, s.CD = {
                latitude: 0,
                longitude: 25
            }, s.CF = {
                latitude: 7,
                longitude: 21
            }, s.CG = {
                latitude: -1,
                longitude: 15
            }, s.CH = {
                latitude: 47,
                longitude: 8
            }, s.CI = {
                latitude: 8,
                longitude: -5
            }, s.CK = {
                latitude: -21.2333,
                longitude: -159.7667
            }, s.CL = {
                latitude: -30,
                longitude: -71
            }, s.CM = {
                latitude: 6,
                longitude: 12
            }, s.CN = {
                latitude: 35,
                longitude: 105
            }, s.CO = {
                latitude: 4,
                longitude: -72
            }, s.CR = {
                latitude: 10,
                longitude: -84
            }, s.CU = {
                latitude: 21.5,
                longitude: -80
            }, s.CV = {
                latitude: 16,
                longitude: -24
            }, s.CX = {
                latitude: -10.5,
                longitude: 105.6667
            }, s.CY = {
                latitude: 35,
                longitude: 33
            }, s.CZ = {
                latitude: 49.75,
                longitude: 15.5
            }, s.DE = {
                latitude: 51,
                longitude: 9
            }, s.DJ = {
                latitude: 11.5,
                longitude: 43
            }, s.DK = {
                latitude: 56,
                longitude: 10
            }, s.DM = {
                latitude: 15.4167,
                longitude: -61.3333
            }, s.DO = {
                latitude: 19,
                longitude: -70.6667
            }, s.DZ = {
                latitude: 28,
                longitude: 3
            }, s.EC = {
                latitude: -2,
                longitude: -77.5
            }, s.EE = {
                latitude: 59,
                longitude: 26
            }, s.EG = {
                latitude: 27,
                longitude: 30
            }, s.EH = {
                latitude: 24.5,
                longitude: -13
            }, s.ER = {
                latitude: 15,
                longitude: 39
            }, s.ES = {
                latitude: 40,
                longitude: -4
            }, s.ET = {
                latitude: 8,
                longitude: 38
            }, s.EU = {
                latitude: 47,
                longitude: 8
            }, s.FI = {
                latitude: 62,
                longitude: 26
            }, s.FJ = {
                latitude: -18,
                longitude: 175
            }, s.FK = {
                latitude: -51.75,
                longitude: -59
            }, s.FM = {
                latitude: 6.9167,
                longitude: 158.25
            }, s.FO = {
                latitude: 62,
                longitude: -7
            }, s.FR = {
                latitude: 46,
                longitude: 2
            }, s.GA = {
                latitude: -1,
                longitude: 11.75
            }, s.GB = {
                latitude: 54,
                longitude: -2
            }, s.GD = {
                latitude: 12.1167,
                longitude: -61.6667
            }, s.GE = {
                latitude: 42,
                longitude: 43.5
            }, s.GF = {
                latitude: 4,
                longitude: -53
            }, s.GH = {
                latitude: 8,
                longitude: -2
            }, s.GI = {
                latitude: 36.1833,
                longitude: -5.3667
            }, s.GL = {
                latitude: 72,
                longitude: -40
            }, s.GM = {
                latitude: 13.4667,
                longitude: -16.5667
            }, s.GN = {
                latitude: 11,
                longitude: -10
            }, s.GP = {
                latitude: 16.25,
                longitude: -61.5833
            }, s.GQ = {
                latitude: 2,
                longitude: 10
            }, s.GR = {
                latitude: 39,
                longitude: 22
            }, s.GS = {
                latitude: -54.5,
                longitude: -37
            }, s.GT = {
                latitude: 15.5,
                longitude: -90.25
            }, s.GU = {
                latitude: 13.4667,
                longitude: 144.7833
            }, s.GW = {
                latitude: 12,
                longitude: -15
            }, s.GY = {
                latitude: 5,
                longitude: -59
            }, s.HK = {
                latitude: 22.25,
                longitude: 114.1667
            }, s.HM = {
                latitude: -53.1,
                longitude: 72.5167
            }, s.HN = {
                latitude: 15,
                longitude: -86.5
            }, s.HR = {
                latitude: 45.1667,
                longitude: 15.5
            }, s.HT = {
                latitude: 19,
                longitude: -72.4167
            }, s.HU = {
                latitude: 47,
                longitude: 20
            }, s.ID = {
                latitude: -5,
                longitude: 120
            }, s.IE = {
                latitude: 53,
                longitude: -8
            }, s.IL = {
                latitude: 31.5,
                longitude: 34.75
            }, s.IN = {
                latitude: 20,
                longitude: 77
            }, s.IO = {
                latitude: -6,
                longitude: 71.5
            }, s.IQ = {
                latitude: 33,
                longitude: 44
            }, s.IR = {
                latitude: 32,
                longitude: 53
            }, s.IS = {
                latitude: 65,
                longitude: -18
            }, s.IT = {
                latitude: 42.8333,
                longitude: 12.8333
            }, s.JM = {
                latitude: 18.25,
                longitude: -77.5
            }, s.JO = {
                latitude: 31,
                longitude: 36
            }, s.JP = {
                latitude: 36,
                longitude: 138
            }, s.KE = {
                latitude: 1,
                longitude: 38
            }, s.KG = {
                latitude: 41,
                longitude: 75
            }, s.KH = {
                latitude: 13,
                longitude: 105
            }, s.KI = {
                latitude: 1.4167,
                longitude: 173
            }, s.KM = {
                latitude: -12.1667,
                longitude: 44.25
            }, s.KN = {
                latitude: 17.3333,
                longitude: -62.75
            }, s.KP = {
                latitude: 40,
                longitude: 127
            }, s.KR = {
                latitude: 37,
                longitude: 127.5
            }, s.KW = {
                latitude: 29.3375,
                longitude: 47.6581
            }, s.KY = {
                latitude: 19.5,
                longitude: -80.5
            }, s.KZ = {
                latitude: 48,
                longitude: 68
            }, s.LA = {
                latitude: 18,
                longitude: 105
            }, s.LB = {
                latitude: 33.8333,
                longitude: 35.8333
            }, s.LC = {
                latitude: 13.8833,
                longitude: -61.1333
            }, s.LI = {
                latitude: 47.1667,
                longitude: 9.5333
            }, s.LK = {
                latitude: 7,
                longitude: 81
            }, s.LR = {
                latitude: 6.5,
                longitude: -9.5
            }, s.LS = {
                latitude: -29.5,
                longitude: 28.5
            }, s.LT = {
                latitude: 55,
                longitude: 24
            }, s.LU = {
                latitude: 49.75,
                longitude: 6
            }, s.LV = {
                latitude: 57,
                longitude: 25
            }, s.LY = {
                latitude: 25,
                longitude: 17
            }, s.MA = {
                latitude: 32,
                longitude: -5
            }, s.MC = {
                latitude: 43.7333,
                longitude: 7.4
            }, s.MD = {
                latitude: 47,
                longitude: 29
            }, s.ME = {
                latitude: 42.5,
                longitude: 19.4
            }, s.MG = {
                latitude: -20,
                longitude: 47
            }, s.MH = {
                latitude: 9,
                longitude: 168
            }, s.MK = {
                latitude: 41.8333,
                longitude: 22
            }, s.ML = {
                latitude: 17,
                longitude: -4
            }, s.MM = {
                latitude: 22,
                longitude: 98
            }, s.MN = {
                latitude: 46,
                longitude: 105
            }, s.MO = {
                latitude: 22.1667,
                longitude: 113.55
            }, s.MP = {
                latitude: 15.2,
                longitude: 145.75
            }, s.MQ = {
                latitude: 14.6667,
                longitude: -61
            }, s.MR = {
                latitude: 20,
                longitude: -12
            }, s.MS = {
                latitude: 16.75,
                longitude: -62.2
            }, s.MT = {
                latitude: 35.8333,
                longitude: 14.5833
            }, s.MU = {
                latitude: -20.2833,
                longitude: 57.55
            }, s.MV = {
                latitude: 3.25,
                longitude: 73
            }, s.MW = {
                latitude: -13.5,
                longitude: 34
            }, s.MX = {
                latitude: 23,
                longitude: -102
            }, s.MY = {
                latitude: 2.5,
                longitude: 112.5
            }, s.MZ = {
                latitude: -18.25,
                longitude: 35
            }, s.NA = {
                latitude: -22,
                longitude: 17
            }, s.NC = {
                latitude: -21.5,
                longitude: 165.5
            }, s.NE = {
                latitude: 16,
                longitude: 8
            }, s.NF = {
                latitude: -29.0333,
                longitude: 167.95
            }, s.NG = {
                latitude: 10,
                longitude: 8
            }, s.NI = {
                latitude: 13,
                longitude: -85
            }, s.NL = {
                latitude: 52.5,
                longitude: 5.75
            }, s.NO = {
                latitude: 62,
                longitude: 10
            }, s.NP = {
                latitude: 28,
                longitude: 84
            }, s.NR = {
                latitude: -.5333,
                longitude: 166.9167
            }, s.NU = {
                latitude: -19.0333,
                longitude: -169.8667
            }, s.NZ = {
                latitude: -41,
                longitude: 174
            }, s.OM = {
                latitude: 21,
                longitude: 57
            }, s.PA = {
                latitude: 9,
                longitude: -80
            }, s.PE = {
                latitude: -10,
                longitude: -76
            }, s.PF = {
                latitude: -15,
                longitude: -140
            }, s.PG = {
                latitude: -6,
                longitude: 147
            }, s.PH = {
                latitude: 13,
                longitude: 122
            }, s.PK = {
                latitude: 30,
                longitude: 70
            }, s.PL = {
                latitude: 52,
                longitude: 20
            }, s.PM = {
                latitude: 46.8333,
                longitude: -56.3333
            }, s.PR = {
                latitude: 18.25,
                longitude: -66.5
            }, s.PS = {
                latitude: 32,
                longitude: 35.25
            }, s.PT = {
                latitude: 39.5,
                longitude: -8
            }, s.PW = {
                latitude: 7.5,
                longitude: 134.5
            }, s.PY = {
                latitude: -23,
                longitude: -58
            }, s.QA = {
                latitude: 25.5,
                longitude: 51.25
            }, s.RE = {
                latitude: -21.1,
                longitude: 55.6
            }, s.RO = {
                latitude: 46,
                longitude: 25
            }, s.RS = {
                latitude: 44,
                longitude: 21
            }, s.RU = {
                latitude: 60,
                longitude: 100
            }, s.RW = {
                latitude: -2,
                longitude: 30
            }, s.SA = {
                latitude: 25,
                longitude: 45
            }, s.SB = {
                latitude: -8,
                longitude: 159
            }, s.SC = {
                latitude: -4.5833,
                longitude: 55.6667
            }, s.SD = {
                latitude: 15,
                longitude: 30
            }, s.SE = {
                latitude: 62,
                longitude: 15
            }, s.SG = {
                latitude: 1.3667,
                longitude: 103.8
            }, s.SH = {
                latitude: -15.9333,
                longitude: -5.7
            }, s.SI = {
                latitude: 46,
                longitude: 15
            }, s.SJ = {
                latitude: 78,
                longitude: 20
            }, s.SK = {
                latitude: 48.6667,
                longitude: 19.5
            }, s.SL = {
                latitude: 8.5,
                longitude: -11.5
            }, s.SM = {
                latitude: 43.7667,
                longitude: 12.4167
            }, s.SN = {
                latitude: 14,
                longitude: -14
            }, s.SO = {
                latitude: 10,
                longitude: 49
            }, s.SR = {
                latitude: 4,
                longitude: -56
            }, s.ST = {
                latitude: 1,
                longitude: 7
            }, s.SV = {
                latitude: 13.8333,
                longitude: -88.9167
            }, s.SY = {
                latitude: 35,
                longitude: 38
            }, s.SZ = {
                latitude: -26.5,
                longitude: 31.5
            }, s.TC = {
                latitude: 21.75,
                longitude: -71.5833
            }, s.TD = {
                latitude: 15,
                longitude: 19
            }, s.TF = {
                latitude: -43,
                longitude: 67
            }, s.TG = {
                latitude: 8,
                longitude: 1.1667
            }, s.TH = {
                latitude: 15,
                longitude: 100
            }, s.TJ = {
                latitude: 39,
                longitude: 71
            }, s.TK = {
                latitude: -9,
                longitude: -172
            }, s.TM = {
                latitude: 40,
                longitude: 60
            }, s.TN = {
                latitude: 34,
                longitude: 9
            }, s.TO = {
                latitude: -20,
                longitude: -175
            }, s.TR = {
                latitude: 39,
                longitude: 35
            }, s.TT = {
                latitude: 11,
                longitude: -61
            }, s.TV = {
                latitude: -8,
                longitude: 178
            }, s.TW = {
                latitude: 23.5,
                longitude: 121
            }, s.TZ = {
                latitude: -6,
                longitude: 35
            }, s.UA = {
                latitude: 49,
                longitude: 32
            }, s.UG = {
                latitude: 1,
                longitude: 32
            }, s.UM = {
                latitude: 19.2833,
                longitude: 166.6
            }, s.US = {
                latitude: 38,
                longitude: -97
            }, s.UY = {
                latitude: -33,
                longitude: -56
            }, s.UZ = {
                latitude: 41,
                longitude: 64
            }, s.VA = {
                latitude: 41.9,
                longitude: 12.45
            }, s.VC = {
                latitude: 13.25,
                longitude: -61.2
            }, s.VE = {
                latitude: 8,
                longitude: -66
            }, s.VG = {
                latitude: 18.5,
                longitude: -64.5
            }, s.VI = {
                latitude: 18.3333,
                longitude: -64.8333
            }, s.VN = {
                latitude: 16,
                longitude: 106
            }, s.VU = {
                latitude: -16,
                longitude: 167
            }, s.WF = {
                latitude: -13.3,
                longitude: -176.2
            }, s.WS = {
                latitude: -13.5833,
                longitude: -172.3333
            }, s.YE = {
                latitude: 15,
                longitude: 48
            }, s.YT = {
                latitude: -12.8333,
                longitude: 45.1667
            }, s.ZA = {
                latitude: -29,
                longitude: 24
            }, s.ZM = {
                latitude: -15,
                longitude: 30
            }, s.ZW = {
                latitude: -20,
                longitude: 30
            };
            for (var l, o = [{
                    code: "AF",
                    name: "Afghanistan",
                    value: 32358260,
                    color: i.primaryDark
                }, {
                    code: "AL",
                    name: "Albania",
                    value: 3215988,
                    color: i.warning
                }, {
                    code: "DZ",
                    name: "Algeria",
                    value: 35980193,
                    color: i.danger
                }, {
                    code: "AO",
                    name: "Angola",
                    value: 19618432,
                    color: i.danger
                }, {
                    code: "AR",
                    name: "Argentina",
                    value: 40764561,
                    color: i.success
                }, {
                    code: "AM",
                    name: "Armenia",
                    value: 3100236,
                    color: i.warning
                }, {
                    code: "AU",
                    name: "Australia",
                    value: 22605732,
                    color: i.warningDark
                }, {
                    code: "AT",
                    name: "Austria",
                    value: 8413429,
                    color: i.warning
                }, {
                    code: "AZ",
                    name: "Azerbaijan",
                    value: 9306023,
                    color: i.warning
                }, {
                    code: "BH",
                    name: "Bahrain",
                    value: 1323535,
                    color: i.primaryDark
                }, {
                    code: "BD",
                    name: "Bangladesh",
                    value: 150493658,
                    color: i.primaryDark
                }, {
                    code: "BY",
                    name: "Belarus",
                    value: 9559441,
                    color: i.warning
                }, {
                    code: "BE",
                    name: "Belgium",
                    value: 10754056,
                    color: i.warning
                }, {
                    code: "BJ",
                    name: "Benin",
                    value: 9099922,
                    color: i.danger
                }, {
                    code: "BT",
                    name: "Bhutan",
                    value: 738267,
                    color: i.primaryDark
                }, {
                    code: "BO",
                    name: "Bolivia",
                    value: 10088108,
                    color: i.success
                }, {
                    code: "BA",
                    name: "Bosnia and Herzegovina",
                    value: 3752228,
                    color: i.warning
                }, {
                    code: "BW",
                    name: "Botswana",
                    value: 2030738,
                    color: i.danger
                }, {
                    code: "BR",
                    name: "Brazil",
                    value: 196655014,
                    color: i.success
                }, {
                    code: "BN",
                    name: "Brunei",
                    value: 405938,
                    color: i.primaryDark
                }, {
                    code: "BG",
                    name: "Bulgaria",
                    value: 7446135,
                    color: i.warning
                }, {
                    code: "BF",
                    name: "Burkina Faso",
                    value: 16967845,
                    color: i.danger
                }, {
                    code: "BI",
                    name: "Burundi",
                    value: 8575172,
                    color: i.danger
                }, {
                    code: "KH",
                    name: "Cambodia",
                    value: 14305183,
                    color: i.primaryDark
                }, {
                    code: "CM",
                    name: "Cameroon",
                    value: 20030362,
                    color: i.danger
                }, {
                    code: "CA",
                    name: "Canada",
                    value: 34349561,
                    color: i.primary
                }, {
                    code: "CV",
                    name: "Cape Verde",
                    value: 500585,
                    color: i.danger
                }, {
                    code: "CF",
                    name: "Central African Rep.",
                    value: 4486837,
                    color: i.danger
                }, {
                    code: "TD",
                    name: "Chad",
                    value: 11525496,
                    color: i.danger
                }, {
                    code: "CL",
                    name: "Chile",
                    value: 17269525,
                    color: i.success
                }, {
                    code: "CN",
                    name: "China",
                    value: 1347565324,
                    color: i.primaryDark
                }, {
                    code: "CO",
                    name: "Colombia",
                    value: 46927125,
                    color: i.success
                }, {
                    code: "KM",
                    name: "Comoros",
                    value: 753943,
                    color: i.danger
                }, {
                    code: "CD",
                    name: "Congo, Dem. Rep.",
                    value: 67757577,
                    color: i.danger
                }, {
                    code: "CG",
                    name: "Congo, Rep.",
                    value: 4139748,
                    color: i.danger
                }, {
                    code: "CR",
                    name: "Costa Rica",
                    value: 4726575,
                    color: i.primary
                }, {
                    code: "CI",
                    name: "Cote d'Ivoire",
                    value: 20152894,
                    color: i.danger
                }, {
                    code: "HR",
                    name: "Croatia",
                    value: 4395560,
                    color: i.warning
                }, {
                    code: "CU",
                    name: "Cuba",
                    value: 11253665,
                    color: i.primary
                }, {
                    code: "CY",
                    name: "Cyprus",
                    value: 1116564,
                    color: i.warning
                }, {
                    code: "CZ",
                    name: "Czech Rep.",
                    value: 10534293,
                    color: i.warning
                }, {
                    code: "DK",
                    name: "Denmark",
                    value: 5572594,
                    color: i.warning
                }, {
                    code: "DJ",
                    name: "Djibouti",
                    value: 905564,
                    color: i.danger
                }, {
                    code: "DO",
                    name: "Dominican Rep.",
                    value: 10056181,
                    color: i.primary
                }, {
                    code: "EC",
                    name: "Ecuador",
                    value: 14666055,
                    color: i.success
                }, {
                    code: "EG",
                    name: "Egypt",
                    value: 82536770,
                    color: i.danger
                }, {
                    code: "SV",
                    name: "El Salvador",
                    value: 6227491,
                    color: i.primary
                }, {
                    code: "GQ",
                    name: "Equatorial Guinea",
                    value: 720213,
                    color: i.danger
                }, {
                    code: "ER",
                    name: "Eritrea",
                    value: 5415280,
                    color: i.danger
                }, {
                    code: "EE",
                    name: "Estonia",
                    value: 1340537,
                    color: i.warning
                }, {
                    code: "ET",
                    name: "Ethiopia",
                    value: 84734262,
                    color: i.danger
                }, {
                    code: "FJ",
                    name: "Fiji",
                    value: 868406,
                    color: i.warningDark
                }, {
                    code: "FI",
                    name: "Finland",
                    value: 5384770,
                    color: i.warning
                }, {
                    code: "FR",
                    name: "France",
                    value: 63125894,
                    color: i.warning
                }, {
                    code: "GA",
                    name: "Gabon",
                    value: 1534262,
                    color: i.danger
                }, {
                    code: "GM",
                    name: "Gambia",
                    value: 1776103,
                    color: i.danger
                }, {
                    code: "GE",
                    name: "Georgia",
                    value: 4329026,
                    color: i.warning
                }, {
                    code: "DE",
                    name: "Germany",
                    value: 82162512,
                    color: i.warning
                }, {
                    code: "GH",
                    name: "Ghana",
                    value: 24965816,
                    color: i.danger
                }, {
                    code: "GR",
                    name: "Greece",
                    value: 11390031,
                    color: i.warning
                }, {
                    code: "GT",
                    name: "Guatemala",
                    value: 14757316,
                    color: i.primary
                }, {
                    code: "GN",
                    name: "Guinea",
                    value: 10221808,
                    color: i.danger
                }, {
                    code: "GW",
                    name: "Guinea-Bissau",
                    value: 1547061,
                    color: i.danger
                }, {
                    code: "GY",
                    name: "Guyana",
                    value: 756040,
                    color: i.success
                }, {
                    code: "HT",
                    name: "Haiti",
                    value: 10123787,
                    color: i.primary
                }, {
                    code: "HN",
                    name: "Honduras",
                    value: 7754687,
                    color: i.primary
                }, {
                    code: "HK",
                    name: "Hong Kong, China",
                    value: 7122187,
                    color: i.primaryDark
                }, {
                    code: "HU",
                    name: "Hungary",
                    value: 9966116,
                    color: i.warning
                }, {
                    code: "IS",
                    name: "Iceland",
                    value: 324366,
                    color: i.warning
                }, {
                    code: "IN",
                    name: "India",
                    value: 1241491960,
                    color: i.primaryDark
                }, {
                    code: "ID",
                    name: "Indonesia",
                    value: 242325638,
                    color: i.primaryDark
                }, {
                    code: "IR",
                    name: "Iran",
                    value: 74798599,
                    color: i.primaryDark
                }, {
                    code: "IQ",
                    name: "Iraq",
                    value: 32664942,
                    color: i.primaryDark
                }, {
                    code: "IE",
                    name: "Ireland",
                    value: 4525802,
                    color: i.warning
                }, {
                    code: "IL",
                    name: "Israel",
                    value: 7562194,
                    color: i.primaryDark
                }, {
                    code: "IT",
                    name: "Italy",
                    value: 60788694,
                    color: i.warning
                }, {
                    code: "JM",
                    name: "Jamaica",
                    value: 2751273,
                    color: i.primary
                }, {
                    code: "JP",
                    name: "Japan",
                    value: 126497241,
                    color: i.primaryDark
                }, {
                    code: "JO",
                    name: "Jordan",
                    value: 6330169,
                    color: i.primaryDark
                }, {
                    code: "KZ",
                    name: "Kazakhstan",
                    value: 16206750,
                    color: i.primaryDark
                }, {
                    code: "KE",
                    name: "Kenya",
                    value: 41609728,
                    color: i.danger
                }, {
                    code: "KP",
                    name: "Korea, Dem. Rep.",
                    value: 24451285,
                    color: i.primaryDark
                }, {
                    code: "KR",
                    name: "Korea, Rep.",
                    value: 48391343,
                    color: i.primaryDark
                }, {
                    code: "KW",
                    name: "Kuwait",
                    value: 2818042,
                    color: i.primaryDark
                }, {
                    code: "KG",
                    name: "Kyrgyzstan",
                    value: 5392580,
                    color: i.primaryDark
                }, {
                    code: "LA",
                    name: "Laos",
                    value: 6288037,
                    color: i.primaryDark
                }, {
                    code: "LV",
                    name: "Latvia",
                    value: 2243142,
                    color: i.warning
                }, {
                    code: "LB",
                    name: "Lebanon",
                    value: 4259405,
                    color: i.primaryDark
                }, {
                    code: "LS",
                    name: "Lesotho",
                    value: 2193843,
                    color: i.danger
                }, {
                    code: "LR",
                    name: "Liberia",
                    value: 4128572,
                    color: i.danger
                }, {
                    code: "LY",
                    name: "Libya",
                    value: 6422772,
                    color: i.danger
                }, {
                    code: "LT",
                    name: "Lithuania",
                    value: 3307481,
                    color: i.warning
                }, {
                    code: "LU",
                    name: "Luxembourg",
                    value: 515941,
                    color: i.warning
                }, {
                    code: "MK",
                    name: "Macedonia, FYR",
                    value: 2063893,
                    color: i.warning
                }, {
                    code: "MG",
                    name: "Madagascar",
                    value: 21315135,
                    color: i.danger
                }, {
                    code: "MW",
                    name: "Malawi",
                    value: 15380888,
                    color: i.danger
                }, {
                    code: "MY",
                    name: "Malaysia",
                    value: 28859154,
                    color: i.primaryDark
                }, {
                    code: "ML",
                    name: "Mali",
                    value: 15839538,
                    color: i.danger
                }, {
                    code: "MR",
                    name: "Mauritania",
                    value: 3541540,
                    color: i.danger
                }, {
                    code: "MU",
                    name: "Mauritius",
                    value: 1306593,
                    color: i.danger
                }, {
                    code: "MX",
                    name: "Mexico",
                    value: 114793341,
                    color: i.primary
                }, {
                    code: "MD",
                    name: "Moldova",
                    value: 3544864,
                    color: i.warning
                }, {
                    code: "MN",
                    name: "Mongolia",
                    value: 2800114,
                    color: i.primaryDark
                }, {
                    code: "ME",
                    name: "Montenegro",
                    value: 632261,
                    color: i.warning
                }, {
                    code: "MA",
                    name: "Morocco",
                    value: 32272974,
                    color: i.danger
                }, {
                    code: "MZ",
                    name: "Mozambique",
                    value: 23929708,
                    color: i.danger
                }, {
                    code: "MM",
                    name: "Myanmar",
                    value: 48336763,
                    color: i.primaryDark
                }, {
                    code: "NA",
                    name: "Namibia",
                    value: 2324004,
                    color: i.danger
                }, {
                    code: "NP",
                    name: "Nepal",
                    value: 30485798,
                    color: i.primaryDark
                }, {
                    code: "NL",
                    name: "Netherlands",
                    value: 16664746,
                    color: i.warning
                }, {
                    code: "NZ",
                    name: "New Zealand",
                    value: 4414509,
                    color: i.warningDark
                }, {
                    code: "NI",
                    name: "Nicaragua",
                    value: 5869859,
                    color: i.primary
                }, {
                    code: "NE",
                    name: "Niger",
                    value: 16068994,
                    color: i.danger
                }, {
                    code: "NG",
                    name: "Nigeria",
                    value: 162470737,
                    color: i.danger
                }, {
                    code: "NO",
                    name: "Norway",
                    value: 4924848,
                    color: i.warning
                }, {
                    code: "OM",
                    name: "Oman",
                    value: 2846145,
                    color: i.primaryDark
                }, {
                    code: "PK",
                    name: "Pakistan",
                    value: 176745364,
                    color: i.primaryDark
                }, {
                    code: "PA",
                    name: "Panama",
                    value: 3571185,
                    color: i.primary
                }, {
                    code: "PG",
                    name: "Papua New Guinea",
                    value: 7013829,
                    color: i.warningDark
                }, {
                    code: "PY",
                    name: "Paraguay",
                    value: 6568290,
                    color: i.success
                }, {
                    code: "PE",
                    name: "Peru",
                    value: 29399817,
                    color: i.success
                }, {
                    code: "PH",
                    name: "Philippines",
                    value: 94852030,
                    color: i.primaryDark
                }, {
                    code: "PL",
                    name: "Poland",
                    value: 38298949,
                    color: i.warning
                }, {
                    code: "PT",
                    name: "Portugal",
                    value: 10689663,
                    color: i.warning
                }, {
                    code: "PR",
                    name: "Puerto Rico",
                    value: 3745526,
                    color: i.primary
                }, {
                    code: "QA",
                    name: "Qatar",
                    value: 1870041,
                    color: i.primaryDark
                }, {
                    code: "RO",
                    name: "Romania",
                    value: 21436495,
                    color: i.warning
                }, {
                    code: "RU",
                    name: "Russia",
                    value: 142835555,
                    color: i.warning
                }, {
                    code: "RW",
                    name: "Rwanda",
                    value: 10942950,
                    color: i.danger
                }, {
                    code: "SA",
                    name: "Saudi Arabia",
                    value: 28082541,
                    color: i.primaryDark
                }, {
                    code: "SN",
                    name: "Senegal",
                    value: 12767556,
                    color: i.danger
                }, {
                    code: "RS",
                    name: "Serbia",
                    value: 9853969,
                    color: i.warning
                }, {
                    code: "SL",
                    name: "Sierra Leone",
                    value: 5997486,
                    color: i.danger
                }, {
                    code: "SG",
                    name: "Singapore",
                    value: 5187933,
                    color: i.primaryDark
                }, {
                    code: "SK",
                    name: "Slovak Republic",
                    value: 5471502,
                    color: i.warning
                }, {
                    code: "SI",
                    name: "Slovenia",
                    value: 2035012,
                    color: i.warning
                }, {
                    code: "SB",
                    name: "Solomon Islands",
                    value: 552267,
                    color: i.warningDark
                }, {
                    code: "SO",
                    name: "Somalia",
                    value: 9556873,
                    color: i.danger
                }, {
                    code: "ZA",
                    name: "South Africa",
                    value: 50459978,
                    color: i.danger
                }, {
                    code: "ES",
                    name: "Spain",
                    value: 46454895,
                    color: i.warning
                }, {
                    code: "LK",
                    name: "Sri Lanka",
                    value: 21045394,
                    color: i.primaryDark
                }, {
                    code: "SD",
                    name: "Sudan",
                    value: 34735288,
                    color: i.danger
                }, {
                    code: "SR",
                    name: "Suriname",
                    value: 529419,
                    color: i.success
                }, {
                    code: "SZ",
                    name: "Swaziland",
                    value: 1203330,
                    color: i.danger
                }, {
                    code: "SE",
                    name: "Sweden",
                    value: 9440747,
                    color: i.warning
                }, {
                    code: "CH",
                    name: "Switzerland",
                    value: 7701690,
                    color: i.warning
                }, {
                    code: "SY",
                    name: "Syria",
                    value: 20766037,
                    color: i.primaryDark
                }, {
                    code: "TW",
                    name: "Taiwan",
                    value: 23072e3,
                    color: i.primaryDark
                }, {
                    code: "TJ",
                    name: "Tajikistan",
                    value: 6976958,
                    color: i.primaryDark
                }, {
                    code: "TZ",
                    name: "Tanzania",
                    value: 46218486,
                    color: i.danger
                }, {
                    code: "TH",
                    name: "Thailand",
                    value: 69518555,
                    color: i.primaryDark
                }, {
                    code: "TG",
                    name: "Togo",
                    value: 6154813,
                    color: i.danger
                }, {
                    code: "TT",
                    name: "Trinidad and Tobago",
                    value: 1346350,
                    color: i.primary
                }, {
                    code: "TN",
                    name: "Tunisia",
                    value: 10594057,
                    color: i.danger
                }, {
                    code: "TR",
                    name: "Turkey",
                    value: 73639596,
                    color: i.warning
                }, {
                    code: "TM",
                    name: "Turkmenistan",
                    value: 5105301,
                    color: i.primaryDark
                }, {
                    code: "UG",
                    name: "Uganda",
                    value: 34509205,
                    color: i.danger
                }, {
                    code: "UA",
                    name: "Ukraine",
                    value: 45190180,
                    color: i.warning
                }, {
                    code: "AE",
                    name: "United Arab Emirates",
                    value: 7890924,
                    color: i.primaryDark
                }, {
                    code: "GB",
                    name: "United Kingdom",
                    value: 62417431,
                    color: i.warning
                }, {
                    code: "US",
                    name: "United States",
                    value: 313085380,
                    color: i.primary
                }, {
                    code: "UY",
                    name: "Uruguay",
                    value: 3380008,
                    color: i.success
                }, {
                    code: "UZ",
                    name: "Uzbekistan",
                    value: 27760267,
                    color: i.primaryDark
                }, {
                    code: "VE",
                    name: "Venezuela",
                    value: 29436891,
                    color: i.success
                }, {
                    code: "PS",
                    name: "West Bank and Gaza",
                    value: 4152369,
                    color: i.primaryDark
                }, {
                    code: "VN",
                    name: "Vietnam",
                    value: 88791996,
                    color: i.primaryDark
                }, {
                    code: "YE",
                    name: "Yemen, Rep.",
                    value: 24799880,
                    color: i.primaryDark
                }, {
                    code: "ZM",
                    name: "Zambia",
                    value: 13474959,
                    color: i.danger
                }, {
                    code: "ZW",
                    name: "Zimbabwe",
                    value: 12754378,
                    color: i.danger
                }], n = 3, r = 70, d = 1 / 0, c = -(1 / 0), u = 0; u < o.length; u++) {
                var p = o[u].value;
                d > p && (d = p), p > c && (c = p)
            }
            AmCharts.theme = AmCharts.themes.blur, l = new AmCharts.AmMap, l.addTitle("Population of the World in 2011", 14), l.addTitle("source: Gapminder", 11), l.areasSettings = {
                unlistedAreasColor: "#000000",
                unlistedAreasAlpha: .1
            }, l.imagesSettings.balloonText = '<span style="font-size:14px;"><b>[[title]]</b>: [[value]]</span>', l.pathToImages = t.images.amMap;
            for (var m = {
                    mapVar: AmCharts.maps.worldLow,
                    images: []
                }, g = r * r * 2 * Math.PI, b = n * n * 2 * Math.PI, u = 0; u < o.length; u++) {
                var v = o[u],
                    p = v.value,
                    h = (p - d) / (c - d) * (g - b) + b;
                b > h && (h = b);
                var f = Math.sqrt(h / (2 * Math.PI)),
                    w = v.code;
                m.images.push({
                    type: "circle",
                    width: f,
                    height: f,
                    color: v.color,
                    longitude: s[w].longitude,
                    latitude: s[w].latitude,
                    title: v.name,
                    value: p
                })
            }
            l.dataProvider = m, l["export"] = {
                enabled: !0
            }, a(function() {
                l.write("map-bubbles")
            }, 100)
        }
        e.$inject = ["baConfig", "$timeout", "layoutPaths"], angular.module("BlurAdmin.pages.maps")
            .controller("MapBubblePageCtrl", e)
    }(),
    function() {
        "use strict";

        function e(e, a, t) {
            var i = e.colors,
                s = "M9,0C4.029,0,0,4.029,0,9s4.029,9,9,9s9-4.029,9-9S13.971,0,9,0z M9,15.93 c-3.83,0-6.93-3.1-6.93-6.93S5.17,2.07,9,2.07s6.93,3.1,6.93,6.93S12.83,15.93,9,15.93 M12.5,9c0,1.933-1.567,3.5-3.5,3.5S5.5,10.933,5.5,9S7.067,5.5,9,5.5 S12.5,7.067,12.5,9z",
                l = "M19.671,8.11l-2.777,2.777l-3.837-0.861c0.362-0.505,0.916-1.683,0.464-2.135c-0.518-0.517-1.979,0.278-2.305,0.604l-0.913,0.913L7.614,8.804l-2.021,2.021l2.232,1.061l-0.082,0.082l1.701,1.701l0.688-0.687l3.164,1.504L9.571,18.21H6.413l-1.137,1.138l3.6,0.948l1.83,1.83l0.947,3.598l1.137-1.137V21.43l3.725-3.725l1.504,3.164l-0.687,0.687l1.702,1.701l0.081-0.081l1.062,2.231l2.02-2.02l-0.604-2.689l0.912-0.912c0.326-0.326,1.121-1.789,0.604-2.306c-0.452-0.452-1.63,0.101-2.135,0.464l-0.861-3.838l2.777-2.777c0.947-0.947,3.599-4.862,2.62-5.839C24.533,4.512,20.618,7.163,19.671,8.11z";
            a(function() {
                AmCharts.makeChart("map-lines", {
                    type: "map",
                    theme: "blur",
                    dataProvider: {
                        map: "worldLow",
                        linkToObject: "london",
                        images: [{
                            id: "london",
                            svgPath: s,
                            title: "London",
                            latitude: 51.5002,
                            longitude: -.1262,
                            scale: 1.5,
                            zoomLevel: 2.74,
                            zoomLongitude: -20.1341,
                            zoomLatitude: 49.1712,
                            lines: [{
                                latitudes: [51.5002, 50.4422],
                                longitudes: [-.1262, 30.5367]
                            }, {
                                latitudes: [51.5002, 46.948],
                                longitudes: [-.1262, 7.4481]
                            }, {
                                latitudes: [51.5002, 59.3328],
                                longitudes: [-.1262, 18.0645]
                            }, {
                                latitudes: [51.5002, 40.4167],
                                longitudes: [-.1262, -3.7033]
                            }, {
                                latitudes: [51.5002, 46.0514],
                                longitudes: [-.1262, 14.506]
                            }, {
                                latitudes: [51.5002, 48.2116],
                                longitudes: [-.1262, 17.1547]
                            }, {
                                latitudes: [51.5002, 44.8048],
                                longitudes: [-.1262, 20.4781]
                            }, {
                                latitudes: [51.5002, 55.7558],
                                longitudes: [-.1262, 37.6176]
                            }, {
                                latitudes: [51.5002, 38.7072],
                                longitudes: [-.1262, -9.1355]
                            }, {
                                latitudes: [51.5002, 54.6896],
                                longitudes: [-.1262, 25.2799]
                            }, {
                                latitudes: [51.5002, 64.1353],
                                longitudes: [-.1262, -21.8952]
                            }, {
                                latitudes: [51.5002, 40.43],
                                longitudes: [-.1262, -74]
                            }],
                            images: [{
                                label: "Flights from London",
                                svgPath: l,
                                left: 100,
                                top: 45,
                                labelShiftY: 5,
                                labelShiftX: 5,
                                color: i.defaultText,
                                labelColor: i.defaultText,
                                labelRollOverColor: i.defaultText,
                                labelFontSize: 20
                            }, {
                                label: "show flights from Vilnius",
                                left: 106,
                                top: 70,
                                labelColor: i.defaultText,
                                labelRollOverColor: i.defaultText,
                                labelFontSize: 11,
                                linkToObject: "vilnius"
                            }]
                        }, {
                            id: "vilnius",
                            svgPath: s,
                            title: "Vilnius",
                            latitude: 54.6896,
                            longitude: 25.2799,
                            scale: 1.5,
                            zoomLevel: 4.92,
                            zoomLongitude: 15.4492,
                            zoomLatitude: 50.2631,
                            lines: [{
                                latitudes: [54.6896, 50.8371],
                                longitudes: [25.2799, 4.3676]
                            }, {
                                latitudes: [54.6896, 59.9138],
                                longitudes: [25.2799, 10.7387]
                            }, {
                                latitudes: [54.6896, 40.4167],
                                longitudes: [25.2799, -3.7033]
                            }, {
                                latitudes: [54.6896, 50.0878],
                                longitudes: [25.2799, 14.4205]
                            }, {
                                latitudes: [54.6896, 48.2116],
                                longitudes: [25.2799, 17.1547]
                            }, {
                                latitudes: [54.6896, 44.8048],
                                longitudes: [25.2799, 20.4781]
                            }, {
                                latitudes: [54.6896, 55.7558],
                                longitudes: [25.2799, 37.6176]
                            }, {
                                latitudes: [54.6896, 37.9792],
                                longitudes: [25.2799, 23.7166]
                            }, {
                                latitudes: [54.6896, 54.6896],
                                longitudes: [25.2799, 25.2799]
                            }, {
                                latitudes: [54.6896, 51.5002],
                                longitudes: [25.2799, -.1262]
                            }, {
                                latitudes: [54.6896, 53.3441],
                                longitudes: [25.2799, -6.2675]
                            }],
                            images: [{
                                label: "Flights from Vilnius",
                                svgPath: l,
                                left: 100,
                                top: 45,
                                labelShiftY: 5,
                                labelShiftX: 5,
                                color: i.defaultText,
                                labelColor: i.defaultText,
                                labelRollOverColor: i.defaultText,
                                labelFontSize: 20
                            }, {
                                label: "show flights from London",
                                left: 106,
                                top: 70,
                                labelColor: i.defaultText,
                                labelRollOverColor: i.defaultText,
                                labelFontSize: 11,
                                linkToObject: "london"
                            }]
                        }, {
                            svgPath: s,
                            title: "Brussels",
                            latitude: 50.8371,
                            longitude: 4.3676
                        }, {
                            svgPath: s,
                            title: "Prague",
                            latitude: 50.0878,
                            longitude: 14.4205
                        }, {
                            svgPath: s,
                            title: "Athens",
                            latitude: 37.9792,
                            longitude: 23.7166
                        }, {
                            svgPath: s,
                            title: "Reykjavik",
                            latitude: 64.1353,
                            longitude: -21.8952
                        }, {
                            svgPath: s,
                            title: "Dublin",
                            latitude: 53.3441,
                            longitude: -6.2675
                        }, {
                            svgPath: s,
                            title: "Oslo",
                            latitude: 59.9138,
                            longitude: 10.7387
                        }, {
                            svgPath: s,
                            title: "Lisbon",
                            latitude: 38.7072,
                            longitude: -9.1355
                        }, {
                            svgPath: s,
                            title: "Moscow",
                            latitude: 55.7558,
                            longitude: 37.6176
                        }, {
                            svgPath: s,
                            title: "Belgrade",
                            latitude: 44.8048,
                            longitude: 20.4781
                        }, {
                            svgPath: s,
                            title: "Bratislava",
                            latitude: 48.2116,
                            longitude: 17.1547
                        }, {
                            svgPath: s,
                            title: "Ljubljana",
                            latitude: 46.0514,
                            longitude: 14.506
                        }, {
                            svgPath: s,
                            title: "Madrid",
                            latitude: 40.4167,
                            longitude: -3.7033
                        }, {
                            svgPath: s,
                            title: "Stockholm",
                            latitude: 59.3328,
                            longitude: 18.0645
                        }, {
                            svgPath: s,
                            title: "Bern",
                            latitude: 46.948,
                            longitude: 7.4481
                        }, {
                            svgPath: s,
                            title: "Kiev",
                            latitude: 50.4422,
                            longitude: 30.5367
                        }, {
                            svgPath: s,
                            title: "Paris",
                            latitude: 48.8567,
                            longitude: 2.351
                        }, {
                            svgPath: s,
                            title: "New York",
                            latitude: 40.43,
                            longitude: -74
                        }]
                    },
                    areasSettings: {
                        unlistedAreasColor: i.info
                    },
                    imagesSettings: {
                        color: i.warningLight,
                        selectedColor: i.warning
                    },
                    linesSettings: {
                        color: i.warningLight,
                        alpha: .8
                    },
                    backgroundZoomsToTop: !0,
                    linesAboveImages: !0,
                    "export": {
                        enabled: !0
                    },
                    pathToImages: t.images.amMap
                })
            }, 100)
        }
        e.$inject = ["baConfig", "$timeout", "layoutPaths"], angular.module("BlurAdmin.pages.maps")
            .controller("MapLinesPageCtrl", e)
    }(),
    function() {
        "use strict";

        function e(e, a) {
            e.progressFunction = function() {
                return a(function() {}, 3e3)
            }
        }
        e.$inject = ["$scope", "$timeout"], angular.module("BlurAdmin.pages.ui.buttons")
            .controller("ButtonPageCtrl", e)
    }(),
    function() {
        "use strict";

        function e(e) {
            e.icons = {
                kameleonIcons: [{
                    name: "Beach",
                    img: "Beach"
                }, {
                    name: "Bus",
                    img: "Bus"
                }, {
                    name: "Cheese",
                    img: "Cheese"
                }, {
                    name: "Desert",
                    img: "Desert"
                }, {
                    name: "Images",
                    img: "Images"
                }, {
                    name: "Magician",
                    img: "Magician"
                }, {
                    name: "Makeup",
                    img: "Makeup"
                }, {
                    name: "Programming",
                    img: "Programming"
                }, {
                    name: "Shop",
                    img: "Shop"
                }, {
                    name: "Surfer",
                    img: "Surfer"
                }, {
                    name: "Phone Booth",
                    img: "Phone-Booth"
                }, {
                    name: "Ninja",
                    img: "Ninja"
                }, {
                    name: "Apartment",
                    img: "Apartment"
                }, {
                    name: "Batman",
                    img: "Batman"
                }, {
                    name: "Medal",
                    img: "Medal-2"
                }, {
                    name: "Money",
                    img: "Money-Increase"
                }, {
                    name: "Street View",
                    img: "Street-View"
                }, {
                    name: "Student",
                    img: "Student-3"
                }, {
                    name: "Bell",
                    img: "Bell"
                }, {
                    name: "Woman",
                    img: "Boss-5"
                }, {
                    name: "Euro",
                    img: "Euro-Coin"
                }, {
                    name: "Chessboard",
                    img: "Chessboard"
                }, {
                    name: "Burglar",
                    img: "Burglar"
                }, {
                    name: "Dna",
                    img: "Dna"
                }, {
                    name: "Clipboard Plan",
                    img: "Clipboard-Plan"
                }, {
                    name: "Boss",
                    img: "Boss-3"
                }, {
                    name: "Key",
                    img: "Key"
                }, {
                    name: "Surgeon",
                    img: "Surgeon"
                }, {
                    name: "Hacker",
                    img: "Hacker"
                }, {
                    name: "Santa",
                    img: "Santa"
                }],
                kameleonRoundedIcons: [{
                    color: "success",
                    img: "Apartment",
                    name: "Apartment"
                }, {
                    color: "warning",
                    img: "Bus",
                    name: "Bus"
                }, {
                    color: "primary",
                    img: "Checklist",
                    name: "Checklist"
                }, {
                    color: "warning",
                    img: "Desert",
                    name: "Desert"
                }, {
                    color: "danger",
                    img: "Laptop-Signal",
                    name: "Laptop Signal"
                }, {
                    color: "info",
                    img: "Love-Letter",
                    name: "Love Letter"
                }, {
                    color: "success",
                    img: "Makeup",
                    name: "Makeup"
                }, {
                    color: "primary",
                    img: "Santa",
                    name: "Santa"
                }, {
                    color: "success",
                    img: "Surfer",
                    name: "Surfer"
                }, {
                    color: "info",
                    img: "Vector",
                    name: "Vector"
                }, {
                    color: "warning",
                    img: "Money-Increase",
                    name: "Money Increase"
                }, {
                    color: "info",
                    img: "Alien",
                    name: "Alien"
                }, {
                    color: "danger",
                    img: "Online-Shopping",
                    name: "Online Shopping"
                }, {
                    color: "warning",
                    img: "Euro-Coin",
                    name: "Euro"
                }, {
                    color: "info",
                    img: "Boss-3",
                    name: "Boss"
                }],
                ionicons: ["ion-ionic", "ion-arrow-right-b", "ion-arrow-down-b", "ion-arrow-left-b", "ion-arrow-up-c", "ion-arrow-right-c", "ion-arrow-down-c", "ion-arrow-left-c", "ion-arrow-return-right", "ion-arrow-return-left", "ion-arrow-swap", "ion-arrow-shrink", "ion-arrow-expand", "ion-arrow-move", "ion-arrow-resize", "ion-chevron-up", "ion-chevron-right", "ion-chevron-down", "ion-chevron-left", "ion-navicon-round", "ion-navicon", "ion-drag", "ion-log-in", "ion-log-out", "ion-checkmark-round", "ion-checkmark", "ion-checkmark-circled", "ion-close-round", "ion-plus-round", "ion-minus-round", "ion-information", "ion-help", "ion-backspace-outline", "ion-help-buoy", "ion-asterisk", "ion-alert", "ion-alert-circled", "ion-refresh", "ion-loop", "ion-shuffle", "ion-home", "ion-search", "ion-flag", "ion-star", "ion-heart", "ion-heart-broken", "ion-gear-a", "ion-gear-b", "ion-toggle-filled", "ion-toggle", "ion-settings", "ion-wrench", "ion-hammer", "ion-edit", "ion-trash-a", "ion-trash-b", "ion-document", "ion-document-text", "ion-clipboard", "ion-scissors", "ion-funnel", "ion-bookmark", "ion-email", "ion-email-unread", "ion-folder", "ion-filing", "ion-archive", "ion-reply", "ion-reply-all", "ion-forward"],
                fontAwesomeIcons: ["fa fa-adjust", "fa fa-anchor", "fa fa-archive", "fa fa-area-chart", "fa fa-arrows", "fa fa-arrows-h", "fa fa-arrows-v", "fa fa-asterisk", "fa fa-at", "fa fa-automobile", "fa fa-ban", "fa fa-bank", "fa fa-bar-chart", "fa fa-bar-chart-o", "fa fa-barcode", "fa fa-bars", "fa fa-bed", "fa fa-beer", "fa fa-bell", "fa fa-bell-o", "fa fa-bell-slash", "fa fa-bell-slash-o", "fa fa-bicycle", "fa fa-binoculars", "fa fa-birthday-cake", "fa fa-bolt", "fa fa-bomb", "fa fa-book", "fa fa-bookmark", "fa fa-bookmark-o", "fa fa-briefcase", "fa fa-bug", "fa fa-building", "fa fa-building-o", "fa fa-bullhorn"],
                socicon: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", ",", ";", ":", "+", "@", "=", "-", "^", "?", "$", "*", "&", "(", "#", ".", "_", "]", ")", "'", '"', "}", "{"]
            }
        }
        e.$inject = ["$scope"], angular.module("BlurAdmin.pages.ui.icons")
            .controller("IconsPageCtrl", e)
    }(),
    function() {
        "use strict";

        function e(e, a) {
            e.open = function(t, i) {
                a.open({
                    animation: !0,
                    templateUrl: t,
                    size: i,
                    resolve: {
                        items: function() {
                            return e.items
                        }
                    }
                })
            }
        }
        e.$inject = ["$scope", "$uibModal"], angular.module("BlurAdmin.pages.ui.notifications")
            .controller("ModalsPageCtrl", e)
    }(),
    function() {
        "use strict";

        function e(e, a, t) {
            var i = angular.copy(t);
            e.types = ["success", "error", "info", "warning"], e.quotes = [{
                title: "Come to Freenode",
                message: "We rock at <em>#angularjs</em>",
                options: {
                    allowHtml: !0
                }
            }, {
                title: "Looking for bootstrap?",
                message: "Try ui-bootstrap out!"
            }, {
                title: "Wants a better router?",
                message: "We have you covered with ui-router"
            }, {
                title: "Angular 2",
                message: "Is gonna rock the world"
            }, {
                title: null,
                message: "Titles are not always needed"
            }, {
                title: null,
                message: "Toastr rock!"
            }, {
                title: "What about nice html?",
                message: "<strong>Sure you <em>can!</em></strong>",
                options: {
                    allowHtml: !0
                }
            }, {
                title: "Ionic is <em>cool</em>",
                message: "Best mobile framework ever",
                options: {
                    allowHtml: !0
                }
            }];
            var s = [];
            e.options = {
                autoDismiss: !1,
                positionClass: "toast-top-right",
                type: "info",
                timeOut: "5000",
                extendedTimeOut: "2000",
                allowHtml: !1,
                closeButton: !1,
                tapToDismiss: !0,
                progressBar: !1,
                newestOnTop: !0,
                maxOpened: 0,
                preventDuplicates: !1,
                preventOpenDuplicates: !1,
                title: "Some title here",
                msg: "Type your message here"
            }, e.clearLastToast = function() {
                var e = s.pop();
                a.clear(e)
            }, e.clearToasts = function() {
                a.clear()
            }, e.openRandomToast = function() {
                var t = Math.floor(Math.random() * e.types.length),
                    i = Math.floor(Math.random() * e.quotes.length),
                    l = e.types[t],
                    o = e.quotes[i];
                s.push(a[l](o.message, o.title, o.options)), e.optionsStr = "toastr." + l + "('" + o.message + "', '" + o.title + "', " + JSON.stringify(o.options || {}, null, 2) + ")"
            }, e.openToast = function() {
                angular.extend(t, e.options), s.push(a[e.options.type](e.options.msg, e.options.title));
                var i = {};
                for (var l in e.options) "msg" != l && "title" != l && (i[l] = e.options[l]);
                e.optionsStr = "toastr." + e.options.type + "('" + e.options.msg + "', '" + e.options.title + "', " + JSON.stringify(i, null, 2) + ")"
            }, e.$on("$destroy", function() {
                angular.extend(t, i)
            })
        }
        e.$inject = ["$scope", "toastr", "toastrConfig"], angular.module("BlurAdmin.pages.ui.notifications")
            .controller("NotificationsPageCtrl", e)
    }(),
    function() {
        "use strict";

        function e(e, a) {
            return angular.extend({}, e, {
                template: function(t, i) {
                    var s = '<div  class="panel ' + (a.theme.blur ? "panel-blur" : "") + " full-invisible " + (i.baPanelClass || "");
                    return s += '" zoom-in ' + (a.theme.blur ? "ba-panel-blur" : "") + ">", s += e.template(t, i), s += "</div>"
                }
            })
        }
        e.$inject = ["baPanel", "baConfig"], angular.module("BlurAdmin.theme")
            .directive("baPanel", e)
    }(),
    function() {
        "use strict";

        function e() {
            return {
                restrict: "A",
                transclude: !0,
                template: function(e, a) {
                    var t = '<div class="panel-body" ng-transclude></div>';
                    if (a.baPanelTitle) {
                        var i = '<div class="panel-heading clearfix"><h3 class="panel-title">' + a.baPanelTitle + "</h3></div>";
                        t = i + t
                    }
                    return t
                }
            }
        }
        angular.module("BlurAdmin.theme")
            .factory("baPanel", e)
    }(),
    function() {
        "use strict";

        function e(e, a, t) {
            var i;
            return e.bodyBgLoad()
                .then(function() {
                    i = e.getBodyBgImageSizes()
                }), a.addEventListener("resize", function() {
                    i = e.getBodyBgImageSizes()
                }), {
                    restrict: "A",
                    link: function(s, l) {
                        function o() {
                            i && l.css({
                                backgroundSize: Math.round(i.width) + "px " + Math.round(i.height) + "px",
                                backgroundPosition: Math.floor(i.positionX) + "px " + Math.floor(i.positionY) + "px"
                            })
                        }
                        t.$isMobile || (e.bodyBgLoad()
                            .then(function() {
                                setTimeout(o)
                            }), a.addEventListener("resize", o), s.$on("$destroy", function() {
                                a.removeEventListener("resize", o)
                            }))
                    }
                }
        }
        e.$inject = ["baPanelBlurHelper", "$window", "$rootScope"], angular.module("BlurAdmin.theme")
            .directive("baPanelBlur", e)
    }(),
    function() {
        "use strict";

        function e(e) {
            var a = e.defer(),
                t = getComputedStyle(document.body, ":before"),
                i = new Image;
            i.src = t.backgroundImage.replace(/url\((['"])?(.*?)\1\)/gi, "$2"), i.onerror = function() {
                a.reject()
            }, i.onload = function() {
                a.resolve()
            }, this.bodyBgLoad = function() {
                return a.promise
            }, this.getBodyBgImageSizes = function() {
                var e = document.documentElement.clientWidth,
                    a = document.documentElement.clientHeight;
                if (!(640 >= e)) {
                    var t, s, l = i.height / i.width,
                        o = a / e;
                    return o > l ? (t = a, s = a / l) : (s = e, t = e * l), {
                        width: s,
                        height: t,
                        positionX: (e - s) / 2,
                        positionY: (a - t) / 2
                    }
                }
            }
        }
        e.$inject = ["$q"], angular.module("BlurAdmin.theme")
            .service("baPanelBlurHelper", e)
    }(),
    function() {
        "use strict";

        function e(e) {
            return angular.extend({}, e, {
                link: function(e, a, t) {
                    a.addClass("panel panel-white"), t.baPanelClass && a.addClass(t.baPanelClass)
                }
            })
        }
        e.$inject = ["baPanel"], angular.module("BlurAdmin.theme")
            .directive("baPanelSelf", e)
    }(),
    function() {
        "use strict";

        function e(e, a) {
            e.menuItems = a.getMenuItems(), e.defaultSidebarState = e.menuItems[0].stateRef, e.hoverItem = function(a) {
                e.showHoverElem = !0, e.hoverElemHeight = a.currentTarget.clientHeight;
                var t = 66;
                e.hoverElemTop = a.currentTarget.getBoundingClientRect()
                    .top - t
            }, e.$on("$stateChangeSuccess", function() {
                a.canSidebarBeHidden() && a.setMenuCollapsed(!0)
            })
        }
        e.$inject = ["$scope", "baSidebarService"], angular.module("BlurAdmin.theme.components")
            .controller("BaSidebarCtrl", e)
    }(),
    function() {
        "use strict";

        function e(e, a, t, i) {
            var s = $(window);
            return {
                restrict: "E",
                templateUrl: "app/theme/components/baSidebar/ba-sidebar.html",
                controller: "BaSidebarCtrl",
                link: function(i, l) {
                    function o(i) {
                        t.isDescendant(l[0], i.target) || i.originalEvent.$sidebarEventProcessed || a.isMenuCollapsed() || !a.canSidebarBeHidden() || (i.originalEvent.$sidebarEventProcessed = !0, e(function() {
                            a.setMenuCollapsed(!0)
                        }, 10))
                    }

                    function n() {
                        var e = a.shouldMenuBeCollapsed(),
                            t = r();
                        (e != a.isMenuCollapsed() || i.menuHeight != t) && i.$apply(function() {
                            i.menuHeight = t, a.setMenuCollapsed(e)
                        })
                    }

                    function r() {
                        return l[0].childNodes[0].clientHeight - 84
                    }
                    i.menuHeight = l[0].childNodes[0].clientHeight - 84, s.on("click", o), s.on("resize", n), i.$on("$destroy", function() {
                        s.off("click", o), s.off("resize", n)
                    })
                }
            }
        }
        e.$inject = ["$timeout", "baSidebarService", "baUtil", "layoutSizes"], angular.module("BlurAdmin.theme.components")
            .directive("baSidebar", e)
    }(),
    function() {
        "use strict";

        function e() {
            var e = [];
            this.addStaticItem = function() {
                e.push.apply(e, arguments)
            }, this.$get = ["$state", "layoutSizes", function(a, t) {
                function i() {
                    function i() {
                        return a.get()
                            .filter(function(e) {
                                return e.sidebarMeta
                            })
                            .map(function(e) {
                                var a = e.sidebarMeta;
                                return {
                                    name: e.name,
                                    title: e.title,
                                    level: (e.name.match(/\./g) || [])
                                        .length,
                                    order: a.order,
                                    icon: a.icon,
                                    stateRef: e.name
                                }
                            })
                            .sort(function(e, a) {
                                return 100 * (e.level - a.level) + e.order - a.order
                            })
                    }

                    function s() {
                        return window.innerWidth <= t.resWidthCollapseSidebar
                    }

                    function l() {
                        return window.innerWidth <= t.resWidthHideSidebar
                    }
                    var o = s();
                    this.getMenuItems = function() {
                        var a = i(),
                            t = a.filter(function(e) {
                                return 0 == e.level
                            });
                        return t.forEach(function(e) {
                            var t = a.filter(function(a) {
                                return 1 == a.level && 0 === a.name.indexOf(e.name)
                            });
                            e.subMenu = t.length ? t : null
                        }), t.concat(e)
                    }, this.shouldMenuBeCollapsed = s, this.canSidebarBeHidden = l, this.setMenuCollapsed = function(e) {
                        o = e
                    }, this.isMenuCollapsed = function() {
                        return o
                    }, this.toggleMenuCollapsed = function() {
                        o = !o
                    }, this.getAllStateRefsRecursive = function(e) {
                        function a(e) {
                            e.subMenu && e.subMenu.forEach(function(e) {
                                e.stateRef && t.push(e.stateRef), a(e)
                            })
                        }
                        var t = [];
                        return a(e), t
                    }
                }
                return new i
            }], this.$get.$inject = ["$state", "layoutSizes"]
        }
        angular.module("BlurAdmin.theme.components")
            .provider("baSidebarService", e)
    }(),
    function() {
        "use strict";

        function e(e) {
            return {
                restrict: "A",
                link: function(a, t) {
                    t.on("click", function(t) {
                        t.originalEvent.$sidebarEventProcessed = !0, a.$apply(function() {
                            e.toggleMenuCollapsed()
                        })
                    })
                }
            }
        }

        function a(e) {
            return {
                restrict: "A",
                link: function(a, t) {
                    t.on("click", function(t) {
                        t.originalEvent.$sidebarEventProcessed = !0, e.isMenuCollapsed() || a.$apply(function() {
                            e.setMenuCollapsed(!0)
                        })
                    })
                }
            }
        }

        function t() {
            return {
                restrict: "A",
                controller: "BaSidebarTogglingItemCtrl"
            }
        }

        function i(e, a, t, i, s) {
            function l(e) {
                return e && r.some(function(a) {
                    return 0 == e.name.indexOf(a)
                })
            }
            var o = this,
                n = o.$$menuItem = e.$eval(t.baSidebarTogglingItem);
            if (n && n.subMenu && n.subMenu.length) {
                o.$$expandSubmenu = function() {
                    console.warn("$$expandMenu should be overwritten by baUiSrefTogglingSubmenu")
                }, o.$$collapseSubmenu = function() {
                    console.warn("$$collapseSubmenu should be overwritten by baUiSrefTogglingSubmenu")
                };
                var r = s.getAllStateRefsRecursive(n);
                o.$expand = function() {
                    o.$$expandSubmenu(), a.addClass("ba-sidebar-item-expanded")
                }, o.$collapse = function() {
                    o.$$collapseSubmenu(), a.removeClass("ba-sidebar-item-expanded")
                }, o.$toggle = function() {
                    a.hasClass("ba-sidebar-item-expanded") ? o.$collapse() : o.$expand()
                }, l(i.current) && a.addClass("ba-sidebar-item-expanded"), e.$on("$stateChangeStart", function(e, t) {
                    !l(t) && a.hasClass("ba-sidebar-item-expanded") && (o.$collapse(), a.removeClass("ba-sidebar-item-expanded"))
                }), e.$on("$stateChangeSuccess", function(e, t) {
                    l(t) && !a.hasClass("ba-sidebar-item-expanded") && (o.$expand(), a.addClass("ba-sidebar-item-expanded"))
                })
            }
        }

        function s(e) {
            return {
                restrict: "A",
                require: "^baSidebarTogglingItem",
                link: function(e, a, t, i) {
                    i.$$expandSubmenu = function() {
                        a.slideDown()
                    }, i.$$collapseSubmenu = function() {
                        a.slideUp()
                    }
                }
            }
        }

        function l(e) {
            return {
                restrict: "A",
                require: "^baSidebarTogglingItem",
                link: function(a, t, i, s) {
                    t.on("click", function() {
                        e.isMenuCollapsed() ? (a.$apply(function() {
                            e.setMenuCollapsed(!1)
                        }), s.$expand()) : s.$toggle()
                    })
                }
            }
        }
        e.$inject = ["baSidebarService"], a.$inject = ["baSidebarService"], i.$inject = ["$scope", "$element", "$attrs", "$state", "baSidebarService"], s.$inject = ["$state"], l.$inject = ["baSidebarService"], angular.module("BlurAdmin.theme.components")
            .directive("baSidebarToggleMenu", e)
            .directive("baSidebarCollapseMenu", a)
            .directive("baSidebarTogglingItem", t)
            .controller("BaSidebarTogglingItemCtrl", i)
            .directive("baUiSrefTogglingSubmenu", s)
            .directive("baUiSrefToggler", l)
    }(),
    function() {
        "use strict";

        function e() {
            return {
                restrict: "E",
                transclude: !0,
                templateUrl: "app/theme/components/baWizard/baWizard.html",
                controllerAs: "$baWizardController",
                controller: "baWizardCtrl"
            }
        }
        angular.module("BlurAdmin.theme.components")
            .directive("baWizard", e)
    }(),
    function() {
        "use strict";

        function e(e) {
            function a() {
                t.progress = (t.tabNum + 1) / t.tabs.length * 100
            }
            var t = this;
            t.tabs = [], t.tabNum = 0, t.progress = 0, t.addTab = function(e) {
                e.setPrev(t.tabs[t.tabs.length - 1]), t.tabs.push(e), t.selectTab(0)
            }, e.$watch(angular.bind(t, function() {
                return t.tabNum
            }), a), t.selectTab = function(e) {
                t.tabs[t.tabNum].submit(), t.tabs[e].isAvailiable() && (t.tabNum = e, t.tabs.forEach(function(e, a) {
                    a == t.tabNum ? e.select(!0) : e.select(!1)
                }))
            }, t.isFirstTab = function() {
                return 0 == t.tabNum
            }, t.isLastTab = function() {
                return t.tabNum == t.tabs.length - 1
            }, t.nextTab = function() {
                t.selectTab(t.tabNum + 1)
            }, t.previousTab = function() {
                t.selectTab(t.tabNum - 1)
            }
        }
        e.$inject = ["$scope"], angular.module("BlurAdmin.theme.components")
            .controller("baWizardCtrl", e)
    }(),
    function() {
        "use strict";

        function e() {
            return {
                restrict: "E",
                transclude: !0,
                require: "^baWizard",
                scope: {
                    form: "="
                },
                templateUrl: "app/theme/components/baWizard/baWizardStep.html",
                link: function(e, a, t, i) {
                    function s(a) {
                        a ? e.selected = !0 : e.selected = !1
                    }

                    function l() {
                        e.form && e.form.$setSubmitted(!0)
                    }

                    function o() {
                        return e.form ? e.form.$valid : !0
                    }

                    function n() {
                        return d.prevTab ? d.prevTab.isComplete() : !0
                    }

                    function r(e) {
                        d.prevTab = e
                    }
                    e.selected = !0;
                    var d = {
                        title: t.title,
                        select: s,
                        submit: l,
                        isComplete: o,
                        isAvailiable: n,
                        prevTab: void 0,
                        setPrev: r
                    };
                    i.addTab(d)
                }
            }
        }
        angular.module("BlurAdmin.theme.components")
            .directive("baWizardStep", e)
    }(),
    function() {
        "use strict";

        function e() {
            return {
                restrict: "E",
                templateUrl: "app/theme/components/backTop/backTop.html",
                controller: function() {
                    $("#backTop")
                        .backTop({
                            position: 200,
                            speed: 100
                        })
                }
            }
        }
        angular.module("BlurAdmin.theme.components")
            .directive("backTop", e)
    }(),
    function() {
        "use strict";

        function e(e, a) {
            return {
                restrict: "E",
                templateUrl: "app/theme/components/contentTop/contentTop.html",
                link: function(e) {
                    e.$watch(function() {
                        e.activePageTitle = a.current.title
                    })
                }
            }
        }
        e.$inject = ["$location", "$state"], angular.module("BlurAdmin.theme.components")
            .directive("contentTop", e)
    }(),
    function() {
        "use strict";

        function e(e, a) {
            e.users = {
                0: {
                    name: "Vlad"
                },
                1: {
                    name: "Kostya"
                },
                2: {
                    name: "Andrey"
                },
                3: {
                    name: "Nasta"
                }
            }, e.notifications = [{
                userId: 0,
                template: "&name posted a new article.",
                time: "1 min ago"
            }, {
                userId: 1,
                template: "&name changed his contact information.",
                time: "2 hrs ago"
            }, {
                image: "assets/img/shopping-cart.svg",
                template: "New orders received.",
                time: "5 hrs ago"
            }, {
                userId: 2,
                template: "&name replied to your comment.",
                time: "1 day ago"
            }, {
                userId: 3,
                template: "Today is &name's birthday.",
                time: "2 days ago"
            }, {
                image: "assets/img/comments.svg",
                template: "New comments on your post.",
                time: "3 days ago"
            }, {
                userId: 1,
                template: "&name invited you to join the event.",
                time: "1 week ago"
            }], e.messages = [{
                userId: 3,
                text: "After you get up and running, you can place Font Awesome icons just about...",
                time: "1 min ago"
            }, {
                userId: 0,
                text: "You asked, Font Awesome delivers with 40 shiny new icons in version 4.2.",
                time: "2 hrs ago"
            }, {
                userId: 1,
                text: "Want to request new icons? Here's how. Need vectors or want to use on the...",
                time: "10 hrs ago"
            }, {
                userId: 2,
                text: "Explore your passions and discover new ones by getting involved. Stretch your...",
                time: "1 day ago"
            }, {
                userId: 3,
                text: "Get to know who we are - from the inside out. From our history and culture, to the...",
                time: "1 day ago"
            }, {
                userId: 1,
                text: "Need some support to reach your goals? Apply for scholarships across a variety of...",
                time: "2 days ago"
            }, {
                userId: 0,
                text: "Wrap the dropdown's trigger and the dropdown menu within .dropdown, or...",
                time: "1 week ago"
            }], e.getMessage = function(t) {
                var i = t.template;
                return (t.userId || 0 === t.userId) && (i = i.replace("&name", "<strong>" + e.users[t.userId].name + "</strong>")), a.trustAsHtml(i)
            }
        }
        e.$inject = ["$scope", "$sce"], angular.module("BlurAdmin.theme.components")
            .controller("MsgCenterCtrl", e)
    }(),
    function() {
        "use strict";

        function e() {
            return {
                restrict: "E",
                templateUrl: "app/theme/components/msgCenter/msgCenter.html",
                controller: "MsgCenterCtrl"
            }
        }
        angular.module("BlurAdmin.theme.components")
            .directive("msgCenter", e)
    }(),
    function() {
        "use strict";

        function e() {
            return {
                restrict: "E",
                templateUrl: "app/theme/components/pageTop/pageTop.html"
            }
        }
        angular.module("BlurAdmin.theme.components")
            .directive("pageTop", e)
    }(),
    function() {
        "use strict";

        function e() {
            return {
                restrict: "EA",
                scope: {
                    ngModel: "="
                },
                templateUrl: "app/theme/components/widgets/widgets.html",
                replace: !0
            }
        }
        angular.module("BlurAdmin.theme.components")
            .directive("widgets", e)
    }(),
    function() {
        "use strict";

        function e(e) {
            return function(a) {
                return e.images.root + a
            }
        }
        e.$inject = ["layoutPaths"], angular.module("BlurAdmin.theme")
            .filter("appImage", e)
    }(),
    function() {
        "use strict";

        function e(e) {
            return function(a) {
                return e.images.root + "theme/icon/kameleon/" + a + ".svg"
            }
        }
        e.$inject = ["layoutPaths"], angular.module("BlurAdmin.theme")
            .filter("kameleonImg", e)
    }(),
    function() {
        "use strict";

        function e(e) {
            return function(a, t) {
                return t = t || "png", e.images.profile + a + "." + t
            }
        }
        e.$inject = ["layoutPaths"], angular.module("BlurAdmin.theme")
            .filter("profilePicture", e)
    }(),
    function() {
        "use strict";

        function e() {
            return function(e) {
                return e ? String(e)
                    .replace(/<[^>]+>/gm, "") : ""
            }
        }
        angular.module("BlurAdmin.theme")
            .filter("plainText", e)
    }(),
    function() {
        "use strict";

        function e(e, a, t, i) {
            function s() {
                n.zoomToDates(new Date(2012, 0, 3), new Date(2012, 0, 11))
            }
            var l = a.colors,
                o = t[0].getAttribute("id"),
                n = AmCharts.makeChart(o, {
                    type: "serial",
                    theme: "blur",
                    color: l.defaultText,
                    dataProvider: [{
                        lineColor: l.info,
                        date: "2012-01-01",
                        duration: 408
                    }, {
                        date: "2012-01-02",
                        duration: 482
                    }, {
                        date: "2012-01-03",
                        duration: 562
                    }, {
                        date: "2012-01-04",
                        duration: 379
                    }, {
                        lineColor: l.warning,
                        date: "2012-01-05",
                        duration: 501
                    }, {
                        date: "2012-01-06",
                        duration: 443
                    }, {
                        date: "2012-01-07",
                        duration: 405
                    }, {
                        date: "2012-01-08",
                        duration: 309,
                        lineColor: l.danger
                    }, {
                        date: "2012-01-09",
                        duration: 287
                    }, {
                        date: "2012-01-10",
                        duration: 485
                    }, {
                        date: "2012-01-11",
                        duration: 890
                    }, {
                        date: "2012-01-12",
                        duration: 810
                    }],
                    balloon: {
                        cornerRadius: 6,
                        horizontalPadding: 15,
                        verticalPadding: 10
                    },
                    valueAxes: [{
                        duration: "mm",
                        durationUnits: {
                            hh: "h ",
                            mm: "min"
                        },
                        gridAlpha: .5,
                        gridColor: l.border
                    }],
                    graphs: [{
                        bullet: "square",
                        bulletBorderAlpha: 1,
                        bulletBorderThickness: 1,
                        fillAlphas: .5,
                        fillColorsField: "lineColor",
                        legendValueText: "[[value]]",
                        lineColorField: "lineColor",
                        title: "duration",
                        valueField: "duration"
                    }],
                    chartCursor: {
                        categoryBalloonDateFormat: "YYYY MMM DD",
                        cursorAlpha: 0,
                        fullWidth: !0
                    },
                    dataDateFormat: "YYYY-MM-DD",
                    categoryField: "date",
                    categoryAxis: {
                        dateFormats: [{
                            period: "DD",
                            format: "DD"
                        }, {
                            period: "WW",
                            format: "MMM DD"
                        }, {
                            period: "MM",
                            format: "MMM"
                        }, {
                            period: "YYYY",
                            format: "YYYY"
                        }],
                        parseDates: !0,
                        autoGridCount: !1,
                        gridCount: 50,
                        gridAlpha: .5,
                        gridColor: l.border
                    },
                    "export": {
                        enabled: !0
                    },
                    pathToImages: i.images.amChart
                });
            n.addListener("dataUpdated", s)
        }
        e.$inject = ["$scope", "baConfig", "$element", "layoutPaths"], angular.module("BlurAdmin.pages.charts.amCharts")
            .controller("AreaChartCtrl", e)
    }(),
    function() {
        "use strict";

        function e(e, a, t, i) {
            var s = a.colors,
                l = t[0].getAttribute("id");
            AmCharts.makeChart(l, {
                type: "serial",
                theme: "blur",
                color: s.defaultText,
                dataProvider: [{
                    country: "USA",
                    visits: 3025,
                    color: s.primary
                }, {
                    country: "China",
                    visits: 1882,
                    color: s.danger
                }, {
                    country: "Japan",
                    visits: 1809,
                    color: s.info
                }, {
                    country: "Germany",
                    visits: 1322,
                    color: s.success
                }, {
                    country: "UK",
                    visits: 1122,
                    color: s.warning
                }, {
                    country: "France",
                    visits: 1114,
                    color: s.primaryLight
                }],
                valueAxes: [{
                    axisAlpha: 0,
                    position: "left",
                    title: "Visitors from country",
                    gridAlpha: .5,
                    gridColor: s.border
                }],
                startDuration: 1,
                graphs: [{
                    balloonText: "<b>[[category]]: [[value]]</b>",
                    fillColorsField: "color",
                    fillAlphas: .7,
                    lineAlpha: .2,
                    type: "column",
                    valueField: "visits"
                }],
                chartCursor: {
                    categoryBalloonEnabled: !1,
                    cursorAlpha: 0,
                    zoomable: !1
                },
                categoryField: "country",
                categoryAxis: {
                    gridPosition: "start",
                    labelRotation: 45,
                    gridAlpha: .5,
                    gridColor: s.border
                },
                "export": {
                    enabled: !0
                },
                creditsPosition: "top-right",
                pathToImages: i.images.amChart
            })
        }
        e.$inject = ["$scope", "baConfig", "$element", "layoutPaths"], angular.module("BlurAdmin.pages.charts.amCharts")
            .controller("BarChartCtrl", e)
    }(),
    function() {
        "use strict";

        function e(e, a, t) {
            var i = a.colors,
                s = e[0].getAttribute("id");
            AmCharts.makeChart(s, {
                type: "serial",
                theme: "none",
                color: i.defaultText,
                dataDateFormat: "YYYY-MM-DD",
                precision: 2,
                valueAxes: [{
                    color: i.defaultText,
                    axisColor: i.defaultText,
                    gridColor: i.defaultText,
                    id: "v1",
                    title: "Sales",
                    position: "left",
                    autoGridCount: !1,
                    labelFunction: function(e) {
                        return "$" + Math.round(e) + "M"
                    }
                }, {
                    color: i.defaultText,
                    axisColor: i.defaultText,
                    gridColor: i.defaultText,
                    id: "v2",
                    title: "Market Days",
                    gridAlpha: 0,
                    position: "right",
                    autoGridCount: !1
                }],
                graphs: [{
                    id: "g3",
                    color: i.defaultText,
                    valueAxis: "v1",
                    lineColor: i.primaryLight,
                    fillColors: i.primaryLight,
                    fillAlphas: .8,
                    lineAlpha: .8,
                    type: "column",
                    title: "Actual Sales",
                    valueField: "sales2",
                    clustered: !1,
                    columnWidth: .5,
                    lineColorField: i.defaultText,
                    legendValueText: "$[[value]]M",
                    balloonText: "[[title]]<br/><b style='font-size: 130%'>$[[value]]M</b>"
                }, {
                    id: "g4",
                    valueAxis: "v1",
                    color: i.defaultText,
                    lineColor: i.primary,
                    fillColors: i.primary,
                    fillAlphas: .9,
                    lineAlpha: .9,
                    type: "column",
                    title: "Target Sales",
                    valueField: "sales1",
                    clustered: !1,
                    columnWidth: .3,
                    legendValueText: "$[[value]]M",
                    balloonText: "[[title]]<br/><b style='font-size: 130%'>$[[value]]M</b>"
                }, {
                    id: "g1",
                    valueAxis: "v2",
                    bullet: "round",
                    bulletBorderAlpha: 1,
                    bulletColor: i.defaultText,
                    color: i.defaultText,
                    bulletSize: 5,
                    hideBulletsCount: 50,
                    lineThickness: 2,
                    lineColor: i.danger,
                    type: "smoothedLine",
                    title: "Market Days",
                    useLineColorForBulletBorder: !0,
                    valueField: "market1",
                    balloonText: "[[title]]<br/><b style='font-size: 130%'>[[value]]</b>"
                }, {
                    id: "g2",
                    valueAxis: "v2",
                    color: i.defaultText,
                    bullet: "round",
                    bulletBorderAlpha: 1,
                    bulletColor: i.defaultText,
                    bulletSize: 5,
                    hideBulletsCount: 50,
                    lineThickness: 2,
                    lineColor: i.warning,
                    type: "smoothedLine",
                    dashLength: 5,
                    title: "Market Days ALL",
                    useLineColorForBulletBorder: !0,
                    valueField: "market2",
                    balloonText: "[[title]]<br/><b style='font-size: 130%'>[[value]]</b>"
                }],
                chartScrollbar: {
                    graph: "g1",
                    oppositeAxis: !1,
                    offset: 30,
                    gridAlpha: 0,
                    color: i.defaultText,
                    scrollbarHeight: 50,
                    backgroundAlpha: 0,
                    selectedBackgroundAlpha: .05,
                    selectedBackgroundColor: i.defaultText,
                    graphFillAlpha: 0,
                    autoGridCount: !0,
                    selectedGraphFillAlpha: 0,
                    graphLineAlpha: .2,
                    selectedGraphLineColor: i.defaultText,
                    selectedGraphLineAlpha: 1
                },
                chartCursor: {
                    pan: !0,
                    cursorColor: i.danger,
                    valueLineEnabled: !0,
                    valueLineBalloonEnabled: !0,
                    cursorAlpha: 0,
                    valueLineAlpha: .2
                },
                categoryField: "date",
                categoryAxis: {
                    axisColor: i.defaultText,
                    color: i.defaultText,
                    gridColor: i.defaultText,
                    parseDates: !0,
                    dashLength: 1,
                    minorGridEnabled: !0
                },
                legend: {
                    useGraphSettings: !0,
                    position: "top",
                    color: i.defaultText
                },
                balloon: {
                    borderThickness: 1,
                    shadowAlpha: 0
                },
                "export": {
                    enabled: !0
                },
                dataProvider: [{
                    date: "2013-01-16",
                    market1: 71,
                    market2: 75,
                    sales1: 5,
                    sales2: 8
                }, {
                    date: "2013-01-17",
                    market1: 74,
                    market2: 78,
                    sales1: 4,
                    sales2: 6
                }, {
                    date: "2013-01-18",
                    market1: 78,
                    market2: 88,
                    sales1: 5,
                    sales2: 2
                }, {
                    date: "2013-01-19",
                    market1: 85,
                    market2: 89,
                    sales1: 8,
                    sales2: 9
                }, {
                    date: "2013-01-20",
                    market1: 82,
                    market2: 89,
                    sales1: 9,
                    sales2: 6
                }, {
                    date: "2013-01-21",
                    market1: 83,
                    market2: 85,
                    sales1: 3,
                    sales2: 5
                }, {
                    date: "2013-01-22",
                    market1: 88,
                    market2: 92,
                    sales1: 5,
                    sales2: 7
                }, {
                    date: "2013-01-23",
                    market1: 85,
                    market2: 90,
                    sales1: 7,
                    sales2: 6
                }, {
                    date: "2013-01-24",
                    market1: 85,
                    market2: 91,
                    sales1: 9,
                    sales2: 5
                }, {
                    date: "2013-01-25",
                    market1: 80,
                    market2: 84,
                    sales1: 5,
                    sales2: 8
                }, {
                    date: "2013-01-26",
                    market1: 87,
                    market2: 92,
                    sales1: 4,
                    sales2: 8
                }, {
                    date: "2013-01-27",
                    market1: 84,
                    market2: 87,
                    sales1: 3,
                    sales2: 4
                }, {
                    date: "2013-01-28",
                    market1: 83,
                    market2: 88,
                    sales1: 5,
                    sales2: 7
                }, {
                    date: "2013-01-29",
                    market1: 84,
                    market2: 87,
                    sales1: 5,
                    sales2: 8
                }, {
                    date: "2013-01-30",
                    market1: 81,
                    market2: 85,
                    sales1: 4,
                    sales2: 7
                }],
                pathToImages: t.images.amChart
            })
        }
        e.$inject = ["$element", "baConfig", "layoutPaths"], angular.module("BlurAdmin.pages.charts.amCharts")
            .controller("combinedChartCtrl", e)
    }(),
    function() {
        "use strict";

        function e(e, a, t, i) {
            var s = i.colors,
                l = a[0].getAttribute("id");
            AmCharts.makeChart(l, {
                type: "funnel",
                theme: "blur",
                color: s.defaultText,
                labelTickColor: s.borderDark,
                dataProvider: [{
                    title: "Website visits",
                    value: 300
                }, {
                    title: "Downloads",
                    value: 123
                }, {
                    title: "Requested prices",
                    value: 98
                }, {
                    title: "Contaced",
                    value: 72
                }, {
                    title: "Purchased",
                    value: 35
                }, {
                    title: "Asked for support",
                    value: 25
                }, {
                    title: "Purchased more",
                    value: 18
                }],
                titleField: "title",
                marginRight: 160,
                marginLeft: 15,
                labelPosition: "right",
                funnelAlpha: .9,
                valueField: "value",
                startX: 0,
                alpha: .8,
                neckWidth: "0%",
                startAlpha: 0,
                outlineThickness: 1,
                neckHeight: "0%",
                balloonText: "[[title]]:<b>[[value]]</b>",
                "export": {
                    enabled: !0
                },
                creditsPosition: "bottom-left",
                pathToImages: t
            })
        }
        e.$inject = ["$scope", "$element", "layoutPaths", "baConfig"], angular.module("BlurAdmin.pages.charts.amCharts")
            .controller("FunnelChartCtrl", e)
    }(),
    function() {
        "use strict";

        function e(e) {
            var a = e[0].getAttribute("id");
            AmCharts.makeChart(a, {
                type: "gantt",
                theme: "light",
                marginRight: 70,
                period: "hh",
                dataDateFormat: "YYYY-MM-DD",
                balloonDateFormat: "JJ:NN",
                columnWidth: .5,
                valueAxis: {
                    type: "date",
                    minimum: 7,
                    maximum: 31
                },
                brightnessStep: 10,
                graph: {
                    fillAlphas: 1,
                    balloonText: "<b>[[task]]</b>: [[open]] [[value]]"
                },
                rotate: !0,
                categoryField: "category",
                segmentsField: "segments",
                colorField: "color",
                startDate: "2015-01-01",
                startField: "start",
                endField: "end",
                durationField: "duration",
                dataProvider: [{
                    category: "John",
                    segments: [{
                        start: 7,
                        duration: 2,
                        color: "#46615e",
                        task: "Task #1"
                    }, {
                        duration: 2,
                        color: "#727d6f",
                        task: "Task #2"
                    }, {
                        duration: 2,
                        color: "#8dc49f",
                        task: "Task #3"
                    }]
                }, {
                    category: "Smith",
                    segments: [{
                        start: 10,
                        duration: 2,
                        color: "#727d6f",
                        task: "Task #2"
                    }, {
                        duration: 1,
                        color: "#8dc49f",
                        task: "Task #3"
                    }, {
                        duration: 4,
                        color: "#46615e",
                        task: "Task #1"
                    }]
                }, {
                    category: "Ben",
                    segments: [{
                        start: 12,
                        duration: 2,
                        color: "#727d6f",
                        task: "Task #2"
                    }, {
                        start: 16,
                        duration: 2,
                        color: "#FFE4C4",
                        task: "Task #4"
                    }]
                }, {
                    category: "Mike",
                    segments: [{
                        start: 9,
                        duration: 6,
                        color: "#46615e",
                        task: "Task #1"
                    }, {
                        duration: 4,
                        color: "#727d6f",
                        task: "Task #2"
                    }]
                }, {
                    category: "Lenny",
                    segments: [{
                        start: 8,
                        duration: 1,
                        color: "#8dc49f",
                        task: "Task #3"
                    }, {
                        duration: 4,
                        color: "#46615e",
                        task: "Task #1"
                    }]
                }, {
                    category: "Scott",
                    segments: [{
                        start: 15,
                        duration: 3,
                        color: "#727d6f",
                        task: "Task #2"
                    }]
                }, {
                    category: "Julia",
                    segments: [{
                        start: 9,
                        duration: 2,
                        color: "#46615e",
                        task: "Task #1"
                    }, {
                        duration: 1,
                        color: "#727d6f",
                        task: "Task #2"
                    }, {
                        duration: 8,
                        color: "#8dc49f",
                        task: "Task #3"
                    }]
                }, {
                    category: "Bob",
                    segments: [{
                        start: 9,
                        duration: 8,
                        color: "#727d6f",
                        task: "Task #2"
                    }, {
                        duration: 7,
                        color: "#8dc49f",
                        task: "Task #3"
                    }]
                }, {
                    category: "Kendra",
                    segments: [{
                        start: 11,
                        duration: 8,
                        color: "#727d6f",
                        task: "Task #2"
                    }, {
                        start: 16,
                        duration: 2,
                        color: "#FFE4C4",
                        task: "Task #4"
                    }]
                }, {
                    category: "Tom",
                    segments: [{
                        start: 9,
                        duration: 4,
                        color: "#46615e",
                        task: "Task #1"
                    }, {
                        duration: 3,
                        color: "#727d6f",
                        task: "Task #2"
                    }, {
                        duration: 5,
                        color: "#8dc49f",
                        task: "Task #3"
                    }]
                }, {
                    category: "Kyle",
                    segments: [{
                        start: 6,
                        duration: 3,
                        color: "#727d6f",
                        task: "Task #2"
                    }]
                }, {
                    category: "Anita",
                    segments: [{
                        start: 12,
                        duration: 2,
                        color: "#727d6f",
                        task: "Task #2"
                    }, {
                        start: 16,
                        duration: 2,
                        color: "#FFE4C4",
                        task: "Task #4"
                    }]
                }, {
                    category: "Jack",
                    segments: [{
                        start: 8,
                        duration: 10,
                        color: "#46615e",
                        task: "Task #1"
                    }, {
                        duration: 2,
                        color: "#727d6f",
                        task: "Task #2"
                    }]
                }, {
                    category: "Kim",
                    segments: [{
                        start: 12,
                        duration: 2,
                        color: "#727d6f",
                        task: "Task #2"
                    }, {
                        duration: 3,
                        color: "#8dc49f",
                        task: "Task #3"
                    }]
                }, {
                    category: "Aaron",
                    segments: [{
                        start: 18,
                        duration: 2,
                        color: "#727d6f",
                        task: "Task #2"
                    }, {
                        duration: 2,
                        color: "#FFE4C4",
                        task: "Task #4"
                    }]
                }, {
                    category: "Alan",
                    segments: [{
                        start: 17,
                        duration: 2,
                        color: "#46615e",
                        task: "Task #1"
                    }, {
                        duration: 2,
                        color: "#727d6f",
                        task: "Task #2"
                    }, {
                        duration: 2,
                        color: "#8dc49f",
                        task: "Task #3"
                    }]
                }, {
                    category: "Ruth",
                    segments: [{
                        start: 13,
                        duration: 2,
                        color: "#727d6f",
                        task: "Task #2"
                    }, {
                        duration: 1,
                        color: "#8dc49f",
                        task: "Task #3"
                    }, {
                        duration: 4,
                        color: "#46615e",
                        task: "Task #1"
                    }]
                }, {
                    category: "Simon",
                    segments: [{
                        start: 10,
                        duration: 3,
                        color: "#727d6f",
                        task: "Task #2"
                    }, {
                        start: 17,
                        duration: 4,
                        color: "#FFE4C4",
                        task: "Task #4"
                    }]
                }],
                valueScrollbar: {
                    autoGridCount: !0
                },
                chartCursor: {
                    cursorColor: "#55bb76",
                    valueBalloonsEnabled: !1,
                    cursorAlpha: 0,
                    valueLineAlpha: .5,
                    valueLineBalloonEnabled: !0,
                    valueLineEnabled: !0,
                    zoomable: !1,
                    valueZoomable: !0
                },
                "export": {
                    enabled: !0
                }
            })
        }
        e.$inject = ["$element"], angular.module("BlurAdmin.pages.charts.amCharts")
            .controller("ganttChartCtrl", e)
    }(),
    function() {
        "use strict";

        function e(e, a, t, i) {
            function s() {
                n.zoomToIndexes(Math.round(.4 * n.dataProvider.length), Math.round(.55 * n.dataProvider.length))
            }
            var l = a.colors,
                o = t[0].getAttribute("id"),
                n = AmCharts.makeChart(o, {
                    type: "serial",
                    theme: "blur",
                    color: l.defaultText,
                    marginTop: 0,
                    marginRight: 15,
                    dataProvider: [{
                        year: "1990",
                        value: -.17
                    }, {
                        year: "1991",
                        value: -.254
                    }, {
                        year: "1992",
                        value: .019
                    }, {
                        year: "1993",
                        value: -.063
                    }, {
                        year: "1994",
                        value: .005
                    }, {
                        year: "1995",
                        value: .077
                    }, {
                        year: "1996",
                        value: .12
                    }, {
                        year: "1997",
                        value: .011
                    }, {
                        year: "1998",
                        value: .177
                    }, {
                        year: "1999",
                        value: -.021
                    }, {
                        year: "2000",
                        value: -.037
                    }, {
                        year: "2001",
                        value: .03
                    }, {
                        year: "2002",
                        value: .179
                    }, {
                        year: "2003",
                        value: .2
                    }, {
                        year: "2004",
                        value: .18
                    }, {
                        year: "2005",
                        value: .21
                    }],
                    valueAxes: [{
                        axisAlpha: 0,
                        position: "left",
                        gridAlpha: .5,
                        gridColor: l.border
                    }],
                    graphs: [{
                        id: "g1",
                        balloonText: "[[value]]",
                        bullet: "round",
                        bulletSize: 8,
                        lineColor: l.danger,
                        lineThickness: 1,
                        negativeLineColor: l.warning,
                        type: "smoothedLine",
                        valueField: "value"
                    }],
                    chartScrollbar: {
                        graph: "g1",
                        gridAlpha: 0,
                        color: l.defaultText,
                        scrollbarHeight: 55,
                        backgroundAlpha: 0,
                        selectedBackgroundAlpha: .05,
                        selectedBackgroundColor: l.defaultText,
                        graphFillAlpha: 0,
                        autoGridCount: !0,
                        selectedGraphFillAlpha: 0,
                        graphLineAlpha: .2,
                        selectedGraphLineColor: l.defaultText,
                        selectedGraphLineAlpha: 1
                    },
                    chartCursor: {
                        categoryBalloonDateFormat: "YYYY",
                        cursorAlpha: 0,
                        valueLineEnabled: !0,
                        valueLineBalloonEnabled: !0,
                        valueLineAlpha: .5,
                        fullWidth: !0
                    },
                    dataDateFormat: "YYYY",
                    categoryField: "year",
                    categoryAxis: {
                        minPeriod: "YYYY",
                        parseDates: !0,
                        minorGridAlpha: .1,
                        minorGridEnabled: !0,
                        gridAlpha: .5,
                        gridColor: l.border
                    },
                    "export": {
                        enabled: !0
                    },
                    creditsPosition: "bottom-right",
                    pathToImages: i.images.amChart
                });
            n.addListener("rendered", s), n.zoomChart && n.zoomChart()
        }
        e.$inject = ["$scope", "baConfig", "$element", "layoutPaths"], angular.module("BlurAdmin.pages.charts.amCharts")
            .controller("LineChartCtrl", e)
    }(),
    function() {
        "use strict";

        function e(e, a, t) {
            function i() {
                n.legend.addListener("rollOverItem", s)
            }

            function s(e) {
                var a = e.dataItem.wedge.node;
                a.parentNode.appendChild(a)
            }
            var l = t.colors,
                o = e[0].getAttribute("id"),
                n = AmCharts.makeChart(o, {
                    type: "pie",
                    startDuration: 0,
                    theme: "blur",
                    addClassNames: !0,
                    color: l.defaultText,
                    labelTickColor: l.borderDark,
                    legend: {
                        position: "right",
                        marginRight: 100,
                        autoMargins: !1
                    },
                    innerRadius: "40%",
                    defs: {
                        filter: [{
                            id: "shadow",
                            width: "200%",
                            height: "200%",
                            feOffset: {
                                result: "offOut",
                                "in": "SourceAlpha",
                                dx: 0,
                                dy: 0
                            },
                            feGaussianBlur: {
                                result: "blurOut",
                                "in": "offOut",
                                stdDeviation: 5
                            },
                            feBlend: {
                                "in": "SourceGraphic",
                                in2: "blurOut",
                                mode: "normal"
                            }
                        }]
                    },
                    dataProvider: [{
                        country: "Lithuania",
                        litres: 501.9
                    }, {
                        country: "Czech Republic",
                        litres: 301.9
                    }, {
                        country: "Ireland",
                        litres: 201.1
                    }, {
                        country: "Germany",
                        litres: 165.8
                    }, {
                        country: "Australia",
                        litres: 139.9
                    }, {
                        country: "Austria",
                        litres: 128.3
                    }, {
                        country: "UK",
                        litres: 99
                    }, {
                        country: "Belgium",
                        litres: 60
                    }],
                    valueField: "litres",
                    titleField: "country",
                    "export": {
                        enabled: !0
                    },
                    creditsPosition: "bottom-left",
                    autoMargins: !1,
                    marginTop: 10,
                    alpha: .8,
                    marginBottom: 0,
                    marginLeft: 0,
                    marginRight: 0,
                    pullOutRadius: 0,
                    pathToImages: a.images.amChart,
                    responsive: {
                        enabled: !0,
                        rules: [{
                            maxWidth: 900,
                            overrides: {
                                legend: {
                                    enabled: !1
                                }
                            }
                        }, {
                            maxWidth: 200,
                            overrides: {
                                valueAxes: {
                                    labelsEnabled: !1
                                },
                                marginTop: 30,
                                marginBottom: 30,
                                marginLeft: 30,
                                marginRight: 30
                            }
                        }]
                    }
                });
            n.addListener("init", i), n.addListener("rollOverSlice", function(e) {
                s(e)
            })
        }
        e.$inject = ["$element", "layoutPaths", "baConfig"], angular.module("BlurAdmin.pages.charts.amCharts")
            .controller("PieChartCtrl", e)
    }(),
    function() {
        "use strict";

        function e(e, a, t) {
            var i = this;
            i.subject = e, i.to = a, i.text = t
        }
        e.$inject = ["subject", "to", "text"], angular.module("BlurAdmin.pages.components.mail")
            .controller("composeBoxCtrl", e)
    }(),
    function() {
        "use strict";

        function e(e) {
            this.open = function(a) {
                return e.open({
                    animation: !1,
                    templateUrl: "app/pages/components/mail/composeBox/compose.html",
                    controller: "composeBoxCtrl",
                    controllerAs: "boxCtrl",
                    size: "compose",
                    resolve: {
                        subject: function() {
                            return a.subject
                        },
                        to: function() {
                            return a.to
                        },
                        text: function() {
                            return a.text
                        }
                    }
                })
            }
        }
        e.$inject = ["$uibModal"], angular.module("BlurAdmin.pages.components.mail")
            .service("composeModal", e)
    }(),
    function() {
        "use strict";

        function e(e, a) {
            var t = this;
            t.mail = a.getMessageById(e.id), t.label = e.label
        }
        e.$inject = ["$stateParams", "mailMessages"], angular.module("BlurAdmin.pages.components.mail")
            .controller("MailDetailCtrl", e)
    }(),
    function() {
        "use strict";

        function e(e, a) {
            var t = this;
            t.messages = a.getMessagesByLabel(e.label), t.label = e.label
        }
        e.$inject = ["$stateParams", "mailMessages"], angular.module("BlurAdmin.pages.components.mail")
            .controller("MailListCtrl", e)
    }(),
    function() {
        "use strict";

        function e(e, a) {
            e.showSuccessMsg = function() {
                a.success("Your information has been saved successfully!")
            }, e.showInfoMsg = function() {
                a.info("You've got a new email!", "Information")
            }, e.showErrorMsg = function() {
                a.error("Your information hasn't been saved!", "Error")
            }, e.showWarningMsg = function() {
                a.warning("Your computer is about to explode!", "Warning")
            }
        }
        e.$inject = ["$scope", "toastr"], angular.module("BlurAdmin.pages.ui.modals")
            .controller("NotificationsCtrl", e)
    }(), ! function(e) {
        e.fn.backTop = function(a) {
            var t = this,
                i = e.extend({
                    position: 400,
                    speed: 500,
                    color: "white"
                }, a),
                s = i.position,
                l = i.speed,
                o = i.color;
            t.addClass("white" == o ? "white" : "red" == o ? "red" : "green" == o ? "green" : "black"), t.css({
                    right: 40,
                    bottom: 40,
                    position: "fixed"
                }), e(document)
                .scroll(function() {
                    var a = e(window)
                        .scrollTop();
                    a >= s ? t.fadeIn(l) : t.fadeOut(l)
                }), t.click(function() {
                    e("html, body")
                        .animate({
                            scrollTop: 0
                        }, {
                            duration: 1200
                        })
                })
        }
    }(jQuery),
    function() {
        "use strict";

        function e() {
            var e = this;
            e.standardSelectItems = [{
                label: "Option 1",
                value: 1
            }, {
                label: "Option 2",
                value: 2
            }, {
                label: "Option 3",
                value: 3
            }, {
                label: "Option 4",
                value: 4
            }], e.selectWithSearchItems = [{
                label: "Hot Dog, Fries and a Soda",
                value: 1
            }, {
                label: "Burger, Shake and a Smile",
                value: 2
            }, {
                label: "Sugar, Spice and all things nice",
                value: 3
            }, {
                label: "Baby Back Ribs",
                value: 4
            }], e.groupedSelectItems = [{
                label: "Group 1 - Option 1",
                value: 1,
                group: "Group 1"
            }, {
                label: "Group 2 - Option 2",
                value: 2,
                group: "Group 2"
            }, {
                label: "Group 1 - Option 3",
                value: 3,
                group: "Group 1"
            }, {
                label: "Group 2 - Option 4",
                value: 4,
                group: "Group 2"
            }]
        }
        angular.module("BlurAdmin.pages.form")
            .controller("SelectpickerPanelCtrl", e)
    }(),
    function() {
        "use strict";

        function e() {
            return {
                restrict: "A",
                require: "?ngOptions",
                priority: 1500,
                link: {
                    pre: function(e, a, t) {
                        a.append('<option data-hidden="true" disabled value="">' + (t.title || "Select something") + "</option>")
                    },
                    post: function(e, a, t) {
                        function i() {
                            a.selectpicker("refresh")
                        }
                        t.ngModel && e.$watch(t.ngModel, i), t.ngDisabled && e.$watch(t.ngDisabled, i), a.selectpicker({
                            dropupAuto: !1,
                            hideDisabled: !0
                        })
                    }
                }
            }
        }
        angular.module("BlurAdmin.pages.form")
            .directive("selectpicker", e)
    }(),
    function() {
        "use strict";

        function e(e) {
            return {
                restrict: "EA",
                replace: !0,
                scope: {
                    ngModel: "="
                },
                template: '<div class="switch-container {{color}}"><input type="checkbox" ng-model="ngModel"></div>',
                link: function(a, t, i) {
                    e(function() {
                        a.color = i.color, $(t)
                            .find("input")
                            .bootstrapSwitch({
                                size: "small",
                                onColor: i.color
                            })
                    })
                }
            }
        }
        e.$inject = ["$timeout"], angular.module("BlurAdmin.pages.form")
            .directive("switch", e)
    }(),
    function() {
        "use strict";

        function e() {
            return {
                restrict: "A",
                link: function(e, a, t) {
                    $(a)
                        .tagsinput({
                            tagClass: "label label-" + t.tagInput
                        })
                }
            }
        }
        angular.module("BlurAdmin.pages.form")
            .directive("tagInput", e)
    }(), angular.module("BlurAdmin")
    .run(["$templateCache", function(e) {
        e.put("app/pages/dashboard/dashboard.html", '<dashboard-pie-chart></dashboard-pie-chart><div class="row"><div class="col-lg-6 col-md-12 col-sm-12" ba-panel="" ba-panel-title="Acquisition Channels" ba-panel-class="medium-panel traffic-panel"><traffic-chart></traffic-chart></div><div class="col-lg-6 col-md-12 col-sm-12" ba-panel="" ba-panel-title="Users by Country" ba-panel-class="medium-panel"><dashboard-map></dashboard-map></div></div><div class="row"><div class="col-xlg-9 col-lg-6 col-md-6 col-sm-12 col-xs-12"><div class="row"><div class="col-xlg-8 col-lg-12 col-md-12 col-sm-7 col-xs-12" ba-panel="" ba-panel-title="Revenue" ba-panel-class="medium-panel"><dashboard-line-chart></dashboard-line-chart></div><div class="col-xlg-4 col-lg-12 col-md-12 col-sm-5 col-xs-12" ba-panel="" ba-panel-class="popular-app medium-panel"><popular-app></popular-app></div></div></div><div class="col-xlg-3 col-lg-6 col-md-6 col-sm-12 col-xs-12" ba-panel="" ba-panel-title="Feed" ba-panel-class="large-panel with-scroll feed-panel"><blur-feed></blur-feed></div></div><div class="row shift-up"><div class="col-xlg-3 col-lg-6 col-md-6 col-xs-12" ba-panel="" ba-panel-title="To Do List" ba-panel-class="xmedium-panel feed-comply-panel with-scroll todo-panel"><dashboard-todo></dashboard-todo></div><div class="col-xlg-6 col-lg-6 col-md-6 col-xs-12" ba-panel="" ba-panel-title="Calendar" ba-panel-class="xmedium-panel feed-comply-panel with-scroll calendar-panel"><dashboard-calendar></dashboard-calendar></div></div>'), e.put("app/pages/maps/maps.html", '<div class="widgets"><div class="row"><div class="col-md-12" ui-view=""></div></div></div>'), e.put("app/pages/profile/profile.html", '<div ba-panel="" ba-panel-class="profile-page"><div class="panel-content"><div class="progress-info">Your profile is 70% Complete</div><div class="progress"><div class="progress-bar progress-bar-primary progress-bar-striped active" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style="width: 70%"></div></div><h3 class="with-line">General Information</h3><div class="row"><div class="col-md-6"><div class="form-group row clearfix"><label for="inputFirstName" class="col-sm-3 control-label">Picture</label><div class="col-sm-9"><div class="userpic"><div class="userpic-wrapper"><img ng-src="{{ picture }}" ng-click="uploadPicture()"></div><i class="ion-ios-close-outline" ng-click="removePicture()" ng-if="!noPicture"></i> <a href="" class="change-userpic" ng-click="uploadPicture()">Change Profile Picture</a> <input type="file" ng-show="false" id="uploadFile" ng-file-select="onFileSelect($files)"></div></div></div></div><div class="col-md-6"></div></div><div class="row"><div class="col-md-6"><div class="form-group row clearfix"><label for="inputFirstName" class="col-sm-3 control-label">First Name</label><div class="col-sm-9"><input type="text" class="form-control" id="inputFirstName" placeholder="" value="Anastasiya"></div></div><div class="form-group row clearfix"><label for="inputLastName" class="col-sm-3 control-label">Last Name</label><div class="col-sm-9"><input type="text" class="form-control" id="inputLastName" placeholder="" value=""></div></div></div><div class="col-md-6"><div class="form-group row clearfix"><label class="col-sm-3 control-label">Department</label><div class="col-sm-9"><select class="form-control" selectpicker=""><option>Web Development</option><option>System Development</option><option>Sales</option><option>Human Resources</option></select></div></div><div class="form-group row clearfix"><label for="inputOccupation" class="col-sm-3 control-label">Occupation</label><div class="col-sm-9"><input type="text" class="form-control" id="inputOccupation" placeholder="" value="Front End Web Developer"></div></div></div></div><h3 class="with-line">Change Password</h3><div class="row"><div class="col-md-6"><div class="form-group row clearfix"><label for="inputPassword" class="col-sm-3 control-label">Password</label><div class="col-sm-9"><input type="password" class="form-control" id="inputPassword" placeholder="" value="12345678"></div></div></div><div class="col-md-6"><div class="form-group row clearfix"><label for="inputConfirmPassword" class="col-sm-3 control-label">Confirm Password</label><div class="col-sm-9"><input type="password" class="form-control" id="inputConfirmPassword" placeholder=""></div></div></div></div><h3 class="with-line">Contact Information</h3><div class="row"><div class="col-md-6"><div class="form-group row clearfix"><label for="inputEmail3" class="col-sm-3 control-label">Email</label><div class="col-sm-9"><input type="email" class="form-control" id="inputEmail3" placeholder="" value="contact@akveo.com"></div></div><div class="form-group row clearfix"><label for="inputPhone" class="col-sm-3 control-label">Phone</label><div class="col-sm-9"><input type="text" class="form-control" id="inputPhone" placeholder="" value="+1 (23) 456 7890"></div></div></div><div class="col-md-6"><div class="form-group row clearfix"><label class="col-sm-3 control-label">Office Location</label><div class="col-sm-9"><select class="form-control" title="Standard Select" selectpicker=""><option>San Francisco</option><option>London</option><option>Minsk</option><option>Tokio</option></select></div></div><div class="form-group row clearfix"><label for="inputRoom" class="col-sm-3 control-label">Room</label><div class="col-sm-9"><input type="text" class="form-control" id="inputRoom" placeholder="" value="303"></div></div></div></div><h3 class="with-line">Social Profiles</h3><div class="social-profiles row clearfix"><div class="col-md-3 col-sm-4" ng-repeat="item in socialProfiles"><a class="sn-link" href="" ng-click="showModal(item)" ng-if="!item.href"><i class="socicon {{ item.icon }}"></i> <span>{{ item.name }}</span></a> <a class="sn-link connected" href="{{ item.href }}" target="_blank" ng-if="item.href"><i class="socicon {{ item.icon }}"></i> <span>{{ item.name }}</span> <em class="ion-ios-close-empty sn-link-close" ng-mousedown="unconnect(item)"></em></a></div></div><h3 class="with-line">Send Email Notifications</h3><div class="notification row clearfix"><div class="col-sm-6"><div class="form-group row clearfix"><label class="col-xs-8">When I receive a message</label><div class="col-xs-4"><switch color="primary" ng-model="switches[0]"></switch></div></div><div class="form-group row clearfix"><label class="col-xs-8">When Someone sends me an invitation</label><div class="col-xs-4"><switch color="primary" ng-model="switches[1]"></switch></div></div><div class="form-group row clearfix"><label class="col-xs-8">When profile information changes</label><div class="col-xs-4"><switch color="primary" ng-model="switches[2]"></switch></div></div></div><div class="col-sm-6"><div class="form-group row clearfix"><label class="col-xs-8">When anyone logs into your account from a new device or browser</label><div class="col-xs-4"><switch color="primary" ng-model="switches[3]"></switch></div></div><div class="form-group row clearfix"><label class="col-xs-8">Weekly Reports</label><div class="col-xs-4"><switch color="primary" ng-model="switches[4]"></switch></div></div><div class="form-group row clearfix"><label class="col-xs-8">Daily Reports</label><div class="col-xs-4"><switch color="primary" ng-model="switches[5]"></switch></div></div></div></div><button type="button" class="btn btn-primary btn-with-icon save-profile"><i class="ion-android-checkmark-circle"></i>Update Profile</button></div></div>'), e.put("app/pages/profile/profileModal.html", '<div class="modal-content"><div class="modal-header"><button type="button" class="close" ng-click="$dismiss()" aria-label="Close"><em class="ion-ios-close-empty sn-link-close"></em></button><h4 class="modal-title" id="myModalLabel">Add Account</h4></div><form name="linkForm"><div class="modal-body"><p>Paste a link to your profile into the box below</p><div class="form-group"><input type="text" class="form-control" placeholder="Link to Profile" ng-model="link"></div></div><div class="modal-footer"><button type="button" class="btn btn-primary" ng-click="ok(link)">Save changes</button></div></form></div>'), e.put("app/pages/components/mail/mail.html", '<div class="row mail-client-container transparent"><div class="col-md-12"><div ba-panel="" ba-panel-class="xmedium-panel mail-panel"><div class="letter-layout"><div class="mail-navigation-container" ng-class="{\'expanded\' : !tabCtrl.navigationCollapsed}"><div class="text-center"><button type="button" class="btn btn-default compose-button" ng-click="tabCtrl.showCompose(\'\',\'\',\'\')">Compose</button></div><div ng-repeat="t in tabCtrl.tabs" ui-sref-active="active" class="mail-navigation" ui-sref="components.mail.label({label: t.label})" ng-click="selectTab(t.label)">{{t.name}}<span class="new-mails" ng-show="t.newMails">{{t.newMails}}</span></div><div class="labels"><div class="labels-title"></div><div class="labels-container"><div class="label-item"><span class="tag label work">Work</span></div><div class="label-item"><span class="tag label family">Family</span></div><div class="label-item"><span class="tag label friend">Friend</span></div><div class="label-item"><span class="tag label study">Study</span></div></div></div><div class="add-label-container"><i class="ion-plus-round"></i><span class="label-input-stub">Add new label</span></div></div><ui-view></ui-view></div></div></div></div>'), e.put("app/pages/components/timeline/timeline.html", '<div ba-panel=""><section id="cd-timeline" class="cd-container cssanimations" ng-controller="TimelineCtrl"><div class="cd-timeline-block"><div class="cd-timeline-img"><div class="kameleon-icon with-round-bg warning"><img ng-src="{{::( \'Euro-Coin\' | kameleonImg )}}"></div></div><div class="cd-timeline-content warning"><h5>Title of section 1</h5><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto, optio, dolorum provident rerum aut hic quasi placeat iure tempora laudantium ipsa ad debitis unde? Iste voluptatibus minus veritatis qui ut.</p><span class="cd-date">Jan 14</span></div></div><div class="cd-timeline-block"><div class="cd-timeline-img"><div class="kameleon-icon with-round-bg danger"><img ng-src="{{::( \'Laptop-Signal\' | kameleonImg )}}"></div></div><div class="cd-timeline-content danger"><h5>Title of section 2</h5><p>Donec dapibus at leo eget volutpat. Praesent dolor tellus, ultricies venenatis molestie eu, luctus eget nibh. Curabitur ullamcorper eleifend nisl.</p><span class="cd-date">Jan 18</span></div></div><div class="cd-timeline-block"><div class="cd-timeline-img"><div class="kameleon-icon with-round-bg primary"><img ng-src="{{::( \'Checklist\' | kameleonImg )}}"></div></div><div class="cd-timeline-content primary"><h5>Title of section 3</h5><p>Phasellus auctor tellus eget lacinia condimentum. Cum sociis natoque penatibus et magnis dis parturient montes.</p><span class="cd-date">Feb 18</span></div></div><div class="cd-timeline-block"><div class="cd-timeline-img"><div class="kameleon-icon with-round-bg warning"><img ng-src="{{::( \'Boss-3\' | kameleonImg )}}"></div></div><div class="cd-timeline-content warning"><h5>Title of section 4</h5><p>Morbi fringilla in massa ac posuere. Fusce non sagittis massa, id accumsan odio. Nullam eget tempor est. Etiam eu felis eu purus aliquam tristique id quis nisl. Nam eros nibh, consequat sed pulvinar eu, ultrices ornare ligula. Aenean interdum sed nunc sed hendrerit.</p><span class="cd-date">Feb 20</span></div></div><div class="cd-timeline-block"><div class="cd-timeline-img"><div class="kameleon-icon with-round-bg danger"><img ng-src="{{::( \'Online-Shopping\' | kameleonImg )}}"></div></div><div class="cd-timeline-content danger"><h5>Title of section 5</h5><p>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur eget mattis metus. Nullam egestas eros metus, quis fringilla urna accumsan sed. Aliquam ultrices at arcu vitae tincidunt.</p><span class="cd-date">Feb 21</span></div></div><div class="cd-timeline-block"><div class="cd-timeline-img"><div class="kameleon-icon with-round-bg primary"><img ng-src="{{::( \'Money-Increase\' | kameleonImg )}}"></div></div><div class="cd-timeline-content primary"><h5>Title of section 6</h5><p>Praesent bibendum ante mattis augue consectetur, ut commodo turpis consequat. Donec ligula eros, porta in iaculis vel, semper ac sem. Integer at mauris lorem.</p><span class="cd-date">Feb 23</span></div></div><div class="cd-timeline-block"><div class="cd-timeline-img"><div class="kameleon-icon with-round-bg warning"><img ng-src="{{::( \'Vector\' | kameleonImg )}}"></div></div><div class="cd-timeline-content warning"><h5>Title of section 7</h5><p>Vivamus ut laoreet erat, vitae eleifend eros. Sed varius id tellus non lobortis. Sed dolor ante, cursus non scelerisque sed, euismod id eros.</p><span class="cd-date">Feb 24</span></div></div></section></div>'), e.put("app/pages/components/tree/tree.html", '<div class="row" ng-controller="treeCtrl"><div class="col-md-6"><div ba-panel="" ba-panel-title="Basic Action" ba-panel-class="with-scroll tree-panel"><div class="row"><div class="col-sm-4"><div class="control-side text-center"><div><button class="btn btn-primary" ng-click="addNewNode()">Add</button></div><div><button class="btn btn-primary" ng-click="collapse()">Collapse All</button></div><div><button class="btn btn-primary" ng-click="expand()">Expand All</button></div><div><button class="btn btn-primary" ng-click="refresh()">Refresh</button></div></div></div><div class="col-sm-8"><div js-tree="basicConfig" ng-model="treeData" should-apply="applyModelChanges()" tree="basicTree" tree-events="ready:readyCB"></div></div></div></div></div><div class="col-md-6"><div ba-panel="" ba-panel-title="Drag & Drop" ba-panel-class="with-scroll tree-panel"><div js-tree="dragConfig" ng-model="dragData"></div></div></div></div>'), e.put("app/pages/charts/amCharts/charts.html", '<div class="widgets"><div class="row"><div class="col-lg-4 col-md-6" ba-panel="" ba-panel-title="Bar Chart" ba-panel-class="with-scroll"><div ng-include="\'app/pages/charts/amCharts/barChart/barChart.html\'"></div></div><div class="col-lg-4 col-md-6" ba-panel="" ba-panel-title="Area Chart" ba-panel-class="with-scroll"><div ng-include="\'app/pages/charts/amCharts/areaChart/areaChart.html\'"></div></div><div class="col-lg-4 col-md-12" ba-panel="" ba-panel-title="Line Chart" ba-panel-class="with-scroll"><div ng-include="\'app/pages/charts/amCharts/lineChart/lineChart.html\'"></div></div></div><div class="row"><div class="col-md-6" ba-panel="" ba-panel-title="Pie Chart" ba-panel-class="with-scroll"><div ng-include="\'app/pages/charts/amCharts/pieChart/pieChart.html\'"></div></div><div class="col-md-6" ba-panel="" ba-panel-title="Funnel Chart" ba-panel-class="with-scroll"><div ng-include="\'app/pages/charts/amCharts/funnelChart/funnelChart.html\'"></div></div></div><div class="row"><div class="col-md-12" ba-panel="" ba-panel-title="Combined bullet/column and line graphs with multiple value axes" ba-panel-class="with-scroll"><div ng-include="\'app/pages/charts/amCharts/combinedChart/combinedChart.html\'"></div></div></div></div>'), e.put("app/pages/charts/chartJs/chartJs.html", '<div class="row"><div class="col-md-4" ng-controller="chartJs1DCtrl"><div ba-panel="" ba-panel-title="Pie" ba-panel-class="with-scroll"><canvas id="pie" class="chart chart-pie" chart-legend="true" chart-options="options" chart-data="data" chart-labels="labels" chart-click="changeData"></canvas></div></div><div class="col-md-4" ng-controller="chartJs1DCtrl"><div ba-panel="" ba-panel-title="Doughnut" ba-panel-class="with-scroll"><canvas id="doughnut" chart-options="options" class="chart chart-doughnut" chart-legend="true" chart-data="data" chart-labels="labels" chart-click="changeData"></canvas></div></div><div class="col-md-4" ng-controller="chartJs1DCtrl"><div ba-panel="" ba-panel-title="Polar" ba-panel-class="with-scroll"><canvas id="polar-area" class="chart chart-polar-area" chart-data="data" chart-options="polarOptions" chart-labels="labels" chart-legend="true" chart-click="changeData"></canvas></div></div></div><div class="row"><div class="col-md-6" ng-controller="chartJsWaveCtrl"><div ba-panel="" ba-panel-title="Animated Radar" ba-panel-class="with-scroll col-eq-height"><canvas id="waveLine" class="chart chart-radar" chart-data="data" chart-labels="labels" chart-legend="false"></canvas></div></div><div class="col-md-6" ng-controller="chartJsWaveCtrl"><div ba-panel="" ba-panel-title="Animated Bars" ba-panel-class="with-scroll col-eq-height"><canvas id="waveBars" class="chart chart-bar" chart-data="data" chart-labels="labels" chart-legend="false"></canvas></div></div></div><div class="row"><div class="col-lg-4 col-md-6" ng-controller="chartJs2DCtrl"><div ba-panel="" ba-panel-title="Radar" ba-panel-class="with-scroll"><canvas id="radar" class="chart chart-radar" chart-legend="false" chart-series="series" chart-data="data" chart-labels="labels" chart-click="changeData"></canvas></div></div><div class="col-lg-4 col-md-6" ng-controller="chartJs2DCtrl"><div ba-panel="" ba-panel-title="Line" ba-panel-class="with-scroll"><canvas id="line" class="chart chart-line" chart-data="data" chart-labels="labels" chart-legend="false" chart-series="series" chart-click="changeData"></canvas></div></div><div class="col-lg-4 col-md-12" ng-controller="chartJs2DCtrl"><div ba-panel="" ba-panel-title="Bars" ba-panel-class="with-scroll"><canvas id="bar" class="chart chart-bar" chart-data="data" chart-labels="labels" chart-series="series" chart-click="changeData"></canvas></div></div></div>'), e.put("app/pages/charts/chartist/chartist.html", '<section ng-controller="chartistCtrl" class="chartist"><div class="row"><div class="col-md-6"><div ba-panel="" ba-panel-title="Lines" ba-panel-class="with-scroll"><h5>Simple line chart</h5><div id="line-chart" class="ct-chart"></div><h5>Line chart with area</h5><div id="area-chart" class="ct-chart"></div><h5>Bi-polar line chart with area only</h5><div id="bi-chart" class="ct-chart"></div></div></div><div class="col-md-6"><div ba-panel="" ba-panel-title="Bars" ba-panel-class="with-scroll"><h5>Simple bar chart</h5><div id="simple-bar" class="ct-chart"></div><h5>Multi-line labels bar chart</h5><div id="multi-bar" class="ct-chart"></div><h5>Stacked bar chart</h5><div id="stacked-bar" class="ct-chart stacked-bar"></div></div></div></div><div class="row"><div class="col-md-12"><div ba-panel="" ba-panel-title="Pies & Donuts" ba-panel-class="with-scroll"><div class="row"><div class="col-md-12 col-lg-4"><h5>Simple Pie</h5><div id="simple-pie" class="ct-chart"></div></div><div class="col-md-12 col-lg-4"><h5>Pie with labels</h5><div id="label-pie" class="ct-chart"></div></div><div class="col-md-12 col-lg-4"><h5>Donut</h5><div id="donut" class="ct-chart"></div></div></div></div></div></div></section>'), e.put("app/pages/charts/morris/morris.html", '<section ng-controller="morrisCtrl"><div class="row"><div class="col-md-12"><div ba-panel="" ba-panel-title="Line Chart" ba-panel-class="with-scroll"><div line-chart="" line-data="lineData" line-xkey="y" line-ykeys=\'["a", "b"]\' line-labels=\'["Serie A", "Serie B"]\' line-colors="colors"></div></div></div></div><div class="row"><div class="col-md-4"><div ba-panel="" ba-panel-title="Donut" ba-panel-class="with-scroll"><div donut-chart="" donut-data="donutData" donut-colors="colors" donut-formatter=\'"currency"\'></div></div></div><div class="col-md-8"><div ba-panel="" ba-panel-title="Bar Chart" ba-panel-class="with-scroll"><div bar-chart="" bar-data="barData" bar-x="y" bar-y=\'["a", "b"]\' bar-labels=\'["Series A", "Series B"]\' bar-colors="colors"></div></div></div></div><div class="row"><div class="col-md-12"><div ba-panel="" ba-panel-title="Area Chart" ba-panel-class="with-scroll"><div area-chart="" area-data="areaData" area-xkey="y" area-ykeys=\'["a", "b"]\' %="" area-labels=\'["Serie A", "Serie B"]\' line-colors="colors"></div></div></div></div></section>'), e.put("app/pages/dashboard/blurFeed/blurFeed.html", '<div class="feed-messages-container" track-width="smallContainerWidth" min-width="360"><div class="feed-message" ng-repeat="message in feed" ng-click="expandMessage(message)"><div class="message-icon" ng-if="message.type == \'text-message\'"><img class="photo-icon" ng-src="{{::( message.author | profilePicture )}}"></div><div class="message-icon" ng-if="message.type != \'text-message\'"><img class="photo-icon" ng-src="{{::( message.author | profilePicture )}}"> <span class="sub-photo-icon" ng-class="::message.type"></span></div><div class="text-block text-message"><div class="message-header"><span class="author">{{ ::message.author }} {{ ::message.surname}}</span></div><div class="message-content line-clamp" ng-class="{\'line-clamp-2\' : !message.expanded}"><span ng-if="message.preview">{{message.header}}</span>{{::message.text}}</div><div class="preview" ng-show="message.expanded" ng-if="message.preview"><a href="{{::message.link}}" target="_blank"><img ng-src="{{ ::( message.preview | appImage )}}"></a></div><div ng-show="message.expanded" class="message-time"><div class="post-time">{{::message.time}}</div><div class="ago-time">{{::message.ago}}</div></div></div></div></div>'), e.put("app/pages/dashboard/dashboardCalendar/dashboardCalendar.html", '<div id="calendar" class="blurCalendar"></div>'), e.put("app/pages/dashboard/dashboardMap/dashboardMap.html", '<div id="amChartMap"></div>'), e.put("app/pages/dashboard/dashboardLineChart/dashboardLineChart.html", '<div id="amchart"></div>'), e.put("app/pages/dashboard/dashboardPieChart/dashboardPieChart.html", '<div class="row pie-charts"><div class="pie-chart-item-container" ng-repeat="chart in charts"><div ba-panel=""><div class="pie-chart-item"><div class="chart" rel="{{ ::chart.color }}" data-percent="60"><span class="percent"></span></div><div class="description"><div>{{ ::chart.description }}</div><div class="description-stats">{{ ::chart.stats }}</div></div><i class="chart-icon i-{{ ::chart.icon }}"></i></div></div></div></div>'), e.put("app/pages/dashboard/dashboardTodo/dashboardTodo.html", '<div class="task-todo-container" ng-class="{\'transparent\': transparent}"><input type="text" value="" class="form-control task-todo" placeholder="Task to do.." ng-keyup="addToDoItem($event)" ng-model="newTodoText"> <i ng-click="addToDoItem(\'\',true)" class="add-item-icon ion-plus-round"></i><div class="box-shadow-border"></div><ul class="todo-list" ui-sortable="" ng-model="todoList"><li ng-repeat="item in todoList" ng-if="!item.deleted" ng-init="activeItem=false" ng-class="{checked: isChecked, active: activeItem}" ng-mouseenter="activeItem=true" ng-mouseleave="activeItem=false"><div class="blur-container"><div class="blur-box"></div></div><i class="mark" style="background-color: {{::item.color}}"></i> <label class="todo-checkbox custom-checkbox custom-input-success"><input type="checkbox" ng-model="isChecked"> <span class="cut-with-dots">{{ item.text }}</span></label> <i class="remove-todo ion-ios-close-empty" ng-click="item.deleted = true"></i></li></ul></div>'), e.put("app/pages/dashboard/popularApp/popularApp.html", '<div class="popular-app-img-container"><div class="popular-app-img"><img ng-src="{{::( \'app/my-app-logo.png\' | appImage )}}"> <span class="logo-text">Super&nbspApp</span></div></div><div class="popular-app-cost row"><div class="col-xs-9">Most Popular App</div><div class="col-xs-3 text-right">175$</div></div><div class="popular-app-info row"><div class="col-xs-4 text-left"><div class="info-label">Total Visits</div><div>47,512</div></div><div class="col-xs-4 text-center"><div class="info-label">New Visits</div><div>9,217</div></div><div class="col-xs-4 text-right"><div class="info-label">Sales</div><div>2,928</div></div></div>'), e.put("app/pages/dashboard/trafficChart/trafficChart.html", '<div class="channels-block" ng-class="{\'transparent\': transparent}"><div class="chart-bg"></div><div class="traffic-chart" id="trafficChart"><div class="canvas-holder"><canvas id="chart-area" width="300" height="300"></canvas><div class="traffic-text">1,900,128 <span>Views Total</span></div></div><div class="traffic-legend"></div></div><div class="channels-info"><div><div class="channels-info-item" ng-repeat="item in doughnutData | orderBy:\'order\'"><div class="legend-color" style="background-color: {{::item.color}}"></div><p>{{::item.label}}<span class="channel-number">+{{item.percentage}}%</span></p><div class="progress progress-sm channel-progress"><div class="progress-bar" role="progressbar" aria-valuenow="{{item.percentage}}" aria-valuemin="0" aria-valuemax="100" style="width: {{item.percentage}}%"></div></div></div></div></div></div>'), e.put("app/pages/dashboard/weather/weather.html", '<div class="weather-wrapper"><div class="weather-main-info"><h5 class="city-date font-x1dot5"><div>{{geoData.geoplugin_city}} - {{geoData.geoplugin_countryName | uppercase}}</div><div>{{ weather.days[weather.current].date | date : \'EEEE h:mm\'}}</div></h5><div class="weather-description font-x1dot5"><i class="font-x3 {{weatherIcons[weather.days[weather.current].icon]}}"></i><div class="weather-info">{{weather.days[weather.current].main}} - {{weather.days[weather.current].description}}</div></div><div class="weather-temp font-x1dot5"><i class="font-x2 ion-thermometer"></i><div class="weather-info" ng-switch="" on="units"><span ng-switch-when="metric">{{weather.days[weather.current].temp}} Â°C | <a ng-click="switchUnits(\'imperial\')" href="">Â°F</a></span> <span ng-switch-when="imperial">{{weather.days[weather.current].temp}} Â°F | <a ng-click="switchUnits(\'metric\')" href="">Â°C</a></span></div></div></div><div id="tempChart" class="temp-by-time"></div><div class="select-day"><div class="day" ng-repeat="day in weather.days" ng-click="switchDay($index)"><div><span class="font-x1dot25">{{day.temp}}</span></div><div><i class="weatherIcon font-x2 {{weatherIcons[day.icon]}}"></i> <span class="select-day-info">{{day.main}}</span></div><div><span>{{day.date | date : \'EEE\'}}</span></div></div></div></div>'), e.put("app/pages/form/inputs/inputs.html", '<div class="widgets"><div class="row"><div class="col-md-6"><div ba-panel="" ba-panel-title="Standard Fields" ba-panel-class="with-scroll"><div ng-include="\'app/pages/form/inputs/widgets/standardFields.html\'"></div></div><div ba-panel="" ba-panel-title="Tags Input" ba-panel-class="with-scroll"><div ng-include="\'app/pages/form/inputs/widgets/tagsInput/tagsInput.html\'"></div></div><div ba-panel="" ba-panel-title="Input Groups" ba-panel-class="with-scroll"><div ng-include="\'app/pages/form/inputs/widgets/inputGroups.html\'"></div></div><div ba-panel="" ba-panel-title="Checkboxes & Radios" ba-panel-class="with-scroll"><div ng-include="\'app/pages/form/inputs/widgets/checkboxesRadios.html\'"></div></div></div><div class="col-md-6"><div ba-panel="" ba-panel-title="Validation States" ba-panel-class="with-scroll"><div ng-include="\'app/pages/form/inputs/widgets/validationStates.html\'"></div></div><div ba-panel="" ba-panel-title="Selects" ba-panel-class="with-scroll"><div ng-include="\'app/pages/form/inputs/widgets/select/select.html\'"></div></div><div ba-panel="" ba-panel-title="On/Off Switches" ba-panel-class="with-scroll"><div ng-include="\'app/pages/form/inputs/widgets/switch/switch.html\'"></div></div></div></div></div>'), e.put("app/pages/form/layouts/layouts.html", '<div class="widgets"><div class="row"><div class="col-md-12" ba-panel="" ba-panel-title="Inline Form" ba-panel-class="with-scroll"><div ng-include="\'app/pages/form/layouts/widgets/inlineForm.html\'"></div></div></div><div class="row"><div class="col-md-6"><div ba-panel="" ba-panel-title="Basic Form" ba-panel-class="with-scroll"><div ng-include="\'app/pages/form/layouts/widgets/basicForm.html\'"></div></div><div ba-panel="" ba-panel-title="Horizontal Form" ba-panel-class="with-scroll"><div ng-include="\'app/pages/form/layouts/widgets/horizontalForm.html\'"></div></div></div><div class="col-md-6"><div ba-panel="" ba-panel-title="Form Without Labels" ba-panel-class="with-scroll"><div ng-include="\'app/pages/form/layouts/widgets/formWithoutLabels.html\'"></div></div><div ba-panel="" ba-panel-title="Block Form" ba-panel-class="with-scroll"><div ng-include="\'app/pages/form/layouts/widgets/blockForm.html\'"></div></div></div></div></div>'),
            e.put("app/pages/form/wizard/wizard.html", '<div class="widgets"><div class="row"><div class="col-md-12"><div ba-panel="" ba-panel-title="Form Wizard" ba-panel-class="with-scroll"><ba-wizard><ba-wizard-step title="Personal info" form="vm.personalInfoForm"><form name="vm.personalInfoForm" novalidate=""><div class="row"><div class="col-md-6"><div class="form-group has-feedback" ng-class="{\'has-error\': vm.personalInfoForm.username.$invalid && (vm.personalInfoForm.username.$dirty || vm.personalInfoForm.$submitted)}"><label for="exampleUsername1">Username</label> <input type="text" class="form-control" id="exampleUsername1" name="username" placeholder="Username" ng-model="vm.personalInfo.username" required=""> <span class="help-block error-block basic-block">Required</span></div><div class="form-group" ng-class="{\'has-error\': vm.personalInfoForm.email.$invalid && (vm.personalInfoForm.email.$dirty || vm.personalInfoForm.$submitted)}"><label for="exampleInputEmail1">Email address</label> <input type="email" class="form-control" id="exampleInputEmail1" name="email" placeholder="Email" ng-model="vm.personalInfo.email" required=""> <span class="help-block error-block basic-block">Proper email required</span></div></div><div class="col-md-6"><div class="form-group" ng-class="{\'has-error\': vm.personalInfoForm.password.$invalid && (vm.personalInfoForm.password.$dirty || vm.personalInfoForm.$submitted)}"><label for="exampleInputPassword1">Password</label> <input type="password" class="form-control" id="exampleInputPassword1" name="password" placeholder="Password" ng-model="vm.personalInfo.password" required=""> <span class="help-block error-block basic-block">Required</span></div><div class="form-group" ng-class="{\'has-error\': !vm.arePersonalInfoPasswordsEqual() && (vm.personalInfoForm.confirmPassword.$dirty || vm.personalInfoForm.$submitted)}"><label for="exampleInputConfirmPassword1">Confirm Password</label> <input type="password" class="form-control" id="exampleInputConfirmPassword1" name="confirmPassword" placeholder="Confirm Password" ng-model="vm.personalInfo.confirmPassword" required=""> <span class="help-block error-block basic-block">Passwords should match</span></div></div></div></form></ba-wizard-step><ba-wizard-step title="Product Info" form="vm.productInfoForm"><form name="vm.productInfoForm" novalidate=""><div class="row"><div class="col-md-6"><div class="form-group has-feedback" ng-class="{\'has-error\': vm.productInfoForm.productName.$invalid && (vm.productInfoForm.productName.$dirty || vm.productInfoForm.$submitted)}"><label for="productName">Product name</label> <input type="text" class="form-control" id="productName" name="productName" placeholder="Product name" ng-model="vm.productInfo.productName" required=""> <span class="help-block error-block basic-block">Required</span></div><div class="form-group" ng-class="{\'has-error\': vm.productInfoForm.productId.$invalid && (vm.productInfoForm.productId.$dirty || vm.productInfoForm.$submitted)}"><label for="productId">Product id</label> <input type="text" class="form-control" id="productId" name="productId" placeholder="productId" ng-model="vm.productInfo.productId" required=""> <span class="help-block error-block basic-block">Required</span></div></div><div class="col-md-6"><div class="form-group"><label for="productName">Category</label><select class="form-control" title="Category" selectpicker=""><option selected="">Electronics</option><option>Toys</option><option>Accessories</option></select></div></div></div></form></ba-wizard-step><ba-wizard-step title="Shipment" form="vm.addressForm"><form name="vm.addressForm" novalidate=""><div class="row"><div class="col-md-6"><div class="form-group has-feedback" ng-class="{\'has-error\': vm.addressForm.address.$invalid && (vm.addressForm.address.$dirty || vm.addressForm.$submitted)}"><label for="productName">Shipment address</label> <input type="text" class="form-control" id="address" name="address" placeholder="Shipment address" ng-model="vm.shipment.address" required=""> <span class="help-block error-block basic-block">Required</span></div></div><div class="col-md-6"><div class="form-group"><label for="productName">Shipment method</label><select class="form-control" title="Category" selectpicker=""><option selected="">Fast & expensive</option><option>Cheap & free</option></select></div></div></div><div class="checkbox"><label class="custom-checkbox"><input type="checkbox"> <span>Save shipment info</span></label></div></form></ba-wizard-step><ba-wizard-step title="Finish"><form class="form-horizontal" name="vm.finishForm" novalidate="">Congratulations! You have successfully filled the form!</form></ba-wizard-step></ba-wizard></div></div></div></div>'), e.put("app/pages/maps/leaflet/leaflet.html", '<div ba-panel="" ba-panel-title="Leaflet" class="viewport100"><div id="leaflet-map"></div></div>'), e.put("app/pages/maps/google-maps/google-maps.html", '<div ba-panel="" ba-panel-title="Google Maps" class="viewport100"><div id="google-maps"></div></div>'), e.put("app/pages/maps/map-bubbles/map-bubbles.html", '<div ba-panel="" ba-panel-title="Map with Bubbles" class="viewport100"><div id="map-bubbles"></div></div>'), e.put("app/pages/maps/map-lines/map-lines.html", '<div ba-panel="" ba-panel-title="Line Map" class="viewport100"><div id="map-lines"></div></div>'), e.put("app/pages/tables/basic/tables.html", '<div class="widgets"><div class="row"><div class="col-lg-6 col-md-12"><div ba-panel="" ba-panel-title="Hover Rows" ba-panel-class="with-scroll table-panel"><div include-with-scope="app/pages/tables/widgets/hoverRows.html"></div></div></div><div class="col-lg-6 col-md-12"><div ba-panel="" ba-panel-title="Bordered Table" ba-panel-class="with-scroll table-panel"><div include-with-scope="app/pages/tables/widgets/borderedTable.html"></div></div></div></div><div class="row"><div class="col-lg-6 col-md-12"><div ba-panel="" ba-panel-title="Condensed Table" ba-panel-class="with-scroll table-panel"><div include-with-scope="app/pages/tables/widgets/condensedTable.html"></div></div></div><div class="col-lg-6 col-md-12"><div ba-panel="" ba-panel-title="Striped Rows" ba-panel-class="with-scroll table-panel"><div include-with-scope="app/pages/tables/widgets/stripedRows.html"></div></div></div></div><div class="row"><div class="col-lg-6 col-md-12"><div ba-panel="" ba-panel-title="Contextual Table" ba-panel-class="with-scroll table-panel"><div include-with-scope="app/pages/tables/widgets/contextualTable.html"></div></div></div><div class="col-lg-6 col-md-12"><div ba-panel="" ba-panel-title="Responsive Table" ba-panel-class="with-scroll table-panel"><div include-with-scope="app/pages/tables/widgets/responsiveTable.html"></div></div></div></div></div>'), e.put("app/pages/tables/smart/tables.html", '<div class="widgets"><div class="row"><div class="col-md-12"><div ba-panel="" ba-panel-title="Editable Rows" ba-panel-class="with-scroll"><div include-with-scope="app/pages/tables/widgets/editableRowTable.html"></div></div></div></div><div class="row"><div class="col-md-12"><div ba-panel="" ba-panel-title="Editable Cells" ba-panel-class="with-scroll"><div include-with-scope="app/pages/tables/widgets/editableTable.html"></div></div></div></div><div class="row"><div class="col-md-12"><div ba-panel="" ba-panel-title="Smart Table With Filtering, Sorting And Pagination" ba-panel-class="with-scroll"><div include-with-scope="app/pages/tables/widgets/smartTable.html"></div></div></div></div></div>'), e.put("app/pages/tables/widgets/basicTable.html", '<div class="horizontal-scroll"><table class="table"><thead><tr><th class="browser-icons"></th><th>Browser</th><th class="align-right">Visits</th><th class="table-arr"></th><th class="align-right">Downloads</th><th class="table-arr"></th><th class="align-right">Purchases</th><th class="table-arr"></th><th class="align-right">DAU</th><th class="table-arr"></th><th class="align-right">MAU</th><th class="table-arr"></th><th class="align-right">LTV</th><th class="table-arr"></th><th class="align-right">Users %</th><th class="table-arr"></th></tr></thead><tbody><tr><td><img src="img/chrome.svg" width="20" height="20"></td><td class="nowrap">Google Chrome</td><td class="align-right">10,392</td><td class="table-arr"><i class="icon-up"></i></td><td class="align-right">3,822</td><td class="table-arr"><i class="icon-up"></i></td><td class="align-right">4,214</td><td class="table-arr"><i class="icon-up"></i></td><td class="align-right">899</td><td class="table-arr"><i class="icon-up"></i></td><td class="align-right">7,098</td><td class="table-arr"><i class="icon-up"></i></td><td class="align-right">178</td><td class="table-arr"><i class="icon-up"></i></td><td class="align-right">45%</td><td class="table-arr"><i class="icon-up"></i></td></tr><tr><td><img src="img/firefox.svg" width="20" height="20"></td><td class="nowrap">Mozilla Firefox</td><td class="align-right">7,873</td><td class="table-arr"><i class="icon-down"></i></td><td class="align-right">6,003</td><td class="table-arr"><i class="icon-down"></i></td><td class="align-right">3,031</td><td class="table-arr"><i class="icon-up"></i></td><td class="align-right">897</td><td class="table-arr"><i class="icon-down"></i></td><td class="align-right">8,997</td><td class="table-arr"><i class="icon-up"></i></td><td class="align-right">102</td><td class="table-arr"><i class="icon-down"></i></td><td class="align-right">28%</td><td class="table-arr"><i class="icon-up"></i></td></tr><tr><td><img src="img/ie.svg" width="20" height="20"></td><td class="nowrap">Internet Explorer</td><td class="align-right">5,890</td><td class="table-arr"><i class="icon-down"></i></td><td class="align-right">3,492</td><td class="table-arr"><i class="icon-down"></i></td><td class="align-right">2,102</td><td class="table-arr"><i class="icon-down"></i></td><td class="align-right">27</td><td class="table-arr"><i class="icon-up"></i></td><td class="align-right">4,039</td><td class="table-arr"><i class="icon-down"></i></td><td class="align-right">99</td><td class="table-arr"><i class="icon-up"></i></td><td class="align-right">17%</td><td class="table-arr"><i class="icon-down"></i></td></tr><tr><td><img src="img/safari.svg" width="20" height="20"></td><td class="nowrap">Safari</td><td class="align-right">4,001</td><td class="table-arr"><i class="icon-up"></i></td><td class="align-right">2,039</td><td class="table-arr"><i class="icon-up"></i></td><td class="align-right">1,001</td><td class="table-arr"><i class="icon-down"></i></td><td class="align-right">104</td><td class="table-arr"><i class="icon-down"></i></td><td class="align-right">3,983</td><td class="table-arr"><i class="icon-down"></i></td><td class="align-right">209</td><td class="table-arr"><i class="icon-down"></i></td><td class="align-right">14%</td><td class="table-arr"><i class="icon-down"></i></td></tr><tr><td><img src="img/opera.svg" width="20" height="20"></td><td class="nowrap">Opera</td><td class="align-right">1,833</td><td class="table-arr"><i class="icon-up"></i></td><td class="align-right">983</td><td class="table-arr"><i class="icon-up"></i></td><td class="align-right">83</td><td class="table-arr"><i class="icon-up"></i></td><td class="align-right">19</td><td class="table-arr"><i class="icon-down"></i></td><td class="align-right">1,099</td><td class="table-arr"><i class="icon-down"></i></td><td class="align-right">103</td><td class="table-arr"><i class="icon-up"></i></td><td class="align-right">5%</td><td class="table-arr"><i class="icon-up"></i></td></tr></tbody></table></div>'), e.put("app/pages/tables/widgets/borderedTable.html", '<div class="horizontal-scroll"><table class="table table-bordered"><thead><tr><th class="browser-icons"></th><th>Browser</th><th class="align-right">Visits</th><th class="align-right">Purchases</th><th class="align-right">%</th></tr></thead><tbody><tr ng-repeat="item in metricsTableData"><td><img ng-src="{{::( item.image | appImage )}}" width="20" height="20"></td><td ng-class="nowrap">{{item.browser}}</td><td class="align-right">{{item.visits}}</td><td class="align-right">{{item.purchases}}</td><td class="align-right">{{item.percent}}</td></tr></tbody></table></div>'), e.put("app/pages/tables/widgets/condensedTable.html", '<div class="horizontal-scroll"><table class="table table-condensed"><thead><tr><th class="table-id">#</th><th>First Name</th><th>Last Name</th><th>Username</th><th>Email</th><th>Status</th></tr></thead><tbody><tr ng-repeat="item in peopleTableData"><td class="table-id">{{item.id}}</td><td>{{item.firstName}}</td><td>{{item.lastName}}</td><td>{{item.username}}</td><td><a class="email-link" ng-href="mailto:{{item.email}}">{{item.email}}</a></td><td><button class="status-button btn btn-xs btn-{{item.status}}">{{item.status}}</button></td></tr></tbody></table></div>'), e.put("app/pages/tables/widgets/contextualTable.html", '<table class="table"><tr><th>#</th><th>First Name</th><th>Last Name</th><th>Username</th><th>Email</th><th>Age</th></tr><tr class="primary"><td>1</td><td>Mark</td><td>Otto</td><td>@mdo</td><td><a class="email-link" ng-href="mailto:mdo@gmail.com" href="mailto:mdo@gmail.com">mdo@gmail.com</a></td><td>28</td></tr><tr class="success"><td>2</td><td>Jacob</td><td>Thornton</td><td>@fat</td><td><a class="email-link" ng-href="mailto:fat@yandex.ru" href="mailto:fat@yandex.ru">fat@yandex.ru</a></td><td>45</td></tr><tr class="warning"><td>3</td><td>Larry</td><td>Bird</td><td>@twitter</td><td><a class="email-link" ng-href="mailto:twitter@outlook.com" href="mailto:twitter@outlook.com">twitter@outlook.com</a></td><td>18</td></tr><tr class="danger"><td>4</td><td>John</td><td>Snow</td><td>@snow</td><td><a class="email-link" ng-href="mailto:snow@gmail.com" href="mailto:snow@gmail.com">snow@gmail.com</a></td><td>20</td></tr><tr class="info"><td>5</td><td>Jack</td><td>Sparrow</td><td>@jack</td><td><a class="email-link" ng-href="mailto:jack@yandex.ru" href="mailto:jack@yandex.ru">jack@yandex.ru</a></td><td>30</td></tr></table>'), e.put("app/pages/tables/widgets/editableRowTable.html", '<div class="add-row-editable-table"><button class="btn btn-primary" ng-click="addUser()">Add row</button></div><table class="table table-bordered table-hover table-condensed"><tr><td></td><td>Name</td><td>Status</td><td>Group</td><td>Actions</td></tr><tr ng-repeat="user in users" class="editable-row"><td>{{$index}}</td><td><span editable-text="user.name" e-name="name" e-form="rowform" e-required="">{{ user.name || \'empty\' }}</span></td><td class="select-td"><span editable-select="user.status" e-name="status" e-form="rowform" e-selectpicker="" e-ng-options="s.value as s.text for s in statuses">{{ showStatus(user) }}</span></td><td class="select-td"><span editable-select="user.group" e-name="group" onshow="loadGroups()" e-form="rowform" e-selectpicker="" e-ng-options="g.id as g.text for g in groups">{{ showGroup(user) }}</span></td><td><form editable-form="" name="rowform" ng-show="rowform.$visible" class="form-buttons form-inline" shown="inserted == user"><button type="submit" ng-disabled="rowform.$waiting" class="btn btn-primary editable-table-button btn-xs">Save</button> <button type="button" ng-disabled="rowform.$waiting" ng-click="rowform.$cancel()" class="btn btn-default editable-table-button btn-xs">Cancel</button></form><div class="buttons" ng-show="!rowform.$visible"><button class="btn btn-primary editable-table-button btn-xs" ng-click="rowform.$show()">Edit</button> <button class="btn btn-danger editable-table-button btn-xs" ng-click="removeUser($index)">Delete</button></div></td></tr></table>'), e.put("app/pages/tables/widgets/editableTable.html", '<div class="horizontal-scroll"><table class="table table-hover" st-table="editableTableData"><tr class="sortable header-row"><th class="table-id" st-sort="id" st-sort-default="true">#</th><th st-sort="firstName">First Name</th><th st-sort="lastName">Last Name</th><th st-sort="username">Username</th><th st-sort="email">Email</th><th st-sort="age">Age</th></tr><tr ng-repeat="item in editableTableData" class="editable-tr-wrap"><td class="table-id">{{item.id}}</td><td><span editable-text="item.firstName" blur="cancel">{{item.firstName}}</span></td><td><span editable-text="item.lastName" blur="cancel">{{item.lastName}}</span></td><td><span editable-text="item.username" blur="cancel">{{item.username}}</span></td><td><a class="email-link" ng-href="mailto:{{item.email}}">{{item.email}}</a></td><td><span editable-text="item.age" blur="cancel">{{item.age}}</span></td></tr><tfoot><tr><td colspan="6" class="text-center"><div st-pagination="" st-items-by-page="12" st-displayed-pages="5"></div></td></tr></tfoot></table></div>'), e.put("app/pages/tables/widgets/hoverRows.html", '<div class="horizontal-scroll"><table class="table table-hover"><thead><tr class="black-muted-bg"><th class="browser-icons"></th><th>Browser</th><th class="align-right">Visits</th><th class="table-arr"></th><th class="align-right">Purchases</th><th class="table-arr"></th><th class="align-right">%</th><th class="table-arr"></th></tr></thead><tbody><tr ng-repeat="item in metricsTableData" class="no-top-border"><td><img ng-src="{{::( item.image | appImage )}}" width="20" height="20"></td><td ng-class="nowrap">{{item.browser}}</td><td class="align-right">{{item.visits}}</td><td class="table-arr"><i ng-class="{\'icon-up\': item.isVisitsUp, \'icon-down\': !item.isVisitsUp }"></i></td><td class="align-right">{{item.purchases}}</td><td class="table-arr"><i ng-class="{\'icon-up\': item.isPurchasesUp, \'icon-down\': !item.isPurchasesUp }"></i></td><td class="align-right">{{item.percent}}</td><td class="table-arr"><i ng-class="{\'icon-up\': item.isPercentUp, \'icon-down\': !item.isPercentUp }"></i></td></tr></tbody></table></div>'), e.put("app/pages/tables/widgets/responsiveTable.html", '<div class="table-responsive"><table class="table"><tr><th>#</th><th>First Name</th><th>Last Name</th><th>Username</th><th>Email</th><th>Age</th></tr><tr><td>1</td><td>Mark</td><td>Otto</td><td>@mdo</td><td><a class="email-link" ng-href="mailto:mdo@gmail.com" href="mailto:mdo@gmail.com">mdo@gmail.com</a></td><td>28</td></tr><tr><td>2</td><td>Jacob</td><td>Thornton</td><td>@fat</td><td><a class="email-link" ng-href="mailto:fat@yandex.ru" href="mailto:fat@yandex.ru">fat@yandex.ru</a></td><td>45</td></tr><tr><td>3</td><td>Larry</td><td>Bird</td><td>@twitter</td><td><a class="email-link" ng-href="mailto:twitter@outlook.com" href="mailto:twitter@outlook.com">twitter@outlook.com</a></td><td>18</td></tr><tr><td>4</td><td>John</td><td>Snow</td><td>@snow</td><td><a class="email-link" ng-href="mailto:snow@gmail.com" href="mailto:snow@gmail.com">snow@gmail.com</a></td><td>20</td></tr><tr><td>5</td><td>Jack</td><td>Sparrow</td><td>@jack</td><td><a class="email-link" ng-href="mailto:jack@yandex.ru" href="mailto:jack@yandex.ru">jack@yandex.ru</a></td><td>30</td></tr></table></div>'), e.put("app/pages/tables/widgets/smartTable.html", '<div class="horizontal-scroll"><div class="form-group select-page-size-wrap"><label>Rows on page<select class="form-control selectpicker show-tick" title="Rows on page" selectpicker="" ng-model="smartTablePageSize" ng-options="i for i in [5,10,15,20,25]"></select></label></div><table class="table" st-table="smartTableData"><thead><tr class="sortable"><th class="table-id" st-sort="id" st-sort-default="true">#</th><th st-sort="firstName">First Name</th><th st-sort="lastName">Last Name</th><th st-sort="username">Username</th><th st-sort="email">Email</th><th st-sort="age">Age</th></tr><tr><th></th><th><input st-search="firstName" placeholder="Search First Name" class="input-sm form-control search-input" type="search"></th><th><input st-search="lastName" placeholder="Search Last Name" class="input-sm form-control search-input" type="search"></th><th><input st-search="username" placeholder="Search Username" class="input-sm form-control search-input" type="search"></th><th><input st-search="email" placeholder="Search Email" class="input-sm form-control search-input" type="search"></th><th><input st-search="age" placeholder="Search Age" class="input-sm form-control search-input" type="search"></th></tr></thead><tbody><tr ng-repeat="item in smartTableData"><td class="table-id">{{item.id}}</td><td>{{item.firstName}}</td><td>{{item.lastName}}</td><td>{{item.username}}</td><td><a class="email-link" ng-href="mailto:{{item.email}}">{{item.email}}</a></td><td>{{item.age}}</td></tr></tbody><tfoot><tr><td colspan="6" class="text-center"><div st-pagination="" st-items-by-page="smartTablePageSize" st-displayed-pages="5"></div></td></tr></tfoot></table></div>'), e.put("app/pages/tables/widgets/stripedRows.html", '<div class="vertical-scroll"><table class="table table-striped"><thead><tr><th class="table-id">#</th><th>First Name</th><th>Last Name</th><th>Username</th><th>Email</th><th>Age</th></tr></thead><tbody><tr ng-repeat="item in smartTableData"><td class="table-id">{{item.id}}</td><td>{{item.firstName}}</td><td>{{item.lastName}}</td><td>{{item.username}}</td><td><a class="email-link" ng-href="mailto:{{item.email}}">{{item.email}}</a></td><td>{{item.age}}</td></tr></tbody></table></div>'), e.put("app/pages/ui/alerts/alerts.html", '<div class="widgets"><div class="row"><div class="col-md-6" ba-panel="" ba-panel-title="Basic" ba-panel-class="with-scroll"><div><div class="alert bg-success"><strong>Well done!</strong> You successfully read this important alert message.</div><div class="alert bg-info"><strong>Heads up!</strong> This alert needs your attention, but it\'s not super important.</div><div class="alert bg-warning"><strong>Warning!</strong> Better check yourself, you\'re not looking too good.</div><div class="alert bg-danger"><strong>Oh snap!</strong> Change a few things up and try submitting again.</div></div></div><div class="col-md-6" ba-panel="" ba-panel-title="Dismissible alerts" ba-panel-class="with-scroll"><div><div class="alert bg-success closeable" role="alert"><button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button> <strong>Well done!</strong> You successfully read this important alert message.</div><div class="alert bg-info closeable" role="alert"><button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button> <strong>Heads up!</strong> This alert needs your attention, but it\'s not super important.</div><div class="alert bg-warning closeable" role="alert"><button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button> <strong>Warning!</strong> Better check yourself, you\'re not looking too good.</div><div class="alert bg-danger closeable" role="alert"><button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button> <strong>Oh snap!</strong> Change a few things up and try submitting again.</div></div></div></div><div class="row"><div class="col-md-6" ba-panel="" ba-panel-title="Links in alerts" ba-panel-class="with-scroll"><div><div class="alert bg-success"><strong>Well done!</strong> You successfully read <a href="" class="alert-link">this important alert message</a>.</div><div class="alert bg-info"><strong>Heads up!</strong> This <a href="" class="alert-link">alert needs your attention</a>, but it\'s not super important.</div><div class="alert bg-warning"><strong>Warning!</strong> Better check yourself, you\'re <a href="" class="alert-link">not looking too good</a>.</div><div class="alert bg-danger"><strong>Oh snap!</strong> <a href="" class="alert-link">Change a few things up</a> and try submitting again.</div></div></div><div class="col-md-6" ba-panel="" ba-panel-title="Composite alerts" ba-panel-class="with-scroll"><div><div class="alert bg-warning"><h4>Warning!</h4><strong>Pay attention.</strong> Change a few things up and try submitting again.<div class="control-alert"><button type="button" class="btn btn-danger">Pay Attention</button> <button type="button" class="btn btn-primary">Ignore</button></div></div></div></div></div></div>'), e.put("app/pages/ui/buttons/buttons.html", '<div class="widgets"><div class="row"><div class="col-md-3" ba-panel="" ba-panel-title="Flat Buttons" ba-panel-class="with-scroll button-panel"><div class="button-wrapper"><button type="button" class="btn btn-default">Default</button></div><div class="button-wrapper"><button type="button" class="btn btn-primary">Primary</button></div><div class="button-wrapper"><button type="button" class="btn btn-success">Success</button></div><div class="button-wrapper"><button type="button" class="btn btn-info">Info</button></div><div class="button-wrapper"><button type="button" class="btn btn-warning">Warning</button></div><div class="button-wrapper"><button type="button" class="btn btn-danger">Danger</button></div></div><div class="col-md-3" ba-panel="" ba-panel-title="Raised Buttons" ba-panel-class="with-scroll button-panel"><div class="button-wrapper"><button type="button" class="btn btn-default btn-raised">Default</button></div><div class="button-wrapper"><button type="button" class="btn btn-primary btn-raised">Primary</button></div><div class="button-wrapper"><button type="button" class="btn btn-success btn-raised">Success</button></div><div class="button-wrapper"><button type="button" class="btn btn-info btn-raised">Info</button></div><div class="button-wrapper"><button type="button" class="btn btn-warning btn-raised">Warning</button></div><div class="button-wrapper"><button type="button" class="btn btn-danger btn-raised">Danger</button></div></div><div class="col-md-3" ba-panel="" ba-panel-title="Different sizes" ba-panel-class="with-scroll button-panel df-size-button-panel"><div class="button-wrapper"><button type="button" class="btn btn-default btn-xs">Default</button></div><div class="button-wrapper"><button type="button" class="btn btn-primary btn-sm">Primary</button></div><div class="button-wrapper"><button type="button" class="btn btn-success btn-mm">Success</button></div><div class="button-wrapper"><button type="button" class="btn btn-info btn-md">Info</button></div><div class="button-wrapper"><button type="button" class="btn btn-warning btn-xm">Warning</button></div><div class="button-wrapper"><button type="button" class="btn btn-danger btn-lg">Danger</button></div></div><div class="col-md-3" ba-panel="" ba-panel-title="Disabled" ba-panel-class="with-scroll button-panel"><div class="button-wrapper"><button type="button" class="btn btn-default" disabled="disabled">Default</button></div><div class="button-wrapper"><button type="button" class="btn btn-primary" disabled="disabled">Primary</button></div><div class="button-wrapper"><button type="button" class="btn btn-success" disabled="disabled">Success</button></div><div class="button-wrapper"><button type="button" class="btn btn-info" disabled="disabled">Info</button></div><div class="button-wrapper"><button type="button" class="btn btn-warning" disabled="disabled">Warning</button></div><div class="button-wrapper"><button type="button" class="btn btn-danger" disabled="disabled">Danger</button></div></div></div><div class="row"><div class="col-md-6"><div ba-panel="" ba-panel-title="Icon Buttons" ba-panel-class="with-scroll"><div ng-include="\'app/pages/ui/buttons/widgets/iconButtons.html\'"></div></div><div ba-panel="" ba-panel-title="Large Buttons" ba-panel-class="with-scroll large-buttons-panel"><div ng-include="\'app/pages/ui/buttons/widgets/largeButtons.html\'"></div></div></div><div class="col-md-6"><div ba-panel="" ba-panel-title="Button Dropdowns" ba-panel-class="with-scroll"><div ng-include="\'app/pages/ui/buttons/widgets/dropdowns.html\'"></div></div><div ba-panel="" ba-panel-title="Button Groups" ba-panel-class="with-scroll"><div ng-include="\'app/pages/ui/buttons/widgets/buttonGroups.html\'"></div></div></div></div><div class="row"><div class="col-md-12" ba-panel="" ba-panel-title="Progress Buttons" ba-panel-class="with-scroll"><div ng-include="\'app/pages/ui/buttons/widgets/progressButtons.html\'"></div></div></div></div>'), e.put("app/pages/ui/grid/baseGrid.html", '<h4 class="grid-h">Stacked to horizontal</h4><div class="row show-grid"><div class="col-md-1"><div>.col-md-1</div></div><div class="col-md-1"><div>.col-md-1</div></div><div class="col-md-1"><div>.col-md-1</div></div><div class="col-md-1"><div>.col-md-1</div></div><div class="col-md-1"><div>.col-md-1</div></div><div class="col-md-1"><div>.col-md-1</div></div><div class="col-md-1"><div>.col-md-1</div></div><div class="col-md-1"><div>.col-md-1</div></div><div class="col-md-1"><div>.col-md-1</div></div><div class="col-md-1"><div>.col-md-1</div></div><div class="col-md-1"><div>.col-md-1</div></div><div class="col-md-1"><div>.col-md-1</div></div></div><div class="row show-grid"><div class="col-md-8"><div>.col-md-8</div></div><div class="col-md-4"><div>.col-md-4</div></div></div><div class="row show-grid"><div class="col-md-4"><div>.col-md-4</div></div><div class="col-md-4"><div>.col-md-4</div></div><div class="col-md-4"><div>.col-md-4</div></div></div><div class="row show-grid"><div class="col-md-6"><div>.col-md-6</div></div><div class="col-md-6"><div>.col-md-6</div></div></div><h4 class="grid-h">Mobile and desktop</h4><div class="row show-grid"><div class="col-xs-12 col-md-8"><div>xs-12 .col-md-8</div></div><div class="col-xs-6 col-md-4"><div>xs-6 .col-md-4</div></div></div><div class="row show-grid"><div class="col-xs-6 col-md-4"><div>xs-6 .col-md-4</div></div><div class="col-xs-6 col-md-4"><div>xs-6 .col-md-4</div></div><div class="col-xs-6 col-md-4"><div>xs-6 .col-md-4</div></div></div><div class="row show-grid"><div class="col-xs-6"><div>.col-xs-6</div></div><div class="col-xs-6"><div>.col-xs-6</div></div></div><h4 class="grid-h">Mobile, tablet, desktop</h4><div class="row show-grid"><div class="col-xs-12 col-sm-6 col-md-8"><div>.col-xs-12 .col-sm-6 .col-md-8</div></div><div class="col-xs-6 col-md-4"><div>.col-xs-6 .col-md-4</div></div></div><div class="row show-grid"><div class="col-xs-6 col-sm-4"><div>.col-xs-6 .col-sm-4</div></div><div class="col-xs-6 col-sm-4"><div>.col-xs-6 .col-sm-4</div></div><div class="clearfix visible-xs-block"></div><div class="col-xs-6 col-sm-4"><div>.col-xs-6 .col-sm-4</div></div></div><h4 class="grid-h">Column wrapping</h4><div class="row show-grid"><div class="col-xs-9"><div>.col-xs-9</div></div><div class="col-xs-4"><div>.col-xs-4<br>Since 9 + 4 = 13 &gt; 12, this 4-column-wide div gets wrapped onto a new line as one contiguous unit.</div></div><div class="col-xs-6"><div>.col-xs-6<br>Subsequent columns continue along the new line.</div></div></div><h4 class="grid-h">Responsive column resets</h4><div class="row show-grid"><div class="col-xs-6 col-sm-3"><div>.col-xs-6 .col-sm-3<p>Resize your viewport or check it out on your phone for an example.</p></div></div><div class="col-xs-6 col-sm-3"><div>.col-xs-6 .col-sm-3</div></div><div class="clearfix visible-xs-block"></div><div class="col-xs-6 col-sm-3"><div>.col-xs-6 .col-sm-3</div></div><div class="col-xs-6 col-sm-3"><div>.col-xs-6 .col-sm-3</div></div></div><h4 class="grid-h">Offsetting columns</h4><div class="row show-grid"><div class="col-md-4"><div>.col-md-4</div></div><div class="col-md-4 col-md-offset-4"><div>.col-md-4 .col-md-offset-4</div></div></div><div class="row show-grid"><div class="col-md-3 col-md-offset-3"><div>.col-md-3 .col-md-offset-3</div></div><div class="col-md-3 col-md-offset-3"><div>.col-md-3 .col-md-offset-3</div></div></div><div class="row show-grid"><div class="col-md-6 col-md-offset-3"><div>.col-md-6 .col-md-offset-3</div></div></div><h4 class="grid-h">Grid options</h4><div class="table-responsive"><table class="table table-bordered table-striped"><thead><tr><th></th><th>Extra small devices <small>Phones (&lt;768px)</small></th><th>Small devices <small>Tablets (â‰¥768px)</small></th><th>Medium devices <small>Desktops (â‰¥992px)</small></th><th>Large devices <small>Desktops (â‰¥1200px)</small></th></tr></thead><tbody><tr><th class="text-nowrap" scope="row">Grid behavior</th><td>Horizontal at all times</td><td colspan="3">Collapsed to start, horizontal above breakpoints</td></tr><tr><th class="text-nowrap" scope="row">Container width</th><td>None (auto)</td><td>750px</td><td>970px</td><td>1170px</td></tr><tr><th class="text-nowrap" scope="row">Class prefix</th><td><code>.col-xs-</code></td><td><code>.col-sm-</code></td><td><code>.col-md-</code></td><td><code>.col-lg-</code></td></tr><tr><th class="text-nowrap" scope="row"># of columns</th><td colspan="4">12</td></tr><tr><th class="text-nowrap" scope="row">Column width</th><td class="text-muted">Auto</td><td>~62px</td><td>~81px</td><td>~97px</td></tr><tr><th class="text-nowrap" scope="row">Gutter width</th><td colspan="4">30px (15px on each side of a column)</td></tr><tr><th class="text-nowrap" scope="row">Nestable</th><td colspan="4">Yes</td></tr><tr><th class="text-nowrap" scope="row">Offsets</th><td colspan="4">Yes</td></tr><tr><th class="text-nowrap" scope="row">Column ordering</th><td colspan="4">Yes</td></tr></tbody></table></div>'),
            e.put("app/pages/ui/grid/grid.html", '<div class="widgets"><div class="row"><div class="col-md-12" ba-panel="" ba-panel-title="Inline Form" ba-panel-class="with-scroll"><div ng-include="\'app/pages/ui/grid/baseGrid.html\'"></div></div></div></div>'), e.put("app/pages/ui/icons/icons.html", '<div class="widgets"><div class="row"><div class="col-md-6"><div ba-panel="" ba-panel-title="Kameleon SVG Icons" ba-panel-class="with-scroll"><div include-with-scope="app/pages/ui/icons/widgets/kameleon.html"></div></div><div ba-panel="" ba-panel-title="Socicon" ba-panel-class="with-scroll"><div include-with-scope="app/pages/ui/icons/widgets/socicon.html"></div></div></div><div class="col-md-6"><div ba-panel="" ba-panel-title="Icons With Rounded Background" ba-panel-class="with-scroll"><div include-with-scope="app/pages/ui/icons/widgets/kameleonRounded.html"></div></div><div ba-panel="" ba-panel-title="ionicons" ba-panel-class="with-scroll"><div include-with-scope="app/pages/ui/icons/widgets/ionicons.html"></div></div><div ba-panel="" ba-panel-title="Font Awesome Icons" ba-panel-class="with-scroll"><div include-with-scope="app/pages/ui/icons/widgets/fontAwesomeIcons.html"></div></div></div></div></div>'), e.put("app/pages/ui/notifications/notifications.html", '<div ba-panel="" ba-panel-class="with-scroll notification-panel"><div class="row"><div class="col-md-3 col-sm-4"><div class="control"><label for="title">Title</label> <input ng-model="options.title" type="text" class="form-control" id="title" placeholder="Enter a title ..."></div><div class="control"><label for="message">Message</label> <textarea ng-model="options.msg" class="form-control" id="message" rows="3" placeholder="Enter a message ..."></textarea></div><div class="control-group"><div class="control"><label class="checkbox-inline custom-checkbox nowrap"><input ng-model="options.closeButton" type="checkbox" id="closeButton"> <span>Close Button</span></label></div><div class="control"><label class="checkbox-inline custom-checkbox nowrap"><input ng-model="options.allowHtml" type="checkbox" id="html"> <span>Allow html</span></label></div><div class="control"><label class="checkbox-inline custom-checkbox nowrap"><input ng-model="options.progressBar" type="checkbox" id="progressBar"> <span>Progress bar</span></label></div><div class="control"><label class="checkbox-inline custom-checkbox nowrap"><input ng-model="options.preventDuplicates" type="checkbox" id="preventDuplicates"> <span>Prevent duplicates</span></label></div><div class="control"><label class="checkbox-inline custom-checkbox nowrap"><input ng-model="options.preventOpenDuplicates" type="checkbox" id="preventOpenDuplicates"> <span>Prevent open duplicates</span></label></div><div class="control"><label class="checkbox-inline custom-checkbox nowrap"><input ng-model="options.tapToDismiss" type="checkbox" id="tapToDismiss"> <span>Tap to dismiss</span></label></div><div class="control"><label class="checkbox-inline custom-checkbox nowrap"><input ng-model="options.newestOnTop" type="checkbox" id="newestOnTop"> <span>Newest on top</span></label></div></div></div><div class="col-md-2 col-sm-3 toastr-radio-setup"><div id="toastTypeGroup"><div class="controls radio-controls"><label class="radio-header">Toast Type</label> <label class="radio custom-radio"><input type="radio" ng-model="options.type" name="toasts" value="success"><span>Success</span></label> <label class="radio custom-radio"><input type="radio" ng-model="options.type" name="toasts" value="info"><span>Info</span></label> <label class="radio custom-radio"><input type="radio" ng-model="options.type" name="toasts" value="warning"><span>Warning</span></label> <label class="radio custom-radio"><input type="radio" ng-model="options.type" name="toasts" value="error"><span>Error</span></label></div></div><div id="positionGroup"><div class="controls radio-controls"><label class="radio-header position-header">Position</label> <label class="radio custom-radio"><input type="radio" ng-model="options.positionClass" name="positions" value="toast-top-right"> <span>Top Right</span></label> <label class="radio custom-radio"><input type="radio" ng-model="options.positionClass" name="positions" value="toast-bottom-right"> <span>Bottom Right</span></label> <label class="radio custom-radio"><input type="radio" ng-model="options.positionClass" name="positions" value="toast-bottom-left"> <span>Bottom Left</span></label> <label class="radio custom-radio"><input type="radio" ng-model="options.positionClass" name="positions" value="toast-top-left"> <span>Top Left</span></label> <label class="radio custom-radio"><input type="radio" ng-model="options.positionClass" name="positions" value="toast-top-full-width"> <span>Top Full Width</span></label> <label class="radio custom-radio"><input type="radio" ng-model="options.positionClass" name="positions" value="toast-bottom-full-width"> <span>Bottom Full Width</span></label> <label class="radio custom-radio"><input type="radio" ng-model="options.positionClass" name="positions" value="toast-top-center"> <span>Top Center</span></label> <label class="radio custom-radio"><input type="radio" ng-model="options.positionClass" name="positions" value="toast-bottom-center"> <span>Bottom Center</span></label></div></div></div><div class="col-md-2 col-sm-3"><div class="control"><label for="timeOut">Time out</label> <input type="text" class="form-control" id="timeOut" ng-model="options.timeOut" placeholder="ms"> <label class="sub-label" for="timeOut">If you set it to 0, it will stick</label></div><div class="control"><label for="extendedTimeOut">Extended time out</label> <input type="text" class="form-control" id="extendedTimeOut" ng-model="options.extendedTimeOut" placeholder="ms"></div><div class="control"><label for="maxOpened">Maximum number of toasts</label> <input type="text" class="form-control" id="maxOpened" ng-model="options.maxOpened" value="0"> <label for="maxOpened" class="sub-label">0 means no limit</label></div><div class="control"><label class="checkbox-inline custom-checkbox nowrap"><input ng-model="options.autoDismiss" type="checkbox" id="autoDismiss"> <span>Auto dismiss</span></label></div></div><div class="col-md-5 col-sm-12"><label>Result:</label><pre class="result-toastr" id="toastrOptions">{{optionsStr}}</pre></div></div><div class="row"><div class="col-md-12 button-row"><button ng-click="openToast()" class="btn btn-primary">Open Toast</button> <button ng-click="openRandomToast()" class="btn btn-primary">Random Toast</button> <button ng-click="clearToasts()" class="btn btn-danger">Clear Toasts</button> <button ng-click="clearLastToast()" class="btn btn-danger">Clear Last Toast</button></div></div></div>'), e.put("app/pages/ui/modals/modals.html", '<div class="widgets"><div class="row"><div class="col-md-12" ba-panel="" ba-panel-title="Modals" ba-panel-class="with-scroll"><div class="modal-buttons clearfix"><button type="button" class="btn btn-primary" data-toggle="modal" ng-click="open(\'app/pages/ui/modals/modalTemplates/basicModal.html\', \'md\')">Default modal</button> <button type="button" class="btn btn-success" data-toggle="modal" ng-click="open(\'app/pages/ui/modals/modalTemplates/largeModal.html\', \'lg\')">Large modal</button> <button type="button" class="btn btn-warning" data-toggle="modal" ng-click="open(\'app/pages/ui/modals/modalTemplates/smallModal.html\', \'sm\')">Small modal</button></div></div></div><div class="row"><div class="col-md-6" ba-panel="" ba-panel-title="Message Modals" ba-panel-class="with-scroll"><div class="modal-buttons same-width clearfix"><button type="button" class="btn btn-success" data-toggle="modal" ng-click="open(\'app/pages/ui/modals/modalTemplates/successModal.html\')">Success Message</button> <button type="button" class="btn btn-info" data-toggle="modal" ng-click="open(\'app/pages/ui/modals/modalTemplates/infoModal.html\')">Info Message</button> <button type="button" class="btn btn-warning" data-toggle="modal" ng-click="open(\'app/pages/ui/modals/modalTemplates/warningModal.html\')">Warning Message</button> <button type="button" class="btn btn-danger" data-toggle="modal" ng-click="open(\'app/pages/ui/modals/modalTemplates/dangerModal.html\')">Danger Message</button></div></div><div class="col-md-6" ba-panel="" ba-panel-title="Notifications" ba-panel-class="with-scroll"><div ng-include="\'app/pages/ui/modals/notifications/notifications.html\'"></div></div></div></div>'), e.put("app/pages/ui/panels/panels.html", '<h2>Default panels</h2><div class="row"><div class="col-md-12 col-lg-4"><div ba-panel="" ba-panel-class="xsmall-panel light-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ac mi erat. Phasellus placerat, elit a laoreet semper, enim ipsum ultricies orci, ac tincidunt tellus massa eu est. Nam non porta purus, sed facilisis justo. Nam pulvinar sagittis quam.</div></div><div class="col-md-12 col-lg-4"><div ba-panel="" ba-panel-title="Panel with header" ba-panel-class="xsmall-panel light-text">Phasellus maximus venenatis augue, et vestibulum neque aliquam ut. Morbi mattis libero vitae vulputate dignissim. Praesent placerat, sem non dapibus cursus, lacus nisi blandit quam, vitae porttitor lectus lacus non turpis. Donec suscipit consequat tellus.</div></div><div class="col-md-12 col-lg-4"><div ba-panel="" ba-panel-title="Panel with header & scroll" ba-panel-class="xsmall-panel with-scroll light-text"><p>Suspendisse nec tellus urna. Sed id est metus. Nullam sit amet dolor nec ipsum dictum suscipit. Mauris sed nisi mauris. Nulla iaculis nisl ut velit ornare imperdiet. Suspendisse potenti. In tempor leo sed sem malesuada pellentesque. Maecenas faucibus metus lacus, ac egestas diam vulputate vitae.</p><p>Sed dapibus, purus vel hendrerit consectetur, lectus orci gravida massa, sed bibendum dui mauris et eros. Nulla dolor massa, posuere et dictum sit amet, dignissim quis odio. Fusce mollis finibus dignissim. Integer sodales augue erat. Pellentesque laoreet vestibulum urna at iaculis. Nulla libero augue, euismod at diam eget, aliquam condimentum ligula. Donec a leo eu est molestie lacinia hendrerit sed lorem. Duis id diam eu metus sodales consequat vel eu elit. Praesent dolor nibh, convallis eleifend feugiat a, finibus porttitor nibh. Ut non libero vel velit pulvinar scelerisque non vel lorem. Integer porta tempor nulla. Sed nibh erat, ultrices vel lorem eu, rutrum vehicula sem.</p><p>Donec nec tellus urna. Sed id est metus. Nullam sit amet dolor nec ipsum dictum suscipit. Mauris sed nisi mauris. Nulla iaculis nisl ut velit ornare imperdiet. Suspendisse potenti. In tempor leo sed sem malesuada pellentesque. Maecenas faucibus metus lacus, ac egestas diam vulputate vitae.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque fermentum nec ligula egestas rhoncus. Sed dignissim, augue vel scelerisque vulputate, nisi ante posuere lorem, quis iaculis eros dolor eu nisl. Etiam sagittis, ipsum ac tempor iaculis, justo neque mattis ante, ac maximus sapien risus eu sapien. Morbi erat urna, varius et lectus vel, porta dictum orci. Duis bibendum euismod elit, et lobortis purus venenatis in. Mauris eget lacus enim. Cras quis sem et magna fringilla convallis. Proin hendrerit nulla vel gravida mollis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum consectetur quis purus vel aliquam.</p></div></div></div><h2>Bootstrap panels</h2><div class="row"><div class="col-md-12 col-lg-4"><div class="panel panel-default bootstrap-panel xsmall-panel"><div class="panel-body"><p>A panel in bootstrap is a bordered box with some padding around its content.</p><p class="p-with-code">Panels are created with the <code>.panel</code> class, and content inside the panel has a <code>.panel-body</code> class. The <code>.panel-default .panel-primary .panel-danger</code> and other classes are used to style the color of the panel. See the next example on this page for more contextual classes.</p></div></div></div><div class="col-md-12 col-lg-4"><div class="panel panel-default bootstrap-panel xsmall-panel"><div class="panel-heading">Panel Heading</div><div class="panel-body"><p class="p-with-code">The <code>.panel-heading</code> class adds a heading to the panel.Easily add a heading container to your panel with .panel-heading. You may also include any <code>h1-h6</code> with a <code>.panel-title</code> class to add a pre-styled heading.</p></div></div></div><div class="col-md-12 col-lg-4"><div class="panel panel-default bootstrap-panel"><div class="panel-body footer-panel"><p class="p-with-code">Wrap buttons or secondary text in <code>.panel-footer</code>. Note that panel footers do not inherit colors and borders when using contextual variations as they are not meant to be in the foreground.</p></div><div class="panel-footer">Panel Footer</div></div></div></div><h2>Panels with Contextual Classes</h2><div class="row"><div class="col-md-6 col-lg-4"><div class="panel panel-default contextual-example-panel bootstrap-panel"><div class="panel-heading">Panel with panel-default class</div><div class="panel-body">To color the panel, use contextual classes. This is sample <code>.panel-default</code> panel</div></div></div><div class="col-md-6 col-lg-4"><div class="panel panel-primary contextual-example-panel bootstrap-panel"><div class="panel-heading">Panel with panel-primary class</div><div class="panel-body">Sample <code>.panel-primary</code> panel</div></div></div><div class="col-md-6 col-lg-4"><div class="panel panel-success contextual-example-panel bootstrap-panel"><div class="panel-heading">Panel with panel-success class</div><div class="panel-body">Sample <code>.panel-success</code> panel</div></div></div><div class="col-md-6 col-lg-4"><div class="panel panel-info contextual-example-panel bootstrap-panel"><div class="panel-heading">Panel with panel-info class</div><div class="panel-body">Sample <code>.panel-info</code> panel</div></div></div><div class="col-md-6 col-lg-4"><div class="panel panel-warning contextual-example-panel bootstrap-panel"><div class="panel-heading">Panel with panel-warning class</div><div class="panel-body">Sample <code>.panel-warning</code> panel</div></div></div><div class="col-md-6 col-lg-4"><div class="panel panel-danger contextual-example-panel bootstrap-panel"><div class="panel-heading">Panel with panel-danger class</div><div class="panel-body">Sample <code>.panel-danger</code> panel</div></div></div></div><div class="row"><div class="col-md-12"><h2>Panel Group</h2><div class="panel-group"><div class="panel panel-default bootstrap-panel"><div class="panel-heading">Panel group 1</div><div class="panel-body"><p>To group many panels together, wrap a <code>&lt;div&gt;</code> with class <code>\n            .panel-group</code> around them.</p></div></div><div class="panel panel-default bootstrap-panel"><div class="panel-heading">Panel group 2</div><div class="panel-body"><p>The <code>.panel-group</code> class clears the bottom-margin of each panel.</p></div></div></div></div></div>'), e.put("app/pages/ui/progressBars/progressBars.html", '<div class="widgets"><div class="row"><div class="col-md-6"><div ba-panel="" ba-panel-title="Basic" ba-panel-class="with-scroll"><div ng-include="\'app/pages/ui/progressBars/widgets/basic.html\'"></div></div><div ba-panel="" ba-panel-title="Striped" ba-panel-class="with-scroll"><div ng-include="\'app/pages/ui/progressBars/widgets/striped.html\'"></div></div></div><div class="col-md-6"><div ba-panel="" ba-panel-title="With label" ba-panel-class="with-scroll"><div ng-include="\'app/pages/ui/progressBars/widgets/label.html\'"></div></div><div ba-panel="" ba-panel-title="Animated" ba-panel-class="with-scroll"><div ng-include="\'app/pages/ui/progressBars/widgets/animated.html\'"></div></div></div></div><div class="row"><div class="col-md-12" ba-panel="" ba-panel-title="Stacked" ba-panel-class="with-scroll"><div ng-include="\'app/pages/ui/progressBars/widgets/stacked.html\'"></div></div></div></div>'), e.put("app/pages/ui/slider/slider.html", '<div class="row"><div class="col-md-12"><div ba-panel="" ba-panel-title="Ion Range Slider" ba-panel-class="with-scroll"><div class="slider-box"><h5>Basic</h5><ion-slider type="single" grid="false" min="0" max="100" from="45" disable="false"></ion-slider></div><div class="slider-box"><h5>With prefix</h5><ion-slider type="single" grid="true" min="100" max="1200" prefix="$" from="420" disable="false"></ion-slider></div><div class="slider-box"><h5>With postfix</h5><ion-slider type="single" grid="true" min="-90" max="90" postfix="Â°" from="36" disable="false"></ion-slider></div><div class="slider-box"><h5>Two way range</h5><ion-slider type="double" grid="true" min="100" max="1200" from="420" to="900" disable="false"></ion-slider></div><div class="slider-box"><h5>With Steps</h5><ion-slider type="single" grid="true" min="0" max="1000" from="300" step="50" disable="false"></ion-slider></div><div class="slider-box"><h5>Decorating numbers</h5><ion-slider type="single" grid="true" min="0" max="1000000" from="300000" step="1000" prettify-separator="." prettify="true" disable="false"></ion-slider></div><div class="slider-box"><h5>Using custom values array</h5><ion-slider type="single" grid="true" from="5" step="1000" values="[\'January\', \'February\', \'March\', \'April\', \'May\', \'June\', \'July\', \'August\', \'September\', \'October\', \'November\', \'December\']" disable="false"></ion-slider></div><div class="slider-box"><h5>Disabled</h5><ion-slider type="single" grid="false" min="0" max="100" from="45" disable="true"></ion-slider></div></div></div></div>'), e.put("app/pages/ui/tabs/contextualAccordion.html", '<uib-accordion><uib-accordion-group heading="Primary" panel-class="panel-primary bootstrap-panel accordion-panel">Primary <i class="ion-heart"></i></uib-accordion-group><uib-accordion-group heading="Success" panel-class="panel-success bootstrap-panel accordion-panel">Success <i class="ion-checkmark-round"></i></uib-accordion-group><uib-accordion-group heading="Info" panel-class="panel-info bootstrap-panel accordion-panel">Info <i class="ion-information-circled"></i></uib-accordion-group><uib-accordion-group heading="Warning" panel-class="panel-warning bootstrap-panel accordion-panel">Warning <i class="ion-alert"></i></uib-accordion-group><uib-accordion-group heading="Danger" panel-class="panel-danger bootstrap-panel accordion-panel">Danger <i class="ion-nuclear"></i></uib-accordion-group></uib-accordion>'), e.put("app/pages/ui/tabs/mainTabs.html", '<uib-tabset><uib-tab heading="Start"><p>Take up one idea. Make that one idea your life--think of it, dream of it, live on that idea. Let the brain, muscles, nerves, every part of your body, be full of that idea, and just leave every other idea alone. This is the way to success.</p><p>People who succeed have momentum. The more they succeed, the more they want to succeed, and the more they find a way to succeed. Similarly, when someone is failing, the tendency is to get on a downward spiral that can even become a self-fulfilling prophecy.</p><div class="text-center"><div class="kameleon-icon with-round-bg primary inline-icon"><img ng-src="{{::( \'Shop\' | kameleonImg )}}"></div><div class="kameleon-icon with-round-bg primary inline-icon"><img ng-src="{{::( \'Programming\' | kameleonImg )}}"></div><div class="kameleon-icon with-round-bg primary inline-icon"><img ng-src="{{::( \'Dna\' | kameleonImg )}}"></div></div><p>The reason most people never reach their goals is that they don\'t define them, or ever seriously consider them as believable or achievable. Winners can tell you where they are going, what they plan to do along the way, and who will be sharing the adventure with them.</p></uib-tab><uib-tab heading="Getting Done"><p>You can\'t connect the dots looking forward; you can only connect them looking backwards. So you have to trust that the dots will somehow connect in your future. You have to trust in something--your gut, destiny, life, karma, whatever. This approach has never let me down, and it has made all the difference in my life.</p><p>The reason most people never reach their goals is that they don\'t define them, or ever seriously consider them as believable or achievable. Winners can tell you where they are going, what they plan to do along the way, and who will be sharing the adventure with them.</p></uib-tab><uib-tab ng-init="$dropdownTabActive = 1" class="with-dropdown"><uib-tab-heading uib-dropdown=""><a uib-dropdown-toggle="" ng-click="$event.stopPropagation()">Dropdown tab <i class="caret"></i></a><ul class="uib-dropdown-menu"><li><a ng-click="$dropdownTabActive = 1">Tab 1</a></li><li><a ng-click="$dropdownTabActive = 2">Tab 2</a></li></ul></uib-tab-heading><div ng-show="$dropdownTabActive == 1"><p>Success is ... knowing your purpose in life, growing to reach your maximum potential, and sowing seeds that benefit others.</p><p>Failure is the condiment that gives success its flavor.</p></div><div ng-show="$dropdownTabActive == 2"><p class="text-center"><button class="btn btn-danger">I\'m just a dummy button</button></p></div></uib-tab></uib-tabset>'), e.put("app/pages/ui/tabs/sampleAccordion.html", '<uib-accordion><uib-accordion-group is-open="true" heading="Static Header, initially expanded" panel-class="bootstrap-panel accordion-panel panel-default">This content is straight in the template.</uib-accordion-group><uib-accordion-group heading="Dynamic Body Content" panel-class="bootstrap-panel accordion-panel panel-default"><p>The body of the uib-accordion group grows to fit the contents</p><button type="button" class="btn btn-primary btn-sm">Add Item</button></uib-accordion-group><uib-accordion-group heading="Custom template" panel-class="bootstrap-panel accordion-panel panel-default">Hello</uib-accordion-group><uib-accordion-group panel-class="bootstrap-panel accordion-panel panel-default"><uib-accordion-heading>I can have markup, too! <i class="fa pull-right ion-settings"></i></uib-accordion-heading>This is just some content to illustrate fancy headings.</uib-accordion-group></uib-accordion>'), e.put("app/pages/ui/tabs/sideTabs.html", '<div ba-panel="" ba-panel-class="tabs-panel xsmall-panel with-scroll"><uib-tabset class="tabs-left"><uib-tab heading="Start"><p class="text-center">Take up one idea.</p><div class="kameleon-icon-tabs kameleon-icon with-round-bg danger"><img ng-src="{{::( \'Key\' | kameleonImg )}}"></div><p>People who succeed have momentum. The more they succeed, the more they want to succeed, and the more they find a way to succeed.</p></uib-tab><uib-tab heading="Get it done"><p>You can\'t connect the dots looking forward; you can only connect them looking backwards. So you have to trust that the dots will somehow connect in your future. You have to trust in something--your gut, destiny, life, karma, whatever. This approach has never let me down, and it has made all the difference in my life.</p><p>The reason most people never reach their goals is that they don\'t define them, or ever seriously consider them as believable or achievable. Winners can tell you where they are going, what they plan to do along the way, and who will be sharing the adventure with them.</p></uib-tab><uib-tab heading="Achieve"><p>Success is ... knowing your purpose in life, growing to reach your maximum potential, and sowing seeds that benefit others.</p><p>Failure is the condiment that gives success its flavor.</p></uib-tab></uib-tabset></div><div ba-panel="" ba-panel-class="tabs-panel xsmall-panel with-scroll"><uib-tabset class="tabs-right"><uib-tab heading="Start"><p class="text-center">Take up one idea.</p><div class="kameleon-icon-tabs kameleon-icon with-round-bg warning"><img ng-src="{{::( \'Phone-Booth\' | kameleonImg )}}"></div><p>People who succeed have momentum. The more they succeed, the more they want to succeed, and the more they find a way to succeed.</p></uib-tab><uib-tab heading="Get it done"><p>You can\'t connect the dots looking forward; you can only connect them looking backwards. So you have to trust that the dots will somehow connect in your future. You have to trust in something--your gut, destiny, life, karma, whatever. This approach has never let me down, and it has made all the difference in my life.</p><p>The reason most people never reach their goals is that they don\'t define them, or ever seriously consider them as believable or achievable. Winners can tell you where they are going, what they plan to do along the way, and who will be sharing the adventure with them.</p></uib-tab><uib-tab heading="Achieve"><p>Success is ... knowing your purpose in life, growing to reach your maximum potential, and sowing seeds that benefit others.</p><p>Failure is the condiment that gives success its flavor.</p></uib-tab></uib-tabset></div>'), e.put("app/pages/ui/tabs/tabs.html", '<div><div class="row"><div class="col-md-6"><div ba-panel="" ba-panel-class="with-scroll horizontal-tabs tabs-panel medium-panel"><div ng-include="\'app/pages/ui/tabs/mainTabs.html\'"></div></div></div><div class="col-md-6 tabset-group" ng-include="\'app/pages/ui/tabs/sideTabs.html\'"></div></div><div class="row accordions-row"><div class="col-md-6" ng-include="\'app/pages/ui/tabs/sampleAccordion.html\'"></div><div class="col-md-6" ng-include="\'app/pages/ui/tabs/contextualAccordion.html\'"></div></div></div>'), e.put("app/pages/ui/typography/typography.html", '<div class="typography-document-samples row-fluid"><div class="col-xlg-3 col-lg-6 col-md-6 col-sm-6 col-xs-12 typography-widget"><div ba-panel="" ba-panel-class="with-scroll heading-widget" ba-panel-title="Text Size"><div class="section-block"><h1>H1. Heading 1</h1><p>Lorem ipsum dolor sit amet, id mollis iaculis mi nisl pulvinar, lacinia scelerisque pharetra, placerat vestibulum eleifend pellentesque.</p></div><div class="section-block"><h2>H2. Heading 2</h2><p>Lorem ipsum dolor sit amet, id mollis iaculis mi nisl pulvinar, lacinia scelerisque pharetra, placerat vestibulum eleifend pellentesque.</p></div><div class="section-block"><h3>H3. Heading 3</h3><p>Lorem ipsum dolor sit amet, id mollis iaculis mi nisl pulvinar, lacinia scelerisque pharetra, placerat vestibulum eleifend pellentesque.</p></div><div class="section-block"><h4>H4. Heading 4</h4><p>Lorem ipsum dolor sit amet, id mollis iaculis mi nisl pulvinar, lacinia scelerisque pharetra,.</p></div><div class="section-block"><h5>H5. Heading 5</h5><p>Lorem ipsum dolor sit amet, id mollis iaculis mi nisl pulvinar, lacinia scelerisque pharetra.</p></div></div></div><div class="col-xlg-3 col-lg-6 col-md-6 col-sm-6 col-xs-12 typography-widget"><div ba-panel="" ba-panel-class="with-scroll more-text-widget" ba-panel-title="Some more text"><div class="section-block light-text"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales at. Nulla tellus elit, varius non commodo eget, mattis vel eros. In sed ornare nulla. Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis.</p></div><div class="section-block regular-text"><p>Curabitur bibendum ornare dolor, quis ullamcorper ligula dfgz`zzsodales at. Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam id dolor id.</p></div><div class="section-block upper-text bold-text"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales at. Nulla tellus elit, varius non commodo eget, mattis vel eros. In sed ornare nulla.</p></div><div class="section-block bold-text"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullam-corper ligula sodales at. Nulla tellus elit, varius non commodo eget, mattis vel eros. In sed ornare nulla.</p></div><div class="section-block small-text"><p>Secondary text. Lorem ipsum dolor sit amet, id mollis iaculis mi nisl pulvinar,</p><p>lacinia scelerisque pharetra, placerat vestibulum eleifend</p><p>pellentesque, mi nam.</p></div></div></div><div class="col-xlg-3 col-lg-6 col-md-6 col-sm-6 col-xs-12 typography-widget"><div ba-panel="" ba-panel-class="with-scroll lists-widget" ba-panel-title="Lists"><div class="section-block"><h5 class="list-header">Unordered list:</h5><ul class="blur"><li>Lorem ipsum dolor sit amet</li><li>Ð¡lacinia scelerisque pharetra<ul><li>Dui rhoncus quisque integer lorem<ul><li>Libero iaculis vestibulum eu vitae</li></ul></li></ul></li><li>Nisl lectus nibh habitasse suspendisse ut</li><li><span>Posuere cursus hac, vestibulum wisi nulla bibendum</span></li></ul><h5 class="list-header">Ordered Lists:</h5><ol class="blur"><li><span>Eu non nec cursus quis mollis, amet quam nec</span></li><li><span>Et suspendisse, adipiscing fringilla ornare sit ligula sed</span><ol><li><span>Interdum et justo nulla</span><ol><li><span>Magna amet, suscipit suscipit non amet</span></li></ol></li></ol></li><li><span>Metus duis eu non eu ridiculus turpis</span></li><li><span>Neque egestas id fringilla consectetuer justo curabitur, wisi magna neque commodo volutpat</span></li></ol><div class="accent">Important text fragment. Lorem ipsum dolor sit amet, id mollis iaculis mi nisl pulvinar, lacinia scelerisque pharetra.</div></div></div></div><div class="col-xlg-3 col-lg-6 col-md-6 col-sm-6 col-xs-12 typography-widget"><div ba-panel="" ba-panel-class="with-scroll color-widget" ba-panel-title="Text Color"><div class="section-block red-text"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales at. Nulla tellus elit, varius non commodo eget, mattis vel eros. In sed ornare nulla. Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p></div><div class="section-block yellow-text"><p>Curabitur bibendum ornare dolor, quis ullamcorper ligula dfgz`zzsodales at. Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam id dolor id nibh ultricies vehicula ut id elit. In sed ornare nulla.</p></div><div class="section-block links"><p>Lorem ipsum <a href="">dolor</a> sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis <a href="">ullamcorper</a> ligula sodales at. Nulla tellus elit, varius non commodo eget, <a href="">mattis</a> vel eros. In sed ornare nulla.</p></div><div class="section-block links"><p><a href="">Active link â€” #209e91</a></p><p class="hovered"><a href="">Hover link â€” #17857a</a></p></div></div></div></div><div class="row-fluid"><div class="col-lg-12 col-sm-12 col-xs-12"><div ba-panel="" ba-panel-class="banner-column-panel"><div class="banner"><div class="large-banner-wrapper"><img ng-src="{{::( \'app/typography/banner.png\' | appImage )}}" alt=""></div><div class="banner-text-wrapper"><div class="banner-text"><h1>Simple Banner Text</h1><p>Lorem ipsum dolor sit amet</p><p>Odio amet viverra rutrum</p></div></div></div><div class="section"><h2>Columns</h2><div class="row"><div class="col-sm-6"><div class="img-wrapper"><img ng-src="{{::( \'app/typography/typo03.png\' | appImage )}}" alt="" title=""></div><p>Vel elit, eros elementum, id lacinia, duis non ut ut tortor blandit. Mauris <a href="">dapibus</a> magna rutrum. Ornare neque suspendisse <a href="">phasellus wisi</a>, quam cras pede rutrum suspendisse, <a href="">felis amet eu</a>. Congue magna elit quisque quia, nullam justo sagittis, ante erat libero placerat, proin condimentum consectetuer lacus. Velit condimentum velit, sed penatibus arcu nulla.</p></div><div class="col-sm-6"><div class="img-wrapper"><img ng-src="{{::( \'app/typography/typo01.png\' | appImage )}}" alt="" title=""></div><p>Et suspendisse, adipiscing fringilla ornare sit ligula sed, vel nam. Interdum et justo nulla, fermentum lobortis purus ut eu, duis nibh dolor massa tristique elementum, nibh iste potenti risus fusce aliquet fusce, ullamcorper debitis primis arcu tellus vestibulum ac.</p></div></div><div class="separator"></div><div class="row"><div class="col-sm-4"><h4>Column heading example</h4><div class="img-wrapper"><img ng-src="{{::( \'app/typography/typo04.png\' | appImage )}}" alt=""></div><p>Eget augue, lacus erat ante egestas scelerisque aliquam, metus molestie leo in habitasse magna maecenas</p><a href="" class="learn-more">Lean more</a></div><div class="col-sm-4"><h4>Yet another column heading example</h4><div class="img-wrapper"><img ng-src="{{::( \'app/typography/typo05.png\' | appImage )}}" alt=""></div><p>Augue massa et parturient, suspendisse orci nec scelerisque sit, integer nam mauris pede consequat in velit</p><a href="" class="learn-more">Lean more</a></div><div class="col-sm-4"><h4>Third column heading example</h4><div class="img-wrapper"><img ng-src="{{::( \'app/typography/typo06.png\' | appImage )}}" alt=""></div><p>Eget turpis, tortor lobortis porttitor, vestibulum nullam vehicula aliquam</p><a href="" class="learn-more">Lean more</a></div></div><div class="separator"></div></div></div></div></div>'),
            e.put("app/theme/components/baSidebar/ba-sidebar.html", '<aside class="al-sidebar" ng-swipe-right="$baSidebarService.setMenuCollapsed(false)" ng-swipe-left="$baSidebarService.setMenuCollapsed(true)" ng-mouseleave="hoverElemTop=selectElemTop"><ul class="al-sidebar-list" slimscroll="{height: \'{{menuHeight}}px\'}" slimscroll-watch="menuHeight"><li ng-repeat="item in ::menuItems" class="al-sidebar-list-item" ng-class="::{\'with-sub-menu\': item.subMenu}" ui-sref-active="selected" ba-sidebar-toggling-item="item"><a ng-mouseenter="hoverItem($event, item)" ui-state="item.stateRef || \'\'" ng-href="{{::(item.fixedHref ? item.fixedHref: \'\')}}" ng-if="::!item.subMenu" class="al-sidebar-list-link"><i class="{{ ::item.icon }}"></i><span>{{ ::item.title }}</span></a> <a ng-mouseenter="hoverItem($event, item)" ng-if="::item.subMenu" class="al-sidebar-list-link" ba-ui-sref-toggler=""><i class="{{ ::item.icon }}"></i><span>{{ ::item.title }}</span> <b class="fa fa-angle-down" ui-sref-active="fa-angle-up" ng-if="::item.subMenu"></b></a><ul ng-if="::item.subMenu" class="al-sidebar-sublist" ng-class="{\'slide-right\': item.slideRight}" ba-ui-sref-toggling-submenu=""><li ng-repeat="subitem in ::item.subMenu" ng-class="::{\'with-sub-menu\': subitem.subMenu}" ui-sref-active="selected" ba-sidebar-toggling-item="subitem" class="ba-sidebar-sublist-item"><a ng-mouseenter="hoverItem($event, item)" ng-if="::subitem.subMenu" ba-ui-sref-toggler="" class="al-sidebar-list-link subitem-submenu-link"><span>{{ ::subitem.title }}</span> <b class="fa" ng-class="{\'fa-angle-up\': subitem.expanded, \'fa-angle-down\': !subitem.expanded}" ng-if="::subitem.subMenu"></b></a><ul ng-if="::subitem.subMenu" class="al-sidebar-sublist subitem-submenu-list" ng-class="{expanded: subitem.expanded, \'slide-right\': subitem.slideRight}" ba-ui-sref-toggling-submenu=""><li ng-mouseenter="hoverItem($event, item)" ng-repeat="subSubitem in ::subitem.subMenu" ui-sref-active="selected"><a ng-mouseenter="hoverItem($event, item)" ui-state="subSubitem.stateRef || \'\'" ng-href="{{::(subSubitem.fixedHref ? subSubitem.fixedHref: \'\')}}">{{ ::subSubitem.title }}</a></li></ul><a ng-mouseenter="hoverItem($event, item)" target="{{::(subitem.blank ? \'_blank\' : \'_self\')}}" ng-if="::!subitem.subMenu" ui-state="subitem.stateRef || \'\'" ng-href="{{::(subitem.fixedHref ? subitem.fixedHref: \'\')}}">{{ ::subitem.title}}</a></li></ul></li></ul><div class="sidebar-hover-elem" ng-style="{top: hoverElemTop + \'px\', height: hoverElemHeight + \'px\'}" ng-class="{\'show-hover-elem\': showHoverElem }"></div></aside>'), e.put("app/theme/components/baWizard/baWizard.html", '<div class="ba-wizard"><div class="ba-wizard-navigation-container"><div ng-repeat="t in $baWizardController.tabs" class="ba-wizard-navigation {{$baWizardController.tabNum == $index ? \'active\' : \'\'}}" ng-click="$baWizardController.selectTab($index)">{{t.title}}</div></div><div class="progress ba-wizard-progress"><div class="progress-bar progress-bar-danger active" role="progressbar" aria-valuemin="0" aria-valuemax="100" ng-style="{width: $baWizardController.progress + \'%\'}"></div></div><div class="steps" ng-transclude=""></div><nav><ul class="pager ba-wizard-pager"><li class="previous"><button ng-disabled="$baWizardController.isFirstTab()" ng-click="$baWizardController.previousTab()" type="button" class="btn btn-primary"><span aria-hidden="true">&larr;</span> previous</button></li><li class="next"><button ng-disabled="$baWizardController.isLastTab()" ng-click="$baWizardController.nextTab()" type="button" class="btn btn-primary">next <span aria-hidden="true">&rarr;</span></button></li></ul></nav></div>'), e.put("app/theme/components/baWizard/baWizardStep.html", '<section ng-show="selected" class="step" ng-transclude=""></section>'), e.put("app/theme/components/backTop/backTop.html", '<i class="fa fa-angle-up back-top" id="backTop" title="Back to Top"></i>'), e.put("app/theme/components/contentTop/contentTop.html", '<div class="content-top clearfix"><h1 class="al-title">{{ activePageTitle }}</h1><ul class="breadcrumb al-breadcrumb"><li><a href="#/dashboard">Home</a></li><li>{{ activePageTitle }}</li></ul></div>'), e.put("app/theme/components/msgCenter/msgCenter.html", '<ul class="al-msg-center clearfix"><li uib-dropdown=""><a href="" uib-dropdown-toggle=""><i class="fa fa-bell-o"></i><span>5</span><div class="notification-ring"></div></a><div uib-dropdown-menu="" class="top-dropdown-menu"><i class="dropdown-arr"></i><div class="header clearfix"><strong>Notifications</strong> <a href="">Mark All as Read</a> <a href="">Settings</a></div><div class="msg-list"><a href="" class="clearfix" ng-repeat="msg in notifications"><div class="img-area"><img ng-class="{\'photo-msg-item\' : !msg.image}" ng-src="{{::( msg.image || (users[msg.userId].name | profilePicture) )}}"></div><div class="msg-area"><div ng-bind-html="getMessage(msg)"></div><span>{{ msg.time }}</span></div></a></div><a href="">See all notifications</a></div></li><li uib-dropdown=""><a href="" class="msg" uib-dropdown-toggle=""><i class="fa fa-envelope-o"></i><span>5</span><div class="notification-ring"></div></a><div uib-dropdown-menu="" class="top-dropdown-menu"><i class="dropdown-arr"></i><div class="header clearfix"><strong>Messages</strong> <a href="">Mark All as Read</a> <a href="">Settings</a></div><div class="msg-list"><a href="" class="clearfix" ng-repeat="msg in messages"><div class="img-area"><img class="photo-msg-item" ng-src="{{::( users[msg.userId].name | profilePicture )}}"></div><div class="msg-area"><div>{{ msg.text }}</div><span>{{ msg.time }}</span></div></a></div><a href="">See all messages</a></div></li></ul>'), e.put("app/theme/components/pageTop/pageTop.html", '<div class="page-top clearfix" scroll-position="scrolled" max-height="50" ng-class="{\'scrolled\': scrolled}"><a href="#/dashboard" class="al-logo clearfix"><span>Blur</span>Admin</a> <a href="" class="collapse-menu-link ion-navicon" ba-sidebar-toggle-menu=""></a><div class="search"><i class="ion-ios-search-strong" ng-click="startSearch()"></i> <input id="searchInput" type="text" placeholder="Search for..."></div><div class="user-profile clearfix"><div class="al-user-profile" uib-dropdown=""><a uib-dropdown-toggle="" class="profile-toggle-link"><img ng-src="{{::( \'Nasta\' | profilePicture )}}"></a><ul class="top-dropdown-menu profile-dropdown" uib-dropdown-menu=""><li><i class="dropdown-arr"></i></li><li><a href="#/profile"><i class="fa fa-user"></i>Profile</a></li><li><a href=""><i class="fa fa-cog"></i>Settings</a></li><li><a href="" class="signout"><i class="fa fa-power-off"></i>Sign out</a></li></ul></div><msg-center></msg-center></div><div class="questions-section">Have questions? <a href="mailto:contact@akveo.com">contact@akveo.com</a></div></div>'), e.put("app/theme/components/widgets/widgets.html", '<div class="widgets"><div ng-repeat="widgetBlock in ngModel" ng-class="{\'row\': widgetBlock.widgets.length > 1}"><div ng-repeat="widgetCol in widgetBlock.widgets" ng-class="{\'col-md-6\': widgetBlock.widgets.length === 2}" ng-model="widgetCol" class="widgets-block"><div ba-panel="" ba-panel-title="{{::widget.title}}" ng-repeat="widget in widgetCol" ba-panel-class="with-scroll {{widget.panelClass}}"><div ng-include="widget.url"></div></div></div></div></div>'), e.put("app/pages/components/mail/composeBox/compose.html", '<div class="compose-header"><span>New message</span> <span class="header-controls"><i class="ion-minus-round"></i> <i class="ion-arrow-resize"></i> <i ng-click="$dismiss()" class="ion-close-round"></i></span></div><div><input type="text" class="form-control compose-input default-color" placeholder="To" ng-model="boxCtrl.to"> <input type="text" class="form-control compose-input default-color" placeholder="Subject" ng-model="boxCtrl.subject"><div class="compose-container"><text-angular-toolbar ta-toolbar-class="toolbarMain" name="toolbarMain" ta-toolbar="[[\'h1\',\'h2\',\'h3\',\'bold\',\'italics\', \'underline\', \'justifyLeft\', \'justifyCenter\', \'justifyRight\', \'justifyFull\']]"></text-angular-toolbar><text-angular name="htmlcontent" ta-target-toolbars="toolbarMain,toolbarFooter" ng-model="boxCtrl.text"></text-angular></div></div><div class="compose-footer clearfix"><button type="button" ng-click="$dismiss()" class="btn btn-send">Send</button><text-angular-toolbar ta-toolbar-class="toolbarFooter" name="toolbarFooter" ta-toolbar="[[\'insertLink\', \'insertImage\', \'html\', \'quote\',\'insertVideo\']]"></text-angular-toolbar><div class="footer-controls"><i class="footer-control-first compose-footer-icon ion-arrow-down-b"></i> <i ng-click="$dismiss()" class="compose-footer-icon ion-android-delete"></i></div></div>'), e.put("app/pages/charts/amCharts/barChart/barChart.html", '<div id="barChart" class="admin-chart" ng-controller="BarChartCtrl"></div>'), e.put("app/pages/charts/amCharts/combinedChart/combinedChart.html", '<div id="zoomAxisChart" class="admin-chart" ng-controller="combinedChartCtrl"></div>'), e.put("app/pages/charts/amCharts/funnelChart/funnelChart.html", '<div id="funnelChart" class="admin-chart" ng-controller="FunnelChartCtrl"></div>'), e.put("app/pages/charts/amCharts/ganttChart/ganttChart.html", '<div id="gnattChart" class="admin-chart" ng-controller="ganttChartCtrl"></div>'), e.put("app/pages/charts/amCharts/lineChart/lineChart.html", '<div id="lineChart" class="admin-chart" ng-controller="LineChartCtrl"></div>'), e.put("app/pages/charts/amCharts/pieChart/pieChart.html", '<div id="pieChart" class="admin-chart" ng-controller="PieChartCtrl"></div>'), e.put("app/pages/charts/amCharts/areaChart/areaChart.html", '<div id="areaChart" class="admin-chart" ng-controller="AreaChartCtrl"></div>'), e.put("app/pages/components/mail/list/mailList.html", '<div class="side-message-navigation" ng-class="{\'expanded\': tabCtrl.navigationCollapsed}"><div class="mail-messages-control side-message-navigation-item"><div class="toggle-navigation-container"><a href="" class="collapse-navigation-link ion-navicon" ng-click="tabCtrl.navigationCollapsed=!tabCtrl.navigationCollapsed"></a></div><label class="checkbox-inline custom-checkbox nowrap"><input type="checkbox" id="inlineCheckbox01" value="option1"> <span class="select-all-label">Select All</span></label> <button type="button" class="btn btn-icon refresh-button"><i class="ion-refresh"></i></button><div class="btn-group" uib-dropdown=""><button type="button" class="btn more-button" uib-dropdown-toggle="">More <span class="caret"></span></button><ul uib-dropdown-menu=""><li><a href="">Action</a></li><li><a href="">Another action</a></li><li><a href="">Something else here</a></li><li role="separator" class="divider"></li><li><a href="">Separated link</a></li></ul></div></div><div class="messages"><table><tr ng-repeat="m in listCtrl.messages track by m.id | orderBy:\'-date\'" class="side-message-navigation-item little-human shineHover {{m.tag}}"><td class="check-td"><div class="mail-checkbox"><label class="checkbox-inline custom-checkbox nowrap"><input type="checkbox"> <span></span></label></div></td><td class="photo-td" ui-sref="components.mail.detail({id: m.id, label: listCtrl.label})"><img ng-src="{{m.name.split(\' \')[0] | profilePicture}}" class="little-human-picture"></td><td ui-sref="components.mail.detail({id: m.id, label: listCtrl.label})"><div class="name-container"><div><span class="name">{{m.name}}</span></div><div><span class="tag label label-primary {{m.tag}}">{{m.tag}}</span></div></div></td><td ui-sref="components.mail.detail({id: m.id, label: listCtrl.label})"><div class="additional-info"><span class="subject">{{m.subject}}</span></div></td><td ui-sref="components.mail.detail({id: m.id, label: listCtrl.label})"><div class="mail-body-part">{{m.body | plainText}}</div></td><td class="date"><span>{{m.date | date : \'MMM d HH:mm\'}}</span></td></tr></table></div></div>'), e.put("app/pages/form/layouts/widgets/basicForm.html", '<form><div class="form-group"><label for="exampleInputEmail1">Email address</label> <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Email"></div><div class="form-group"><label for="exampleInputPassword1">Password</label> <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"></div><div class="checkbox"><label class="custom-checkbox"><input type="checkbox"> <span>Check me out</span></label></div><button type="submit" class="btn btn-danger">Submit</button></form>'), e.put("app/pages/form/layouts/widgets/blockForm.html", '<div class="row"><div class="col-sm-6"><div class="form-group"><label for="inputFirstName">First Name</label> <input type="text" class="form-control" id="inputFirstName" placeholder="First Name"></div></div><div class="col-sm-6"><div class="form-group"><label for="inputLastName">Last Name</label> <input type="text" class="form-control" id="inputLastName" placeholder="Last Name"></div></div></div><div class="row"><div class="col-sm-6"><div class="form-group"><label for="inputFirstName">Email</label> <input type="email" class="form-control" id="inputEmail" placeholder="Email"></div></div><div class="col-sm-6"><div class="form-group"><label for="inputWebsite">Website</label> <input type="text" class="form-control" id="inputWebsite" placeholder="Website"></div></div></div><button type="submit" class="btn btn-primary">Submit</button>'), e.put("app/pages/form/layouts/widgets/formWithoutLabels.html", '<form><div class="form-group"><input type="text" class="form-control" placeholder="Recipients"></div><div class="form-group"><input type="text" class="form-control" placeholder="Subject"></div><div class="form-group"><textarea class="form-control" placeholder="Message"></textarea></div><button type="submit" class="btn btn-success">Send</button></form>'), e.put("app/pages/form/layouts/widgets/horizontalForm.html", '<form class="form-horizontal"><div class="form-group"><label for="inputEmail3" class="col-sm-2 control-label">Email</label><div class="col-sm-10"><input type="email" class="form-control" id="inputEmail3" placeholder="Email"></div></div><div class="form-group"><label for="inputPassword3" class="col-sm-2 control-label">Password</label><div class="col-sm-10"><input type="password" class="form-control" id="inputPassword3" placeholder="Password"></div></div><div class="form-group"><div class="col-sm-offset-2 col-sm-10"><div class="checkbox"><label class="custom-checkbox"><input type="checkbox"> <span>Remember me</span></label></div></div></div><div class="form-group"><div class="col-sm-offset-2 col-sm-10"><button type="submit" class="btn btn-warning">Sign in</button></div></div></form>'), e.put("app/pages/form/layouts/widgets/inlineForm.html", '<form class="row form-inline"><div class="form-group col-sm-3 col-xs-6"><input type="text" class="form-control" id="exampleInputName2" placeholder="Name"></div><div class="form-group col-sm-3 col-xs-6"><input type="email" class="form-control" id="exampleInputEmail2" placeholder="Email"></div><div class="checkbox"><label class="custom-checkbox"><input type="checkbox"> <span>Remember me</span></label></div><button type="submit" class="btn btn-primary">Send invitation</button></form>'), e.put("app/pages/ui/buttons/widgets/buttonGroups.html", '<div class="btn-group-example"><div class="btn-group" role="group" aria-label="Basic example"><button type="button" class="btn btn-danger">Left</button> <button type="button" class="btn btn-danger">Middle</button> <button type="button" class="btn btn-danger">Right</button></div></div><div class="btn-toolbar-example"><div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups"><div class="btn-group" role="group" aria-label="First group"><button type="button" class="btn btn-primary">1</button> <button type="button" class="btn btn-primary">2</button> <button type="button" class="btn btn-primary">3</button> <button type="button" class="btn btn-primary">4</button></div><div class="btn-group" role="group" aria-label="Second group"><button type="button" class="btn btn-primary">5</button> <button type="button" class="btn btn-primary">6</button> <button type="button" class="btn btn-primary">7</button></div><div class="btn-group" role="group" aria-label="Third group"><button type="button" class="btn btn-primary">8</button></div></div></div>'), e.put("app/pages/ui/buttons/widgets/buttons.html", '<div class="basic-btns"><div class="row"><div class="col-md-2"><h5>Default button</h5></div><div class="col-md-10"><div class="row btns-row btns-same-width-md"><div class="col-sm-2 col-xs-4"><button type="button" class="btn btn-primary">Primary</button></div><div class="col-sm-2 col-xs-4"><button type="button" class="btn btn-default">Default</button></div><div class="col-sm-2 col-xs-4"><button type="button" class="btn btn-success">Success</button></div><div class="col-sm-2 col-xs-4"><button type="button" class="btn btn-info">Info</button></div><div class="col-sm-2 col-xs-4"><button type="button" class="btn btn-warning">Warning</button></div><div class="col-sm-2 col-xs-4"><button type="button" class="btn btn-danger">Danger</button></div></div></div></div><div class="row"><div class="col-md-2"><h5 class="row-sm">Small button</h5></div><div class="col-md-10"><div class="row btns-row btns-same-width-md"><div class="col-sm-2 col-xs-4"><button type="button" class="btn btn-primary btn-sm">Primary</button></div><div class="col-sm-2 col-xs-4"><button type="button" class="btn btn-default btn-sm">Default</button></div><div class="col-sm-2 col-xs-4"><button type="button" class="btn btn-success btn-sm">Success</button></div><div class="col-sm-2 col-xs-4"><button type="button" class="btn btn-info btn-sm">Info</button></div><div class="col-sm-2 col-xs-4"><button type="button" class="btn btn-warning btn-sm">Warning</button></div><div class="col-sm-2 col-xs-4"><button type="button" class="btn btn-danger btn-sm">Danger</button></div></div></div></div><div class="row"><div class="col-md-2"><h5 class="row-xs">Extra small button</h5></div><div class="col-md-10"><div class="row btns-row btns-same-width-md"><div class="col-sm-2 col-xs-4"><button type="button" class="btn btn-primary btn-xs">Primary</button></div><div class="col-sm-2 col-xs-4"><button type="button" class="btn btn-default btn-xs">Default</button></div><div class="col-sm-2 col-xs-4"><button type="button" class="btn btn-success btn-xs">Success</button></div><div class="col-sm-2 col-xs-4"><button type="button" class="btn btn-info btn-xs">Info</button></div><div class="col-sm-2 col-xs-4"><button type="button" class="btn btn-warning btn-xs">Warning</button></div><div class="col-sm-2 col-xs-4"><button type="button" class="btn btn-danger btn-xs">Danger</button></div></div></div></div><div class="row"><div class="col-md-2"><h5>Disabled button</h5></div><div class="col-md-10"><div class="row btns-row btns-same-width-md"><div class="col-sm-2 col-xs-4"><button type="button" class="btn btn-primary" disabled="disabled">Primary</button></div><div class="col-sm-2 col-xs-4"><button type="button" class="btn btn-default" disabled="disabled">Default</button></div><div class="col-sm-2 col-xs-4"><button type="button" class="btn btn-success" disabled="disabled">Success</button></div><div class="col-sm-2 col-xs-4"><button type="button" class="btn btn-info" disabled="disabled">Info</button></div><div class="col-sm-2 col-xs-4"><button type="button" class="btn btn-warning" disabled="disabled">Warning</button></div><div class="col-sm-2 col-xs-4"><button type="button" class="btn btn-danger" disabled="disabled">Danger</button></div></div></div></div></div>'), e.put("app/pages/ui/buttons/widgets/dropdowns.html", '<div class="row btns-row"><div class="col-sm-4 col-xs-6"><div class="btn-group" uib-dropdown="" dropdown-append-to-body=""><button type="button" class="btn btn-primary" uib-dropdown-toggle="">Primary <span class="caret"></span></button><ul uib-dropdown-menu=""><li><a href="">Action</a></li><li><a href="">Another action</a></li><li><a href="">Something else here</a></li><li role="separator" class="divider"></li><li><a href="">Separated link</a></li></ul></div></div><div class="col-sm-4 col-xs-6"><div class="btn-group" uib-dropdown="" dropdown-append-to-body=""><button type="button" class="btn btn-success" uib-dropdown-toggle="">Success <span class="caret"></span></button><ul uib-dropdown-menu=""><li><a href="">Action</a></li><li><a href="">Another action</a></li><li><a href="">Something else here</a></li><li role="separator" class="divider"></li><li><a href="">Separated link</a></li></ul></div></div><div class="col-sm-4 col-xs-6"><div class="btn-group" uib-dropdown="" dropdown-append-to-body=""><button type="button" class="btn btn-info" uib-dropdown-toggle="">Info <span class="caret"></span></button><ul uib-dropdown-menu=""><li><a href="">Action</a></li><li><a href="">Another action</a></li><li><a href="">Something else here</a></li><li role="separator" class="divider"></li><li><a href="">Separated link</a></li></ul></div></div><div class="col-sm-4 col-xs-6"><div class="btn-group" uib-dropdown="" dropdown-append-to-body=""><button type="button" class="btn btn-default" uib-dropdown-toggle="">Default <span class="caret"></span></button><ul uib-dropdown-menu=""><li><a href="">Action</a></li><li><a href="">Another action</a></li><li><a href="">Something else here</a></li><li role="separator" class="divider"></li><li><a href="">Separated link</a></li></ul></div></div><div class="col-sm-4 col-xs-6"><div class="btn-group" uib-dropdown="" dropdown-append-to-body=""><button type="button" class="btn btn-warning" uib-dropdown-toggle="">Warning <span class="caret"></span></button><ul uib-dropdown-menu=""><li><a href="">Action</a></li><li><a href="">Another action</a></li><li><a href="">Something else here</a></li><li role="separator" class="divider"></li><li><a href="">Separated link</a></li></ul></div></div><div class="col-sm-4 col-xs-6"><div class="btn-group" uib-dropdown="" dropdown-append-to-body=""><button type="button" class="btn btn-danger" uib-dropdown-toggle="">Danger <span class="caret"></span></button><ul uib-dropdown-menu=""><li><a href="">Action</a></li><li><a href="">Another action</a></li><li><a href="">Something else here</a></li><li role="separator" class="divider"></li><li><a href="">Separated link</a></li></ul></div></div></div><h5 class="panel-subtitle">Split button dropdowns</h5><div class="row btns-row"><div class="col-sm-4 col-xs-6"><div class="btn-group" uib-dropdown="" dropdown-append-to-body=""><button type="button" class="btn btn-primary">Primary</button> <button type="button" class="btn btn-primary" uib-dropdown-toggle=""><span class="caret"></span> <span class="sr-only">Toggle Dropdown</span></button><ul uib-dropdown-menu=""><li><a href="">Action</a></li><li><a href="">Another action</a></li><li><a href="">Something else here</a></li><li role="separator" class="divider"></li><li><a href="">Separated link</a></li></ul></div></div><div class="col-sm-4 col-xs-6"><div class="btn-group" uib-dropdown="" dropdown-append-to-body=""><button type="button" class="btn btn-success">Success</button> <button type="button" class="btn btn-success" uib-dropdown-toggle=""><span class="caret"></span> <span class="sr-only">Toggle Dropdown</span></button><ul uib-dropdown-menu=""><li><a href="">Action</a></li><li><a href="">Another action</a></li><li><a href="">Something else here</a></li><li role="separator" class="divider"></li><li><a href="">Separated link</a></li></ul></div></div><div class="col-sm-4 col-xs-6"><div class="btn-group" uib-dropdown="" dropdown-append-to-body=""><button type="button" class="btn btn-info">Info</button> <button type="button" class="btn btn-info" uib-dropdown-toggle=""><span class="caret"></span> <span class="sr-only">Toggle Dropdown</span></button><ul uib-dropdown-menu=""><li><a href="">Action</a></li><li><a href="">Another action</a></li><li><a href="">Something else here</a></li><li role="separator" class="divider"></li><li><a href="">Separated link</a></li></ul></div></div><div class="col-sm-4 col-xs-6"><div class="btn-group" uib-dropdown="" dropdown-append-to-body=""><button type="button" class="btn btn-default">Default</button> <button type="button" class="btn btn-default" uib-dropdown-toggle=""><span class="caret"></span> <span class="sr-only">Toggle Dropdown</span></button><ul uib-dropdown-menu=""><li><a href="">Action</a></li><li><a href="">Another action</a></li><li><a href="">Something else here</a></li><li role="separator" class="divider"></li><li><a href="">Separated link</a></li></ul></div></div><div class="col-sm-4 col-xs-6"><div class="btn-group" uib-dropdown="" dropdown-append-to-body=""><button type="button" class="btn btn-warning">Warning</button> <button type="button" class="btn btn-warning" uib-dropdown-toggle=""><span class="caret"></span> <span class="sr-only">Toggle Dropdown</span></button><ul uib-dropdown-menu=""><li><a href="">Action</a></li><li><a href="">Another action</a></li><li><a href="">Something else here</a></li><li role="separator" class="divider"></li><li><a href="">Separated link</a></li></ul></div></div><div class="col-sm-4 col-xs-6"><div class="btn-group" uib-dropdown="" dropdown-append-to-body=""><button type="button" class="btn btn-danger">Danger</button> <button type="button" class="btn btn-danger" uib-dropdown-toggle=""><span class="caret"></span> <span class="sr-only">Toggle Dropdown</span></button><ul uib-dropdown-menu=""><li><a href="">Action</a></li><li><a href="">Another action</a></li><li><a href="">Something else here</a></li><li role="separator" class="divider"></li><li><a href="">Separated link</a></li></ul></div></div></div>'), e.put("app/pages/ui/buttons/widgets/iconButtons.html", '<ul class="btn-list clearfix"><li><button type="button" class="btn btn-primary btn-icon"><i class="ion-android-download"></i></button></li><li><button type="button" class="btn btn-default btn-icon"><i class="ion-stats-bars"></i></button></li><li><button type="button" class="btn btn-success btn-icon"><i class="ion-android-checkmark-circle"></i></button></li><li><button type="button" class="btn btn-info btn-icon"><i class="ion-information"></i></button></li><li><button type="button" class="btn btn-warning btn-icon"><i class="ion-android-warning"></i></button></li><li><button type="button" class="btn btn-danger btn-icon"><i class="ion-nuclear"></i></button></li></ul><h5 class="panel-subtitle">Buttons with icons</h5><ul class="btn-list clearfix"><li><button type="button" class="btn btn-primary btn-with-icon"><i class="ion-android-download"></i>Primary</button></li><li><button type="button" class="btn btn-default btn-with-icon"><i class="ion-stats-bars"></i>Default</button></li><li><button type="button" class="btn btn-success btn-with-icon"><i class="ion-android-checkmark-circle"></i>Success</button></li><li><button type="button" class="btn btn-info btn-with-icon"><i class="ion-information"></i>Info</button></li><li><button type="button" class="btn btn-warning btn-with-icon"><i class="ion-android-warning"></i>Warning</button></li><li><button type="button" class="btn btn-danger btn-with-icon"><i class="ion-nuclear"></i>Danger</button></li></ul>'), e.put("app/pages/ui/buttons/widgets/largeButtons.html", '<div class="row btns-row btns-same-width-lg"><div class="col-sm-4 col-xs-6"><button type="button" class="btn btn-primary btn-lg">Primary</button></div><div class="col-sm-4 col-xs-6"><button type="button" class="btn btn-success btn-lg">Success</button></div><div class="col-sm-4 col-xs-6"><button type="button" class="btn btn-info btn-lg">Info</button></div><div class="col-sm-4 col-xs-6"><button type="button" class="btn btn-default btn-lg">Default</button></div><div class="col-sm-4 col-xs-6"><button type="button" class="btn btn-warning btn-lg">Warning</button></div><div class="col-sm-4 col-xs-6"><button type="button" class="btn btn-danger btn-lg">Danger</button></div></div>'), e.put("app/pages/ui/buttons/widgets/progressButtons.html", '<div class="progress-buttons-container text-center default-text"><div class="row"><section class="col-md-6 col-lg-3"><span class="button-title">fill horizontal</span> <button progress-button="progressFunction()" class="btn btn-success">Submit</button></section><section class="col-md-6 col-lg-3"><span class="button-title">fill vertical</span> <button progress-button="progressFunction()" pb-direction="vertical" class="btn btn-danger">Submit</button></section><section class="col-md-6 col-lg-3"><span class="button-title">shrink horizontal</span> <button progress-button="progressFunction()" pb-style="shrink" class="btn btn-warning">Submit</button></section><section class="col-md-6 col-lg-3"><span class="button-title">shrink vertical</span> <button progress-button="progressFunction()" pb-style="shrink" pb-direction="vertical" class="btn btn-info">Submit</button></section></div><div class="row"><section class="col-md-6 col-lg-3"><span class="button-title">rotate-angle-bottom<br>perspective</span> <button progress-button="progressFunction()" pb-style="rotate-angle-bottom" class="btn btn-success">Submit</button></section><section class="col-md-6 col-lg-3"><span class="button-title">rotate-angle-top<br>perspective</span> <button progress-button="progressFunction()" pb-style="rotate-angle-top" class="btn btn-danger">Submit</button></section><section class="col-md-6 col-lg-3"><span class="button-title">rotate-angle-left<br>perspective</span> <button progress-button="progressFunction()" pb-style="rotate-angle-left" class="btn btn-warning">Submit</button></section><section class="col-md-6 col-lg-3"><span class="button-title">rotate-angle-right<br>perspective</span> <button progress-button="progressFunction()" pb-style="rotate-angle-right" class="btn btn-info">Submit</button></section></div><div class="row"><section class="col-md-6 col-lg-3"><span class="button-title">rotate-side-down<br>perspective</span> <button progress-button="progressFunction()" pb-style="rotate-side-down" class="btn btn-success">Submit</button></section><section class="col-md-6 col-lg-3"><span class="button-title">rotate-side-up<br>perspective</span> <button progress-button="progressFunction()" pb-style="rotate-side-up" class="btn btn-danger">Submit</button></section><section class="col-md-6 col-lg-3"><span class="button-title">rotate-side-left<br>perspective</span> <button progress-button="progressFunction()" pb-style="rotate-side-left" class="btn btn-warning">Submit</button></section><section class="col-md-6 col-lg-3"><span class="button-title">rotate-side-right<br>perspective</span> <button progress-button="progressFunction()" pb-style="rotate-side-right" class="btn btn-info">Submit</button></section></div><div class="row"><section class="col-md-6 col-lg-3"><span class="button-title">rotate-back<br>perspective</span> <button progress-button="progressFunction()" pb-style="rotate-back" class="btn btn-success">Submit</button></section><section class="col-md-6 col-lg-3"><span class="button-title">flip-open<br>perspective</span> <button progress-button="progressFunction()" pb-style="flip-open" class="btn btn-danger">Submit</button></section><section class="col-md-6 col-lg-3"><span class="button-title">slide-down<br>horizontal</span> <button progress-button="progressFunction()" pb-style="slide-down" class="btn btn-warning">Submit</button></section><section class="col-md-6 col-lg-3"><span class="button-title">move-up<br>horizontal</span> <button progress-button="progressFunction()" pb-style="move-up" class="btn btn-info">Submit</button></section></div><div class="row"><section class="col-md-6"><span class="button-title">top-line<br>horizontal</span> <button progress-button="progressFunction()" pb-style="top-line" class="btn btn-success">Submit</button></section><section class="col-md-6"><span class="button-title">lateral-lines<br>vertical</span> <button progress-button="progressFunction()" pb-style="lateral-lines" class="btn btn-info">Submit</button></section></div></div>'), e.put("app/pages/ui/icons/widgets/fontAwesomeIcons.html", '<div class="row icons-list success awesomeIcons"><div class="col-xs-2" ng-repeat="icon in icons.fontAwesomeIcons"><i class="fa {{icon}}"></i></div></div><a href="http://fortawesome.github.io/Font-Awesome/icons/" target="_blank" class="see-all-icons">See all Font Awesome icons</a>'),
            e.put("app/pages/ui/icons/widgets/ionicons.html", '<div class="row icons-list primary"><div class="col-xs-2" ng-repeat="icon in icons.ionicons"><i class="{{icon}}"></i></div></div><a href="http://ionicons.com/" target="_blank" class="see-all-icons">See all ionicons icons</a>'), e.put("app/pages/ui/icons/widgets/kameleon.html", '<div class="row clearfix"><div class="kameleon-row" ng-repeat="icon in icons.kameleonIcons"><div class="kameleon-icon"><img ng-src="{{:: (icon.img | kameleonImg )}}"><span>{{icon.name}}</span></div></div></div><a href="http://www.kameleon.pics/" target="_blank" class="see-all-icons">See all Kamaleon icons</a>'), e.put("app/pages/ui/icons/widgets/kameleonRounded.html", '<div class="row clearfix"><div class="kameleon-row" ng-repeat="icon in icons.kameleonRoundedIcons"><div class="kameleon-icon with-round-bg {{icon.color}}"><img ng-src="{{::( icon.img | kameleonImg )}}"><span>{{ icon.name }}</span></div></div></div><a href="http://www.kameleon.pics/" target="_blank" class="see-all-icons">See all Kamaleon icons</a>'), e.put("app/pages/ui/icons/widgets/socicon.html", '<div class="row icons-list danger"><div class="col-xs-2" ng-repeat="icon in icons.socicon"><i class="socicon">{{ icon }}</i></div></div><a href="http://www.socicon.com/chart.php" target="_blank" class="see-all-icons">See all Socicon icons</a>'), e.put("app/pages/ui/modals/modalTemplates/basicModal.html", '<div class="modal-content"><div class="modal-header"><button type="button" class="close" ng-click="$dismiss()" aria-label="Close"><em class="ion-ios-close-empty sn-link-close"></em></button><h4 class="modal-title" id="myModalLabel">Modal title</h4></div><div class="modal-body">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</div><div class="modal-footer"><button type="button" class="btn btn-primary" ng-click="$dismiss()">Save changes</button></div></div>'), e.put("app/pages/ui/modals/modalTemplates/dangerModal.html", '<div class="modal-content"><div class="modal-header bg-danger"><i class="ion-flame modal-icon"></i><span>Error</span></div><div class="modal-body text-center">Your information hasn\'t been saved!</div><div class="modal-footer"><button type="button" class="btn btn-danger" ng-click="$dismiss()">OK</button></div></div>'), e.put("app/pages/ui/modals/modalTemplates/infoModal.html", '<div class="modal-content"><div class="modal-header bg-info"><i class="ion-information-circled modal-icon"></i><span>Information</span></div><div class="modal-body text-center">You\'ve got a new email!</div><div class="modal-footer"><button type="button" class="btn btn-info" ng-click="$dismiss()">OK</button></div></div>'), e.put("app/pages/ui/modals/modalTemplates/largeModal.html", '<div class="modal-content"><div class="modal-header"><button type="button" class="close" ng-click="$dismiss()" aria-label="Close"><em class="ion-ios-close-empty sn-link-close"></em></button><h4 class="modal-title">Modal title</h4></div><div class="modal-body">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</div><div class="modal-footer"><button type="button" class="btn btn-primary" ng-click="$dismiss()">Save changes</button></div></div>'), e.put("app/pages/ui/modals/modalTemplates/smallModal.html", '<div class="modal-content"><div class="modal-header"><button type="button" class="close" ng-click="$dismiss()" aria-label="Close"><em class="ion-ios-close-empty sn-link-close"></em></button><h4 class="modal-title">Modal title</h4></div><div class="modal-body">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</div><div class="modal-footer"><button type="button" class="btn btn-primary" ng-click="$dismiss()">Save changes</button></div></div>'), e.put("app/pages/ui/modals/modalTemplates/successModal.html", '<div class="modal-content"><div class="modal-header bg-success"><i class="ion-checkmark modal-icon"></i><span>Success</span></div><div class="modal-body text-center">Your information has been saved successfully</div><div class="modal-footer"><button type="button" class="btn btn-success" ng-click="$dismiss()">OK</button></div></div>'), e.put("app/pages/ui/modals/modalTemplates/warningModal.html", '<div class="modal-content"><div class="modal-header bg-warning"><i class="ion-android-warning modal-icon"></i><span>Warning</span></div><div class="modal-body text-center">Your computer is about to explode!</div><div class="modal-footer"><button type="button" class="btn btn-warning" ng-click="$dismiss()">OK</button></div></div>'), e.put("app/pages/ui/modals/notifications/notifications.html", '<div class="modal-buttons same-width clearfix" ng-controller="NotificationsCtrl"><button type="button" class="btn btn-success" ng-click="showSuccessMsg()">Success Notification</button> <button type="button" class="btn btn-info" ng-click="showInfoMsg()">Info Notification</button> <button type="button" class="btn btn-warning" ng-click="showWarningMsg()">Warning Notification</button> <button type="button" class="btn btn-danger" ng-click="showErrorMsg()">Danger Notification</button></div>'), e.put("app/pages/ui/progressBars/widgets/animated.html", '<div class="progress"><div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width: 40%"><span class="sr-only">40% Complete (success)</span></div></div><div class="progress"><div class="progress-bar progress-bar-info progress-bar-striped active" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" style="width: 20%"><span class="sr-only">20% Complete</span></div></div><div class="progress"><div class="progress-bar progress-bar-warning progress-bar-striped active" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%"><span class="sr-only">60% Complete (warning)</span></div></div><div class="progress"><div class="progress-bar progress-bar-danger progress-bar-striped active" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style="width: 80%"><span class="sr-only">80% Complete (danger)</span></div></div>'), e.put("app/pages/ui/progressBars/widgets/basic.html", '<div class="progress"><div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width: 40%"><span class="sr-only">40% Complete (success)</span></div></div><div class="progress"><div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" style="width: 20%"><span class="sr-only">20% Complete</span></div></div><div class="progress"><div class="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%"><span class="sr-only">60% Complete (warning)</span></div></div><div class="progress"><div class="progress-bar progress-bar-danger" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style="width: 80%"><span class="sr-only">80% Complete (danger)</span></div></div>'), e.put("app/pages/ui/progressBars/widgets/label.html", '<div class="progress"><div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width: 40%">40% Complete (success)</div></div><div class="progress"><div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" style="width: 20%">20% Complete</div></div><div class="progress"><div class="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%">60% Complete (warning)</div></div><div class="progress"><div class="progress-bar progress-bar-danger" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style="width: 80%">80% Complete (danger)</div></div>'), e.put("app/pages/ui/progressBars/widgets/stacked.html", '<div class="progress"><div class="progress-bar progress-bar-success" style="width: 35%"><span class="sr-only">35% Complete (success)</span></div><div class="progress-bar progress-bar-warning progress-bar-striped" style="width: 20%"><span class="sr-only">20% Complete (warning)</span></div><div class="progress-bar progress-bar-danger" style="width: 10%"><span class="sr-only">10% Complete (danger)</span></div><div class="progress-bar progress-bar-info progress-bar-striped active" style="width: 20%"><span class="sr-only">20% Complete (warning)</span></div></div>'), e.put("app/pages/ui/progressBars/widgets/striped.html", '<div class="progress"><div class="progress-bar progress-bar-success progress-bar-striped" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width: 40%"><span class="sr-only">40% Complete (success)</span></div></div><div class="progress"><div class="progress-bar progress-bar-info progress-bar-striped" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" style="width: 20%"><span class="sr-only">20% Complete</span></div></div><div class="progress"><div class="progress-bar progress-bar-warning progress-bar-striped" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%"><span class="sr-only">60% Complete (warning)</span></div></div><div class="progress"><div class="progress-bar progress-bar-danger progress-bar-striped" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style="width: 80%"><span class="sr-only">80% Complete (danger)</span></div></div>'), e.put("app/pages/components/mail/detail/mailDetail.html", '<div class="message-container" ng-class="{\'expanded\': tabCtrl.navigationCollapsed}"><div class="message"><div class="row"><div class="toggle-navigation-container detail-page"><a href="" class="collapse-navigation-link ion-navicon" ng-click="tabCtrl.navigationCollapsed=!tabCtrl.navigationCollapsed"></a></div><button ui-sref="components.mail.label({label : detailCtrl.label})" type="button" class="back-button btn btn-default btn-with-icon"><i class="ion-chevron-left"></i>Back</button></div><div class="person-info row"><div class="col-lg-4 col-md-12 no-padding"><img ng-src="{{detailCtrl.mail.name.split(\' \')[0] | profilePicture}}" class="human-picture"><div class="name"><h2 class="name-h">{{detailCtrl.mail.name.split(\' \')[0]}}</h2><h2 class="name-h second-name">{{detailCtrl.mail.name.split(\' \')[1]}}</h2><div><span class="mail-tag tag label {{detailCtrl.mail.tag}}">{{detailCtrl.mail.tag}}</span></div></div></div><div class="col-lg-4 col-md-6 col-xs-12 no-padding"><div class="contact-info phone-email"><div><i class="ion-iphone"></i> <span class="phone">777-777-7777</span></div><div><i class="ion-email"></i> <span class="email">{{detailCtrl.mail.email}}</span></div></div></div><div class="col-lg-4 col-md-6 col-xs-12 no-padding"><div class="contact-info position-address"><div><span class="position">{{detailCtrl.mail.position}}</span></div><div><span class="address">12 Nezavisimosti st. Vilnius, Lithuania</span></div></div></div></div><div class="row"></div><div class="line"></div><div class="message-details"><span class="subject">{{detailCtrl.mail.subject}}</span> <span class="date">â€¢ {{detailCtrl.mail.date | date : \'h:mm a MMMM d \'}}</span></div><div class="line"></div><div ng-bind-html="detailCtrl.mail.body" class="message-body"></div><div class="line"></div><div class="attachment" ng-show="detailCtrl.mail.attachment"><span class="file-links">1 Attachment - <a href="">View</a> | <a href="">Download</a></span><div><i class="file-icon ion-document"></i> <span class="file-name">{{detailCtrl.mail.attachment}}</span></div></div><div class="line" ng-show="detailCtrl.mail.attachment"></div><div class="answer-container"><button type="button" class="btn btn-with-icon" ng-click="tabCtrl.showCompose(detailCtrl.mail.subject,detailCtrl.mail.email,\'\')"><i class="ion-reply"></i>Reply</button> <button type="button" class="btn btn-with-icon" ng-click="tabCtrl.showCompose(detailCtrl.mail.subject,\'\',detailCtrl.mail.body)"><i class="ion-forward"></i>Forward</button> <button type="button" class="btn btn-with-icon"><i class="ion-printer"></i>Print</button> <button type="button" class="btn btn-with-icon"><i class="ion-android-remove-circle"></i>Spam</button> <button type="button" class="btn btn-with-icon"><i class="ion-android-delete"></i>Delete</button></div></div><div ng-show="!detailCtrl.mail"><h5 ng-class="text-center">Nothing to show</h5></div></div>'), e.put("app/pages/form/inputs/widgets/checkboxesRadios.html", '<div class="checkbox-demo-row"><div class="input-demo checkbox-demo row"><div class="col-md-4"><label class="checkbox-inline custom-checkbox nowrap"><input type="checkbox" id="inlineCheckbox01" value="option1"> <span>Check 1</span></label></div><div class="col-md-4"><label class="checkbox-inline custom-checkbox nowrap"><input type="checkbox" id="inlineCheckbox02" value="option2"> <span>Check 2</span></label></div><div class="col-md-4"><label class="checkbox-inline custom-checkbox nowrap"><input type="checkbox" id="inlineCheckbox03" value="option3"> <span>Check 3</span></label></div></div><div class="input-demo radio-demo row"><div class="col-md-4"><label class="radio-inline custom-radio nowrap"><input type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1"> <span>Option 1</span></label></div><div class="col-md-4"><label class="radio-inline custom-radio nowrap"><input type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2"> <span>Option 2</span></label></div><div class="col-md-4"><label class="radio-inline custom-radio nowrap"><input type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3"> <span>Option3</span></label></div></div></div><div><div class="checkbox disabled"><label class="custom-checkbox nowrap"><input type="checkbox" value="" disabled=""> <span>Checkbox is disabled</span></label></div><div class="radio disabled"><label class="custom-radio nowrap"><input type="radio" name="optionsRadios" id="optionsRadios3" value="option3" disabled=""> <span>Disabled option</span></label></div></div>'), e.put("app/pages/form/inputs/widgets/inputGroups.html", '<div class="input-group"><span class="input-group-addon input-group-addon-primary addon-left" id="basic-addon1">@</span> <input type="text" class="form-control with-primary-addon" placeholder="Username" aria-describedby="basic-addon1"></div><div class="input-group"><input type="text" class="form-control with-warning-addon" placeholder="Recipient\'s username" aria-describedby="basic-addon2"> <span class="input-group-addon input-group-addon-warning addon-right" id="basic-addon2">@example.com</span></div><div class="input-group"><span class="input-group-addon addon-left input-group-addon-success">$</span> <input type="text" class="form-control with-success-addon" aria-label="Amount (to the nearest dollar)"> <span class="input-group-addon addon-right input-group-addon-success">.00</span></div><div class="input-group"><input type="text" class="form-control with-danger-addon" placeholder="Search for..."> <span class="input-group-btn"><button class="btn btn-danger" type="button">Go!</button></span></div>'), e.put("app/pages/form/inputs/widgets/standardFields.html", '<form><div class="form-group"><label for="input01">Text</label> <input type="text" class="form-control" id="input01" placeholder="Text"></div><div class="form-group"><label for="input02">Password</label> <input type="password" class="form-control" id="input02" placeholder="Password"></div><div class="form-group"><label for="input03">Rounded Corners</label> <input type="text" class="form-control form-control-rounded" id="input03" placeholder="Rounded Corners"></div><div class="form-group"><label for="input04">With help</label> <input type="text" class="form-control" id="input04" placeholder="With help"> <span class="help-block sub-little-text">A block of help text that breaks onto a new line and may extend beyond one line.</span></div><div class="form-group"><label for="input05">Disabled Input</label> <input type="text" class="form-control" id="input05" placeholder="Disabled Input" disabled=""></div><div class="form-group"><label for="textarea01">Textarea</label> <textarea placeholder="Default Input" class="form-control" id="textarea01"></textarea></div><div class="form-group"><input type="text" class="form-control input-sm" id="input2" placeholder="Small Input"></div><div class="form-group"><input type="text" class="form-control input-lg" id="input4" placeholder="Large Input"></div></form>'), e.put("app/pages/form/inputs/widgets/validationStates.html", '<div class="form-group has-success"><label class="control-label" for="inputSuccess1">Input with success</label> <input type="text" class="form-control" id="inputSuccess1"></div><div class="form-group has-warning"><label class="control-label" for="inputWarning1">Input with warning</label> <input type="text" class="form-control" id="inputWarning1"></div><div class="form-group has-error"><label class="control-label" for="inputError1">Input with error</label> <input type="text" class="form-control" id="inputError1"></div><div class="has-success"><div class="checkbox"><label class="custom-checkbox"><input type="checkbox" id="checkboxSuccess" value="option1"> <span>Checkbox with success</span></label></div></div><div class="has-warning"><div class="checkbox"><label class="custom-checkbox"><input type="checkbox" id="checkboxWarning" value="option1"> <span>Checkbox with warning</span></label></div></div><div class="has-error"><div class="checkbox"><label class="custom-checkbox"><input type="checkbox" id="checkboxError" value="option1"> <span>Checkbox with error</span></label></div></div><div class="form-group has-success has-feedback"><label class="control-label" for="inputSuccess2">Input with success</label> <input type="text" class="form-control" id="inputSuccess2" aria-describedby="inputSuccess2Status"> <i class="ion-checkmark-circled form-control-feedback" aria-hidden="true"></i> <span id="inputSuccess2Status" class="sr-only">(success)</span></div><div class="form-group has-warning has-feedback"><label class="control-label" for="inputWarning2">Input with warning</label> <input type="text" class="form-control" id="inputWarning2" aria-describedby="inputWarning2Status"> <i class="ion-alert-circled form-control-feedback" aria-hidden="true"></i> <span id="inputWarning2Status" class="sr-only">(warning)</span></div><div class="form-group has-error has-feedback"><label class="control-label" for="inputError2">Input with error</label> <input type="text" class="form-control" id="inputError2" aria-describedby="inputError2Status"> <i class="ion-android-cancel form-control-feedback" aria-hidden="true"></i> <span id="inputError2Status" class="sr-only">(error)</span></div><div class="form-group has-success has-feedback"><label class="control-label" for="inputGroupSuccess1">Input group with success</label><div class="input-group"><span class="input-group-addon addon-left">@</span> <input type="text" class="form-control" id="inputGroupSuccess1" aria-describedby="inputGroupSuccess1Status"></div><i class="ion-checkmark-circled form-control-feedback" aria-hidden="true"></i> <span id="inputGroupSuccess1Status" class="sr-only">(success)</span></div>'), e.put("app/pages/form/inputs/widgets/select/select.html", '<div ng-controller="SelectpickerPanelCtrl as selectpickerVm"><div class="form-group"><select class="form-control selectpicker" selectpicker="" title="Standard Select" ng-model="selectpickerVm.standardSelected" ng-options="item as item.label for item in selectpickerVm.standardSelectItems"></select></div><div class="form-group"><select class="form-control selectpicker with-search" data-live-search="true" title="Select With Search" selectpicker="" ng-model="selectpickerVm.searchSelectedItem" ng-options="item as item.label for item in selectpickerVm.selectWithSearchItems"></select></div><div class="form-group"><select class="form-control selectpicker" title="Option Types" selectpicker=""><option>Standard option</option><option data-subtext="option subtext">Option with subtext</option><option disabled="">Disabled Option</option><option data-icon="glyphicon-heart">Option with cion</option></select></div><div class="form-group"><select class="form-control selectpicker" disabled="" title="Disabled Select" selectpicker=""><option>Option 1</option><option>Option 2</option><option>Option 3</option></select></div><div class="row"><div class="col-sm-6"><div class="form-group"><select class="form-control" title="Select with Option Groups" selectpicker="" ng-model="selectpickerVm.groupedSelectedItem" ng-options="item as item.label group by item.group for item in selectpickerVm.groupedSelectItems"></select></div></div><div class="col-sm-6"><div class="form-group"><select class="form-control" title="Select with Divider" selectpicker=""><option>Group 1 - Option 1</option><option>Group 1 - Option 2</option><option data-divider="true"></option><option>Group 2 - Option 1</option><option>Group 2 - Option 2</option></select></div></div></div><div class="form-group"><select class="form-control" title="Multiple Select" multiple="" selectpicker="" ng-model="selectpickerVm.multipleSelectedItems" ng-options="item as item.label for item in selectpickerVm.standardSelectItems"><option>Option 1</option><option>Option 2</option><option>Option 3</option></select></div><div class="form-group"><select class="form-control" title="Multiple Select with Limit" multiple="" data-max-options="2" selectpicker="" ng-model="selectpickerVm.multipleSelectedItems2" ng-options="item as item.label for item in selectpickerVm.standardSelectItems"><option>Option 1</option><option>Option 2</option><option>Option 3</option></select></div><div class="row"><div class="col-sm-6"><div class="form-group"><select class="form-control" title="Primary Select" data-style="btn-primary" data-container="body" selectpicker=""><option>Option 1</option><option>Option 2</option><option>Option 3</option><option>Option 4</option></select></div><div class="form-group"><select class="form-control" title="Success Select" data-style="btn-success" data-container="body" selectpicker=""><option>Option 1</option><option>Option 2</option><option>Option 3</option><option>Option 4</option></select></div><div class="form-group"><select class="form-control" title="Warning Select" data-style="btn-warning" data-container="body" selectpicker=""><option>Option 1</option><option>Option 2</option><option>Option 3</option><option>Option 4</option></select></div></div><div class="col-sm-6"><div class="form-group"><select class="form-control" title="Info Select" data-style="btn-info" data-container="body" selectpicker=""><option>Option 1</option><option>Option 2</option><option>Option 3</option><option>Option 4</option></select></div><div class="form-group"><select class="form-control" title="Danger Select" data-style="btn-danger" data-container="body" selectpicker=""><option>Option 1</option><option>Option 2</option><option>Option 3</option><option>Option 4</option></select></div><div class="form-group"><select class="form-control" title="Inverse Select" data-style="btn-inverse" data-container="body" selectpicker=""><option>Option 1</option><option>Option 2</option><option>Option 3</option><option>Option 4</option></select></div></div></div></div>'), e.put("app/pages/form/inputs/widgets/switch/switch.html", '<div ng-init="switches = [ true, true, true, true, true, true ]" class="switches clearfix"><switch color="primary" ng-model="switches[5]"></switch><switch color="warning" ng-model="switches[1]"></switch><switch color="danger" ng-model="switches[2]"></switch><switch color="info" ng-model="switches[3]"></switch><switch color="success" ng-model="switches[0]"></switch></div>'), e.put("app/pages/form/inputs/widgets/tagsInput/tagsInput.html", '<div class="form-group"><div class="form-group"><input type="text" tag-input="primary" value="Amsterdam,Washington,Sydney,Beijing,Cairo" data-role="tagsinput" placeholder="Add Tag"></div><div class="form-group"><input type="text" tag-input="warning" value="Minsk,Prague,Vilnius,Warsaw" data-role="tagsinput" placeholder="Add Tag"></div><div class="form-group"><input type="text" tag-input="danger" value="London,Berlin,Paris,Rome,Munich" data-role="tagsinput" placeholder="Add Tag"></div></div>')
    }]);
//# sourceMappingURL=../maps/scripts/app-481e7bc007.js.map