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
                
                loginManager.setLoggedIn(true);
                loginManager.api_token = data.api_token;
                loginManager.email = self.email;

            }, function(err) {
                console.log(err);
            });
        }
    }
});
