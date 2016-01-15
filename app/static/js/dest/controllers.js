angular.module('myApp').controller('loginController', function($http, $mdToast, loginManager) {
    var self = this;

    this.submitLogin = function() {
        $http.post('/api/login', {
            "username": self.email,
            "password": self.passwd
        }).then(function(response) {
            data = response.data;
            if (data.status == 'login success') {
                $mdToast.showSimple('Login Successfull');

                loginManager.setLoggedIn(true);
                loginManager.api_token = data.api_token;
                data.email = self.email;

                loginManager.storeCredentials(data);

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

angular.module('myApp').controller('profileController', function($location, loginManager) {
    if(!loginManager.getLoggedIn()) {
        $location.path('/')
    }
    this.lm = loginManager;
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
