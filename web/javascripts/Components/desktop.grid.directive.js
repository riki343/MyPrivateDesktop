(function (angular) {
    angular.module('components').directive('desktopGrid', Directive);

    Directive.$inject = [];

    function Directive() {
        return {
            'templateUrl': '/views/desktop.grid.directive.html',
            'link': Link,
            'scope': {
                'grid': '=grid'
            }
        };

        function Link($scope, $element, $attrs) {


            // Events
            $scope.$watch('grid', function (newValue, oldValue) {
                $scope.grid = newValue;
            });
        }
    }
})(angular);