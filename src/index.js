'use strict';

import config from './config';
import userService from './services/user.service';
import assetsService from './home/assets.service';
import Home from './home/home.controller';
import asset from './asset/asset.directive';

(function () {

  angular.module('starterAngularBabel', [
      // Angular modules
      'ngSanitize',
      // 3rd-party modules
      'ui.router',
      'ui.bootstrap'
    ])
    .factory('userService', userService)
    .factory('assetsService', assetsService)
    .directive('asset', asset)
    .controller('Home', Home)
    .config(config);

})();
