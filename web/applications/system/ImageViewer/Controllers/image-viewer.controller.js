(function (angular) {
    angular.module('image-viewer').controller('imageViewerController', Controller);

    Controller.$inject = ['$rootScope'];

    function Controller($rootScope) {
        this.directory = null;
        this.image = null;

        if (angular.isDefined($rootScope.params) === true) {
            this.directory = $rootScope.params.directory;
            this.image = $rootScope.params.file;
        }

        $rootScope.$on('$destroy', function() { $scope.$destroy() });
    }
})(angular);