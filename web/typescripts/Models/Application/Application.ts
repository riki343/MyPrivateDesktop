/// <reference path='../models.d.ts' />

module Kernel {
    export abstract class Application extends Process
    {
        protected _template: string;
        protected _settings: ApplicationWindowSettings;
        private _$scope: any;
        private _prevX: number;
        private _prevY: number;
        private _isDrags: boolean;
        private _window: JQuery;
        private _maximized: boolean;
        private _collapsed: boolean;
        private _active   : boolean;
        private parentClose: Function;

        constructor(
            name: string, settings: ApplicationWindowSettings,
            processManager: IProcessManager,
            private windowManager: WindowManager
        ) {
            super(name, processManager);
            this._settings = settings;
            this._template = this.createTemplate(settings);
            this._collapsed = false;
            this._maximized = false;
            this._active    = true;
        }

        public collapse = () => { this.windowManager.collapseWindow(this.pid); };
        public maximize = () => { this.windowManager.maximizeWindow(this.pid); };
        public makeActive = () => { this.windowManager.setActive(this.pid); };

        public onMouseDown = (e: DragEvent) => {
            if (e.which === 1 && this.maximized === false) {
                this.prevX = e.pageX;
                this.prevY = e.pageY;
                this.isDrags = true;
            }
        };

        public onMouseMove = (e: DragEvent) => {
            if (this.isDrags === true && e.which === 1) {
                this.settings.windowBox.left += e.pageX - this.prevX;
                this.settings.windowBox.top  += e.pageY - this.prevY;

                this.window.css('left', this.settings.windowBox.left);
                this.window.css('top', this.settings.windowBox.top);

                this.prevX = e.pageX;
                this.prevY = e.pageY;
            }
        };

        public onResize = (e, data) => {
            if (data === this.pid) {
                let view = this.window.find('div.application-window');
                view.css('height', this.window.height() - 25 + 'px');
            }
        };

        public onMouseUp = (e: DragEvent) => {
            this.isDrags = false;
        };

        private createTemplate = (settings: ApplicationWindowSettings): string => {
            return [
                '<div style="color: ' +settings.header.textColor +'; ' +
                    'top: '+ settings.windowBox.top + 'px; ' +
                    'left: ' + settings.windowBox.left +'px; ' +
                    'width: ' + settings.windowBox.width + 'px;' +
                    'height: ' + settings.windowBox.height + 'px;"' +
                    'class="no-select application"' +
                    'ng-mousedown="makeActive();">',
                        '<p class="application-header" style="background-color: ' + settings.header.bgColor + ';" ng-mousedown=\"onMouseDown($event);\">',
                            '<span class="menu-button" ng-click="close();"><i class="fa fa-close fa-fw"></i></span>',
                            '<span class="menu-button" ng-click="maximize();"><i class="fa fa-windows fa-fw"></i></span>',
                            '<span class="menu-button" ng-click="collapse();"><i class="fa fa-minus fa-fw"></i></span>',
                        '</p>',
                '</div>'
            ].join('');
        };

        public closeProcess = (): void => {
            this.window.animate({
                'height': '0px'
            }, 450, 'linear', () => {
                this.close();
            });
        };

        public runProcess = () => {
            this.run();
        };

        get template():string {
            return this._template;
        }

        set template(value:string) {
            this._template = value;
        }

        get settings():Kernel.ApplicationWindowSettings {
            return this._settings;
        }

        set settings(value:Kernel.ApplicationWindowSettings) {
            this._settings = value;
        }

        get $scope():any {
            return this._$scope;
        }

        set $scope(value:any) {
            this._$scope = value;
        }

        get prevX():number {
            return this._prevX;
        }

        set prevX(value:number) {
            this._prevX = value;
        }

        get prevY():number {
            return this._prevY;
        }

        set prevY(value:number) {
            this._prevY = value;
        }

        get isDrags():boolean {
            return this._isDrags;
        }

        set isDrags(value:boolean) {
            this._isDrags = value;
        }

        get window():JQuery {
            return this._window;
        }

        set window(value:JQuery) {
            this._window = value;
        }

        get maximized():boolean {
            return this._maximized;
        }

        set maximized(value:boolean) {
            this._maximized = value;
        }

        get collapsed():boolean {
            return this._collapsed;
        }

        set collapsed(value:boolean) {
            this._collapsed = value;
        }

        get active():boolean {
            return this._active;
        }

        set active(value:boolean) {
            this._active = value;
        }
    }
}