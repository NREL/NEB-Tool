import { getGUID } from "../helpFunctions"
import { EquipmentType } from "./equipmentTypes"

export interface ProcessEquipment {
    guid: string,
    equipmentName: string,
    size: number,
    operatingHours: number,
    loadFactor: number,
    notes: string,
    contactId: string,
    equipmentType: EquipmentType
}

export function getNewProcessEquipment(): ProcessEquipment {
    return {
        guid: getGUID(),
        equipmentName: 'New Equipment',
        size: undefined,
        operatingHours: undefined,
        loadFactor: undefined,
        notes: undefined,
        contactId: undefined,
        equipmentType: undefined
    }
}