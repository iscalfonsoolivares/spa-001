(function() {
  
  'use strict';
  
  angular
      .module('app', ['ngRoute', 'HelloController']);
  

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