import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Facility } from '../models/facility';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Injectable({
  providedIn: 'root'
})
export class FacilityIdbService {


  facilities: BehaviorSubject<Array<Facility>>;
  constructor(private dbService: NgxIndexedDBService) {
    this.facilities = new BehaviorSubject<Array<Facility>>([]);
  }

  getAll(): Observable<Array<Facility>> {
    return this.dbService.getAll('facility');
  }

  getById(id: number): Observable<Facility> {
    return this.dbService.getByKey('facility', id);
  }

  addWithObservable(facility: Facility): Observable<Facility> {
    return this.dbService.add('facility', facility);
  }

  deleteWithObservable(id: number): Observable<any> {
    return this.dbService.delete('facility', id);
  }

  updateWithObservable(facility: Facility): Observable<Facility> {
    facility.setModifiedDate();
    return this.dbService.update('facility', facility);
  }
}
