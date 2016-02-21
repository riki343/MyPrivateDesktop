interface YepNopeInterface {
    injectJs(path: string, callback: any);
    injectCss(path: string, callback: any);
    constructor(path: string, callback: any);
    (path: Array<any>, callback: any);
}

declare var yepnope: YepNopeInterface;