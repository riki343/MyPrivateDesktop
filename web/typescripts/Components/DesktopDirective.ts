/// <reference path='components.d.ts' />

module Kernel {
    export class DesktopDirective implements ng.IDirective {
        public restrict = 'E';
        public templateUrl = '/views/desktop.html';
        public bindToController = true;
        public scope = {'desktopId': '@'};
        public controller = 'DesktopDirectiveController';
        public controllerAs = 'desktop';

        public static Factory(): ng.IDirectiveFactory {
            const directive = () => new DesktopDirective();
            return directive;
        }
    }

    interface iDesktopDirectiveScope extends ng.IScope{
        background: any;
        applications: any;
        apps: any;
        package: any;
        desktopGrid: any;
        desktopId: any;
        desktop: any;
    }

    export class DesktopDirectiveController {
        private desktop;
        public static $inject = [
            '$scope', '$window', '$document', 'filesystemService',
            '$rootScope', '$http', 'desktopService'
        ];

        constructor(
            private scope: iDesktopDirectiveScope,
            private window: ng.IWindowService,
            private document: ng.IDocumentService,
            private fs: FilesystemService,
            private rootScope: ng.IRootScopeService,
            private http: ng.IHttpService,
            private desktopService: DesktopService
        ) {
            let promise = this.desktopService.getDesktop(this.scope.desktop.desktopId);
            promise.then((response) => {
                if (response !== null) {
                    this.desktop = new Desktop(this.window.innerWidth, this.window.innerHeight, response);
                    this.scope.background = this.createBackground(response);
                    scope.background.settings.width = this.window.innerWidth;
                    scope.background.settings.height = this.window.innerHeight;
                    scope.applications = [];
                    scope.apps = [];
                    scope.package  = '/javascripts/Components/ProcessManager/process-manager.ae';
                    scope.desktopGrid = this.desktop.initGrid();
                }
            });

            // Register events
            this.rootScope.$on('DesktopImageChanged', this.DesktopImageChanged);
            this.scope.$on('DesktopGridStateChanged', this.DesktopGridStateChanged);
            angular.element(this.window).bind('keydown', this.KeyDown);
            angular.element(this.window).bind('resize', this.Resize);
        }

        public createBackground (response) {
            return {
                'settings': this.desktop.settings.getCss(),
                'contextMenu': [
                    [ 'Create File', () => {
                        let promise = this.fs.mkFile({ 'name': prompt('Input file name') });
                        promise.then(function (response:any) {
                            alert(response.name);
                        });
                    }],
                    [ 'Create Directory', () => {
                        var promise = this.fs.mkDir({ 'name': prompt('Input directory name') });
                        promise.then(function (response:any) {
                            alert(response.name);
                        });
                    }],
                    [ 'Change Settings', () => {
                        alert('Vasya lox');
                    }]
                ]
            };
        }

        // EVENTS
        public DesktopImageChanged = (event, data) => {
            this.scope.background.settings['background-image'] = data;
        };

        public DesktopGridStateChanged = (event, data) => {
            this.desktop.saveGrid(this.scope.desktopId, this.scope.desktopGrid);
        };

        public KeyDown = (event) => {
            if (event.ctrlKey && event.shiftKey) {
                switch (event.which) {
                    case 37: alert('suck'); break;
                    case 39: alert('suck'); break;
                }
            }
            this.scope.$apply();
        };

        public Resize = (event) => {
            this.scope.background.settings.width  = this.window.innerWidth;
            this.scope.background.settings.height = this.window.innerHeight;
            this.scope.$apply();
        };

    }
}