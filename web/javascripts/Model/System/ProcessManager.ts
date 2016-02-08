//module Kernel {
//    export class ProcessManager implements ProcessManagerInterface
//    {
//        private processList: Array<ProcessListItem> = [];
//        private processCount;
//
//        public addProcess(name: string, type: string, instance: Process): number {
//            let id = this.findFreeId();
//            let listItem = new ProcessListItem(id, instance);
//            this.processList.push(listItem);
//            this.processCount++;
//
//            return id;
//        }
//
//        public closeProcess(pid: number):boolean {
//            let closed = false;
//            let processIndex = this.findProcess(pid);
//            if (processIndex !== null) {
//                this.processList.splice(processIndex, 1);
//                closed = true;
//                this.processCount--;
//            }
//
//            return closed;
//        }
//
//        private findFreeId(): number {
//            let id: number = 0;
//            do { id++; } while (this.isIdClaimed(id) === true);
//
//            return id;
//        }
//
//        private findProcess(id: number):number {
//            let index = null;
//
//            for (let i = 0; i < this.processCount; i++) {
//                if (this.processList[i].id === id) {
//                    index = i; break;
//                }
//            }
//
//            return index;
//        }
//
//        private isIdClaimed(id: number): boolean {
//            let claimed:boolean = false;
//            for (let i = 0; i < this.processCount; i++) {
//                if (this.processList[i].id === id) {
//                    claimed = true; break;
//                }
//            }
//
//            return claimed;
//        }
//    }
//}