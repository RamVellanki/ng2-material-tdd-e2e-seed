/*global jasmine */
var SpecReporter = require('jasmine-spec-reporter');
var config = require('./config/config.json');

exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    './e2e/*.e2e.ts'
  ],
  capabilities: {
    'browserName': 'chrome'
  },
  directConnect: true,
  baseUrl: 'http://'+config.deploy.host+':'+config.deploy.port+'/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function() {}
  },
  useAllAngular2AppRoots: true,
  beforeLaunch: function() {
    require('ts-node').register({
      project: 'e2e'
    });
  },
  onPrepare: function() {
    jasmine.getEnv().addReporter(new SpecReporter());
  }
};
