import { IdbEntry, getNewIdbEntry } from "./idbEntry";

export interface IdbEnergyOpportunity extends IdbEntry {
    name: string,
    userId: string,
    facilityId: string,
    companyId: string,
    assessmentId: string,
    energySavings: number,
    implementationCost: number,
    opportunityType: string,
    costSavings: number,
    notes: string,
    // nonEnergyBenefitIds: Array<string>,
    includeSavings: boolean,
    includeNote: boolean
}

export function getNewIdbEnergyOpportunity(userId: string, companyId: string, facilityId: string, assessmentId: string): IdbEnergyOpportunity {
    let idbEntry: IdbEntry = getNewIdbEntry();
    return {
        ...idbEntry,
        name: 'New Opportunity',
        userId: userId,
        companyId: companyId,
        facilityId: facilityId,
        assessmentId: assessmentId,
        energySavings: undefined,
        implementationCost: undefined,
        opportunityType: undefined,
        costSavings: undefined,
        notes: undefined,
        // nonEnergyBenefitIds: [],
        includeSavings: false,
        includeNote: false
    }
}