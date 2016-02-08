module Kernel {
    export class DesktopItem {
        private _id;
        private _desktopId;
        private _row;
        private _col;
        private _type;
        private _item;

        constructor(data?: any) {
            if (angular.isDefined(data)) {
                this._id = data.id;
                this._desktopId = data.desktopId;
                this._row = data.row;
                this._col = data.col;
                this._type = data.type;
                this._item = data.item;
            }
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

        get item() {
            return this._item;
        }
    }
}