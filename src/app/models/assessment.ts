import { UnitOption } from "../shared/constants/unitOptions";
import { UtilityType } from "../shared/constants/utilityTypes";
import { IdbEntry, getNewIdbEntry } from "./idbEntry";

export interface IdbAssessment extends IdbEntry {
    name: string,
    userId: string,
    facilityId: string,
    companyId: string,
    assessmentType: string,
    utilityTypes: Array<UtilityType>, // track all utility types associated with assessment type
    utilityType: UtilityType, // temporary limited to one utility type
    unitOption: UnitOption,
    equipmentId: string,
    energyUse: number,
    cost: number,
    energySavings: number,
    costSavings: number,
    visitDate: Date,
    notes: string,
    implementationCost: number
}

export function getNewIdbAssessment(userId: string, companyId: string, facilityId: string): IdbAssessment {
    let idbEntry: IdbEntry = getNewIdbEntry();
    return {
        ...idbEntry,
        name: 'New Assessment',
        userId: userId,
        companyId: companyId,
        facilityId: facilityId,
        assessmentType: undefined,
        utilityTypes: [],
        utilityType: undefined,
        unitOption: undefined,
        equipmentId: undefined,
        energyUse: undefined,
        cost: undefined,
        energySavings: undefined,
        costSavings: undefined,
        notes: undefined,
        visitDate: undefined,
        implementationCost: undefined
    }
}