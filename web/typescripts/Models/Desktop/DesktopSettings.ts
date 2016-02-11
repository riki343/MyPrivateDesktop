module Kernel {
    export class DesktopSettings {
        private backgroundImage;
        private backgroundRepeat;
        private backgroundPosition;
        private backgroundSize;

        constructor(data?:any) {
            this.backgroundImage = data.backgroundImage;
            this.backgroundRepeat = data.backgroundRepeat;
            this.backgroundPosition = data.backgroundPosition;
            this.backgroundSize = data.backgroundSize;
        }

        public getCss() {
            return {
                'background-image': this.backgroundImage,
                'background-repeat': this.backgroundRepeat,
                'background-position': this.backgroundPosition,
                'background-size': this.backgroundSize,
            };
        }
    }
}