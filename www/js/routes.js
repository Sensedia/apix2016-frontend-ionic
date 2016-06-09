angular.module('app.routes', [])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
    
            .state('menu.paginaInicial', {
                url: '/paginaInicial',
                views: {
                    'side-menu21': {
                        templateUrl: 'templates/paginaInicial.html',
                        controller: 'paginaInicialCtrl'
                    }
                }
            })
            
            .state('menu.extrato', {
                url: '/extrato',
                views: {
                    'side-menu21': {
                        templateUrl: 'templates/extrato.html',
                        controller: 'movimentacaoCtrl'
                    }
                }
            })

            .state('menu.transferencia', {
                url: '/transferencia',
                views: {
                    'side-menu21': {
                        templateUrl: 'templates/transferencia.html',
                        controller: 'transferenciaCtrl'
                    }
                }
            })

            .state('menu', {
                url: '/menu',
                templateUrl: 'templates/menu.html',
                controller: 'acessoCtrl',
                abstract: true
            })

            .state('acesso', {
                url: '/login',
                templateUrl: 'templates/acesso.html',
                controller: 'acessoCtrl'
            })
            
            .state('menu.criarConta', {
                url: '/criarConta',
                views: {
                  'side-menu21': {
                    templateUrl: 'templates/criarConta.html',
                    controller: 'ContaCtrl'
                  }
                }
            });

        $urlRouterProvider.otherwise('/login');

    });