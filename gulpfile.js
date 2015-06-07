'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var wrench = require('wrench');

wrench.readdirSyncRecursive('./gulp').filter(function(file) {
  return ( file !== 'config.js' && (/\.(js)$/i).test(file) );
}).map(function(file) {
  require('./gulp/' + file);
});

gulp.task('default', ['clean'], function () {
    gulp.start('build');
});
