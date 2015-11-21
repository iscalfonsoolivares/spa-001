(function() {
  
  'use strict';
  
  angular
      .module('app', ['ngRoute'])
      .config(function($routeProvider) {
        $routeProvider

            // route for the home page
            .when('/', {
                templateUrl : 'assets/dev/js/pub/hello/hello.html',
                controller  : 'HelloController'
            })

            // route for the about page
            .when('/about', {
                templateUrl : 'assets/dev/js/pub/hello/hello.html',
                controller  : 'HelloController'
            })

            // route for the contact page
            .when('/contact', {
                templateUrl : 'assets/dev/js/pub/hello/hello.html',
                controller  : 'HelloController'
            });
    });
  
  

  /*
  angular
      .module('app', ['ngRoute'])  
      .config(['$routeProvider',
      function($routeProvider) {
        $routeProvider.
          when('/AddNewOrder', {
            templateUrl: 'templates/add_order.html',
            controller: 'AddOrderController'
        }).
          when('/ShowOrders', {
            templateUrl: 'templates/show_orders.html',
            controller: 'ShowOrdersController'
          }).
          otherwise({
            redirectTo: '/AddNewOrder'
          });
    }]);
  */  
  
})();  