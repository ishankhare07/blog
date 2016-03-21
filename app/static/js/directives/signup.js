angular.module('myApp')
    .directive('signup', function() {
        return {
            restrict: 'E',
            templateUrl: 'static/templates/signup-tab.tpl.html',
        };
    });
