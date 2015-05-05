'use strict';

import userService from './services/user.service';
import assetsService from './home/assets.service';
import Home from './home/home.controller';
import asset from './asset/asset.directive';

(function () {

  /* @ngInject */
  function config($stateProvider, $urlRouterProvider) {

    // routes
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'home/home.html',
        controller: 'Home',
        controllerAs: 'vm'
      });

    $urlRouterProvider.otherwise('/');

  }

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
