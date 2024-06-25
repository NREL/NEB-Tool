import { KeyPerformanceMetric } from "../shared/constants/keyPerformanceMetrics";
import { NebOptionValue } from "../shared/constants/nonEnergyBenefitOptions";
import { IdbNonEnergyBenefit, PerformanceMetricImpact } from "./nonEnergyBenefit";
import * as _ from 'lodash';

export function getNebReport(nonEnergyBenefit: IdbNonEnergyBenefit, companyPerformanceMetrics: Array<KeyPerformanceMetric>): NebReport {
    let reportPerformanceMetrics: Array<ReportPerformanceMetric> = new Array();
    nonEnergyBenefit.performanceMetricImpacts.forEach(metric => {
        let keyPerformanceMetric: KeyPerformanceMetric = companyPerformanceMetrics.find(companyKPM => {
            return companyKPM.value == metric.kpmValue
        });
        if (keyPerformanceMetric.includeMetric) {
            reportPerformanceMetrics.push({
                performanceMetricImpact: metric,
                keyPerformanceMetric: keyPerformanceMetric
            })
        }
    });
    return {
        nebName: nonEnergyBenefit.name,
        nebValue: nonEnergyBenefit.nebOptionValue,
        reportPerformanceMetrics: reportPerformanceMetrics,
        //todo: update to handle cost adjustment +/- as good
        totalCostSavings: _.sumBy(reportPerformanceMetrics, (reportPerformanceMetric: ReportPerformanceMetric) => {
            return reportPerformanceMetric.performanceMetricImpact.costAdjustment
        })
    }
}

export interface NebReport {
    nebName: string,
    nebValue: NebOptionValue,
    reportPerformanceMetrics: Array<ReportPerformanceMetric>
    totalCostSavings: number
}

export interface ReportPerformanceMetric {
    keyPerformanceMetric: KeyPerformanceMetric,
    performanceMetricImpact: PerformanceMetricImpact
}