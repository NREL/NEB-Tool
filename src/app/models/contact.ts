import { IdbEntry, getNewIdbEntry } from "./idbEntry";

export interface IdbContact extends IdbEntry {
    name: string,
    phone: string,
    email: string,
    role: string,
    team: string,
    guid: string,
    companyId: string,
    facilityIds: Array<string>,
    assessmentIds: Array<string>,
    processEquipmentIds: Array<string>,
    kpiIds: Array<string>,
    userId: string,
    focusArea: string,
    notes: string
}

export function getNewIdbContact(userId: string, companyId: string): IdbContact {
    let idbEntry: IdbEntry = getNewIdbEntry();
    return {
        ...idbEntry,
        name: undefined,
        userId: userId,
        companyId: companyId,
        facilityIds: [],
        assessmentIds: [],
        processEquipmentIds: [],
        phone: undefined,
        email: undefined,
        role: undefined,
        team: undefined,
        focusArea: undefined,
        notes: undefined,
        kpiIds: [],
    }
}

export type ContactContext = 'processEquipment' | 'assessment' | 'facility' | 'company' | 'KPI';