(function() {
  
  'use strict';

  angular
      .module('hello')
      .directive('helloTag', helloTag);
             
  function helloTag() {
    return {
      template: 'Name: {{vm.name}} Address: {{vm.address}}'
    };
  }           
  
})();  