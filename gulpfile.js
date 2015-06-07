'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var fs = require('fs');

// gulp files
fs.readdirSync('./gulp').filter(function(file) {
  // exclude config.js and any files that don't end in .js
  return ( file !== 'config.js' && (/\.(js)$/i).test(file) );
}).map(function(file) {
  require('./gulp/' + file);
});

// generator files
fs.readdirSync('./gulp/generators').filter(function(file) {
  // exclude any files that don't end in .js
  return (/\.(js)$/i).test(file);
}).map(function(file) {
  require('./gulp/generators/' + file);
});

gulp.task('default', ['clean'], function () {
    gulp.start('build');
});
