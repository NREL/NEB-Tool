import { KeyPerformanceMetric, KeyPerformanceMetricValue } from "../shared/constants/keyPerformanceMetrics";
import { NebOption, NebOptionValue } from "../shared/constants/nonEnergyBenefitOptions";
import { IdbEntry, getNewIdbEntry } from "./idbEntry";

export interface IdbNonEnergyBenefit extends IdbEntry {
    name: string
    userId: string,
    facilityId: string,
    companyId: string,
    assessmentId: string,
    includeNote: boolean,
    notes: string,
    energyOpportunityId: string,
    nebOptionValue: NebOptionValue,
    performanceMetricImpacts: Array<PerformanceMetricImpact>,
    isCustom: boolean,
    costImpact: number
}

export interface PerformanceMetricImpact {
    kpmValue: KeyPerformanceMetricValue,
    modificationValue: number,
    costAdjustment: number,
    percentSavings?: number
}

export function getNewIdbNonEnergyBenefit(userId: string, companyId: string, facilityId: string, assessmentId: string, energyOpportunityId: string, nebOption: NebOption, performanceMetrics: Array<KeyPerformanceMetric>, isCustom: boolean): IdbNonEnergyBenefit {
    let nebOptionValue: NebOptionValue;
    let name: string = 'New NEB';
    let performanceMetricImpacts: Array<PerformanceMetricImpact> = new Array();
    if (nebOption) {
        nebOptionValue = nebOption.optionValue;
        name = nebOption.label;
        performanceMetrics.forEach(metric => {
            if (nebOption.KPM.indexOf(metric.value) != -1) {
                performanceMetricImpacts.push({
                    kpmValue: metric.value,
                    modificationValue: undefined,
                    costAdjustment: undefined
                })
            }
        });
    }
    let idbEntry: IdbEntry = getNewIdbEntry();
    return {
        ...idbEntry,
        name: name,
        userId: userId,
        companyId: companyId,
        facilityId: facilityId,
        assessmentId: assessmentId,
        notes: undefined,
        energyOpportunityId: energyOpportunityId,
        includeNote: false,
        nebOptionValue: nebOptionValue,
        performanceMetricImpacts: performanceMetricImpacts,
        isCustom: isCustom,
        costImpact: 0
    }
}