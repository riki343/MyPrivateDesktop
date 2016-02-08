/// <reference path='../models.d.ts' />

module Kernel {
    export class WindowBox
    {
        private _height: number;
        private _width: number;
        private _top: number;
        private _left: number;

        constructor (
            top:number, left:number,
            width:number = 640, height:number = 380
        ) {
            this._width = width;
            this._height = height;
            this._top = top;
            this._left = left;
        }


        get height():number {
            return this._height;
        }

        set height(value:number) {
            this._height = value;
        }

        get width():number {
            return this._width;
        }

        set width(value:number) {
            this._width = value;
        }

        get top():number {
            return this._top;
        }

        set top(value:number) {
            this._top = value;
        }

        get left():number {
            return this._left;
        }

        set left(value:number) {
            this._left = value;
        }
    }
}