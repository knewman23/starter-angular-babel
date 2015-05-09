'use strict';

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

export default config;
