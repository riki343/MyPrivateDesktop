module Kernel {
    angular.module('kernel', [
            'ngAnimate',
            'ngSanitize',
            'pascalprecht.translate',
            'com.2fdevs.videogular',
            'com.2fdevs.videogular.plugins.controls',
            'com.2fdevs.videogular.plugins.overlayplay',
            'com.2fdevs.videogular.plugins.poster',
            'com.2fdevs.videogular.plugins.buffering',
        ])
        .factory('$globalScope', globalScope)
        .factory('resourceLoaderService', ResourceLoader.Factory())
        .factory('processManagerService', ProcessManagerService.Factory())
        .factory('windowManagerService', WindowManager.Factory())
        .factory('filesystemService', FilesystemService.Factory())
        .factory('applicationLauncherService', ApplicationLauncher.Factory())
        .factory('desktopService', DesktopService.Factory())
        .factory('spinnerService', SpinnerService.Factory())
        .factory('FERService', FileExtensionRecognizerService.Factory())

        .controller('applicationController', ApplicationController)
        .controller('DesktopDirectiveController', DesktopDirectiveController)
        //.controller('DesktopPanelDirectiveController', DesktopPanelDirectiveController)
        //.controller('DesktopGridDirectiveController', DesktopGridDirectiveController)
        //.controller('ApplicationsMenuController', ApplicationsMenuController)

        .directive('desktop', DesktopDirective.Factory())
        .directive('desktopCategories', DesktopCategoriesDirective.Factory())
        .directive('desktopItems', DesktopItemsDirective.Factory())
        //.directive('desktopGrid', DesktopGridDirective.Factory())
        //.directive('desktopPanel', DesktopPanelDirective.Factory())
        //.directive('applicationsMenu', ApplicationsMenuDirective.Factory())
        .run(run)
    ;

    globalScope.$inject = ['$window', '$rootScope'];
    function globalScope($window, $rootScope: ng.IRootScopeService) {
        if (angular.isDefined($window.superScope) === false) {
            $window.superScope = $rootScope;
        }

        return $window.superScope;
    }

    run.$inject = ['$globalScope'];
    function run($globalScope) {} // Hack to instantiate $globalScope service
}