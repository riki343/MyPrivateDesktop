(function (angular) {
    angular
        .module('audio-player')
        .directive('audioPlayer', Directive)
        .controller('audioPlayerDirectiveController', Controller)
    ;

    Directive.$inject = [ '$window' ];
    function Directive($window) {
        return {
            'restriction': 'E',
            'templateUrl': '/applications/system/AudioPlayer/Views/audio-player.directive.html',
            'controller': 'audioPlayerDirectiveController',
            'controllerAs': 'player',
            'bindToController': {
                'config': '=config',
                'data': '=data'
            },
            'scope': true,
            'link': Link
        };

        function Link($scope, $element, $attr) {
            var mainContainer = $element.find('div.audio-player-main-container');
            var playlist = $element.find('div.playlist');

            var resize = function () {
                playlist.css('height', mainContainer.height() - 50 + 'px');
            };

            angular.element($window).on('resize', resize);
            resize();
        }
    }

    Controller.$inject = ['$scope'];
    function Controller($scope) {
        this.api = {};
        this.currentTrack = null;
        this.state = 'stop';

        this.onPlayerReady = function (api) {
            this.api = api;
        }.bind(this);

        this.playNext = function () {

        }.bind(this);

        this.playPrev = function () {

        }.bind(this);

        this.onPlayerStateChanged = function () {

        }.bind(this);
    }
})(angular);