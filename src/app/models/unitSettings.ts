import { UtilityOptions } from "../shared/constants/utilityTypes";

export interface UnitSettings {
    includeElectricity: boolean,
    electricityUnit: string,
    electricityPrice: number,

    includeNaturalGas: boolean,
    naturalGasUnit: string,
    naturalGasPrice: number,
    
    includeSteam: boolean,
    steamUnit: string,
    steamPrice: number,
    
    includeWater: boolean,
    waterUnit: string,
    waterPrice: number,

    includeWasteWater: boolean,
    wasteWaterUnit: string,
    wasteWaterPrice: number,

    includeOtherFuels: boolean,
    otherFuelsUnit: string,
    otherFuelsPrice: number,

    includeCompressedAir: boolean,
    compressedAirUnit: string,
    compressedAirPrice: number,
}

export function getDefaultUnitSettings(): UnitSettings {
    const settings: UnitSettings = UtilityOptions.reduce((settings, option) => {
        const utilityType = option.utilityType.replace(/\s+/g, ''); // Remove spaces
        const camelCaseType = utilityType.charAt(0).toLowerCase()
                 + utilityType.slice(1); // Lowercase first letter

        settings[`include${utilityType}`] = false;
        settings[`${camelCaseType}Unit`] = option.energyDefaultUnit.value;
        settings[`${camelCaseType}Price`] = 0;
        return settings;
    }, {} as UnitSettings);
    // set defaults to include electricity and natural gas
    settings.includeElectricity = true;
    settings.includeNaturalGas = true;
    return settings;
}