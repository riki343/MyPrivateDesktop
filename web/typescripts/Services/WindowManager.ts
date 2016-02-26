module Kernel {
    export class WindowManager extends WindowContainer {
        private _document: ng.IDocumentService;
        private _rootScope: ng.IRootScopeService;
        private magnifyContainer: JQuery;

        public static $inject = ['$document', '$rootScope', '$window'];

        constructor(document: ng.IDocumentService, rootScope: ng.IRootScopeService, private window: ng.IWindowService) {
            super();

            this._document = document;
            this._rootScope = rootScope;
            this.magnifyContainer = document.find('#magnify-container');
        }

        public appendMagnifyArea = (area: JQuery) => {
            this.magnifyContainer.append(area);
        };

        public checkPosition = (process: Application, mouseX: number, mouseY: number) => {
            let magnification = null;
            if (this.isLeft(mouseX) === true) {
                magnification = 'left';
            } else if (this.isRight(mouseX) === true) {
                magnification = 'right';
            } else if (this.isTop(mouseY) === true) {
                magnification = 'top';
            }

            if (magnification !== null) {
                if (magnification === 'left' || magnification === 'right') {
                    let width = this.window.innerWidth / 2;
                    let height = this.window.innerHeight;
                    process.createMagnifyRegion(width, height, magnification, true);
                } else {
                    let width = this.window.innerWidth;
                    let height = this.window.innerHeight;
                    process.createMagnifyRegion(width, height, magnification, false);
                }
            }

            return magnification;
        };

        public maximizeWindow = (pid: number, top?: number, left?: number) => {
            let window = this.getWindow(pid);
            if (window !== null) {
                if (window.process.maximized === true) {
                    window.process.maximized = false;
                    snabbt(window.template, {
                        'position': [window.process.settings.windowBox.left, window.process.settings.windowBox.top, 0],
                        'height':  window.process.settings.windowBox.height,
                        'fromHeight': this.document.innerHeight(),
                        'width': window.process.settings.windowBox.width,
                        'fromWidth': this.document.innerWidth(),
                        'duration': 550,
                        'allDone': () => {
                            window.process.onResize();
                            window.process.settings.windowBox.top = top;
                            window.process.settings.windowBox.left = left;
                        }
                    });
                    window.template.removeClass('maximized');
                } else {
                    window.process.maximized = true;
                    snabbt(window.template, {
                        'position': [-window.process.settings.windowBox.left, -window.process.settings.windowBox.top, 0],
                        'fromHeight': window.process.settings.windowBox.height,
                        'height':  this.document.innerHeight(),
                        'fromWidth': window.process.settings.windowBox.width,
                        'width': this.document.innerWidth(),
                        'duration': 550,
                        'allDone': () => {
                            window.process.onResize();
                        }
                    });
                    window.template.addClass('maximized');
                }
            }
        };

        public setActive(pid: number) {
            let window = this.getWindow(pid);
            if (window !== null) {
                angular.forEach(this.windowList, (item: WindowListItem) => {
                    if (item.process.active === true && item.pid !== pid) {
                        item.process.active = false;
                        item.template.css('z-index', '1001');
                        item.template.css('opacity', '0.9');
                    }

                    if (item.pid === pid) {
                        item.process.active = true;
                        item.template.css('z-index', '1010');
                        item.template.css('opacity', '1.0');
                    }
                });
            }
        }

        public static Factory() {
            const factory = (
                $document: ng.IDocumentService,
                $rootScope: ng.IRootScopeService,
                $window: ng.IWindowService
            ) => new WindowManager($document, $rootScope, $window);

            return factory;
        }

        public getWindowDimensions = () => {
            return {
                'width': this.window.innerWidth,
                'height': this.window.innerHeight,
            };
        };

        private isLeft = (x: number) => {
            return x < 4;
        };

        private isRight = (x: number) => {
            return x > this.window.innerWidth - 4;
        };

        private isBottom = (y: number) => {
            return y > this.window.innerHeight - 4;
        };

        private isTop = (y: number) => {
            return y < 4;
        };

        get document():ng.IDocumentService {
            return this._document;
        }

        set document(value:ng.IDocumentService) {
            this._document = value;
        }

        get rootScope():ng.IRootScopeService {
            return this._rootScope;
        }

        set rootScope(value:ng.IRootScopeService) {
            this._rootScope = value;
        }
    }
}