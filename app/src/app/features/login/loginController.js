App.controller('LoginCtrl', function($scope, $rootScope, $timeout, Common, UserService) {
    $scope.user = {
        email: '',
        password: ''
    };

    Common.loading(false);

    $scope.logon = function(){
        if (Common.isEmpty($scope.user.email))
            return Common.showMessage('Digite seu e-mail.', 'warning');

        if (Common.isEmpty($scope.user.password))
            return Common.showMessage('Digite sua senha.', 'warning');

        $scope.checkingLogin = true;

        UserService.logon($scope.user).then(function(response){

            if (!Common.isError(response)){
                $rootScope.session = {user: response.data};

                Common.loading(true);

                $timeout(function(){
                    Common.goTo('main');
                }, 2000);

            }else{
                Common.showMessage('E-mail ou senha incorretos.', 'error');
                $scope.user.password = '';
                $scope.checkingLogin = false;
            }
        });
    };
});
