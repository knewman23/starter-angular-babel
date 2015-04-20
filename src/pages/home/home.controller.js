'use strict';

class HomeController {
  /* @ngInject */
  constructor (assetsService, userService) {

    var vm = this;
    vm.openAssets = assetsService.getOpenAssets();

    vm.user = userService.getCurrentUser();
  }
}

export default HomeController;
