import { EquipmentType } from "../shared/constants/equipmentTypes";
import { IdbEntry, getNewIdbEntry } from "./idbEntry";

export interface IdbAssessment extends IdbEntry {
    name: string,
    userId: string,
    facilityId: string,
    companyId: string,
    equipmentType: EquipmentType,
    energyUse: number,
    cost: number,
    energySavings: number,
    costSavings: number,
    contactIds: Array<string>,
    notes: string
}

export function getNewIdbAssessment(userId: string, companyId: string, facilityId: string): IdbAssessment {
    let idbEntry: IdbEntry = getNewIdbEntry();
    return {
        ...idbEntry,
        name: 'New Assessment',
        userId: userId,
        companyId: companyId,
        facilityId: facilityId,
        equipmentType: undefined,
        energyUse: undefined,
        cost: undefined,
        energySavings: undefined,
        costSavings: undefined,
        contactIds: [],
        notes: undefined,
    }
}