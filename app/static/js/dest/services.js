angular.module('myApp')
    .factory('loginManager', function($mdMedia, $mdDialog, $location, $mdToast) {
        this.logged_in = false
        self = this;

        this.getLoggedIn = function() {
            return self.logged_in;
        };

        this.presentLogin = function(ev) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
            $mdDialog.show({
                controller: self.DialogController,
                templateUrl: '/static/templates/login.tpl.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: useFullScreen,
                openFrom: '#loginButton',
                closeTo: '#loginButton'
            });
        };

        this.DialogController = function($scope, $mdDialog) {
            $scope.hide = function() {
                $mdDialog.hide();
            };

            $scope.cancel = function() {
                $mdDialog.cancel();
            };

            $scope.answer = function() {
                $mdDialog.hide(answer);
            };
        };

        this.setLoggedIn = function(state) {
            if (state == true) {
                // logged in
                self.logged_in = true;
                $location.path('/');
            } else {
                // logged out
                self.logged_in = false;
                self.reset_api_token();
                $location.path('/login');
            }
        };

        this.reset_api_token = function() {
            self.api_token = null;
        }

        return this;
    });
