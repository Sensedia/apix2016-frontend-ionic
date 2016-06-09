angular.module('app.services', [])

    .service('clienteService', function ($http, API) {
        
        this.validarLogin = function (usuario) {
            return $http.post(API.MICROSERVICE_CLIENTE_URL.concat("validarcliente"), usuario, { headers : { client_id : API.CLIENT_ID }});
        };

    })
    
    .service('contaService', function ($http, API) {
        
        this.criarConta = function (conta) {
            return $http.post(API.MICROSERVICE_CONTA_URL.concat("contas/"), conta, { headers : { client_id : API.CLIENT_ID }});
        };

        this.listarContas = function () {
            return $http.get(API.MICROSERVICE_CONTA_URL.concat("contas/"), { headers : { client_id : API.CLIENT_ID }});
        };

        this.buscarContaPorNumero = function (numero) {
            return $http.get(API.MICROSERVICE_CONTA_URL.concat("contas/") + numero, { headers : { client_id : API.CLIENT_ID }});
        };
        
        this.buscarContaPorPessoa = function (pessoa_id) {
            return $http.get(API.MICROSERVICE_CONTA_URL + "clientes/" + pessoa_id + "/contas", { headers : { client_id : API.CLIENT_ID }});
        };

        this.buscarMovimentacaoPorConta = function (numero) {
            return $http.get(API.MICROSERVICE_CONTA_URL.concat("contas/") + numero + "/movimentacoes/", { headers : { client_id : API.CLIENT_ID }});
        };
        
        this.criarMovimentacao = function (numero, movimentacao) {
            return $http.post(API.MICROSERVICE_CONTA_URL.concat("contas/") + numero + "/movimentacoes/", movimentacao, { headers : { client_id : API.CLIENT_ID }});
        };     

    });