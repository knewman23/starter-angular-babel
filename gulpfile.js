'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var fs = require('fs');

fs.readdirSync('./gulp').filter(function(file) {
  // exclude config.js and any files that don't end in .js
  return ( file !== 'config.js' && (/\.(js)$/i).test(file) );
}).map(function(file) {
  require('./gulp/' + file);
});

gulp.task('default', ['clean'], function () {
    gulp.start('build');
});
