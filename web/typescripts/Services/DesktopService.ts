/// <reference path='services.d.ts' />

module Kernel {
    export class DesktopService {
        public static $inject = ['$http', '$q'];

        constructor(private http: ng.IHttpService, private q: ng.IQService) {}

        public saveGrid (id: number, grid: Array<Array<DesktopItem>>) {
            var promise = this.http.put(Routing.generate('save-desktop-grid',
                { 'desktop_id': id }), grid
            );

            return this.handlePromise(promise);
        }

        public getDesktop (id: number) {
            var promise = this.http.get(Routing.generate('get-desktop', { 'desktop_id': id }));
            return this.handlePromise(promise);
        };

        private handlePromise(promise) {
            var defer = this.q.defer();
            promise
                .success(function (response) {
                    defer.resolve(response);
                })
            ;

            return defer.promise;
        }

        public static Factory() {
            const desktopService = ($http: ng.IHttpService, $q: ng.IQService) => new DesktopService($http, $q);

            return desktopService;
        }
    }
}