module Kernel {
    export class WindowManager extends WindowContainer {
        public static $inject = ['$document', '$rootScope'];

        constructor(
            private document: ng.IDocumentService,
            private rootScope: ng.IRootScopeService
        ) {
            super();
        }

        public collapseWindow(pid: number) {
            let window = this.getWindow(pid);
            if (window !== null) {
                let wl = this.windowList;
                for (let i = 0; i < wl.length; i++) {
                    if (wl[i].pid === pid) {
                        if (wl[i].process.collapsed === true) {
                            // Check if window is maximized
                            let left = (wl[i].process.maximized === true)
                                ? 0 : wl[i].process.settings.windowBox.left;

                            wl[i].template.animate({'left': left + 'px'}, 550);
                            this.setActive(wl[i].pid);
                        } else {
                            let left = (wl[i].template.width() < 5000) ? wl[i].template.width() + 300 : 5000;
                            wl[i].template.animate({'left': -left + 'px'}, 550);
                        }

                        wl[i].process.collapsed = !wl[i].process.collapsed;

                        break;
                    }
                }
            }
        }

        public maximizeWindow = (pid: number) => {
            let window = this.getWindow(pid);
            if (window !== null) {
                if (window.process.maximized === true) {
                    window.process.maximized = false;
                    window.template.animate({
                        'height':  window.process.settings.windowBox.height  + 'px',
                        'width': window.process.settings.windowBox.width + 'px',
                        'top': window.process.settings.windowBox.top + 'px',
                        'left': window.process.settings.windowBox.left + 'px'
                    }, 550, () => {
                        this.rootScope.$broadcast('WindowStateChanged', window.pid);
                    });
                    window.template.removeClass('maximized');
                } else {
                    window.process.maximized = true;
                    window.template.animate({
                        'height': this.document.innerHeight() + 'px',
                        'width' : this.document.innerWidth() + 'px',
                        'top'   : '0',
                        'left'  : '0'
                    }, 550, () => {
                        this.rootScope.$broadcast('WindowStateChanged', window.pid);
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
                $rootScope: ng.IRootScopeService
            ) => new WindowManager($document, $rootScope);

            return factory;
        }
    }
}