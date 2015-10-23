(function (angular) {
    angular.module('services').factory('ProcessManager', Service);

    Service.$inject = [];

    function Service() {
        var self = this;
        this.processes = [];

        var factory = {
            'addProcess': function (process) {

            },
            'closeProcess': function (pid) {

            }
        };
        return factory;
    }
})(angular);