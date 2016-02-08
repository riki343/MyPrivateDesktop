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
        .controller('applicationController', ApplicationController)
        .controller('DesktopDirectiveController', DesktopDirectiveController)
        .controller('DesktopPanelDirectiveController', DesktopPanelDirectiveController)
        .directive('desktop', DesktopDirective.Factory())
        .directive('desktopPanel', DesktopPanelDirective.Factory())
    ;
}