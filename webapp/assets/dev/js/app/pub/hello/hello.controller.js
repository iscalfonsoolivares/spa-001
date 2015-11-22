(function() {
  
  'use strict';

  angular
      .module('app')
      .controller('HelloController', HelloController);
  
  HelloController.$inject = ['$scope'];

  function HelloController($scope) {
    var vm = this;
    $scope.name = "calvin hobbes";
  }
  
})();    
