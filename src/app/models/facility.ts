import { GeneralInformation, getGeneralInformation } from "./generalInformation";
import { IdbEntry, getNewIdbEntry } from "./idbEntry";
import { UnitSettings, getDefaultUnitSettings } from "./unitSettings";

export interface IdbFacility extends IdbEntry {
    // name: string,
    companyId: string,
    userId: string,
    unitSettings: UnitSettings,
    generalInformation: GeneralInformation
}

export function getNewIdbFacility(userId: string, companyId: string): IdbFacility {
    let idbEntry: IdbEntry = getNewIdbEntry();
    let defaultSettings: UnitSettings = getDefaultUnitSettings();
    let generalInformation: GeneralInformation = getGeneralInformation('New Facility');
    return {
        ...idbEntry,
        userId: userId,
        companyId: companyId,
        unitSettings: defaultSettings,
        generalInformation: generalInformation,
    }
}
