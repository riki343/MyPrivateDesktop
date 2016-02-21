/// <reference path='../models.d.ts' />

module Kernel {
    export class UserApplication extends Application{
        constructor(
            name:string, settings:ApplicationWindowSettings,
            processManager:IProcessManager, windowManger: WindowManager
        ) {
            super(name, settings, processManager, windowManger);
            this.type = 'user';
        }
    }
}