var LoginModule = angular.module('LoginPage', ['ngCookies']);

// Login for both Client and Vendor
LoginModule.controller('LoginController', function ($scope, $http, $window, $cookieStore) {
    $scope.regexUsername = "^[a-zA-Z0-9]*$";
    $scope.regexPassword = "^[a-zA-Z0-9]*$";
    $scope.regexName = "^[A-Za-z ]+$";
    $scope.regexContact = "^[0-9]*$";
    $scope.showLoginMessage = false;

    $scope.onLoad = function () {
        if (localStorage.getItem("ClientId") != null) {
            $window.location.href = '/Main/ClientIndex';          
        }
        else if (localStorage.getItem("VendorId") != null) {
            $window.location.href = '/Main/VendorIndex';
        }
        else {
            $window.location.href = '/Home/Index1';
        }
    };

    $scope.Login = function () {
        if (!$scope.loginAsVendor) {
            var dataObj = {
                ClientId: $scope.ClientId,
                Password: $scope.Password,
                Name: null,
                Email: null,
                Address: null,
                Contact: null
            };
            console.log(JSON.stringify(dataObj));
            $http({
                method: 'POST',
                url: '/Home/ClientLogin',
                data: JSON.stringify(dataObj),
                headers: { 'content-type': 'application/json' }
            }).then(function successCallback(response) {
                localStorage.setItem("ClientId", response.data);
                $scope.loginMessage = response.data;
                $scope.showLoginMessage = true;
                $window.location.href = '/Main/ClientIndex';
            }, function errorCallback(response) {
                $scope.loginMessage = "Error !! Kindly check your credentials";
                $scope.showLoginMessage = true;
            });
        }
        else {
            var dataObj = {
                VendorId: $scope.ClientId,
                Password: $scope.Password,
                Name: null,
                Email: null,
                Address: null,
                Contact: null
            };
            console.log(JSON.stringify(dataObj));
            $http({
                method: 'POST',
                url: '/Home/VendorLogin',
                data: JSON.stringify(dataObj),
                headers: { 'content-type': 'application/json' }
            }).then(function successCallback(response) {
                localStorage.setItem("VendorId", response.data);
                $scope.loginMessage = response.data;
                $scope.showLoginMessage = true;
                $window.location.href = '/Main/VendorIndex';
            }, function errorCallback(response) {
                $scope.loginMessage = "Error !! Kindly check your credentials";
                $scope.showLoginMessage = true;
            });
        }
    }
});

// Register only for client
LoginModule.controller('RegisterController', function ($scope, $http, $cookieStore) {
    $scope.regexUsername = "^[a-zA-Z0-9]*$";
    $scope.regexPassword = "^[a-zA-Z0-9]*$";
    $scope.regexName = "^[A-Za-z ]+$";
    $scope.regexContact = "^[0-9]*$";
    $scope.IsMatch = false;

    $scope.register = {};
    $scope.Register = function () {
        console.log(JSON.stringify($scope.register));
        $http({
            method: 'POST',
            url: '/api/ClientsApi/PostClient',
            data: JSON.stringify($scope.register),
            headers: { 'content-type': 'application/json' }
        }).then(function (success) {
            alert("User successfully registered :)");
            $scope.register.length = 0;
            }, function (error) {
                alert("Error ! Register unsuccessful");
        });
    }
    $scope.passwordEquality = function () {
        if ($scope.register.Password != $scope.ConfirmPassword) {
            $scope.IsMatch = true;
        }
        else  $scope.IsMatch = false;
    }


    $scope.showUserNameMessage = false;
    $scope.userNameExists = function () {
        var username = { clientId: $scope.register.ClientId };
        $http({
            method: 'POST',
            url: '/Home/UserExists',
            data: JSON.stringify(username),
            headers: { 'content-type': 'application/json' }
        }).then(function successCallback(response) {
            $scope.userNameMessage = response.data;
            $scope.showUserNameMessage = true;
        }, function errorCallback(errorResponse) {
            $scope.userNameMessage = errorResponse.data;
            $scope.showUserNameMessage = true;
        });
    }

    $scope.showEmailExistsMessage = false;
    $scope.userEmailExists = function () {
        var userEmailData = { Email: $scope.register.Email };
        $http({
            method: 'POST',
            url: '/Home/EmailExists',
            data: JSON.stringify(userEmailData),
            headers: { 'content-type': 'application/json' }
        }).then(function successCallback(response) {
            $scope.showEmailExistsMessage = true;
            $scope.emailExistsMessage = response.data;
        }, function errorCallback(errorResponse) {
            $scope.showEmailExistsMessage = true;
            $scope.emailExistsMessage = errorResponse.data;
        });
    }

    //Function: To Clear username and email fields
    $scope.clearUserNameFields = function () {
        $scope.showUserNameMessage = "ng-value='False'";
        $scope.userNameMessage = null;
        $scope.register.ClientId = null;
    }

    $scope.clearEmailFields = function () {
        $scope.showEmailExistsMessage = "ng-value='False'";
        $scope.emailExistsMessage = null;
        $scope.register.Email = null;
    }
});