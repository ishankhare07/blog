angular.module('myApp')
    .directive('login', function() {
        return {
            restrict: 'E',
            templateUrl: 'static/templates/login-tab.tpl.html',
        };
    });

angular.module('myApp')
    .directive('signup', function() {
        return {
            restrict: 'E',
            templateUrl: 'static/templates/signup-tab.tpl.html',
        };
    });
