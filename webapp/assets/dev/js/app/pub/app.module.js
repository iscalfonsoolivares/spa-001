(function() {
  
  'use strict';
  
  angular
      .module('app', ['ngRoute','hello'])
      .config(config);
  
  function config($routeProvider) {
        $routeProvider

            // route for the home page
            .when('/', {
                templateUrl : 'assets/dev/js/app/pub/hello/hello.html',
                controller  : 'HelloController',
                controllerAs: 'vm'
            })

            // route for the about page
            .when('/about', {
                templateUrl : 'assets/dev/js/app/pub/hello/hello.html',
                controller  : 'HelloController',
                controllerAs: 'vm'
            })

            // route for the contact page
            .when('/contact', {
                templateUrl : 'assets/dev/js/app/pub/hello/hello.html',
                controller  : 'HelloController',
                controllerAs: 'vm'
            });
    }
   
})();  