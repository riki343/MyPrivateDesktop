module Kernel {
    interface iDesktopPanelDirectiveScope extends ng.IScope {
        menuVisible: boolean;
        settings: any;
        menuPanel: any;
    }

    export class DesktopPanelDirective implements ng.IDirective {
        public templateUrl = '/views/desktop.panel.html';
        public scope = true;
        public bindToController = { 'settings': '=settings' };
        public restrict = "E";
        public controller = 'DesktopPanelDirectiveController';
        public controllerAs = 'panel';

        public static $inject = [];
        constructor() {}

        public link = ($scope: iDesktopPanelDirectiveScope, $element: ng.IRootElementService) => {
            if (!$scope.settings) {
                $scope.settings = {
                    'height': '30px',
                    'width': '100%',
                    'background-color': 'rgba(143, 195, 255, 0.6)',
                    'position': 'fixed',
                    'bottom': '0',
                    'left': '0'
                };
            }
        };

        public static Factory() {
            const directive = () => new DesktopPanelDirective();

            return directive;
        }
    }

    export class DesktopPanelDirectiveController extends WindowContainer{
        public static $inject = ['$rootScope', 'windowManagerService', '$timeout'];

        constructor(
            private rootScope: ng.IRootScopeService,
            private windowManager: WindowManager,
            private timeout: ng.ITimeoutService
        ) {
            super();
            this.rootScope.$on('WindowCreated', this.onWindowCreated);
            this.rootScope.$on('WindowClosed', this.onWindowClosed);
        }

        public toggleWindow(app: Application) {
            app.collapse();
        }

        private onWindowCreated = (event, data: any) => {
            this.timeout(() => { this.addWindow(this.windowManager.getWindow(data.pid)); });
        };

        private onWindowClosed = (event, data: any) => {
            this.timeout(() => { this.removeWindow(data.pid); });
        };
    }
}