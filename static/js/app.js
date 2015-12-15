var app = angular.module('myApp',['ngMaterial', 'ngRoute']);

angular.module('myApp').config(function($routeProvider, $locationProvider) {
    $routeProvider.when('/login', {
        templateUrl: 'static/templates/login.tpl.html'
    })

    .when('/', {
        templateUrl: '/static/templates/welcome.tpl.html',
        controller: 'welcomeController',
        controllerAs: 'wel'
    });

    $locationProvider.html5Mode(true);
});

angular.module('myApp').controller('pageController', function($location) {

    this.gotoHome = function() {
        $location.path('/');
    };

    this.gotoLogin = function() {
        $location.path('/login');
    }
})
