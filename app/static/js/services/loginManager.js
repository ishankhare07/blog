angular.module('myApp')
    .factory('loginManager', function($location, $mdToast) {
        this.logged_in = false
        self = this;

        this.getLoggedIn = function() {
            return self.logged_in;
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
