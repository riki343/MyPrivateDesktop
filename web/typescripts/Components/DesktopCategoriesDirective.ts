module Kernel {
    export interface iDesktopCategoriesDirective extends ng.IScope {
        directive: {
            categories: Array<string>;
            selected: string;
        }
        onCategoryChanged(category: Object);
        selectItem(item: string);
    }

    export class DesktopCategoriesDirective implements ng.IDirective {
        public templateUrl = '/views/desktop-categories.directive.html';
        public restrict = 'E';
        public scope = {
            'onCategoryChanged':  '&'
        };

        public link = ($scope: iDesktopCategoriesDirective, $element: ng.IRootElementService) => {
            $scope.directive = {
                categories: ['Filesystem', 'Images', 'Music', 'Videos', 'Documents', 'Applications'],
                selected: 'Filesystem'
            };

            $scope.selectItem = (item: string) => {
                $scope.onCategoryChanged({'category': item});
                $scope.directive.selected = item;
            };
        };

        public static $inject:Array<string> = [];
        public static Factory() {
            const factory = () => new DesktopCategoriesDirective();

            return factory;
        }
    }
}