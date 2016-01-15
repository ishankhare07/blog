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
