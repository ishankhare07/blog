angular.module('myApp')
    .factory('loginManager', function($injector, $http, $mdMedia, $mdDialog, $location, $mdToast, localStorageService) {
        this.logged_in = false
        var self = this;

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

        this.getNewToken = function() {
            var credentials = JSON.parse(localStorageService.get('credentials'));
            $http.post('/api/login', {
                'email': credentials.email,
                'password': credentials.passwd
            }).then(function(reponse) {
                self.api_token = reponse.data.api_token;

                // update with new api_token
                credentials.api_token = self.api_token;

                // update localstorage with new data
                localStorageService.set('credentials', JSON.stringify(credentials));

                // update credentials inside the loginmanager itself
                self.credentials = credentials;

                // ask userInfoService to update info with new api_key
                $injector.get('userInfoService').initInfo();

            }, function(err) {
                console.log(err);
            });
        };

        return this;
    });
