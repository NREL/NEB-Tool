import { EnergySystem } from "../shared/constants/energySystems";
import { IdbEntry, getNewIdbEntry } from "./idbEntry";

export interface IdbAssessment extends IdbEntry {
    name: string,
    userId: string,
    facilityId: string,
    companyId: string,
    energySystem: EnergySystem,
    consumption: number,
    cost: number
}

export function getNewIdbAssessment(userId: string, companyId: string, facilityId: string): IdbAssessment {
    let idbEntry: IdbEntry = getNewIdbEntry();
    return {
        ...idbEntry,
        name: 'New Assessment',
        userId: userId,
        companyId: companyId,
        facilityId: facilityId,
        energySystem: undefined,
        consumption: undefined,
        cost: undefined
    }
}