(function (angular) {
    angular.module('services').factory('spinnerService', Service);

    Service.$inject = [ '$rootScope' ];

    function Service($rootScope) {
        var self = this;
        this.promises = [];
        this.spinner = false;

        var factory = {
            'getSpinner': getSpinner,
            'addPromise': addPromise
        };

        $rootScope.$broadcast('SpinnerInactive');

        return factory;

        function getSpinner() {
            return self.spinner;
        }

        function addPromise (promise) {
            if (self.spinner === false) {
                self.spinner = true;
                $rootScope.$broadcast('SpinnerActive');
            }
            self.promises.push(promise);
            promise.then(function () {
                self.promises.splice(self.promises.indexOf(promise), 1);
                if (self.promises.length === 0) {
                    self.spinner = false;
                    $rootScope.$broadcast('SpinnerInactive');
                }
            });
        }
    }
})(angular);