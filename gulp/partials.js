'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

gulp.task('partials', ['markups'], function () {
  return gulp.src([
    path.join(conf.paths.src, '/app/**/*.html')/*,
     path.join(conf.paths.tmp, '/serve/app/**/ //*.html')*/
  ])
    .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe($.angularTemplatecache('templateCacheHtml.js', {
      module: 'mretailerDesktop',
      root: 'app'
    }))
    .pipe($.ngAnnotate())
    .pipe(gulp.dest(conf.paths.tmp + '/serve/app/partials/'));
});
