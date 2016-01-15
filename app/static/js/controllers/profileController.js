angular.module('myApp').controller('profileController', function($location, loginManager) {
    if(!loginManager.getLoggedIn()) {
        $location.path('/')
    }
    this.lm = loginManager;
});
