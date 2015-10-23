(function (angular) {
    angular.module('components').directive('desktop', Directive);

    Directive.$inject = ['$window', '$document', 'filesystemService'];

    function Directive($window, $document, fs) {
        return {
            'templateUrl': '/javascripts/Views/desktop.html',
            'link': Link,
            'scope': {
                //'desktop': '=desktop'
            }
        };

        function Link($scope, $element, $attrs) {
            $scope.backgroundSettings = {
                'background-image': "url('/images/1.jpg')",
                'background-repeat': 'no-repeat',
                'background-position': 'center',
                'background-size': 'cover',
                'width': $window.innerWidth,
                'height': $window.innerHeight
            };

            $scope.$on('DesktopImageChanged', function (event, data) {
                $scope.backgroundSettings.backgroundImage = data;
            });

            $scope.contextMenu = [
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
            ];

            angular.element($window).bind('resize', function (event) {
                $scope.backgroundSettings.width  = $window.innerWidth;
                $scope.backgroundSettings.height = $window.innerHeight;
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