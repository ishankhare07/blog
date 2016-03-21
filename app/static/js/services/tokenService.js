angular.module('myApp').factory('tokenInterceptor', function($q, $injector) {
    return {
        'response': function(response) {
            var loginManager = $injector.get('loginManager');
            var data = response.data;
            if (data.auth_error === 'invalid token') {
                loginManager.logout();
            } else if (data.auth_error === 'token expired') {
                console.log('asking to fetch new token');
                loginManager.getNewToken();
            }
            return response;
        }
    }
});
