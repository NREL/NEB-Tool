import { getNewIdbEntry, IdbEntry } from "./idbEntry"
import { EquipmentType } from "../shared/constants/equipmentTypes"
import { UtilityType } from "../shared/constants/utilityTypes"

export interface IdbEnergyEquipment extends IdbEntry {
    userId: string,
    facilityId: string,
    companyId: string,
    equipmentName: string,
    notes: string,
    equipmentType: EquipmentType,
    utilityType: UtilityType,
    size: number,
    operatingHours: number,
    loadFactor: number,
    efficiency: number
}

export function getNewIdbEnergyEquipment(userId: string, companyId: string, facilityId: string): IdbEnergyEquipment {
    let idbEntry: IdbEntry = getNewIdbEntry();
    return {
        ...idbEntry,
        equipmentName: 'New Industrial Equipment',
        userId: userId,
        companyId: companyId,
        facilityId: facilityId,
        size: undefined,
        operatingHours: undefined,
        loadFactor: undefined,
        notes: undefined,
        equipmentType: undefined,
        utilityType: undefined,
        efficiency: undefined
    }
}