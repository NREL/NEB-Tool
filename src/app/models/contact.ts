import { IdbEntry, getNewIdbEntry } from "./idbEntry";

export interface IdbContact extends IdbEntry {
    name: string,
    phone: string,
    email: string,
    role: string,
    guid: string,
    companyId: string,
    facilityIds: Array<string>,
    assessmentIds: Array<string>,
    userId: string
}

export function getNewIdbContact(userId: string, companyId: string): IdbContact {
    let idbEntry: IdbEntry = getNewIdbEntry();
    return {
        ...idbEntry,
        name: undefined,
        userId: userId,
        companyId: companyId,
        facilityIds: [],
        assessmentIds: [],
        phone: undefined,
        email: undefined,
        role: undefined
    }
}