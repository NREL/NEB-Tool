// export enum EnergySystem {
//     Pump = "Pump",
//     Fan = "Fan",
//     ProcessHeating = "Process Heating",
//     CompressedAir = "Compressed Air",
//     Steam = "Steam"
// };

import { UtilityType } from "./utilityTypes";


export type EquipmentType = "Pump" | "Fan" | "Process Heating" | "Compressed Air" | "Steam" | "Process Cooling" | "Motor" | "Lighting" | "HVAC" | "Mobile";
export const EquipmentTypes: Array<EquipmentType> = ["Pump", "Fan", "Process Heating", "Compressed Air", "Steam", "Process Cooling", "Motor", "Lighting", "HVAC", "Mobile"];

export const EquipmentTypeOptions: Array<{ equipmentType: EquipmentType, utilityTypes: Array<UtilityType> }> = EquipmentTypes.map(type => {
    switch (type) {
        case "Pump":
            return { equipmentType: type, utilityTypes: ['Electricity'] };
        case "Fan":
            return { equipmentType: type, utilityTypes: ['Electricity'] };
        case "Process Heating":
            return { equipmentType: type, utilityTypes: ['Natural Gas', 'Other Fuels', 'Electricity', 'Steam'] };
        case "Compressed Air":
            return { equipmentType: type, utilityTypes: ['Electricity'] };
        case "Steam":
            return { equipmentType: type, utilityTypes: ['Natural Gas', 'Other Fuels', 'Electricity'] };
        case "Process Cooling":
            return { equipmentType: type, utilityTypes: ['Electricity'] };
        case "Motor":
            return { equipmentType: type, utilityTypes: ['Electricity'] };
        case "Lighting":
            return { equipmentType: type, utilityTypes: ['Electricity'] };
        case "HVAC":
            return { equipmentType: type, utilityTypes: ['Electricity'] };
        case "Mobile":
            return { equipmentType: type, utilityTypes: ['Electricity', 'Natural Gas', 'Other Fuels'] };
    }
});
