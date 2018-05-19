'use strict';

describe('Controller: UsersAddressesAddCtrl', function () {

  // load the controller's module
  beforeEach(module('ofosApp'));

  var UsersAddressesAddCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UsersAddressesAddCtrl = $controller('UsersAddressesAddCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(UsersAddressesAddCtrl.awesomeThings.length).toBe(3);
  });
});
