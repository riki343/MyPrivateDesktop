/// <reference path='components.d.ts' />

module Kernel {
    export class DesktopDirective implements ng.IDirective {
        public restrict = 'E';
        public templateUrl = '/views/desktop.html';
        public bindToController = {'desktopId': '@'};
        public scope = true;
        public controller = 'DesktopDirectiveController';
        public controllerAs = 'desktop';

        public static Factory(): ng.IDirectiveFactory {
            const directive = () => new DesktopDirective();
            return directive;
        }
    }

    interface iDesktopDirectiveScope extends ng.IScope {
        background: any;
        package: string;
        desktopId: any;
        desktop: any;
        launch: Function;
    }

    export class DesktopDirectiveController {
        private desktop;
        private sortPanelEvents: Object;
        private itemsPanelAPI: iDesktopItemsDirectiveAPI;
        public static $inject = [
            '$scope', '$window', '$document', 'filesystemService',
            '$rootScope', '$http', 'desktopService',
            'applicationLauncherService', '$timeout', 'FERService'
        ];

        constructor(
            private scope: iDesktopDirectiveScope,
            private window: ng.IWindowService,
            private document: ng.IDocumentService,
            private fs: FilesystemService,
            private rootScope: ng.IRootScopeService,
            private http: ng.IHttpService,
            private desktopService: DesktopService,
            private applicationLauncher: ApplicationLauncher,
            private timeout: ng.ITimeoutService,
            private fer: FileExtensionRecognizerService
        ) {
            let promise = this.desktopService.getDesktop(this.scope.desktop.desktopId);
            promise.then((response) => {
                if (response !== null) {
                    this.desktop = new Desktop(this.window.innerWidth, this.window.innerHeight, response);
                    this.scope.background = this.createBackground(response);
                    scope.background.settings.width = this.window.innerWidth;
                    scope.background.settings.height = this.window.innerHeight;
                    scope.package  = '/applications/system/ProcessManager/process-manager.ae';
                }
            });

            this.fer.getExtensionsForDesktop(this.scope.desktop.desktopId);

            // Register events
            this.rootScope.$on('DesktopImageChanged', this.DesktopImageChanged);
            this.scope.$on('DesktopGridStateChanged', this.DesktopGridStateChanged);
            let $window = angular.element(this.window);
            $window.on('keydown', this.onKeyDown);
            $window.on('resize', this.onResize);
        }

        public launch = (pack: string) => {
            this.applicationLauncher.launchApplication(pack);
        };

        public createBackground (response) {
            return { 'settings': this.desktop.settings.getCss() };
        }

        // EVENTS
        public DesktopImageChanged = (event, data) => {
            this.scope.background.settings['background-image'] = 'url(\'' + data + '\')';
        };

        public DesktopGridStateChanged = (event, data) => {
            this.desktop.saveGrid(this.scope.desktopId, this.desktop.grid);
        };

        public onKeyDown = (event) => {
            if (event.ctrlKey && event.shiftKey) {
                switch (event.which) {
                    case 37: alert('suck'); break;
                    case 39: alert('suck'); break;
                }
            }
        };

        public onResize = (event) => {
            this.timeout(() => {
                this.scope.background.settings.width  = this.window.innerWidth;
                this.scope.background.settings.height = this.window.innerHeight;
            });
        };

        public onSelectChange = (category) => {
            this.itemsPanelAPI.changeCategory(category);
        };

        public onItemsPanelReady = (API: iDesktopItemsDirectiveAPI) => {
            this.itemsPanelAPI = API;
        };
    }
}