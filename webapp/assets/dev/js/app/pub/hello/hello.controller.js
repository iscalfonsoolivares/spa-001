(function() {
  
  'use strict';

  angular
      .module('app')
      .controller('HelloController', HelloController);
  
  HelloController.$inject = ['$scope'];

  function HelloController($scope) {
    $scope.name = "calvin hobbes";
  }
  
})();    
