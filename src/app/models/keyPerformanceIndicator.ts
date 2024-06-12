import { KeyPerformanceIndicatorOption } from "../shared/constants/keyPerformanceIndicatorOptions";
import { KeyPerformanceMetricValue } from "../shared/constants/keyPerformanceMetrics";
import { IdbEntry, getNewIdbEntry } from "./idbEntry";

export interface IdbKeyPerformanceIndicator extends IdbEntry, KeyPerformanceIndicatorOption{
    userId: string,
    companyId: string,
    performanceMetricValue: KeyPerformanceMetricValue
}


export function getNewKeyPerformanceIndicator(userId: string, companyId: string, keyPerformanceIndicatorOption: KeyPerformanceIndicatorOption): IdbKeyPerformanceIndicator {
    let idbEntry: IdbEntry = getNewIdbEntry();
    return {
        ...idbEntry,
        userId: userId,
        companyId: companyId,
        ...keyPerformanceIndicatorOption,
        performanceMetricValue: undefined
    }
}