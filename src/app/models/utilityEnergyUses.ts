
import { UtilityOptions } from "../shared/constants/utilityTypes";
import { getDefaultUnitSettings } from "./unitSettings";

export interface UtilityEnergyUse {
    utilityType: string;
    include: boolean;
    energyUse: number;
    unit: string;
}

export function getDefaultUtilityEnergyUses(): Array<UtilityEnergyUse> {
    return UtilityOptions.map(option => {
        return {
            utilityType: option.utilityType,
            include: false,
            energyUse: 0,
            unit: option.energyDefaultUnit.value
        };
    });
}