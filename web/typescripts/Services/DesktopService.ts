/// <reference path='services.d.ts' />

module Kernel {
    import IRequestShortcutConfig = angular.IRequestShortcutConfig;
    export class DesktopService {
        private desktopID: number;
        public static $inject = ['$http', '$q', '$rootScope', '$window'];

        constructor(
            private http: ng.IHttpService,
            private q: ng.IQService,
            private rootScope: ng.IRootScopeService,
            private window: ng.IWindowService
        ) {
            this.desktopID = null;
        }

        public saveGrid (id: number, grid: Array<Array<DesktopItem>>) {
            let promise = this.http.put(Routing.generate('save-desktop-grid',
                { 'desktop_id': id }), grid
            );

            return this.handlePromise(promise);
        }

        public getDesktop = (id: number) => {
            this.desktopID = id;
            let promise = this.http.get(Routing.generate('get-desktop', { 'desktop_id': id }));
            return this.handlePromise(promise);
        };

        public saveSettings (desktopID: number, settings: DesktopSettings) {
            let promise = this.http.patch('/api/desktop/' + desktopID + '/settings', settings.getCss());
            return this.handlePromise(promise);
        }

        public changeBackground = (file) => {
            let formData = new FormData();
            formData.append('file', file);
            let promise = this.http.post(
                '/api/desktop/' + this.desktopID +'/settings/upload-image',
                formData, {
                    'transformRequest': angular.identity,
                    'headers': {'Content-Type': undefined}
                }
            );

            promise.success((response: any) => {
                this.rootScope.$broadcast('DesktopImageChanged', response.image);
            });

            return this.handlePromise(promise);
        };

        public changeBckFromGallery = (imgId: Number) => {
            let promise = this.http.get(Routing.generate('select-background-from-gallery', { 'img_id': imgId, 'desktop_id': this.desktopID }));

            promise.success((response: any) => {
                this.rootScope.$broadcast('DesktopImageChanged', response.image);
            });

            return this.handlePromise(promise);
        };

        private handlePromise(promise) {
            var defer = this.q.defer();
            promise.success(function (response) {
                defer.resolve(response);
            });

            return defer.promise;
        }

        public static Factory() {
            const desktopService = (
                $http: ng.IHttpService,
                $q: ng.IQService,
                $rootScope: ng.IRootScopeService,
                $window: any
            ) => {
                if (angular.isDefined($window.superScope.desktopService) === false) {
                    $window.superScope.desktopService = new DesktopService($http, $q, $rootScope, $window); // singleton
                }

                return $window.superScope.desktopService;
            };

            return desktopService;
        }
    }
}