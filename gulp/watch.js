'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')();

module.exports = function(options, paths) {
  gulp.task('watch', ['scripts:watch', 'inject'], function () {

    gulp.watch([paths.src + '/*.html', 'bower.json'], ['inject']);

    // function isAdded(file) {
    //     return file.event === 'add';
    // }

    // var filterAdded = $.filter(isAdded);

    //   gulp.src(paths.src + '/**/*.{css,scss}')
    //     .pipe($.watch('/**/*.{css,scss}'))
    //     .pipe(filterAdded)
    //   ], function(event) {
    //   if(event.type === 'changed') {
    //     gulp.start('styles');
    //   } else {
    //     gulp.start('inject');
    //   }
    // });

    $.watch([
        paths.src + '/**/*.scss',
        paths.src + '/**/*.css',
      ], function(file) {
        console.log(file.path);
        gulp.start('inject');
    });

    $.watch(paths.src + '/**/*.html', function(file) {
      console.log(file.path);
      browserSync.reload();
      // browserSync.reload(event.path);
    });

    // gulp.watch(paths.src + '/**/*.html', function(event) {
    //   browserSync.reload(event.path);
    // });
  });
};
