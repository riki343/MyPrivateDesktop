/// <reference path='services.d.ts' />

module Kernel {
    export class ProcessManagerService implements IProcessManager {
        private _processList: Array<ProcessListItem>;
        private _processCount;

        static $inject = ['$rootScope', '$window'];

        constructor (private rootScope: ng.IRootScopeService, private window: any) {
            this._processCount = 0;
            this._processList  = [];
        }

        public addProcess = (name: string, type: string, instance: Process): number => {
            let id = this.findFreeId();
            let listItem = new ProcessListItem(id, instance);
            this._processList.push(listItem);
            this._processCount++;
            instance.pid = id;
            this.rootScope.$broadcast('ProcessCreated', instance);

            return id;
        };

        public closeProcess = (pid: number):boolean => {
            let closed = false;
            let processIndex = this.findProcess(pid);
            if (processIndex !== null) {
                let item = this._processList[processIndex].process;
                this._processList.splice(processIndex, 1);
                closed = true;
                this._processCount--;
                this.rootScope.$broadcast('ProcessClosed', item);
            }

            return closed;
        };

        private findFreeId = (): number => {
            let id: number = 0;
            do { id++; } while (this.isIdClaimed(id) === true);

            return id;
        };

        private findProcess = (id: number):number => {
            let index = null;

            for (let i = 0; i < this._processCount; i++) {
                if (this._processList[i].id === id) {
                    index = i; break;
                }
            }

            return index;
        };

        private isIdClaimed = (id: number): boolean => {
            let claimed:boolean = false;
            for (let i = 0; i < this._processCount; i++) {
                if (this._processList[i].id === id) {
                    claimed = true; break;
                }
            }

            return claimed;
        };

        public static Factory() {
            const processManager = ($rootScope: ng.IRootScopeService, $window: any) => {
                if (angular.isDefined($window.processManager) === false) {
                    $window.processManager = new ProcessManagerService($rootScope, $window);
                }
                return $window.processManager;
            };

            return processManager;
        }

        get processList():Array<Kernel.ProcessListItem> {
            return this._processList;
        }

        get processCount() {
            return this._processCount;
        }
    }
}