/// <reference path='interfaces.d.ts' />
/// <reference path='../models.d.ts' />
var Kernel;
(function (Kernel) {
    var ProcessListItem = (function () {
        function ProcessListItem(id, process) {
            this._id = id;
            this._process = process;
        }
        Object.defineProperty(ProcessListItem.prototype, "id", {
            get: function () {
                return this._id;
            },
            set: function (value) {
                this._id = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ProcessListItem.prototype, "process", {
            get: function () {
                return this._process;
            },
            set: function (value) {
                this._process = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ProcessListItem.prototype, "window", {
            get: function () {
                return this._window;
            },
            set: function (value) {
                this._window = value;
            },
            enumerable: true,
            configurable: true
        });
        return ProcessListItem;
    })();
    Kernel.ProcessListItem = ProcessListItem;
})(Kernel || (Kernel = {}));
/// <reference path='../models.d.ts' />
var Kernel;
(function (Kernel) {
    var Process = (function () {
        function Process(name, processManager) {
            this._type = 'base';
            this._name = name;
            this._processManager = processManager;
        }
        Object.defineProperty(Process.prototype, "type", {
            get: function () {
                return this._type;
            },
            set: function (value) {
                this._type = value;
            },
            enumerable: true,
            configurable: true
        });
        Process.prototype.close = function () {
            this._processManager.closeProcess(this._pid);
        };
        Process.prototype.run = function () {
            this._pid = this._processManager.addProcess(this._name, this._type, this);
        };
        Object.defineProperty(Process.prototype, "name", {
            get: function () {
                return this._name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Process.prototype, "pid", {
            get: function () {
                return this._pid;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Process.prototype, "processManager", {
            get: function () {
                return this._processManager;
            },
            enumerable: true,
            configurable: true
        });
        return Process;
    })();
    Kernel.Process = Process;
})(Kernel || (Kernel = {}));
/// <reference path='../models.d.ts' />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Kernel;
(function (Kernel) {
    var Application = (function (_super) {
        __extends(Application, _super);
        function Application(name, settings, processManager) {
            _super.call(this, name, processManager);
            this._settings = settings;
            this._template = Application.createTemplate(settings);
        }
        Application.createTemplate = function (settings) {
            return '<div style="background-color: white; color: ' + settings.header.textColor + '; overflow: hidden;" class="no-select" ng-mousedown="selectDirective();">' +
                '<p style=\"background-color: ' + settings.header.bgColor + '; height: 23px; width: 100%; margin: 0; display: table; cursor: pointer; padding: 0 5px;\" ' +
                'ng-mousedown=\"down($event);\">' +
                '<span class="menu-button" ng-click="closeProcess();"><i class="fa fa-close fa-fw"></i></span>' +
                '<span class="menu-button" ng-click="toggleFullscreen();"><i class="fa fa-windows fa-fw"></i></span>' +
                '<span class="menu-button" ng-click="collapse();"><i class="fa fa-minus fa-fw"></i></span>' +
                '</p>' +
                '</div>';
        };
        Object.defineProperty(Application.prototype, "template", {
            get: function () {
                return this._template;
            },
            set: function (value) {
                this._template = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Application.prototype, "settings", {
            get: function () {
                return this._settings;
            },
            set: function (value) {
                this._settings = value;
            },
            enumerable: true,
            configurable: true
        });
        return Application;
    })(Kernel.Process);
    Kernel.Application = Application;
})(Kernel || (Kernel = {}));
/// <reference path='../models.d.ts' />
var Kernel;
(function (Kernel) {
    var ApplicationWindowSettings = (function () {
        function ApplicationWindowSettings(box) {
            this._header = new Kernel.Block();
            this._header.textColor = "black";
            this._header.bgColor = "lightblue";
            this._header.height = "23px";
            this._windowBox = box;
        }
        Object.defineProperty(ApplicationWindowSettings.prototype, "header", {
            get: function () {
                return this._header;
            },
            set: function (value) {
                this._header = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ApplicationWindowSettings.prototype, "windowBox", {
            get: function () {
                return this._windowBox;
            },
            enumerable: true,
            configurable: true
        });
        return ApplicationWindowSettings;
    })();
    Kernel.ApplicationWindowSettings = ApplicationWindowSettings;
})(Kernel || (Kernel = {}));
/// <reference path='../models.d.ts' />
var Kernel;
(function (Kernel) {
    var SystemApplication = (function (_super) {
        __extends(SystemApplication, _super);
        function SystemApplication(name, settings, processManager) {
            _super.call(this, name, settings, processManager);
            this.type = 'system';
        }
        return SystemApplication;
    })(Kernel.Application);
    Kernel.SystemApplication = SystemApplication;
})(Kernel || (Kernel = {}));
/// <reference path='../models.d.ts' />
var Kernel;
(function (Kernel) {
    var UserApplication = (function (_super) {
        __extends(UserApplication, _super);
        function UserApplication(name, settings, processManager) {
            _super.call(this, name, settings, processManager);
            this.type = 'user';
        }
        return UserApplication;
    })(Kernel.Application);
    Kernel.UserApplication = UserApplication;
})(Kernel || (Kernel = {}));
/// <reference path='../models.d.ts' />
var Kernel;
(function (Kernel) {
    var WindowBox = (function () {
        function WindowBox(top, left, width, height) {
            if (width === void 0) { width = 640; }
            if (height === void 0) { height = 380; }
            this._width = width;
            this._height = height;
            this._top = top;
            this._left = left;
        }
        Object.defineProperty(WindowBox.prototype, "height", {
            get: function () {
                return this._height;
            },
            set: function (value) {
                this._height = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WindowBox.prototype, "width", {
            get: function () {
                return this._width;
            },
            set: function (value) {
                this._width = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WindowBox.prototype, "top", {
            get: function () {
                return this._top;
            },
            set: function (value) {
                this._top = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WindowBox.prototype, "left", {
            get: function () {
                return this._left;
            },
            set: function (value) {
                this._left = value;
            },
            enumerable: true,
            configurable: true
        });
        return WindowBox;
    })();
    Kernel.WindowBox = WindowBox;
})(Kernel || (Kernel = {}));
/// <reference path='decorations.d.ts' />
var Kernel;
(function (Kernel) {
    var Block = (function () {
        function Block() {
        }
        Object.defineProperty(Block.prototype, "width", {
            get: function () {
                return this._width;
            },
            set: function (value) {
                this._width = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Block.prototype, "height", {
            get: function () {
                return this._height;
            },
            set: function (value) {
                this._height = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Block.prototype, "textColor", {
            get: function () {
                return this._textColor;
            },
            set: function (value) {
                this._textColor = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Block.prototype, "bgColor", {
            get: function () {
                return this._bgColor;
            },
            set: function (value) {
                this._bgColor = value;
            },
            enumerable: true,
            configurable: true
        });
        return Block;
    })();
    Kernel.Block = Block;
})(Kernel || (Kernel = {}));
var Kernel;
(function (Kernel) {
    var DesktopSettings = (function () {
        function DesktopSettings(data) {
            this.backgroundImage = data.backgroundImage;
            this.backgroundRepeat = data.backgroundRepeat;
            this.backgroundPosition = data.backgroundPosition;
            this.backgroundSize = data.backgroundSize;
        }
        DesktopSettings.prototype.getCss = function () {
            return {
                'background-image': this.backgroundImage,
                'background-repeat': this.backgroundRepeat,
                'background-position': this.backgroundPosition,
                'background-size': this.backgroundSize,
            };
        };
        return DesktopSettings;
    })();
    Kernel.DesktopSettings = DesktopSettings;
})(Kernel || (Kernel = {}));
var Kernel;
(function (Kernel) {
    var DesktopItem = (function () {
        function DesktopItem(data) {
            if (angular.isDefined(data)) {
                this._id = data.id;
                this._desktopId = data.desktopId;
                this._row = data.row;
                this._col = data.col;
                this._type = data.type;
                this._item = data.item;
            }
        }
        Object.defineProperty(DesktopItem.prototype, "id", {
            get: function () {
                return this._id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DesktopItem.prototype, "desktopId", {
            get: function () {
                return this._desktopId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DesktopItem.prototype, "row", {
            get: function () {
                return this._row;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DesktopItem.prototype, "col", {
            get: function () {
                return this._col;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DesktopItem.prototype, "type", {
            get: function () {
                return this._type;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DesktopItem.prototype, "item", {
            get: function () {
                return this._item;
            },
            enumerable: true,
            configurable: true
        });
        return DesktopItem;
    })();
    Kernel.DesktopItem = DesktopItem;
})(Kernel || (Kernel = {}));
/// <reference path='../models.d.ts' />
var Kernel;
(function (Kernel) {
    var Desktop = (function () {
        function Desktop(width, height, data) {
            this.width = width;
            this.height = height;
            this._id = data.id;
            this._userId = data.userId;
            this._settings = new Kernel.DesktopSettings(data.settings);
            this._created = data.created;
            this._updated = data.updated;
        }
        Object.defineProperty(Desktop.prototype, "id", {
            get: function () {
                return this._id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Desktop.prototype, "userId", {
            get: function () {
                return this._userId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Desktop.prototype, "grid", {
            get: function () {
                return this._grid;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Desktop.prototype, "settings", {
            get: function () {
                return this._settings;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Desktop.prototype, "created", {
            get: function () {
                return this._created;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Desktop.prototype, "updated", {
            get: function () {
                return this._updated;
            },
            enumerable: true,
            configurable: true
        });
        Desktop.prototype.initGrid = function (height, width) {
            this._grid = new Kernel.DesktopGrid(height, width);
        };
        return Desktop;
    })();
    Kernel.Desktop = Desktop;
})(Kernel || (Kernel = {}));
/// <reference path='../models.d.ts' />
var Kernel;
(function (Kernel) {
    var DesktopGrid = (function () {
        function DesktopGrid(height, width) {
            this._cells = [];
            this._rows = height / 20;
            this._cols = width / 30;
            for (var i = 0; i < 50; i++) {
                this._cells.push(new Kernel.DesktopItem());
            }
        }
        return DesktopGrid;
    })();
    Kernel.DesktopGrid = DesktopGrid;
})(Kernel || (Kernel = {}));
/// <reference path='services.d.ts' />
var Kernel;
(function (Kernel) {
    var ProcessManagerService = (function () {
        function ProcessManagerService(rootScope) {
            this.rootScope = rootScope;
            this.processList = [];
        }
        ProcessManagerService.prototype.addProcess = function (name, type, instance) {
            var id = this.findFreeId();
            var listItem = new Kernel.ProcessListItem(id, instance);
            this.processList.push(listItem);
            this.processCount++;
            this.rootScope.$broadcast('ProcessCreated', instance);
            return id;
        };
        ProcessManagerService.prototype.closeProcess = function (pid) {
            var closed = false;
            var processIndex = this.findProcess(pid);
            if (processIndex !== null) {
                this.rootScope.$broadcast('ProcessClosed', this.processList[processIndex].process);
                this.processList.splice(processIndex, 1);
                closed = true;
                this.processCount--;
            }
            return closed;
        };
        ProcessManagerService.prototype.findFreeId = function () {
            var id = 0;
            do {
                id++;
            } while (this.isIdClaimed(id) === true);
            return id;
        };
        ProcessManagerService.prototype.findProcess = function (id) {
            var index = null;
            for (var i = 0; i < this.processCount; i++) {
                if (this.processList[i].id === id) {
                    index = i;
                    break;
                }
            }
            return index;
        };
        ProcessManagerService.prototype.isIdClaimed = function (id) {
            var claimed = false;
            for (var i = 0; i < this.processCount; i++) {
                if (this.processList[i].id === id) {
                    claimed = true;
                    break;
                }
            }
            return claimed;
        };
        ProcessManagerService.Factory = function () {
            var processManager = function ($rootScope) { return new ProcessManagerService($rootScope); };
            return processManager;
        };
        ProcessManagerService.$inject = ['$rootScope'];
        return ProcessManagerService;
    })();
    Kernel.ProcessManagerService = ProcessManagerService;
})(Kernel || (Kernel = {}));
/// <reference path='services.d.ts' />
var Kernel;
(function (Kernel) {
    var SpinnerService = (function () {
        function SpinnerService(rootScope) {
            this.rootScope = rootScope;
            this.spinner = false;
            this.promises = [];
            rootScope.$broadcast('SpinnerInactive');
        }
        SpinnerService.prototype.getSpinner = function () {
            return this.spinner;
        };
        SpinnerService.prototype.addPromise = function (promise) {
            var _this = this;
            if (this.spinner === false) {
                this.spinner = true;
                this.rootScope.$broadcast('SpinnerActive');
            }
            this.promises.push(promise);
            promise.then(function () {
                _this.promises.splice(_this.promises.indexOf(promise), 1);
                if (_this.promises.length === 0) {
                    _this.spinner = false;
                    _this.rootScope.$broadcast('SpinnerInactive');
                }
            });
        };
        SpinnerService.Factory = function () {
            var spinner = function ($rootScope) { return new SpinnerService($rootScope); };
            return spinner;
        };
        SpinnerService.$inject = ['$rootScope'];
        return SpinnerService;
    })();
    Kernel.SpinnerService = SpinnerService;
})(Kernel || (Kernel = {}));
/// <reference path="services.d.ts" />
var Kernel;
(function (Kernel) {
    var FilesystemService = (function () {
        function FilesystemService(http, q) {
            this.http = http;
            this.q = q;
        }
        FilesystemService.prototype.getDir = function (dir) {
            return this.createPromise(dir);
        };
        FilesystemService.prototype.mkDir = function (dir) {
            return this.createPromise(dir);
        };
        FilesystemService.prototype.rmDir = function (dir) {
            return this.createPromise(dir);
        };
        FilesystemService.prototype.mvDir = function (dir, newdir) {
            return this.createPromise(dir);
        };
        FilesystemService.prototype.getFile = function (file) {
            return this.createPromise(file);
        };
        FilesystemService.prototype.saveFile = function (file) {
            return this.createPromise(file);
        };
        FilesystemService.prototype.mvFile = function (file, newfile) {
            return this.createPromise(file);
        };
        FilesystemService.prototype.rmFile = function (file) {
            return this.createPromise(file);
        };
        FilesystemService.prototype.mkFile = function (file) {
            return this.createPromise(file);
        };
        FilesystemService.prototype.createPromise = function (promise) {
            var defer = this.q.defer();
            //promise.success(public (promise) {
            defer.resolve(promise);
            //});
            return defer.promise;
        };
        FilesystemService.Factory = function () {
            var service = function ($http, $q) { return new FilesystemService($http, $q); };
            return service;
        };
        FilesystemService.$inject = ['$http', '$q'];
        return FilesystemService;
    })();
    Kernel.FilesystemService = FilesystemService;
})(Kernel || (Kernel = {}));
/// <reference path='services.d.ts' />
var Kernel;
(function (Kernel) {
    var DesktopService = (function () {
        function DesktopService(http, q) {
            this.http = http;
            this.q = q;
        }
        DesktopService.prototype.saveGrid = function (id, grid) {
            var promise = this.http.put(Routing.generate('save-desktop-grid', { 'desktop_id': id }), grid);
            return this.handlePromise(promise);
        };
        DesktopService.prototype.getDesktop = function (id) {
            var promise = this.http.get(Routing.generate('get-desktop', { 'desktop_id': id }));
            return this.handlePromise(promise);
        };
        ;
        DesktopService.prototype.handlePromise = function (promise) {
            var defer = this.q.defer();
            promise
                .success(function (response) {
                defer.resolve(response);
            });
            return defer.promise;
        };
        DesktopService.Factory = function () {
            var desktopService = function ($http, $q) { return new DesktopService($http, $q); };
            return desktopService;
        };
        DesktopService.$inject = ['$http', '$q'];
        return DesktopService;
    })();
    Kernel.DesktopService = DesktopService;
})(Kernel || (Kernel = {}));
var Kernel;
(function (Kernel) {
    var WindowListItem = (function () {
        function WindowListItem(pid, template, process, applicationPackage) {
            this.pid = pid;
            this.template = template;
            this.process = process;
            this.applicationPackage = applicationPackage;
        }
        return WindowListItem;
    })();
    var ApplicationLauncher = (function () {
        function ApplicationLauncher(http, compile, processManager, document, rootScope) {
            var _this = this;
            this.http = http;
            this.compile = compile;
            this.processManager = processManager;
            this.document = document;
            this.rootScope = rootScope;
            this.launchApplication = function (pack) {
                // Get app package
                var promise = _this.http.get(pack);
                // Handle response
                promise.success(_this.bootstrap);
            };
            this.loadModule = function (folder, module, files, template) {
                var basePath = 'http://desktop.dev/applications/system/' + folder + '/';
                yepnope.injectJs(basePath + module.file, function () {
                    var filesToLoad = [];
                    for (var i = 0; i < files.length; i++) {
                        filesToLoad.push(basePath + files[i].file);
                    }
                    yepnope(filesToLoad, function () {
                        angular.bootstrap(template, [module.name]);
                    });
                });
            };
            this.compileTemplate = function (template, name) {
                var compiled = _this.compile(angular.element(template))(_this.rootScope);
                var appLayer = _this.document.find('div#applications-layer');
                var appContainer = angular.element('<div style="height: 100%; overflow: auto;" ui-view="' + name + '"></div>');
                appContainer.attr('id', name);
                appContainer.append(compiled);
                appLayer.append(appContainer);
                appContainer = _this.compile(appContainer)(_this.rootScope);
                return appContainer;
            };
            this.onApplicationClosed = function (event, data) {
            };
            // Register events
            this.rootScope.$on('ApplicationClosed', this.onApplicationClosed);
        }
        ApplicationLauncher.prototype.bootstrap = function (response) {
            var windowBox = new Kernel.WindowBox(response.settings.top, response.settings.left, response.settings.width, response.settings.height);
            var appSettings = new Kernel.ApplicationWindowSettings(windowBox);
            var application = new Kernel.SystemApplication(response.module.name, appSettings, this.processManager);
            var compiledTemplate = this.compileTemplate(application.template, application.name);
            this.loadModule(response.folder, response.module, response.javascript, compiledTemplate);
            // Add application to process manager
            application.run();
            // Add application to applications list
            this.windowList.push(new WindowListItem(application.pid, compiledTemplate, application, response));
        };
        ;
        ApplicationLauncher.Factory = function () {
            var factory = function ($http, $compile, processManagerService, $document, $rootScope) {
                return new ApplicationLauncher($http, $compile, processManagerService, $document, $rootScope);
            };
            return factory;
        };
        ApplicationLauncher.$inject = ['$http', '$compile', 'processManagerService', '$document', '$rootScope'];
        return ApplicationLauncher;
    })();
    Kernel.ApplicationLauncher = ApplicationLauncher;
})(Kernel || (Kernel = {}));
//(function (angular) {
//    angular.module('components').directive('application', Directive);
//
//    Directive.$inject = ['$http', '$compile', 'ProcessManager', '$document', '$rootScope'];
//
//    function Directive($http, $compile, ProcessManager, $document, $rootScope) {
//        function Link($scope, $element) {
//            $element.remove();
//
//            var windowTemplate = '<div style="background-color: white; color: black; overflow: hidden;" class="no-select" ng-mousedown="selectDirective();">' +
//                '<p style=\"background-color: lightblue; height: 23px; width: 100%; margin: 0; display: table; cursor: pointer; padding: 0 5px;\" '+
//                'ng-mousedown=\"down($event);\">' +
//                '<span class="menu-button" ng-click="closeProcess();"><i class="fa fa-close fa-fw"></i></span>' +
//                '<span class="menu-button" ng-click="toggleFullscreen();"><i class="fa fa-windows fa-fw"></i></span>' +
//                '<span class="menu-button" ng-click="collapse();"><i class="fa fa-minus fa-fw"></i></span>' +
//                '</p>' +
//                '<div style="height: 100%; overflow: auto;" ui-view="' + mod + '"></div>' +
//                '</div>';
//
//
//            var directive = null;
//            var fullscreen = false;
//            var width = 640;
//            var height = 480;
//            var top = 50;
//            var left = 50;
//
//            $scope.dragAndDrop = {
//                'draggable': false,
//                'lastX': 0,
//                'lastY': 0
//            };
//
//            // Loading package...
//            var promise = $http.get($scope.app);
//            promise.success(function (response) {
//                $scope.pid = ProcessManager.addProcess(response.module.name, 'system', $scope.index);
//                if ($scope.pid !== null) {
//                    LoadApp(response);
//                }
//            });
//
//            function LoadApp (response) {
//                var mod = response.module.name;
//
//                // When package loaded need to load application files
//                $scope.$on('ApplicationPackageLoaded', function (event, response) {
//                    $scope.app = response;
//                    var basePath = 'http://desktop.dev/javascripts/Components/' + response.folder + '/';
//                    yepnope.injectJs(basePath + response.module.file, function () {
//                        var filesToLoad = [];
//                        angular.forEach(response.javascript, (val:any) => {
//                            this.push(basePath + val.file);
//                        }, filesToLoad);
//                        yepnope(filesToLoad, function () {
//                            $scope.$broadcast('ApplicationFilesLoaded');
//                        });
//                    });
//                });
//
//                // When all files loaded need to bootstrap app...
//                $scope.$on('ApplicationFilesLoaded', function () {
//                    directive = $compile(angular.element(windowTemplate))($scope);
//                    directive.draggable = true;
//                    angular.element(document).find('body').append(directive);
//                    decorateApp(directive);
//
//                    var appContainer = angular.element('<div style="height: 100%; overflow: auto;" ui-view="' + mod + '"></div>');
//                    appContainer.id = mod;
//                    directive.append(appContainer);
//                    $compile(appContainer)($scope);
//                    angular.bootstrap(appContainer, [mod]);
//                    $scope.$broadcast('ApplicationBootstraped');
//                });
//
//                $scope.$broadcast('ApplicationPackageLoaded', response);
//            }
//
//            // Tells Process Manager that the application is going to close
//            $scope.closeProcess = function () {
//                ProcessManager.closeProcess($scope.pid);
//            };
//
//            $scope.selectDirective = function () {
//                if ($scope.selected === false) {
//                    $scope.$emit('ApplicationSelected', $scope.index);
//                }
//            };
//
//            function closeApplication() {
//                $scope.$emit('ApplicationTerminated', $scope.index);
//                $scope.$destroy();
//                directive.remove();
//            }
//
//            $scope.collapse = function () {
//                $scope.$emit('ApplicationCollapsed', $scope.index = true);
//            };
//
//            function decorateApp($element) {
//                $element.css('width', width + 'px');
//                $element.css('height', height + 'px');
//                $element.css('position', 'absolute');
//                $element.css('top', top + 'px');
//                $element.css('left', left + 'px');
//                $element.css('z-index', '10');
//                $element.css('box-sizing', 'border-box');
//                $element.css('border', 'solid lightblue 1px');
//                $element.css('box-shadow', '10px 10px 35px 5px black');
//            }
//
//            $scope.toggleFullscreen = function () {
//                fullscreen = !fullscreen;
//                if (fullscreen === true) {
//                    directive.css('width', '100%');
//                    directive.css('height', '100%');
//                    directive.css('top', '0');
//                    directive.css('left', '0');
//                } else {
//                    directive.css('width', width + 'px');
//                    directive.css('height', height + 'px');
//                    directive.css('top', top + 'px');
//                    directive.css('left', left + 'px');
//                }
//            };
//
//
//            // Register close process listener
//            $rootScope.$on('ProcessClosed', function (event, data) {
//                if (data.pid === $scope.pid) {
//                    closeApplication();
//                }
//            });
//
//            $scope.$on('ApplicationBootstraped', function () {
//                $scope.$watch('index', function (val) {
//                    $scope.index = val;
//                });
//
//                $scope.$watch('selected', function (val) {
//                    if (val === true) {
//                        directive.css('z-index', 20);
//                    } else {
//                        directive.css('z-index', 10);
//                    }
//                });
//
//                $scope.$watch('collapsed', function (val) {
//                    if (val === true) {
//                        directive.css('display', 'none');
//                    } else {
//                        directive.css('display', 'block');
//                    }
//                });
//            });
//
//            $scope.down = function (event) {
//                if (event.which === 1 && fullscreen === false) {
//                    $scope.dragAndDrop.draggable = true;
//                    $scope.dragAndDrop.lastX = event.pageX;
//                    $scope.dragAndDrop.lastY = event.pageY;
//                }
//            };
//
//            $document.bind('mousemove', function (event) {
//                if (event.which === 1 && $scope.dragAndDrop.draggable === true && fullscreen === false) {
//                    var subX = event.pageX - $scope.dragAndDrop.lastX,
//                        subY = event.pageY - $scope.dragAndDrop.lastY;
//
//                    $scope.dragAndDrop.lastX = event.pageX;
//                    $scope.dragAndDrop.lastY = event.pageY;
//
//                    left += subX;
//                    top += subY;
//
//                    directive.css('left', left + 'px');
//                    directive.css('top', top + 'px');
//                }
//            });
//
//            $document.bind('mouseup', function () {
//                $scope.dragAndDrop.draggable = false;
//            });
//        }
//
//        return {
//            'restrict': 'E',
//            'link': Link,
//            'scope': {
//                'app': '=app',
//                'index': '=index',
//                'selected': '=selected',
//                'collapsed': '=collapsed'
//            }
//        };
//    }
//})(angular); 
/// <reference path='controllers.d.ts' />
var Kernel;
(function (Kernel) {
    var ApplicationController = (function () {
        function ApplicationController(scope, spinnerService) {
            this.scope = scope;
            this.spinnerService = spinnerService;
            // get current state of spinner
            this.spinner = this.spinnerService.getSpinner();
            // Register event listeners
            scope.$on('SpinnerActive', this.onSpinnerActive);
            scope.$on('SpinnerInactive', this.onSpinnerInactive);
        }
        ApplicationController.prototype.onSpinnerActive = function () {
            this.spinner = true;
        };
        ApplicationController.prototype.onSpinnerInactive = function () {
            this.spinner = false;
        };
        ApplicationController.$inject = ['$scope', 'spinnerService'];
        return ApplicationController;
    })();
    Kernel.ApplicationController = ApplicationController;
})(Kernel || (Kernel = {}));
/// <reference path='components.d.ts' />
var Kernel;
(function (Kernel) {
    var DesktopDirective = (function () {
        function DesktopDirective() {
            this.restrict = 'E';
            this.templateUrl = '/views/desktop.html';
            this.bindToController = true;
            this.scope = { 'desktopId': '@' };
            this.controller = 'DesktopDirectiveController';
            this.controllerAs = 'desktop';
        }
        DesktopDirective.Factory = function () {
            var directive = function () { return new DesktopDirective(); };
            return directive;
        };
        return DesktopDirective;
    })();
    Kernel.DesktopDirective = DesktopDirective;
    var DesktopDirectiveController = (function () {
        function DesktopDirectiveController(scope, window, document, fs, rootScope, http, desktopService, applicationLauncher, processManager) {
            var _this = this;
            this.scope = scope;
            this.window = window;
            this.document = document;
            this.fs = fs;
            this.rootScope = rootScope;
            this.http = http;
            this.desktopService = desktopService;
            this.applicationLauncher = applicationLauncher;
            this.processManager = processManager;
            this.launch = function (pack) {
                _this.applicationLauncher.launchApplication(pack);
            };
            // EVENTS
            this.DesktopImageChanged = function (event, data) {
                _this.scope.background.settings['background-image'] = data;
            };
            this.DesktopGridStateChanged = function (event, data) {
                _this.desktop.saveGrid(_this.scope.desktopId, _this.desktop.desktopGrid);
            };
            this.KeyDown = function (event) {
                if (event.ctrlKey && event.shiftKey) {
                    switch (event.which) {
                        case 37:
                            alert('suck');
                            break;
                        case 39:
                            alert('suck');
                            break;
                    }
                }
                _this.scope.$apply();
            };
            this.Resize = function (event) {
                _this.scope.background.settings.width = _this.window.innerWidth;
                _this.scope.background.settings.height = _this.window.innerHeight;
                _this.scope.$apply();
            };
            var promise = this.desktopService.getDesktop(this.scope.desktop.desktopId);
            promise.then(function (response) {
                if (response !== null) {
                    _this.desktop = new Kernel.Desktop(_this.window.innerWidth, _this.window.innerHeight, response);
                    _this.scope.background = _this.createBackground(response);
                    scope.background.settings.width = _this.window.innerWidth;
                    scope.background.settings.height = _this.window.innerHeight;
                    scope.applications = [];
                    scope.apps = [];
                    scope.package = '/javascripts/Components/ProcessManager/process-manager.ae';
                    _this.desktop.initGrid(_this.window.innerHeight, _this.window.innerWidth);
                }
            });
            // Register events
            this.rootScope.$on('DesktopImageChanged', this.DesktopImageChanged);
            this.scope.$on('DesktopGridStateChanged', this.DesktopGridStateChanged);
            angular.element(this.window).bind('keydown', this.KeyDown);
            angular.element(this.window).bind('resize', this.Resize);
        }
        DesktopDirectiveController.prototype.createBackground = function (response) {
            var _this = this;
            return {
                'settings': this.desktop.settings.getCss(),
                'contextMenu': [
                    ['Create File', function () {
                            var promise = _this.fs.mkFile({ 'name': prompt('Input file name') });
                            promise.then(function (response) {
                                alert(response.name);
                            });
                        }],
                    ['Create Directory', function () {
                            var promise = _this.fs.mkDir({ 'name': prompt('Input directory name') });
                            promise.then(function (response) {
                                alert(response.name);
                            });
                        }],
                    ['Change Settings', function () {
                            alert('Vasya lox');
                        }]
                ]
            };
        };
        DesktopDirectiveController.$inject = [
            '$scope', '$window', '$document', 'filesystemService',
            '$rootScope', '$http', 'desktopService',
            'applicationLauncherService'
        ];
        return DesktopDirectiveController;
    })();
    Kernel.DesktopDirectiveController = DesktopDirectiveController;
})(Kernel || (Kernel = {}));
var Kernel;
(function (Kernel) {
    var DesktopPanelDirective = (function () {
        function DesktopPanelDirective(window, document) {
            var _this = this;
            this.window = window;
            this.document = document;
            this.templateUrl = '/views/desktop.panel.html';
            this.scope = {
                'settings': '=settings',
                'apps': '=apps'
            };
            this.bindToController = true;
            this.restrict = "E";
            this.controller = 'DesktopPanelDirectiveController';
            this.controllerAs = 'panel';
            this.link = function ($scope, $element) {
                var window = _this.window;
                if (!$scope.settings) {
                    $scope.settings = {
                        'height': '30px',
                        'width': '100%',
                        'background-color': 'rgba(143, 195, 255, 0.6)',
                        'position': 'fixed',
                        'bottom': '0',
                        'left': '0'
                    };
                }
                var panelMenu = $element.find('div.desktop-panel-menu');
                var panelBottom = parseInt($scope.settings.height.replace('px', '')) + 3;
                panelMenu.css('bottom', panelBottom + 'px');
                $scope.menuVisible = false;
                var resizePanelMenu = function () {
                    panelMenu.css('height', (window.innerHeight / 2) + 'px');
                    panelMenu.css('width', (window.innerWidth * 0.35) + 'px');
                };
                angular.element(window).on('resize', function (event) {
                    resizePanelMenu();
                });
                resizePanelMenu();
            };
        }
        DesktopPanelDirective.Factory = function () {
            var directive = function ($window, $document) { return new DesktopPanelDirective($window, $document); };
            return directive;
        };
        DesktopPanelDirective.$inject = ['$window', '$document'];
        return DesktopPanelDirective;
    })();
    Kernel.DesktopPanelDirective = DesktopPanelDirective;
    var DesktopPanelDirectiveController = (function () {
        function DesktopPanelDirectiveController() {
        }
        DesktopPanelDirectiveController.Factory = function () {
            var controller = function () { return new DesktopPanelDirectiveController(); };
        };
        DesktopPanelDirectiveController.$inject = ['$rootScope', '$window'];
        return DesktopPanelDirectiveController;
    })();
    Kernel.DesktopPanelDirectiveController = DesktopPanelDirectiveController;
})(Kernel || (Kernel = {}));
/// <reference path='components.d.ts' />
var Kernel;
(function (Kernel) {
    var DesktopGridDirective = (function () {
        function DesktopGridDirective() {
            this.templateUrl = '/views/desktop.grid.directive.html';
            this.restrict = 'E';
            this.bindToController = true;
            this.scope = { 'grid': '=grid' };
            this.controller = 'DesktopGridDirectiveController';
            this.controllerAs = 'grid';
        }
        DesktopGridDirective.Factory = function () {
            var factory = function () { return new DesktopGridDirective(); };
            return factory;
        };
        return DesktopGridDirective;
    })();
    Kernel.DesktopGridDirective = DesktopGridDirective;
    var DesktopGridDirectiveController = (function () {
        function DesktopGridDirectiveController(scope) {
            var _this = this;
            this.scope = scope;
            this.gridWatcher = function (newVal, oldVal) {
                _this.grid = newVal;
            };
            this.scope.$watch('grid', this.gridWatcher);
        }
        DesktopGridDirectiveController.$inject = ['$scope'];
        return DesktopGridDirectiveController;
    })();
    Kernel.DesktopGridDirectiveController = DesktopGridDirectiveController;
})(Kernel || (Kernel = {}));
var Kernel;
(function (Kernel) {
    angular.module('kernel', [
        'ngAnimate',
        'angular-sortable-view',
        'pascalprecht.translate',
        'ui.bootstrap.contextMenu',
    ])
        .factory('filesystemService', Kernel.FilesystemService.Factory())
        .factory('spinnerService', Kernel.SpinnerService.Factory())
        .factory('desktopService', Kernel.DesktopService.Factory())
        .factory('processManagerService', Kernel.ProcessManagerService.Factory())
        .factory('applicationLauncherService', Kernel.ApplicationLauncher.Factory())
        .controller('applicationController', Kernel.ApplicationController)
        .controller('DesktopDirectiveController', Kernel.DesktopDirectiveController)
        .controller('DesktopPanelDirectiveController', Kernel.DesktopPanelDirectiveController)
        .controller('DesktopGridDirectiveController', Kernel.DesktopGridDirectiveController)
        .directive('desktop', Kernel.DesktopDirective.Factory())
        .directive('desktopGrid', Kernel.DesktopGridDirective.Factory())
        .directive('desktopPanel', Kernel.DesktopPanelDirective.Factory());
})(Kernel || (Kernel = {}));
/// <reference path='typings/tsd.d.ts' />
/// <reference path='Declarations/declarations.d.ts' />
/// <reference path='Interfaces/interfaces.d.ts' />
/// <reference path='Models/models.d.ts' />
/// <reference path='Services/services.d.ts' />
/// <reference path='Controllers/controllers.d.ts' />
/// <reference path='Components/components.d.ts' />
/// <reference path="Kernel.ts" /> 
//# sourceMappingURL=Kernel.js.map