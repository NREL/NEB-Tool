import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
import { IdbKeyPerformanceIndicator } from '../models/keyPerformanceIndicator';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Injectable({
  providedIn: 'root'
})
export class KeyPerformanceIndicatorsIdbService {

  keyPerformanceIndicators: BehaviorSubject<Array<IdbKeyPerformanceIndicator>>;
  constructor(private dbService: NgxIndexedDBService) {
    this.keyPerformanceIndicators = new BehaviorSubject<Array<IdbKeyPerformanceIndicator>>([]);
  }

  async setKeyPerformanceIndicators() {
    let _keyPerformanceIndicators: Array<IdbKeyPerformanceIndicator> = await firstValueFrom(this.getAll());
    this.keyPerformanceIndicators.next(_keyPerformanceIndicators);
  }

  getAll(): Observable<Array<IdbKeyPerformanceIndicator>> {
    return this.dbService.getAll('keyPerformanceIndicator');
  }

  getById(id: number): Observable<IdbKeyPerformanceIndicator> {
    return this.dbService.getByKey('keyPerformanceIndicator', id);
  }

  addWithObservable(keyPerformanceIndicator: IdbKeyPerformanceIndicator): Observable<IdbKeyPerformanceIndicator> {
    return this.dbService.add('keyPerformanceIndicator', keyPerformanceIndicator);
  }

  deleteWithObservable(id: number): Observable<any> {
    return this.dbService.delete('keyPerformanceIndicator', id);
  }

  updateWithObservable(keyPerformanceIndicator: IdbKeyPerformanceIndicator): Observable<IdbKeyPerformanceIndicator> {
    keyPerformanceIndicator.modifiedDate = new Date();
    return this.dbService.update('keyPerformanceIndicator', keyPerformanceIndicator);
  }

  async asyncUpdate(keyPerformanceIndicator: IdbKeyPerformanceIndicator) {
    keyPerformanceIndicator = await firstValueFrom(this.updateWithObservable(keyPerformanceIndicator));
    await this.setKeyPerformanceIndicators();
  }

  getByGuid(guid: string): IdbKeyPerformanceIndicator {
    let keyPerformanceInidcators: Array<IdbKeyPerformanceIndicator> = this.keyPerformanceIndicators.getValue();
    return keyPerformanceInidcators.find(kpi => {
      return kpi.guid == guid
    });
  }
}
