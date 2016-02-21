/// <reference path='../models.d.ts' />
module Kernel{
    export class DesktopGrid{
        private _rows: number;
        private _cols: number;
        private _cells: Array<DesktopItem>;
        constructor(height: number, width: number) {
            this._cells = [];
            this._rows = height/20;
            this._cols = width/30;

            for(let i = 0; i < 50; i++){
                this._cells.push(new DesktopItem());
            }
        }
    }
}