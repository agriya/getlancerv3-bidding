angular.module('getlancerApp.Bidding')
    .controller('ProjectPaymentController', function($rootScope, $scope, $window, countries, states, cities, $stateParams, usersAddresses, wallet, flash, $location, $filter, $state, paymentGateways, userSettings, ConstPaymentGateways, ProjectEditView, UserMeFactory, PaymentOrderFactory, $uibModalStack) {
        $rootScope.header = $rootScope.settings.SITE_NAME + ' | ' + $filter("translate")("Confirm your Payment");
        $scope.id = $stateParams.id;
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
        $scope.first_gateway_id = "";
        $scope.plan_info.price_final = 10;
        $scope.index = function() {
            ProjectEditView.get({
                id: $state.params.id
            }, function(response) {
                $scope.projectadd = response.data;
                $scope.total_listing_fee = response.data.total_listing_fee;
                $scope.projectTitle = response.data.name;
            });
            $scope.loader = true;
            $scope.payment = true;
            UserMeFactory.get({}, function(response) {
                $scope.user_available_balance = response.data.available_wallet_amount;
            });
            var payment_gateways = [];
            paymentGateways.get(function(payment_response) {
                if (payment_response.wallet) {
                    $scope.wallet_enabled = true;
                    if (parseInt($scope.user_available_balance) === 0) {
                        $scope.is_show_wallet_paybtn = false;
                    } else {
                        $scope.is_show_wallet_paybtn = true;
                    }
                }
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
        $scope.applyCoupon = function() {
            var params = {};
            params.coupon_code = $scope.plan.coupon;
            params.amount = $scope.project.zazpay_revised_amount;
            CouponGetStatusFactory.get(params, function(response) {
                $scope.discountCoupon = response;
                if (response.error.code === 0) {
                    if ($scope.discountCoupon.data.discount_type_id == ConstDiscountType.Amount) {
                        $scope.plan_info.price_final = parseFloat($scope.project.zazpay_revised_amount) - parseFloat(response.data.discount);
                        $scope.show_discount = $filter("currency")(response.data.discount);
                    } else {
                        var discount_amt = ((response.data.discount / 100) * $scope.project.zazpay_revised_amount);
                        $scope.plan_info.price_final = $scope.project.zazpay_revised_amount - discount_amt;
                        $scope.show_discount = $filter("translate")(response.data.discount + '%');
                    }
                } else {
                    flash.set($filter("translate")(response.error.message), 'error', false);
                    $scope.plan.coupon = '';
                }
            });
        }
        $scope.ClearCoupon = function() {
            $scope.plan_info.price_final = $scope.project.zazpay_revised_amount;
            $scope.purchase_plan_coupon = false;
            $scope.show_discount = false;
        }
        $scope.paneChanged = function(pane) {
			if (pane === 'Manual / Offline') {
                $scope.payment_note_enabled = true;
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
            } else if (pane === 'paypal') {
                $scope.gateway_id = ConstPaymentGateways.PayPal;
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
			$scope.buyer.foreign_id = $state.params.id;
            $scope.buyer.class = 'Project';
            $scope.buyer.buyer_name = $scope.buyer.credit_card_name_on_card;
            $scope.buyer.payment_gateway_id = $scope.gateway_id;
            $scope.buyer.gateway_id = payment_id;
            $scope.buyer.coupon_code = $scope.plan.coupon
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
                PaymentOrderFactory.create($scope.buyer, function(response) {
                    if (response.error.code === 0) {
						if (response.redirect_url !== undefined) {
							$window.location.href = response.redirect_url;
						} else if (response.data.gateway_callback_url !== undefined) {
                            $window.location.href = response.data.gateway_callback_url;
                        } else if (response.data.status === 'Pending') {
                            flashMessage = $filter("translate")("Your request is in pending.");
                            flash.set(flashMessage, 'error', false);
                            $state.reload();
                        } else if (response.data.status === 'Captured') {
                            flashMessage = $filter("translate")("Amount added successfully.");
                            flash.set(flashMessage, 'success', false);
                            $state.reload();
                        } else if (response.error.code === 0) {
                            if (response.payment_response.status === 'Captured') {
                                $scope.my_user.available_wallet_amount = $scope.my_user.available_wallet_amount - parseInt(response.data.total_listing_fee);
                            }
                            flashMessage = $filter("translate")("Payment successfully completed.");
                            flash.set(flashMessage, 'success', false);
                            $state.reload();
                            $state.go('user_dashboard');
                        } else if (response.error.code === 512) {
                            flashMessage = $filter("translate")("Process Failed. Please, try again.");
                            flash.set(flashMessage, 'error', false);
                        }
                    } else {
                        flashMessage = $filter("translate")("We are unable to process your request. Please try again." + response.error.message);
                        flash.set(flashMessage, 'error', false);
                    }
                    $scope.paynow_is_disabled = false;
                    $uibModalStack.dismissAll();
                }, function(error) {
                    console.log(error);
                    /* if (angular.isDefined(error.data.error.message) || error.data.error.message !== null) {
                         flash.set($filter("translate")("error.data.error.message"), 'error', false);
                     }
                     $scope.paynow_is_disabled = false;*/
                });
            }
        };
	$scope.payNowPayPalClick = function() { 
			var flashMessage;
			$scope.buyer.foreign_id = $state.params.id;
            $scope.buyer.class = 'Project';
		    $scope.buyer.payment_gateway_id = ConstPaymentGateways.PayPal;
            $scope.buyer.gateway_id = $scope.buyer.payment_gateway_id;
			 $scope.paynow_is_disabled = true;
                  PaymentOrderFactory.create($scope.buyer, function(response) {
                    if (response.error.code === 0) {
						if (response.redirect_url !== undefined) {
							$window.location.href = response.redirect_url;
						} else if (response.data.gateway_callback_url !== undefined) {
                            $window.location.href = response.data.gateway_callback_url;
                        } else if (response.data.status === 'Pending') {
                            flashMessage = $filter("translate")("Your request is in pending.");
                            flash.set(flashMessage, 'error', false);
                            $state.reload();
                        } else if (response.data.status === 'Captured') {
                            flashMessage = $filter("translate")("Amount added successfully.");
                            flash.set(flashMessage, 'success', false);
                            $state.reload();
                        } else if (response.error.code === 0) {
                            if (response.payment_response.status === 'Captured') {
                                $scope.my_user.available_wallet_amount = $scope.my_user.available_wallet_amount - parseInt(response.data.total_listing_fee);
                            }
                            flashMessage = $filter("translate")("Payment successfully completed.");
                            flash.set(flashMessage, 'success', false);
                            $state.reload();
                            $state.go('user_dashboard');
                        } else if (response.error.code === 512) {
                            flashMessage = $filter("translate")("Process Failed. Please, try again.");
                            flash.set(flashMessage, 'error', false);
                        }
                    } else {
                        flashMessage = $filter("translate")("We are unable to process your request. Please try again." + response.error.message);
                        flash.set(flashMessage, 'error', false);
                    }
                    $scope.paynow_is_disabled = false;
                    $uibModalStack.dismissAll();
                }, function(error) {
                    console.log(error);
                    /* if (angular.isDefined(error.data.error.message) || error.data.error.message !== null) {
                         flash.set($filter("translate")("error.data.error.message"), 'error', false);
                     }
                     $scope.paynow_is_disabled = false;*/
                });
			
		};
        countries.get({
            limit: 'all'
        }, function(response) {
            if (angular.isDefined(response.data)) {
                $scope.countries = response.data;
            }
        });
        $scope.index();
    });