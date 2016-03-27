angular.module('myApp').controller('mainPageController', function($location, loginManager, $mdSidenav) {
    var self = this;
    this.gotoLogin = function(ev) {
        loginManager.presentLogin(ev);
    }

    this.leftNav = function() {
        $mdSidenav('leftSidenav').toggle();
    };

    this.navigate = function(url) {
        $mdSidenav('leftSidenav').close();         // auto-close sidenav after click if open
        $location.path(url);
    };

    this.lm = loginManager;
});
