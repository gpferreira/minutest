/**
 * Created by Gustavo on 10/11/2015.
 */

App.controller('CustomerCtrl', function($scope, $rootScope, $q, $stateParams, $mdDialog, Common, CustomerService){
    setCustomerEmpty();

    function loadFeature(){
        var defer = $q.defer();

        if (!Common.isEmpty($stateParams.id)){
            CustomerService.findOne($stateParams.id).then(function(response){
                $scope.mode = 'edit';
                $scope.customer = response.data;
                defer.resolve(response.data);
            });
        } else {
            $scope.mode = 'new';
            defer.resolve(true);
        }

        return defer.promise;
    }

    loadFeature().then(function(){
        Common.loading(false);
    });

    $scope.marital_status = [{description: 'Solteiro'},{description: 'Casado'},{description: 'Separado'},
        {description: 'Divorciado'},{description: 'Viúvo'}];

    $scope.login = function(){
        Common.goTo('login');
    };

    $scope.remove = function($event){
        $scope.showConfirm($event);
    };

    $scope.save = function(){
        var saveControl = true;

        angular.forEach($scope.customer, function(attribute){
            if(saveControl){
                if (Common.isEmpty(attribute)){
                    saveControl = false;
                    return Common.showMessage('Por favor, preencha todos os campos deste formulário.', 'warning');
                }
            }
        });

        if (saveControl){
            var message = '';

            if(!Common.isEmpty($stateParams.id)){
                CustomerService.update($scope.customer).then(function(response){
                    if(Common.isError(response)){
                        if (response.error.error.description == 'invalid_cpf')
                            return Common.showMessage('CPF inválido.', 'warning');
                        else
                            return Common.showMessage('Ocorreu um erro ao cadastrar o cliente.', 'warning');
                    }

                    Common.goTo('main');
                    return Common.showMessage('Cliente atualizado com sucesso!');
                });
            } else {
                CustomerService.save($scope.customer).then(function(response){
                    if(Common.isError(response)){
                        if (response.error.error.description == 'invalid_cpf')
                            return Common.showMessage('CPF inválido.', 'warning');
                        else
                            return Common.showMessage('Ocorreu um erro ao cadastrar o cliente.', 'warning');
                    }

                    setCustomerEmpty();
                    return Common.showMessage('Cliente cadastrado com sucesso!');
                });
            }


        }
    };

    $scope.showConfirm = function(ev) {
        var confirm = $mdDialog.confirm()
            .title('Deseja realmente excluir este cliente?')
            .content('Todos os dados relativos a este registro serão perdidos.')
            .targetEvent(ev)
            .ok('Sim')
            .cancel('Não');
        $mdDialog.show(confirm).then(function() {
            if(!Common.isEmpty($stateParams.id))
                CustomerService.delete($stateParams.id).then(function(response){
                    if(Common.isError(response))
                        return Common.showMessage('Ocorreu um erro ao excluir o cliente.', 'warning');

                    Common.goTo('main');
                    return Common.showMessage('Cliente excluído com sucesso!');
                });
        }, function() {
        });
    };

    function setCustomerEmpty(){
        $scope.customer = {
            name: '',
            email: '',
            cpf: '',
            marital_status: '',
            address: {
                street: '',
                number: '',
                neighborhood: '',
                city: ''
            },
            phone_numbers: [{
                id: 'num1',
                number: ''
            }]
        };
    }

    $scope.addNewNumber = function() {
        var newItemNo = $scope.customer.phone_numbers.length + 1;
        $scope.customer.phone_numbers.push({'id':'num' + newItemNo});
    };

    $scope.removeNumber = function() {
        var lastItem = $scope.customer.phone_numbers.length-1;
        $scope.customer.phone_numbers.splice(lastItem);
    };
});
