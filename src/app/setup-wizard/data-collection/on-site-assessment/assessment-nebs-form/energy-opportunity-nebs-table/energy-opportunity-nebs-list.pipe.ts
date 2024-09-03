import { Pipe, PipeTransform } from '@angular/core';
import { IdbEnergyOpportunity } from 'src/app/models/energyOpportunity';
import { IdbNonEnergyBenefit } from 'src/app/models/nonEnergyBenefit';

@Pipe({
  name: 'energyOpportunityNebsList'
})
export class EnergyOpportunityNebsListPipe implements PipeTransform {

  transform(assessmentId: string, energyOpportunities: Array<IdbEnergyOpportunity>, nonEnergyBenefits: Array<IdbNonEnergyBenefit>): Array<{
    energyOpportunity: IdbEnergyOpportunity,
    opportunityNebs: Array<IdbNonEnergyBenefit>
  }> {
    let energyOpportunityNebs: Array<{
      energyOpportunity: IdbEnergyOpportunity,
      opportunityNebs: Array<IdbNonEnergyBenefit>
    }> = new Array();

    energyOpportunities.forEach(opportunity => {
      if (opportunity.assessmentId == assessmentId) {
        let opportunityNebs: Array<IdbNonEnergyBenefit> = nonEnergyBenefits.filter(neb => {
          return neb.energyOpportunityId == opportunity.guid
        });
        if (opportunityNebs.length > 0) {
          energyOpportunityNebs.push({
            energyOpportunity: opportunity,
            opportunityNebs: opportunityNebs
          });
        }
      }
    });

    return energyOpportunityNebs;
  }

}
