import { IdbEntry, getNewIdbEntry } from "./idbEntry";

export interface IdbAssessment extends IdbEntry {
    name: string,
    userId: string,
    facilityId: string,
    companyId: string
}

export function getNewIdbAssessment(userId: string, companyId: string, facilityId: string): IdbAssessment {
    let idbEntry: IdbEntry = getNewIdbEntry();
    return {
        ...idbEntry,
        name: 'New Assessment',
        userId: userId,
        companyId: companyId,
        facilityId: facilityId
    }
}