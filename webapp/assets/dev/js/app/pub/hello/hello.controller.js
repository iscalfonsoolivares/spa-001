(function() {
  
  'use strict';

  angular
      .module('hello')
      .controller('HelloController', HelloController);

  function HelloController() {
    var vm = this;
    vm.name = "calvin hobbes";
    vm.address = "unknown";
  }
  
})();    
