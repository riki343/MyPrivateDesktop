(function (angular) {
    angular.module('file-manager').controller('fileManagerController', Controller);

    Controller.$inject = [
        '$scope', 'filesystemService'
    ];

    function Controller($scope, fs) {
        this.newDirModal = angular.element(document).find('div#file-manager-new-dir-modal');
        this.directory = {};
        this.dirname = '';

        this.browseHandler = function (response) {
            this.directory = response;
        }.bind(this);

        this.browse = function (id) {
            var promise = fs.getDir(id);
            promise.success(this.browseHandler);
        }.bind(this);

        this.initNewDirDialog = function () {
            this.newDirModal.addClass('visible');
        }.bind(this);

        this.createNewDir = function (dirname) {
            var promise = fs.mkDir(this.directory.id, dirname);
            promise.success(function (response) {
                this.directory = response;
                this.closeInitNewDirDialog();
            }.bind(this));
        }.bind(this);

        this.closeInitNewDirDialog = function () {
            this.newDirModal.removeClass('visible');
        }.bind(this);

        var promise = fs.getRootDir();
        promise.success(this.browseHandler);
    }
})(angular);