'use strict';
var App = angular.module('App', ['ngCookies','ngSanitize','ui.router','ngAnimate', 'ngMaterial', 'ngAnimate']);

App.controller('AppCtrl', function($scope, $rootScope, $mdMedia, Common, UserService) {
    $rootScope.padding = '16';

    if ($mdMedia('gt-md')){
        $rootScope.padding = '32';
    }

    $rootScope.logout = function(){
        UserService.logout().then(function(){
            Common.goTo('customer');
        });
    };
});