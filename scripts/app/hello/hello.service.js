(function() {

  'use strict';

  angular
    .module('hello')
    .service('HelloService', HelloService);

  HelloService.$inject = ['$http', '$q'];

  function HelloService($http, $q) {

    // Return public API.
    return({
      getData: getData
    });

    // I get all of the data in the remote json.
    function getData() {

      var request = $http({
        method: "get",
        url: "assets/js/app/hello/hello.data.json",
        params: {
          action: "get"
        }
      });

      return( request.then( handleSuccess, handleError ) );

    }

    // I transform the successful response, unwrapping the application data
    // from the API response payload.
    function handleSuccess( response ) {
      return( response.data );
    }

    // I transform the error response, unwrapping the application dta from
    // the API response payload.
    function handleError( response ) {

      // The API response from the server should be returned in a
      // nomralized format. However, if the request was not handled by the
      // server (or what not handles properly - ex. server error), then we
      // may have to normalize it on our end, as best we can.
      if ( ! angular.isObject( response.data ) || ! response.data.message) {
        return( $q.reject( "An unknown error occurred." ) );
      }

      // Otherwise, use expected error message.
      return( $q.reject( response.data.message ) );

    }

  }

})();