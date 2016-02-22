module Kernel {
    export class DesktopItem {
        private _id: number;
        private _desktopId: number;
        private _row: number;
        private _col: number;
        private _type: any;
        private _element: any;
        private _width: number;
        private _height: number;

        constructor(data?: any) {
            if (angular.isDefined(data)) {
                this._id = data.id;
                this._desktopId = data.desktopId;
                this._row = data.row;
                this._col = data.col;
                this._type = data.type;
                this.element = data.element;
            }

            this.width = 50;
            this.height = 40;
        }

        get id() {
            return this._id;
        }

        get desktopId() {
            return this._desktopId;
        }

        get row() {
            return this._row;
        }

        get col() {
            return this._col;
        }

        get type() {
            return this._type;
        }

        set row(value) {
            this._row = value;
        }

        set col(value) {
            this._col = value;
        }

        set type(value) {
            this._type = value;
        }

        get width() {
            return this._width;
        }

        set width(value) {
            this._width = value;
        }

        get height() {
            return this._height;
        }

        set height(value) {
            this._height = value;
        }

        get element():any {
            return this._element;
        }

        set element(value:any) {
            this._element = value;
        }
    }
}