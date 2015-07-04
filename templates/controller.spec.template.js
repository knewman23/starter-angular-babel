'use strict';

describe('Controller: <%= PascaledName %>', function () {
	var scope;

	beforeEach(module('<%= moduleName %>'));

	beforeEach(inject(function ($rootScope) {
		scope = $rootScope.$new();
	}));

	it('should do something', inject(function ($controller) {

		$controller('<%= PascaledName %>', {
			$scope: scope
		});

	}));
});
