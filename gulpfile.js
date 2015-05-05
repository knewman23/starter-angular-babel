'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var wrench = require('wrench');

var options = {
  appName: 'starterAngularBabel',
  errorHandler: function(title) {
    return function(err) {
      gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
      this.emit('end');
    };
  },
  wiredep: {
    directory: 'bower_components',
    // exclude jquery because we don't want to include it unless we actually need it
    // exclude bootstrap-sass javascript because we don't want jquery unless we actually need it, and we have angular-bootstrap for native components
    exclude: [/jquery/, /bootstrap-sass\/.*\.js/]
  }
};

var paths = {
  src: 'src',
  styles: 'src/styles',
  images: 'src/images',
  fonts: 'src/fonts',
  tmp: '.tmp',
  tmpTemplates: '.tmp/templates',
  tmpStyles: '.tmp/styles',
  tmpServe: '.tmp/serve',
  tmpDist: '.tmp/dist',
  tmpDistScripts: '.tmp/dist/scripts',
  tmpDistStyles: '.tmp/dist/styles',
  tmpDistImages: '.tmp/dist/images',
  tmpDistFonts: '.tmp/dist/fonts',
  dist: 'dist',
  e2e: 'e2e',
  // generator templates
  templates: 'templates'
};

wrench.readdirSyncRecursive('./gulp').filter(function(file) {
  return (/\.(js)$/i).test(file);
}).map(function(file) {
  require('./gulp/' + file)(options, paths);
});

gulp.task('default', ['clean'], function () {
    gulp.start('build');
});
