angular.module('myApp').controller('mainPageController', function(loginManager, $mdSidenav) {
    this.gotoLogin = function(ev) {
        loginManager.presentLogin(ev);
    }

    this.leftNav = function() {
        console.log('toggled');
        $mdSidenav('leftSidenav').toggle();
    };

    this.lm = loginManager;
});
