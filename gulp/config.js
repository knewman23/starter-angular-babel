'use strict';

var $ = {
  util: require('gulp-util')
};


module.exports = {
  appName: 'starterAngularBabel',
  errorHandler: function(title) {
    return function(err) {
      $.util.log($.util.colors.red('[' + title + ']'), err.toString());
      this.emit('end');
    };
  },
  wiredep: {
    directory: 'bower_components',
    // exclude jquery because we don't want to include it unless we actually need it
    // exclude bootstrap-sass javascript because we don't want jquery unless we actually need it, and we have angular-bootstrap for native components
    exclude: [/jquery/, /bootstrap-sass\/.*\.js/]
  },
  paths: {
    src: 'src',
    styles: 'src/styles',
    fonts: 'src/fonts',
    tmp: '.tmp',
    tmpTemplates: '.tmp/templates',
    tmpStyles: '.tmp/styles',
    tmpServe: '.tmp/serve',
    tmpDist: '.tmp/dist',
    tmpDistScripts: '.tmp/dist/scripts',
    tmpDistStyles: '.tmp/dist/styles',
    dist: 'dist',
    e2e: 'e2e',
    // generator templates
    templates: 'templates'
  }
};
