angular.module('getlancerApp.Common.Subscription', [])
.constant('ConstDiscountType', {
        'Percentage': 1,
        'Amount': 2
    })
     .constant('ConstPaymentGateways', {
        'Wallet': 1,
        'ZazPay': 2,
        'PayPal': 3
    });