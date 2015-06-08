'use strict';

var gulp = require('gulp');
var $ = {
  filter: require('gulp-filter'),
  watch: require('gulp-watch')
};

var browserSync = require('browser-sync');

var config = require('./config');
var paths = config.paths;

var styles = require('./styles').styles; // import styles task as a function
var html = require('./html').html; // import html task as a function


gulp.task('watch', ['html', 'styles', 'scripts:watch'], function() {

  $.watch('bower.json', {
      read: false,
      name: 'watch: bower'
    }, function(file) {
    console.log(file.path);
    html();
  });

  $.watch([
      paths.src + '/**/*.scss',
      paths.src + '/**/*.css',
    ], {
      read: false,
      name: 'watch: SCSS/CSS'
    }, function(file) {
      console.log(file.path);
      // run the styles task, then inject CSS with BrowserSync
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
