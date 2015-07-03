'use strict';

/* @ngInject */
function bundledAsset() {

	function link() {


	}

	return {
		templateUrl: 'bundledAsset/bundledAsset.template.html',
		restrict: 'E',
		scope: {
			asset: '='
		},
		link: link
	};
}

angular.module('starterAngularBabel').directive('bundledAsset', bundledAsset);
