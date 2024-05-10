import { getGUID } from "../helpFunctions"
import { EquipmentType } from "./equipmentTypes"
import { UtilityType } from "./utilityTypes"

export interface ProcessEquipment {
    guid: string,
    equipmentName: string,
    size: number,
    operatingHours: number,
    loadFactor: number,
    notes: string,
    equipmentType: EquipmentType,
    utilityType: UtilityType
}

export function getNewProcessEquipment(): ProcessEquipment {
    return {
        guid: getGUID(),
        equipmentName: 'New Equipment',
        size: undefined,
        operatingHours: undefined,
        loadFactor: undefined,
        notes: undefined,
        equipmentType: undefined,
        utilityType: undefined
    }
}