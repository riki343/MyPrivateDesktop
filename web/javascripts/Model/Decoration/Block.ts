/// <reference path='decorations.d.ts' />

module Kernel {
    export class Block {
        private _width: string;
        private _height: string;
        private _textColor: string;
        private _bgColor: string;

        get width():string {
            return this._width;
        }

        set width(value:string) {
            this._width = value;
        }

        get height():string {
            return this._height;
        }

        set height(value:string) {
            this._height = value;
        }

        get textColor():string {
            return this._textColor;
        }

        set textColor(value:string) {
            this._textColor = value;
        }

        get bgColor():string {
            return this._bgColor;
        }

        set bgColor(value:string) {
            this._bgColor = value;
        }
    }
}