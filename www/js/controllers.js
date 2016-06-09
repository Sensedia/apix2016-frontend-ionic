angular.module('app.controllers', [])

    .controller('acessoCtrl', function ($scope, $state, $ionicPopup, $window, clienteService, contaService) {

        $scope.inicializar = function () {
            $scope.usuario = {};
            $scope.usuario.cpf = null;
            $scope.usuario.senha = null;
        };
        
        $scope.sair = function() {
            $window.localStorage.removeItem("usuario");
            $state.go('acesso');
        };

        $scope.entrar = function (usuario) {
            
            if (!usuario.cpf && !usuario.senha) {
                $ionicPopup.alert({title: 'Mensagem', template: 'Usuário e/ou senha não informados!'});
                return;
            }

            clienteService.validarLogin(usuario)
                .then(function (response) {
                    var responseCliente = response;
                    
                    contaService.buscarContaPorPessoa(responseCliente.data.id.content)
                        .then(function(responseConta) {
                            var usuario = responseConta.data;
                            usuario.nome = responseCliente.data.nome.content;
                            $window.localStorage.setItem("usuario", JSON.stringify(usuario));
                            $state.go('menu.paginaInicial');
                        })
                        .catch(function(error) {
                            $ionicPopup.alert({title: 'Mensagem', template: 'Ocorreu um erro inesperado! Trace: ' + JSON.stringify(error)});
                        });
                    
                })
                .catch(function (error) {
                    if (error.status === 500) {
                        $ionicPopup.alert({title: 'Mensagem', template: 'Ocorreu um erro inesperado!'});
                    } else {
                        $ionicPopup.alert({title: 'Mensagem', template: JSON.stringify(error)});
                    }
                });

        };

    })

    .controller('ContaCtrl', function ($scope, $state, $ionicPopup, $window, contaService) {

        $scope.criar = function (conta) {

            if (conta.senha !== conta.confirmarSenha) {
                $ionicPopup.alert({title: 'Mensagem', template: 'Senhas não conferem!'});
            } else {

                contaService.criarConta(conta)
                    .then(function (response) {

                        $ionicPopup.alert({title: 'Mensagem', template: 'Conta criada com sucesso!'});
                        
                        contaService.buscarContaPorPessoa(response.data.pessoa_id)
                            .then(function(responseConta) {
                                var usuario = responseConta.data;
                                usuario.nome = responseConta.data.nome.content;
                                $window.localStorage.setItem("usuario", JSON.stringify(usuario));
                                $state.go('menu.paginaInicial');
                            })
                            .catch(function(error) {
                                $ionicPopup.alert({title: 'Mensagem', template: 'Ocorreu um erro inesperado! Trace: ' + JSON.stringify(error)});
                            });
                        
                    })
                    .catch(function (error) {

                        if (error.status === 422) {
                            $ionicPopup.alert({title: 'Mensagem', template: 'Conta já cadastrada!'});
                        } else if (error.status === 500) {
                            $ionicPopup.alert({title: 'Mensagem', template: 'Erro ao criar conta!'});
                        }

                    });
            }

        };

    })

    .controller('paginaInicialCtrl', function ($scope, $state, $window, $ionicPopup, contaService) {

        var usuario = JSON.parse($window.localStorage.getItem("usuario"));
        $scope.usuario = usuario;
        
        $scope.consultar = function (usuario) {
            contaService.buscarContaPorNumero($scope.usuario.numero)
                .then(function(response) {
                    var usuario = response.data;
                    $scope.usuario.saldo = usuario.saldo;
                    $window.localStorage.setItem("usuario", JSON.stringify(usuario));
                })
                .catch(function(error) {
                    $ionicPopup.alert({title: 'Mensagem', template: 'Erro ao buscar conta ' + $scope.usuario.nome + '!'});
                });
            
        };

    })

    .controller('movimentacaoCtrl', function ($scope, $window, contaService) {
        
        var usuario = JSON.parse($window.localStorage.getItem("usuario"));
        $scope.usuario = usuario;        
        
        $scope.tiposMovimentacao = ["DEPOSITO", "SAQUE"];
        $scope.tipoMovimentaca = "DEPOSITO";

        contaService.buscarMovimentacaoPorConta(usuario.numero)
            .then(function (response) {
                if (response.status === 200) {
                    $scope.movimentacoes = response.data;
                }
            });

    })

    .controller('transferenciaCtrl', function ($scope, $window, contaService) {

        var usuario = JSON.parse($window.localStorage.getItem("usuario"));
        $scope.usuario = usuario;        
        
        $scope.valorMin = 0;
        $scope.valorMax = usuario.saldo;
        
        $scope.transferencia = {};
        $scope.transferencia.valor = 0;
        $scope.transferencia.conta_destino = 60016;

        $scope.efetuarMovimentacao = function (transferencia) {
            contaService.criarMovimentacao($scope.usuario.numero, transferencia)
                .then(function(response) {
                    console.log(response);
                })
                .catch(function(error) {
                    console.log(error);
                });
        };

    });
 