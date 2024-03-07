import { IdbEntry, getNewIdbEntry } from "./idbEntry";

export interface IdbProject extends IdbEntry {
    name: string,
    userId: string,
    facilityId: string,
    companyId: string
}

export function getNewIdbProject(userId: string, companyId: string, facilityId: string): IdbProject {
    let idbEntry: IdbEntry = getNewIdbEntry();
    return {
        ...idbEntry,
        name: 'New Project',
        userId: userId,
        companyId: companyId,
        facilityId: facilityId
    }
}