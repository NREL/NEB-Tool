import { IdbEntry, getNewIdbEntry } from "./idbEntry";

export interface IdbUser extends IdbEntry {
    skipSplashScreen: boolean
}

export function getNewIdbUser(): IdbUser {
    let idbEntry: IdbEntry = getNewIdbEntry();
    return {
        ...idbEntry,
        skipSplashScreen: false
    }
}