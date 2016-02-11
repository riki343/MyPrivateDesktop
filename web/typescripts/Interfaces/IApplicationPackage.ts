module Kernel {
    export interface IApplicationPackage
    {
        folder: string;
        module: Object;
        bootstrapView: string;
        systemDependencies: Array<string>;
        dependencies: Array<string>;
        javascript: Array<Object>;
        resources: Array<any>;
        info: Object;
    }
}