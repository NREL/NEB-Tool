import { Pipe, PipeTransform } from '@angular/core';
import { IdbNonEnergyBenefit } from 'src/app/models/nonEnergyBenefit';

@Pipe({
  name: 'nebList'
})
export class NebListPipe implements PipeTransform {

  transform(contextGUID: string, context: 'assessment' | 'project', nonEnergyBenefits: Array<IdbNonEnergyBenefit>): Array<IdbNonEnergyBenefit> {
    if (context == 'assessment') {
      return nonEnergyBenefits.filter(neb => {
        return neb.assessmentId == contextGUID
      });
    } else if (context == 'project') {
      return nonEnergyBenefits.filter(neb => {
        return neb.projectIds.includes(contextGUID)
      });
    }
    return [];
  }

}
