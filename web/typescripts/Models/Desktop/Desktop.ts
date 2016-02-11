/// <reference path='../models.d.ts' />

module Kernel {
    export class Desktop {
        private _id: number;
        private _userId: number;
        private _grid: Array<DesktopItem>;
        private _settings: DesktopSettings;
        private _created;
        private _updated;

        constructor(private width: number, private height: number, data?:any) {
            this._id = data.id;
            this._userId = data.userId;

            this._grid = [];
            for (let i = 0; i < data.grid.length; i++) {
                this._grid.push(new DesktopItem(data.grid[i]));
            }

            this._settings = new DesktopSettings(data.settings);
            this._created = data.created;
            this._updated = data.updated;
        }

        get id():number {
            return this._id;
        }

        get userId():number {
            return this._userId;
        }

        get grid():Array<DesktopItem> {
            return this._grid;
        }

        get settings():DesktopSettings {
            return this._settings;
        }

        get created() {
            return this._created;
        }

        get updated() {
            return this._updated;
        }

        public initGrid() {
            let x = this.width / 30;
            let y = this.height / 20;
            var cells: Array<DesktopItem> = [];

            for (var i = 0; i < 600; i++) {
                cells.push(new DesktopItem());
            }

            return {
                'cellWidth': x,
                'cellHeight': y,
                'cells': cells
            };
        }
    }
}