/// <reference path='../models.d.ts' />

module Kernel {
    export abstract class Application extends Process
    {
        private _template: string;
        private _settings: ApplicationWindowSettings;

        constructor(name: string, settings: ApplicationWindowSettings, processManager: ProcessManager) {
            super(name, processManager);
            this._settings = settings;
            this._template = Application.createTemplate(settings);
        }

        static createTemplate(settings: ApplicationWindowSettings): string {
            return '<div style="background-color: white; color: '+ settings.header.textColor +'; overflow: hidden;" class="no-select" ng-mousedown="selectDirective();">' +
                '<p style=\"background-color: ' + settings.header.bgColor + '; height: 23px; width: 100%; margin: 0; display: table; cursor: pointer; padding: 0 5px;\" '+
                'ng-mousedown=\"down($event);\">' +
                '<span class="menu-button" ng-click="closeProcess();"><i class="fa fa-close fa-fw"></i></span>' +
                '<span class="menu-button" ng-click="toggleFullscreen();"><i class="fa fa-windows fa-fw"></i></span>' +
                '<span class="menu-button" ng-click="collapse();"><i class="fa fa-minus fa-fw"></i></span>' +
                '</p>' +
                '</div>';
        }

        get template():string {
            return this._template;
        }

        set template(value:string) {
            this._template = value;
        }

        get settings():ApplicationWindowSettings {
            return this._settings;
        }

        set settings(value:ApplicationWindowSettings) {
            this._settings = value;
        }
    }
}