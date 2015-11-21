(function() {
  
  'use strict';

  angular
      .module('app')
      .controller('HelloController', HelloController);
  
  HelloController.$inject = ['$scope','$location'];

  function HelloController($scope, $location) {
    var vm = this;
    $scope.name = "calvin hobbes";
  }
  
})();    
