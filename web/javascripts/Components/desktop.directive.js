(function (angular) {
    angular.module('components').directive('desktop', Directive);

    Directive.$inject = ['$window', '$document', 'filesystemService', '$rootScope'];

    function Directive($window, $document, fs, $rootScope) {
        return {
            'templateUrl': '/javascripts/Views/desktop.html',
            'link': Link,
            'scope': {
                //'desktop': '=desktop'
            }
        };

        function Link($scope, $element, $attrs) {
            $scope.background = {
                'settings': {
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

            $scope.launch = function (app) {
                $scope.apps.push({ 'src': app, 'selected': false });
            };


            // Events
            $rootScope.$on('DesktopImageChanged', function (event, data) {
                $scope.backgroundSettings.backgroundImage = data;
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
            });

            $scope.$on('ApplicationSelected', function (event, data) {
                for (var i in $scope.apps) {
                    $scope.apps[i].selected = (parseInt(i) === data);
                }
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
    }
})(angular);