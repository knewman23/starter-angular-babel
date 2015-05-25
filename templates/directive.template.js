'use strict';

/**
 * @ngdoc directive
 * @name <%= appName %>.directive:<%= cameledName %>
 * @description
 */

/* @ngInject */
function <%= cameledName %>() {

  function link() {



  }

  return {
    templateUrl: 'components/<%= name %>/<%= htmlFilename %>',
    restrict: 'EA',
    link: link
  };
}

angular.module('<%= appName %>').directive('<%= cameledName %>', <%= cameledName %>);
