import { KeyPerformanceMetric } from "../../constants/keyPerformanceMetrics";
import { IdbNonEnergyBenefit, PerformanceMetricImpact } from "../../../models/nonEnergyBenefit";
import * as _ from 'lodash';

///NEB REPORT
export function getNebReport(nonEnergyBenefit: IdbNonEnergyBenefit, companyPerformanceMetrics: Array<KeyPerformanceMetric>): NebReport {
    let reportPerformanceMetrics: Array<ReportPerformanceMetric> = new Array();
    nonEnergyBenefit.performanceMetricImpacts.forEach(performanceMetricImpact => {
        let keyPerformanceMetric: KeyPerformanceMetric = companyPerformanceMetrics.find(companyKPM => {
            return companyKPM.value == performanceMetricImpact.kpmValue
        });
        if (keyPerformanceMetric.includeMetric) {
            reportPerformanceMetrics.push({
                performanceMetricImpact: performanceMetricImpact,
                keyPerformanceMetric: keyPerformanceMetric
            })
        }
    });
    let costSavings: number = nonEnergyBenefit.costImpact || 0;


    return {
        nonEnergyBenefit: nonEnergyBenefit,
        reportPerformanceMetrics: reportPerformanceMetrics,
        //todo: update to handle cost adjustment +/- as good
        //currently treating everything as a reduction
        totalCostSavings: costSavings + _.sumBy(reportPerformanceMetrics, (reportPerformanceMetric: ReportPerformanceMetric) => {
            if (reportPerformanceMetric.performanceMetricImpact.costAdjustment) {
                return reportPerformanceMetric.performanceMetricImpact.costAdjustment;
            }
            return 0;
        })
    }
}

export interface NebReport {
    nonEnergyBenefit: IdbNonEnergyBenefit,
    reportPerformanceMetrics: Array<ReportPerformanceMetric>
    totalCostSavings: number
}

export interface ReportPerformanceMetric {
    keyPerformanceMetric: KeyPerformanceMetric,
    performanceMetricImpact: PerformanceMetricImpact
}