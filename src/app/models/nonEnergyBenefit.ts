import { IdbEntry, getNewIdbEntry } from "./idbEntry";

export interface IdbNonEnergyBenefit extends IdbEntry{
    name: string
    userId: string,
    facilityId: string,
    companyId: string,
    assessmentId: string,
    kpiId: string,
    notes: string
}

export function getNewIdbNonEnergyBenefit(userId: string, companyId: string, facilityId: string, assessmentId: string): IdbNonEnergyBenefit {
    let idbEntry: IdbEntry = getNewIdbEntry();
    return {
        ...idbEntry,
        name: 'New NEB',
        userId: userId,
        companyId: companyId,
        facilityId: facilityId,
        assessmentId: assessmentId,
        kpiId: undefined,
        notes: undefined
    }
}