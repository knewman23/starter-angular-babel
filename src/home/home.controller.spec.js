'use strict';

describe('controllers', function () {
	var scope;

	beforeEach(module('starterAngularBabel'));

	beforeEach(inject(function ($rootScope) {
		scope = $rootScope.$new();
	}));

	it('should define more than 5 open source assets', inject(function ($controller) {
		expect(scope.openAssets).toBeUndefined();

		$controller('Home', {
			$scope: scope
		});

		expect(angular.isArray(scope.openAssets)).toBeTruthy();
		expect(scope.openAssets.length > 5).toBeTruthy();
	}));
});
