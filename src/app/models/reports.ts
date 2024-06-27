import { KeyPerformanceIndicatorValue } from "../shared/constants/keyPerformanceIndicatorOptions";
import { KeyPerformanceMetric, KeyPerformanceMetricValue } from "../shared/constants/keyPerformanceMetrics";
import { NebOptionValue } from "../shared/constants/nonEnergyBenefitOptions";
import { IdbAssessment } from "./assessment";
import { IdbEnergyOpportunity } from "./energyOpportunity";
import { IdbNonEnergyBenefit, PerformanceMetricImpact } from "./nonEnergyBenefit";
import * as _ from 'lodash';

///ASSESSMENT REPORT
export function getAssessmentReport(assessment: IdbAssessment, energyOpportunities: Array<IdbEnergyOpportunity>, nonEnergyBenefits: Array<IdbNonEnergyBenefit>, companyPerformanceMetrics: Array<KeyPerformanceMetric>): AssessmentReport {

    let energyOpportunityReports: Array<EnergyOpportunityReport> = new Array();
    let assessmentEnergyOpportunities: Array<IdbEnergyOpportunity> = energyOpportunities.filter(energyOpportunity => {
        return energyOpportunity.assessmentId == assessment.guid;
    })
    assessmentEnergyOpportunities.forEach(energyOpportunity => {
        let energyOpportunityReport: EnergyOpportunityReport = getEnergyOpportunityReport(energyOpportunity, nonEnergyBenefits, companyPerformanceMetrics);
        energyOpportunityReports.push(energyOpportunityReport);
    });

    let assessmentNebReports: Array<NebReport> = new Array();
    let assessmentNebs: Array<IdbNonEnergyBenefit> = nonEnergyBenefits.filter(neb => {
        return neb.assessmentId == assessment.guid && !neb.energyOpportunityId
    });
    assessmentNebs.forEach(neb => {
        let nebReport: NebReport = getNebReport(neb, companyPerformanceMetrics);
        assessmentNebReports.push(nebReport);
    });

    let energyOpportunityNebReports: Array<NebReport> = energyOpportunityReports.flatMap(report => {
        return report.nebReports
    });

    let allNebReports: Array<NebReport> = _.concat(energyOpportunityNebReports, assessmentNebReports);


    let totalNonOpportunitySavings: number = _.sumBy(assessmentNebReports, (report: NebReport) => {
        return report.totalCostSavings
    });
    if (assessment.costSavings) {
        totalNonOpportunitySavings += assessment.costSavings;
    }

    let energyOpportunityCostSavings: number = _.sumBy(energyOpportunityReports, (report: EnergyOpportunityReport) => {
        return report.totalEnergyCostSavings
    });
    let totalEnergyCostSavings: number = 0;

    if (energyOpportunityCostSavings) {
        totalEnergyCostSavings += energyOpportunityCostSavings;
    };

    let totalAssessmentNebSavings: number = _.sumBy(assessmentNebReports, (report: NebReport) => {
        return report.totalCostSavings
    });
    let energyOpportunityNebSavings: number = _.sumBy(energyOpportunityNebReports, (report: NebReport) => {
        return report.totalCostSavings
    });
    let totalNebSavings: number = totalNonOpportunitySavings + energyOpportunityNebSavings;

    let totalCostSavings: number = totalEnergyCostSavings + totalNebSavings;

    let totalEnergySavings: number = totalEnergyCostSavings + assessment.energySavings;
    let implementationCost: number = _.sumBy(energyOpportunityReports, (report: EnergyOpportunityReport) => {
        return report.energyOpportunity.implementationCost
    }) + assessment.implementationCost

    let totalPaybackWithNebs: number = (implementationCost / totalCostSavings);
    let totalPaybackWithoutNebs: number = (implementationCost / totalEnergyCostSavings);

    let nonOpportunityPaybackWithoutNebs: number = (assessment.implementationCost / assessment.costSavings);
    let nonOpportunityPaybackWithNebs: number = (assessment.implementationCost / totalNonOpportunitySavings);
    let totalNonOpportunityAssessmentSavings: number = totalAssessmentNebSavings + assessment.energySavings;
    return {
        assessment: assessment,
        energyOpportunityReports: energyOpportunityReports,
        assessmentNebReports: assessmentNebReports,
        // totalNebReports: totalNebReports,
        totalEnergyCostSavings: totalEnergyCostSavings,
        totalAssessmentNebSavings: totalAssessmentNebSavings,
        totalNebSavings: totalNebSavings,
        totalCostSavings: totalCostSavings,
        adjustedCost: assessment.cost - totalCostSavings,
        //TODO: math implementation needed
        adjustedEnergyUse: assessment.energyUse - totalEnergySavings,
        totalEnergySavings: totalEnergySavings,
        totalNonOpportunitySavings: totalNonOpportunitySavings,
        totalPaybackWithNebs: totalPaybackWithNebs,
        totalPaybackWithoutNebs: totalPaybackWithoutNebs,
        totalImplementationCost: implementationCost,
        nonOpportunityPaybackWithoutNebs: nonOpportunityPaybackWithoutNebs,
        nonOpportunityPaybackWithNebs: nonOpportunityPaybackWithNebs,
        totalNonOpportunityAssessmentSavings: totalNonOpportunityAssessmentSavings,
        keyPerformanceIndicatorReport: getKeyPerfomanceIndicatorReport(allNebReports)
    }
}

export interface AssessmentReport {
    assessment: IdbAssessment,
    energyOpportunityReports: Array<EnergyOpportunityReport>,
    assessmentNebReports: Array<NebReport>,
    // totalNebReports: Array<NebReport>,
    totalEnergyCostSavings: number,
    totalAssessmentNebSavings: number,
    totalNebSavings: number,
    totalCostSavings: number,
    adjustedCost: number,
    adjustedEnergyUse: number,
    totalEnergySavings: number,
    totalNonOpportunitySavings: number,
    totalPaybackWithNebs: number,
    totalPaybackWithoutNebs: number,
    totalImplementationCost: number,
    nonOpportunityPaybackWithoutNebs: number,
    nonOpportunityPaybackWithNebs: number,
    totalNonOpportunityAssessmentSavings: number,
    keyPerformanceIndicatorReport: KeyPerformanceIndicatorReport
}

///ENERGY REPORT
export function getEnergyOpportunityReport(energyOpportunity: IdbEnergyOpportunity, nonEnergyBenefits: Array<IdbNonEnergyBenefit>, companyPerformanceMetrics: Array<KeyPerformanceMetric>): EnergyOpportunityReport {
    let energyOpportunityNebs: Array<IdbNonEnergyBenefit> = nonEnergyBenefits.filter(neb => {
        return neb.energyOpportunityId == energyOpportunity.guid
    });
    let nebReports: Array<NebReport> = new Array();
    energyOpportunityNebs.forEach(neb => {
        let nebReport: NebReport = getNebReport(neb, companyPerformanceMetrics);
        nebReports.push(nebReport);
    })
    let totalEnergyCostSavings: number = 0;
    if (energyOpportunity.includeSavings && energyOpportunity.costSavings) {
        totalEnergyCostSavings = energyOpportunity.costSavings;
    }

    let totalNebSavings: number = _.sumBy(nebReports, (nebReport: NebReport) => {
        return nebReport.totalCostSavings
    });
    let totalCostSavings: number = totalEnergyCostSavings + totalNebSavings;
    let paybackWithNebs: number = (energyOpportunity.implementationCost / totalCostSavings);
    let paybackWithoutNebs: number = (energyOpportunity.implementationCost / totalEnergyCostSavings);



    return {
        energyOpportunity: energyOpportunity,
        nebReports: nebReports,
        totalEnergyCostSavings: totalEnergyCostSavings,
        totalNebSavings: totalNebSavings,
        totalCostSavings: totalCostSavings,
        paybackWithNebs: paybackWithNebs,
        paybackWithoutNebs: paybackWithoutNebs
    }
}


export interface EnergyOpportunityReport {
    energyOpportunity: IdbEnergyOpportunity
    nebReports: Array<NebReport>,
    totalEnergyCostSavings: number,
    totalNebSavings: number,
    totalCostSavings: number,
    paybackWithNebs: number,
    paybackWithoutNebs: number
}

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
    return {
        nonEnergyBenefit: nonEnergyBenefit,
        reportPerformanceMetrics: reportPerformanceMetrics,
        //todo: update to handle cost adjustment +/- as good
        totalCostSavings: _.sumBy(reportPerformanceMetrics, (reportPerformanceMetric: ReportPerformanceMetric) => {
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
    console.log(annualSavings);
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