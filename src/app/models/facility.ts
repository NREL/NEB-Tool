import { IdbEntry, getNewIdbEntry } from "./idbEntry";

export interface IdbFacility extends IdbEntry {
    name: string,
    companyId: string,
    userId: string
}

export function getNewIdbFacility(userId: string, companyId: string): IdbFacility {
    let idbEntry: IdbEntry = getNewIdbEntry();
    return {
        ...idbEntry,
        name: 'New Facility',
        userId: userId,
        companyId: companyId
    }
}