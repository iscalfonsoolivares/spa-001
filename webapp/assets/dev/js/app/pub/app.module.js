(function() {
  
  'use strict';
  
  angular
      .module('app', ['ngRoute'])
      .config(function($routeProvider) {
        $routeProvider

            // route for the home page
            .when('/', {
                templateUrl : 'assets/dev/js/app/pub/hello/hello.html',
                controller  : 'HelloController'
            })

            // route for the about page
            .when('/about', {
                templateUrl : 'assets/dev/js/app/pub/hello/hello.html',
                controller  : 'HelloController'
            })

            // route for the contact page
            .when('/contact', {
                templateUrl : 'assets/dev/js/app/pub/hello/hello.html',
                controller  : 'HelloController'
            });
    });
   
})();  