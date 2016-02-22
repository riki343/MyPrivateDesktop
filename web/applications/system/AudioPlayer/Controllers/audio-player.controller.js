(function (angular) {
    angular.module('audio-player').controller('audioPlayerController', Controller);

    Controller.$inject = [
        '$scope', 'filesystemService', '$sce'
    ];

    function Controller($scope, fs, $sce) {
        this.config = {
            'theme': '/bower_components/videogular-themes-default/videogular.min.css'
        };

        this.data = {
            'tracks': [
                [{'name': '1', src: $sce.trustAsResourceUrl("/temp/1.mp3"), type: "audio/mpeg"}],
                [{'name': '2', src: $sce.trustAsResourceUrl("/temp/2.mp3"), type: "audio/mpeg"}],
                [{'name': '3', src: $sce.trustAsResourceUrl("/temp/3.mp3"), type: "audio/mpeg"}],
                [{'name': '4', src: $sce.trustAsResourceUrl("/temp/4.mp3"), type: "audio/mpeg"}],
                [{'name': '5', src: $sce.trustAsResourceUrl("/temp/5.mp3"), type: "audio/mpeg"}],
                [{'name': '6', src: $sce.trustAsResourceUrl("/temp/6.mp3"), type: "audio/mpeg"}],
                [{'name': '7', src: $sce.trustAsResourceUrl("/temp/7.mp3"), type: "audio/mpeg"}]
            ]
        };
    }
})(angular);