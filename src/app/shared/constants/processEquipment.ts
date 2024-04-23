import { getGUID } from "../helpFunctions"

export interface ProcessEquipment {
    guid: string,
    equipmentName: string,
    size: number,
    operatingHours: number,
    loadFactor: number,
    notes: string
}

export function getNewProcessEquipment() {
    return {
        guid: getGUID(),
        equipmentName: 'New Equipment',
        size: undefined,
        operatingHours: undefined,
        loadFactor: undefined,
        notes: undefined
    }
}