
myApp.factory('cityService', function ($http, $q, $state, $rootScope, loaderService) {

  var _data={};

  var _getCities = function (searchPhrase) {

    var deferred = $q.defer();
    _data.loading = true

    var params={
      searchPhrase:searchPhrase
    }
    $http.get(globalParams.baseUrl + '/CityCatalog/GetAll', { params: params}).
    success(function (data, status, headers, config) {
      if (data && data.Results) {
        
        deferred.resolve(data.Results);
      }
      else {
        deferred.reject();
      }
      _data.loading = false;
      loaderService.hide();

    }).
    error(function (data, status, headers, config) {
      _data.loading = false;
      loaderService.hide();
      deferred.reject(status);

    });
  return deferred.promise;
  
  };

  return {
    getCities: _getCities,
  }
});
