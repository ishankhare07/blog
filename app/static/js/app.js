var app = angular.module('myApp',['ngMaterial', 'ui.router', 'ngRoute', 'LocalStorageModule']);

angular.module('myApp').config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');

    $stateProvider.state('home', {
        url: '/',
        template: ''
    })

    .state('profile', {
        abstract: true,
        url: '/profile',
        templateUrl: 'static/templates/profile.tpl.html'
    })

    .state('profile.view', {
        url: '/view',               // will be later changed to /profile/:id
        templateUrl: 'static/templates/profile-view.tpl.html',
        controller: 'profileController',
        controllerAs: 'pc'
    })

    .state('profile.edit', {
        url: '/edit',               // with above change this will become /profile/:id/edit
        templateUrl: 'static/templates/profile-edit.tpl.html',
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
