(function (angular) {
    angular.module('controllers').controller('applicationController', Controller);

    Controller.$inject = [
        '$scope',
        'spinnerService'
    ];

    function Controller($scope, spinner) {
        var self = this;
        this.spinner = spinner.getSpinner();

        $scope.$on('SpinnerActive', function () {
            self.spinner = true;
        });

        $scope.$on('SpinnerInactive', function () {
            self.spinner = false;
        });
    }
})(angular);