/// <reference path='../models.d.ts' />
module Kernel{
    export class DesktopGrid {
        private _rowsCount: number;
        private _colsCount: number;
        private _rows: Array<Array<DesktopItem>>;

        constructor(height: number, width: number, data?: Array<any>) {
            if (angular.isDefined(data) === true) {
                //angular.forEach(data, (item: any) => {
                //    this.cells.push(new DesktopItem(item));
                //}); TODO
            } else {
                this.rows = [];
                this.rowsCount = 15;
                this.colsCount = 26;

                for(let i = 0; i < this.rowsCount; i++) {
                    let array = [];
                    for (let j = 0; j < this.colsCount; j++) {
                        let item = new DesktopItem();
                        item.row = i;
                        item.col = j;
                        array.push(item);
                    }
                    this.rows.push(array);
                }
            }

        }


        get rowsCount():number {
            return this._rowsCount;
        }

        set rowsCount(value:number) {
            this._rowsCount = value;
        }

        get colsCount():number {
            return this._colsCount;
        }

        set colsCount(value:number) {
            this._colsCount = value;
        }

        get rows():Array<Array<Kernel.DesktopItem>> {
            return this._rows;
        }

        set rows(value:Array<Array<Kernel.DesktopItem>>) {
            this._rows = value;
        }
    }
}