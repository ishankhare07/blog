angular.module('myApp').controller('profileController', function($location, loginManager, userInfoService) {
    if(!loginManager.getLoggedIn()) {
        $location.path('/');
    }

    if(!userInfoService.has_info) {
        // if info does not exists, ask for it first
        userInfoService.initInfo();
    }

    this.UIS    = userInfoService;

    this.edit = function() {
        $location.path('/profile/edit');
    }
});
