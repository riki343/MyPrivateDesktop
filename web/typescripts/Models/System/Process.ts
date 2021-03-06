/// <reference path='../models.d.ts' />

module Kernel {
    export abstract class Process {
        private _type: string = 'base';
        private _name: string;
        private _pid: number;
        private _processManager: IProcessManager;

        constructor(name, processManager) {
            this._name = name;
            this._processManager = processManager;
        }

        public close = (): void => {
            this._processManager.closeProcess(this._pid);
        };

        public run = (): void => {
            this._pid = this._processManager.addProcess(this._name, this._type, this);
        };

        get type():string {
            return this._type;
        }

        get name():string {
            return this._name;
        }

        get pid():number {
            return this._pid;
        }

        set pid(value:number) {
            this._pid = value;
        }

        get processManager():IProcessManager {
            return this._processManager;
        }

        set type(value:string) {
            this._type = value;
        }
    }
}