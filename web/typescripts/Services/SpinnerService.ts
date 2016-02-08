/// <reference path='services.d.ts' />

module Kernel {
    export class SpinnerService {
        private spinner: boolean = false;
        private promises: Array<any> = [];
        public static $inject: Array<string> = ['$rootScope'];

        constructor(private rootScope: ng.IRootScopeService) {
            rootScope.$broadcast('SpinnerInactive');
        }

        public getSpinner() {
            return this.spinner;
        }

        public addPromise(promise) {
            if (this.spinner === false) {
                this.spinner = true;
                this.rootScope.$broadcast('SpinnerActive');
            }

            this.promises.push(promise);
            promise.then(() => {
                this.promises.splice(this.promises.indexOf(promise), 1);
                if (this.promises.length === 0) {
                    this.spinner = false;
                    this.rootScope.$broadcast('SpinnerInactive');
                }
            });
        }

        public static Factory() {
            const spinner = ($rootScope: ng.IRootScopeService) => new SpinnerService($rootScope);

            return spinner;
        }
    }
}