module Kernel {
    export interface iDesktopItemsDirectiveAPI {
        changeCategory(category: string);
    }

    export interface iDesktopItems extends ng.IScope {
        API: iDesktopItemsDirectiveAPI;
        directory: iFolder;

        onReady(API: Object);
        onLaunch(pack: string);
    }

    export class DesktopItemsDirective implements ng.IDirective {
        public templateUrl = '/views/desktop-items.directive.html';
        public restrict = 'E';
        public scope = {
            'onReady':  '&',
            'onLaunch': '&'
        };

        private vm: iDesktopItems;

        constructor(private fs: FilesystemService) {}

        public link = ($scope: iDesktopItems, $element: ng.IRootElementService) => {
            this.vm = $scope;

            $scope.API = {
                changeCategory: this.changeCategory
            };

            $scope.onReady({'$API': $scope.API});
            this.changeCategory('Filesystem');
        };

        private changeCategory = (category: string) => {
            if (category === 'Filesystem') {
                this.loadRootDir();
            } else {
                this.loadSection(category);
            }
        };

        private loadRootDir = () => {
            let promise = this.fs.getRootDir();
            promise.success(this.handleSuccessPromise);
        };

        private loadSection = (section: string) => {
            let sectionDir: iFolder = null;
            let folders: Array<iFolder> = this.vm.directory.subdirs;
            for (let i = 0; i < folders.length; i++) {
                if (folders[i].name === section) {
                    sectionDir = folders[i]; break;
                }
            }

            let promise = this.fs.getDir(sectionDir.id);
            promise.success(this.handleSuccessPromise);
        };

        private handleSuccessPromise = (response: iFolder) => {
            this.vm.directory = response;
        };

        public static $inject:Array<string> = ['filesystemService'];
        public static Factory() {
            const factory = (
                filesystemService: FilesystemService
            ) => {
                return new DesktopItemsDirective(filesystemService);
            };

            return factory;
        }
    }
}