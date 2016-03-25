module Kernel {
    export interface iFile {
        id: number;
        name: string;
        extension: string;
        directoryID: number;
        path: string;
        created: string;
        updated: string;
        userID: number;
        webPath: string;
    }
}