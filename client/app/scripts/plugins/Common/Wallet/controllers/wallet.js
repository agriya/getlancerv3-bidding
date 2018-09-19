'use strict';
/**
 * @ngdoc function
 * @name getlancerApp.Wallet.controller:WalletController
 * @description
 * # WalletController
 * Controller of the getlancerApp.Wallet
 */
angular.module('getlancerApp.Common.Wallet')
    .controller('WalletController', ['$rootScope', '$scope', '$window', 'countries', 'states', 'cities', 'usersAddresses', 'wallet', 'flash', '$location', '$filter', '$state', 'paymentGateways', 'userSettings', 'ConstPaymentGateways', 'UserMeFactory', '$timeout', function($rootScope, $scope, $window, countries, states, cities, usersAddresses, wallet, flash, $location, $filter, $state, paymentGateways, userSettings, ConstPaymentGateways, UserMeFactory, $timeout) {
        $rootScope.url_split = $location.path().split("/")[1];
        $rootScope.header = $rootScope.settings.SITE_NAME + ' | ' + $filter("translate")("Add to wallet");
        $scope.minimum_wallet_amount = $rootScope.settings.WALLET_MIN_WALLET_AMOUNT;
        $scope.maximum_wallet_amount = $rootScope.settings.WALLET_MAX_WALLET_AMOUNT;
        $scope.buyer = {};
        $scope.paynow_is_disabled = false;
        $scope.payment_note_enabled = false;
        $scope.payer_form_enabled = true;
        $scope.is_wallet_page = true;
        $scope.existing_new_address = 1;
        $scope.user_address_id = "";
        $scope.user_address_add = {};
        $scope.save_btn = false;
        $scope.first_gateway_id = "";
        $scope.gatewayError = '';
        $scope.index = function() {
            UserMeFactory.get({}, function(response) {
                $scope.user_available_balance = (response.data.available_wallet_amount || 0);
                if (parseInt($scope.user_available_balance) === 0) {
                    $scope.is_show_wallet_paybtn = false;
                } else {
                    $scope.is_show_wallet_paybtn = true;
                }
            });
            var payment_gateways = [];
            paymentGateways.get({}, function(payment_response) {
				if (payment_response.PayPalREST) {
					var response = payment_response.PayPalREST;
					if(response.paypalrest_enabled) {
                    	$scope.paypal_enabled = true;
					}
                }
                $scope.group_gateway_id = "";
                if (payment_response.error.code === 0) {
					if (payment_response.zazpay !== undefined) {
						angular.forEach(payment_response.zazpay.gateways, function(gateway_group_value, gateway_group_key) {
							if (gateway_group_key === 0) {
								$scope.group_gateway_id = gateway_group_value.id;
								$scope.first_gateway_id = gateway_group_value.id;
							}
							//jshint unused:false
							angular.forEach(gateway_group_value.gateways, function(payment_geteway_value, payment_geteway_key) {
								var payment_gateway = {};
								var suffix = 'sp_';
								if (gateway_group_key === 0) {
									$scope.sel_payment_gateway = 'sp_' + payment_geteway_value.id;
								}
								suffix += payment_geteway_value.id;
								payment_gateway.id = payment_geteway_value.id;
								payment_gateway.payment_id = suffix;
								payment_gateway.group_id = gateway_group_value.id;
								payment_gateway.display_name = payment_geteway_value.display_name;
								payment_gateway.thumb_url = payment_geteway_value.thumb_url;
								payment_gateway.suffix = payment_geteway_value._form_fields._extends_tpl.join();
								payment_gateway.form_fields = payment_geteway_value._form_fields._extends_tpl.join();
								payment_gateway.instruction_for_manual = payment_geteway_value.instruction_for_manual;
								payment_gateways.push(payment_gateway);
							});
						});
						$scope.gateway_groups = payment_response.zazpay.gateways;
						$scope.payment_gateways = payment_gateways;
						$scope.form_fields_tpls = payment_response.zazpay._form_fields_tpls;
						$scope.show_form = [];
						$scope.form_fields = [];
						angular.forEach($scope.form_fields_tpls, function(key, value) {
							if (value === 'buyer') {
								$scope.form_fields[value] = 'scripts/plugins/Common/Wallet/views/default/buyer.html';
							}
							if (value === 'credit_card') {
								$scope.form_fields[value] = 'scripts/plugins/Common/Wallet/views/default/credit_card.html';
							}
							if (value === 'manual') {
								$scope.form_fields[value] = 'scripts/plugins/Common/Wallet/views/default/manual.html';
							}
							$scope.show_form[value] = true;
						});
						$scope.gateway_id = ConstPaymentGateways.ZazPay;
					}
                }                
            });
        };
        $scope.paneChanged = function(pane) {
            if (pane === 'Manual / Offline') {
                $scope.payment_note_enabled = true;
            }
			if (pane === 'paypal') {
                $scope.gateway_id = ConstPaymentGateways.PayPal;
            }
            $scope.defaultselect(pane);
            var keepGoing = true;
            $scope.buyer = {};
            $scope.PaymentForm.$setPristine();
            $scope.PaymentForm.$setUntouched();
            angular.forEach($scope.form_fields_tpls, function(key, value) {
                $scope.show_form[value] = false;
            });
            $scope.gateway_id = ConstPaymentGateways.ZazPay;
            angular.forEach($scope.gateway_groups, function(res) {
                if (res.display_name === pane && pane !== 'Wallet') {
                    var selPayment = '';
                    angular.forEach($scope.payment_gateways, function(response) {
                        if (keepGoing) {
                            if (response.group_id === res.id) {
                                selPayment = response;
                                keepGoing = false;
                                $scope.rdoclick(selPayment.id, selPayment.form_fields);
                            }
                        }
                    });
                    $scope.sel_payment_gateway = "sp_" + selPayment.id;
                    $scope.group_gateway_id = selPayment.group_id;
                }
            });
			
        };
        $scope.defaultselect = function(pane) {
			 var selectedTab, selectedPayment;
             $scope.gateways = [];
             var keepGoing = true;
             angular.forEach($scope.gateway_groups, function(res) {
                 if (keepGoing) {
                     if (res.display_name == pane) {
                         selectedTab = res;
                         $scope.selectedTab = res;
                         keepGoing = false;
                     }
                 }
             });
             keepGoing = true;
             angular.forEach($scope.payment_gateways, function(res) {
                 if (keepGoing) {
                     if (res.group_id == selectedTab.id) {
                         selectedPayment = res;
                         keepGoing = false;
                         $scope.rdoclick(selectedPayment.id, selectedPayment.form_fields);
                     }
                 }
             });
             $scope.gateways = "sp_" + selectedPayment.id;
         };
        $scope.rdoclick = function(res, res1) {
            $scope.paynow_is_disabled = false;
            $scope.sel_payment_gateway = "sp_" + res;
            $scope.array = res1.split(',');
            angular.forEach($scope.array, function(value) {
                $scope.show_form[value] = true;
            });
        };
        $scope.WalletFormSubmit = function(form) {
            var payment_id = '';
            if ($scope.sel_payment_gateway && $scope.gateway_id === ConstPaymentGateways.ZazPay) {
                payment_id = $scope.sel_payment_gateway.split('_')[1];
            }
            $scope.buyer.user_id = $rootScope.user.id;
            $scope.buyer.amount = $scope.amount;
            $scope.buyer.payment_gateway_id = $scope.gateway_id;
            $scope.buyer.gateway_id = payment_id;
            if (angular.isDefined($scope.buyer.credit_card_expired) && ($scope.buyer.credit_card_expired.month || $scope.buyer.credit_card_expired.year)) {
                if ($scope.buyer.credit_card_expired.month > 0 && $scope.buyer.credit_card_expired.month < 10) {          
                    $scope.buyer.credit_card_expired.month = '0' + $scope.buyer.credit_card_expired.month;
                }
                $scope.buyer.credit_card_expire = $scope.buyer.credit_card_expired.month + "/" + $scope.buyer.credit_card_expired.year;
            }
            if (form) {
                $scope.paynow_is_disabled = true;
                var flashMessage;
                wallet.create($scope.buyer, function(response) {
                    if (response.error.code === 0) {
                        if (response.redirect_url !== undefined) {
							$window.location.href = response.redirect_url;
						} else if (response.payment_response.gateway_callback_url !== undefined) {
                            $window.location.href = response.payment_response.gateway_callback_url;
                        } else if (response.payment_response.status === 'Pending') {
                            flashMessage = $filter("translate")("Your request is in pending.");
                            flash.set(flashMessage, 'error', false);
                            $state.reload();
                        } else if (response.payment_response.status === 'Captured') {
                            flashMessage = $filter("translate")("Amount added successfully.");
                            flash.set(flashMessage, 'success', false);
                            $state.reload();
                        } else if (response.payment_response.error.code === 0) {
                            flashMessage = $filter("translate")("Payment successfully completed.");
                            flash.set(flashMessage, 'success', false);
                            $state.reload();
                        } else if (response.payment_response.error.code === 512) {
                            flashMessage = $filter("translate")("Process Failed. Please, try again.");
                            flash.set(flashMessage, 'error', false);
                        }
                    } else {
                        $scope.gatewayError = $filter("translate")(response.payment_response.error.message);
                        flashMessage = $filter("translate")("Payment could not be completed.Please try again...");
                        flash.set(flashMessage, 'error', false);
                    }
                    $scope.paynow_is_disabled = false;
                }, function(error) {
                    if (angular.isDefined(error.payment_response.error.message) || error.data.error.message !== null) {
                       
                        flash.set($filter("translate")(error.payment_response.error.message), 'error', false);
                    }
                    $scope.paynow_is_disabled = false;
                });
            }
        };
       
        
      $scope.site_url = $location.absUrl().split('?')[1];
      var flashMessage;
      if ($scope.site_url === 'error_code=0') {
                flashMessage = $filter("translate")("Payment successfully completed."); 
                flash.set(flashMessage, 'success', false);
            };

		$scope.payNowPayPalClick = function() { 
			var flashMessage;
			if(angular.isDefined($scope.amount)) {
			$scope.buyer.user_id = $rootScope.user.id;
            $scope.buyer.amount = $scope.amount;
            $scope.buyer.payment_gateway_id = ConstPaymentGateways.PayPal;
            $scope.buyer.gateway_id = $scope.buyer.payment_gateway_id;
			 $scope.paynow_is_disabled = true;
                wallet.create($scope.buyer, function(response) {
                    if (response.error.code === 0) {
                        if (response.redirect_url !== undefined) {
							$window.location.href = response.redirect_url;
						} else if (response.payment_response.gateway_callback_url !== undefined) {
                            $window.location.href = response.payment_response.gateway_callback_url;
                        } else if (response.payment_response.status === 'Pending') {
                            flashMessage = $filter("translate")("Your request is in pending.");
                            flash.set(flashMessage, 'error', false);
                            $state.reload();
                        } else if (response.payment_response.status === 'Captured') {
                            flashMessage = $filter("translate")("Amount added successfully.");
                            flash.set(flashMessage, 'success', false);
                            $state.reload();
                        } else if (response.payment_response.error.code === 0) {
                            flashMessage = $filter("translate")("Payment successfully completed.");
                            flash.set(flashMessage, 'success', false);
                            $state.reload();
                        } else if (response.payment_response.error.code === 512) {
                            flashMessage = $filter("translate")("Process Failed. Please, try again.");
                            flash.set(flashMessage, 'error', false);
                        }
                          
                    } else {
                        $scope.gatewayError = $filter("translate")(response.payment_response.error.message);
                        flashMessage = $filter("translate")("Payment could not be completed.Please try again...");
                        flash.set(flashMessage, 'error', false);
                    }
                    $scope.paynow_is_disabled = false;
                }, function(error) {
                    if (angular.isDefined(error.payment_response.error.message) || error.data.error.message !== null) {
                       
                        flash.set($filter("translate")(error.payment_response.error.message), 'error', false);
                    }
                    $scope.paynow_is_disabled = false;
                });
			} else {
				flashMessage = $filter("translate")("please enter the valid amount.");
                flash.set(flashMessage, 'error', false);
			}
			
		};
        countries.get({
            limit: 'all'
        }, function(response) {
            if (angular.isDefined(response.data)) {
                $scope.countries = response.data;
            }
        });
        $scope.index();
       /* $timeout(function () {
            angular.forEach($scope.gateway_groups, function(response) {
                if (response.display_name == 'Electronic Gateways') {
                    $scope.gateways_group_id = response.id;
                    var activeHide = angular.element(document.getElementsByClassName('js-set-deact'));
                    activeHide.removeClass('active');
                    var dateHide = angular.element(document.getElementsByClassName('act-'+$scope.gateways_group_id));            
                    dateHide.addClass('active');
                    $scope.paneChanged('Electronic Gateways');
                }
            });            
        }, 4000);*/
    }]);
