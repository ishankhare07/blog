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
