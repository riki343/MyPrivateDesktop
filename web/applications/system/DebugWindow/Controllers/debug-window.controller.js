(function (angular) {
    angular.module('debug-window').controller('debugWindowController', Controller);

    Controller.$inject = [
        '$globalScope', '$rootScope'
    ];

    function Controller($globalScope, $rootScope) {
        this.application = $rootScope.process;

        $rootScope.$on('$destroy', function() { $scope.$destroy() });
    }
})(angular);