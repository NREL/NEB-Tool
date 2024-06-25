import { KeyPerformanceMetric } from "../shared/constants/keyPerformanceMetrics";
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
    let includedNebOptionValues: Array<{ nebName: string, nebValue: NebOptionValue }> = allNebReports.map(report => {
        return { nebName: report.nebName, nebValue: report.nebValue }
    });

    let uniqNebs: Array<{ nebName: string, nebValue: NebOptionValue }> = _.uniqBy(includedNebOptionValues, (val: { nebName: string, nebValue: NebOptionValue }) => {
        return val.nebValue
    });
    let totalNebReports: Array<NebReport> = new Array();
    // uniqNebs.forEach(uniqNeb => {
    //     let correspondingNebs: Array<NebReport> = allNebReports.filter(nebReport => {
    //         return nebReport.nebValue == uniqNeb.nebValue
    //     });
    //     totalNebReports.push({
    //         nebName: string,
    //         nebValue: NebOptionValue,
    //         reportPerformanceMetrics: Array<ReportPerformanceMetric>
    //         totalCostSavings: number
    //     })
    // });

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
    let totalNebSavings: number = totalAssessmentNebSavings + energyOpportunityNebSavings;

    let totalCostSavings: number = totalEnergyCostSavings + totalNebSavings;

    let totalEnergySavings: number = _.sumBy(energyOpportunityReports, (report: EnergyOpportunityReport) => {
        return report.energyOpportunity.energySavings
    }) + assessment.energySavings;


    return {
        assessment: assessment,
        energyOpportunityReports: energyOpportunityReports,
        assessmentNebReports: assessmentNebReports,
        totalNebReports: totalNebReports,
        totalEnergyCostSavings: totalEnergyCostSavings,
        totalAssessmentNebSavings: totalAssessmentNebSavings,
        totalNebSavings: totalNebSavings,
        totalCostSavings: totalCostSavings,
        adjustedCost: assessment.cost - totalCostSavings,
        //TODO: math implementation needed
        adjustedEnergyUse: assessment.energyUse - totalEnergySavings,
        totalEnergySavings: totalEnergySavings,
        totalNonOpportunitySavings: totalNonOpportunitySavings
    }
}

export interface AssessmentReport {
    assessment: IdbAssessment,
    energyOpportunityReports: Array<EnergyOpportunityReport>,
    assessmentNebReports: Array<NebReport>,
    totalNebReports: Array<NebReport>,
    totalEnergyCostSavings: number,
    totalAssessmentNebSavings: number,
    totalNebSavings: number,
    totalCostSavings: number,
    adjustedCost: number,
    adjustedEnergyUse: number,
    totalEnergySavings: number,
    totalNonOpportunitySavings: number
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
    return {
        energyOpportunity: energyOpportunity,
        nebReports: nebReports,
        totalEnergyCostSavings: totalEnergyCostSavings,
        totalNebSavings: totalNebSavings,
        totalCostSavings: totalCostSavings
    }
}


export interface EnergyOpportunityReport {
    energyOpportunity: IdbEnergyOpportunity
    nebReports: Array<NebReport>,
    totalEnergyCostSavings: number,
    totalNebSavings: number,
    totalCostSavings: number
}

///NEB REPORT
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
            if (reportPerformanceMetric.performanceMetricImpact.costAdjustment) {
                return reportPerformanceMetric.performanceMetricImpact.costAdjustment;
            }
            return 0;
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

