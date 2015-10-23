(function (angular) {
    angular
        .module('kernel', [
            // Vendor modules
            'ngAnimate',
            'ngTouch',
            'angular-sortable-view',
            'pascalprecht.translate',
            'ui.bootstrap.contextMenu',

            // Custom modules
            'models',
            'services',
            'environment',
            'user',
            'controllers',
            'components'
        ])
        .config(kernelConfig)
    ;

    kernelConfig.$inject = [ '$translateProvider' ];
    function kernelConfig($translateProvider) {
        $translateProvider.useStaticFilesLoader({
            prefix: '/translations/locale-',
            suffix: '.json'
        });

        $translateProvider.preferredLanguage('en');
    }
})(angular);