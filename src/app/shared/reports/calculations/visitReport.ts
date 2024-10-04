import { IdbOnSiteVisit } from "src/app/models/onSiteVisit";
import { AssessmentReport, getAssessmentReport } from "./assessmentReport";
import { IdbAssessment } from "src/app/models/assessment";
import { IdbEnergyOpportunity } from "src/app/models/energyOpportunity";
import { KeyPerformanceMetric } from "../../constants/keyPerformanceMetrics";
import { IdbNonEnergyBenefit } from "src/app/models/nonEnergyBenefit";
import { IdbKeyPerformanceMetricImpact } from "src/app/models/keyPerformanceMetricImpact";
import { getKeyPerfomanceIndicatorReport, KeyPerformanceIndicatorReport } from "./keyPerformanceIndicatorReport";
import { NebReport } from "./nebReport";

export function getOnSiteVisitReport(assessmentIds: Array<string>, assessments: Array<IdbAssessment>,
    energyOpportunities: Array<IdbEnergyOpportunity>, nonEnergyBenefits: Array<IdbNonEnergyBenefit>,
    companyPerformanceMetrics: Array<KeyPerformanceMetric>, keyPerformanceMetricImpacts: Array<IdbKeyPerformanceMetricImpact>): OnSiteVisitReport {

    let assessmentReports: Array<AssessmentReport> = new Array();
    assessmentIds.forEach(assessmentId => {
        let assessment: IdbAssessment = assessments.find(assessment => {
            return assessment.guid == assessmentId;
        });
        let assessmentReport: AssessmentReport = getAssessmentReport(assessment, energyOpportunities, nonEnergyBenefits, companyPerformanceMetrics, keyPerformanceMetricImpacts);
        assessmentReports.push(assessmentReport);
    });
    let allNebReports: Array<NebReport> = assessmentReports.flatMap(report => {
        return report.allNebReports
    });
    return {
        assessmentReports: assessmentReports,
        allNebReports: allNebReports,
        keyPerformanceIndicatorReport: getKeyPerfomanceIndicatorReport(allNebReports)
    };
}


export interface OnSiteVisitReport {
    assessmentReports: Array<AssessmentReport>,
    allNebReports: Array<NebReport>,
    keyPerformanceIndicatorReport: KeyPerformanceIndicatorReport
}