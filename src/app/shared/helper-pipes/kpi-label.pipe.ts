import { Pipe, PipeTransform } from '@angular/core';
import { KeyPerformanceIndicator, KeyPerformanceIndicators } from '../constants/keyPerformanceIndicators2';

@Pipe({
  name: 'kpiLabel'
})
export class KpiLabelPipe implements PipeTransform {

  transform(kpi: KeyPerformanceIndicator): string {
    // if (kpi.isCustom) {
    //   return kpi.customKPIName
    // } else {
    let findOption: KeyPerformanceIndicator = KeyPerformanceIndicators.find(option => { return option.value == kpi.value });
    if (findOption) {
      return findOption.label;
    }
    // }
    return kpi.value;
  }

}
