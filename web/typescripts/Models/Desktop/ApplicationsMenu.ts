module Kernel {
    export class ApplicationsMenu
    {
        private packageList: UniqueList<string>;

        constructor(
            packages: Array<string>,
            private appLauncher: ApplicationLauncher
        ) {
            this.packageList = new UniqueList(packages);
        }

        public launch = (item: string) => {
            this.appLauncher.launchApplication(item);
        };

        public addApplication = (item: string) => {
            this.packageList.add(item);
        };

        public removeApplication = (item: string) => {
            this.packageList.remove(item);
        };
    }
}