(function() {
  
  'use strict';

  angular
      .module('hello')
      .controller('HelloController', HelloController);
  
  //HelloController.$inject = ['HelloService'];  

  function HelloController(HelloService) {
    var vm = this;
    vm.name = "calvin hobbes rules";
    vm.address = "unknown";
    
    activate();

    function activate(){
      loadRemoteData();
    }

    // I apply the remote data to the local scope.
    function applyRemoteData( data ) {
      console.log(data);
      vm.data = data;
    }

    // I load the remote data from the server.
    function loadRemoteData() {
      // The HelloService returns a promise.
      HelloService.getData().then(
        function( data ) {
          applyRemoteData( data );
        }
      );
    }    
    
  }
  
})();    
