/**
 * Created by Gustavo on 11/11/2015.
 */

App.controller('MainCtrl', function($scope, $rootScope, $q, CustomerService, Common){
    $scope.logout = function(){
        $rootScope.logout();
    };

    $scope.edit = function(id){
        Common.goTo('customer/edit', {id: id});
    };

    function loadFeature(){
        var defer = $q.defer();

        CustomerService.list().then(function(response){
            $scope.customers = response.data;

            defer.resolve(response.data);
        });

        return defer.promise;
    }

    loadFeature().then(function(){
        Common.loading(false);
    });
});