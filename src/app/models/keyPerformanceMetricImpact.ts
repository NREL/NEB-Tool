import { KeyPerformanceMetricValue } from "../shared/constants/keyPerformanceMetrics";
import { IdbEntry, getNewIdbEntry } from "./idbEntry";

export interface IdbKeyPerformanceMetricImpact extends IdbEntry {
    userId: string,
    companyId: string,
    assessmentId: string,
    facilityId: string,
    energyOpportunityId: string,
    nebId: string,
    kpmValue: KeyPerformanceMetricValue,
    modificationValue: number,
    costAdjustment: number,
    percentSavings?: number
}


export function getNewIdbKeyPerformanceMetricImpact(userId: string, companyId: string, facilityId: string, energyOpportunityId: string, nebId: string, kpmValue: KeyPerformanceMetricValue, assessemntId: string): IdbKeyPerformanceMetricImpact {
    let idbEntry: IdbEntry = getNewIdbEntry();
    return {
        ...idbEntry,
        userId: userId,
        companyId: companyId,
        facilityId: facilityId,
        energyOpportunityId: energyOpportunityId,
        assessmentId: assessemntId,
        nebId: nebId,
        modificationValue: undefined,
        costAdjustment: undefined,
        percentSavings: undefined,
        kpmValue: kpmValue
    }
}