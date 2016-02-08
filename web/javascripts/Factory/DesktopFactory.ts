/// <reference path='factories.d.ts' />

module Kernel {
    angular.module('kernel').factory('Desktop', DesktopService.Factory());

    export class Desktop {
        private _id: number;
        private _userId: number;
        private _grid: Array<Array<DesktopItem>>;
        private _settings: Array<any>;
        private _created;
        private _updated;

        get id():number {
            return this._id;
        }

        get userId():number {
            return this._userId;
        }

        get grid():Array<Array<Kernel.DesktopItem>> {
            return this._grid;
        }

        get settings():Array<any> {
            return this._settings;
        }

        get created() {
            return this._created;
        }

        get updated() {
            return this._updated;
        }

        constructor(data?:any) {
            if (angular.isDefined(data)) {
                this._id = data.id;
                this._userId = data.userId;
                this._grid = data.grid;
                this._settings = data.settings;
                this._created = data.created;
                this._updated = data.updated;
            } else {
                this._id = 0;
                this._userId = 0;
                this._grid = [];
                this._settings = [];
                this._created = new Date();
                this._updated = new Date();
            }
        }
    }

    export class DesktopService {
        constructor(private http: ng.IHttpService, private q: ng.IQService) {}

        public saveGrid (id: number, grid: Array<Array<DesktopItem>>) {
            var promise = this.http.put(Routing.generate('save-desktop-grid',
                { 'desktop_id': id }), grid
            );

            return this.handlePromise(promise);
        }

        public get (id: number) {
            var promise = this.http.get(Routing.generate('get-desktop', { 'desktop_id': id }));
            return this.handlePromise(promise);
        };

        private handlePromise(promise) {
            var defer = this.q.defer();
            promise
                .success(function (response) {
                    defer.resolve(response);
                })
                .error(function () {
                    defer.resolve(null);
                })
            ;

            return defer.promise;
        }

        public static Factory() {
            const desktopService = ($http: ng.IHttpService, $q: ng.IQService) => new DesktopService($http, $q);
            desktopService.$inject = ['$http', '$q'];

            return desktopService;
        }
    }
}