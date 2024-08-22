import { Pipe, PipeTransform } from '@angular/core';
import { UnitOption } from '../constants/unitOptions';
import { utilityOptions, UtilityType } from '../constants/utilityTypes';

@Pipe({
  name: 'linkedUnitOptions'
})
export class LinkedUnitOptionsPipe implements PipeTransform {

  transform(utilityType: UtilityType): Array<UnitOption> {
    let selectedUtility = utilityOptions.find(_utilityOption => _utilityOption.utilityType == utilityType);
    console.log(selectedUtility?.unitOptions.length);
    if (selectedUtility) {
      return selectedUtility.unitOptions;
    } else {
      return [];
    }
  }

}
