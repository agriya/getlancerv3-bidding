'use strict';
/**
 * @ngdoc function
 * @name getlancerApp.controller:QuoteCreditPurchasePlanController
 * @description
 * # QuoteCreditPurchasePlanController
 * Controller of the getlancerApp
 */
angular.module('getlancerApp.Common.Subscription')
    .controller('QuoteCreditPurchasePlanController', ['$rootScope', '$scope', '$window', 'countries', 'states', 'cities', 'usersAddresses', 'flash', '$location', '$filter', '$state', 'paymentGateways', 'UserMeFactory', 'QuoteCreditPurchasePlansFactory', 'QuoteCreditPurchaseLogsFactory', 'CouponGetStatusFactory', 'ConstDiscountType', '$stateParams', 'ConstPaymentGateways', '$timeout', function($rootScope, $scope, $window, countries, states, cities, usersAddresses, flash, $location, $filter, $state, paymentGateways, UserMeFactory, QuoteCreditPurchasePlansFactory, QuoteCreditPurchaseLogsFactory, CouponGetStatusFactory, ConstDiscountType, $stateParams, ConstPaymentGateways, $timeout) {
        $rootScope.url_split = $location.path().split("/")[1];
        $rootScope.header = $rootScope.settings.SITE_NAME + ' | ' + $filter("translate")("Plans");
        $scope.minimum_wallet_amount = $rootScope.settings.WALLET_MIN_WALLET_AMOUNT;
        $scope.maximum_wallet_amount = $rootScope.settings.WALLET_MAX_WALLET_AMOUNT;
        $scope.buyer = {};
        $scope.plan = {};
        $scope.paynow_is_disabled = false;
        $scope.payment_note_enabled = false;
        $scope.payer_form_enabled = true;
        $scope.is_wallet_page = true;
        $scope.plan_info = {};
        $scope.save_btn = false;
        $scope.purchase_plan_select = false;
        $scope.purchase_plan_coupon = false;
        $scope.first_gateway_id = "";
        $scope.plan_info.price_final = '0.00';
        $scope.is_show_wallet_paybtn = true;
        $scope.index = function() {
         $scope.amount_change = true;
            $scope.loader = true;
            var flashMessage;
            if (parseInt($stateParams.error_code) === 512) {
                flashMessage = $filter("translate")("Payment Failed. Please, try again.");
                flash.set(flashMessage, 'error', false);
            } else if (parseInt($stateParams.error_code) === 0) {
                flashMessage = $filter("translate")("Payment successfully completed.");
                flash.set(flashMessage, 'success', false);
            }
            var params_credit = {};
            params_credit.sort = 'id';
            QuoteCreditPurchasePlansFactory.get(params_credit, function(response) {
                $scope.credit_purchase_plans = response.data;
            });
            $scope.payment = true;
            UserMeFactory.get({}, function(response) {
                $scope.expired_credit_point = Number(response.data.expired_balance_credit_points || 0);
                $scope.user_available_balance = response.data.available_wallet_amount;
                $scope.user_available_credit_count = Number(response.data.available_credit_count || 0);
            });
            var payment_gateways = [];
            paymentGateways.get({}, function(payment_response) {
				if (payment_response.PayPalREST) {
					var response = payment_response.PayPalREST;
					if(response.paypalrest_enabled) {
                    	$scope.paypal_enabled = true;
					}
                }
                if (payment_response.wallet) {
                    $scope.wallet_enabled = true;
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
								$scope.form_fields[value] = 'views/buyer.html';
							}
							if (value === 'credit_card') {
								$scope.form_fields[value] = 'views/credit_card.html';
							}
							if (value === 'manual') {
								$scope.form_fields[value] = 'views/manual.html';
							}
							$scope.show_form[value] = true;
						});
						$scope.gateway_id = ConstPaymentGateways.ZazPay;
					}
                }
                $scope.loader = false;
            });
        };
        
        $scope.getPlandetails = function(index) {
            $scope.amount_change = false;
                $timeout(function () {
                     $scope.amount_change = true;
                        $scope.plan_info = $scope.credit_purchase_plans[index];
                        $scope.plan_info.price_final = $scope.plan_info.price;
                            },100);
            $scope.buyer.credit_purchase_plan_id = $scope.plan.credit_purchase_plan_id;
            $scope.plan.coupon = '';
        }
        $scope.applyCoupon = function() {
            if ($scope.plan_info.price == '' || $scope.plan_info.price == undefined) {
                $scope.purchase_plan_select = true;
            } else if ($scope.plan.coupon === '' || $scope.plan.coupon == undefined) {
                $scope.purchase_plan_select = false;
                $scope.purchase_plan_coupon = true;
            } else {
                $scope.purchase_plan_select = false;
                $scope.purchase_plan_coupon = false;
                var params = {};
                params.coupon_code = $scope.plan.coupon;
                params.amount = $scope.plan_info.price;
                CouponGetStatusFactory.get(params, function(response) {
                    $scope.discountCoupon = response;
                    if (response.error.code === 0) {
                        if ($scope.discountCoupon.data.discount_type_id == ConstDiscountType.Amount) {
                            $scope.plan_info.price_final = parseFloat($scope.plan_info.price) - parseFloat(response.data.discount);
                            $scope.show_discount = $filter("currency")(response.data.discount);
                        } else {
                            var discount_amt = ((response.data.discount / 100) * $scope.plan_info.price);
                            $scope.plan_info.price_final = $scope.plan_info.price - discount_amt;
                            $scope.show_discount = $filter("translate")(response.data.discount + '%');
                        }
                    } else {
                        flash.set($filter("translate")(response.error.message), 'error', false);
                        $scope.plan.coupon = '';
                    }
                });
            }
            $scope.buyer.credit_purchase_plan_id = $scope.plan.credit_purchase_plan_id;
        }
        $scope.ClearCoupon = function() {
            $scope.plan_info.price_final = $scope.plan_info.price;
            $scope.purchase_plan_coupon = false;
            $scope.show_discount = false;
        }
        $scope.paneChanged = function(pane) {
            if (pane === 'Manual / Offline') {
                $scope.payment_note_enabled = true;
            }
			if (pane === 'paypal') {
                $scope.gateway_id = ConstPaymentGateways.PayPal;
            }
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
            if (pane === 'Wallet') {
                $scope.gateway_id = ConstPaymentGateways.Wallet;
            }
        };
        $scope.rdoclick = function(res, res1) {
            $scope.paynow_is_disabled = false;
            $scope.sel_payment_gateway = "sp_" + res;
            $scope.array = res1.split(',');
            angular.forEach($scope.array, function(value) {
                $scope.show_form[value] = true;
            });
        };
        $scope.PaymentFormSubmit = function(form) {
            var payment_id = '';
            if ($scope.sel_payment_gateway && $scope.gateway_id === ConstPaymentGateways.ZazPay) {
                payment_id = $scope.sel_payment_gateway.split('_')[1];
            }
            $scope.buyer.credit_purchase_plan_id = $scope.plan.credit_purchase_plan_id;
            $scope.buyer.coupon_code = $scope.plan.coupon;
            $scope.buyer.buyer_name = $scope.buyer.credit_card_name_on_card;
            $scope.buyer.payment_gateway_id = $scope.gateway_id;
            $scope.buyer.gateway_id = payment_id;
            if (angular.isDefined($scope.buyer.credit_card_expired) && ($scope.buyer.credit_card_expired.month || $scope.buyer.credit_card_expired.year)) {
                $scope.buyer.credit_card_expire = $scope.buyer.credit_card_expired.month + "/" + $scope.buyer.credit_card_expired.year;
            }
            if (form) {
                $scope.paynow_is_disabled = true;
                var flashMessage;
                if ((parseFloat($scope.plan_info.price_final) > parseFloat($scope.user_available_balance)) && ($scope.gateway_id === ConstPaymentGateways.Wallet)) {
                    flashMessage = $filter("translate")("Your wallet has insufficient money.");
                    flash.set(flashMessage, 'error', false);
                    $scope.paynow_is_disabled = false;
                    return true;
                }
                QuoteCreditPurchaseLogsFactory.create($scope.buyer, function(response) {
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
                            $scope.user_available_credit_count = $scope.user_available_credit_count + parseInt(response.data.credit_count);
                            $scope.my_user.available_wallet_amount = $scope.my_user.available_wallet_amount - parseInt(response.data.price); 
                            flashMessage = $filter("translate")("Payment successfully completed.");
                            flash.set(flashMessage, 'success', false);
                            $state.reload();
                        }  else if (response.payment_response.code === 512) {
                            flashMessage = $filter("translate")("Process Failed. Please, try again.");
                            flash.set(flashMessage, 'error', false);
                        }
                    } else {
                            flashMessage = $filter("translate")(response.payment_response.error.message);
                            flash.set(flashMessage, 'error', false);
                    }
                    $scope.paynow_is_disabled = false;
                }, function(error) {
                    if (angular.isDefined(error.payment_response.error.message) || error.payment_response.error.message !== null) {
                        flash.set($filter("translate")(error.payment_response.error.message), 'error', false);
                    }
                    $scope.paynow_is_disabled = false;
                });
            }
        };
		$scope.payNowPayPalClick = function() { 
			var flashMessage;
			if (angular.isDefined($scope.plan.credit_purchase_plan_id)) {
					$scope.buyer.credit_purchase_plan_id = $scope.plan.credit_purchase_plan_id;
					$scope.buyer.payment_gateway_id = ConstPaymentGateways.PayPal;
					$scope.buyer.gateway_id = $scope.buyer.payment_gateway_id;
						QuoteCreditPurchaseLogsFactory.create($scope.buyer, function(response) {
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
									$scope.user_available_credit_count = $scope.user_available_credit_count + parseInt(response.data.credit_count);
									$scope.my_user.available_wallet_amount = $scope.my_user.available_wallet_amount - parseInt(response.data.price); 
									flashMessage = $filter("translate")("Payment successfully completed.");
									flash.set(flashMessage, 'success', false);
									$state.reload();
								}  else if (response.payment_response.code === 512) {
									flashMessage = $filter("translate")("Process Failed. Please, try again.");
									flash.set(flashMessage, 'error', false);
								}
							} else {
									flashMessage = $filter("translate")(response.payment_response.error.message);
									flash.set(flashMessage, 'error', false);
							}
							$scope.paynow_is_disabled = false;
						}, function(error) {
							if (angular.isDefined(error.payment_response.error.message) || error.payment_response.error.message !== null) {
								flash.set($filter("translate")(error.payment_response.error.message), 'error', false);
							}
							$scope.paynow_is_disabled = false;
						});
			} else {
				flash.set($filter("translate")('Please select credit purchase plan'), 'error', false);
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
    }]);