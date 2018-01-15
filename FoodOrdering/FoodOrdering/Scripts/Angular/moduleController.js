var LoginModule = angular.module('LoginPage', []);

LoginModule.controller('LoginController', function ($scope, $http) {
    $scope.regexUsername = "^[a-zA-Z0-9]*$";
    $scope.regexPassword = "^[a-zA-Z0-9]*$";
    $scope.regexName = "^[A-Za-z ]+$";
    $scope.regexContact = "^[0-9]*$";
    $scope.Login = function () {
        
    }
});


LoginModule.controller('RegisterController', function ($scope, $http) {
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
            url: '/api/ClientsApi',
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
});