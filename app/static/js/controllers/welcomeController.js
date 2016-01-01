angular.module('myApp').controller('welcomeController', function($location, loginManager) {
    console.log(loginManager.api_token, loginManager.email);

    this.key = loginManager.api_token;
    this.email = loginManager.email;

    console.log(loginManager.api_token, loginManager.email);

    if (!loginManager.logged_in) {
        console.log('redirecting')
        $location.path('/login');
    }
});
