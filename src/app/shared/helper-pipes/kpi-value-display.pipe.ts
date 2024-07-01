import { Pipe, PipeTransform } from '@angular/core';
import { IdbKeyPerformanceIndicator } from 'src/app/models/keyPerformanceIndicator';
import { KeyPerformanceIndicatorValue } from '../constants/keyPerformanceIndicatorOptions';

@Pipe({
  name: 'kpiValueDisplay'
})
export class KpiValueDisplayPipe implements PipeTransform {

  transform(kpiValue: KeyPerformanceIndicatorValue, keyPerformanceIndicators: Array<IdbKeyPerformanceIndicator>): string {

    let findOption: IdbKeyPerformanceIndicator = keyPerformanceIndicators.find(option => { return option.optionValue == kpiValue });
    if (findOption) {
      return findOption.htmlLabel;
    }
    return '';
  }

}
