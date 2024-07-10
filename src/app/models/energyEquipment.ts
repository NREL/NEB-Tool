import { getNewIdbEntry, IdbEntry } from "./idbEntry"

export interface IdbEnergyEquipment extends IdbEntry {
    userId: string,
    facilityId: string,
    companyId: string,
    equipmentName: string,
    notes: string
}

export function getNewIdbEnergyEquipment(userId: string, companyId: string, facilityId: string): IdbEnergyEquipment {
    let idbEntry: IdbEntry = getNewIdbEntry();
    return {
        ...idbEntry,
        equipmentName: 'New Equipment',
        userId: userId,
        companyId: companyId,
        facilityId: facilityId,
        notes: undefined
    }
}