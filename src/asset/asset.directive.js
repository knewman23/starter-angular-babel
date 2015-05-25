'use strict';

/* @ngInject */
function asset() {

  function link() {



  }

  return {
    templateUrl: 'asset/asset.template.html',
    restrict: 'E',
    scope: {
      asset: '='
    },
    link: link
  };
}

angular.module('starterAngularBabel').directive('asset', asset);
