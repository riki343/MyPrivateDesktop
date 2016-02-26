(function (angular) {
    angular
        .module('desktop-settings')
        .directive('desktopSettings', Directive)
        .controller('desktopSettingsDirectiveController', Controller)
    ;

    Directive.$inject = [ '$window', '$parse' ];
    function Directive($window,$parse) {
        return {
            'restriction': 'A',
            'controller': 'desktopSettingsDirectiveController',
            'controllerAs': 'settingsCtrl',
            'scope': {
                'uploadFile': '&onFileChanged'
            },
            'link': Link
        };

        function Link($scope, $element, $attr) {
            $element.bind('change', function(){
                $scope.uploadFile({'file': $element[0].files[0]});
            }.bind(this));
        }
    }

    Controller.$inject = ['$scope'];
    function Controller($scope) {

    }
})(angular);