/**
 * Created by Gustavo on 11/11/2015.
 */

App.factory('CustomerService', function(Gateway) {
    var service = {
        save: function(obj){
            return Gateway.post('/customer/save', obj);
        },
        update: function(obj){
            return Gateway.post('/customer/update', obj);
        },
        delete: function(id){
            return Gateway.delete('/customer/' + id);
        },
        list: function(){
            return Gateway.get('/customer');
        },
        findOne: function(id){
            return Gateway.get('/customer/' + id);
        }
    };
    return service;
});
