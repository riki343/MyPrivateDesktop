module Kernel {
    angular.module('kernel', [
            'ngAnimate',
            'angular-sortable-view',
            'pascalprecht.translate',
            'ui.bootstrap.contextMenu',
        ])
        //.factory('Desktop', DesktopService.Factory())
        .factory('filesystemService', FilesystemService.Factory())
        .factory('spinnerService', SpinnerService.Factory())
        .factory('desktopService', DesktopService.Factory())
        .factory('processManagerService', ProcessManagerService.Factory())
        .factory('applicationLauncherService', ApplicationLauncher.Factory())
        .controller('applicationController', ApplicationController)
        .controller('DesktopDirectiveController', DesktopDirectiveController)
        .controller('DesktopPanelDirectiveController', DesktopPanelDirectiveController)
        .controller('DesktopGridDirectiveController', DesktopGridDirectiveController)
        .directive('desktop', DesktopDirective.Factory())
        .directive('desktopGrid', DesktopGridDirective.Factory())
        .directive('desktopPanel', DesktopPanelDirective.Factory())
    ;
}