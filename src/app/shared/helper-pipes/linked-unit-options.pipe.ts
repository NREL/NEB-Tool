import { Pipe, PipeTransform } from '@angular/core';
import { UnitOption } from '../constants/unitOptions';
import { UtilityOptions, UtilityType } from '../constants/utilityTypes';

@Pipe({
  name: 'linkedUnitOptions'
})
export class LinkedUnitOptionsPipe implements PipeTransform {

  transform(utilityType: UtilityType): Array<UnitOption> {
    let selectedUtility = UtilityOptions.find(_utilityOption => _utilityOption.utilityType == utilityType);
    if (selectedUtility) {
      return selectedUtility.unitOptions;
    } else {
      return [];
    }
  }

}
