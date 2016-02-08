/// <reference path='../models.d.ts' />

module Kernel {
    export class ApplicationWindowSettings
    {
        private _windowBox: WindowBox;
        private _header: Block;

        constructor(box:WindowBox) {
            this._header = new Block();
            this._header.textColor = "black";
            this._header.bgColor = "lightblue";
            this._header.height = "23px";
            this._windowBox = box;
        }

        get header():Block {
            return this._header;
        }

        set header(value:Block) {
            this._header = value;
        }

        get windowBox():WindowBox {
            return this._windowBox;
        }
    }
}