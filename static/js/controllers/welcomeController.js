angular.module('myApp').controller('welcomeController', function($location, loginManager) {
    console.log(loginManager.api_token, loginManager.email);
    if (!loginManager.logged_in) {
        console.log('redirecting')
        $location.path('/login');
    }
    this.key = loginManager.api_token;
    this.username = loginManager.email;
});
