(function (angular) {
    angular
        .module('image-viewer', [ 'kernel', 'ui.router' ])
        .config(moduleConfig)
    ;

    moduleConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function moduleConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                'url': '/image-viewer/home',
                'views': {
                    'image-viewer': { 'templateUrl': 'applications/system/ImageViewer/Views/index.html' }
                }
            })
        ;

        $urlRouterProvider.otherwise('/image-viewer/home');
    }
})(angular);