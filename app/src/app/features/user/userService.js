App.factory('UserService', function($http, Config, Gateway) {
    var service = {
        logon : function(obj){
            return Gateway.post('/logon/', obj);
        },
        logout : function(){
            return Gateway.post('/logout');
        }
    };
    return service;
});
