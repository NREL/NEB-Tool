import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
import { IdbFacility } from '../models/facility';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Injectable({
  providedIn: 'root'
})
export class FacilityIdbService {


  facilities: BehaviorSubject<Array<IdbFacility>>;
  selectedFacility: BehaviorSubject<IdbFacility>;
  constructor(private dbService: NgxIndexedDBService) {
    this.facilities = new BehaviorSubject<Array<IdbFacility>>([]);
    this.selectedFacility = new BehaviorSubject<IdbFacility>(undefined);
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

  setSelectedFromGUID(guid: string) {
    let facilities: Array<IdbFacility> = this.facilities.getValue();
    let facility: IdbFacility = facilities.find(_facility => { return _facility.guid == guid });
    this.selectedFacility.next(facility);
  }

  async asyncUpdate(facility: IdbFacility) {
    facility = await firstValueFrom(this.updateWithObservable(facility));
    await this.setFacilities();
    this.selectedFacility.next(facility);
  }
}
