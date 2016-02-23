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
            //'templateUrl': '/applications/system/DesktopSettings/Views/desktop-settings.directive.html',
            'controller': 'desktopSettingsDirectiveController',
            'controllerAs': 'settingsCtrl',
            //'bindToController': {
             //   'fileModel': '=fileModel'
           // },
            'scope': true,
            'link': Link
        };

        function Link($scope, $element, $attr) {
            var model = $parse($attr.fileModel); // це твій атрибут
            var modelSetter = model.assign;
            $element.bind('change', function(){
                $scope.$apply(function(){
                    //var input = $element.find('input[type="file"]');
                    modelSetter($scope, $element[0].files[0]);
                });
            });
        }
    }

    Controller.$inject = ['$scope'];
    function Controller($scope) {

    }
})(angular);