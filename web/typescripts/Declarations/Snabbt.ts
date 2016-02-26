interface ISnabbtControl {
    setValue(progress: number);
    rollback(callback: Function);
    finish(callback: Function);
    snabbt(params: Object): ISnabbtControl;
}

interface ISnabbt {
    (element: JQuery, params: Object): ISnabbtControl;
}

declare var snabbt: ISnabbt;