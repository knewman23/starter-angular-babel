'use strict';

var gulp = require('gulp');

var wiredep = require('wiredep').stream;

var config = require('./config');
var paths = config.paths;


gulp.task('inject:bower', injectBower);


// inject dependency scripts
function injectBower() {
  return gulp.src(paths.src + '/index.html')
    .pipe(wiredep(config.wiredep))
    .pipe(gulp.dest(paths.tmp + '/serve'));
}


module.exports = {
  injectBower: injectBower
};
