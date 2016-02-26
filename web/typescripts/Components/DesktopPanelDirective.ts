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

        public static $inject = ['$window', '$document'];

        constructor(private window: ng.IWindowService, private document: any) {}

        public link = ($scope: iDesktopPanelDirectiveScope, $element: ng.IRootElementService) => {
            let window = this.window;
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

            $scope.menuPanel = $element.find('div.desktop-panel-menu');
            let panelBottom = parseInt($scope.settings.height.replace('px', '')) + 3;
            $scope.menuPanel.css('bottom', panelBottom + 'px');

            $scope.menuVisible = false;

            let resizePanelMenu = () => {
                $scope.menuPanel.css('height', (window.innerHeight / 2) + 'px');
                $scope.menuPanel.css('width', (window.innerWidth * 0.35) + 'px');
            };

            let $window = angular.element(this.window);
            $window.on('resize', resizePanelMenu);

            resizePanelMenu();
        };

        public static Factory() {
            const directive = (
                $window: ng.IWindowService, $document: ng.IDocumentService
            ) => new DesktopPanelDirective($window, $document);

            return directive;
        }
    }

    export class DesktopPanelDirectiveController extends WindowContainer{
        public static $inject = ['$rootScope', 'windowManagerService', '$scope', '$timeout'];

        constructor(
            private rootScope: ng.IRootScopeService,
            private windowManager: WindowManager,
            private scope: any,
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