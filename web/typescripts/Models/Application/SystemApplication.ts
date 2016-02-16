/// <reference path='../models.d.ts' />

module Kernel {
    export class SystemApplication extends Application {
        constructor(name:string, settings:ApplicationWindowSettings,processManager:IProcessManager) {
            super(name, settings, processManager);
            this.type = 'system';
        }
    }
}