(function (angular) {
    angular.module('desktop-settings').controller('desktopSettingsController', Controller);

    Controller.$inject = [
        '$scope', '$globalScope', 'desktopService'
    ];

    function Controller($scope, $globalScope, desktopService) {
        this.newBackgroundImage = null;

        this.uploadFile = function () {
            desktopService.changeBackground(this.newBackgroundImage);
        }.bind(this); // це шоб this був правильний

    }
})(angular);