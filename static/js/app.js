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

angular.module('myApp').config(function($routeProvider) {
    $routeProvider.when('/login', {
        templateUrl: 'static/templates/login.tpl.html',
        controller: 'loginController'
    })

    // .when('/', {
    //     templateUrl: '/static/templates/welcome.tpl.html',
    //     controller: 'welcomeController',
    //     controllerAs: 'wel'
    // })
});
