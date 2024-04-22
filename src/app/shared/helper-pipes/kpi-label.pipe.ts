import { Pipe, PipeTransform } from '@angular/core';
import { KPI_Option, KPI_Options } from '../constants/keyPerformanceIndicators';

@Pipe({
  name: 'kpiLabel'
})
export class KpiLabelPipe implements PipeTransform {

  transform(kpiValue: string): string {
    let findOption: KPI_Option = KPI_Options.find(option => { return option.value == kpiValue });
    if (findOption) {
      return findOption.label;
    }
    return kpiValue;
  }

}
