angular.module('myApp').controller('editProfileController', function(userInfoService, $location) {
    userInfoService.initInfo();
    this.UIS = userInfoService;

    var self = this;

    this.cancelUpdate = function() {
        // reset updated model
        self.UIS.initInfo();

        // navigate to /profile
        $location.path('/profile');
    };

    this.update = function() {
        self.UIS.updateInfo();
    }
});
