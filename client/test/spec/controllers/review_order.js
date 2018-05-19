'use strict';

describe('Controller: ReviewOrderCtrl', function () {

  // load the controller's module
  beforeEach(module('ofosApp'));

  var ReviewOrderCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ReviewOrderCtrl = $controller('ReviewOrderCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ReviewOrderCtrl.awesomeThings.length).toBe(3);
  });
});
