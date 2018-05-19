// Karma configuration
// Generated on 2016-05-11

module.exports = function(config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '../',

    // testing framework to use (jasmine/mocha/qunit/...)
    // as well as any additional frameworks (requirejs/chai/sinon/...)
    frameworks: [
      'jasmine'
    ],

    // list of files / patterns to load in the browser
    files: [
      // bower:js
      'bower_components/jquery/dist/jquery.js',
      'bower_components/angular/angular.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-sanitize/angular-sanitize.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/angular-messages/angular-messages.js',
      'bower_components/angular-cookies/angular-cookies.js',
      'bower_components/bootstrap/dist/js/bootstrap.js',
      'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      'bower_components/angular-ui-router/release/angular-ui-router.js',
      'bower_components/satellizer/satellizer.js',
      'bower_components/angular-md5/angular-md5.js',
      'bower_components/angular-growl-v2/build/angular-growl.js',
      'bower_components/angular-google-places-autocomplete/src/autocomplete.js',
      'bower_components/angular-filter/dist/angular-filter.js',
      'bower_components/select2/select2.js',
      'bower_components/angular-ui-select2/src/select2.js',
      'bower_components/angular-http-auth/src/http-auth-interceptor.js',
      'bower_components/bootstrap-ui-datetime-picker/dist/datetime-picker.js',
      'bower_components/angular-recaptcha/release/angular-recaptcha.js',
      'bower_components/SHA-1/sha1.js',
      'bower_components/angulartics/src/angulartics.js',
      'bower_components/angulartics-google-analytics/lib/angulartics-ga.js',
      'bower_components/angular-translate/angular-translate.js',
      'bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
      'bower_components/angular-dynamic-locale/src/tmhDynamicLocale.js',
      'bower_components/angular-translate-handler-log/angular-translate-handler-log.js',
      'bower_components/angular-translate-storage-cookie/angular-translate-storage-cookie.js',
      'bower_components/angular-translate-storage-local/angular-translate-storage-local.js',
      'bower_components/ngmap/build/scripts/ng-map.js',
      'bower_components/angular-loading-bar/build/loading-bar.js',
      'bower_components/angular-payment/dist/angular-payment-tpls-0.3.0.js',
      'bower_components/jquery-ui/jquery-ui.js',
      'bower_components/angular-ui-sortable/sortable.js',
      'bower_components/jquery-mousewheel/jquery.mousewheel.js',
      'bower_components/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.js',
      'bower_components/ng-file-upload/ng-file-upload.js',
      'bower_components/ngInfiniteScroll/build/ng-infinite-scroll.js',
      'bower_components/ng-tags-input/ng-tags-input.js',
      'bower_components/classie/classie.js',
      'bower_components/eventie/eventie.js',
      'bower_components/doc-ready/doc-ready.js',
      'bower_components/eventEmitter/EventEmitter.js',
      'bower_components/matches-selector/matches-selector.js',
      'bower_components/fizzy-ui-utils/utils.js',
      'bower_components/get-style-property/get-style-property.js',
      'bower_components/get-size/get-size.js',
      'bower_components/unipointer/unipointer.js',
      'bower_components/tap-listener/tap-listener.js',
      'bower_components/unidragger/unidragger.js',
      'bower_components/flickity/js/index.js',
      'bower_components/angular-flickity/dist/angular-flickity.js',
      'bower_components/angular-scroll/angular-scroll.js',
      'bower_components/ng-parallax/angular-parallax.min.js',
      'bower_components/afkl-lazy-image/release/lazy-image.js',
      'bower_components/sweetalert/dist/sweetalert.min.js',
      'bower_components/angular-sweetalert/SweetAlert.js',
      'bower_components/angular-slugify/angular-slugify.js',
      'bower_components/checklist-model/checklist-model.js',
      'bower_components/lodash/dist/lodash.compat.js',
      'bower_components/angularjs-dropdown-multiselect/src/angularjs-dropdown-multiselect.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/angular-form-builder/dist/angular-form-builder.js',
      'bower_components/angular-form-builder/dist/angular-form-builder-components.js',
      'bower_components/angular-validator/dist/angular-validator.js',
      'bower_components/angular-validator/dist/angular-validator-rules.js',
      'bower_components/moment/moment.js',
      'bower_components/angular-moment/angular-moment.js',
      'bower_components/angular-ui-select/dist/select.js',
      // endbower
      'app/scripts/**/*.js',
      'test/mock/**/*.js',
      'test/spec/**/*.js'
    ],

    // list of files / patterns to exclude
    exclude: [
    ],

    // web server port
    port: 8080,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      'PhantomJS'
    ],

    // Which plugins to enable
    plugins: [
      'karma-phantomjs-launcher',
      'karma-coverage',
      'karma-jasmine'
    ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

	// coverage reporter generates the coverage
    reporters: ['progress', 'coverage'],

    preprocessors: {
      // source files, that you wanna generate coverage for
      // do not include tests or libraries
      // (these files will be instrumented by Istanbul)
      'app/scripts/**/*.js': ['coverage']
    },

	// optionally, configure the reporter
    coverageReporter: {
      dir: 'dist/coverage/',
	   reporters: [{
		  type: 'html',
		  subdir: 'reports'
	   }]
    }

    // Uncomment the following lines if you are using grunt's server to run the tests
    // proxies: {
    //   '/': 'http://localhost:9000/'
    // },
    // URL root prevent conflicts with the site root
    // urlRoot: '_karma_'
  });
};
