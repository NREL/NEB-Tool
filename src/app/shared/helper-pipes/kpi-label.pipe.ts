import { Pipe, PipeTransform } from '@angular/core';
import { IdbKeyPerformanceIndicator } from 'src/app/models/keyPerformanceIndicator';

@Pipe({
  name: 'kpiLabel'
})
export class KpiLabelPipe implements PipeTransform {

  transform(kpiGuid: string, keyPerformanceIndicators: Array<IdbKeyPerformanceIndicator>): string {
    // if (kpi.isCustom) {
    //   return kpi.customKPIName
    // } else {
    let findOption: IdbKeyPerformanceIndicator = keyPerformanceIndicators.find(option => { return option.guid == kpiGuid });
    if (findOption) {
      return findOption.label;
    }
    // }
    return '';
  }

}
