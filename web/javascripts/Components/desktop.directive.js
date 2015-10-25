(function (angular) {
    angular.module('components').directive('desktop', Directive);

    Directive.$inject = ['$window', '$document', 'filesystemService', '$rootScope', '$http', 'Desktop'];

    function Directive($window, $document, fs, $rootScope, $http, Desktop) {
        return {
            'templateUrl': '/javascripts/Views/desktop.html',
            'link': Link,
            'scope': {
                'desktopId': '@desktopId'
            }
        };

        function Link($scope, $element, $attrs) {

            var promise = Desktop.get($scope.desktopId);
            promise.then(function (response) {
                if (response !== null) {
                    var desktop = new Desktop(response);

                    $scope.background = {
                        'settings': (desktop.settings.length > 0) ? desktop.settings : {
                            'background-image': "url('/images/1.jpg')",
                            'background-repeat': 'no-repeat',
                            'background-position': 'center',
                            'background-size': 'cover',
                            'width': $window.innerWidth,
                            'height': $window.innerHeight
                        },
                        'contextMenu': [
                            [ 'Create File', function () {
                                var promise = fs.mkFile({ 'name': prompt('Input file name') });
                                promise.then(function (response) {
                                    alert(response.name);
                                });
                            }],
                            [ 'Create Directory', function () {
                                var promise = fs.mkDir({ 'name': prompt('Input directory name') });
                                promise.then(function (response) {
                                    alert(response.name);
                                });
                            }],
                            [ 'Change Settings', function () {
                                alert('Vasya lox');
                            }]
                        ]
                    };

                    $scope.applications = [];
                    $scope.apps = [];
                    $scope.package  = '/javascripts/Components/ProcessManager/process-manager.ae';
                    $scope.desktopGrid = initGrid(desktop.grid);

                    function initGrid(grid) {
                        if (grid.length > 0) {
                            return grid;
                        } else {
                            var width = $window.innerWidth;
                            var height = $window.innerHeight;
                            var x = width / 30; var y = height / 20;
                            var cells = [];

                            for (var i = 0; i < 600; i++) {
                                cells[i] = {};
                            }

                            $scope.$broadcast('DesktopGridStateChanged');

                            return {
                                'cellWidth': x,
                                'cellHeight': y,
                                'cells': cells
                            };
                        }
                    }

                    $scope.launch = function (app, selected, collapsed) {
                        $scope.apps.push({
                            'src': app,
                            'selected': (selected) ? selected : false,
                            'collapsed': (collapsed) ? collapsed : false
                        });
                    };


                    // Events
                    $rootScope.$on('DesktopImageChanged', function (event, data) {
                        $scope.background.settings.backgroundImage = data;
                    });

                    $rootScope.$on('NewAppLaunch', function (event, data) {
                        $scope.launch(data);
                    });

                    $rootScope.$on('ProcessCreated', function (event, data) {
                        $scope.applications.push(data);
                    });

                    $rootScope.$on('ProcessClosed', function (event, data) {
                        var apps = $scope.applications;
                        for (var i in apps) {
                            if (apps[i].pid === data.pid) {
                                apps.splice(i, 1); break;
                            }
                        }
                    });

                    $scope.$on('ApplicationTerminated', function (event, data) {
                        var index = $scope.apps[data.index];
                        if (index) {
                            $scope.apps.splice(data.index, 1);
                        }
                    });for (var i in $scope.apps) {
                        $scope.apps[i].selected = (parseInt(i) === data);
                    }

                    $scope.$on('ApplicationSelected', function (event, data) {
                        for (var i in $scope.apps) {
                            $scope.apps[i].selected = (parseInt(i) === data);
                        }
                    });

                    $scope.$on('ApplicationCollapsed', function (event, data) {
                        for (var i in $scope.apps) {
                            $scope.apps[i].selected = (parseInt(i) === data);
                        }
                    });

                    $scope.$on('DesktopGridStateChanged', function () {
                        desktop.saveGrid($scope.desktopId, $scope.desktopGrid);
                    });

                    angular.element($window).bind('resize', function (event) {
                        $scope.background.settings.width  = $window.innerWidth;
                        $scope.background.settings.height = $window.innerHeight;
                        $scope.$apply();
                    });

                    angular.element($window).bind('keydown', function (event) {
                        if (event.ctrlKey && event.shiftKey) {
                            switch (event.which) {
                                case 37: alert('suck'); break;
                                case 39: alert('suck'); break;
                            }
                        }
                        $scope.$apply();
                    });

                }
            });
        }
    }
})(angular);