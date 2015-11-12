'use strict';

App.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
    $httpProvider.defaults.withCredentials = true;

    $urlRouterProvider.otherwise('/customer');

    $stateProvider
	    .state('logout', {
		    url: '/logout'
	    })
        .state('login', {
            url: '/login',
            templateUrl: 'app/features/login/loginView.html',
            controller: 'LoginCtrl'
        })
        .state('main', {
            url: '/main',
            templateUrl: 'app/features/main/mainView.html',
            controller: 'MainCtrl'
        })
        .state('rating', {
            url: '/rating',
            templateUrl: 'app/features/rating/ratingView.html',
            controller: 'RatingController'
        })
        .state('stats', {
            url: '/stats',
            templateUrl: 'app/features/stats/statsView.html',
            controller: 'StatsController'
        })
        .state('customer', {
            url: '/customer',
            templateUrl: 'app/features/customer/customerView.html',
            controller: 'CustomerCtrl'
        })
        .state('customer/edit', {
            url: '/customer/:id',
            templateUrl: 'app/features/customer/customerView.html',
            controller: 'CustomerCtrl'
        })
    ;
});

