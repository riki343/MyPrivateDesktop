/// <reference path='../models.d.ts' />

module Kernel {
    export class Desktop {
        set grid(value:Kernel.DesktopGrid) {
            this._grid = value;
        }
        private _id: number;
        private _userId: number;
        private _grid: DesktopGrid;
        private _settings: DesktopSettings;
        private _created;
        private _updated;

        constructor(private width: number, private height: number, data?:any) {
            this._id = data.id;
            this._userId = data.userId;
            this._settings = new DesktopSettings(data.settings);
            this._created = data.created;
            this._updated = data.updated;
            this.grid = new DesktopGrid(height, width/*, data.TODO */);
        }

        public initGrid(height:number, width:number) {
            this._grid = new DesktopGrid(height,width);
        }

        get id():number {
            return this._id;
        }

        get userId():number {
            return this._userId;
        }

        get grid():DesktopGrid {
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
    }
}