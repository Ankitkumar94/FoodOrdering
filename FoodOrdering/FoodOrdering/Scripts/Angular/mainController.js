var TopModule = angular.module('DashboardTop', ['ui.router']);
// angular route configs
TopModule.config(['$stateProvider', '$urlRouterProvider',function ($stateProvider, $urlRouterProvider) {

    $stateProvider.state('HomeState', {
        url: '/',
        templateUrl: 'Home/First',
        controller: 'HomeController'
    });

    $stateProvider.state('BlogState', {
        url: '/blog',
        templateUrl: 'Home/Blog',
        controller: 'BlogController'
    });

    $stateProvider.state('AboutState', {
        url: '/about',
        templateUrl: 'Home/About',
        controller: 'AboutController'
    });
    $urlRouterProvider.otherwise('/');

}]);

// for removing hash bangs
TopModule.config(['$locationProvider', function ($locationProvider) {
    $locationProvider.hashPrefix('');
}]);

// defining controllers as per different routes
TopModule.controller('HomeController', function ($scope) {
    $scope.message = 'Hello from HomeController';
});

TopModule.controller('BlogController', function ($scope) {
    $scope.message = 'Hello from BlogController';
});

TopModule.controller('AboutController', function ($scope) {
    $scope.message = 'Hello from AboutController';
});