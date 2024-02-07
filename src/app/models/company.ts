import { IdbEntry, getNewIdbEntry } from "./idbEntry";

export interface IdbCompany extends IdbEntry {
    name: string,
    userId: string
}

export function getNewIdbCompany(userId: string): IdbCompany{
    let idbEntry: IdbEntry = getNewIdbEntry();
    return {
        ...idbEntry,
        name: 'New Company',
        userId: userId
    }
}