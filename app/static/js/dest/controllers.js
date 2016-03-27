angular.module('myApp').controller('editProfileController', function(userInfoService, $location) {
    userInfoService.initInfo();
    this.UIS = userInfoService;

    var self = this;

    this.cancelUpdate = function() {
        // reset updated model
        self.UIS.initInfo();

        // navigate to /profile
        $location.path('/profile');
    };

    this.update = function() {
        self.UIS.updateInfo();
    }
});

angular.module('myApp').controller('loginController', function($http, $mdToast, $rootScope, loginManager) {
    var self = this;

    this.submitLogin = function() {
        $http.post('/api/login', {
            "email": self.email,
            "password": self.passwd
        }).then(function(response) {
            data = response.data;
            if (data.status == 'login success') {
                $mdToast.showSimple('Login Successfull');

                loginManager.setLoggedIn(true);
                loginManager.api_token = data.api_token;
                data.passwd = self.passwd;

                loginManager.storeCredentials(data);

                // for hiding the dialog
                $rootScope.$broadcast('login-success');

            } else if (data['error'].search("not exists") > -1) {
                // email does not exists
                $mdToast.showSimple(data.error);
            } else {
                // password mismatch
                $mdToast.showSimple(data.error);
            }
        }, function(err) {
            console.log(err);
        });
    }
});

angular.module('myApp').controller('mainPageController', function($location, loginManager, $mdSidenav) {
    var self = this;
    this.gotoLogin = function(ev) {
        loginManager.presentLogin(ev);
    }

    this.leftNav = function() {
        $mdSidenav('leftSidenav').toggle();
    };

    this.navigate = function(url) {
        $mdSidenav('leftSidenav').close();         // auto-close sidenav after click if open
        $location.path(url);
    };

    this.lm = loginManager;
});

angular.module('myApp').controller('profileController', function($location, loginManager, userInfoService) {
    if(!loginManager.getLoggedIn()) {
        $location.path('/');
    }

    if(!userInfoService.has_info) {
        // if info does not exists, ask for it first
        userInfoService.initInfo();
    }

    this.UIS    = userInfoService;

    this.edit = function() {
        $location.path('/profile/edit');
    }
});

angular.module('myApp').controller('signupController', function($http, $mdToast) {
    var self = this;
    this.unique_email = true;

    this.checkIfEmailExists = function() {
        $http.post('/api/checkExistingEmail', {
            "username": self.email
        }).then(function(response) {
            data = response.data;
            if (data.is_unique) {
                self.unique_email = true;
                self.email = data.username;
            } else {
                self.unique_email = false;
                self.email = data.username;
            }
        }, function(err) {
            console.log(err);
        });
    }

    this.matchPasswd = function() {
        if (self.passwd == undefined) {
            return false;
        } else if (self.passwd == self.repass) {
            return true;
        } else {
            return false;
        }
    }

    this.signup = function() {
        if (!self.unique_email) {
            $mdToast.showSimple('Email already registered!');
        } else if (self.passwd != self.repass) {
            $mdToast.showSimple('Passwords do not match!');
        } else {
            $http.post('/api/signup', {
                'firstname': self.firstname,
                'lastname': self.lastname,
                'username': self.email,
                'password': self.passwd
            }).then(function(response) {
                data = response.data;
                $mdToast.showSimple('Signup successfull');

                loginManager.setLoggedIn(true);
                loginManager.api_token = data.api_token;
                loginManager.email = self.email;

            }, function(err) {
                console.log(err);
            });
        }
    }
});
