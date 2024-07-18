import { KeyPerformanceMetric } from "../../constants/keyPerformanceMetrics";
import {  PerformanceMetricImpact } from "../../../models/nonEnergyBenefit";
import * as _ from 'lodash';
import { NebReport } from "./nebReport";


export function getKeyPerfomanceIndicatorReport(nebReports: Array<NebReport>): KeyPerformanceIndicatorReport {
    let kpiReportItems: Array<KeyPerformanceIndicatorReportItem> = new Array();
    nebReports.forEach(nebReport => {
        nebReport.reportPerformanceMetrics.forEach(performanceMetric => {
            let itemExistIndex: number = kpiReportItems.findIndex(reportItem => {
                return reportItem.keyPerformanceMetric.value == performanceMetric.keyPerformanceMetric.value;
            });
            if (itemExistIndex != -1) {
                kpiReportItems[itemExistIndex].performanceMetricImpact.costAdjustment += performanceMetric.performanceMetricImpact.costAdjustment;
                kpiReportItems[itemExistIndex].performanceMetricImpact.modificationValue += performanceMetric.performanceMetricImpact.modificationValue;
                kpiReportItems[itemExistIndex].performanceMetricImpact.percentSavings = (kpiReportItems[itemExistIndex].performanceMetricImpact.costAdjustment / kpiReportItems[itemExistIndex].keyPerformanceMetric.baselineCost) * 100;
            } else {
                kpiReportItems.push({
                    keyPerformanceMetric: performanceMetric.keyPerformanceMetric,
                    performanceMetricImpact: {
                        ...performanceMetric.performanceMetricImpact,
                        percentSavings: (performanceMetric.performanceMetricImpact.costAdjustment / performanceMetric.keyPerformanceMetric.baselineCost) * 100
                    },
                    // nebsImpacts: [{
                    //     nebName: string,
                    //     nebValue: NebOptionValue,
                    //     performanceMetricImpact: PerformanceMetricImpact
                    // }]

                })
            }
        })
    })

    let baselineCost: number = _.sumBy(kpiReportItems, (reportItem: KeyPerformanceIndicatorReportItem) => {
        if (reportItem.keyPerformanceMetric.isQuantitative) {
            return reportItem.keyPerformanceMetric.baselineCost;
        }
        return 0
    });
    let annualSavings: number = _.sumBy(kpiReportItems, (reportItem: KeyPerformanceIndicatorReportItem) => {
        if (reportItem.keyPerformanceMetric.isQuantitative) {
            return reportItem.performanceMetricImpact.costAdjustment;
        }
        return 0
    });
    let modifiedCost: number = baselineCost - annualSavings;
    let percentSavings: number = (annualSavings / baselineCost) * 100
    return {
        kpiReportItems: kpiReportItems,
        total: {
            baselineCost: baselineCost,
            annualSavings: annualSavings,
            modifiedCost: modifiedCost,
            percentSavings: percentSavings
        }
    }
}




export interface KeyPerformanceIndicatorReport {
    kpiReportItems: Array<KeyPerformanceIndicatorReportItem>,
    total: {
        baselineCost: number,
        annualSavings: number,
        modifiedCost: number,
        percentSavings: number
    }
}

export interface KeyPerformanceIndicatorReportItem {
    keyPerformanceMetric: KeyPerformanceMetric,
    performanceMetricImpact: PerformanceMetricImpact,
    // nebsImpacts: Array<{
    //     nebName: string,
    //     nebValue: NebOptionValue,
    //     performanceMetricImpact: PerformanceMetricImpact
    // }>
}