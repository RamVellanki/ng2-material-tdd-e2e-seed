/*global jasmine, __karma__, window*/
Error.stackTraceLimit = Infinity;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;

__karma__.loaded = function () {
};


function isJsFile(path) {
  return path.slice(-3) == '.js';
}

function isSpecFile(path) {
  return path.slice(-8) == '.spec.js';
}

function isBuiltFile(path) {
  var builtPath = '/base/dist/app';
  return isJsFile(path) && (path.substr(0, builtPath.length) == builtPath);
}

var allSpecFiles = Object.keys(window.__karma__.files)
  .filter(isSpecFile)
  .filter(isBuiltFile);

// Load our SystemJS configuration.
System.config({
  baseURL: '/base'
});

System.config(
  {
    map: {
      'rxjs': 'node_modules/rxjs',
      '@angular': 'node_modules/@angular',
      '@angular2-material': 'node_modules/@angular2-material',
      'app': 'dist'
    },
    packages: {
      'app': {
        main: 'main.js',
        defaultExtension: 'js'
      },
      '@angular/core': {
        main: 'index.js',
        defaultExtension: 'js'
      },
      '@angular/compiler': {
        main: 'index.js',
        defaultExtension: 'js'
      },
      '@angular/common': {
        main: 'index.js',
        defaultExtension: 'js'
      },
      '@angular/platform-browser': {
        main: 'index.js',
        defaultExtension: 'js'
      },
      '@angular/platform-browser-dynamic': {
        main: 'index.js',
        defaultExtension: 'js'
      },
      '@angular2-material/core': {
        format: 'cjs',
        defaultExtension: 'js',
        main: 'core.js'
      },
      '@angular2-material/button': {
        format: 'cjs',
        defaultExtension: 'js',
        main: 'button.js'
      },
      '@angular2-material/toolbar': {
        format: 'cjs',
        defaultExtension: 'js',
        main: 'toolbar.js'
      },
      '@angular2-material/input': {
        format: 'cjs',
        defaultExtension: 'js',
        main: 'input.js'
      },
      '@angular2-material/card': {
        format: 'cjs',
        defaultExtension: 'js',
        main: 'card.js'
      },
      'components/*': {
        format: 'register',
        defaultExtension: 'js'
      },
      'directives': {
        format: 'register',
        defaultExtension: 'js'
      },
      'core': {
        format: 'register',
        defaultExtension: 'js'
      },
      // '@angular/router-deprecated': {
      //   main: 'index.js',
      //   defaultExtension: 'js'
      // },
      '@angular/router': {
        main: 'index.js',
        defaultExtension: 'js'
      },
      'rxjs': {
        defaultExtension: 'js'
      }
    }
  });

Promise.all([
  System.import('@angular/core/testing'),
  System.import('@angular/platform-browser-dynamic/testing')
]).then(function (providers) {
  var testing = providers[0];
  var testingBrowser = providers[1];

  testing.setBaseTestProviders(testingBrowser.TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS,
    testingBrowser.TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS);
}).then(function () {
  // Finally, load all spec files.
  // This will run the tests directly.
  return Promise.all(
    allSpecFiles.map(function (moduleName) {
      return System.import(moduleName);
    }));
}).then(__karma__.start, __karma__.error);
