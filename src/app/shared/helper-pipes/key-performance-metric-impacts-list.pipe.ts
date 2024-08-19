import { Pipe, PipeTransform } from '@angular/core';
import { IdbKeyPerformanceMetricImpact } from 'src/app/models/keyPerformanceMetricImpact';

@Pipe({
  name: 'keyPerformanceMetricImpactsList'
})
export class KeyPerformanceMetricImpactsListPipe implements PipeTransform {

  transform(keyPerformanceMetricImpacts: Array<IdbKeyPerformanceMetricImpact>, kpmGuid: string):  Array<IdbKeyPerformanceMetricImpact>{
    return keyPerformanceMetricImpacts.filter(metricImpact => {
      return metricImpact.kpmGuid == kpmGuid;
    });
  }

}
