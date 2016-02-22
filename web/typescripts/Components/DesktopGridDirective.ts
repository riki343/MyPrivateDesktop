module Kernel {
    export class DesktopGridDirective implements ng.IDirective {
        public templateUrl = '/views/desktop.grid.directive.html';
        public restrict = 'E';
        public bindToController = {'grid': '=grid'};
        public scope = true;
        public controller = 'DesktopGridDirectiveController';
        public controllerAs = 'controller';

        public static Factory(): ng.IDirectiveFactory {
            const factory = () => new DesktopGridDirective();

            return factory;
        }
    }

    interface iDesktopGridDirectiveController extends ng.IScope {

    }

    export class DesktopGridDirectiveController {
        private grid;
        public static $inject = ['$scope'];

        constructor(
            private scope: iDesktopGridDirectiveController
        ) {
            this.scope.$watch('grid', this.gridWatcher);
        }

        private gridWatcher = (newVal, oldVal) => {
            this.grid = newVal;
        }
    }
}