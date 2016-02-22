module Kernel {
    export class DesktopSettings {
        private _backgroundImage;
        private _backgroundPosition;
        private _backgroundSize;

        constructor(data?:any) {
            this._backgroundImage = data._backgroundImage;
            this._backgroundPosition = data._backgroundPosition;
            this._backgroundSize = data._backgroundSize;
        }

        public getCss(): Object {
            return {
                'background-image': this._backgroundImage,
                'background-position': this._backgroundPosition,
                'background-size': this._backgroundSize,
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
    }
}