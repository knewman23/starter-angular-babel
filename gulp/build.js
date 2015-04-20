'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del', 'rev-del']
});

function replaceImagePath(s) {

}

module.exports = function(options, paths) {
  // If you want an html partial/template/view to be templatecached, make sure it ends with '.template.html' (e.g. 'someDirective.template.html'). Otherwise, it will be copied and minified in the html task. Be sure to point to the correct template file path in your directive templateUrl.
  gulp.task('partials', function () {
    return gulp.src([
      paths.src + '/**/*.template.html'
    ])
      .pipe($.minifyHtml({
        empty: true,
        spare: true,
        quotes: true
      }))
      .pipe($.debug({title: 'PARTIALS TO BE TEMPLATECACHED:'}))
      .pipe($.angularTemplatecache('templateCacheHtml.js', {
        // module name is same as appName by default - this can be changed of course if your module name differs from app name
        module: options.appName
      }))
      .pipe(gulp.dest(paths.tmpPartials + '/'));
  });

  gulp.task('html', ['inject', 'partials'], function () {
    var partialsInjectFile = gulp.src(paths.tmpPartials + '/templateCacheHtml.js', { read: false });
    var partialsInjectOptions = {
      starttag: '<!-- inject:partials -->',
      ignorePath: paths.tmpPartials + '/',
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
        // ignore all template files, since they get put in templatecache
        '!' + paths.src + '/**/*.template.html',
        // ignore the src index.html since we already have the tmp one
        '!' + paths.src + '/index.html'
      ])
      // STEP: index.html file injection and useref
      .pipe(indexHtmlFilter)
      .pipe($.debug({title: 'SOURCE INDEX.HTML FILE:'}))
      // inject the templateCacheHtml.js file into index.html
      .pipe($.inject(partialsInjectFile, partialsInjectOptions))
      // concat all assets in build blocks with useref
      .pipe(assets = $.useref.assets())
      // .pipe($.debug({title: 'AFTER USEREF:'}))
      .pipe($.rev())

      // STEP: JS files
      .pipe(jsFilter)
      .pipe($.debug({title: 'JS FILES:'}))
      .pipe($.ngAnnotate())
      .pipe($.uglify({ preserveComments: $.uglifySaveLicense })).on('error', options.errorHandler('Uglify'))
      .pipe(jsFilter.restore())

      // STEP: CSS files
      .pipe(cssFilter)
      .pipe($.debug({title: 'CSS FILES:'}))
      // replace the font paths with the path to the font folder in the dist folder
      .pipe($.replace('/bower_components/bootstrap-sass/assets/fonts/bootstrap/', '../assets/fonts/'))
      .pipe($.csso())
      .pipe(cssFilter.restore())
      .pipe(assets.restore())
      // .pipe($.debug({title: 'AFTER USEREF-ASSETS:'}))
      .pipe($.useref())
      .pipe($.revReplace())
      .pipe(indexHtmlFilter.restore())

      // STEP: HTML files
      .pipe(htmlFilter)
      .pipe($.debug({title: 'HTML FILES:'}))
      .pipe($.minifyHtml({
        empty: true,
        spare: true,
        quotes: true,
        conditionals: true
      }))
      .pipe(htmlFilter.restore())

      // STEP: Put everything in dist folder
      .pipe($.debug({title: 'ALL DIST FILES:'}))
      .pipe(gulp.dest(paths.dist + '/'))
      // show some stats about the size of your project
      .pipe( $.size({ title: paths.dist + '/', showFiles: true }) )
      .pipe($.rev.manifest())
      .pipe( $.revDel({dest: paths.dist}) ) // delete old, unused fingerprinted files based on gulp-rev's manifest file
      .pipe(gulp.dest(paths.dist + '/')); // write rev manifest to build dir;
  });

  // Fonts from bower dependencies and custom ones from this app
  gulp.task('fonts', function () {
    return gulp.src([
      paths.fonts + '/**/*'
    ].concat($.mainBowerFiles()))
      .pipe($.filter('**/*.{eot,svg,ttf,woff,woff2}'))
      .pipe($.flatten())
      .pipe(gulp.dest(paths.distFonts + '/'));
  });

  gulp.task('images', function () {
    return gulp.src([
      paths.images + '/**/*'
    ])
      // .pipe($.debug({title: 'SOURCE IMAGES:'}))
      .pipe($.flatten())
      .pipe(gulp.dest(paths.distImages + '/'));
  });

  gulp.task('clean', function (done) {
    $.del([paths.dist + '/', paths.tmp + '/'], done);
  });

  gulp.task('build', ['html', 'fonts', 'images']);
};
