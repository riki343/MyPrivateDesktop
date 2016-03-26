module Kernel {
    export interface iDesktopItemsDirectiveAPI {
        changeCategory(category: string);
        loadDirectory(dir_id: number);
    }

    export interface iDesktopItems extends ng.IScope {
        API: iDesktopItemsDirectiveAPI;
        directory: iFolder;
        rootDirectory: iFolder;

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

        constructor(
            private fs: FilesystemService,
            private fer: FileExtensionRecognizerService
        ) {}

        public link = ($scope: iDesktopItems, $element: ng.IRootElementService) => {
            this.vm = $scope;

            $scope.API = {
                changeCategory: this.changeCategory,
                loadDirectory: this.loadDir
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
            promise.success((response: iFolder) => {
                this.vm.directory = response;
                this.vm.rootDirectory = response;
            });
        };

        private loadSection = (section: string) => {
            let sectionDir: iFolder = null;
            let folders: Array<iFolder> = this.vm.rootDirectory.subdirs;
            for (let i = 0; i < folders.length; i++) {
                if (folders[i].name === section) {
                    sectionDir = folders[i]; break;
                }
            }

            let promise = this.fs.getDir(sectionDir.id);
            promise.success(this.handleSuccessPromise);
        };

        public loadDir = (dir_id: number) => {
            let promise = this.fs.getDir(dir_id);
            promise.success((response: iFolder) => {
                this.vm.directory = response;
            });
        };

        private handleSuccessPromise = (response: iFolder) => {
            this.vm.directory = response;
        };

        public static $inject:Array<string> = ['filesystemService', 'FERService'];
        public static Factory() {
            const factory = (
                filesystemService: FilesystemService, FERService: FileExtensionRecognizerService
            ) => {
                return new DesktopItemsDirective(filesystemService, FERService);
            };

            return factory;
        }
    }
}