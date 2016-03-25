(function (angular) {
    angular
        .module('desktop-settings')
        .directive('desktopSettingsGallery', Directive)
        .controller('desktopSettingsGalleryDirectiveController', Controller)
    ;

    Directive.$inject = [ '$window'];
    function Directive($window, fs) {
        return {
            'restriction': 'E',
            'templateUrl': '/applications/system/DesktopSettings/Views/desktop-settings-gallery.directive.html',
            'controller': 'desktopSettingsGalleryDirectiveController',
            'controllerAs': 'gallery',
            'scope': {
                api: '=api'
            },
            'link': Link
        };

        function Link($scope, $element, $attr) {
        }
    }

    Controller.$inject = ['$scope', 'filesystemService', 'desktopService'];
    function Controller($scope, fs, ds) {
        this.rows = [];
        this.directory = {};
        var self = this;

        this.browseHandler = function (response) {
            this.directory = response;
            $scope.api.refreshGallery = function() {
                self.browse(self.directory.id);
            };
            self.rows = [];
            var triple = [];
            angular.forEach(this.directory.files, function(item) {
                if ((item.extension === "png") || (item.extension === "jpg")) {
                    triple.push(item);
                }
                if (triple.length === 3){
                    self.rows.push(triple);
                    triple=[];
                }
            });
            self.rows.push(triple);
        }.bind(this);

        this.browse = function (id) {
            var promise = fs.getDir(id);
            promise.success(this.browseHandler);
        }.bind(this);

        this.setUpSelectedImg = function(id){
            var promise = ds.changeBckFromGallery(id);
        }.bind(this);

        var promise = fs.getRootDir();
        promise.success(this.browseHandler);
    }
})(angular);