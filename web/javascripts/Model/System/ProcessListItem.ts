module Kernel {
    export class ProcessListItem {
        private _id: number;
        private _process: Process;

        constructor(id: number, process: Process) {
            this._id = id;
            this._process = process;
        }


        get id():number {
            return this._id;
        }

        set id(value:number) {
            this._id = value;
        }

        get process():Process {
            return this._process;
        }

        set process(value:Process) {
            this._process = value;
        }
    }
}