module Kernel {
    export class WindowManager extends WindowContainer {
        public static $inject = ['$document'];

        constructor(private document: ng.IDocumentService) {
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

        public maximizeWindow(pid: number) {
            let window = this.getWindow(pid);
            if (window !== null) {
                if (window.process.maximized === true) {
                    window.process.maximized = false;
                    window.template.css('height', window.process.settings.windowBox.height + 'px');
                    window.template.css('width' , window.process.settings.windowBox.width + 'px');
                    window.template.css('top'   , window.process.settings.windowBox.top + 'px');
                    window.template.css('left'  , window.process.settings.windowBox.left + 'px');
                    window.template.removeClass('maximized');
                } else {
                    window.process.maximized = true;
                    window.template.css('height', this.document.innerHeight() + 'px');
                    window.template.css('width' , this.document.innerWidth() + 'px');
                    window.template.css('top'   , '0');
                    window.template.css('left'  , '0');
                    window.template.addClass('maximized');
                }
            }
        }

        public setActive(pid: number) {
            let window = this.getWindow(pid);
            if (window !== null) {
                angular.forEach(this.windowList, (item: WindowListItem) => {
                    if (item.process.active === true && item.pid !== pid) {
                        item.process.active = false;
                        item.template.css('z-index', '1001');
                        item.template.css('opacity', '0.95');
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
            const factory = ($document: ng.IDocumentService) => new WindowManager($document);

            return factory;
        }
    }
}