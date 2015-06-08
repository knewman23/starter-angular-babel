'use strict';

var gulp = require('gulp');
var $ = {
  filter: require('gulp-filter'),
  watch: require('gulp-watch')
};

var browserSync = require('browser-sync');

var config = require('./config');
var paths = config.paths;

var styles = require('./styles').styles;
var inject = require('./inject').inject;


gulp.task('watch', ['scripts:watch', 'styles', 'inject'], function() {

  $.watch('bower.json', {
      read: false,
      name: 'watch: bower'
    }, function(file) {
    console.log(file.path);
    inject();
  });

  $.watch([
      paths.src + '/**/*.scss',
      paths.src + '/**/*.css',
    ], {
      read: false,
      name: 'watch: SCSS/CSS'
    }, function(file) {
      console.log(file.path);
      styles()
        .pipe(browserSync.stream());
  });

  $.watch(paths.src + '/**/*.html', {
      read: false,
      name: 'watch: HTML'
    }, function(file) {
      console.log(file.path);
      browserSync.reload();
  });

  // gulp.watch(paths.src + '/**/*.html', function(event) {
  //   browserSync.reload(event.path);
  // });
});
