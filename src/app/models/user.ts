import { getGUID } from "../shared/helpFunctions";
import { IdbEntry, getNewIdbEntry } from "./idbEntry";

export interface IdbUser extends IdbEntry {
    name: string;
}

export function getNewIdbUser(): IdbUser {
    let idbEntry: IdbEntry = getNewIdbEntry();
    return {
        ...idbEntry,
        name: 'New User'
    }
}

// export class User {

//     id?: number;
//     guid: string;
//     name: string;
//     createdDate: Date;
//     modifiedDate: Date;
//     constructor() {
//         this.guid = getGUID();
//         this.name = 'New User';
//         this.createdDate = new Date();
//         this.setModifiedDate();
//     }

//     setModifiedDate() {
//         this.modifiedDate = new Date();
//     }
// }