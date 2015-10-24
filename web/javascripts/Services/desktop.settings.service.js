(function (angular) {
    angular.module('services').factory('desktopSettings', Service);

    Service.$inject = [ '$rootScope' ];

    function Service($rootScope) {
        var self = this;
        this.image = '/images/1.jpg';

        var factory = {
            'background': {
                'getImage': function () {
                    return self.image;
                },
                'setImage': function (image) {
                    self.image = image;
                    $rootScope.$broadcast('DesktopImageChanged', image);
                    // need to send $http request to save new image
                }
            }
        };

        return factory;
    }
})(angular);