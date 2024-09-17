import { Pipe, PipeTransform } from '@angular/core';
import { UnitOption } from '../constants/unitOptions';
import { UtilityOptions, UtilityType } from '../constants/utilityTypes';

@Pipe({
  name: 'linkedUnitOptions'
})
export class LinkedUnitOptionsPipe implements PipeTransform {

  transform(utilityType: UtilityType, unitType: string): Array<UnitOption> {
    let selectedUtility = UtilityOptions.find(_utilityOption => _utilityOption.utilityType == utilityType);
    if (selectedUtility) {
      if (unitType == 'Energy') {
        return selectedUtility.energyUnitOptions;
      } else if (unitType == 'Power') {
        return selectedUtility.powerUnitOptions;
      }
      return [];
    } else {
      return [];
    }
  }

}
