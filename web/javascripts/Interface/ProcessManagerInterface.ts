/// <reference path='interfaces.d.ts' />

module Kernel {
    export interface ProcessManagerInterface
    {
        addProcess(name:string, type:string, instance:Process):number;
        closeProcess(pid:number):boolean;
    }
}