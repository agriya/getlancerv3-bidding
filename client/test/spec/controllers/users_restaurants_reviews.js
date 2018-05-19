'use strict';

describe('Controller: UsersRestaurantsReviewsCtrl', function () {

  // load the controller's module
  beforeEach(module('ofosApp'));

  var UsersRestaurantsReviewsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UsersRestaurantsReviewsCtrl = $controller('UsersRestaurantsReviewsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(UsersRestaurantsReviewsCtrl.awesomeThings.length).toBe(3);
  });
});
