module Kernel {
    export interface iFolder {
        id: number;
        name: string;
        parentID: number;
        path: string;
        userID: number;
        subdirs?: Array<iFolder>;
        created: string;
        updated: string;
        files: Array<iFile>;
    }
}