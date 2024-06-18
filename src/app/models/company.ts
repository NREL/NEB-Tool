import { GeneralInformation, getGeneralInformation } from "./generalInformation";
import { IdbEntry, getNewIdbEntry } from "./idbEntry";
import { UnitSettings, getDefaultUnitSettings } from "./unitSettings";

export interface IdbCompany extends IdbEntry {
    userId: string,
    unitSettings: UnitSettings,
    generalInformation: GeneralInformation,
    displayFacilities: boolean,
}

export function getNewIdbCompany(userId: string): IdbCompany {
    let idbEntry: IdbEntry = getNewIdbEntry();
    let defaultSettings: UnitSettings = getDefaultUnitSettings();
    let generalInformation: GeneralInformation = getGeneralInformation('New Company');
    return {
        ...idbEntry,
        userId: userId,
        unitSettings: defaultSettings,
        generalInformation: generalInformation,
        displayFacilities: true,
    }
}

