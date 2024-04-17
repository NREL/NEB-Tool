import { Pipe, PipeTransform } from '@angular/core';
import { KPI_Option, KPI_Options } from 'src/app/shared/constants/keyPerformanceIndicators';

@Pipe({
  name: 'kpiUnitOption'
})
export class KpiUnitOptionPipe implements PipeTransform {

  transform(kpiOptionValue: string): Array<string> {
    let findOption: KPI_Option = KPI_Options.find(option => { return option.value == kpiOptionValue });
    if (findOption) {
      return findOption.unitOptions;
    }
    return [];
  }

}
