module Kernel {
    export class ApplicationLauncher
    {
        private applicationLayer: JQuery;
        public static $inject = [
            '$http', 'processManagerService', '$document',
            '$rootScope', 'resourceLoaderService', 'windowManagerService'
        ];

        constructor(
            private http: ng.IHttpService,
            private processManager: IProcessManager,
            private document: ng.IDocumentService,
            private rootScope: IRootScope,
            private resourceLoader: ResourceLoader,
            private windowManager: WindowManager
        ) {
            // Register events
            this.rootScope.$on('ProcessClosed', this.onApplicationClosed);
            this.applicationLayer = this.document.find('div#applications-layer');
        }

        public launchApplication = (pack: string, params?: any): void => {
            // Get app package
            let promise = this.http.get(pack);
            // Handle response
            promise.success((response: IApplicationPackage) => {
                this.bootstrap(response, params);
            });
        };

        public bootstrap = (response: IApplicationPackage, params?: any) => {
            let windowBox = new WindowBox(
                response.settings.top, response.settings.left,
                response.settings.width, response.settings.height
            );
            // Create application settings
            let appSettings = new ApplicationWindowSettings(windowBox);
            // Create instance of System app
            let application = new SystemApplication(
                response.module.name, appSettings,
                this.processManager, this.windowManager
            );
            // Compile application template
            let compiledTemplate = application.window = this.compileTemplate(application);
            // Merge arrays with application files
            let files = response.stylesheet.concat(response.javascript);
            // Load module files
            let promise = this.loadModule(response.folder, response.module, files);

            promise.then(() => {
                // Add application to process manager
                application.runProcess();
                compiledTemplate.attr('id', 'application-' + application.pid);

                // Bootstrap new angular module
                let app = angular.bootstrap(compiledTemplate, [response.module.name]);

                let appScope: any = app.get('$rootScope');
                // Define application standard events
                this.defineWindowEvents(appScope, application);
                if (angular.isDefined(params) === true) {
                    appScope.params = params;
                }

                // Register window in window manager
                let listItem = new WindowListItem(
                    application.pid, compiledTemplate,
                    application, response
                );
                this.windowManager.addWindow(listItem);

                // Make application active
                this.windowManager.setActive(application.pid);

                this.rootScope.$broadcast('WindowCreated', listItem);
            });
        };

        public loadModule = (folder: string, module: IModuleMainFile, files: Array<IModuleFile>) => {
            // Extract files that need to load
            let basePath = 'http://desktop.dev/applications/system/' + folder + '/';
            let filesToLoad = [];
            for (let i = 0; i < files.length; i++) {
                filesToLoad.push(basePath + files[i].file);
            }
            filesToLoad.push(basePath + module.file);

            // Load application files
            return this.resourceLoader.load(filesToLoad);
        };

        public compileTemplate = (application: Application): JQuery => {
            let appContainer = angular.element(application.template);
            // Create new application container
            var container = angular.element('<div></div>');

            // Add attributes
            container.attr('ui-view', application.name);
            container.attr('class', application.name + '-main');
            container.addClass('application-window');
            container.css('height', application.settings.windowBox.height - 25 + 'px');
            container.css('z-index', '1010');
            container.css('position', 'relative');
            appContainer.append(container);

            // Append template to div#applications-layer
            this.applicationLayer.append(appContainer);

            return appContainer;
        };

        public defineWindowEvents = ($rootScope, application: Application): void => {
            // Define application close event
            $rootScope.close = application.closeProcess;
            // Define mouse events to move application
            $rootScope.onMouseDown = application.onMouseDown;
            this.document.on('mousemove', (event: DragEvent) => {
                application.onMouseMove(event);
                application.onMouseMoveOnMe(event);
            });
            this.document.on('mouseup', (event: DragEvent) => {
                application.onMouseUp(event);
                application.onMouseUpResize(event);
            });

            $rootScope.maximize   = application.maximize;
            $rootScope.collapse   = application.collapse;
            $rootScope.makeActive = application.makeActive;
            $rootScope.onMouseDownResize = application.onMouseDownResize;
            application.$scope = $rootScope;
            $rootScope.process = application;
        };


        // *************** EVENTS ***************
        private onApplicationClosed = (event: any, data: Application) => {
            // Find Window Process
            let windowProcess = this.windowManager.getWindow(data.pid);
            if (windowProcess !== null) {
                // Remove window if exist
                windowProcess.template.remove();

                // Destroy application scope
                windowProcess.process.$scope.$destroy();

                // Delete window from window list
                this.windowManager.removeWindow(data.pid);

                // Broadcast event that window destroyed
                this.rootScope.$broadcast('WindowClosed', windowProcess);
            }
        };


        public static Factory() {
            const factory = (
                $http: ng.IHttpService,
                processManagerService: IProcessManager,
                $document: ng.IDocumentService,
                $rootScope: IRootScope,
                resourceLoaderService: ResourceLoader,
                windowManagerService: WindowManager
            ) => new ApplicationLauncher(
                $http, processManagerService, $document,
                $rootScope, resourceLoaderService, windowManagerService
            );

            return factory;
        }
    }
}