'use strict';

var paths = require('./.yo-rc.json')['generator-gulp-angular'].props.paths;

// An example configuration file.
exports.config = {
  directConnect: true,

  //seleniumAddress: 'http://127.0.0.1:4444/wd/hub', //'http://localhost:4444/wd/hub',
  //seleniumServerJar: deprecated, this should be set on node_modules/protractor/config.json

  capabilities: {
    'browserName': 'chrome'
  },

  baseUrl: 'http://localhost:3000',

  specs: [paths.e2e + '/**/*.js'],

  framework: 'jasmine2',

  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  }
};
