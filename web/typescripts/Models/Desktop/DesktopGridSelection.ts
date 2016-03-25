module Kernel {
    export class DesktopGridSelection {
        private _from: Point;
        private _to: Point;
        private _distance: Distance;

        constructor(from?: Point, to?: Point, distance?: Distance) {
            this._from = from;
            this._to = to;
            this._distance = distance;
        }

        get from():Kernel.Point {
            return this._from;
        }

        set from(value:Kernel.Point) {
            this._from = value;
        }

        get to():Kernel.Point {
            return this._to;
        }

        set to(value:Kernel.Point) {
            this._to = value;
        }

        get distance():Kernel.Distance {
            return this._distance;
        }

        set distance(value:Kernel.Distance) {
            this._distance = value;
        }
    }
}