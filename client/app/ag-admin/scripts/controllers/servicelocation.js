'use strict';
/**
 * @ngdoc function
 * @name ofosApp.controller:ServicelocationController
 * @description
 * # ServicelocationController
 * Controller of the getlancerv3
 */
angular.module('base')
    .controller('ServicelocationController', function($scope, $http, $filter, $location, notification, $state, $window, $cookies, ServiceLocation, CitiesFactory, CountriesFactory) {
		$scope.countriesList = [];
		$scope.citiesList = [];
     	ServiceLocation.get({id:$state.params.id}, function (response) {
			if (angular.isDefined(response.error.code === 0)) {
				$scope.serviceLocation = response.data;
				var parseval = JSON.parse($scope.serviceLocation.value);
                if (parseval.length === 0) {
                        $scope.allcountries = 1;
                    } else if ($scope.serviceLocation.value.length > 0){
                        $scope.allcountries = 0;
                    }
				angular.forEach(parseval.allowed_countries, function (value) {
					$scope.countriesList.push(parseInt(value.id));
				});
				angular.forEach(parseval.allowed_cities, function (value) {
					$scope.citiesList.push(parseInt(value.id));
				});
			}
		});

		$scope.sercviceLocationadd = function() {
			var params = {};
            var flashMessage;
			params.allowed_countries = [];
			params.allowed_cities = [];
				angular.forEach($scope.country_select, function (value) {
					params.allowed_countries.push({
						id: value.id,
                        name: value.text
					});
				});
				angular.forEach($scope.city_select, function (value) {
					params.allowed_cities.push({
						id: value.id,
                        name: value.text
					});
				});
				params.id = $state.params.id;
				ServiceLocation.put(params, function (response) {
					if (angular.isDefined(response.error.code === 0)) {
						notification.log($filter("translate")("Settings Added successfully"),{
                            addnCls: 'humane-flatty-success'
                        });
                            $state.go('servicelocations', {'id':$state.params.id},{reload:true});
					}
				});
		};
		CountriesFactory.get(function (response) {
                if (parseInt(response.error.code) === 0) {
                    $scope.country = [];
                    $scope.countries = response.data;
					$scope.country_select = [];

                    angular.forEach($scope.countries, function (value) {
                        $scope.country.push({
                            id: value.id,
                            text: value.name
                        });
                        /* here for select skill default */
                        if ($scope.countriesList !== undefined) {
                            if ($scope.countriesList.indexOf(value.id) != -1) {
                                $scope.country_select.push({
                                    id: value.id,
                                    text: value.name
                                });
                            }
                        }
				    });
                } else {
                    console.log('Countries Error');
                }
            }, function (error) {
                console.log('Countries Error', error);
       });
	 	$scope.loadCountries = function (qstr) {
            qstr = qstr.toLowerCase();
            var items = [];
            angular.forEach($scope.country, function (value) {
                name = value.text.toLowerCase();
                if (name.indexOf(qstr) >= 0) {
                    items.push({
                        id: value.id,
                        text: value.text
                    });
                }
            });
            return items;
        };
	CitiesFactory.get(function (response) {
                if (parseInt(response.error.code) === 0) {
                    $scope.city = [];
                    $scope.cities = response.data;
					$scope.city_select = [];
                    angular.forEach($scope.cities, function (value) {
                        $scope.city.push({
                            id: value.id,
                            text: value.name
                        });
                        /* here for select skill default */
                        if ($scope.citiesList !== undefined) {
                            if ($scope.citiesList.indexOf(value.id) != -1) {
                                $scope.city_select.push({
                                    id: value.id,
                                    text: value.name
                                });
                            }
                        }
                    });
                } else {
                    console.log('Cities Error');
                }
            }, function (error) {
                console.log('Cities Error', error);
       });
	
	 	$scope.loadCities = function (qstr) {
            qstr = qstr.toLowerCase();
            var items = [];
            angular.forEach($scope.city, function (value) {
                name = value.text.toLowerCase();
                if (name.indexOf(qstr) >= 0) {
                    items.push({
                        id: value.id,
                        text: value.text
                    });
                }
            });
            return items;
         };
    });