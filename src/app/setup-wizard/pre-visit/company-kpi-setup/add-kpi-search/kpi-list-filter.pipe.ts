import { Pipe, PipeTransform } from '@angular/core';
import { KeyPerformanceIndicator, PrimaryKPI } from 'src/app/shared/constants/keyPerformanceIndicators2';
import * as _ from 'lodash';

@Pipe({
  name: 'kpiListFilter'
})
export class KpiListFilterPipe implements PipeTransform {

  transform(keyPerformanceIndicators: Array<KeyPerformanceIndicator>, searchStr: string, category: PrimaryKPI): Array<KeyPerformanceIndicator> {
    let filteredOptions: Array<KeyPerformanceIndicator> = keyPerformanceIndicators;
    if (category) {
      filteredOptions = filteredOptions.filter(option => {
        return option.primaryKPI == category
      });
    }
    if (searchStr) {
      filteredOptions = filteredOptions.filter(option => {
        return option.label.toLowerCase().includes(searchStr.toLowerCase());
      });
    }
    return _.orderBy(filteredOptions, (option: KeyPerformanceIndicator) => {
      return option.label;
    }, 'asc');
  }

}
