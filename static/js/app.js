var app = angular.module('myApp',['ngMaterial', 'ngRoute']);

angular.module('myApp').controller('testController', function() {
    this.text = '';
});

angular.module('myApp')
    .directive('login', function() {
        return {
            restrict: 'A',
            templateUrl: 'static/templates/login-tab.tpl.html',
        };
    });

angular.module('myApp')
    .directive('signup', function() {
        return {
            restrict: 'A',
            templateUrl: 'static/templates/signup-tab.tpl.html',
        };
    });

angular.module('myApp')
    .factory('loginManager', function() {
        return {
            'logged_in': false
        };
    });

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
