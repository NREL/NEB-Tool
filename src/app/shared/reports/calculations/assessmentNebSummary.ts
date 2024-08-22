import { IdbEnergyOpportunity } from "src/app/models/energyOpportunity";
import { IdbNonEnergyBenefit } from "src/app/models/nonEnergyBenefit";
import { NebOptionValue } from "../../constants/nonEnergyBenefitOptions";
import * as _ from 'lodash';

export interface AssessmentNebSummary {
    assessmentGuid: string,
    assessmentNonEnergyBenefits: Array<IdbNonEnergyBenefit>,
    energyOpportunityNebSummaries: Array<EnergyOpportunityNebSummaryItem>
}

export interface EnergyOpportunityNebSummaryItem {
    energyOpportunity: IdbEnergyOpportunity,
    nonEnergyBenefits: Array<IdbNonEnergyBenefit>

}


export function getAssessmentNebSummary(assessmentGuid: string, nebs: Array<IdbNonEnergyBenefit>, energyOpportunities: Array<IdbEnergyOpportunity>): AssessmentNebSummary {
    let assessmentNebs: Array<IdbNonEnergyBenefit> = nebs.filter(neb => {
        return neb.assessmentId == assessmentGuid;
    });
    let assessmentEnergyOpps: Array<IdbEnergyOpportunity> = energyOpportunities.filter(energyOpp => {
        return energyOpp.assessmentId == assessmentGuid;
    });
    let energyOpportunityNebSummaries: Array<EnergyOpportunityNebSummaryItem> = [];
    assessmentEnergyOpps.forEach(energyOpportunity => {
        energyOpportunityNebSummaries.push({
            energyOpportunity: energyOpportunity,
            nonEnergyBenefits: assessmentNebs.filter(neb => {
                return neb.energyOpportunityId == energyOpportunity.guid
            })
        })
    });

    let assessmentNebSummary: AssessmentNebSummary = {
        assessmentGuid: assessmentGuid,
        assessmentNonEnergyBenefits: assessmentNebs.filter(neb => {
            return neb.energyOpportunityId == undefined
        }),
        energyOpportunityNebSummaries: energyOpportunityNebSummaries
    }
    return assessmentNebSummary;
}