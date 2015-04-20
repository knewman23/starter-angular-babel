'use strict';

describe('Controller: <%= cameledName %>Controller', function(){
  var scope;

  beforeEach(module('<%= appName %>'));

  beforeEach(inject(function($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should do something', inject(function($controller) {

    $controller('<%= cameledName %>Controller', {
      $scope: scope
    });

  }));
});
