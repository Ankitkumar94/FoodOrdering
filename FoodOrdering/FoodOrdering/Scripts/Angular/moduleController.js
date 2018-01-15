var LoginModule = angular.module('LoginPage', []);

LoginModule.controller('LoginController', function ($scope, $http, LoginService) {
    $scope.regexUsername = "^[a-zA-Z0-9]*$";
    $scope.regexPassword = "^[a-zA-Z0-9]*$";
    $scope.regexName = "^[a-zA-Z]*$";
    $scope.regexContact = "^[0-9]*$";
    $scope.login = function (form) {
        return $http({
            method: 'POST',
            url: '/Home/UserLogin',
            data: JSON.stringify(form),
            headers: { 'content-type': 'application/json' }
        }).success(function (data, status, headers, config) {

        }).error(function (data, status, headers, config) {

        });
    }
});


LoginModule.controller('RegisterController', function ($scope, $http) {
    $scope.regexUsername = "^[a-zA-Z0-9]*$";
    $scope.regexPassword = "^[a-zA-Z0-9]*$";
    $scope.regexName = "^[a-zA-Z]*$";
    $scope.regexContact = "^[0-9]*$";
    $scope.IsMatch = false;
    $scope.register = function (form) {
        return $http({
            method: 'POST',
            url: '/Home/UserRegister',
            data: JSON.stringify(form),
            headers: { 'content-type': 'application/json' }
        }).success(function (data, status, headers, config) {

        }).error(function (data, status, headers, config) {

        });
    }
    $scope.passwordEquality = function () {
        if ($scope.RegisterPassword != $scope.ConfirmPassword) {
            $scope.IsMatch = true;
        }
        else  $scope.IsMatch = false;
    }
});