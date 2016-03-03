(function (angular) {
    angular.module('desktop-settings').controller('desktopSettingsController', Controller);

    Controller.$inject = [
        '$scope', '$globalScope', 'desktopService', 'filesystemService'
    ];

    function Controller($scope, $globalScope, desktopService, fs) {
        this.uploadFile = function (files) {
            if(this.checkBoxModel){
                desktopService.changeBackground(files[0]);
            } else{
                fs.uploadFiles(files);
            }
        }.bind(this);

        this.checkBoxModel = false;
    }
})(angular);