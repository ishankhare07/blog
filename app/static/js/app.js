var app = angular.module('myApp',['ngMaterial', 'ngRoute']);

angular.module('myApp').config(function($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
        templateUrl: '/static/templates/welcome.tpl.html',
    });

    $locationProvider.html5Mode(true);
});

angular.module('myApp').controller('pageController', function(loginManager, $location) {

    this.gotoHome = function() {
        $location.path('/');
    };

    this.gotoLogin = function(ev) {
        loginManager.presentLogin(ev);
    }
})
