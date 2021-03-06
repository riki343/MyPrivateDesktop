module Kernel {
    export interface IModuleFile {
        type: string;
        name: string;
        file: string;
    }

    export interface IModuleMainFile {
        name: string;
        file: string;
    }

    export interface IModuleFileSettings {
        top: number;
        left: number;
        width: number;
        height: number;
    }

    export interface IApplicationPackage {
        folder: string;
        module: IModuleMainFile;
        bootstrapView: string;
        systemDependencies: Array<string>;
        dependencies: Array<string>;
        javascript: Array<IModuleFile>;
        stylesheet: Array<IModuleFile>;
        resources: Array<any>;
        settings: IModuleFileSettings;
        info: Object;
    }
}