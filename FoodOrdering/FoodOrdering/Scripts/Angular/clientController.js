var TopModule = angular.module('DashboardTop', ['ui.router', 'ngCookies']);
// angular route configs
TopModule.config(['$stateProvider', '$urlRouterProvider',function ($stateProvider, $urlRouterProvider) {

    $stateProvider.state('Offers', {
        url: '/',
        templateUrl: '/offers.html',
        controller: 'OffersController'
    });

    $stateProvider.state('Beverages', {
        url: '/beverages',
        templateUrl: '/beverages.html',
        controller: 'CategoriesController'
    });

    $stateProvider.state('Snacks', {
        url: '/snacks',
        templateUrl: '/snacks.html',
        controller: 'CategoriesController'
    });

    $stateProvider.state('Drinks', {
        url: '/drinks',
        templateUrl: '/drinks.html',
        controller: 'CategoriesController'
    });

    $stateProvider.state('Cart', {
        url: '/cart',
        templateUrl: '/cart.html',
        controller: 'CartController'
    });

    $stateProvider.state('PasswordState', {
        url: '/changePassword',
        templateUrl: '/changePassword.html',
        controller: 'PasswordController'
    });

    $urlRouterProvider.otherwise('/');

}]);

// for removing hash bangs
TopModule.config(['$locationProvider', function ($locationProvider) {
    $locationProvider.hashPrefix('');
}]);

// defining controllers as per different routes
TopModule.controller('DashboardController', function ($scope, $window, $cookieStore) {
    $scope.getClientId = localStorage.getItem("ClientId");
    $scope.Logout = function () {
        localStorage.removeItem("ClientId");
        $window.location.href = '/';
    };
});

TopModule.controller('OffersController', function ($scope, $http, AddToCartService) {
    var _value = document.getElementById('x');
    var offers = {
        Offer: _value
    };
    $scope.responseOffers;
    $http({
        method: 'POST',
        data: JSON.stringify(offers),
        url: '/Products/GetOffers/',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function successCallBack(successResponse) {
        console.log(successResponse.data);
        $scope.responseOffers = successResponse.data;
    }), function errorCallBack(errorResponse) {
        console.log(errorResponse.data);
    };

    $scope.AddToCart = function (element) {
        $scope.id = element.currentTarget.value;
        AddToCartService.ADD($scope.id);
    };
});

TopModule.controller('CategoriesController', function ($scope, $http, AddToCartService) {
    var _value = document.getElementById('x').value;
    $scope.responseCategory;
    var productcategory = {
        Category: _value
    };
    $http({
        method: 'POST',
        data: JSON.stringify(productcategory),
        headers: { 'Content-Type': 'application/json' },
        url: "/Products/GetCategoryProduct/"
    }).then(function successCallBack(response) {
        console.log(response.data);
        $scope.responseCategory = response.data;
    }), function errorCallBack(errorResponse) {
        console.log(errorResponse.data);
    };

    console.log(_value);

    $scope.AddToCart = function (element) {
        $scope.id = element.currentTarget.value;
        AddToCartService.ADD($scope.id);
    };
});


TopModule.controller('CartController', function ($scope, $http, DeleteFromCartService) {
    $scope.responsecart;
    // $http.get('/Carts/GetCartData/')
    var obj = {
        ClientId: localStorage.getItem("ClientId")
    };
    $http({
        method: 'POST',
        url: '/Carts/GetCartData/',
        data: JSON.stringify(obj),
        headers: { 'content-type': 'application/json' }
    })
        .then(function successCallBack(response) {
            console.log(response.data);
            $scope.responsecart = response.data;
        }), function (errorResponse) {
            console.log(errorResponse.data);
        };
    $scope.DeleteProduct = function (element) {
        $scope.id = element.currentTarget.value;
        console.log($scope.id);
        DeleteFromCartService.Delete($scope.id);
    };
});

TopModule.controller('PasswordController', function ($scope, $http, $window, $cookieStore) {
    $scope.passwordChanged = false;
    $scope.changePassword = function () {
        var dataObj = {
            ClientId: localStorage.getItem("ClientId"),
            Password: $scope.newPassword,
            Name: null,
            Email: null,
            Address: null,
            Contact: null
        };
        $http({
            method: 'POST',
            url: '/Home/ClientPassword',
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



//SERVICES

//SERVICE: to add an element to the cart based on the passed product's id
TopModule.factory('AddToCartService', ['$http', function ($http) {
    var ADD = function (id) {
        console.log('clicked on ' + id);
        var prodId = {
            ClientId: localStorage.getItem("ClientId"),
            ProductId: id
        };
        console.log(prodId);
        $http({
            method: 'POST',
            url: '/api/CartsApi/PostCart',
            data: JSON.stringify(prodId),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function successCallBack(response) {
            console.log(response.data);
        }), function errorCallBack(errorResponse) {
            console.log(errorResponse);
        };
    };
    return {
        ADD: ADD
    };
}]);

//SERVICE: To delete a product from cart
TopModule.factory('DeleteFromCartService', ['$http', function ($http) {
    var Delete = function (Id) {
        var obj = {
            CartId: Id
        };
        $http({
            method: 'POST',
            data: JSON.stringify(obj),
            url: '/Carts/DeleteProductFromCart/',
            headers: { 'Content-Type': 'application/json' }
        }).then(function successCallBack(successResponse) {
            console.log(successResponse.data);
        }), function errorCallBack(errorResponse) {
            console.log(errorResponse.data);
        };
    }
    return {
        Delete: Delete
    };
}]);