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
                playlist.css('max-height', mainContainer.height() - 50 + 'px');
            };

            angular.element($window).on('resize', resize);
            resize();
        }
    }

    Controller.$inject = ['$scope', '$timeout'];
    function Controller($scope, $timeout) {
        this.api = {};
        this.selected = null;
        this.currentTime = 0.0;
        this.duration = 0.0;

        this.onPlayerReady = function (api) {
            this.api = api;
        }.bind(this);

        this.playNext = function () {
            if (this.data.tracks.length > 0) {
                var state = this.api.currentState;
                var index = this.data.tracks.indexOf(this.selected);
                if (index < this.data.tracks.length - 1 && index >= 0) {
                    this.selected = this.data.tracks[index + 1];
                } else {
                    this.selected = this.data.tracks[0];
                }
                if (state === 'play') {
                    $timeout(function () { this.api.play(); }.bind(this));
                }
            }
        }.bind(this);

        this.play = function () {
            if (this.selected === null) {
                this.selected = this.data.tracks[0];
            }
            $timeout(function () { this.api.play(); }.bind(this));
            if (this.api.currentState !== 'play') {}
        }.bind(this);

        this.pause = function () {
            this.api.pause();
            if (this.api.currentState === 'play') {}
        }.bind(this);

        this.stop = function () {
            this.api.stop();
            if (this.api.currentState !== 'stop') {}
        }.bind(this);

        this.playPrev = function () {
            if (this.data.tracks.length > 0) {
                var state = this.api.currentState;
                var index = this.data.tracks.indexOf(this.selected);
                if (index > 0) {
                    this.selected = this.data.tracks[index - 1];
                } else {
                    this.selected = this.data.tracks[this.data.tracks.length - 1];
                }
                if (state === 'play') {
                    $timeout(function () { this.api.play(); }.bind(this));
                }
            }
        }.bind(this);

        this.onStateChanged = function () {

        }.bind(this);

        this.onComplete = function () {
            this.playNext();
        }.bind(this);

        this.onTimeUpdated = function (current, duration) {
            this.currentTime = current;
            this.duration = duration;
        }.bind(this);
    }
})(angular);