'use strict';

/* @ngInject */
function assetsService() {

	var openAssets = [
		{
			'title': 'AngularJS',
			'url': 'https://angularjs.org/',
			'description': 'HTML enhanced for web apps!',
			'logo': 'images/angular.png'
		},
		{
			'title': 'BrowserSync',
			'url': 'http://browsersync.io/',
			'description': 'Time-saving synchronised browser testing.',
			'logo': 'images/browsersync.png'
		},
		{
			'title': 'GulpJS',
			'url': 'http://gulpjs.com/',
			'description': 'The streaming build system.',
			'logo': 'images/gulp.png'
		},
		{
			'title': 'Jasmine',
			'url': 'http://jasmine.github.io/',
			'description': 'Behavior-Driven JavaScript.',
			'logo': 'images/jasmine.png'
		},
		{
			'title': 'Karma',
			'url': 'http://karma-runner.github.io/',
			'description': 'Spectacular Test Runner for JavaScript.',
			'logo': 'images/karma.png'
		},
		{
			'title': 'Protractor',
			'url': 'https://github.com/angular/protractor',
			'description': 'End to end test framework for AngularJS applications built on top of WebDriverJS.',
			'logo': 'images/protractor.png'
		},
		{
			'title': 'Bootstrap',
			'url': 'http://getbootstrap.com/',
			'description': 'Bootstrap is the most popular HTML, CSS, and JS framework for developing responsive, mobile first projects on the web.',
			'logo': 'images/bootstrap.png'
		},
		{
			'title': 'Angular UI Bootstrap',
			'url': 'http://angular-ui.github.io/bootstrap/',
			'description': 'Bootstrap components written in pure AngularJS by the AngularUI Team.',
			'logo': 'images/ui-bootstrap.png'
		},
		{
			'title': 'Sass (Node)',
			'url': 'https://github.com/sass/node-sass',
			'description': 'Node.js binding to libsass, the C version of the popular stylesheet preprocessor, Sass.',
			'logo': 'images/node-sass.png'
		},
		{
			'title': 'Babel',
			'url': 'https://babeljs.io/',
			'description': 'Turns ES6+ code into vanilla ES5, so you can use next generation features today.',
			'logo': 'images/babel.png'
		}
	];
	openAssets.forEach(function (asset) {
		asset.rank = Math.random();
	});

	function getOpenAssets() {
		return openAssets;
	}


	return {
		getOpenAssets: getOpenAssets
	};
}

angular.module('starterAngularBabel').factory('assetsService', assetsService);
