import { IdbEntry, getNewIdbEntry } from "./idbEntry";

export interface IdbProject extends IdbEntry {
    name: string,
    userId: string,
    facilityId: string,
    companyId: string,
    assessmentId: string,
    energySavings: number,
    implementationCost: number,
    projectType: string,
    costSavings: number,
    notes: string,
    nonEnergyBenefitIds: Array<string>,
    includeSavings: boolean
}

export function getNewIdbProject(userId: string, companyId: string, facilityId: string, assessmentId: string): IdbProject {
    let idbEntry: IdbEntry = getNewIdbEntry();
    return {
        ...idbEntry,
        name: 'New Project',
        userId: userId,
        companyId: companyId,
        facilityId: facilityId,
        assessmentId: assessmentId,
        energySavings: undefined,
        implementationCost: undefined,
        projectType: undefined,
        costSavings: undefined,
        notes: undefined,
        nonEnergyBenefitIds: [],
        includeSavings: false
    }
}