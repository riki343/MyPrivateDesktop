module Kernel {
    export class WindowContainer {
        public windowList: Array<WindowListItem>;

        constructor() {
            this.windowList = [];
        }

        public addWindow (window: WindowListItem) {
            this.windowList.push(window);
        }

        public removeWindow(pid: number) {
            let index = this.findByPid(pid);
            if (index !== null) {
                this.windowList.splice(index, 1);
            }
        }

        public getWindow(pid: number): WindowListItem {
            let index = this.findByPid(pid);
            if (index !== null) {
                return this.windowList[index];
            } else {
                return null;
            }
        }

        protected findByPid(pid: number): number {
            let wl = this.windowList;
            let index = null;
            for (let i = 0; i < wl.length; i++) {
                if (wl[i].pid === pid) {
                    index = i; break;
                }
            }

            return index;
        }
    }
}