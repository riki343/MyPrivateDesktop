(function (angular) {
    angular.module('image-viewer').controller('imageViewerController', Controller);

    Controller.$inject = ['$rootScope'];

    function Controller($rootScope) {
        this.images = null;
        this.currentImage = null;

        if (angular.isDefined($rootScope.params) === true) {
            this.images = $rootScope.params.images;
            this.currentImage = $rootScope.params.image;
        }

        $rootScope.$on('$destroy', function() { $scope.$destroy() });
    }
})(angular);