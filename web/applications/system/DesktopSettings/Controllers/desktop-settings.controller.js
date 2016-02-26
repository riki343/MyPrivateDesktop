(function (angular) {
    angular.module('desktop-settings').controller('desktopSettingsController', Controller);

    Controller.$inject = [
        '$scope', '$globalScope', 'desktopService'
    ];

    function Controller($scope, $globalScope, desktopService) {
        this.uploadFile = function (file) {
            desktopService.changeBackground(file);
        }.bind(this); // це шоб this був правильний
    }
})(angular);