import { IdbEntry, getNewIdbEntry } from "./idbEntry";

export interface IdbNonEnergyBenefit extends IdbEntry {
    name: string
    userId: string,
    facilityId: string,
    companyId: string,
    assessmentId: string,
    kpiId: string,
    includeNote: boolean,
    notes: string,
    projectIds: Array<string>,
    annualKpiImpact: number
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
        notes: undefined,
        projectIds: [],
        includeNote: false,
        annualKpiImpact: undefined
    }
}