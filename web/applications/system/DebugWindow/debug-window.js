(function (angular) {
    angular
        .module('debug-window', [ 'kernel', 'ui.router' ])
        .config(moduleConfig)
    ;

    moduleConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function moduleConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                'url': '/debug-window/home',
                'views': {
                    'debug-window': { 'templateUrl': 'applications/system/DebugWindow/Views/index.html' }
                }
            })
        ;

        $urlRouterProvider.otherwise('/debug-window/home');
    }
})(angular);