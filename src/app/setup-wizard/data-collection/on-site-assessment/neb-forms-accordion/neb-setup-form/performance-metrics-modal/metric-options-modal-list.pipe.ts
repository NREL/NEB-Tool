import { Pipe, PipeTransform } from '@angular/core';
import { KeyPerformanceMetric, KeyPerformanceMetricOption } from 'src/app/shared/constants/keyPerformanceMetrics';
import * as _ from 'lodash';

@Pipe({
  name: 'metricOptionsModalList'
})
export class MetricOptionsModalListPipe implements PipeTransform {

  transform(options: Array<KeyPerformanceMetricOption | KeyPerformanceMetric>, searchStr: string, orderByDir: 'asc' | 'desc'): Array<KeyPerformanceMetricOption | KeyPerformanceMetric> {
    let filteredOptions: Array<KeyPerformanceMetricOption | KeyPerformanceMetric> = options;
    if (searchStr) {
      filteredOptions = filteredOptions.filter(option => {
        return option.label.toLowerCase().includes(searchStr.toLowerCase());
      });
    }
    return _.orderBy(filteredOptions, (option: KeyPerformanceMetricOption | KeyPerformanceMetric) => {
      return option.label;
    }, orderByDir);
  }

}
