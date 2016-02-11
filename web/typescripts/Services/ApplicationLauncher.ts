module Kernel {
    export class ApplicationLauncher
    {
        public static $inject = ['$http', '$compile', 'ProcessManager', '$document', '$rootScope'];

        constructor(
            private http: ng.IHttpService,
            private compile: ng.ICompileService,
            private processManager: IProcessManager,
            private document: ng.IDocumentService,
            private rootScope: ng.IRootScopeService
        ) {}

        public launchApplication = (pack: string, pm: IProcessManager) => {
            let promise = this.http.get(pack);
            promise.success(this.bootstrap);
        };

        private bootstrap (response: any) {
            let application = new SystemApplication(name, settings, pm);
            application.run();
        }

        public static Factory() {
            const factory = (
                $http: ng.IHttpService,
                $compile: ng.ICompileService,
                processManager: IProcessManager,
                $document: ng.IDocumentService,
                $rootScope: ng.IRootScopeService
            ) => new ApplicationLauncher($http, $compile, processManager, $document, $rootScope);

            return factory;
        }
    }
}

(function (angular) {
    angular.module('components').directive('application', Directive);

    Directive.$inject = ['$http', '$compile', 'ProcessManager', '$document', '$rootScope'];

    function Directive($http, $compile, ProcessManager, $document, $rootScope) {
        function Link($scope, $element) {
            $element.remove();

            var windowTemplate = '<div style="background-color: white; color: black; overflow: hidden;" class="no-select" ng-mousedown="selectDirective();">' +
                '<p style=\"background-color: lightblue; height: 23px; width: 100%; margin: 0; display: table; cursor: pointer; padding: 0 5px;\" '+
                'ng-mousedown=\"down($event);\">' +
                '<span class="menu-button" ng-click="closeProcess();"><i class="fa fa-close fa-fw"></i></span>' +
                '<span class="menu-button" ng-click="toggleFullscreen();"><i class="fa fa-windows fa-fw"></i></span>' +
                '<span class="menu-button" ng-click="collapse();"><i class="fa fa-minus fa-fw"></i></span>' +
                '</p>' +
                '<div style="height: 100%; overflow: auto;" ui-view="' + mod + '"></div>' +
                '</div>';


            var directive = null;
            var fullscreen = false;
            var width = 640;
            var height = 480;
            var top = 50;
            var left = 50;

            $scope.dragAndDrop = {
                'draggable': false,
                'lastX': 0,
                'lastY': 0
            };

            // Loading package...
            var promise = $http.get($scope.app);
            promise.success(function (response) {
                $scope.pid = ProcessManager.addProcess(response.module.name, 'system', $scope.index);
                if ($scope.pid !== null) {
                    LoadApp(response);
                }
            });

            function LoadApp (response) {
                var mod = response.module.name;

                // When package loaded need to load application files
                $scope.$on('ApplicationPackageLoaded', function (event, response) {
                    $scope.app = response;
                    var basePath = 'http://desktop.dev/javascripts/Components/' + response.folder + '/';
                    yepnope.injectJs(basePath + response.module.file, function () {
                        var filesToLoad = [];
                        angular.forEach(response.javascript, (val:any) => {
                            this.push(basePath + val.file);
                        }, filesToLoad);
                        yepnope(filesToLoad, function () {
                            $scope.$broadcast('ApplicationFilesLoaded');
                        });
                    });
                });

                // When all files loaded need to bootstrap app...
                $scope.$on('ApplicationFilesLoaded', function () {
                    directive = $compile(angular.element(windowTemplate))($scope);
                    directive.draggable = true;
                    angular.element(document).find('body').append(directive);
                    decorateApp(directive);

                    var appContainer = angular.element('<div style="height: 100%; overflow: auto;" ui-view="' + mod + '"></div>');
                    appContainer.id = mod;
                    directive.append(appContainer);
                    $compile(appContainer)($scope);
                    angular.bootstrap(appContainer, [mod]);
                    $scope.$broadcast('ApplicationBootstraped');
                });

                $scope.$broadcast('ApplicationPackageLoaded', response);
            }

            // Tells Process Manager that the application is going to close
            $scope.closeProcess = function () {
                ProcessManager.closeProcess($scope.pid);
            };

            $scope.selectDirective = function () {
                if ($scope.selected === false) {
                    $scope.$emit('ApplicationSelected', $scope.index);
                }
            };

            function closeApplication() {
                $scope.$emit('ApplicationTerminated', $scope.index);
                $scope.$destroy();
                directive.remove();
            }

            $scope.collapse = function () {
                $scope.$emit('ApplicationCollapsed', $scope.index = true);
            };

            function decorateApp($element) {
                $element.css('width', width + 'px');
                $element.css('height', height + 'px');
                $element.css('position', 'absolute');
                $element.css('top', top + 'px');
                $element.css('left', left + 'px');
                $element.css('z-index', '10');
                $element.css('box-sizing', 'border-box');
                $element.css('border', 'solid lightblue 1px');
                $element.css('box-shadow', '10px 10px 35px 5px black');
            }

            $scope.toggleFullscreen = function () {
                fullscreen = !fullscreen;
                if (fullscreen === true) {
                    directive.css('width', '100%');
                    directive.css('height', '100%');
                    directive.css('top', '0');
                    directive.css('left', '0');
                } else {
                    directive.css('width', width + 'px');
                    directive.css('height', height + 'px');
                    directive.css('top', top + 'px');
                    directive.css('left', left + 'px');
                }
            };


            // Register close process listener
            $rootScope.$on('ProcessClosed', function (event, data) {
                if (data.pid === $scope.pid) {
                    closeApplication();
                }
            });

            $scope.$on('ApplicationBootstraped', function () {
                $scope.$watch('index', function (val) {
                    $scope.index = val;
                });

                $scope.$watch('selected', function (val) {
                    if (val === true) {
                        directive.css('z-index', 20);
                    } else {
                        directive.css('z-index', 10);
                    }
                });

                $scope.$watch('collapsed', function (val) {
                    if (val === true) {
                        directive.css('display', 'none');
                    } else {
                        directive.css('display', 'block');
                    }
                });
            });

            $scope.down = function (event) {
                if (event.which === 1 && fullscreen === false) {
                    $scope.dragAndDrop.draggable = true;
                    $scope.dragAndDrop.lastX = event.pageX;
                    $scope.dragAndDrop.lastY = event.pageY;
                }
            };

            $document.bind('mousemove', function (event) {
                if (event.which === 1 && $scope.dragAndDrop.draggable === true && fullscreen === false) {
                    var subX = event.pageX - $scope.dragAndDrop.lastX,
                        subY = event.pageY - $scope.dragAndDrop.lastY;

                    $scope.dragAndDrop.lastX = event.pageX;
                    $scope.dragAndDrop.lastY = event.pageY;

                    left += subX;
                    top += subY;

                    directive.css('left', left + 'px');
                    directive.css('top', top + 'px');
                }
            });

            $document.bind('mouseup', function () {
                $scope.dragAndDrop.draggable = false;
            });
        }

        return {
            'restrict': 'E',
            'link': Link,
            'scope': {
                'app': '=app',
                'index': '=index',
                'selected': '=selected',
                'collapsed': '=collapsed'
            }
        };
    }
})(angular);