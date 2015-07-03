'use strict';

describe('controllers and service', function () {
	var scope, controller, service,
		openAssetsArray;

	beforeEach(module('starterAngularBabel'));

	beforeEach(inject(function ($rootScope, $controller, assetsService) {
		scope = $rootScope.$new(),
			controller = $controller('Home', {}),
			service = assetsService;
	}));


	describe('assets service factory', function () {
		it('should define a function to return openAssets > 5', function () {
			expect(service.getOpenAssets()).toBeTruthy();

			openAssetsArray = service.getOpenAssets();

			expect(openAssetsArray).toBeDefined();

			expect(openAssetsArray.length).toBeGreaterThan(5);
		});
	});


	it('should allow the controller to get the Open Assets', function () {
		expect(controller).toBeTruthy();
		expect(controller).toBeDefined();
		expect(controller.openAssets).toBeDefined();

		//openAssetsArray = the call for getOpenAssets() from service
		controller.openAssets = openAssetsArray;

		expect(controller.openAssets).toBeTruthy();

		expect(controller.openAssets.length).toBeGreaterThan(5);
	});
});


//standalone test for factory assetsService
/*describe("assets service factory test", function(){
 var scope, controller, service;

 beforeEach(module('intcStarterAngularBabel'));

 beforeEach(inject(function(assetsService){
 service = assetsService;
 }));

 it('should define the return functions', function() {
 expect(service.getIntcAssets()).toBeTruthy();
 expect(service.getIntcAssets()).toBeDefined();

 expect(service.getOpenAssets()).toBeTruthy();
 expect(service.getOpenAssets()).toBeDefined();
 });
 }); */




