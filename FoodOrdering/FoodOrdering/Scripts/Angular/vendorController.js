var VendorTopModule = angular.module('VendorDashboardTop', ['ui.router', 'ngCookies']);
// angular route configs
VendorTopModule.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

    $stateProvider.state('AddProductState', {
        url: '/',
        templateUrl: '/addProduct.html',
        controller: 'AddProductController'
    });

    $stateProvider.state('RemoveProductState', {
        url: '/removeProduct',
        templateUrl: '/removeProduct.html',
        controller: 'RemoveProductController'
    });

    $stateProvider.state('PasswordState', {
        url: '/changePassword',
        templateUrl: '/changePassword.html',
        controller: 'PasswordController'
    });

    $urlRouterProvider.otherwise('/');

}]);

// for removing hash bangs
VendorTopModule.config(['$locationProvider', function ($locationProvider) {
    $locationProvider.hashPrefix('');
}]);

// defining controllers as per different routes
VendorTopModule.controller('VendorDashboardController', function ($scope, $window, $cookieStore) {
    $scope.getVendorId = localStorage.getItem("VendorId");
    $scope.Logout = function () {
        localStorage.removeItem("VendorId");
        $window.location.href = '/';
    };
});

VendorTopModule.controller('AddProductController', function ($scope, $http) {
    $scope.categories = ["Beverages", "Snacks", "Drinks"];
    $scope.p = {};
    $scope.AddProduct = function () {
        $http({
            method: 'POST',
            url: '/api/ProductsApi/PostProduct',
            data: JSON.stringify($scope.p),
            headers: { 'content-type': 'application/json' }
        }).then(function (success) {
            alert("Product added successfully :)");
        }, function (error) {
            alert("Error !! Product can't be added ");
        });
    }
});

VendorTopModule.controller('RemoveProductController', function ($scope, $http) {
    $scope.RemoveProduct = function () {
        console.log($scope.ProductId);
        var obj = {
            ProductId: $scope.ProductId
        };
        $http({
            method: 'POST',
            url: '/Home/DeleteProduct',
            data: JSON.stringify(obj),
            headers: { 'content-type': 'application/json' }
        }).then(function successCallback(response) {
            console.log(response.data);
            alert("Product deleted successfully :)");
            }, function errorCallback(response) {
                console.log(response.data);
            alert("Error !! Product can't be deleted");
        });
    }
});

VendorTopModule.controller('PasswordController', function ($scope, $http, $window, $cookieStore) {
    $scope.passwordChanged = false;
    $scope.changePassword = function () {
        var dataObj = {
            VendorId: localStorage.getItem("VendorId"),
            Password: $scope.newPassword,
            Name: null,
            Email: null,
            Address: null,
            Contact: null
        };
        $http({
            method: 'POST',
            url: '/Home/VendorPassword',
            data: JSON.stringify(dataObj),
            headers: { 'content-type': 'application/json' }
        }).then(function successCallback(response) {
            $scope.passwordStatus = response.data;
            $scope.passwordChanged = true;
        }, function errorCallback(response) {
            console.log(response.data);
        });
    }
});