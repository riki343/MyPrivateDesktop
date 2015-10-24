(function (angular) {
    angular
        .module('desktop-settings', [ 'kernel', 'ui.router' ])
        .config(moduleConfig)
    ;

    moduleConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function moduleConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                'url': '/desktop-settings/home',
                'views': {
                    'desktop-settings': { 'templateUrl': '/javascripts/Components/DesktopSettings/Views/index.html' }
                }
            })
        ;

        $urlRouterProvider.otherwise('/desktop-settings/home');
    }
})(angular);