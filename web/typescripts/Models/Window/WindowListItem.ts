module Kernel {
    export class WindowListItem {
        constructor(
            public pid: number,
            public template: JQuery,
            public process: Application,
            public applicationPackage: IApplicationPackage
        ) {}
    }
}