'use strict';
/**
 * @ngdoc function
 * @name getlancerApp.controller:TransactionsController
 * @description
 * # TransactionsController
 * Controller of the getlancerApp
 */
/* global angular */
angular.module('getlancerApp')
    .controller('TransactionsController', ['$rootScope', '$state', '$scope', 'TransactionsFactory', 'flash', '$filter', '$stateParams', 'TransactionAdminMessage', 'TransactionUserMessage', '$location', 'myUserFactory',function($rootScope, $state, $scope, TransactionsFactory, flash, $filter, $stateParams, TransactionAdminMessage, TransactionUserMessage, $location, myUserFactory) {
        $rootScope.url_split = $location.path()
            .split("/")[1];
        $rootScope.header = $rootScope.settings.SITE_NAME + ' | ' + $filter("translate")("Transactions");
        $scope.currentPage = 1;
        $scope.TransactionAdminMessage = TransactionAdminMessage;
        $scope.tempArr = {};
        angular.forEach(TransactionUserMessage, function(value,key){
            $scope.tempArr[key] =  $filter("translate")(value);
        });
        $scope.TransactionUserMessage = $scope.tempArr;        
        $scope.index = function() {
            $scope.getTransactions();
            $scope.value = 'all';
        };
         $scope.walletamount = function() {
            if ($rootScope.isAuth) {
                $scope.loader = true;
                myUserFactory.get(function(response) {
                        $scope.my_user = response.data;
                            $scope.wallet_amount = Number($scope.my_user.available_wallet_amount || 0);
                            $scope.loader = false;
                });
            }
        };
        $scope.walletamount();
        /**
         * @ngdoc method
         * @name JobsAddController.clear
         * @methodOf module.JobsAddController
         * @description
         * This method is used for clear the date
         */
        $scope.clear = function() {
            $scope.dt = null;
        };
        /**
         * @ngdoc method
         * @name JobsAddController.getDayClass
         * @methodOf module.JobsAddController
         * @description
         * This method is used for datepicker plugin.
         */
        function getDayClass(data) {
            var date = data.date,
                mode = data.mode;
            if (mode === 'day') {
                var dayToCheck = new Date(date)
                    .setHours(0, 0, 0, 0);
                for (var i = 0; i < $scope.events.length; i++) {
                    var currentDay = new Date($scope.events[i].date)
                        .setHours(0, 0, 0, 0);
                    if (dayToCheck === currentDay) {
                        return $scope.events[i].status;
                    }
                }
            }
            return '';
        }
        $scope.inlineOptions = {
            customClass: getDayClass,
            minDate: new Date(2001, 12, 31),
            showWeeks: true
        };
        $scope.dateOptions = {
            formatYear: 'yy',
            maxDate: new Date(2020, 12, 31),
            minDate: new Date(2001, 12, 31),
            startingDay: 1
        };

        function toggleMin() {
            $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date(2001, 12, 31);
            $scope.dateOptions.minDate = new Date(2001, 12, 31);
        }
        toggleMin();
        $scope.open1 = function() {
            $scope.popup1.opened = true;
        };
        $scope.open2 = function() {
            $scope.popup2.opened = true;
        };
        /**
         * @ngdoc method
         * @name JobsAddController.formats
         * @methodOf module.JobsAddController
         * @description
         * This method is used for format the date.
         */
        $scope.formats = ['yyyy-MM-dd'];
        $scope.format = $scope.formats[0];
        $scope.altInputFormats = $scope.formats[0];
        $scope.popup1 = {
            opened: false
        };
        $scope.popup2 = {
            opened: false
        };
        /**
         * @ngdoc method
         * @name JobsAddController Filter
         * @description
         * This method is used for diplay the custom filter form.
         */
        $scope.customDateForm = function(value) {
            $scope.custom_date = value;
            delete $scope.value;
            var dateHide = angular.element(document.getElementsByClassName('js-date'));
            if (dateHide.hasClass('hide')) {
                dateHide.removeClass('hide');
            } else {
                dateHide.addClass('hide');
            }
            $scope.getTransactions('custom');
        };
        /**
         * @ngdoc method
         * @name JobsAddController Filter
         * @description
         * This method is used for submit the custom filter form.
         */
         $scope.error_message = false;
        $scope.filterDate = function(valid) {
            $scope.custom_date = 'custom_date';
            if (valid) {
                $scope.customFilter.$setPristine();
                $scope.customFilter.$setUntouched();
                $scope.temp_from_date = $scope.from_date;
                $scope.temp_to_date = $scope.to_date;
                $scope.from_date = $filter('date')($scope.from_date, "yyyy-MM-dd");
                $scope.to_date = $filter('date')($scope.to_date, "yyyy-MM-dd");
                // var dateHide = angular.element(document.getElementsByClassName('js-date'));
                //  dateHide.addClass('hide');
               if ($scope.from_date < $scope.to_date) {
                $scope.getTransactions('custom', $scope.from_date, $scope.to_date);
                $scope.error_message = false;
                } else {
                    $scope.getTransactions('custom');
                    $scope.error_message = true;
                }
            }
        };
        $scope.getTransactions = function(value, from, to) {
            if (value !== 'custom') {
                var dateHide = angular.element(document.getElementsByClassName('js-date'));
                dateHide.addClass('hide');
                $scope.value = value;
                delete $scope.custom_date;
            } else if (value === 'custom') {
                $scope.custom_date = value;
            }
            if (value === 'all') {
                $state.go('transactions', {}, {
                    reload: true
                });
            }
            var params = {
                'id': $rootScope.user.id,
                'type': value,
                'from': from,
                'to': to
            };
              params.page = $scope.currentPage; 
            TransactionsFactory.get(params, function(response) {          
                if (angular.isDefined(response._metadata)) {
                    $scope.totalItems = response._metadata.total;
                    $scope.itemsPerPage = response._metadata.per_page;
                    $scope.noOfPages = response._metadata.last_page;
                    $scope.currentPage = response._metadata.current_page;
                }
                angular.forEach(response.data, function(value) {
                    var trans = value.transaction_type;
                    var exam = {};
                    var project = {};
                    var job = {};
                    var subscription = {};
                    var payment_gateway = {};
                    var commission = {};
                    if ($rootScope.isAuth === true && $rootScope.user.id === 1) {
                        $scope.transaction_messages = $scope.TransactionAdminMessage[parseInt(trans)];
                        value.transactionAmount = {
                            credit: value.amount,
                            debit: '--'
                        };
                    } else if ($rootScope.isAuth === true) {
                         if(trans === '5' && $rootScope.Freelancer && value.site_revenue_from_freelancer !== '0')
                            {
                              $scope.transaction_messages = $scope.TransactionUserMessage[22];
                            }
                            else if(trans === '7' && $rootScope.Freelancer && value.site_revenue_from_freelancer === '0')
                            {
                              $scope.transaction_messages = $scope.TransactionUserMessage[parseInt(24)];
                            }
                            else if(trans === '6' && $rootScope.Freelancer && value.site_revenue_from_freelancer === '0')
                            {
                              $scope.transaction_messages = $scope.TransactionUserMessage[parseInt(25)];
                             }
                             else if(trans === '5' && $rootScope.Freelancer && value.site_revenue_from_freelancer === '0')
                             {
                                $scope.transaction_messages = $scope.TransactionUserMessage[23];
                             }else if(trans === '7' && $rootScope.Employer && value.site_revenue_from_employer === '0')
                             {
                                 $scope.transaction_messages = $scope.TransactionUserMessage[24];
                             }else if(trans === '7' && $rootScope.Employer && value.site_revenue_from_employer !== '0')
                             {
                                  $scope.transaction_messages = $scope.TransactionUserMessage[parseInt(trans)];
                             }else if(trans === '5' && $rootScope.Employer && value.site_revenue_from_employer === '0')
                             {
                                  $scope.transaction_messages = $scope.TransactionUserMessage[parseInt(23)];
                             }else if(trans === '7' && $rootScope.Freelancer && value.site_revenue_from_employer === '0')
                             {
                                 $scope.transaction_messages = $scope.TransactionUserMessage[parseInt(24)];
                             }
                             else{
                              $scope.transaction_messages = $scope.TransactionUserMessage[parseInt(trans)];
                            }
                         if (value.user.id === $rootScope.user.id) {
                            if (value.class === 'Wallet') {
                                value.transactionAmount = {
                                    credit: value.amount,
                                    debit: '--'
                                };
                            } else {
                                value.transactionAmount = {
                                    credit: '--',
                                    debit: value.amount
                                };
                            }
                        } else if (value.other_user.id === $rootScope.user.id) {
                            if (value.class === 'UserCashWithdrawal') {
                                if(trans !== "20")
                                {
                                    value.transactionAmount = {
                                    credit: '--',
                                    debit: value.amount
                                    };
                                }else{
                                    value.transactionAmount = {
                                    credit: value.amount,
                                    debit: '--'
                                    };
                                }
                            } else {
                                value.transactionAmount = {
                                    credit: value.amount,
                                    debit: '--'
                                };
                            }
                        }
                    } 
                  
                    if (value.user.id === $rootScope.user.id && trans === "7") {
                        commission = value.site_revenue_from_employer; 
                    } else if(value.user.id !== $rootScope.user.id && trans === "7") {
                        commission = value.site_revenue_from_freelancer;
                    } 
                    if (value.user.id === $rootScope.user.id && trans === "22") {
                        commission = value.site_revenue_from_employer;
                    }
                    if (value.user.id === $rootScope.user.id && trans === "6") {
                        commission = value.site_revenue_from_employer;
                    }
                    if (value.user.id !== $rootScope.user.id && trans === "6") {
                        commission = value.site_revenue_from_freelancer;
                    }
                     if (value.user.id === $rootScope.user.id && trans === "5") {
                            commission = value.site_revenue_from_employer;
                    }   
                    if (value.user.id !== $rootScope.user.id && trans === "5") {
                            commission = value.site_revenue_from_freelancer;
                    } 
                    if (angular.isDefined(value.exam)) {
                        exam = '<a href =exams/' + value.exam.id + '/' + value.exam.title + '>' + value.exam.title + '</a>';
                    }
                    if (angular.isDefined(value.project)) {
                        project = '<a href =projects/view/' + value.project.id + '/' + value.project.slug + '>' + value.project.name + '</a>';
                    }
                    if (angular.isDefined(value.job)) {
                        job = '<a href =jobs/view/' + value.job.id + '/' + value.job.id + '>' + value.job.name + '</a>';
                    }
                    if (angular.isDefined(value.creditPurchasePlan)) {
                        subscription = value.creditPurchasePlan.name;
                    }
                   if (angular.isDefined(value.payment_gateway) && value.payment_gateway !== null) {
                        payment_gateway = value.payment_gateway.display_name;
                    }
                     if (value.user.id === $rootScope.user.id) {
                          value.user.username = 'You have'; 
                     }
                      if (value.user.id !== $rootScope.user.id){
                         value.user.username = '<a href =users/' + value.user.id + '/' + value.user.username + '>' + value.user.username + '</a>' + ' ' + 'has'; 
                     }
                    var name = {
                        '##CONTEST##': '<a href =contests/' + value.foreign_transaction.id + '/' + value.foreign_transaction.slug + '>' + value.foreign_transaction.name + '</a>',
                        '##CONTEST_AMOUNT##': $scope.settings.CURRENCY_SYMBOL + value.foreign_transaction.prize,
                        '##USER##':  value.user.username,
                        '##EXAM##': exam,
                        '##PROJECT##': project,
                        '##JOB##': job,
                        '##SUBSCRIPTION##': subscription,
                        '##PAYMENTGATEWAY##': payment_gateway,
                        '##PROJECT_NAME##': '<a href =projects/view/' + value.foreign_transaction.id + '/' + value.foreign_transaction.slug + '>' + value.foreign_transaction.name + '</a>',
                        '##SITE_FEE##': $scope.settings.CURRENCY_SYMBOL + value.foreign_transaction.site_commision,
                        '##OTHERUSER##': '<a href =users/' + value.other_user.id + '/' + value.other_user.username + '>' + value.other_user.username + '</a>',
                        '##COMMISSION##': commission
                    };
                    value.transaction_message = $scope.transaction_messages.replace(/##CONTEST##|##CONTEST_AMOUNT##|##USER##|##SITE_FEE##|##OTHERUSER##|##EXAM##|##PROJECT##|##PROJECT_NAME##|##SUBSCRIPTION##|##PAYMENTGATEWAY##|##JOB##|##COMMISSION##/gi, function(matched) {
                        return name[matched];
                    });
                    
                });
                $scope.transactions = response.data;
                $scope.from_date = $scope.temp_from_date;
                $scope.to_date = $scope.temp_to_date;
            });
        };
        $scope.paginate_transaction = function() {
            $scope.getTransactions();
        };
        $scope.index();
    }]);