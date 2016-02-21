(function (angular) {
    angular
        .module('audio-player', [ 'kernel', 'ui.router' ])
        .config(moduleConfig)
    ;

    moduleConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function moduleConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                'url': '/audio-player/home',
                'views': {
                    'audio-player': { 'templateUrl': 'applications/system/AudioPlayer/Views/index.html' }
                }
            })
        ;

        $urlRouterProvider.otherwise('/audio-player/home');
    }
})(angular);