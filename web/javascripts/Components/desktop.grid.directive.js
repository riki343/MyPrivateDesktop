// TODO: Туйка треба робити
(function (angular) {
    angular.module('').directive('', Directive);

    Directive.$inject = [];

    function Directive() {
        return {
            'templateUrl': '',
            'link': Link,
            'scope': {}
        };

        function Link($scope, $element, $attrs) {

        }
    }
})(angular);