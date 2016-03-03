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
            'bindToController': {

            },
            'scope': true,
            'link': Link
        };

        function Link($scope, $element, $attr) {
        }
    }

    Controller.$inject = ['$scope', 'filesystemService'];
    function Controller($scope, fs) {
        this.rows = [];
        this.directory = {};

        this.browseHandler = function (response) {
            this.directory = response;
            var ctrl = this;
            var triple = [];
            angular.forEach(this.directory.files, function(item) {
                if ((item.extension === "png") || (item.extension === "jpg")) {
                    triple.push(item);
                }
                if (triple.length === 3){
                    ctrl.rows.push(triple);
                    triple=[];
                }
            });
            ctrl.rows.push(triple);
        }.bind(this);

        this.browse = function (id) {
            var promise = fs.getDir(id);
            promise.success(this.browseHandler);
        }.bind(this);

        var promise = fs.getRootDir();
        promise.success(this.browseHandler);
    }
})(angular);