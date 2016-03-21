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
