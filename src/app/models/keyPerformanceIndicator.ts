import { KeyPerformanceIndicatorOption } from "../shared/constants/keyPerformanceIndicatorOptions";
import { KeyPerformanceMetric, getPerformanceMetrics } from "../shared/constants/keyPerformanceMetrics";
import { IdbEntry, getNewIdbEntry } from "./idbEntry";

export interface IdbKeyPerformanceIndicator extends IdbEntry, KeyPerformanceIndicatorOption {
    userId: string,
    companyId: string,
    performanceMetrics: Array<KeyPerformanceMetric>
}


export function getNewKeyPerformanceIndicator(userId: string, companyId: string, keyPerformanceIndicatorOption: KeyPerformanceIndicatorOption): IdbKeyPerformanceIndicator {
    let idbEntry: IdbEntry = getNewIdbEntry();
    return {
        ...idbEntry,
        userId: userId,
        companyId: companyId,
        ...keyPerformanceIndicatorOption,
        performanceMetrics: getPerformanceMetrics(keyPerformanceIndicatorOption.optionValue)
    }
}