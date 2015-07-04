'use strict';

/**
 * @ngdoc directive
 * @name <%= moduleName %>.directive:<%= cameledName %>
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

angular.module('<%= moduleName %>').directive('<%= cameledName %>', <%= cameledName %>);
