﻿myApp.controller('menuController', function ($scope, $state, $rootScope, notificationService, userService, $ionicViewService) {

    $rootScope.showMenu = true;

    $scope.signout = function () {

        userService.signout();
        //localStorage["username"] = "";
        $ionicViewService.nextViewOptions({
            disableBack: true
        });
        $scope.isSignedIn = false;
        $state.go('app.signin', { signout: true });
    };

})
