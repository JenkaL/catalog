'use strict';

var path = require('path');
var conf = require('./gulp/conf');

var _ = require('lodash');
var wiredep = require('wiredep');

function listFiles() {
  var wiredepOptions = _.extend({}, conf.wiredep, {
    dependencies: true,
    devDependencies: true
  });

  return wiredep(wiredepOptions).js
    .concat([
      path.join(conf.paths.tmp, '/serve/app/index.js'),
      path.join(conf.paths.tmp, '/serve/app/partials/templateCacheHtml.js'),
      path.join(conf.paths.src, '/**/*.mock.js'),
      //path.join(conf.paths.src, '/app/components/navigation/tests/navigation.collection.interface.spec.js'),
      path.join(conf.paths.src, '/**/*.spec.js'),
      path.join(conf.paths.src, '/**/*.html')
    ]);
}

module.exports = function(config) {

  var configuration = {
    files: listFiles(),

    singleRun: true,

    autoWatch: false,

    frameworks: ['jasmine'],

    ngHtml2JsPreprocessor: {
      stripPrefix: 'src/',
      moduleName: 'mretailerDesktop'
    },

    plugins : [
      'ng-html2js',
      'karma-phantomjs-launcher',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-safari-launcher',
      //'karma-opera-launcher',
      'karma-ie-launcher',
      'karma-jasmine',
      'karma-ng-html2js-preprocessor'
    ],

    preprocessors: {
      'src/**/*.html': ['ng-html2js']
    }//,

    //reporters: ['coverage']
  };

  if (configuration.autoWatch) {
    configuration.browsers = [
      'PhantomJS',
      'Chrome'
    ];
  } else {
    configuration.browsers = [
      'PhantomJS' //,
      //'Chrome',
      //'FireFox',
      //'Safari',
      ////'Opera',
      //'IE'
    ];
  }

  // This block is needed to execute Chrome on Travis
  // If you ever plan to use Chrome and Travis, you can keep it
  // If not, you can safely remove it
  // https://github.com/karma-runner/karma/issues/1144#issuecomment-53633076
  if(configuration.browsers[0] === 'Chrome' && process.env.TRAVIS) {
    configuration.customLaunchers = {
      'chrome-travis-ci': {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    };
    configuration.browsers = ['chrome-travis-ci'];
  }

  config.set(configuration);
};
