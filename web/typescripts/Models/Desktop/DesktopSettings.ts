module Kernel {
    export class DesktopSettings {
        private _backgroundImage;
        private _backgroundPosition;
        private _backgroundSize;

        constructor(data?:any) {
            this._backgroundImage = data.backgroundImage;
            this._backgroundPosition = data.backgroundPosition;
            this._backgroundSize = data.backgroundSize;
        }

        public getCss(): Object {
            return {
                'background-image': 'url(' + this.backgroundImage + ')',
                'background-position': this.backgroundPosition,
                'background-size': this.backgroundSize,
            };
        }

        set backgroundImage(value) {
            this._backgroundImage = value;
        }

        set backgroundPosition(value) {
            this._backgroundPosition = value;
        }

        set backgroundSize(value) {
            this._backgroundSize = value;
        }

        get backgroundImage() {
            return this._backgroundImage;
        }

        get backgroundPosition() {
            return this._backgroundPosition;
        }

        get backgroundSize() {
            return this._backgroundSize;
        }
    }
}