'use strict';

import userService from './services/user.service';
import assetsService from './pages/home/assets.service';
import HomeController from './pages/home/home.controller';
import asset from './components/asset/asset.directive';

(function () {

  /* @ngInject */
  function config($stateProvider, $urlRouterProvider) {

    // routes
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'pages/home/home.html',
        controller: 'HomeController',
        controllerAs: 'vm'
      });

    $urlRouterProvider.otherwise('/');

  }

  angular.module('starterAngularBabel', ['ngSanitize', 'ui.router', 'ui.bootstrap'])
    .factory('userService', userService)
    .factory('assetsService', assetsService)
    .directive('asset', asset)
    .controller('HomeController', HomeController)
    .config(config);

})();
