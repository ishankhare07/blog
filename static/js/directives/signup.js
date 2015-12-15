angular.module('myApp')
    .directive('signup', function() {
        return {
            restrict: 'A',
            templateUrl: 'static/templates/signup-tab.tpl.html',
        };
    });
