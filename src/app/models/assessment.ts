import { IdbEntry, getNewIdbEntry } from "./idbEntry";

export interface IdbAssessment extends IdbEntry {
    name: string,
    userId: string,
    facilityId: string,
    companyId: string,
    equipmentId: string,
    energyUse: number,
    cost: number,
    energySavings: number,
    costSavings: number,
    contactId: string,
    notes: string,
    visitDate: Date
}

export function getNewIdbAssessment(userId: string, companyId: string, facilityId: string): IdbAssessment {
    let idbEntry: IdbEntry = getNewIdbEntry();
    return {
        ...idbEntry,
        name: 'New Assessment',
        userId: userId,
        companyId: companyId,
        facilityId: facilityId,
        equipmentId: undefined,
        energyUse: undefined,
        cost: undefined,
        energySavings: undefined,
        costSavings: undefined,
        contactId: undefined,
        notes: undefined,
        visitDate: undefined
    }
}