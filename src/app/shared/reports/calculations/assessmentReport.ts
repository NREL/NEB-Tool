import { KeyPerformanceMetric } from "../../constants/keyPerformanceMetrics";
import { IdbAssessment } from "../../../models/assessment";
import { IdbEnergyOpportunity } from "../../../models/energyOpportunity";
import { IdbNonEnergyBenefit } from "../../../models/nonEnergyBenefit";
import * as _ from 'lodash';
import { EnergyOpportunityReport, getEnergyOpportunityReport } from "./energyOpportunityReport";
import { NebReport, getNebReport } from "./nebReport";
import { KeyPerformanceIndicatorReport, getKeyPerfomanceIndicatorReport } from "./keyPerformanceIndicatorReport";

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

    let totalEnergySavings: number = _.sumBy(energyOpportunityReports, (report: EnergyOpportunityReport) => {
        return report.energyOpportunity.energySavings
    }) + assessment.energySavings;

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