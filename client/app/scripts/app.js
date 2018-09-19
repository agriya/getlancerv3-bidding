/*globals $:false */
'use strict';
/**
 * @ngdoc overview
 * @name getlancerApp
 * @description
 * # getlancerApp
 *
 * Main module of the application.
 */
angular.module('getlancerApp', [
    'getlancerApp.Constant',
    'ngResource',
    'ngSanitize',
    'satellizer',
    'ngAnimate',
    'ui.bootstrap',
    'ui.bootstrap.datetimepicker',
    'ui.router',
    'angular-growl',
    'google.places',
    'angular.filter',
    'ngCookies',
    'angular-md5',
    'ui.select2',
    'ui.select',
    'http-auth-interceptor',
    'vcRecaptcha',
    'angulartics',
    'pascalprecht.translate',
    'angulartics.google.analytics',
    'tmh.dynamicLocale',
    'ngMap',
    'chieffancypants.loadingBar',
    'payment',
    'builder',
    'builder.components',
    'validator.rules',
    'angularMoment',
    'ngFileUpload',    
    '720kb.socialshare',
    'slugifier',
    'textAngular'
])
    .config(['$stateProvider', '$urlRouterProvider', '$translateProvider', function($stateProvider, $urlRouterProvider, $translateProvider) {
        //$translateProvider.translations('en', translations).preferredLanguage('en');
        $translateProvider.useStaticFilesLoader({
            prefix: 'scripts/l10n/',
            suffix: '.json'
        });
        $translateProvider.preferredLanguage('en');
        $translateProvider.useLocalStorage(); // saves selected language to localStorage
        // Enable escaping of HTML
        $translateProvider.useSanitizeValueStrategy('escape');
        //	$translateProvider.useCookieStorage();
    }])
    .config(function(tmhDynamicLocaleProvider) {
        tmhDynamicLocaleProvider.localeLocationPattern('scripts/l10n/angular-i18n/angular-locale_{{locale}}.js');
    })
    .config(['$authProvider', function($authProvider) {
        var params = {};
        params.fields = 'api_key,slug';
        $.get('/api/v1/providers', params, function(response) {
            var credentials = {};
            var url = '';
            var providers = response;
            angular.forEach(providers.data, function(res, i) {
                //jshint unused:false
                url = window.location.protocol + '//' + window.location.host + '/api/v1/users/social_login?type=' + res.slug;
                credentials = {
                    clientId: res.api_key,
                    redirectUri: url,
                    url: url
                };
                if (res.slug === 'facebook') {
                    $authProvider.facebook(credentials);
                }
                if (res.slug === 'google') {
                    $authProvider.google(credentials);
                }
                if (res.slug === 'twitter') {
                    $authProvider.twitter(credentials);
                }
            });
        });
    }])
    .config(['$locationProvider', function($locationProvider) {
        //$locationProvider.html5Mode(false);
        //$locationProvider.hashPrefix('!');
        $locationProvider.html5Mode(true);
    }])
    .config(function($stateProvider, $urlRouterProvider) {
        var getToken = {
            'TokenServiceData': function(TokenService, $q) {
                return $q.all({
                    AuthServiceData: TokenService.promise,
                    SettingServiceData: TokenService.promiseSettings
                });
            }
        };
        $urlRouterProvider.otherwise('/');
        $stateProvider.state('home', {
                url: '/',
                templateUrl: 'views/home.html',
                controller: 'HomeController',
                resolve: getToken
            })
            .state('users_settings', {
                url: '/users/settings?type',
                templateUrl: 'views/users_settings.html',
                resolve: getToken,
            })
            .state('users_change_password', {
                url: '/users/change_password',
                templateUrl: 'views/users_change_password.html',
                resolve: getToken
            })
            .state('users_login', {
                url: '/users/login',
                templateUrl: 'views/users_login.html',
                resolve: getToken
            })
            .state('users_register', {
                url: '/users/register',
                templateUrl: 'views/users_register.html',
                resolve: getToken
            })
            .state('users_logout', {
                url: '/users/logout',
                controller: 'UsersLogoutController',
                resolve: getToken
            })
            .state('users_forgot_password', {
                url: '/users/forgot_password',
                templateUrl: 'views/users_forgot_password.html',
                resolve: getToken
            })
            .state('user_profile', {
                url: '/users/:id/:slug',
                templateUrl: 'views/user_profile.html',
                controller: 'UserProfileController',
                resolve: getToken
            })
            .state('user_profiles', {
                url: '/users/:id/:slug/:portfolio',
                templateUrl: 'views/user_profile.html',
                controller: 'UserProfileController',
                resolve: getToken
            })
            .state('skills', {
                url: '/users/skills',
                templateUrl: 'views/user_profile_skills.html',
                resolve: getToken
            })
            .state('hire_me', {
                url: '/hire_me',
                templateUrl: 'views/hire_me.html',
                resolve: getToken
            })
            .state('contact', {
                url: '/contact',
                templateUrl: 'views/contact.html',
                resolve: getToken
            })
            .state('users_address_add', {
                url: '/users/addresses/add',
                templateUrl: 'views/users_address_add.html',
                resolve: getToken
            })
            .state('pages_view', {
                url: '/pages/:id/:slug',
                templateUrl: 'views/pages_view.html',
                resolve: getToken
            })
            .state('users_activation', {
                url: '/activation/:user_id/:hash',
                templateUrl: 'views/users_activation.html',
                resolve: getToken
            })
            .state('money_transfer_account', {
                url: '/users/money_transfer_account',
                templateUrl: 'views/money_transfer_account.html',
                resolve: getToken
            })
            .state('transactions', {
                url: '/transactions',
                templateUrl: 'views/transactions.html',
                resolve: getToken
            })
            .state('get_email', {
                url: '/users/get_email',
                templateUrl: 'views/get_email.html',
                controller: 'TwitterLoginController',
                resolve: getToken
            })
            .state('user_dashboard', {
                url: '/users/dashboard?type&status',
                templateUrl: 'views/users_dashboard.html',
                resolve: getToken
            })
            .state('newsfeeds', {
                url: '/newsfeed',
                /*controller: 'newsFeedsCtrl',*/
                templateUrl: 'views/news_feeds.html',
                resolve: getToken
            })
            .state('Users', {
                url: '/freelancers?q&skills&hourly_rate&page',
                templateUrl: 'views/users.html',
                resolve: getToken
            })
            .state('quote_credit_purchase_plan', {
                url: '/purchase_plan?error_code',
                templateUrl: 'scripts/plugins/Common/Subscription/views/default/quote_credit_purchase_plan.html',
                resolve: getToken
            })
            .state('quote_credit_purchase_logs_me', {
                url: '/purchase_logs?page',
                templateUrl: 'scripts/plugins/Common/Subscription/views/default/quote_credit_purchase_logs.html',
                resolve: getToken
            });
    })
    .config(['growlProvider', function(growlProvider) {
        growlProvider.onlyUniqueMessages(true);
        growlProvider.globalTimeToLive(5000);
        growlProvider.globalPosition('top-center');
        growlProvider.globalDisableCountDown(true);
    }])
    .run(function($rootScope, $location, $window, $cookies) {
        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            $rootScope.ShowSearch = true;
            //jshint unused:false
            $rootScope.previousState = {};
            $rootScope.previousState.state_name = toState.name;
            $rootScope.previousState.params = toParams;
            var url = toState.name;
            var exception_array = ['home', 'users_login', 'users_register', 'users_forgot_password', 'pages_view', 'contact', 'jobs', 'jobs_view', 'get_email', 'Users', 'users_activation', 'user_profile'];
            var quote_exception = ['quote_services', 'quote_service', 'quote_services_category', 'user_services', 'quote_services_filter', 'quote_services_category_view', 'quote_service_filter'];
            var contest_exception = ['Contest', 'ContestView'];
            var portfolio_exception = ['portfolios', 'portfolio_view', 'search_portfoliotags', 'Portfolio_Userprofile'];
            var bidding_exception = ['Bid_Projects', 'Exam', 'ExamView', 'Bid_ProjectView'];
            var exception_arr = exception_array.concat(bidding_exception, portfolio_exception, exception_array, quote_exception, contest_exception);
            $rootScope.enable_hide = false;
            if (url !== undefined) {
                if (exception_arr.indexOf(url) === -1 && ($cookies.get("auth") === null || $cookies.get("auth") === undefined)) {
                    $location.path('/users/login');
                }
            }
            if($location.path() === '/projects/add' ||  $location.path() === '/exams'){
                if(parseInt($location.search().enable_hide) === 1){
                    $rootScope.enable_hide = true;
                }else{
                    $rootScope.enable_hide = false;
                }
            }
        });
        $rootScope.$on('$viewContentLoaded', function() {
            $('div.loader')
                .hide();
            $('body')
                .removeClass('site-loading');
        });
        $rootScope.$on('$stateChangeSuccess', function() {
            $('html, body')
                .stop(true, true)
                .animate({
                    scrollTop: 0
                }, 600);
        });
        var query_string = $location.search()
            .action;
        if (query_string !== '') {
            $('html, body')
                .stop(true, true)
                .animate({
                    scrollTop: 0
                }, 450);
        }
    })
    .config(['$httpProvider',
        function($httpProvider) {
            $httpProvider.interceptors.push('interceptor');
            $httpProvider.interceptors.push(function() {
                return {
                    'request': function(config) {
                        if (config.url.indexOf('api/') === 1) {
                            config.url = config.url; //jshint ignore:line
                        } else if (config.url.indexOf('views/') !== -1) {
                            config.url = theme + config.url; //jshint ignore:line
                        } else {
                            config.url = config.url; //jshint ignore:line
                        }
                        return config;
                    }
                };
            });
            $httpProvider.interceptors.push('oauthTokenInjector');
        }
    ])
    .config(function(cfpLoadingBarProvider) {
        // true is the default, but I left this here as an example:
        cfpLoadingBarProvider.includeSpinner = false;
    })
    .directive('stringToNumber', function() {
        return {
            require: 'ngModel',
            link: function(scope, element, attrs, ngModel) {
                ngModel.$parsers.push(function(value) {
                    return '' + value;
                });
                ngModel.$formatters.push(function(value) {
                    return parseFloat(value);
                });
            }
        };
    })
    .factory('interceptor', ['$q', '$location', 'flash', '$window', '$timeout', '$rootScope', '$filter', '$cookies', function($q, $location, flash, $window, $timeout, $rootScope, $filter, $cookies) {
        return {
            response: function(response) {
                $rootScope.isOn404 = false;
                if (response.status === 200) {
                    $rootScope.isOn404 = false;
                    $('.main_div')
                        .css('display', 'block');
                    $('.js-404-div-open')
                        .css('display', 'none');
                }
              if($rootScope.Freelancer === true)
                 {
                if($location.$$url === "/quote_services" || $location.$$url === "/service_category")
                    {
                    $rootScope.isOn404 = true;
                    $('.main_div')
                        .css('display', 'none');
                    $('.js-404-div-open')
                        .css('display', 'block');
                    }
                }
                if (angular.isDefined(response.data)) {
                    if (angular.isDefined(response.data.thrid_party_login)) {
                        if (angular.isDefined(response.data.error)) {
                            if (angular.isDefined(response.data.error.code) && parseInt(response.data.error.code) === 0) {
                                $cookies.put('auth', JSON.stringify(response.data.user), {
                                    path: '/'
                                });
                                /* $timeout(function() {
                                     location.reload(true);
                                 });*/
                            } else {
                                var flashMessage;
                                flashMessage = $filter("translate")("Please choose different E-mail.");
                                flash.set(flashMessage, 'error', false);
                            }
                        }
                    }
                }
                // Return the response or promise.
                return response || $q.when(response);
            },
            // On response failture
            responseError: function(response) {
                $timeout(function() {
                    if (response.status === 404) {
                        $rootScope.isOn404 = true;
                        $('.main_div')
                            .css('display', 'none');
                    }
                }, 500);
                $timeout(function() {
                    if (response.status === 404) {
                        $rootScope.isOn404 = true;
                        $('.js-404-div-open')
                            .css('display', 'block');
                    }
                }, 500);
                // Return the promise rejection.
                if (response.status === 401) {
                    var redirectto = $location.absUrl().split('/');    
                    redirectto = redirectto[0] + '/users/login';
                    if ($cookies.get("auth") !== null && $cookies.get("auth") !== undefined) {
                        var auth = JSON.parse($cookies.get("auth"));
                        var refresh_token = auth.refresh_token;
                        if (refresh_token === null || refresh_token === '' || refresh_token === undefined) {
                            $cookies.remove('auth', {
                                path: '/'
                            });
                            $cookies.remove('token', {
                                path: '/'
                            });
                            $rootScope.refresh_token_loading = false;
                            window.location.href = redirectto;
                        } else {
                            if ($rootScope.refresh_token_loading !== true) {
                                $rootScope.$broadcast('useRefreshToken');
                            }
                        }
                    } else {
                       $cookies.remove('auth', {
                                path: '/'
                            });
                        $cookies.remove('token', {
                            path: '/'
                        });
                        $rootScope.refresh_token_loading = false;
                        window.location.href = redirectto; 
                    }
                }
                return $q.reject(response);
            }
        };
    }])
    .filter('unsafe', function($sce) {
        return function(val) {
            return $sce.trustAsHtml(val);
        };
    })
    .filter('split', function() {
        return function(input, splitChar) {
            var _input = input.split(splitChar);
            _input.pop();
            return _input.join(':');
        };
    })
    .filter('spaceless', function() {
        return function(input) {
            if (input) {
                return input.replace(/\s+/g, '-');
            }
        };
    })
    .filter('customCurrency', function($rootScope, $filter) {
        var currency_symbol = $rootScope.settings.CURRENCY_SYMBOL;
        return function(input, symbol, fractionSize) {
            if (isNaN(input)) {
                input = symbol + $filter('number')(input, fractionSize || 2);
                return input;
            } else if (currency_symbol) {
                var symbol = symbol || $rootScope.settings.CURRENCY_SYMBOL; //jshint ignore:line
                input = symbol + $filter('number')(input, fractionSize || 2); //jshint ignore:line
                return input;
            } else {
                var symbol = symbol || $rootScope.settings.CURRENCY_CODE; //jshint ignore:line
                input = symbol + $filter('number')(input, fractionSize || 2); //jshint ignore:line
                return input;
            }
        };
    }) //jshint ignore:line
    .filter('nl2br', function() {
        var span = document.createElement('span');
        return function(input) {
            if (!input) {
                return input;
            }
            var lines = input.split('\n');
            for (var i = 0; i < lines.length; i++) {
                span.innerText = lines[i];
                span.textContent = lines[i]; //for Firefox
                lines[i] = span.innerHTML;
            }
            return lines.join('<br />');
        };
    })
    .filter('cut', function() {
        return function(value, wordwise, max, tail) {
            if (!value) {
                return '';
            }
            max = parseInt(max, 10);
            if (!max) {
                return value;
            }
            if (value.length <= max) {
                return value;
            }
            value = value.substr(0, max);
            if (wordwise) {
                var lastspace = value.lastIndexOf(' ');
                if (lastspace !== -1) {
                    //Also remove . and , so its gives a cleaner result.
                    if (value.charAt(lastspace - 1) === '.' || value.charAt(lastspace - 1) === ',') {
                        lastspace = lastspace - 1;
                    }
                    value = value.substr(0, lastspace);
                }
            }
            return value + (tail || ' …');
        };
    })
    .filter('reverse', function() {
        return function(items) {
            return items.slice()
                .reverse();
        };
    })
    .filter('date_format', function($filter) {
        return function(input, format) {
            return $filter('date')(new Date(input), format);
        };
    })
    /** time ago filter using jquery timeago plugin **/
    .filter("timeago", ['$rootScope', function($rootScope) {
        var timeZone = ($rootScope.settings.SITE_TIMEZONE) ? $rootScope.settings.SITE_TIMEZONE : '+0000';
        return function(date) {
            jQuery.timeago.settings.strings = {//jshint ignore:line
                prefixAgo: null,
                prefixFromNow: null,
                suffixAgo: "ago",
                suffixFromNow: "from now",
                seconds: "less than a minute",
                minute: "a minute",
                minutes: "%d minutes",
                hour: "an hour",
                hours: "%d hours",
                day: "a day",
                days: "%d days",
                month: "a month",
                months: "%d months",
                year: "a year",
                years: "%d years",
                wordSeparator: " ",
                numbers: []
            };
            return jQuery.timeago(date + timeZone);//jshint ignore:line
        };
    }])
     /**
   * @ngdoc filter
   * @name getlancerApp.capitalize
   * @param {string} value
   * @description
   * For change the first character upper case in give string.
   */
  .filter('capitalize', function () {
    return function (input) {
      return (!!input) ? input.charAt(0)
        .toUpperCase() + input.substr(1)
        .toLowerCase() : '';
    };
  })
    /* jshint latedef:nofunc */
    /*global*/
    /**
   * @ngdoc directive
   * @name getlancerApp.Job.inputStars
   * @param {object} value
   * @description
   * For using the star rating.  
   */
  .directive('monthShow', function() {
    return {
        restrict: 'EA',
        replace: true,
        template: '<select class="form-control" ng-options="month.value as month.text for month in months"><option value="">Select Month</option></select>',
        link: function(scope, e, a) {
            scope.months = [];
            scope.months.push({
                value: 1,
                text: 'January'
            });
            scope.months.push({
                value: 2,
                text: 'February'
            });
            scope.months.push({
                value: 3,
                text: 'March'
            });
            scope.months.push({
                value: 4,
                text: 'April'
            });
            scope.months.push({
                value: 5,
                text: 'May'
            });
            scope.months.push({
                value: 6,
                text: 'June'
            });
            scope.months.push({
                value: 7,
                text: 'July'
            });
            scope.months.push({
                value: 8,
                text: 'August'
            });
            scope.months.push({
                value: 9,
                text: 'September'
            });
            scope.months.push({
                value: 10,
                text: 'October'
            });
            scope.months.push({
                value: 11,
                text: 'November'
            });
            scope.months.push({
                value: 12,
                text: 'December'
            });
        }
    }
})
  .directive('inputStars', [function () {
    var directive = {
      restrict: 'EA',
      replace: true,
      template: '<ul class="listClass list-ratings">' + '<li ng-touch="paintStars($index)" ng-mouseenter="paintStars($index, true)" ng-mouseleave="unpaintStars($index, false)" ng-repeat="item in items track by $index">' + '<i  ng-class="getClass($index)" ng-click="setValue($index, $event)"></i>' + '</li>' + '</ul>',
      require: 'ngModel',
      scope: true,
      link: link
    };
     function link(scope, element, attrs, ngModelCtrl) {
      var computed = {
        get readonly() {
          return attrs.readonly !== 'false' && (attrs.readonly || attrs.readonly === '');
        },
        get fullIcon() {
          return attrs.iconFull || 'fa-star';
        },
        get emptyIcon() {
          return attrs.iconEmpty || 'fa-star-o';
        },
        get iconBase() {
          return attrs.iconBase || 'fa fa-fw';
        },
        get iconHover() {
          return attrs.iconHover || 'angular-input-stars-hover';
        }
      };
      scope.items = new Array(+attrs.max);
      scope.listClass = attrs.listClass || 'angular-input-stars';
      ngModelCtrl.$render = function () {
        scope.lastValue = ngModelCtrl.$viewValue || 0;
      };
      scope.getClass = function (index) {
        var icon = index >= scope.lastValue ? computed.iconBase + ' ' + computed.emptyIcon : computed.iconBase + ' ' + computed.fullIcon + ' active ';
        return computed.readonly ? icon + ' readonly' : icon;
      };
      scope.unpaintStars = function ($index, hover) {
        scope.paintStars(scope.lastValue - 1, hover);
      };
      scope.paintStars = function ($index, hover) {
        // ignore painting if readonly
        if (computed.readonly) {
          return;
        }
        var items = element.find('li')
          .find('i');
        for (var index = 0; index < items.length; index++) {
          var $star = angular.element(items[index]);
          if ($index >= index) {
            $star.removeClass(computed.emptyIcon);
            $star.addClass(computed.fullIcon);
            $star.addClass('active');
            $star.addClass(computed.iconHover);
          } else {
            $star.removeClass(computed.fullIcon);
            $star.removeClass('active');
            $star.removeClass(computed.iconHover);
            $star.addClass(computed.emptyIcon);
          }
        }
        if (!hover) {
          items.removeClass(computed.iconHover);
        }
      };
      scope.setValue = function (index, e) {
        // ignore setting value if readonly
        if (computed.readonly) {
          return;
        }
        var star = e.target,
          newValue;
        if (e.pageX < star.getBoundingClientRect()
          .left + star.offsetWidth / 2) {
          newValue = index + 1;
        } else {
          newValue = index + 1;
        }
        // sets to 0 if the user clicks twice on the first "star"
        // the user should be allowed to give a 0 score
        if (newValue === scope.lastValue && newValue === 1) {
          newValue = 0;
        }
        scope.lastValue = newValue;
        ngModelCtrl.$setViewValue(newValue);
        ngModelCtrl.$render();
        //Execute custom trigger function if there is one
        if (attrs.onStarClick) {
          scope.$eval(attrs.onStarClick);
        }
      };
    }
    return directive;   
  }]);