'use strict';

var gulp = require('gulp');
var $ = {
  inject: require('gulp-inject')
};

var wiredep = require('wiredep').stream;

var config = require('./config');
var paths = config.paths;


gulp.task('inject', ['scripts', 'styles'], function () {
  var injectStyles = gulp.src([
    paths.tmpServe + '/**/*.css',
    '!' + paths.tmpServe + '/dependencies.css'
  ], { read: false });

  var injectScripts = gulp.src([
    paths.tmpServe + '/**/*.js',
    '!' + paths.src + '/**/*.spec.js',
    '!' + paths.src + '/**/*.mock.js'
  ], { read: false });

  var injectOptions = {
    ignorePath: [paths.src, paths.tmpServe],
    addRootSlash: false
  };

  return gulp.src(paths.src + '/*.html')
    .pipe($.inject(injectStyles, injectOptions))
    .pipe($.inject(injectScripts, injectOptions))
    .pipe(wiredep(config.wiredep))
    .pipe(gulp.dest(paths.tmp + '/serve'));
});
