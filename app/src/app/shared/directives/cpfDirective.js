App.directive('cpfMask', function (Common, $compile, $timeout) {
    return {
        restrict: 'A',
        compile: function() {

            return {
                post: function () {
                    $timeout(function () {
                        $('#cpf').attr('maxlength','14');
                        $('#cpf').keypress(function(){
                            var v = $(this).val();
                            v=v.replace(/\D/g,'').replace(/(\d{3})(\d)/,'$1.$2');
                            v=v.replace(/(\d{3})(\d)/,'$1.$2').replace(/(\d{3})(\d{1,2})$/,'$1-$2');
                            $(this).val(v);
                        });
                    });
                }
            };
        }
    };
});
