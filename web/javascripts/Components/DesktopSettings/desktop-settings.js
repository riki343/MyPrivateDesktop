(function (angular) {
    angular
        .module('desktop-settings', [ 'kernel', 'ui.router' ])
        .config(moduleConfig)
    ;

    moduleConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function moduleConfig($stateProvider, $urlRouterProvider) {
        //$stateProvider
        //    .state('/', {
        //        'templateUrl': '/javascripts/Components/DesktopSettings/Views/index.html'
        //    })
        //    .state('/some', {
        //        'templateUrl': '/javascripts/Components/DesktopSettings/Views/some.html'
        //    })
        //;
        //
        //$urlRouterProvider.otherwise('/');
    }
})(angular);