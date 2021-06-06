myApp.controller('deliveryPointController', function ($scope, $stateParams, $rootScope, subscriberService, cityService, $cordovaCamera) {
    $scope.message = "";
    $scope.details = "";
    $scope.passwordExpired = $stateParams.passwordExpired;
    $scope.Subscriber = {}
    $rootScope.showMenu = true;


    $scope.cities = [];
    $scope.SelectedCity = false;

    $scope.onItemSelected = function (city) {
        $scope.Subscriber.City = null;
        $scope.SelectedCity = true;
        $scope.Subscriber.City = city.CityName;
    }


    $scope.searchForCity = function ($event) {
        $scope.SelectedCity = false;
        console.log('event', $event.target.value);
        searchPhrase = $event.target.value;

        if (searchPhrase.length > 1) {
            cityService.getCities(searchPhrase).then(
                function (data) {
                    $scope.cities = data;
                }, function (err) {

                })
        }

    }
    $scope.createDeliveryPoint = function () {
      
        $scope.details = "";
        console.log($scope.Subscriber);
        subscriberService.createDeliveryPoint($scope.Subscriber).then(
            function (data) {
                $scope.Subscriber.SubscriberId = data.SubscriberId;
                $scope.message = "נקודה הוקמה בהצלחה";

            },
            function (data) {
                $scope.message = " אירעה שגיאה"
                $scope.details = data;
            });
    }

    $scope.newDeliveryPoint = function () {

        $scope.Subscriber = {
            SubscriberId: '',
            FirstName: '', // שם העסק
            LastName: '', // שם איש הקשר
            Phone1: '',
            Phone2: '',
            Email: '',
            StreetName: '',
            StreetNumber: '',
            Entrance: '',
            City: '',
            Zip: '',
            PoBox: '',
            Coordinates: '',
            ClientAccountId: '', // ח.פ.
            IsActive: false,
            State: 'ישראל',
            ImageData: '',
            OpeningHours: '',
            CoordinatesStringify: ''
        }
    }

    $scope.newDeliveryPoint();


    $scope.takeCommentPicture = function () {

        try {


            var options = {
                quality: 75,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,
                allowEdit: false,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 250,
                targetHeight: 250,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false
            };



            $cordovaCamera.getPicture(options).then(function (imageData) {
                $scope.Subscriber.ImageData = "data:image/jpeg;base64," + imageData;

                var confirmPopup = $ionicPopup.show({
                    title: "צילום חוזה",
                    cssClass: 'full-size',

                    template: '<div class="list card"><div class="item item-image"><img ng-src="' + $scope.commentImgURI + '"></div></div>',
                    scope: $scope,
                    buttons: [
                        {
                            text: $filter('i18n')("cancel")
                        },
                        {
                            text: $filter('i18n')("retakepicture"),
                            type: 'button-positive',
                            onTap: function (e) {
                                return 'retakepicture';
                            }
                        },
                        {
                            text: $filter('i18n')("continue"),
                            type: 'button-positive margin-right-5',
                            onTap: function (e) {
                                if ($scope.Subscriber.ImageData == 'http://placehold.it/300x300') {
                                    //don't allow the user to close unless user takes picture
                                    e.preventDefault();
                                } else {
                                    return $scope.Subscriber.ImageData;
                                }
                            }
                        }
                    ]
                });
                confirmPopup.then(function (res) {
                    if (res) {
                        if (res == 'retakepicture') {
                            takeCommentPicture();
                        }
                        else {
                            //$scope.deliverWithImageAndGetNextItem();
                            //alert('save comment with image');
                            //addCommentInDB(res);
                        }
                    }
                });

            }, function (err) {
                // error
                alert(err);
                console.log(err);
            });
        } catch (error) {
            $scope.message = " צילום נכשל "
        }


    }


});






