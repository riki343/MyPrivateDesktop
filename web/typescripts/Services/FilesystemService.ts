/// <reference path="services.d.ts" />

module Kernel {
    export class FilesystemService {
        static $inject = ['$http', '$q'];

        constructor(
            private http:ng.IHttpService,
            private q:ng.IQService
        ) {}

        public getDir(id: number) {
            return this.http.get('/api/filesystem/directory/' + id);
        }

        public getRootDir() {
            return this.http.get('/api/filesystem/directory');
        }

        public mkDir(parent_id: number, dir: string) {
            return this.http.put('/api/filesystem/directory/' + parent_id, {
                'name': dir
            });
        }

        public uploadFiles(files: FileList) {
            let formData = new FormData();
            for (var i = 0; i < files.length; i++) {
                formData.append("file" + i, files[i]);
            }
            let promise = this.http.post(
                '/api/filesystem/file/' + 1,
                formData, {
                    'transformRequest': angular.identity,
                    'headers': {'Content-Type': undefined}
                }
            );

            return promise;
        }

        private handlePromise(promise) {
            var defer = this.q.defer();
            promise.success(function (response) {
                defer.resolve(response);
            });

            return defer.promise;
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