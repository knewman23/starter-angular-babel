'use strict';

/* ngInject */
function asset() {

  function link() {



  }

  return {
    templateUrl: 'components/asset/asset.template.html',
    restrict: 'E',
    scope: {
      asset: '='
    },
    link: link
  };
}

export default asset;
