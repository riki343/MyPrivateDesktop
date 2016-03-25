(function (angular) {
    angular.module('desktop-settings').controller('desktopSettingsController', Controller);

    Controller.$inject = [
        '$scope', '$globalScope', 'desktopService', 'filesystemService'
    ];

    function Controller($scope, $globalScope, desktopService, fs) {
        this.galleryAPI = {};
        var self = this;
        this.uploadFile = function (files) {
            if(this.checkBoxModel){
                desktopService.changeBackground(files[0]);
            } else{
                var promise = fs.uploadFiles(files);
                promise.success(function(response){
                    self.galleryAPI.refreshGallery();
                });
            }
        }.bind(this);

        this.checkBoxModel = false;
    }
})(angular);