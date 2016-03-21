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

angular.module('myApp').factory('tokenInterceptor', function($q, $injector) {
    return {
        'response': function(response) {
            var loginManager = $injector.get('loginManager');
            var data = response.data;
            if (data.auth_error === 'invalid token') {
                loginManager.logout();
            } else if (data.auth_error === 'token expired') {
                console.log('asking to fetch new token');
                loginManager.getNewToken();
            }
            return response;
        }
    }
});

angular.module('myApp').factory('userInfoService', function(loginManager, $http) {
    if(!loginManager.getLoggedIn()) {
        $location.path('/');
    }

    this.email      = loginManager.credentials.email;
    this.has_info   = false;

    var self = this;

    this.initInfo = function() {
        console.log(self.email, loginManager.credentials.api_token);
        $http.post('/api/get_user_details', {
            'api_token' : loginManager.credentials.api_token,
            'email'  : self.email
        }).then(function(response) {
            data = response.data;

            self.id             = data.id;
            self.email       = data.email;
            self.firstname      = data.firstname;
            self.lastname       = data.lastname;
            self.about_me       = data.about_me;
            self.last_seen      = data.last_seen;
            self.location       = data.location;
            self.member_since   = data.member_since;

            self.has_info       = true;

        }, function(err) {
            console.log(err.data);
        });
    };

    this.updateInfo = function() {

    };

    return this;
});
