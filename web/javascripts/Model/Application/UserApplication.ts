/// <reference path='../models.d.ts' />

module Kernel {
    export class UserApplication extends Application{
        constructor(name:string, settings:ApplicationWindowSettings,processManager:ProcessManager) {
            super(name, settings, processManager);
            this.type = 'user';
        }
    }
}