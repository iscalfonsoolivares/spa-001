(function() {
  
  'use strict';
  
  angular
      .module('hello', []);
  
  angular
      .module('app', ['ngRoute','hello'])
      .config(config)
      .run(run);
  
  function config($routeProvider) {
    $routeProvider

        // route for the home page
        .when('/', {
            templateUrl : 'assets/js/app/hello/hello.html',
            controller  : 'HelloController',
            controllerAs: 'vm'
        })

        // route for the about page
        .when('/about', {
            templateUrl : 'assets/js/app/hello/hello.html',
            controller  : 'HelloController',
            controllerAs: 'vm'
        })

        // route for the contact page
        .when('/contact', {
            templateUrl : 'assets/js/app/hello/hello.html',
            controller  : 'HelloController',
            controllerAs: 'vm'
        });
  }
  
  run.$inject = ['$rootScope', '$location'];

  function run($rootScope, $location){

    var SERVER_QA_NAME = "qa.jipow.com";
    var SERVER_PROD_NAME = "jipow.com";

    var GA_ID_QA = "UA-XXXXXXX-1";
    var GA_ID_PROD = "UA-XXXXXXX-2";

    switch( $location.host() ) {
      case SERVER_QA_NAME:
          ga('create', GA_ID_QA, 'auto');
        break;
      case SERVER_PROD_NAME:
          ga('create', GA_ID_PROD, 'auto');
        break;
    }

    $rootScope.$on('$viewContentLoaded', function(angularEvent, current, previous) {

      switch( $location.host() ) {
      case SERVER_QA_NAME:
      case SERVER_PROD_NAME:
          ga('send', 'pageview', $location.url());
        break;
      }

    });

  }
   
})();  