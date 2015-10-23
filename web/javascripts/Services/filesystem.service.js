(function (angular) {
    angular.module('services').factory('filesystemService', Service);

    Service.$inject = [ '$http', '$q' ];

    function Service($http, $q) {
        var self = this;

        var factory = {
            'getDir':   getDir,
            'mkDir':    mkDir,
            'rmDir':    rmDir,
            'mvDir':    mvDir,
            'getFile':  getFile,
            'saveFile': saveFile,
            'mvFile':   mvFile,
            'rmFile':   rmFile,
            'mkFile':   mkFile
        };

        return factory;

        function getDir (dir) {
            return createPromise(dir);
        }

        function mkDir (dir) {
            return createPromise(dir);
        }

        function rmDir (dir) {
            return createPromise(dir);
        }

        function mvDir (dir, newdir) {
            return createPromise(dir);
        }

        function getFile (file) {
            return createPromise(file);
        }

        function saveFile (file) {
            return createPromise(file);
        }

        function mvFile (file, newfile) {
            return createPromise(file);
        }

        function rmFile (file) {
            return createPromise(file);
        }

        function mkFile (file) {
            return createPromise(file);
        }

        function createPromise(promise) {
            var defer = $q.defer();
            //promise.success(function (promise) {
                defer.resolve(promise);
            //});

            return defer.promise;
        }
    }
})(angular);