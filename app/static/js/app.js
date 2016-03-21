var app = angular.module('myApp',['ngMaterial', 'ui.router', 'ngRoute', 'LocalStorageModule']);

angular.module('myApp').config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');

    $stateProvider.state('profile', {
        url: '/profile',
        templateUrl: 'static/templates/profile.tpl.html',
        controller: 'profileController',
        controllerAs: 'pc',
    })

    .state('home', {
        url: '/',
        template: ''
    })

    .state('editProfile', {
        url: '/profile/edit',
        templateUrl: 'static/templates/editProfile.tpl.html',
        controller: 'editProfileController',
        controllerAs: 'editCtrl'
    })
    ;
});

angular.module('myApp').config(function(localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix('smallBlog');
})

.config(function($httpProvider) {
    $httpProvider.interceptors.push('tokenInterceptor');
});
