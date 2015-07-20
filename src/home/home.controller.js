'use strict';

/* @ngInject */
function Home(assetsService, userService) {
	var vm = this;

	vm.openAssets = assetsService.getOpenAssets();

	vm.user = userService.getCurrentUser();
}

angular.module('starterAngularBabel').controller('Home', Home);
