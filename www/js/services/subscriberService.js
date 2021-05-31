
myApp.factory('subscriberService', function ($http, $q, $state, $rootScope, loaderService, geolocation, $filter) {

  var _data={};

  var _createDeliveryPoint = function (deliveryPoint) {

    var deferred = $q.defer();
    _data.loading = true

    
    deliveryPoint.CoordinatesStringify=geolocation.stringifiedPosition();

    $http.post(globalParams.baseUrl + '/SubscribersAPI/Save', deliveryPoint).
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
    createDeliveryPoint: _createDeliveryPoint,
  }
});
