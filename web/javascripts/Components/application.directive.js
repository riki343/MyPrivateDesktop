(function (angular) {
    angular.module('components').directive('application', Directive);

    Directive.$inject = ['$http', '$compile'];

    function Directive($http, $compile) {
        function Link($scope, $element, $attr) {
            var windowTemplate =
                '<div style="background-color: white; color: black;">' +
                    '<p style=\"background-color: lightblue; height: 20px; width: 100%; margin: 0; display: table;\"'+
                        'ng-mousedown=\"down($event);\" ng-mouseup=\"up($event);\">' +
                            '<!--ng-mouseleave=\"up($event);\" ng-mouseover=\"moveWindow($event);\"-->' +
                            '<span class="close" ng-click="">&times;</span>' +
                    '</p>' +
                '</div>';

            // When package loaded need to load application files
            $scope.$on('ApplicationPackageLoaded', function (event, response) {
                $scope.app = response;
                var basePath = 'http://desktop.dev/javascripts/Components/' + response.folder + '/';
                promise = $http.get(basePath + response.bootstrapView);
                var filesToLoad = [];
                filesToLoad.push(basePath + response.module.file);
                angular.forEach(response.javascript, function (val) {
                    this.push(basePath + val.file);
                }, filesToLoad);
                yepnope(filesToLoad, function () {
                    promise.success(function (response) {
                        $scope.$broadcast('ApplicationFilesLoaded', response);
                    });
                });
            });

            // When all files loaded need to bootstrap app...
            $scope.$on('ApplicationFilesLoaded', function (event, response) {
                var directive = $compile(angular.element(windowTemplate))($scope);
                angular.element(document).find('body').append(directive);
                decorateApp(directive);

                var appContainer = angular.element('<div><div ui-view="' + $scope.app.module.name +'"></div></div>');
                appContainer.id = $scope.app.module.name;
                directive.append(appContainer);
                angular.bootstrap(appContainer, [$scope.app.module.name]);
                $element.remove();
            });

            // Load package
            var promise = $http.get($scope.app);
            promise.success(function (response) {
                $scope.$broadcast('ApplicationPackageLoaded', response);
            });

            $scope.dragAndDrop = {
                'draggable': false,
                'lastX': 0,
                'lastY': 0
            };

            $scope.down = function (event) {
                console.log(event);
            };

            $scope.up = function (event) {
                console.log(event);
            };

            function decorateApp($element) {
                $scope.height = 480;
                var top = '10%'; var left = '10%';
                $element.css('position', 'absolute');
                $element.css('width', '600px');
                $element.css('height', $scope.height + 'px');
                $element.css('top', top);
                $element.css('left', left);
                $element.css('z-index', '10');
                $element.css('box-sizing', 'border-box');
                $element.css('border', 'solid white 1px');
                $element.css('box-shadow', '10px 10px 35px 5px black');
            }
        }

        return {
            'restrict': 'E',
            'link': Link,
            'scope': {
                'app': '=app'
            }
        };
    }
})(angular);