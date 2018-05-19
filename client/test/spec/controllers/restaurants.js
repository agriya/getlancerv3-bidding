'use strict';

describe('Controller: RestaurantsCtrl', function () {

  // load the controller's module
  beforeEach(module('ofosApp'));

  var RestaurantsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RestaurantsCtrl = $controller('RestaurantsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(RestaurantsCtrl.awesomeThings.length).toBe(3);
  });
});
