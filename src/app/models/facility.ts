import { IdbEntry, getNewIdbEntry } from "./idbEntry";
import { UnitSettings, getDefaultUnitSettings } from "./unitSettings";

export interface IdbFacility extends IdbEntry, UnitSettings {
    name: string,
    companyId: string,
    userId: string
}

export function getNewIdbFacility(userId: string, companyId: string): IdbFacility {
    let idbEntry: IdbEntry = getNewIdbEntry();
    let defaultSettings: UnitSettings = getDefaultUnitSettings();
    return {
        ...idbEntry,
        name: 'New Facility',
        userId: userId,
        companyId: companyId,
        ...defaultSettings
    }
}