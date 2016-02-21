(function (angular) {
    angular
        .module('process-manager', [ 'kernel', 'ui.router' ])
        .config(moduleConfig)
    ;

    moduleConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function moduleConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                'url': '/process-manager/home',
                'views': {
                    'process-manager': { 'templateUrl': 'applications/system/ProcessManager/Views/index.html' }
                }
            })
        ;

        $urlRouterProvider.otherwise('/process-manager/home');
    }
})(angular);