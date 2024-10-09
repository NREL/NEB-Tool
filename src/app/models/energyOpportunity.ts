import { IdbEntry, getNewIdbEntry } from "./idbEntry";
import { UtilityOptions, UtilityType } from "../shared/constants/utilityTypes";
import { UtilityEnergyUse } from "./utilityEnergyUses";

export interface IdbEnergyOpportunity extends IdbEntry {
    name: string,
    userId: string,
    facilityId: string,
    companyId: string,
    assessmentId: string,
    energySavings: number,
    implementationCost: number,
    utilityType: UtilityType,
    utilityTypes: Array<UtilityType>,
    energyUnit: string,
    costSavings: number,
    notes: string,
    includeSavings: boolean,
    includeNote: boolean
}

export function getNewIdbEnergyOpportunity(userId: string, companyId: string, facilityId: string, 
    assessmentId: string, utilityEnergyUses: Array<UtilityEnergyUse>): IdbEnergyOpportunity {
    let idbEntry: IdbEntry = getNewIdbEntry();
    let utilityTypes: Array<UtilityType> = utilityEnergyUses
        .filter(use => use.include)
        .map(use => use.utilityType);
    let utilityType: UtilityType = utilityTypes?.[0];
    let energyUnit: string = 'MMBtu';
    if (utilityType) {
        let energyUse = utilityEnergyUses.find(use => use.utilityType === utilityType);
        let selectedUtilityOption = UtilityOptions.find(
            _option => _option.utilityType == utilityType);
        let selectedUnitOption = selectedUtilityOption.energyUnitOptions.find(
            _unitOption => _unitOption.value == energyUse.energyUnit);
        if (selectedUtilityOption.isStandardEnergyUnit 
            && selectedUnitOption.isStandard !== false) { // Standard unit
            energyUnit = energyUse.energyUnit;
        } else { // Non-standard unit
            energyUnit = energyUse.energyUnitStandard;
        }
    }
    return {
        ...idbEntry,
        name: 'New Opportunity',
        userId: userId,
        companyId: companyId,
        facilityId: facilityId,
        assessmentId: assessmentId,
        energySavings: undefined,
        implementationCost: undefined,
        utilityType: utilityType,
        utilityTypes: utilityTypes,
        energyUnit: energyUnit,
        costSavings: undefined,
        notes: undefined,
        includeSavings: false,
        includeNote: false
    }
}