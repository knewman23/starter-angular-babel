'use strict';

class Home {
  /* @ngInject */
  constructor (assetsService, userService) {

    var vm = this;
    vm.openAssets = assetsService.getOpenAssets();

    vm.user = userService.getCurrentUser();
  }
}

export default Home;
