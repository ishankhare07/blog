angular.module('myApp')
    .factory('loginManager', function($mdMedia, $mdDialog, $location, $mdToast, localStorageService) {
        this.logged_in = false
        self = this;

        this.getLoggedIn = function() {
            var credentials = localStorageService.get('credentials');

            if (credentials) {
                credentials = JSON.parse(credentials);
                self.credentials = credentials;
                self.logged_in = true;
            }

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

            // listening for login success from loginController
            $scope.$on('login-success', function() {
                $mdDialog.hide();
            });

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
                //$mdDialog.hide();
            } else {
                // logged out
                self.logged_in = false;
                $location.path('/');
            }
        };

        this.storeCredentials = function(credentials) {
            localStorageService.set('credentials', JSON.stringify(credentials));
        }

        this.logout = function() {
            self.setLoggedIn(false);
            self.api_token = null;
            localStorageService.clearAll();
        }

        return this;
    });
