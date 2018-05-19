'use strict';

describe('Controller: CartCtrl', function () {

  // load the controller's module
  beforeEach(module('ofosApp'));

  var CartCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CartCtrl = $controller('CartCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CartCtrl.awesomeThings.length).toBe(3);
  });
});
