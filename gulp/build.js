'use strict';

var gulp = require('gulp');
var $ = {
	sequence: require('run-sequence'),
	minifyHtml: require('gulp-minify-html'),
	minifyCss: require('gulp-minify-css'),
	purifyCss: require('gulp-purifycss'),
	angularTemplatecache: require('gulp-angular-templatecache'),
	ngAnnotate: require('gulp-ng-annotate'),
	filter: require('gulp-filter'),
	flatten: require('gulp-flatten'),
	inject: require('gulp-inject'),
	replace: require('gulp-replace'),
	useref: require('gulp-useref'),
	uglify: require('gulp-uglify'),
	revAll: require('gulp-rev-all'),
	size: require('gulp-size'),
	debug: require('gulp-debug')
};

var _ = require('lodash');

var mainBowerFiles = require('main-bower-files');
var uglifySaveLicense = require('uglify-save-license');

var config = require('./config');
var paths = config.paths;


// If you want an html partial/template/view to be templatecached, make sure it ends with '.template.html' (e.g. 'someDirective.template.html'). Otherwise, it will be copied and minified in the 'dist' task.
gulp.task('templates', function () {
	return gulp.src([
		paths.src + '/**/*.template.html'
	])
		.pipe($.debug({title: 'TEMPLATES TO BE TEMPLATECACHED:'}))
		.pipe($.minifyHtml({
			empty: true,
			spare: true,
			quotes: true,
			conditionals: true
		}))
		.pipe($.angularTemplatecache('templateCacheHtml.js', {
			module: config.moduleName
		}))
		.pipe(gulp.dest(paths.tmpTemplates));
});

// all the files that purify-css needs to check for dynamic classes (e.g. ng-class)
function determinePurifyFiles(excludes) {
	if(!Array.isArray(excludes)) {
		excludes = [];
	}
	// this is _.endsWith, but it takes an array of strings
	function endsWith(str, targets) {
		var endsWithAny = false;
		targets.forEach(function(target) {
			if(_.endsWith(str, target)) {
				endsWithAny = true;
				return false; //exit iteration early once the first one is found
			}
		});
		return endsWithAny;
	}

	// dependency files that purify-css needs to check
	var purifyDependencyFiles = [];
	mainBowerFiles().forEach(function(file) {
		// just html and js (in the form of angular templatecaches) files can contain ng-classes
		// ignore things in the exclude list
		if( endsWith(file, ['.html', '.js']) && !endsWith(file, excludes) ) {
			// strip out current working directory from beginning of file path
			// see https://github.com/ck86/main-bower-files#youve-got-a-flat-folderfile-structure-after-pipegulpdestmydestpath
			purifyDependencyFiles.push(file.replace(process.cwd() + '/', ''));
		}
	});

	var purifyFiles = [
				paths.src + '/**/*.js',
				'!' + paths.src + '/**/*.spec.js',
				paths.src + '/**/*.html'
			].concat(purifyDependencyFiles);

	console.log(purifyFiles);
	return purifyFiles;
}

gulp.task('dist', function () {
	var templatesInjectFile = gulp.src(paths.tmpTemplates + '/templateCacheHtml.js', {read: false});
	var templatesInjectOptions = {
		starttag: '<!-- inject:templates -->',
		ignorePath: paths.tmpTemplates + '/',
		addRootSlash: false
	};

	var indexHtmlFilter = $.filter('**/index.html');
	var htmlFilter = $.filter('**/*.html');
	var jsFilter = $.filter('**/*.js');
	var cssFilter = $.filter('**/*.css');
	var assets;

	return gulp.src([
		// grab index.html file in tmp directory
		paths.tmpServe + '/index.html',
		// and all html files in src directory
		paths.src + '/**/*.html',
		// ignore all template files, since they get put in templatecache by the 'templates' task
		'!' + paths.src + '/**/*.template.html',
		// ignore the src index.html since we already have the tmp one
		'!' + paths.src + '/index.html'
	])
		// .pipe($.debug({title: 'SOURCE FILES:'}))
		// STEP: index.html file injection and useref
		.pipe(indexHtmlFilter)
		// .pipe($.debug({title: 'JUST INDEX.HTML:'}))
		// inject the templateCacheHtml.js file into index.html
		.pipe($.inject(templatesInjectFile, templatesInjectOptions))
		// concat the js and css files in the build blocks of index.html and add the resulting files to the stream
		.pipe(assets = $.useref.assets())
		// .pipe($.debug({title: 'AFTER useref.assets():'}))

		// STEP: JS files
		.pipe(jsFilter)
		// .pipe($.debug({title: 'JS FILES:'}))
		.pipe($.ngAnnotate())
		.pipe($.uglify({preserveComments: uglifySaveLicense})).on('error', config.errorHandler('Uglify'))
		.pipe(jsFilter.restore())

		// STEP: CSS files
		.pipe(cssFilter)
		// .pipe($.debug({title: 'CSS FILES:'}))
		// replace the font paths with the path to the font folder in the dist folder
		.pipe($.replace('../../bower_components/bootstrap-sass/assets/fonts/bootstrap/', 'fonts/'))
		.pipe($.minifyCss())
		// Remove unused CSS with purify-css
		.pipe($.purifyCss( determinePurifyFiles(['bootstrap.js']) )) //ignore bootstrap.js because we don't use it
		.pipe(cssFilter.restore())
		.pipe(assets.restore())
		.pipe($.useref())
		.pipe(indexHtmlFilter.restore())

		// STEP: HTML files
		.pipe(htmlFilter)
		// .pipe($.debug({title: 'HTML FILES:'}))
		.pipe($.minifyHtml({
			empty: true,
			spare: true,
			quotes: true,
			conditionals: true
		}))
		.pipe(htmlFilter.restore())

		// STEP: Write everything to dist folder
		// .pipe($.debug({title: 'DIST FILES:'}))
		.pipe(gulp.dest(paths.tmpDist))
		// show stats about the size of the HTML, JS, CSS files in your project
		.pipe($.size({title: 'SIZE: ', showFiles: true}))
});

// Fonts from bower dependencies and custom ones from this app
gulp.task('fonts', function () {
	return gulp.src([
		paths.src + '/fonts/*'
	].concat(mainBowerFiles()))
		.pipe($.filter('**/*.{eot,ttf,woff,woff2}'))
		.pipe($.flatten())
		.pipe(gulp.dest(paths.tmpDist + '/fonts'));
});

gulp.task('images', function () {
	return gulp.src([
		paths.src + '/**/*.{jpg,jpeg,tiff,gif,png,svg,ico}'
	])
		// .pipe($.debug({title: 'SOURCE IMAGES:'}))
		.pipe(gulp.dest(paths.tmpDist));
});


// setup gulp-rev-all
var revAll = new $.revAll({
	// stop it from renaming index.html and favicon.ico
	dontRenameFile: ['favicon.ico', 'index.html']
});

// Revision all the things in tmp dist directory and write to final dist location
gulp.task('rev', function () {
	return gulp.src(paths.tmpDist + '/**/*')
		.pipe(revAll.revision())
		// write revisioned files to dist
		.pipe(gulp.dest(paths.dist + '/'))
		// show stats about the size of all minified files in your project
		.pipe($.size({title: 'MINIFIED SIZE: '}))
		.pipe(revAll.manifestFile())
		.pipe(gulp.dest(paths.dist)); //write rev manifest to dist
});

gulp.task('build', function (done) {
	$.sequence(
		'clean',
		['html', 'styles', 'scripts', 'templates', 'fonts', 'images'],
		'dist',
		'rev',
		done
	);
});
