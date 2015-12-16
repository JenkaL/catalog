'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')();

var wiredep = require('wiredep').stream;
var _ = require('lodash');

//var injectOptions = {
//  ignorePath: [conf.paths.src, path.join(conf.paths.tmp, '/serve')],
//  addRootSlash: false
//};
//
///**
// * inject css files
// */
//gulp.task('inject-style', ['styles'], function () {
//  var injectStyles = gulp.src([
//    path.join(conf.paths.tmp, '/serve/app/**/*.css')
//  ], { read: false });
//
//  return gulp.src(path.join(conf.paths.src, '/*.html'))
//    .pipe($.inject(injectStyles, injectOptions))
//    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve')));
//});

/**
 * inject js files
 */
gulp.task('inject', ['scripts', 'styles', 'partials'], function () {
  var injectScripts = gulp.src([
    path.join(conf.paths.tmp, '/serve/app/**/*.js'),
    path.join(conf.paths.tmp, '/serve/app/**/*.module.js'),
    path.join('!' + conf.paths.src, '/app/**/*.spec.js'),
    path.join('!' + conf.paths.src, '/app/**/*.mock.js')
  ], { read: false });

  var injectStyles = gulp.src([
    path.join(conf.paths.tmp, '/serve/app/**/*.css')
  ], { read: false });

  var injectOptions = {
    ignorePath: [conf.paths.src, path.join(conf.paths.tmp, '/serve')],
    addRootSlash: false
  };

  return gulp.src(path.join(conf.paths.src, '/*.html'))
    .pipe($.inject(injectStyles, injectOptions))
    .pipe($.inject(injectScripts, injectOptions))
    .pipe(wiredep(_.extend({}, conf.wiredep)))
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve')));
});

/**
 * inject template files
 */
//gulp.task('inject-partials', ['partials'], function () {
//  var partialsInjectFile = gulp.src(path.join(conf.paths.tmp, '/serve/app/partials/templateCacheHtml.js'), { read: false });
//  var partialsInjectOptions = {
//    starttag: '<!-- inject:partials -->',
//    ignorePath: path.join(conf.paths.tmp, '/serve/app/partials'),
//    addRootSlash: false
//  };
//
//  return gulp.src(path.join(conf.paths.tmp, '/serve/*.html'))
//    .pipe($.inject(partialsInjectFile, partialsInjectOptions))
//    .pipe(wiredep(_.extend({}, conf.wiredep)))
//    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve')));
//});
//
//gulp.task('inject', ['inject-script']);


