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