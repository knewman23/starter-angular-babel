'use strict';

/**
 * @ngdoc filter
 * @name <%= moduleName %>.filter:<%= cameledName %>
 * @description
 */

/* @ngInject */
function <%= cameledName %>() {
	return function (input) {
		return '<%= cameledName %> filter: ' + input;
	};
}

angular.module('<%= moduleName %>').filter('<%= cameledName %>', <%= cameledName %>);
