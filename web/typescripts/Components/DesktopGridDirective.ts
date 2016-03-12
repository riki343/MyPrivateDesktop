module Kernel {
    interface iDesktopGridDirectiveDirective extends ng.IScope {
        mouseDown: Function;
        mouseMove: Function;
        mouseUp: Function;
        selectionArea: DesktopGridSelection;
        selectionInProgress: boolean;
        DOM: JQuery;
    }

    export class DesktopGridDirective implements ng.IDirective {
        public templateUrl = '/views/desktop.grid.directive.html';
        public restrict = 'E';
        public bindToController = {'grid': '=grid'};
        public scope = true;
        public controller = 'DesktopGridDirectiveController';
        public controllerAs = 'controller';

        public link = ($scope: iDesktopGridDirectiveDirective, $element: JQuery) => {
            $scope.selectionInProgress = false;
            $scope.selectionArea = new DesktopGridSelection();
            $scope.DOM = $element.find('div.desktop-grid-selection');

            $scope.mouseDown = (event) => {
                $scope.selectionArea.from = new Point(event.clientX, event.clientY);
                $scope.selectionInProgress = true;
                $scope.DOM.css('display', 'block');
            };

            $scope.mouseMove = (event) => {
                if (event.clientX < 0 || event.clientY < 0 || $scope.selectionInProgress === false) {
                    return;
                }

                let point = new Point(event.clientX, event.clientY);
                $scope.selectionArea.distance = $scope.selectionArea.from.distanceToPoint(point);
                $scope.selectionArea.to = point;

                if ($scope.selectionArea.from.x < $scope.selectionArea.to.x) {
                    $scope.DOM.css('left', $scope.selectionArea.from.x + 'px');
                } else {
                    $scope.DOM.css('left', $scope.selectionArea.to.x + 'px');
                }

                if ($scope.selectionArea.from.y < $scope.selectionArea.to.y) {
                    $scope.DOM.css('top', $scope.selectionArea.from.y + 'px');
                } else {
                    $scope.DOM.css('top', $scope.selectionArea.to.y + 'px');
                }

                $scope.DOM.css('width', $scope.selectionArea.distance.width + 'px');
                $scope.DOM.css('height', $scope.selectionArea.distance.height + 'px');
            };

            $scope.mouseUp = (event) => {
                $scope.DOM.css('width', '0px');
                $scope.DOM.css('height', '0px');
                $scope.DOM.css('display', 'none');
                $scope.selectionInProgress = false;
            };
        };

        public static Factory(): ng.IDirectiveFactory {
            const factory = () => new DesktopGridDirective();

            return factory;
        }
    }

    export class DesktopGridDirectiveController {
        private grid;
        public static $inject = ['$scope'];

        constructor(
            private scope: iDesktopGridDirectiveDirective
        ) {
            this.scope.$watch('grid', this.gridWatcher);
        }

        private gridWatcher = (newVal, oldVal) => {
            this.grid = newVal;
        }
    }
}