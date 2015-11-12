'use strict';
App
    .factory('Config', ['$rootScope',function () {
        var factory = {
            getDomainUrl : function () {
                return 'http://minutrade.herokuapp.com';
                //return 'http://localhost:1313';
            },
            getApiUrl : function () {
                return this.getDomainUrl() + '/api';
            }
        };
        return factory;
    }]);