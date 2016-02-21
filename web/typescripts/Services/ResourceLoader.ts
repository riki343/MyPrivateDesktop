module Kernel {
    export class ResourceLoader {
        private scriptsContainer: JQuery;
        public static $inject = ['$document', '$q'];

        constructor(
            private document: ng.IDocumentService,
            private q: ng.IQService
        ) {
           this.scriptsContainer = this.document.find('div#application-scripts');
        }

        public load = (files: Array<string>) => {
            let defer = this.q.defer();

            if (files.length > 0) {
                let file = files[files.length - 1];
                let exploded = file.split('.');
                let extension = exploded[exploded.length - 1];
                let callback = () => {
                    files.pop();
                    let promise = this.load(files);
                    promise.then(() => { defer.resolve(); });
                };

                if (extension === 'js') {
                    yepnope.injectJs(file, callback);
                } else if (extension === 'css') {
                    yepnope.injectCss(file, callback);
                }
            } else {
                defer.resolve();
            }

            return defer.promise;
        };

        public unload = (script: string) => {
            angular.element('script[src="' + script + '"]').remove();
        };

        public static Factory() {
            const factory = ($document: ng.IDocumentService, $q: ng.IQService) => new ResourceLoader($document, $q);

            return factory;
        }
    }
}