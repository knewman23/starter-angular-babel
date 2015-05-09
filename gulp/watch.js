'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');

module.exports = function(options, paths) {
  gulp.task('watch', ['scripts:watch', 'inject'], function () {

    gulp.watch([paths.src + '/*.html', 'bower.json'], ['inject']);

    gulp.watch([
      paths.src + '/**/*.css',
      paths.src + '/**/*.scss'
    ], function(event) {
      if(event.type === 'changed') {
        console.log('SCSS file changed.')
        gulp.start('styles');
      } else if(event.type === 'added') {
        console.log('SCSS file added.')
        gulp.start('inject');
      } else if(event.type === 'deleted') {
        console.log('SCSS file deleted.')
        gulp.start('inject');
      }
    });


    gulp.watch(paths.src + '/**/*.html', function(event) {
      browserSync.reload(event.path);
    });
  });
};
