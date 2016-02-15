'use strict';

describe('Controller: SeachCtrl', function () {

  // load the controller's module
  beforeEach(module('clientApp'));

  var SeachCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SeachCtrl = $controller('SeachCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(SeachCtrl.awesomeThings.length).toBe(3);
  });
});
