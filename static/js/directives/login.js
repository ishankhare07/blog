angular.module('myApp')
    .directive('login', function() {
        return {
            restrict: 'A',
            templateUrl: 'static/templates/login-tab.tpl.html',
        };
    });
