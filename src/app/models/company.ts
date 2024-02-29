import { IdbEntry, getNewIdbEntry } from "./idbEntry";
import { UnitSettings, getDefaultUnitSettings } from "./unitSettings";

export interface IdbCompany extends IdbEntry, UnitSettings {
    name: string,
    userId: string
}

export function getNewIdbCompany(userId: string): IdbCompany {
    let idbEntry: IdbEntry = getNewIdbEntry();
    let defaultSettings: UnitSettings = getDefaultUnitSettings();
    return {
        ...idbEntry,
        name: 'New Company',
        userId: userId,
        ...defaultSettings
    }
}