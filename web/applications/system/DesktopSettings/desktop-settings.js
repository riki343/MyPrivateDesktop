(function (angular) {
    angular
        .module('desktop-settings', [ 'kernel', 'ui.router', 'angular-loading-bar'])
        .config(moduleConfig)
    ;

    moduleConfig.$inject = ['$stateProvider', '$urlRouterProvider', 'cfpLoadingBarProvider'];
    function moduleConfig($stateProvider, $urlRouterProvider, $cfpLoadingBarProvider) {
        $stateProvider
            .state('home', {
                'url': '/desktop-settings/home',
                'views': {
                    'desktop-settings': { 'templateUrl': 'applications/system/DesktopSettings/Views/index.html' }
                }
            })
        ;

        $urlRouterProvider.otherwise('/desktop-settings/home');

        $cfpLoadingBarProvider.latencyThreshold=10;
        $cfpLoadingBarProvider.includeSpinner = true;
        $cfpLoadingBarProvider.includeBar = true;
    }
})(angular);