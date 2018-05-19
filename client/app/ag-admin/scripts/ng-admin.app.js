var ngapp = angular.module('base', ['ng-admin', 'http-auth-interceptor', 'angular-md5', 'ngResource', 'ngCookies', 'ngTagsInput']);
var admin_api_url = '/';
var limit_per_page = 20;
var $cookies;
var auth;
var site_settings;
var enabled_plugins;
angular.injector(['ngCookies'])
    .invoke(['$cookies', function(_$cookies_) {
        $cookies = _$cookies_;
    }]);
ngapp.config(['$httpProvider',
    function($httpProvider) {
        $httpProvider.interceptors.push('interceptor');
        $httpProvider.interceptors.push('oauthTokenInjector');
        menucollaps();
    }
]);
deferredBootstrapper.bootstrap({
    element: document.body,
    module: 'base',
    resolve: {
        CmsConfig: function($http) {
            return $http.get(admin_api_url + 'api/v1/admin-config');
        }
    }
});
if ($cookies.get('auth') !== undefined && $cookies.get('auth') !== null) {
    auth = JSON.parse($cookies.get('auth'));
}
if ($cookies.get('enabled_plugins') !== undefined && $cookies.get('enabled_plugins') !== null) {
    enabled_plugins = JSON.parse($cookies.get('enabled_plugins'));
}
if ($cookies.get('SETTINGS') !== undefined && $cookies.get('SETTINGS') !== null) {
    site_settings = JSON.parse($cookies.get('SETTINGS'));
    var site_name = site_settings.SITE_NAME;
    if (site_settings.SITE_IS_ENABLE_ZAZPAY_PLUGIN !== undefined && site_settings.SITE_IS_ENABLE_ZAZPAY_PLUGIN !== null) {
        var SITE_IS_ENABLE_ZAZPAY_PLUGIN = site_settings.SITE_IS_ENABLE_ZAZPAY_PLUGIN;
    }
} else {
    var site_name = $cookies.get('site_name');
}
ngapp.constant('user_types', {
    admin: 1,
    user: 2
});
ngapp.constant('ConstContest', {
    'PaymentPending': 1,
    'PendingApproval': 2,
    'Open': 3,
    'Rejected': 4,
    'RequestforCancellation': 5,
    'CanceledByAdmin': 6,
    'Judging': 7,
    'WinnerSelected': 8,
    'WinnerSelectedByAdmin': 9,
    'ChangeRequested': 10,
    'ChangeCompleted': 11,
    'FilesExpectation': 12,
    'DeliveryFilesUploaded': 13,
    'Completed': 14,
    'PaidtoParticipant': 15,
    'PendingActionToAdmin': 16
});
ngapp.constant('ConstTransactionType', {
    'AmountAddedToWallet': 1,
    'AdminAddedAmountToUserWallet': 2,
    'AdminDeductedAmountToUserWallet': 3,
    'ProjectListingFee': 4,
    'ProjectMilestonePaymentPaid': 5,
    'ProjectMilestonePaymentReleased': 6,
    'ProjectInvoicePayment': 7,
    'AmountRefundedToWalletForCanceledProjectPayment': 8,
    'ContestListingFee': 9,
    'AmountRefundedToWalletForCanceledContest': 10,
    'AmountRefundedToWalletForRejectedContest': 11,
    'ContestFeaturesUpdatedFee': 12,
    'ContestTimeExtendedFee': 13,
    'AmountMovedToParticipant': 14,
    'JobListingFee': 15,
    'QuoteSubscriptionPlan': 16,
    'ExamFee': 17,
    'WithdrawRequested': 18,
    'WithdrawRequestApproved': 19,
    'WithdrawRequestRejected': 20,
	'WithdrawRequestCommission': 21
});
ngapp.constant('TransactionAdminMessage', {
    1: '##USER## has added Amount to wallet',
    2: 'Site admin added amount to your wallet',
    3: 'Site admin deducted amount from your wallet',
    4: 'Listing fee paid for project - ##PROJECT##',
    5: '##OTHERUSER## has paid invoice for project - ##PROJECT## (Escrow Amount Paid)',
    6: '##USER## has paid milestone payment for project - ##PROJECT## (Escrow Amount Released)',
    7: '##USER## has paid invoice for project - ##PROJECT##',
    8: 'Project amount credited to your wallet due to cancellation of project - ##PROJECT##',
    9: 'Listing fee paid for contest - ##CONTEST##',
    10: 'Contest amount credited in your wallet due to cancelation of contest - ##CONTEST##',
    11: 'Contest amount credited in your wallet due to rejection of contest - ##CONTEST##)',
    12: 'Listing features fee paid for contest - ##CONTEST##',
    13: 'Listing time extended fee paid for contest - ##CONTEST##',
    14: 'You have paid award amount of contest - ##CONTEST##',
    15: 'Listing fee paid for job - ##JOB##',
    16: '##USER## has purchased - ##SUBSCRIPTION## subscription plan',
    17: 'Fee paid for Exam - ##EXAM##',
    18: '##OTHERUSER## has requested withdraw amount from wallet (Initiated)',
    19: 'Site admin approved your withdraw request and amount credited in your money transfer account',
    20: 'Site admin rejected your withdraw request.',
	21: 'Withdrawal fee from ##USER##'
});
ngapp.constant('PaymentGatewaySettings', {
    'Wallet': 1,
    'ZazPay': 2,
    'PayPalREST': 3
});

function truncate(value) {
    if (!value) {
        return '';
    }
    return value.length > 50 ? value.substr(0, 50) + '...' : value;
}
function withdrawn(value, entry) {
    if (!entry) {
        return '';
    }
    return entry.amount - entry.withdrawal_fee;
}

function statusdisplay(value) {
    if (value == true) {
        return '<span class="glyphicon glyphicon-ok"></span>';
    }
    return '';
}

function covertstringtonumber(value) {
    return parseFloat(value);
}
ngapp.config(function($stateProvider) {
    var getToken = {
        'TokenServiceData': function(adminTokenService, $q) {
            return $q.all({
                AuthServiceData: adminTokenService.promise,
                SettingServiceData: adminTokenService.promiseSettings
            });
        }
    };
    $stateProvider.state('login', {
            url: '/users/login',
            templateUrl: 'views/users_login.html',
            resolve: getToken
        })
        .state('payment_gateways', {
            parent: 'main',
            url: '/payment_gateways',
            controller: 'PaymentGatewayCtrl',
            templateUrl: 'views/payment_gateway.html',
            resolve: getToken
        })
        .state('cancellation_request', {
            parent: 'main',
            url: '/cancellation_request/:id',
            controller: 'CancelationController',
            templateUrl: 'views/cancellation_request.html',
            resolve: getToken
        })
        .state('transactions', {
            parent: 'main',
            url: '/transactions/all',
            controller: 'TransactionController',
            templateUrl: 'views/transaction.html',
            resolve: getToken
        })
        .state('project_dispute', {
            parent: 'main',
            url: '/dispute_edit/:id',
            controller: 'ProjectDisputeController',
            templateUrl: 'views/project_dispute.html',
            resolve: getToken
        })
		.state('servicelocations', {
            parent: 'main',
            url: '/servicelocation/:id',
            controller: 'ServicelocationController',
            templateUrl: 'views/servicelocation.html',
            resolve: getToken
        })
        .state('logout', {
            url: '/users/logout',
            controller: 'UsersLogoutCtrl',
            resolve: getToken
        })      
        .state('plugins', {
            parent: 'main',
            url: '/plugins',
            controller: 'PluginsController',
            templateUrl: 'views/plugins.html',
            resolve: getToken
        })
        .state('translations', {
            parent: 'main',
            url: '/translations/all',
            controller: 'TranslationsController',
            templateUrl: 'views/translations.html',
            resolve: getToken
        })
       .state('translation_edit', {
            parent: 'main',
            url: '/translations?lang_code',
            controller: 'TranslationsController',
            templateUrl: 'views/translation_edit.html',
            resolve: getToken
        })
        .state('translation_add', {
            parent: 'main',
            url: '/translations/add',
            controller: 'TranslationsController',
            templateUrl: 'views/make_new_translation.html',
            resolve: getToken
        })
        .state('change_password', {
            parent: 'main',
            url: '/change_password',
            templateUrl: 'views/change_password.html',
            params: {
                id: null
            },
            controller: 'ChangePasswordController',
            resolve: getToken
        })
});
ngapp.directive('cancelRequest', ['$location', function($location) {
    return {
        restrict: 'E',
        scope: {
            contest: '&'
        },
        link: function(scope) {
            scope.cancellation_request = function() {
                $location.path('/cancellation_request/' + scope.contest()
                    .values.id);
            };
        },
        template: '<a class="btn btn-primary" ng-click="cancellation_request()">Request for cancellation</a>'
    };
}]);
ngapp.directive('examLists', ['$location', '$http', function($location, $http) {
    return {
        restrict: 'E',
        controller: function($state, $scope, notification, ExamListsFactory, ExamQuestions) {
            ExamListsFactory.get(function(response) {
                //$scope.salarytypes = response.data;
                $scope.salarytypes = [];
                angular.forEach(response.data, function(value) {
                    $scope.salarytypes.push({
                        id: value.id,
                        text: value.title + ' (' + value.exam_level.name + ')',
                    });
                });
                $scope.checkboxValue = function(value) {
                    var favorite = [];
                    //jshint unused:false
                    $.each($("input[type='checkbox']:checked"), function() {
                        favorite.push($(this)
                            .val());
                        var examquestionData = {};
                        examquestionData.exam_id = value;
                        examquestionData.question_id = $(this)
                            .val();
                        examquestionData.display_order = 0;
                        ExamQuestions.post(examquestionData, function(response) {
                            if (response.data) {
                                console.log('Added Successfully');
                            } else {
                                console.log('Not added Successfully');
                            }
                        });
                    });
                    if (favorite.length > 0) {
                        $state.reload();
                        notification.log('Questions added successfully', {
                            addnCls: 'humane-flatty-success'
                        });
                    } else {
                        $state.reload();
                        notification.log('Please select questions', {
                            addnCls: 'humane-flatty-error'
                        });
                    }
                };
            });
        },
        template: '<div class="frm-select"><select name="salary_type" id="inputCategory" ng-change="checkboxValue(salary_type_id)" ng-model="salary_type_id" class="form-control" ng-required="true">    <option value="{{salarytype.id}}">{{"Please Select"|translate}}</option><option value="{{salarytype.id}}" ng-repeat="salarytype in salarytypes">{{salarytype.text}} </option></select></div>'
    };
}]);
ngapp.directive('projectShow', ['$location', '$state', function($location, $state) {
    return {
        restrict: 'E',
        scope: {
            entity: '@',
            id: '@',
            slug: '@'
        },
        link: function(scope) {
            var url = $location.host();
            if (scope.entity === 'project') {
                scope.projectadd = 'http://' + url + '/projects/view/' + scope.id + '/' + scope.slug;
            }  
        },
        template: '<a class="btn btn-info editable-table-button btn-xs" href="{{projectadd}}"><span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span>&nbsp;<span class="hidden-xs ng-scope" translate="Show">Show</span></a>'
    };
}]);
ngapp.directive('projectCreate', ['$location', '$state', function($location, $state) {
    return {
        restrict: 'E',
        scope: {
            entity: '@',
            id: '@'
        },
        link: function(scope) {
            var url = $location.host();
            if (scope.entity === 'project') {
                scope.projectadd = 'http://' + url + '/projects/add';
            } else if (scope.entity === 'job') {
                scope.projectadd = 'http://' + url + '/jobs/add';
            } else if (scope.entity === 'contest') {
                scope.projectadd = 'http://' + url + '/contest_types';
            } else if (scope.entity === 'portfolio') {
                scope.projectadd = 'http://' + url + '/portfolios';
            } else if (scope.entity === 'service') {
                scope.projectadd = 'http://' + url + '/quote_service/add';
            }
        },
        template: '<a class="btn btn-success" href="{{projectadd}}"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span>&nbsp;<span class="hidden-xs ng-scope" translate="CREATE">Create</span></a>'
    };
}]);
ngapp.directive('projectEdit', ['$location', '$state', function($location, $state) {
    return {
        restrict: 'E',
        scope: {
            entity: '@',
            id: '@'
        },
        link: function(scope) {
            var url = $location.host();
            if (scope.entity === 'project') {
                scope.projectadd = 'http://' + url + '/projects/edit/' + scope.id;
            } else if (scope.entity === 'job') {
                scope.projectadd = 'http://' + url + '/jobs/edit/' + scope.id;
            } else if (scope.entity === 'contest') {
                scope.projectadd = 'http://' + url + '/contests/edit/' + scope.id;
            } else if (scope.entity === 'portfolio') {
                scope.projectadd = 'http://' + url + '/portfolios';
            } else if (scope.entity === 'service') {
                scope.projectadd = 'http://' + url + '/user/quote_service/edit/' + scope.id;
            }
        },
        template: '<a class="btn btn-primary editable-table-button btn-xs" href="{{projectadd}}"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>&nbsp;<span class="hidden-xs ng-scope" translate="EDIT">Edit</span></a>'
    };
}]);
ngapp.directive('disputeEdit', ['$location', '$state', function($location, $state) {
    return {
        restrict: 'E',
        scope: {
            entity: '@',
            id: '@'
        },
        link: function(scope) {
            var url = $location.host();
            if (scope.entity === 'project_disputes') {
                scope.disputeEdit = 'http://' + url + '/ag-admin/#/dispute_edit/' + scope.id;
            }
        },
        template: '<a class="btn btn-primary editable-table-button btn-xs" href="{{disputeEdit}}"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>&nbsp;<span class="hidden-xs ng-scope" translate="EDIT">Edit</span></a>'
    };
}]);
ngapp.directive('starRatings', function(md5) {
    return {
        restrict: 'E',
        scope: {
            entity: "&",
            entry: "&",
            stars: '@'
        },
        link: function(scope, elem, attrs, ctrl) {
            if (angular.isDefined(scope.entry()
                    .values['resume_rating_count'] && scope.entry()
                    .values['total_resume_rating'])) {
                scope.resume = scope.entry()
                    .values['resume_rating_count'];
                scope.total = scope.entry()
                    .values['total_resume_rating'];
                scope.stars = scope.total / scope.resume;
                scope.star = scope.resume + ' Reviews';
                scope.starsArray = Array.apply(null, {
                        length: parseInt(scope.stars)
                    })
                    .map(Number.call, Number);
            } else {
                scope.stars = 'Not Found';
            }
        },
        template: '<p><i ng-repeat="star in starsArray" class="glyphicon glyphicon-star"></i> ({{star}}) </p>'
    };
});
ngapp.directive('starRating', function() {
    return {
        restrict: 'E',
        scope: {
            stars: '@'
        },
        link: function(scope, elm, attrs, ctrl) {
            scope.starsArray = Array.apply(null, {
                    length: parseInt(scope.stars)
                })
                .map(Number.call, Number);
        },
        template: '<i ng-repeat="star in starsArray" class="glyphicon glyphicon-star"></i>'
    };
});
ngapp.directive('paymentGateways', function(paymentGateway, zazpaySynchronize, $state, PaymentGatewaySettings) {
    return {
        restrict: 'E',
        scope: {
            entity: "&",
            entityName: "@",
            entry: "&"
        },
        controller: function($rootScope, $scope, $location, notification) {
            angular.element(document.querySelector('ma-submit-button')
                .remove());
            $scope.test_mode_value = {};
            $scope.live_mode_value = {};
            $scope.liveMode = false;
            $scope.save = function() {
                $scope.data = {};
                if($scope.liveMode === true)
                {
                     $scope.data.live_mode_value = $scope.live_mode_value;
                      $scope.data.is_live_mode = true;
                }else{
                     $scope.data.test_mode_value = $scope.test_mode_value;
                     $scope.data.is_live_mode = false;
                }
                $scope.data.id = $scope.entry()
                    .values.id;
                paymentGateway.update($scope.data, function(response) {
                    if (angular.isDefined(response.error.code === 0)) {
                        notification.log('Data updated successfully', {
                            addnCls: 'humane-flatty-success'
                        });
                    }
                });
            };
            $scope.zazpay_synchronize = function() {
                zazpaySynchronize.get({}, function(response) {
                    if (angular.isDefined(response.error.code === 0)) {
                        notification.log('Synchronize with zazpay successfully', {
                            addnCls: 'humane-flatty-success'
                        });
                    }
                });
            };
            $scope.index = function() {
                angular.forEach($scope.entry()
                    .values.payment_settings,
                    function(value, key) {
                        $scope.test_mode_value[value.name] = value.test_mode_value;
                        $scope.live_mode_value[value.name] = value.live_mode_value;
                    });
                    if(parseInt($state.params.id) === PaymentGatewaySettings.PayPalREST)
                    {
                        $scope.PayPalREST = true;
                    }else{
                        $scope.PayPalREST = false;
                    }
                    if(parseInt($state.params.id) === PaymentGatewaySettings.Wallet)
                    {
                        $scope.wallet = true;
                    }else{
                         $scope.wallet = false;
                    }
            };
            $scope.index();
        },
        template: '<span ng-show="!wallet"><input type="checkbox" ng-model="liveMode"></span>&nbsp;<label ng-if="!wallet">Live Mode?</label><table ng-show="!PayPalREST &&!wallet"><tr><th></th><th>Live Mode Credential</th><th>&nbsp;</th><th>Test Mode Credential</th></tr><tr><td>Merchant ID &nbsp;&nbsp;</td><td><input type="text" ng-model="live_mode_value.zazpay_merchant_id" class="form-control"></td><td>&nbsp;</td><td><input type="text" class="form-control" ng-readonly="live_mode" ng-model="test_mode_value.zazpay_merchant_id"></td></tr><tr><td>Website ID</td><td><input type="text" class="form-control" ng-model="live_mode_value.zazpay_website_id"></td><td>&nbsp;</td><td><input type="text" class="form-control" ng-readonly="live_mode" ng-model="test_mode_value.zazpay_website_id"></td></tr><tr><td>Secret Key</td><td><input type="text" ng-model="live_mode_value.zazpay_secret_string" class="form-control"></td><td>&nbsp;</td><td><input type="text" ng-readonly="live_mode" ng-model="test_mode_value.zazpay_secret_string" class="form-control"></td></tr><tr><td>API Key</td><td><input type="text" ng-model="live_mode_value.zazpay_api_key" class="form-control"></td><td>&nbsp;</td><td><input type="text" ng-readonly="live_mode" ng-model="test_mode_value.zazpay_api_key" class="form-control"></td></tr><tr><td>&nbsp;</td><td><button type="button" ng-click="save()" class="btn btn-primary"><span class="glyphicon glyphicon-ok"></span>&nbsp;<span class="hidden-xs">Save changes</span></button></td><td>&nbsp;</td><td><button type="button" ng-click="zazpay_synchronize()" class="btn btn-primary"><span class="glyphicon glyphicon-refresh"></span>&nbsp;<span class="hidden-xs">Sync with ZazPay</span></button></td></tr></table><table ng-show="PayPalREST && !wallet"><tr><th></th><th>Live Mode Credential</th><th>&nbsp;</th><th>Test Mode Credential</th></tr><tr><td>Client Secret &nbsp;&nbsp;</td><td><input type="text" ng-model="live_mode_value.paypal_client_Secret" class="form-control"></td><td>&nbsp;</td><td><input type="text" class="form-control" ng-readonly="live_mode" ng-model="test_mode_value.paypal_client_Secret"></td></tr><tr><td>Client ID</td><td><input type="text" class="form-control" ng-model="live_mode_value.paypal_client_id"></td><td>&nbsp;</td><td><input type="text" class="form-control" ng-readonly="live_mode" ng-model="test_mode_value.paypal_client_id"></td></tr><tr><td>&nbsp;</td><td><button type="button" ng-click="save()" class="btn btn-primary"><span class="glyphicon glyphicon-ok"></span>&nbsp;<span class="hidden-xs">Save changes</span></button></td><td>&nbsp;</td><td><button type="button" ng-click="zazpay_synchronize()" class="btn btn-primary"><span class="glyphicon glyphicon-refresh"></span>&nbsp;<span class="hidden-xs">Sync with ZazPay</span></button></td></tr></table>',
    };
});
ngapp.directive('googlePlaces', ['$location', function($location) {
    return {
        restrict: 'E',
        scope: {
            entity: "&",
            entityName: "@",
            entry: "&",
            size: "@",
            label: "@"
        },
        link: function(scope) {
            var inputFrom = document.getElementById('goo-place');
            var autocompleteFrom = new google.maps.places.Autocomplete(inputFrom);
            google.maps.event.addListener(autocompleteFrom, 'place_changed', function() {
                scope.entry()
                    .values['city.name'] = '';
                scope.entry()
                    .values['address'] = '';
                scope.entry()
                    .values['address1'] = '';
                scope.entry()
                    .values['state.name'] = '';
                scope.entry()
                    .values['country.iso_alpha2'] = '';
                scope.entry()
                    .values['zip_code'] = '';
                var place = autocompleteFrom.getPlace();
                scope.entry()
                    .values.latitude = place.geometry.location.lat();
                scope.entry()
                    .values.longitude = place.geometry.location.lng();
                var k = 0;
                angular.forEach(place.address_components, function(value, key) {
                    //jshint unused:false
                    if (value.types[0] === 'locality' || value.types[0] === 'administrative_area_level_2') {
                        if (k === 0) {
                            scope.entry()
                                .values['city.name'] = value.long_name;
                            document.getElementById("city.name")
                                .disabled = true;
                        }
                        if (value.types[0] === 'locality') {
                            k = 1;
                        }
                    }
                    if (value.types[0] === 'premise' || value.types[0] === 'route') {
                        if (scope.entry()
                            .values['address'] !== '') {
                            scope.entry()
                                .values['address'] = scope.entry()
                                .values['address'] + ',' + value.long_name;
                        } else {
                            scope.entry()
                                .values['address'] = value.long_name;
                        }
                    }
                    if (value.types[0] === 'sublocality_level_1' || value.types[0] === 'sublocality_level_2') {
                        if (scope.entry()
                            .values['address1'] !== '') {
                            scope.entry()
                                .values['address1'] = scope.entry()
                                .values['address1'] + ',' + value.long_name;
                        } else {
                            scope.entry()
                                .values['address1'] = value.long_name;
                        }
                    }
                    if (value.types[0] === 'administrative_area_level_1') {
                        scope.entry()
                            .values['state.name'] = value.long_name;
                        document.getElementById("state.name")
                            .disabled = true;
                    }
                    if (value.types[0] === 'country') {
                        scope.entry()
                            .values['country.iso_alpha2'] = value.short_name;
                        document.getElementById("country.iso_alpha2")
                            .disabled = true;
                    }
                    if (value.types[0] === 'postal_code') {
                        scope.entry()
                            .values.zip_code = parseInt(value.long_name);
                        document.getElementById("zip_code")
                            .disabled = true;
                    }
                });
                scope.$apply();
            });
        },
        template: '<input class="form-control" id="goo-place"/>'
    };
}]);
ngapp.directive('changePassword', ['$location', '$state', '$http', 'notification', function($location, $state, $http, notification) {
    return {
        restrict: 'E',
        scope: {
            entity: "&",
            entityName: "@",
            entry: "&",
            size: "@",
            label: "@"
        },
        template: '<a class=\"btn btn-default btn-xs\" title="Change Password" ng-click=\"password()\" >\n<span class=\"glyphicon glyphicon-lock sync-icon\" aria-hidden=\"true\"></span>&nbsp;<span class=\"sync hidden-xs\"> {{label}}</span> <span ng-show=\"disableButton\"><i class=\"fa fa-spinner fa-pulse fa-lg\"></i></span>\n</a>',
        link: function(scope, element) {
            var id = scope.entry()
                .values.id;
            scope.password = function() {
                $state.go('change_password', {
                    id: id
                });
            };
        }
    };
}]);
ngapp.directive('displayImage', function(md5) {
    return {
        restrict: 'E',
        scope: {
            entity: "&",
            entry: "&"
        },
        link: function(scope, elem, attrs) {
            scope.type = attrs.type;
            scope.thumb = attrs.thumb;
            if (angular.isDefined(scope.entry()
                    .values['attachment.foreign_id']) && scope.entry()
                .values['attachment.foreign_id'] !== null && scope.entry()
                .values['attachment.foreign_id'] !== 0) {
                var hash = md5.createHash(scope.type + scope.entry()
                    .values.id + 'png' + scope.thumb);
                scope.image = '/images/' + scope.thumb + '/' + scope.type + '/' + scope.entry()
                    .values.id + '.' + hash + '.png';
            } else {
                scope.image = '../images/no-image.png';
            }
        },
        template: '<img ng-src="{{image}}" height="42" width="42" />'
    };
});
ngapp.directive('budgetRange', function(md5) {
    return {
        restrict: 'E',
        scope: {
            entity: "&",
            entry: "&"
        },
        link: function(scope, elem, attrs) {
            if (angular.isDefined(scope.entry()
                    .values['project_range.name'] && scope.entry()
                    .values['project_range.min_amount'] && scope.entry()
                    .values['project_range.max_amount'])) {
                scope.name = scope.entry()
                    .values['project_range.name'];
                scope.min = scope.entry()
                    .values['project_range.min_amount'];
                scope.max = scope.entry()
                    .values['project_range.max_amount'];
                scope.budget = scope.name + ' ($' + scope.min + '-$' + scope.max + ')';
            } else {
                scope.budget = 'Not Found';
            }
        },
        template: '<p height="42" width="42">{{budget}}</p>'
    };
});
ngapp.directive('withdrawStatus', function(md5) {
    return {
        restrict: 'E',
        scope: {
            entity: "&",
            entry: "&"
        },
        link: function(scope, elem, attrs) {            
            if (angular.isDefined(scope.entry()
                    .values['withdrawal_status_id']) && scope.entry()
                .values['withdrawal_status_id'] !== null) {
                if (scope.entry()
                    .values['withdrawal_status_id'] == 1) {
                    scope.status = 'Pending';
                }
                if (scope.entry()
                    .values['withdrawal_status_id'] == 2) {
                    scope.status = 'Under Process';
                }
                if (scope.entry()
                    .values['withdrawal_status_id'] == 3) {
                    scope.status = 'Success';
                }
                if (scope.entry()
                    .values['withdrawal_status_id'] == 4) {
                    scope.status = 'Rejected';
                }
            } else {
                scope.budget = 'Not Found';
            }
        },
        template: '<p height="42" width="42">{{status}}</p>'
    };
});
ngapp.directive('faqQuestion', function(md5) {
    return {
        restrict: 'E',
        scope: {
            entity: "&",
            entry: "&"
        },
        link: function(scope, elem, attrs) {
            if (angular.isDefined(scope.entry()
                    .values['quote_user_faq_question.question'] || scope.entry()
                    .values['quote_faq_question_template.question'])) {
                if (scope.entry()
                    .values['quote_user_faq_question_id'] !== null) {
                    scope.question = scope.entry()
                        .values['quote_user_faq_question.question'];
                }
                if (scope.entry()
                    .values['quote_faq_question_template_id'] !== null) {
                    scope.question = scope.entry()
                        .values['quote_faq_question_template.question'];
                }
            } else {
                scope.budget = 'Not Found';
            }
        },
        template: '<p height="42" width="42">{{question}}</p>'
    };
});
ngapp.directive('applyVia', function(md5) {
    return {
        restrict: 'E',
        scope: {
            entity: "&",
            entry: "&"
        },
        link: function(scope, elem, attrs) {
            if (angular.isDefined(scope.entry()
                    .values['apply_via']) && scope.entry()
                .values['apply_via'] !== null) {
                if (scope.entry()
                    .values['apply_via'] == 'via_our_site') {
                    scope.apply = 'Our Site';
                }
                if (scope.entry()
                    .values['apply_via'] == 'via_company') {
                    scope.apply = 'Company';
                }
            } else {
                scope.apply = 'Not Found';
            }
        },
        template: '<p height="42" width="42">{{apply}}</p>'
    };
});
ngapp.directive('displayImages', function(md5) {
    return {
        restrict: 'E',
        scope: {
            entity: "&",
            entry: "&"
        },
        link: function(scope, elem, attrs) {
            scope.type = attrs.type;
            scope.thumb = attrs.thumb;
            if (angular.isDefined(scope.entry()
                    .values['attachment'][0]['foreign_id']) && scope.entry()
                .values['attachment'][0]['foreign_id'] !== null && scope.entry()
                .values['attachment'][0]['foreign_id'] !== 0) {
                var hash = md5.createHash(scope.type + scope.entry()
                    .values.id + 'png' + scope.thumb);
                scope.image = '/images/' + scope.thumb + '/' + scope.type + '/' + scope.entry()
                    .values.id + '.' + hash + '.png';
            } else {
                scope.image = '../images/no-image.png';
            }
        },
        template: '<img ng-src="{{image}}" height="42" width="42" />'
    };
});
ngapp.directive('batchActive', ['$location', '$state', 'notification', '$q', 'Restangular', function($location, $state, notification, $q, Restangular) {
    return {
        restrict: 'E',
        scope: {
            selection: '=',
            type: '@',
            action: '@'
        },
        link: function(scope, element, attrs) {
            const status_name = attrs.type == 'active' ? 'Active' : 'Active';
            scope.icon = attrs.type == 'active' ? 'glyphicon-ok' : 'glyphicon-ok';
            scope.label = attrs.type == 'active' ? 'Active' : 'Active';
            scope.action = attrs.action;
            scope.updateStatus = function(action) {
                $q.all(scope.selection.map(function(e) {
                        var p = Restangular.one('/' + action + '/' + e.values.id);
                        p.is_active = 1;
                        p.put()
                            .then(function() {
                                $state.reload()
                            })
                    }))
                    .then(function() {
                        notification.log(scope.selection.length + ' status changed to  ' + status_name, {
                            addnCls: 'humane-flatty-success'
                        });
                    })
            }
        },
        template: '<span ng-click="updateStatus(action)"><span class="glyphicon {{ icon }}" aria-hidden="true"></span>&nbsp;{{ label }}</span>'
    };
}]);
ngapp.directive('batchInActive', ['$location', '$state', 'notification', '$q', 'Restangular', function($location, $state, notification, $q, Restangular) {
    return {
        restrict: 'E',
        scope: {
            selection: '=',
            type: '@',
            action: '@'
        },
        link: function(scope, element, attrs) {
            const status_name = attrs.type == 'active' ? 'Inactive' : 'Inactive';
            scope.icon = attrs.type == 'active' ? 'glyphicon-remove' : 'glyphicon-remove';
            scope.label = attrs.type == 'active' ? 'Inactive' : 'Inactive';
            scope.action = attrs.action;
            scope.updateStatus = function(action) {
                $q.all(scope.selection.map(function(e) {
                        var p = Restangular.one('/' + action + '/' + e.values.id);
                        p.is_active = 0;
                        p.put()
                            .then(function() {
                                $state.reload()
                            })
                    }))
                    .then(function() {
                        notification.log(scope.selection.length + ' status changed to  ' + status_name, {
                            addnCls: 'humane-flatty-success'
                        });
                    })
            }
        },
        template: '<span ng-click="updateStatus(action)"><span class="glyphicon {{ icon }}" aria-hidden="true"></span>&nbsp;{{ label }}</span>'
    };
}]);
ngapp.directive('batchJobCancelled', ['$location', '$state', 'notification', '$q', 'Restangular', function($location, $state, notification, $q, Restangular) {
    return {
        restrict: 'E',
        scope: {
            selection: '=',
            type: '@',
            action: '@'
        },
        link: function(scope, element, attrs) {
            const status_name = attrs.type == 'cancel' ? 'Mark as Cancelled' : 'Mark as Cancelled';
            scope.icon = attrs.type == 'cancel' ? 'glyphicon-remove' : 'glyphicon-remove';
            scope.label = attrs.type == 'cancel' ? 'Mark as Cancelled' : 'Mark as Cancelled';
            scope.action = attrs.action;
            scope.updateStatus = function(action) {
                $q.all(scope.selection.map(function(e) {
                        var p = Restangular.one('/' + action + '/' + e.values.id);
                        p.job_status_id = 8;
                        p.put()
                            .then(function() {
                                $state.reload()
                            })
                    }))
                    .then(function() {
                        notification.log(scope.selection.length + ' status changed to  ' + status_name, {
                            addnCls: 'humane-flatty-success'
                        });
                    })
            }
        },
        template: '<span ng-click="updateStatus(action)"><span class="glyphicon {{ icon }}" aria-hidden="true"></span>&nbsp;{{ label }}</span>'
    };
}]);
ngapp.directive('batchJobOpen', ['$location', '$state', 'notification', '$q', 'Restangular', function($location, $state, notification, $q, Restangular) {
    return {
        restrict: 'E',
        scope: {
            selection: '=',
            type: '@',
            action: '@'
        },
        link: function(scope, element, attrs) {
            const status_name = attrs.type == 'open' ? 'Mark as Open' : 'Mark as Open';
            scope.icon = attrs.type == 'open' ? 'glyphicon-ok' : 'glyphicon-ok';
            scope.label = attrs.type == 'open' ? 'Mark as Open' : 'Mark as Open';
            scope.action = attrs.action;
            scope.updateStatus = function(action) {
                $q.all(scope.selection.map(function(e) {
                        var p = Restangular.one('/' + action + '/' + e.values.id);
                        p.job_status_id = 4;
                        p.put()
                            .then(function() {
                                $state.reload()
                            })
                    }))
                    .then(function() {
                        notification.log(scope.selection.length + ' status changed to  ' + status_name, {
                            addnCls: 'humane-flatty-success'
                        });
                    })
            }
        },
        template: '<span ng-click="updateStatus(action)"><span class="glyphicon {{ icon }}" aria-hidden="true"></span>&nbsp;{{ label }}</span>'
    };
}]);
ngapp.directive('batchQuestionAdd', ['$location', '$state', 'notification', '$q', 'Restangular', function($location, $state, notification, $q, Restangular) {
    return {
        restrict: 'E',
        scope: {
            selection: '=',
            type: '@',
            action: '@'
        },
        link: function(scope, element, attrs) {
            const status_name = attrs.type == 'open' ? 'Mark as Open' : 'Mark as Open';
            scope.icon = attrs.type == 'open' ? 'glyphicon-ok' : 'glyphicon-ok';
            scope.label = attrs.type == 'open' ? 'Mark as Open' : 'Mark as Open';
            scope.action = attrs.action;
            scope.updateStatus = function(action) {
                $q.all(scope.selection.map(function(e) {
                        var p = Restangular.one('/' + action + '/' + e.values.id);
                        p.job_status_id = 4;
                        p.put()
                            .then(function() {
                                $state.reload()
                            })
                    }))
                    .then(function() {
                        notification.log(scope.selection.length + ' status changed to  ' + status_name, {
                            addnCls: 'humane-flatty-success'
                        });
                    })
            }
        },
        template: '<span ng-click="updateStatus(action)"><span class="glyphicon {{ icon }}" aria-hidden="true"></span>&nbsp;{{ label }}</span>'
    };
}]);
ngapp.directive('batchInvoicePaid', ['$location', '$state', 'notification', '$q', 'Restangular', function($location, $state, notification, $q, Restangular) {
    return {
        restrict: 'E',
        scope: {
            selection: '=',
            type: '@',
            action: '@'
        },
        link: function(scope, element, attrs) {
            const status_name = attrs.type == 'paid' ? 'Mark as Paid' : 'Mark as Paid';
            scope.icon = attrs.type == 'paid' ? 'glyphicon-ok' : 'glyphicon-ok';
            scope.label = attrs.type == 'paid' ? 'Mark as Paid' : 'Mark as Paid';
            scope.action = attrs.action;
            scope.updateStatus = function(action) {
                $q.all(scope.selection.map(function(e) {
                        var p = Restangular.one('/' + action + '/' + e.values.id);
                        p.is_paid = true;
                        p.put()
                            .then(function() {
                                $state.reload()
                            })
                    }))
                    .then(function() {
                        notification.log(scope.selection.length + ' status changed to  ' + status_name, {
                            addnCls: 'humane-flatty-success'
                        });
                    })
            }
        },
        template: '<span ng-click="updateStatus(action)"><span class="glyphicon {{ icon }}" aria-hidden="true"></span>&nbsp;{{ label }}</span>'
    };
}]);
ngapp.directive('batchInvoiceUnpaid', ['$location', '$state', 'notification', '$q', 'Restangular', function($location, $state, notification, $q, Restangular) {
    return {
        restrict: 'E',
        scope: {
            selection: '=',
            type: '@',
            action: '@'
        },
        link: function(scope, element, attrs) {
            const status_name = attrs.type == 'unpaid' ? 'Mark as Unpaid' : 'Mark as Unpaid';
            scope.icon = attrs.type == 'unpaid' ? 'glyphicon-remove' : 'glyphicon-remove';
            scope.label = attrs.type == 'unpaid' ? 'Mark as Unpaid' : 'Mark as Unpaid';
            scope.action = attrs.action;
            scope.updateStatus = function(action) {
                $q.all(scope.selection.map(function(e) {
                        var p = Restangular.one('/' + action + '/' + e.values.id);
                        p.is_paid = false;
                        p.put()
                            .then(function() {
                                $state.reload()
                            })
                    }))
                    .then(function() {
                        notification.log(scope.selection.length + ' status changed to  ' + status_name, {
                            addnCls: 'humane-flatty-success'
                        });
                    })
            }
        },
        template: '<span ng-click="updateStatus(action)"><span class="glyphicon {{ icon }}" aria-hidden="true"></span>&nbsp;{{ label }}</span>'
    };
}]);
ngapp.directive('batchProjectApproved', ['$location', '$state', 'notification', '$q', 'Restangular', function($location, $state, notification, $q, Restangular) {
    return {
        restrict: 'E',
        scope: {
            selection: '=',
            type: '@',
            action: '@'
        },
        link: function(scope, element, attrs) {
            const status_name = attrs.type == 'approved' ? 'Mark as Approved' : 'Mark as Approved';
            scope.icon = attrs.type == 'approved' ? 'glyphicon-ok' : 'glyphicon-ok';
            scope.label = attrs.type == 'approved' ? 'Mark as Approved' : 'Mark as Approved';
            scope.action = attrs.action;
            scope.updateStatus = function(action) {
                $q.all(scope.selection.map(function(e) {
                        var p = Restangular.one('/' + action + '/' + e.values.id);
                        p.project_status_id = 4;
                        p.put()
                            .then(function() {
                                $state.reload()
                            })
                    }))
                    .then(function() {
                        notification.log(scope.selection.length + ' status changed to  ' + status_name, {
                            addnCls: 'humane-flatty-success'
                        });
                    })
            }
        },
        template: '<span ng-click="updateStatus(action)"><span class="glyphicon {{ icon }}" aria-hidden="true"></span>&nbsp;{{ label }}</span>'
    };
}]);
ngapp.directive('batchProjectCancelled', ['$location', '$state', 'notification', '$q', 'Restangular', function($location, $state, notification, $q, Restangular) {
    return {
        restrict: 'E',
        scope: {
            selection: '=',
            type: '@',
            action: '@'
        },
        link: function(scope, element, attrs) {
            const status_name = attrs.type == 'cancelled' ? 'Mark as Cancelled' : 'Mark as Cancelled';
            scope.icon = attrs.type == 'cancelled' ? 'glyphicon-remove' : 'glyphicon-remove';
            scope.label = attrs.type == 'cancelled' ? 'Mark as Cancelled' : 'Mark as Cancelled';
            scope.action = attrs.action;
            scope.updateStatus = function(action) {
                $q.all(scope.selection.map(function(e) {
                        var p = Restangular.one('/' + action + '/' + e.values.id);
                        p.project_status_id = 13;
                        p.put()
                            .then(function() {
                                $state.reload()
                            })
                    }))
                    .then(function() {
                        notification.log(scope.selection.length + ' status changed to  ' + status_name, {
                            addnCls: 'humane-flatty-success'
                        });
                    })
            }
        },
        template: '<span ng-click="updateStatus(action)"><span class="glyphicon {{ icon }}" aria-hidden="true"></span>&nbsp;{{ label }}</span>'
    };
}]);
ngapp.directive('batchWithdrawPending', ['$location', '$state', 'notification', '$q', 'Restangular', function($location, $state, notification, $q, Restangular) {
    return {
        restrict: 'E',
        scope: {
            selection: '=',
            type: '@',
            action: '@'
        },
        link: function(scope, element, attrs) {
            const status_name = attrs.type == 'pending' ? 'Mark as Pending' : 'Mark as Pending';
            scope.icon = attrs.type == 'pending' ? 'glyphicon-ok' : 'glyphicon-ok';
            scope.label = attrs.type == 'pending' ? 'Mark as Pending' : 'Mark as Pending';
            scope.action = attrs.action;
            scope.updateStatus = function(action) {
                $q.all(scope.selection.map(function(e) {
                        var p = Restangular.one('/' + action + '/' + e.values.id);
                        p.withdrawal_status_id = 1;
                        p.put()
                            .then(function() {
                                $state.reload()
                            })
                    }))
                    .then(function() {
                        notification.log(scope.selection.length + ' status changed to  ' + status_name, {
                            addnCls: 'humane-flatty-success'
                        });
                    })
            }
        },
        template: '<span ng-click="updateStatus(action)"><span class="glyphicon {{ icon }}" aria-hidden="true"></span>&nbsp;{{ label }}</span>'
    };
}]);
ngapp.directive('batchWithdrawProcess', ['$location', '$state', 'notification', '$q', 'Restangular', function($location, $state, notification, $q, Restangular) {
    return {
        restrict: 'E',
        scope: {
            selection: '=',
            type: '@',
            action: '@'
        },
        link: function(scope, element, attrs) {
            const status_name = attrs.type == 'process' ? 'Under Process' : 'Under Process';
            scope.icon = attrs.type == 'process' ? 'glyphicon-asterisk' : 'glyphicon-asterisk';
            scope.label = attrs.type == 'process' ? 'Under Process' : 'Under Process';
            scope.action = attrs.action;
            scope.updateStatus = function(action) {
                $q.all(scope.selection.map(function(e) {
                        var p = Restangular.one('/' + action + '/' + e.values.id);
                        p.withdrawal_status_id = 2;
                        p.put()
                            .then(function() {
                                $state.reload()
                            })
                    }))
                    .then(function() {
                        notification.log(scope.selection.length + ' status changed to  ' + status_name, {
                            addnCls: 'humane-flatty-success'
                        });
                    })
            }
        },
        template: '<span ng-click="updateStatus(action)"><span class="glyphicon {{ icon }}" aria-hidden="true"></span>&nbsp;{{ label }}</span>'
    };
}]);
ngapp.directive('batchWithdrawReject', ['$location', '$state', 'notification', '$q', 'Restangular', function($location, $state, notification, $q, Restangular) {
    return {
        restrict: 'E',
        scope: {
            selection: '=',
            type: '@',
            action: '@'
        },
        link: function(scope, element, attrs) {
            const status_name = attrs.type == 'reject' ? 'Mark as Rejected' : 'Mark as Rejected';
            scope.icon = attrs.type == 'reject' ? 'glyphicon-remove' : 'glyphicon-remove';
            scope.label = attrs.type == 'reject' ? 'Mark as Rejected' : 'Mark as Rejected';
            scope.action = attrs.action;
            scope.updateStatus = function(action) {
                $q.all(scope.selection.map(function(e) {
                        var p = Restangular.one('/' + action + '/' + e.values.id);
                        p.withdrawal_status_id = 4;
                        p.put()
                            .then(function() {
                                $state.reload()
                            })
                    }))
                    .then(function() {
                        notification.log(scope.selection.length + ' status changed to  ' + status_name, {
                            addnCls: 'humane-flatty-success'
                        });
                    })
            }
        },
        template: '<span ng-click="updateStatus(action)"><span class="glyphicon {{ icon }}" aria-hidden="true"></span>&nbsp;{{ label }}</span>'
    };
}]);
ngapp.directive('batchWithdrawSuccess', ['$location', '$state', 'notification', '$q', 'Restangular', function($location, $state, notification, $q, Restangular) {
    return {
        restrict: 'E',
        scope: {
            selection: '=',
            type: '@',
            action: '@'
        },
        link: function(scope, element, attrs) {
            const status_name = attrs.type == 'reject' ? 'Mark as Transfered' : 'Mark as Transfered';
            scope.icon = attrs.type == 'reject' ? 'glyphicon-transfer' : 'glyphicon-transfer';
            scope.label = attrs.type == 'reject' ? 'Mark as Transfered' : 'Mark as Transfered';
            scope.action = attrs.action;
            scope.updateStatus = function(action) {
                $q.all(scope.selection.map(function(e) {
                        var p = Restangular.one('/' + action + '/' + e.values.id);
                        p.withdrawal_status_id = 3;
                        p.put()
                            .then(function() {
                                $state.reload()
                            })
                    }))
                    .then(function() {
                        notification.log(scope.selection.length + ' status changed to  ' + status_name, {
                            addnCls: 'humane-flatty-success'
                        });
                    })
            }
        },
        template: '<span ng-click="updateStatus(action)"><span class="glyphicon {{ icon }}" aria-hidden="true"></span>&nbsp;{{ label }}</span>'
    };
}]);
ngapp.directive('batchAdminsuspend', ['$location', '$state', 'notification', '$q', 'Restangular', function($location, $state, notification, $q, Restangular) {
    return {
        restrict: 'E',
        scope: {
            selection: '=',
            type: '@',
            action: '@'
        },
        link: function(scope, element, attrs) {
            const status_name = attrs.type == 'suspend' ? 'Mark as Suspend' : 'Mark as Suspend';
            scope.icon = attrs.type == 'suspend' ? 'glyphicon-ok' : 'glyphicon-ok';
            scope.label = attrs.type == 'suspend' ? 'Mark as Suspend' : 'Mark as Suspend';
            scope.action = attrs.action;
            scope.updateStatus = function(action) {
                $q.all(scope.selection.map(function(e) {
                        var p = Restangular.one('/' + action + '/' + e.values.id);
                        p.is_admin_suspend = 1;
                        p.put()
                            .then(function() {
                                $state.reload()
                            })
                    }))
                    .then(function() {
                        notification.log(scope.selection.length + ' status changed to  ' + status_name, {
                            addnCls: 'humane-flatty-success'
                        });
                    })
            }
        },
        template: '<span ng-click="updateStatus(action)"><span class="glyphicon {{ icon }}" aria-hidden="true"></span>&nbsp;{{ label }}</span>'
    };
}]);
ngapp.directive('batchAdminunsuspend', ['$location', '$state', 'notification', '$q', 'Restangular', function($location, $state, notification, $q, Restangular) {
    return {
        restrict: 'E',
        scope: {
            selection: '=',
            type: '@',
            action: '@'
        },
        link: function(scope, element, attrs) {
            const status_name = attrs.type == 'unsuspend' ? 'Mark as Unsuspend' : 'Mark as Unsuspend';
            scope.icon = attrs.type == 'unsuspend' ? 'glyphicon-remove' : 'glyphicon-remove';
            scope.label = attrs.type == 'unsuspend' ? 'Mark as Unsuspend' : 'Mark as Unsuspend';
            scope.action = attrs.action;
            scope.updateStatus = function(action) {
                $q.all(scope.selection.map(function(e) {
                        var p = Restangular.one('/' + action + '/' + e.values.id);
                        p.is_admin_suspend = 0;
                        p.put()
                            .then(function() {
                                $state.reload()
                            })
                    }))
                    .then(function() {
                        notification.log(scope.selection.length + ' status changed to  ' + status_name, {
                            addnCls: 'humane-flatty-success'
                        });
                    })
            }
        },
        template: '<span ng-click="updateStatus(action)"><span class="glyphicon {{ icon }}" aria-hidden="true"></span>&nbsp;{{ label }}</span>'
    };
}]);
ngapp.directive('batchAdminactive', ['$location', '$state', 'notification', '$q', 'Restangular', function($location, $state, notification, $q, Restangular) {
    return {
        restrict: 'E',
        scope: {
            selection: '=',
            type: '@',
            action: '@'
        },
        link: function(scope, element, attrs) {
            const status_name = attrs.type == 'active' ? 'Mark as Active' : 'Mark as Active';
            scope.icon = attrs.type == 'active' ? 'glyphicon-remove' : 'glyphicon-remove';
            scope.label = attrs.type == 'active' ? 'Mark as Active' : 'Mark as Active';
            scope.action = attrs.action;
            scope.updateStatus = function(action) {
                $q.all(scope.selection.map(function(e) {
                        var p = Restangular.one('/' + action + '/' + e.values.id);
                        p.is_active = 1;
                        p.put()
                            .then(function() {
                                $state.reload()
                            })
                    }))
                    .then(function() {
                        notification.log(scope.selection.length + ' status changed to  ' + status_name, {
                            addnCls: 'humane-flatty-success'
                        });
                    })
            }
        },
        template: '<span ng-click="updateStatus(action)"><span class="glyphicon {{ icon }}" aria-hidden="true"></span>&nbsp;{{ label }}</span>'
    };
}]);
ngapp.directive('batchAdmininactive', ['$location', '$state', 'notification', '$q', 'Restangular', function($location, $state, notification, $q, Restangular) {
    return {
        restrict: 'E',
        scope: {
            selection: '=',
            type: '@',
            action: '@'
        },
        link: function(scope, element, attrs) {
            const status_name = attrs.type == 'inactive' ? 'Mark as Inactive' : 'Mark as Inactive';
            scope.icon = attrs.type == 'inactive' ? 'glyphicon-remove' : 'glyphicon-remove';
            scope.label = attrs.type == 'inactive' ? 'Mark as Inactive' : 'Mark as Inactive';
            scope.action = attrs.action;
            scope.updateStatus = function(action) {
                $q.all(scope.selection.map(function(e) {
                        var p = Restangular.one('/' + action + '/' + e.values.id);
                        p.is_active = 0;
                        p.put()
                            .then(function() {
                                $state.reload()
                            })
                    }))
                    .then(function() {
                        notification.log(scope.selection.length + ' status changed to  ' + status_name, {
                            addnCls: 'humane-flatty-success'
                        });
                    })
            }
        },
        template: '<span ng-click="updateStatus(action)"><span class="glyphicon {{ icon }}" aria-hidden="true"></span>&nbsp;{{ label }}</span>'
    };
}]);
ngapp.directive('changeStatues', ['$location', '$state', 'notification', '$q', 'Restangular', function($location, $state, notification, $q, Restangular) {
    return {
        restrict: 'E',
        scope: {
            type: '@',
            action: '@',
            id: '@',
            status: '@'
        },
        link: function(scope, element, attrs) {
            scope.label = attrs.type;
            scope.action = attrs.action;
            scope.id = attrs.id;
            scope.status = attrs.status;
            scope.updateMyStatus = function(action, id, status) {
                var p = Restangular.one('/' + action + '/' + id);
                p.contest_status_id = status;
                p.put()
                    .then(function() {
                        notification.log(' status changed to  ' + scope.label, {
                            addnCls: 'humane-flatty-success'
                        });
                        $state.reload()
                    })
            }
        },
        template: '<span class="label label-primary" ng-click="updateMyStatus(action,id,status)">&nbsp;{{ label }}</span>'
    };
}]);
ngapp.directive('formFields', [function() {
    return {
        restrict: 'E',
        scope: {
            entry: "&"
        },
        link: function(scope, element, attrs) {
            scope.myformfields = scope.entry()
                .id;
        },
        template: '<ul><li ng-repeat="formdata in myformfields"><h5><strong>{{formdata.form_field[0].label}}<strong></h5><p>{{formdata.response}}</p></li></ul>'
    };
}]);
ngapp.directive('batchEmailConfirm', ['$location', '$state', 'notification', '$q', 'Restangular', function($location, $state, notification, $q, Restangular) {
    return {
        restrict: 'E',
        scope: {
            selection: '=',
            type: '@',
            action: '@'
        },
        link: function(scope, element, attrs) {
            const status_name = attrs.type == 'active' ? 'Email Confirmed' : 'Email Confirmed';
            scope.icon = attrs.type == 'active' ? 'glyphicon-ok' : 'glyphicon-ok';
            scope.label = attrs.type == 'active' ? 'Email Confirmed' : 'Email Confirmed';
            scope.action = attrs.action;
            scope.updateStatus = function(action) {
                $q.all(scope.selection.map(function(e) {
                        var p = Restangular.one('/' + action + '/' + e.values.id);
                        p.is_email_confirmed = 1;
                        p.put()
                            .then(function() {
                                $state.reload()
                            })
                    }))
                    .then(function() {
                        notification.log(scope.selection.length + ' status changed to  ' + status_name, {
                            addnCls: 'humane-flatty-success'
                        });
                    })
            }
        },
        template: '<span ng-click="updateStatus(action)"><span class="glyphicon {{ icon }}" aria-hidden="true"></span>&nbsp;{{ label }}</span>'
    };
}]);
ngapp.directive('inputType', function() {
    return {
        restrict: 'E',
        scope: {
            entity: "&",
            entry: "&"
        },
        link: function(scope, elem, attrs) {
            elem.bind('change', function() {
                scope.$apply(function() {
                    scope.entry()
                        .values.value = scope.value;
                    if (scope.entry()
                        .values.type === 'checkbox') {
                        scope.entry()
                            .values.value = scope.value ? 1 : 0;
                    }
                    if (scope.entry()
                        .values.type === 'select') {
                        scope.entry()
                            .values.value = scope.value;
                    }
                });
            });
        },
        controller: function($scope) {
            $scope.text = 1;
            $scope.value = $scope.entry()
                .values.value;
            if ($scope.entry()
                .values.type === 'checkbox') {
                $scope.text = 2;
                $scope.value = Number($scope.value);
            }
            else if ($scope.entry()
                .values.type === 'select') {
                $scope.text = 3;
                $scope.option_values = $scope.entry()
                .values.option_values.split(",");
            }
        },
        template: '<textarea ng-model="$parent.value" id="value" name="value" class="form-control" ng-if="text==1"></textarea><input type="checkbox" ng-model="$parent.value" id="value" name="value" ng-if="text==2" ng-true-value="1" ng-false-value="0" ng-checked="$parent.value == 1"/><select ng-if="text==3" ng-model="$parent.value" name="value" class="form-control" ng-options="option_value for option_value in option_values"></select>'
    };
});
ngapp.directive('dashboardSummary', ['$location', '$state', '$http', '$rootScope', function($location, $state, $http, $rootScope) {
    return {
        restrict: 'E',
        scope: {
            entity: "&",
            entityName: "@",
            entry: "&",
            size: "@",
            label: "@",
            revenueDetails: "&"
        },
        templateUrl: 'views/dashboardSummary.html',
        link: function(scope) {
            $http.get(admin_api_url + 'api/v1/plugins', {})
                .success(function(response) {
                    scope.enabled_plugin = response.data.enabled_plugin;
                    $cookies.put('enabled_plugins', JSON.stringify(scope.enabled_plugin), {
                        path: '/'
                    });
                }, function(error) {});
            $http.get(admin_api_url + 'api/v1/stats')
                .success(function(response) {
                    scope.adminstats = response;
                    scope.enabled_plugins = $rootScope.enabled_plugins;
                });
        }
    };
}]);
/* [ To Activate Quote ]*/
ngapp.directive('activeQuote', ['$location', '$http', '$window', '$state', 'notification', function($location, $http, $window, $state, notification) {
        return {
            restrict: 'E',
            scope: {
                quote: '&',
            },
            link: function(scope) {
                scope.active = function() {
                    $location.path('/quote_bids/edit/' + scope.quote()
                        .id);
                };
            },
            template: '<button class="btn btn-primary editable-table-button btn-xs" href="" ng-click="active()"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>&nbsp;<span class="hidden-xs ng-scope" translate="EDIT">Edit</span></button>'
        };
}
]);
ngapp.directive('customHeader', ['$location', '$state', '$http', function($location, $state, $http, $scope) {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'views/custom_header.html'
    };
}]);
ngapp.config(['RestangularProvider', function(RestangularProvider) {
    RestangularProvider.addFullRequestInterceptor(function(element, operation, what, url, headers, params) {
        if (operation === 'getList') {
            // custom pagination params
            if (params._page) {
                params.page = params._page;
                params.limit = params._perPage;
                if (params._sortDir) {
                    params.sortby = params._sortDir;
                }
                delete params._sortDir;
                if (params._sortField) {
                    params.sort = params._sortField;
                }
                delete params._sortField;
                delete params._page;
                delete params._perPage;
            }
            if (params._filters) {
                for (var filter in params._filters) {
                    params[filter] = params._filters[filter];
                }
                delete params._filters;
            } else {// @vijay - need to append required urls here
                if (what == 'projects' || what == 'cities' || what == 'states' || what == 'languages' || what == 'skills' || what == 'credit_purchase_plans' || what == 'quote_categories' || what == 'quote_faq_question_templates' || what == 'project_ranges' || what == 'project_categories' | what == 'contest_types' || what == 'pricing_days' || what == 'pricing_packages' || what == 'job_categories' || what == 'job_types' || what == 'salary_types' || what == 'service_flag_categories' || what == 'project_flag_categories' || what == 'contest_flag_categories'|| what == 'entry_flag_categories' || what == 'job_flag_categories' || what == 'portfolio_flag_categories' || what == 'providers' || what == 'exams' || what == 'jobs') { 
                  params.filter = 'all';
                }
            }
            if (url.indexOf('contest_flags') !== -1 || url.indexOf('contest_followers') !== -1 || url.indexOf('contest_flag_categories') !== -1 || url.indexOf('contest_views') !== -1) {
                params.class = 'Contest';
            }
            if (url.indexOf('portfolio_flags') !== -1 || url.indexOf('portfolio_followers') !== -1 || url.indexOf('portfolio_flag_categories') !== -1) {
                params.class = 'Portfolio';
            }
            if (url.indexOf('job_flags') !== -1 || url.indexOf('job_flag_categories') !== -1 || url.indexOf('job_views') !== -1) {
                params.class = 'Job';
            }
            if (url.indexOf('service_flags') !== -1 || url.indexOf('service_flag_categories') !== -1 || url.indexOf('service_views') !== -1) {
                params.class = 'QuoteService';
            }
            if (url.indexOf('project_flags') !== -1 || url.indexOf('project_followers') !== -1 || url.indexOf('project_flag_categories') !== -1 || url.indexOf('project_views') !== -1) {
                params.class = 'Project';
            }
            if (url.indexOf('contestuser_reviews') !== -1 || url.indexOf('entry_reviews') !== -1 || url.indexOf('entry_flag_categories') !== -1) {
                params.class = 'ContestUser';
            }
            if (url.indexOf('exam_views') !== -1) {
                params.class = 'Exam';
            }
            if (url.indexOf('portfolio_views') !== -1) {
                params.class = 'Portfolio';
            }
            if (url.indexOf('user_flag_categories') !== -1 || url.indexOf('user_flags') !== -1 || url.indexOf('user_followers') !== -1 || url.indexOf('user_views') !== -1) {
                params.class = 'User';
            }
            if (url.indexOf('project_reviews') !== -1) {
                params.class = 'Bid';
            }
            if (url.indexOf('service_reviews') !== -1) {
                params.class = 'QuoteBid';
            }
        }
        if ($cookies.get("token")) {
            var sep = url.indexOf('?') === -1 ? '?' : '&';
            url = url + sep + 'token=' + $cookies.get('token');
        }
        return {
            params: params,
            url: url
        };
    });
    RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response) {
        if (operation === "getList") {
            var headers = response.headers();
            if (typeof response.data._metadata !== 'undefined' && response.data._metadata.total !== null) {
                response.totalCount = response.data._metadata.total;
            }
        }
        return data;
    });
    //To cutomize single view results, we added setResponseExtractor.
    //Our API Edit view results single array with following data format data[{}], Its not working with ng-admin format
    //so we returned data like data[0];
    RestangularProvider.setResponseExtractor(function(data, operation, what, url) {
        var extractedData;
        // .. to look for getList operations        
        extractedData = data.data;
        return extractedData;
    });
}]);
ngapp.config(['NgAdminConfigurationProvider', 'user_types', 'CmsConfig', 'ConstContest', function(NgAdminConfigurationProvider, userTypes, CmsConfig, ConstContest, $rootScope) {
    var nga = NgAdminConfigurationProvider;
    var admin = nga.application(site_name + '\t' + 'Admin')
        .baseApiUrl(admin_api_url + 'api/v1/'); // main API endpoint;
    var customHeaderTemplate = '<div class="navbar-header">' + '<button type="button" class="navbar-toggle" ng-click="isCollapsed = !isCollapsed">' + '<span class="icon-bar"></span>' + '<span class="icon-bar"></span>' + '<span class="icon-bar"></span>' + '</button>' + '<a class="al-logo ng-binding ng-scope" href="#/dashboard" ng-click="appController.displayHome()"><span>' + site_name + '</span> Admin Panel</a>' + '<a href="" ng-click="isCollapsed = !isCollapsed" class="collapse-menu-link ion-navicon" ba-sidebar-toggle-menu=""></a>' + '</div>' + '<custom-header></custom-header>';
    admin.header(customHeaderTemplate);
    admin.menu(nga.menu()
        .addChild(nga.menu()
            .title(' Dashboard')
            .icon('<span class="glyphicon glyphicon-home"></span>')
            .link("/dashboard"))
        .addChild(nga.menu()
            .title('Plugins')
            .icon('<span class="fa fa-th-large"></span>')
            .link("/plugins")));
    generateMenu(CmsConfig.menus);
    var entities = {};
    if (angular.isDefined(CmsConfig.dashboard)) {
        dashboard_template = '';
        var collections = [];
        angular.forEach(CmsConfig.dashboard, function(v, collection) {
            var fields = [];
            dashboard_template = dashboard_template + v.addCollection.template;
            if (angular.isDefined(v.addCollection)) {
                angular.forEach(v.addCollection, function(v1, k1) {
                    if (k1 == 'fields') {
                        angular.forEach(v1, function(v2, k2) {
                            var field = nga.field(v2.name, v2.type);
                            if (angular.isDefined(v2.label)) {
                                field.label(v2.label);
                            }
                            if (angular.isDefined(v2.template)) {
                                field.template(v2.template);
                            }
                            fields.push(field);
                        });
                    }
                });
            }
            collections.push(nga.collection(nga.entity(collection))
                    .name(v.addCollection.name)
                    .title(v.addCollection.title)
                    .perPage(v.addCollection.perPage)
                    .fields(fields)
                    .order(v.addCollection.order));
        });
        dashboard_page_template = '<div class="row list-header"><div class="col-lg-12"><div class="page-header">' + '<h4><span>Dashboard</span></h4></div></div></div>' + '<dashboard-summary></dashboard-summary>' + '<div class="row dashboard-content">' + dashboard_template + '</div>';
        var nga_dashboard = nga.dashboard();
        angular.forEach(collections, function(v, k) {
            nga_dashboard.addCollection(v);
        });
        nga_dashboard.template(dashboard_page_template)
        admin.dashboard(nga_dashboard);
    }
    if (angular.isDefined(CmsConfig.tables)) {
        angular.forEach(CmsConfig.tables, function(v, table) {
            var listview = {},
                editionview = {},
                creationview = {},
                showview = {},
                editViewCheck = false,
                editViewFill = "",
                showViewCheck = false,
                showViewFill = "";
            listview.fields = [];
            editionview.fields = [];
            creationview.fields = [];
            listview.filters = [];
            listview.listActions = [];
            listview.batchActions = [];
            listview.actions = [];
            showview.fields = [];
            listview.infinitePagination = "",
                listview.perPage = "";
            entities[table] = nga.entity(table);
            if (angular.isDefined(v.listview)) {
                angular.forEach(v.listview, function(v1, k1) {
                    if (k1 == 'fields') {
                        angular.forEach(v1, function(v2, k2) {
                            var field = nga.field(v2.name, v2.type);
                            if (angular.isDefined(v2.label)) {
                                field.label(v2.label);
                            }
                            if (angular.isDefined(v2.isDetailLink)) {
                                field.isDetailLink(v2.isDetailLink);
                            }
                            if (angular.isDefined(v2.detailLinkRoute)) {
                                field.detailLinkRoute(v2.detailLinkRoute);
                            }
                            if (angular.isDefined(v2.template)) {
                                field.template(v2.template);
                            }
                            if (angular.isDefined(v2.permanentFilters)) {
                                field.permanentFilters(v2.permanentFilters);
                            }
                            if (angular.isDefined(v2.infinitePagination)) {
                                field.infinitePagination(v2.infinitePagination);
                            }
                            if (angular.isDefined(v2.singleApiCall)) {
                                if (angular.isDefined(v2.targetEntity)) {
                                    field.targetEntity(nga.entity(v2.targetEntity));
                                }
                                if (angular.isDefined(v2.targetField)) {
                                    field.targetField(nga.field(v2.targetField));
                                }
                            }
                            if (angular.isDefined(v2.singleApiCall)) {
                                field.singleApiCall(v2.singleApiCall);
                            }
                            if (angular.isDefined(v2.batchActions)) {
                                field.batchActions(v2.batchActions);
                            }
                            if (angular.isDefined(v2.stripTags)) {
                                field.stripTags(v2.stripTags);
                            }
                            if (angular.isDefined(v2.exportOptions)) {
                                field.exportOptions(v2.exportOptions);
                            }
                            if (angular.isDefined(v2.remoteComplete)) {
                                field.remoteComplete(true, {
                                    searchQuery: function(search) {
                                        return {
                                            q: search,
                                            autocomplete: true
                                        };
                                    }
                                });
                            }
                            if (angular.isDefined(v2.map)) {
                                angular.forEach(v2.map, function(v2m, k2m) {
                                    field.map(eval(v2m));
                                });
                            }
                            listview.fields.push(field);
                        });
                    }
                    if (k1 == 'filters') {
                        angular.forEach(v1, function(v3, k3) {
                            var field;
                            if (v3.type === "template") {
                                field = nga.field(v3.name);
                            } else {
                                field = nga.field(v3.name, v3.type);
                            }
                            if (angular.isDefined(v3.label)) {  
                                field.label(v3.label);
                            }
                            if (angular.isDefined(v3.choices)) {
                                field.choices(v3.choices);
                            }
                            if (angular.isDefined(v3.pinned)) {
                                field.pinned(v3.pinned);
                            }
                            if (angular.isDefined(v3.template) && v3.template !== "") {
                                field.template(v3.template);
                            }
                            if (angular.isDefined(v3.targetEntity)) {
                                field.targetEntity(nga.entity(v3.targetEntity));
                            }
                            if (angular.isDefined(v3.targetField)) {
                                field.targetField(nga.field(v3.targetField));
                            }
                            if (angular.isDefined(v3.permanentFilters)) {
                                field.permanentFilters(v3.permanentFilters);
                            }
                            if (angular.isDefined(v3.remoteComplete)) {
                                field.remoteComplete(true, {
                                    searchQuery: function(search) {
                                        var remoteComplete = {
                                            q: search,
                                            autocomplete: true
                                        };
                                        if (angular.isDefined(v3.remoteCompleteAdditionalParams)) {
                                            angular.forEach(v3.remoteCompleteAdditionalParams, function(value, key) {
                                                remoteComplete[key] = value;
                                            });
                                        }
                                        return remoteComplete;
                                    }
                                });
                            }
                            if (angular.isDefined(v3.map)) {
                                angular.forEach(field.map, function(v2m, k2m) {
                                    field.map(eval(v2m));
                                });
                            }
                            listview.filters.push(field);
                        });
                    }
                    if (k1 == 'listActions') {
                        if (Array.isArray(v1) === true) {
                            angular.forEach(v1, function(v3, k3) {
                                if (v3 === "edit") {
                                    editViewCheck = true;
                                }
                                if (v3 === "show") {
                                    showViewCheck = true;
                                }
                                listview.listActions.push(v3);
                            });
                        } else if (v1 !== "") {
                            listview.listActions.push(v1);
                        }
                    }
                    if (k1 == 'batchActions') {
                        if (Array.isArray(v1) === true) {
                            angular.forEach(v1, function(v3, k3) {
                                listview.batchActions.push(v3);
                            });
                        } else if (v1 !== "") {
                            listview.batchActions.push(v1);
                        }
                    }
                    if (k1 == 'actions') {
                        if (Array.isArray(v1) === true) {
                            angular.forEach(v1, function(v3, k3) {
                                listview.actions.push(v3);
                            });
                        } else if (v1 !== "") {
                            listview.actions.push(v1);
                        }
                    }
                    if (k1 == 'infinitePagination') {
                        entities[table].listView()
                            .infinitePagination(v1);
                    }
                    if (k1 == 'perPage') {
                        entities[table].listView()
                            .perPage(v1);
                    }
                    if (k1 == 'sortDir') {
                        entities[table].listView()
                            .sortDir(v1);
                    }
                });
                if (angular.isDefined(v.creationview)) {
                    editViewFill = generateFields(v.creationview.fields);
                    creationview.fields.push(editViewFill);
                    if (editViewCheck === true && !angular.isDefined(v.editionview)) {
                        editionview.fields.push(editViewFill);
                    } else if (angular.isDefined(v.editionview)) {
                        editionview.fields.push(generateFields(v.editionview.fields));
                    }
                }
            }
             if (angular.isDefined(v.editionview)) {
                angular.forEach(v.editionview, function(v1, k1) {
                    if (k1 == 'actions') {
                        if (Array.isArray(v1) === true) {
                            editionview.actions = [];
                            angular.forEach(v1, function(v3, k3) {
                                editionview.actions.push(v3);
                            });
                        } else if (v1 !== "") {
                            editionview.actions.push(v1);
                        }
                    }
                });
             }
            if (angular.isDefined(v.showview)) {
                showview.fields.push(generateFields(v.showview.fields));
            } else if (showViewCheck === true) {
                showview.fields.push(listview.fields);
            }
            if (angular.isDefined(v.showview)) {
                angular.forEach(v.showview, function(v1, k1) {
                    if (k1 == 'actions') {
                        if (Array.isArray(v1) === true) {
                            showview.actions = [];
                            angular.forEach(v1, function(v3, k3) {
                                showview.actions.push(v3);
                            });
                        } else if (v1 !== "") {
                            showview.actions.push(v1);
                        }
                    }
                });
             }
            admin.addEntity(entities[table]);
            entities[table].listView()
                .title(v.listview.title)
                .fields(listview.fields)
                .listActions(listview.listActions)
                .batchActions(listview.batchActions)
                .actions(listview.actions)
                .filters(listview.filters);
            if (angular.isDefined(v.creationview)) {
                entities[table].creationView()
                    .title(v.creationview.title)
                    .fields(creationview.fields)
                    .onSubmitSuccess(['progression', 'notification', '$state', 'entry', 'entity', function(progression, notification, $state, entry, entity) {
                        progression.done();
                        notification.log(toUpperCase(entity.name()) + ' added successfully', {
                            addnCls: 'humane-flatty-success'
                        });
                        $state.go($state.get('list'), {
                            entity: entity.name()
                        });
                        return false;
                    }])
                     .onSubmitError(['error', 'form', 'progression', 'notification', 'entity', function(error, form, progression, notification, entity) {
                        angular.forEach(error.data.errors, function(value, key) {
                            if (this[key]) {
                                this[key].$valid = false;
                            }
                        }, form);
                        progression.done();
                        if(entity.name() === 'users')
                        {
                        if (angular.isDefined(error.data.error.fields) && angular.isDefined(error.data.error.fields.unique) && error.data.error.fields.unique.length !== 0) {
                                notification.log(' Please choose different ' + ' ' + error.data.error.fields.unique.join(), {
                                addnCls: 'humane-flatty-error'
                                });
                            }else {
                                notification.log(error.data.message, {
                                addnCls: 'humane-flatty-error'
                                });
                            }
                        }
                        if (entity.name() === 'countries') {
                            notification.log(error.data.error.message, {
                                addnCls: 'humane-flatty-error'
                            });
                        }
                        return false;
                    }]);
                if (angular.isDefined(v.creationview.prepare)) {
                    entities[table].creationView()
                        .prepare(['entry', function(entry) {
                            angular.forEach(v.creationview.prepare, function(value, key) {
                                entry.values[key] = value;
                            });
                            return entry;
                        }]);
                }
            }
            if (angular.isDefined(v.editionview) || editViewCheck === true) {
                var editTitle;
                /* if (editViewCheck === true) {
                     editTitle = v.creationview.title;
                 } else {
                     editTitle = v.editionview.title;
                 }*/
                entities[table].editionView()
                    .title(editTitle)
                    .fields(editionview.fields)
                    .actions(editionview.actions)
                    .onSubmitSuccess(['progression', 'notification', '$location', '$state', 'entry', 'entity', function(progression, notification, $location, $state, entry, entity) {
                        progression.done();
                        if (entity.name() === 'work_profiles' || entity.name() === 'quote_service_photos' || entity.name() === 'quote_service_videos' || entity.name() === 'quote_faq_answers' || entity.name() === 'email_templates' || entity.name() === 'credit_purchase_plans' ||entity.name() === 'user_cash_withdrawals' ) {
                            var entity_name = toUpperCase(entity.name());
                        var entity_rep = entity_name.replace(/_/g , " ");
                            notification.log(entity_rep +' ' + 'updated successfully', {
                            addnCls: 'humane-flatty-success'
                        });
                        }
                        else {
                        notification.log(toUpperCase(entity.name()) + ' updated successfully', {
                            addnCls: 'humane-flatty-success'
                        });
                        }
                        if (entity.name() === 'settings') {
                            var current_id = entry.values.setting_category_id;
                            $location.path('/setting_categories/show/' + current_id);
                        } else {
                            $state.go($state.get('list'), {
                                entity: entity.name()
                            });
                        }
                        return false;
                    }])
                    .onSubmitError(['error', 'form', 'progression', 'notification', 'entity', function(error, form, progression, notification, entity) {
                        angular.forEach(error.data.errors, function(value, key) {
                            if (this[key]) {
                                this[key].$valid = false;
                            }
                        }, form);
                        progression.done();
                        if (entity.name() === 'countries') {
                            notification.log(error.data.error.message, {
                                addnCls: 'humane-flatty-error'
                            });
                        } else { 
                            notification.log(error.data.error.message, {
                            addnCls: 'humane-flatty-error'
                            });
                        }
                        return false;
                    }]);
            }
            if (angular.isDefined(v.showview) || showViewCheck === true) {
                if (showViewCheck === true) {
                    entities[table].showView()
                        .title(v.listview.title);
                } else if (angular.isDefined(v.showview) && angular.isDefined(v.showview.title)) {
                    entities[table].showView()
                        .title(v.showview.title);
                }
                entities[table].showView()
                    .fields(showview.fields)
                    .actions(showview.actions);
            }
        });
    }

    function generateMenu(menus) {
        angular.forEach(menus, function(menu_value, menu_keys) {
            var menus;
            if (angular.isDefined(menu_value.link)) {
                menusIndex = nga.menu();
                menusIndex.link(menu_value.link);
            } else if (angular.isDefined(menu_value.child_sub_menu)) {
                menusIndex = nga.menu();
            } else {
                menusIndex = nga.menu(nga.entity(menu_keys));
            }
            if (angular.isDefined(menu_value.title)) {
                menusIndex.title(menu_value.title);
            }
            if (angular.isDefined(menu_value.icon_template)) {
                menusIndex.icon(menu_value.icon_template);
            }
            if (angular.isDefined(menu_value.child_sub_menu)) {
                angular.forEach(menu_value.child_sub_menu, function(val, key) {
                    var child = nga.menu(nga.entity(key));
                    if (angular.isDefined(val.title)) {
                        child.title(val.title);
                    }
                    if (angular.isDefined(val.icon_template)) {
                        child.icon(val.icon_template);
                    }
                    if (angular.isDefined(val.link)) {
                        child.link(val.link);
                    }
                    menusIndex.addChild(child);
                });
            }
            admin.menu()
                .addChild(menusIndex);
        });
    }

    function generateFields(fields) {
        var generatedFields = [];
        angular.forEach(fields, function(targetFieldValue, targetFieldKey) {
            var field = nga.field(targetFieldValue.name, targetFieldValue.type),
                fieldAdd = true;
            if (angular.isDefined(targetFieldValue.label)) {
                field.label(targetFieldValue.label);
            }
            if (angular.isDefined(targetFieldValue.stripTags)) {
                field.stripTags(targetFieldValue.stripTags);
            }
            if (angular.isDefined(targetFieldValue.choices)) {
                field.choices(targetFieldValue.choices);
            }
            if (angular.isDefined(targetFieldValue.editable)) {
                field.editable(targetFieldValue.editable);
            }
            if (angular.isDefined(targetFieldValue.attributes)) {
                field.attributes(targetFieldValue.attributes);
            }
            if (angular.isDefined(targetFieldValue.perPage)) {
                field.perPage(targetFieldValue.perPage);
            }
            if (angular.isDefined(targetFieldValue.listActions)) {
                field.listActions(targetFieldValue.listActions);
            }
            if (angular.isDefined(targetFieldValue.targetEntity)) {
                field.targetEntity(nga.entity(targetFieldValue.targetEntity));
            }
            if (angular.isDefined(targetFieldValue.targetReferenceField)) {
                field.targetReferenceField(targetFieldValue.targetReferenceField);
            }
            if (angular.isDefined(targetFieldValue.targetField)) {
                field.targetField(nga.field(targetFieldValue.targetField));
            }
            if (angular.isDefined(targetFieldValue.map)) {
                angular.forEach(targetFieldValue.map, function(v2m, k2m) {
                    field.map(eval(v2m));
                });
            }
            if (angular.isDefined(targetFieldValue.format)) {
                field.format(targetFieldValue.format);
            }
            if (angular.isDefined(targetFieldValue.template)) {
                field.template(targetFieldValue.template);
            }
            if (angular.isDefined(targetFieldValue.permanentFilters)) {
                field.permanentFilters(targetFieldValue.permanentFilters);
            }
            if (angular.isDefined(targetFieldValue.defaultValue)) {
                field.defaultValue(targetFieldValue.defaultValue);
            }
            if (angular.isDefined(targetFieldValue.validation)) {
                field.validation(eval(targetFieldValue.validation));
            }
            if (angular.isDefined(targetFieldValue.remoteComplete)) {
                field.remoteComplete(true, {
                    searchQuery: function(search) {
                        return {
                            q: search,
                            autocomplete: true
                        };
                    }
                });
            }
            if (angular.isDefined(targetFieldValue.uploadInformation) && angular.isDefined(targetFieldValue.uploadInformation.url) && angular.isDefined(targetFieldValue.uploadInformation.apifilename)) {
                field.uploadInformation({
                    'url': admin_api_url + targetFieldValue.uploadInformation.url,
                    'apifilename': targetFieldValue.uploadInformation.apifilename
                });
            }
            if (targetFieldValue.type === "file" && (!angular.isDefined(targetFieldValue.uploadInformation) || !angular.isDefined(targetFieldValue.uploadInformation.url) || !angular.isDefined(targetFieldValue.uploadInformation.apifilename))) {
                fieldAdd = false;
            }
            if (angular.isDefined(targetFieldValue.targetFields) && (targetFieldValue.type === "embedded_list" || targetFieldValue.type === "referenced_list")) {
                var embField = generateFields(targetFieldValue.targetFields);
                field.targetFields(embField);
            }
            if (fieldAdd === true) {
                generatedFields.push(field);
            }
        });
        return generatedFields;
    }
    nga.configure(admin);

    function getUsers(userIds) {
        return {
            "user_id[]": userIds
        };
    }

    function getStatus(statusIds) {
        return {
            "Requestor_id[]": statusIds
        };
    }

    function getInputType(InputypeIds) {
        return {
            "input_type_id[]": InputypeIds
        };
    }

    function getRequest(requestorIds) {
        return {
            "Service_id[]": requestorIds
        };
    }

    function getdiscountType(DiscountypeIds) {
        return {
            "discount_type_id[]": DiscountypeIds
        };
    }
}]);
ngapp.run(['$rootScope', '$location', '$window', '$state', 'user_types', function($rootScope, $location, $window, $state, userTypes) {
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        var url = toState.name;
        if ($cookies.get('enabled_plugins') !== undefined && $cookies.get('enabled_plugins') !== null) {
            $rootScope.enabled_plugins = JSON.parse($cookies.get('enabled_plugins'));
        }
        if ($cookies.get('SETTINGS') !== undefined && $cookies.get('SETTINGS') !== null) {
            $rootScope.settings = JSON.parse($cookies.get('SETTINGS'));
        }
        var exception_arr = ['login', 'logout'];
        if (($cookies.get("auth") === null || $cookies.get("auth") === undefined) && exception_arr.indexOf(url) === -1) {
            $location.path('/users/login');
        }
        if (exception_arr.indexOf(url) === 0 && $cookies.get("auth") !== null && $cookies.get("auth") !== undefined) {
            $location.path('/dashboard');
        }
        if ($cookies.get("auth") !== null && $cookies.get("auth") !== undefined) {
            var auth = JSON.parse($cookies.get("auth"));
            if (auth.role_id === userTypes.user) {
                $location.path('/users/logout');
            }
        }
        trayOpen();
    });
}]);
ngapp.filter('date_format', function($filter) {
    return function(input, format) {
        return $filter('date')(new Date(input), format);
    };
})
function addFields(getFields) {
    return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0)
            .toUpperCase() + txt.substr(1)
            .toLowerCase();
    });
}
function trayOpen() {
    setTimeout(function() {
        /* For open sub-menu tray */
        if ($('.active')
            .parents('.with-sub-menu')
            .attr('class')) {
            $('.active')
                .parents('.with-sub-menu')
                .addClass('ba-sidebar-item-expanded');
        }
        /* For open collaps menu when menu in collaps state */
        $('.al-sidebar-list-link')
            .click(function() {
                if ($('.js-collaps-main')
                    .hasClass('menu-collapsed')) {
                    $('.js-collaps-main')
                        .removeClass('menu-collapsed');
                }
            });
    }, 100);
}

function menucollaps() {
    setTimeout(function() {
        /* For menu collaps and open */
        $('.collapse-menu-link')
            .click(function() {
                if ($('.js-collaps-main')
                    .hasClass('menu-collapsed')) {
                    $('.js-collaps-main')
                        .removeClass('menu-collapsed');
                } else {
                    $('.js-collaps-main')
                        .addClass('menu-collapsed');
                }
            });
    }, 1000);
}

function toUpperCase(str) {
    return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0)
            .toUpperCase() + txt.substr(1)
            .toLowerCase();
    });
}