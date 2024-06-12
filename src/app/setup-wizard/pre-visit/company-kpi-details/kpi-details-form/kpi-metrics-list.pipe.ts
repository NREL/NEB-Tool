import { Pipe, PipeTransform } from '@angular/core';
import { KeyPerformanceIndicatorValue } from 'src/app/shared/constants/keyPerformanceIndicatorOptions';
import { KeyPerformanceMetric, KeyPerformanceMetrics } from 'src/app/shared/constants/keyPerformanceMetrics';
import * as _ from 'lodash';

@Pipe({
  name: 'kpiMetricsList'
})
export class KpiMetricsListPipe implements PipeTransform {

  transform(optionValue: KeyPerformanceIndicatorValue): Array<KeyPerformanceMetric> {
    let keyPerformanceMetrics: Array<KeyPerformanceMetric> = KeyPerformanceMetrics
    if (optionValue != 'other') {
      keyPerformanceMetrics = keyPerformanceMetrics.filter(performanceMetric => {
        return performanceMetric.kpiValue == optionValue
      });
    }
    return _.orderBy(keyPerformanceMetrics, (kpm: KeyPerformanceMetric) => {
      return kpm.label
    }, 'asc');
  }

}
