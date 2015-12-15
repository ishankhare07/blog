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
                loginManager.logged_in = true;
                loginManager.api_token = data.api_token;
                loginManager.email = self.email;
            } else if (data['auth_failure'].search("not exists") > -1) {
                // email does not exists
                $mdToast.showSimple(data.auth_failure);
            } else {
                // password mismatch
                $mdToast.showSimple(data.auth_failure);
            }
        }, function(err) {
            console.log(err);
        });
    }
});

angular.module('myApp').controller('signupController', function($http, $mdToast) {
    var self = this;
    this.unique_email = true;

    this.checkIfEmailExists = function() {
        $http.post('/api/signup', {
            "check_existing": true,
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
            }, function(err) {
                console.log(err);
            });
        }
    }
});

angular.module('myApp').controller('welcomeController', function($location, loginManager) {
    console.log(loginManager.api_token, loginManager.email);
    if (!loginManager.logged_in) {
        console.log('redirecting')
        $location.path('/login');
    }
    this.key = loginManager.api_token;
    this.username = loginManager.email;
});
