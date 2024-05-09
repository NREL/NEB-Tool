import { Pipe, PipeTransform } from '@angular/core';
import { KPI_Option, KPI_Options, KeyPerformanceIndicator } from '../constants/keyPerformanceIndicators';

@Pipe({
  name: 'kpiLabel'
})
export class KpiLabelPipe implements PipeTransform {

  transform(kpi: KeyPerformanceIndicator): string {
    if (kpi.isCustom) {
      return kpi.customKPIName
    } else {
      let findOption: KPI_Option = KPI_Options.find(option => { return option.value == kpi.kpiOptionValue });
      if (findOption) {
        return findOption.label;
      }
    }
    return kpi.kpiOptionValue;
  }

}
