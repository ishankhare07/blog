angular.module('myApp')
    .directive('login', function() {
        return {
            restrict: 'E',
            templateUrl: 'static/templates/login-tab.tpl.html',
        };
    });
