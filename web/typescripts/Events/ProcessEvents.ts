/// <reference path='events.d.ts' />

module Kernel {
    export class ProcessClosedEvent
    {
        private _pid: number;

        constructor(id: number) {
            this._pid = id;
        }

        get pid(): number {
            return this._pid;
        }
    }
}