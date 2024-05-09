import { Pipe, PipeTransform } from '@angular/core';
import { IdbNonEnergyBenefit } from 'src/app/models/nonEnergyBenefit';

@Pipe({
  name: 'nebDisplay',
  pure: false
})
export class NebDisplayPipe implements PipeTransform {

  transform(guid: string, nonEnergyBenefits: Array<IdbNonEnergyBenefit>): string {
    let neb: IdbNonEnergyBenefit = nonEnergyBenefits.find(neb =>{
      return neb.guid == guid
    });
    if(neb){
      return neb.name;
    }
    return null;
  }

}
