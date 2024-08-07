import { Injectable } from '@angular/core';
import { IdbKeyPerformanceMetricImpact } from '../models/keyPerformanceMetricImpact';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Injectable({
  providedIn: 'root'
})
export class KeyPerformanceMetricImpactsIdbService {

  keyPerformanceMetricImpacts: BehaviorSubject<Array<IdbKeyPerformanceMetricImpact>>;
  constructor(private dbService: NgxIndexedDBService) {
    this.keyPerformanceMetricImpacts = new BehaviorSubject<Array<IdbKeyPerformanceMetricImpact>>([]);
  }

  async setKeyPerformanceMetricImpacts() {
    let _keyPerformanceMetricImpacts: Array<IdbKeyPerformanceMetricImpact> = await firstValueFrom(this.getAll());
    this.keyPerformanceMetricImpacts.next(_keyPerformanceMetricImpacts);
  }

  getAll(): Observable<Array<IdbKeyPerformanceMetricImpact>> {
    return this.dbService.getAll('keyPerformanceMetricImpact');
  }

  getById(id: number): Observable<IdbKeyPerformanceMetricImpact> {
    return this.dbService.getByKey('keyPerformanceMetricImpact', id);
  }

  addWithObservable(keyPerformanceMetricImpact: IdbKeyPerformanceMetricImpact): Observable<IdbKeyPerformanceMetricImpact> {
    return this.dbService.add('keyPerformanceMetricImpact', keyPerformanceMetricImpact);
  }

  deleteWithObservable(id: number): Observable<any> {
    return this.dbService.delete('keyPerformanceMetricImpact', id);
  }

  updateWithObservable(keyPerformanceMetricImpact: IdbKeyPerformanceMetricImpact): Observable<IdbKeyPerformanceMetricImpact> {
    keyPerformanceMetricImpact.modifiedDate = new Date();
    return this.dbService.update('keyPerformanceMetricImpact', keyPerformanceMetricImpact);
  }

  async asyncUpdate(keyPerformanceMetricImpact: IdbKeyPerformanceMetricImpact) {
    keyPerformanceMetricImpact = await firstValueFrom(this.updateWithObservable(keyPerformanceMetricImpact));
    await this.setKeyPerformanceMetricImpacts();
  }

  getByGuid(guid: string): IdbKeyPerformanceMetricImpact {
    let keyPerformanceInidcators: Array<IdbKeyPerformanceMetricImpact> = this.keyPerformanceMetricImpacts.getValue();
    return keyPerformanceInidcators.find(kpi => {
      return kpi.guid == guid
    });
  }

  // getKeyPerformanceMetric(companyGuid: string, performanceMetricValue: KeyPerformanceMetricValue): KeyPerformanceMetric {
  //   let companyKeyPerformanceMetrics: Array<KeyPerformanceMetric> = this.getCompanyKeyPerformanceMetrics(companyGuid);
  //   return companyKeyPerformanceMetrics.find(metric => {
  //     return metric.value == performanceMetricValue
  //   });
  // }

  // getKpiFromKpm(companyGuid: string, performanceMetricValue: KeyPerformanceIndicatorValue): IdbKeyPerformanceMetricImpact {
  //   let keyPerformanceIndicators: Array<IdbKeyPerformanceMetricImpact> = this.keyPerformanceIndicators.getValue();
  //   return keyPerformanceIndicators.find(kpi => {
  //     return kpi.companyId == companyGuid && kpi.optionValue == performanceMetricValue;
  //   });
  // }
}
