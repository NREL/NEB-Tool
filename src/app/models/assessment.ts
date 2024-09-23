import { AssessmentOptions, AssessmentType } from "../shared/constants/assessmentTypes";
import { UnitOption } from "../shared/constants/unitOptions";
import { UtilityType } from "../shared/constants/utilityTypes";
import { IdbEntry, getNewIdbEntry } from "./idbEntry";
import { getDefaultUtilityEnergyUses, UtilityEnergyUse } from "./utilityEnergyUses";

export interface IdbAssessment extends IdbEntry {
    name: string,
    userId: string,
    facilityId: string,
    companyId: string,
    assessmentType: AssessmentType,
    utilityTypes: Array<UtilityType>, // track all utility types associated with assessment type
    utilityEnergyUses: Array<UtilityEnergyUse>, // track all utility energy uses
    // utilityType: UtilityType, // temporary limited to one utility type
    unitOptionValue: string,
    equipmentId: string,
    energyUse: number,
    cost: number,
    energySavings: number,
    costSavings: number,
    visitDate: Date,
    notes: string,
    implementationCost: number
}

const defaultAssessmentType: AssessmentType = "Pump";
const defaultUtilityTypes: Array<UtilityType> = AssessmentOptions.find(
    _option => _option.assessmentType === defaultAssessmentType)?.utilityTypes || [];

export function getNewIdbAssessment(userId: string, companyId: string, facilityId: string): IdbAssessment {
    let idbEntry: IdbEntry = getNewIdbEntry();
    return {
        ...idbEntry,
        name: 'New Assessment',
        userId: userId,
        companyId: companyId,
        facilityId: facilityId,
        assessmentType: defaultAssessmentType,
        utilityTypes: defaultUtilityTypes,
        utilityEnergyUses: getDefaultUtilityEnergyUses(),
        // utilityType: undefined,
        unitOptionValue: undefined,
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