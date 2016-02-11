/// <reference path="services.d.ts" />

module Kernel {
    export class FilesystemService {
        static $inject = ['$http', '$q'];

        constructor(private http:ng.IHttpService,
                    private q:ng.IQService) {
        }

        public getDir(dir) {
            return this.createPromise(dir);
        }

        public mkDir(dir) {
            return this.createPromise(dir);
        }

        public rmDir(dir) {
            return this.createPromise(dir);
        }

        public mvDir(dir, newdir) {
            return this.createPromise(dir);
        }

        public getFile(file) {
            return this.createPromise(file);
        }

        public saveFile(file) {
            return this.createPromise(file);
        }

        public mvFile(file, newfile) {
            return this.createPromise(file);
        }

        public rmFile(file) {
            return this.createPromise(file);
        }

        public mkFile(file) {
            return this.createPromise(file);
        }

        public createPromise(promise) {
            let defer = this.q.defer();
            //promise.success(public (promise) {
            defer.resolve(promise);
            //});

            return defer.promise;
        }

        public static Factory() {
            const service = ($http:ng.IHttpService, $q:ng.IQService) => new FilesystemService($http, $q);

            return service;
        }
    }
}