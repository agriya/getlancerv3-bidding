'use strict';

describe('Controller: RestaurantsViewCtrl', function () {

  // load the controller's module
  beforeEach(module('ofosApp'));

  var RestaurantsViewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RestaurantsViewCtrl = $controller('RestaurantsViewCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(RestaurantsViewCtrl.awesomeThings.length).toBe(3);
  });
});
