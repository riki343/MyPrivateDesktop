/// <reference path='services.d.ts' />

module Kernel {
    import IRequestShortcutConfig = angular.IRequestShortcutConfig;
    export class DesktopService {
        public static $inject = ['$http', '$q', '$rootScope'];

        constructor(
            private http: ng.IHttpService,
            private q: ng.IQService,
            private rootScope: ng.IRootScopeService
        ) {}

        public saveGrid (id: number, grid: Array<Array<DesktopItem>>) {
            let promise = this.http.put(Routing.generate('save-desktop-grid',
                { 'desktop_id': id }), grid
            );

            return this.handlePromise(promise);
        }

        public getDesktop (id: number) {
            var promise = this.http.get(Routing.generate('get-desktop', { 'desktop_id': id }));
            return this.handlePromise(promise);
        };

        public saveSettings (desktopID: number, settings: DesktopSettings) {
            let promise = this.http.patch('/desktop/' + desktopID + '/settings', settings.getCss());
            return this.handlePromise(promise);
        }

        public changeBackground(file) {
            let formData = new FormData();
            formData.append('file', file);
            let promise = this.http.patch(
                '/desktop/settings/upload-image',
                formData, {
                    'transformRequest': angular.identity,
                    'headers': {'Content-Type': undefined}
                }
            );

            promise.then((response: any) => {
                this.rootScope.$broadcast('DesktopImageChanged', response.image);
            });

            return this.handlePromise(promise);
        }

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
                $rootScope: ng.IRootScopeService
            ) => new DesktopService($http, $q, $rootScope);

            return desktopService;
        }
    }
}