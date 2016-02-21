(function (angular) {
    angular.module('process-manager').controller('processManagerController', Controller);

    Controller.$inject = [
        'processManagerService', '$scope', '$globalScope', '$timeout', '$rootScope'
    ];

    function Controller(processManager, $scope, $globalScope, $timeout, $rootScope) {
        this.count = processManager.processCount;
        this.list  = processManager.processList;
        this.selected = null;

        $globalScope.$on('ProcessCreated', function () {
            $timeout(function () {
                $scope.process.list = processManager.processList;
                $scope.process.count = processManager.processCount;
            });
        }).bind(this);

        $globalScope.$on('ProcessClosed', function () {
            $timeout(function () {
                $scope.process.list = processManager.processList;
                $scope.process.count = processManager.processCount;
            });
        }).bind(this);

        this.closeProcess = function (pid) {
            processManager.closeProcess(pid);
        };

        $rootScope.$on('$destroy', function() { $scope.$destroy() });
    }
})(angular);