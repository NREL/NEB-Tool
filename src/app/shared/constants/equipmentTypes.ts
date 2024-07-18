// export enum EnergySystem {
//     Pump = "Pump",
//     Fan = "Fan",
//     ProcessHeating = "Process Heating",
//     CompressedAir = "Compressed Air",
//     Steam = "Steam"
// };


export type EquipmentType = "Pump" | "Fan" | "Process Heating" | "Compressed Air" | "Steam" | "Process Cooling" | "Motor" | "Lighting" | "HVAC" | "Mobile";
export const EquipmentTypeOptions: Array<EquipmentType> = ["Pump", "Fan", "Process Heating", "Compressed Air", "Steam", "Process Cooling", "Motor", "Lighting", "HVAC", "Mobile"];