(function (angular) {
    angular.module('components').directive('desktopPanel', Directive);

    Directive.$inject = ['$rootScope', '$window'];

    function Directive($rootScope, $window) {
        return {
            'templateUrl': '/javascripts/Views/desktop.panel.html',
            'link': Link,
            'scope': {
                'settings': '=settings',
                'apps': '=apps'
            }
        };

        function Link($scope, $element, $attrs) {
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

            var panelMenu = $element.find('div.desktop-panel-menu');
            var panelBottom = parseInt($scope.settings.height.replace('px', '')) + 3;
            panelMenu.css('bottom', panelBottom + 'px');

            $scope.menuVisible = false;

            angular.element(window).bind('resize', function (event) {
                resizePanelMenu();
            });

            function resizePanelMenu() {
                panelMenu.css('height', ($window.innerHeight / 2) + 'px');
                panelMenu.css('width', ($window.innerWidth * 0.35) + 'px');
            }

            resizePanelMenu();
        }
    }
})(angular);