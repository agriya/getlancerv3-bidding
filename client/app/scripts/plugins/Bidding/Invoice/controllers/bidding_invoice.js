'use strict';
/**
 * @ngdoc function
 * @name getlancerApp.controller:BiddingMilestoneCtrl
 * @description
 * # QuoteServicePhotosManageController
 * Controller of the getlancerApp
 */
angular.module('getlancerApp.Bidding.Invoice')
    .controller('BiddingInvoiceCtrl', function($scope, $rootScope, $timeout, $state, $cookies, $filter, flash, md5, ProjectStatusConstant, Invoice) {
        $scope.GetInvoices = function() {
            $scope.invoiceparams.page = ($scope.InvoicecurrentPage !== undefined) ? $scope.InvoicecurrentPage : 1;
            Invoice.get($scope.invoiceparams, function(response) {
                if (angular.isDefined(response._metadata)) {
                    $scope.InvoicecurrentPage = response._metadata.current_page;
                    $scope.InvoicetotalItems = response._metadata.total;
                    $scope.InvoiceitemsPerPage = response._metadata.per_page;
                    $scope.InvoicenoOfPages = response._metadata.last_page;
                }
                if (parseInt(response.error.code) === 0) {
                    $scope.invoices = response.data;
                } else {
                    $scope.invoices = [];
                }
            });
        };
        $scope.InvoicePaginate = function(items) {
            $scope.InvoicecurrentPage = parseInt(items);
            if($rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Bidding/Invoice') > -1)
            {
                 $scope.GetInvoices();
            }
        };
        $scope.buttonInvoice = 'Add Invoice';
        //Button value changing function
        $scope.invoice_value = false;
        $scope.form = function() {
            $scope.data = {};
            if ($scope.invoice_value == false) {
                $scope.invoice_value = true;
                $scope.buttonInvoice = 'Cancel';
            } else {
                $scope.invoice_value = false;
                $scope.buttonInvoice = 'Add Invoice';
            }
        }
        $scope.bids = {};
           $scope.invoice_set = false;
        $scope.ProjectInvoice = function(invoiceform, is_valid) {
            $scope.invoice_set = true;
            var flashMessage = "";
            $scope.projectvalue = {};
            $scope.projectvalue.bid_id = $scope.bidid;
            $scope.projectvalue.project_bid_invoice_items = [$scope.bids];
            if (angular.isDefined($scope.formid) && $scope.formid !== null) {
                Invoice.put({
                    id: $scope.formid
                }, $scope.projectvalue, function(response) {
                    $scope.invoice_set = false;
                    if (parseInt(response.error.code) === 0) {
                        $scope.addInvoice = false;
                        flashMessage = $filter("translate")("Invoice updated successfully.");
                        $scope.invoice_value = false;
                        $scope.buttonInvoice = 'Add Invoice';
                        $scope.formid = null;
                        flash.set(flashMessage, 'success', false);
                        $scope.bids = {};
                        invoiceform.$setPristine();
                        invoiceform.$setUntouched();
                        $scope.GetInvoices();
                    } else {
                        flashMessage = $filter("translate")(response.error.message);
                        flash.set(flashMessage, 'error', false);
                    }
                });
            } else {
                if (is_valid) {
                       $scope.invoice_set = true;
                    Invoice.post($scope.projectvalue, function(response) {
                         $scope.invoice_set = false;
                        if (parseInt(response.error.code) === 0) {
                            $scope.addInvoice = false;
                            flashMessage = $filter("translate")("Invoice sent successfully.");
                            $scope.buttonInvoice = 'Add Invoice';
                            $scope.invoice_value = false;
                            flash.set(flashMessage, 'success', false);
                            $scope.bids = {};
                            invoiceform.$setPristine();
                            invoiceform.$setUntouched();
                            $scope.GetInvoices();
                        } else {
                            flashMessage = $filter("translate")(response.error.message);
                            flash.set(flashMessage, 'error', false);
                        }
                    });
                }
            }
        };
        /*Edit Invoice Funtion */
        $scope.EditInvoice = function(invoiceId) {
            $scope.buttonInvoice = 'Cancel';
            $scope.invoice_value = true;
        if($rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Bidding/Invoice') > -1)
            {
                Invoice.get({
                    id: invoiceId
                }, function(response) {
                    if (parseInt(response.error.code) === 0) {
                        $scope.getinvoice = response.data;
                        angular.forEach($scope.getinvoice.projectbidinvoiceitems, function(value) {
                            $scope.formid = value.project_bid_invoice_id;
                            $scope.bids.amount = parseInt(value.amount);
                            $scope.bids.description = value.description;
                        });
                    }
                });
            }
        };
        /*  Delete Invoince - Can delte by experience user only -- Begins */
        $scope.deleteInvoice = function(invoiceId) {
            var flashMessage={};
            if ($rootScope.user !== null && $rootScope.user !== undefined) {
                swal({ //jshint ignore:line
                    title: $filter("translate")("Are you sure you want to delete?"),
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "OK",
                    cancelButtonText: "Cancel",
                    closeOnConfirm: true,
                    animation:false,
                }).then(function (isConfirm) {
                    if (isConfirm) {
                        Invoice.delete({
                            id: invoiceId
                        }, function(response) {
                            if (parseInt(response.error.code) === 0) {
                                flashMessage = $filter("translate")("Invoice deleted successfully.");
                                flash.set(flashMessage, 'success', false);
                                 $scope.GetInvoices();
                            } else {
                                flashMessage = $filter("translate")(response.error.message);
                                flash.set(flashMessage, 'error', false);
                            }
                        });
                    }
                });
            }
        };
        $scope.GetInvoices();
    });