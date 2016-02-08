/// <reference path='components.d.ts' />

module Kernel {
    angular.module('kernel').directive('desktop', Directive.Factory());

    class Directive implements ng.IDirective
    {
        restrict = 'E';
        templateUrl = '/javascripts/Views/desktop.html';
        scope = { 'desktopId': '@desktopId' };

        constructor(private window, private document, private fs,
                    private rootScope, private http, private desktop: DesktopService) {}

        link = (scope: any, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {
            var promise = this.desktop.get(scope.desktopId);
            promise.then((response) => {
                if (response !== null) {
                    var desktop = new Desktop(response);

                    scope.background = {
                        'settings': (desktop.settings.length > 0) ? desktop.settings : {
                            'background-image': "url('/images/1.jpg')",
                            'background-repeat': 'no-repeat',
                            'background-position': 'center',
                            'background-size': 'cover',
                            'width': this.window.innerWidth,
                            'height': this.window.innerHeight
                        },
                        'contextMenu': [
                            [ 'Create File', () => {
                                var promise = this.fs.mkFile({ 'name': prompt('Input file name') });
                                promise.then(function (response) {
                                    alert(response.name);
                                });
                            }],
                            [ 'Create Directory', () => {
                                var promise = this.fs.mkDir({ 'name': prompt('Input directory name') });
                                promise.then(function (response) {
                                    alert(response.name);
                                });
                            }],
                            [ 'Change Settings', () => {
                                alert('Vasya lox');
                            }]
                        ]
                    };

                    scope.applications = [];
                    scope.apps = [];
                    scope.package  = '/javascripts/Components/ProcessManager/process-manager.ae';
                    scope.desktopGrid = initGrid(desktop.grid);

                    function initGrid(grid) {
                        if (grid.length > 0) {
                            return grid;
                        } else {
                            var width = this.window.innerWidth;
                            var height = this.window.innerHeight;
                            var x = width / 30; var y = height / 20;
                            var cells = [];

                            for (var i = 0; i < 600; i++) {
                                cells[i] = {};
                            }

                            scope.$broadcast('DesktopGridStateChanged');

                            return {
                                'cellWidth': x,
                                'cellHeight': y,
                                'cells': cells
                            };
                        }
                    }

                    scope.launch = (app, selected, collapsed) => {
                        scope.apps.push({
                            'src': app,
                            'selected': (selected) ? selected : false,
                            'collapsed': (collapsed) ? collapsed : false
                        });
                    };


                    // Events
                    this.rootScope.$on('DesktopImageChanged', function (event, data) {
                        scope.background.settings.backgroundImage = data;
                    });

                    this.rootScope.$on('NewAppLaunch', function (event, data) {
                        scope.launch(data);
                    });

                    this.rootScope.$on('ProcessCreated', function (event, data) {
                        scope.applications.push(data);
                    });

                    this.rootScope.$on('ProcessClosed', function (event, data: ProcessClosedEvent) {
                        var apps = scope.applications;
                        for (let i = 0; i < apps; i++) {
                            if (apps[i].pid === data.pid) {
                                apps.splice(i, 1); break;
                            }
                        }
                    });

                    scope.$on('ApplicationTerminated', (event, data) => {
                        var index = scope.apps[data.index];
                        if (index) {
                            scope.apps.splice(data.index, 1);
                        }
                    });

                    //for (var i in scope.apps) {
                    //    scope.apps[i].selected = (parseInt(i) === data);
                    //}

                    scope.$on('ApplicationSelected', function (event, data) {
                        for (let i = 0; i < scope.apps; i++) {
                            scope.apps[i].selected = (i === data);
                        }
                    });

                    scope.$on('ApplicationCollapsed', function (event, data) {
                        for (let i = 0; i < scope.apps; i++) {
                            scope.apps[i].selected = (i === data);
                        }
                    });

                    scope.$on('DesktopGridStateChanged', function () {
                        this.desktop.saveGrid(scope.desktopId, scope.desktopGrid);
                    });

                    angular.element(this.window).bind('resize', function (event) {
                        scope.background.settings.width  = this.window.innerWidth;
                        scope.background.settings.height = this.window.innerHeight;
                        scope.$apply();
                    });

                    angular.element(this.window).bind('keydown', function (event) {
                        if (event.ctrlKey && event.shiftKey) {
                            switch (event.which) {
                                case 37: alert('suck'); break;
                                case 39: alert('suck'); break;
                            }
                        }
                        scope.$apply();
                    });

                }
            });
        };

        public static Factory(): ng.IDirectiveFactory {
            const directive = (
                $window: ng.IWindowService, $document: ng.IDocumentService,
                filesystemService, $rootScope: ng.IRootScopeService,
                $http: ng.IHttpService, Desktop
            ) => new Directive($window, $document, filesystemService, $rootScope, $http, Desktop);
            directive.$inject = ['$window', '$document', 'filesystemService', '$rootScope', '$http', 'Desktop'];

            return directive;
        }
    }
}