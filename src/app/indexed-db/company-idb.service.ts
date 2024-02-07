import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
import { IdbCompany } from '../models/company';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Injectable({
  providedIn: 'root'
})
export class CompanyIdbService {

  companies: BehaviorSubject<Array<IdbCompany>>;
  constructor(private dbService: NgxIndexedDBService) {
    this.companies = new BehaviorSubject<Array<IdbCompany>>([]);
  }

  async initializeData() {
    let _companies: Array<IdbCompany> = await firstValueFrom(this.getAll());
    this.companies.next(_companies);
  }

  getAll(): Observable<Array<IdbCompany>> {
    return this.dbService.getAll('company');
  }

  getById(id: number): Observable<IdbCompany> {
    return this.dbService.getByKey('company', id);
  }

  addWithObservable(company: IdbCompany): Observable<IdbCompany> {
    return this.dbService.add('company', company);
  }

  deleteWithObservable(id: number): Observable<any> {
    return this.dbService.delete('company', id);
  }

  updateWithObservable(company: IdbCompany): Observable<IdbCompany> {
    company.modifiedDate = new Date();
    return this.dbService.update('company', company);
  }

  async setCompanies() {
    let allCompanies: Array<IdbCompany> = await firstValueFrom(this.getAll());
    this.companies.next(allCompanies);
  }
}
