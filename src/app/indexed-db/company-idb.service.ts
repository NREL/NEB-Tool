import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Company } from '../models/company';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Injectable({
  providedIn: 'root'
})
export class CompanyIdbService {

  companies: BehaviorSubject<Array<Company>>;
  constructor(private dbService: NgxIndexedDBService) {
    this.companies = new BehaviorSubject<Array<Company>>([]);
  }

  getAll(): Observable<Array<Company>> {
    return this.dbService.getAll('company');
  }

  getById(id: number): Observable<Company> {
    return this.dbService.getByKey('company', id);
  }

  addWithObservable(company: Company): Observable<Company> {
    return this.dbService.add('company', company);
  }

  deleteWithObservable(id: number): Observable<any> {
    return this.dbService.delete('company', id);
  }

  updateWithObservable(company: Company): Observable<Company> {
    company.setModifiedDate();
    return this.dbService.update('company', company);
  }
}
