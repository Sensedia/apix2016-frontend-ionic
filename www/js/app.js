/* global cordova, StatusBar */

angular.module('app', ['ionic', 'ionic.service.core', 'ui.utils.masks', 'app.controllers', 'app.routes', 'app.services', 'app.directives'])

    .constant('API', {
        CLIENT_ID: 'dc2f4b97-2005-3eeb-aff8-e3d832033ad3',
        MICROSERVICE_CONTA_URL: 'http://api.apix.com.br/v1/',
        MICROSERVICE_CLIENTE_URL: 'http://api.apix.com.br/soap/v1/clientes/'
    })
    
    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    });