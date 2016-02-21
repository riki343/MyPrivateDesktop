(function (angular) {
    angular
        .module('file-manager', [ 'kernel', 'ui.router' ])
        .config(moduleConfig)
    ;

    moduleConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function moduleConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                'url': '/file-manager/home',
                'views': {
                    'file-manager': { 'templateUrl': 'applications/system/FileManager/Views/index.html' }
                }
            })
        ;

        $urlRouterProvider.otherwise('/file-manager/home');
    }
})(angular);