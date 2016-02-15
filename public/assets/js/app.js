/*
SPA-001 Ver. 0.0.7
Angular front end template

Full source at https://github.com/iscalfonsoolivares/spa-001
 
* http://www.iscalfonsoolivares.com 
* https://github.com/iscalfonsoolivares
 
MIT License, https://github.com/iscalfonsoolivares/spa-001/blob/master/LICENSE
*/

!function(){"use strict";function o(o){o.when("/",{templateUrl:"assets/js/app/hello/hello.html",controller:"HelloController",controllerAs:"vm"}).when("/about",{templateUrl:"assets/js/app/hello/hello.html",controller:"HelloController",controllerAs:"vm"}).when("/contact",{templateUrl:"assets/js/app/hello/hello.html",controller:"HelloController",controllerAs:"vm"})}function e(o,e){var l="qa.jipow.com",t="jipow.com",r="UA-XXXXXXX-1",a="UA-XXXXXXX-2";switch(e.host()){case l:ga("create",r,"auto");break;case t:ga("create",a,"auto")}o.$on("$viewContentLoaded",function(o,r,a){switch(e.host()){case l:case t:ga("send","pageview",e.url())}})}o.$inject=["$routeProvider"],angular.module("hello",[]),angular.module("app",["ngRoute","hello"]).config(o).run(e),e.$inject=["$rootScope","$location"]}();
!function(){"use strict";function n(n){function o(){l()}function e(n){console.log(n),t.data=n}function l(){n.getData().then(function(n){e(n)})}var t=this;t.name="calvin hobbes rules",t.address="unknown",o()}n.$inject=["HelloService"],angular.module("hello").controller("HelloController",n)}();
!function(){"use strict";function e(){return{template:"Name: {{vm.name}} Address: {{vm.address}}"}}angular.module("hello").directive("helloTag",e)}();
!function(){"use strict";function e(e,t){function a(){var t=e({method:"get",url:"assets/js/app/hello/hello.data.json",params:{action:"get"}});return t.then(n,r)}function n(e){return e.data}function r(e){return angular.isObject(e.data)&&e.data.message?t.reject(e.data.message):t.reject("An unknown error occurred.")}return{getData:a}}angular.module("hello").service("HelloService",e),e.$inject=["$http","$q"]}();