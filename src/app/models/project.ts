import { IdbEntry, getNewIdbEntry } from "./idbEntry";

export interface IdbProject extends IdbEntry {
    name: string,
    userId: string,
    facilityId: string,
    companyId: string,
    assessmentId: string,
    hasEnergySavings: boolean,
    energySavings: number,
    hasImplementationCost: boolean,
    implementationCost: number,
    projectType: string,
    costSavings: number,
    hasCostSavings: boolean
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
        hasEnergySavings: false,
        hasImplementationCost: false,
        costSavings: undefined,
        hasCostSavings: false
    }
}