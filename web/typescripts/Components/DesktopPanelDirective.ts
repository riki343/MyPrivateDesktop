module Kernel {
    interface iDesktopPanelDirectiveScope extends ng.IScope {
        menuVisible: boolean;
        settings: any;
    }

    export class DesktopPanelDirective implements ng.IDirective {
        public templateUrl = '/views/desktop.panel.html';
        public scope = {
            'settings': '=settings',
            'apps': '=apps'
        };
        public bindToController = true;
        public restrict = "E";
        public controller = 'DesktopPanelDirectiveController';
        public controllerAs = 'panel';

        public static $inject = ['$window'];

        constructor(private window: ng.IWindowService) {}

        public link = ($scope: iDesktopPanelDirectiveScope, $element: ng.IRootElementService) => {
            let window = this.window;
            if (!$scope.settings) {
                $scope.settings = {
                    'height': '30px',
                    'width': '100%',
                    'background-color': 'rgba(143, 195, 255, 0.8)',
                    'position': 'fixed',
                    'bottom': '0',
                    'left': '0'
                };
            }

            let panelMenu = $element.find('div.desktop-panel-menu');
            let panelBottom = parseInt($scope.settings.height.replace('px', '')) + 3;
            panelMenu.css('bottom', panelBottom + 'px');

            $scope.menuVisible = false;

            let resizePanelMenu = () => {
                panelMenu.css('height', (window.innerHeight / 2) + 'px');
                panelMenu.css('width', (window.innerWidth * 0.35) + 'px');
            };

            angular.element(window).bind('resize', function (event) {
                resizePanelMenu();
            });

            resizePanelMenu();
        };

        public static Factory() {
            const directive = ($window: ng.IWindowService) => new DesktopPanelDirective($window);

            return directive;
        }
    }

    export class DesktopPanelDirectiveController {
        public static $inject = ['$rootScope', '$window'];

        public static Factory() {
            const controller = () => new DesktopPanelDirectiveController();
        }
    }
}