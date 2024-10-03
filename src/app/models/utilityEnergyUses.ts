
import { FacilityIdbService } from "../indexed-db/facility-idb.service";
import { UtilityOptions, UtilityType } from "../shared/constants/utilityTypes";
import { getDefaultUnitSettings, UnitSettings } from "./unitSettings";

export interface UtilityEnergyUse {
    utilityType: UtilityType;
    include: boolean;
    energyUse: number;
    unit: string;
}

export function getDefaultUtilityEnergyUses(facilityUnitSettings: UnitSettings): Array<UtilityEnergyUse> {
    return UtilityOptions.map(option => {
        const utilityType = option.utilityType.replace(/\s+/g, ''); // Remove spaces
        const camelCaseType = utilityType.charAt(0).toLowerCase()
                 + utilityType.slice(1);
        let energyUnit = option.energyDefaultUnit.value;
        if (facilityUnitSettings[`${camelCaseType}Unit`] && facilityUnitSettings[`include${utilityType}`]) {
            energyUnit = facilityUnitSettings[`${camelCaseType}Unit`];
        }
        return {
            utilityType: option.utilityType,
            include: false,
            energyUse: 0,
            unit: energyUnit
        };
    });
}