(function (angular) {
    angular.module('desktop-settings').controller('desktopSettingsController', Controller);

    Controller.$inject = [
        '$scope', 'processManagerService'
    ];

    function Controller($scope, processManager) {
        var self = this;
        this.count = processManager.processCount;
        this.list  = processManager.processList;
    }
})(angular);