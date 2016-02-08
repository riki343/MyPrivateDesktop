(function (angular) {
    angular.module('services').factory('ProcessManager', Service);

    Service.$inject = ['$rootScope'];

    function Service($rootScope) {
        var self = this;
        this.processes = [];

        var factory = {
            'launch': function (app) {
                $rootScope.$broadcast('NewAppLaunch', app)
            },

            'addProcess': function (process, user, index) {
                var newProcess = { 'pid': null, 'name': process, 'user': user, 'index': index };
                var pid = 0;
                while (true) {
                    var notFound = true;
                    for (var i in self.processes) {
                        if (self.processes[i].pid === pid) {
                            notFound = false;
                            break;
                        }
                    }

                    if (notFound === true) {
                        newProcess.pid = pid;
                        self.processes.push(newProcess);
                        break;
                    } else {
                        pid++;
                    }
                }

                $rootScope.$broadcast('ProcessCreated', newProcess);
                return pid;
            },
            'closeProcess': function (pid) {
                var found = false;
                for (var i in self.processes) {
                    if (self.processes[i].pid === pid) {
                        found = true;
                        $rootScope.$broadcast('ProcessClosed', self.processes[i]);
                        self.processes.splice(self.processes.indexOf(self.processes[i]), 1);
                        break;
                    }
                }
            }
        };
        return factory;
    }
})(angular);