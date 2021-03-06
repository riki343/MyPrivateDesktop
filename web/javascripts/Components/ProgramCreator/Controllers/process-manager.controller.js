(function (angular) {
    angular.module('desktop-settings').controller('desktopSettingsController', Controller);

    Controller.$inject = [
        '$scope', 'desktopSettings'
    ];

    function Controller($scope, settings) {
        var fileinput = angular.element('input#file');
        fileinput.bind('change', function (event) {
            var file = (event.srcElement || event.target).files[0];
            settings.background.setImage(file.src);
        });
    }
})(angular);