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
        private _isCursorModified: boolean;
        private _isResizing: boolean;
        private _resizeType: string;

        constructor(
            name: string, settings: ApplicationWindowSettings,
            processManager: IProcessManager,
            private windowManager: WindowManager
        ) {
            super(name, processManager);
            this._settings  = settings;
            this._template  = this.createTemplate(settings);
            this._collapsed = false;
            this._maximized = false;
            this._active    = true;
            this.isCursorModified = false;
            this.isResizing = false;
        }

        public collapse   = () => { this.windowManager.collapseWindow(this.pid); };
        public maximize   = () => { this.windowManager.maximizeWindow(this.pid); };
        public makeActive = () => { this.windowManager.setActive(this.pid); };

        public onMouseDown = (e: DragEvent) => {
            if (e.which === 1 && this.maximized === false &&
                this.isCursorModified === false && this.isResizing === false)
            {
                this.prevX   = e.pageX;
                this.prevY   = e.pageY;
                this.isDrags = true;
            }
        };

        public onMouseDownResize = (e: DragEvent) => {
            if (this.active === true) {
                this.isResizing = true;
                this.resizeType = this.detectArea(e.clientX, e.clientY);
            }
        };

        public onMouseUpResize = (e: DragEvent) => {
            if (this.active === true) {
                this.isResizing = false;
                this.resizeType = null;
            }
        };

        public onMouseMoveOnMe = (e: DragEvent) => {
            if (this.maximized === false) {
                let area = this.detectArea(e.clientX, e.clientY);
                if (this.isResizing === false) {
                    if (area !== null) {
                        this.window.css('cursor', area);
                        this.isCursorModified = true;
                    } else if (this.isCursorModified === true) {
                        this.window.css('cursor', 'default');
                        this.isCursorModified = false;
                    }
                } else if (this.isResizing === true) {
                    console.log(this.resizeType);
                    if (this.resizeType === 'w-resize') { // left
                        let diffX = e.clientX - this.settings.windowBox.left;
                        this.settings.windowBox.left += diffX;
                        this.settings.windowBox.width -= diffX;
                        this.resizeWidth(this.settings.windowBox.left, this.settings.windowBox.width);
                    } else if (this.resizeType === 'e-resize') { // right
                        this.settings.windowBox.width +=
                            e.clientX - (this.settings.windowBox.left + this.settings.windowBox.width);
                        this.resizeWidth(this.settings.windowBox.left, this.settings.windowBox.width);
                    } else if (this.resizeType === 's-resize') { // bottom
                        this.settings.windowBox.height +=
                            e.clientY - (this.settings.windowBox.top + this.settings.windowBox.height);
                        this.resizeHeight(this.settings.windowBox.top, this.settings.windowBox.height);
                    } else if (this.resizeType === 'n-resize') { // top
                        let diffY = e.clientY - this.settings.windowBox.top;
                        this.settings.windowBox.top += diffY;
                        this.settings.windowBox.height -= diffY;
                        this.resizeHeight(this.settings.windowBox.top, this.settings.windowBox.height);
                    }

                    this.windowManager.rootScope.$broadcast('WindowStateChanged', this);
                }
            }
        };

        private resizeHeight = (top: number, height: number) =>  {
            if (this.settings.windowBox.height > 80 || height > this.settings.windowBox.height) {
                this.window.css('top', top + 'px');
                this.window.css('height', height + 'px');
            }
        };

        private resizeWidth = (left: number, width: number) => {
            if (this.settings.windowBox.width > 80 || width > this.settings.windowBox.width) {
                this.window.css('left', left + 'px');
                this.window.css('width', width + 'px');
            }
        };

        private detectArea = (x: number, y: number): string => {
            let minX = this.settings.windowBox.left;
            let maxX = this.settings.windowBox.left + this.settings.windowBox.width;
            let minY = this.settings.windowBox.top;
            let maxY = this.settings.windowBox.top + this.settings.windowBox.height;

            if (x >= minX - 2 && x < minX + 6) {
                return 'w-resize';
            } else if (x <= maxX + 2 && x >= maxX - 6) {
                return 'e-resize';
            } else if (y <= maxY + 2 && y >= maxY - 6) {
                return 's-resize';
            } else if (y >= minY - 2 && y <= minY + 6) {
                return 'n-resize';
            } else {
                return null;
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
                "<div style=\"color: " + settings.header.textColor +"; " +
                    "top: " + settings.windowBox.top + "px; " +
                    "left: " + settings.windowBox.left +"px; " +
                    "width: " + settings.windowBox.width + "px;" +
                    "height: " + settings.windowBox.height + "px;\"" +
                    "class=\"no-select application\"" +
                    "ng-mousedown=\"makeActive(); onMouseDownResize($event);\">",
                        '<p class="application-header" style="background-color: ' + settings.header.bgColor +';" ' +
                        'ng-mousedown=\"onMouseDown($event);\">',
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

        get isCursorModified():boolean {
            return this._isCursorModified;
        }

        set isCursorModified(value:boolean) {
            this._isCursorModified = value;
        }

        get isResizing():boolean {
            return this._isResizing;
        }

        set isResizing(value:boolean) {
            this._isResizing = value;
        }

        get resizeType():string {
            return this._resizeType;
        }

        set resizeType(value:string) {
            this._resizeType = value;
        }
    }
}