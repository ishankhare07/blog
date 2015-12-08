angular.module('myApp').controller('welcomeController', function($window, loginManager) {
    if (!loginManager.logged_in) {
        console.log('redirecting')
        //window.location.href = '/login';
    }
    console.log(loginManager.api_token, loginManager.email);
    this.key = loginManager.api_token;
    this.username = loginManager.email;
})
