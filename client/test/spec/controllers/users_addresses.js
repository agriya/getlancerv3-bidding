'use strict';

describe('Controller: UsersAddressesCtrl', function () {

  // load the controller's module
  beforeEach(module('ofosApp'));

  var UsersAddressesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UsersAddressesCtrl = $controller('UsersAddressesCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(UsersAddressesCtrl.awesomeThings.length).toBe(3);
  });
});
