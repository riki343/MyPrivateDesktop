module Kernel {
    export class ApplicationsMenuDirective implements ng.IDirective
    {
        public templateUrl = '/views/applications-menu.directive.html';
        public restrict = 'E';
        public bindToController = {
            'onReady': '&'
        };
        public scope = true;
        public controller = 'ApplicationsMenuController';
        public controllerAs = 'controller';

        public link = ($scope: ng.IScope, $element: ng.IRootElementService) => {};

        public static Factory() {
            const factory = () => new ApplicationsMenuDirective();
        }
    }

    export class ApplicationsMenuController {
        // TODO: implement this shit!!!!!
    }
}