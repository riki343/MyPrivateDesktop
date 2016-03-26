module Kernel {
    export class FileExtensionRecognizerService {
        private extensions;
        static $inject = ['$http', '$window'];

        constructor(
            private http: ng.IHttpService
        ) {
            this.extensions = {};
        }

        public getExtensionsForDesktop = (desktop_id) => {
            let promise = this.http.get('/api/extensions-applications/list/' + desktop_id);
            promise.success((response) => {
                this.extensions = response;
            });
        };

        public getAppForExtension = (ext) => {
            if (angular.isDefined(this.extensions[ext]) === true) {
                return this.extensions[ext].application;
            } else {
                return null;
            }
        };

        public static Factory() {
            const factory = (
                $http: ng.IHttpService, $window
            ) => {
                if (angular.isDefined($window.FERService) === true) {
                    $window.FERService = new FileExtensionRecognizerService($http);
                }

                return $window.FERService;
            };

            return factory;
        }
    }
}