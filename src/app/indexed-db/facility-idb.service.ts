import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
import { IdbFacility } from '../models/facility';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Injectable({
  providedIn: 'root'
})
export class FacilityIdbService {


  facilities: BehaviorSubject<Array<IdbFacility>>;
  constructor(private dbService: NgxIndexedDBService) {
    this.facilities = new BehaviorSubject<Array<IdbFacility>>([]);
  }

  async initializeData() {
    let _facilities: Array<IdbFacility> = await firstValueFrom(this.getAll());
    this.facilities.next(_facilities);
  }

  getAll(): Observable<Array<IdbFacility>> {
    return this.dbService.getAll('facility');
  }

  getById(id: number): Observable<IdbFacility> {
    return this.dbService.getByKey('facility', id);
  }

  addWithObservable(facility: IdbFacility): Observable<IdbFacility> {
    return this.dbService.add('facility', facility);
  }

  deleteWithObservable(id: number): Observable<any> {
    return this.dbService.delete('facility', id);
  }

  updateWithObservable(facility: IdbFacility): Observable<IdbFacility> {
    facility.modifiedDate = new Date();
    return this.dbService.update('facility', facility);
  }

  async setFacilities() {
    let _facilities: Array<IdbFacility> = await firstValueFrom(this.getAll());
    this.facilities.next(_facilities);
  }
}
