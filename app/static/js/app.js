var app = angular.module('myApp',['ngMaterial', 'ui.router', 'ngRoute']);

angular.module('myApp').config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');

    $stateProvider.state('profile', {
        url: '/profile',
        templateUrl: 'static/templates/profile.tpl.html',
        controller: 'profileController',
    });
});

angular.module('myApp').controller('pageController', function(loginManager) {
    this.gotoLogin = function(ev) {
        loginManager.presentLogin(ev);
    }

    this.lm = loginManager;
})
