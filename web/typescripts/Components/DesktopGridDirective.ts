/// <reference path='components.d.ts' />
module Kernel {
    export class DesktopGridDirective implements ng.IDirective {
        public templateUrl = '/views/desktop.grid.directive.html';
        public restrict = 'E';
        public bindToController = true;
        public scope = {'grid': '=grid'};
        public controller = 'DesktopGridDirectiveController';
        public controllerAs = 'grid';

        public static Factory(): ng.IDirectiveFactory {
            const factory = () => new DesktopGridDirective();

            return factory;
        }
    }

    interface iDesktopGridDirectiveController extends ng.IScope {
        grid: DesktopGrid;
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