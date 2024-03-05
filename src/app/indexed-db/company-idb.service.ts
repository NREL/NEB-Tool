import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
import { IdbCompany } from '../models/company';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Injectable({
  providedIn: 'root'
})
export class CompanyIdbService {

  companies: BehaviorSubject<Array<IdbCompany>>;
  selectedCompany: BehaviorSubject<IdbCompany>;
  constructor(private dbService: NgxIndexedDBService) {
    this.companies = new BehaviorSubject<Array<IdbCompany>>([]);
    this.selectedCompany = new BehaviorSubject<IdbCompany>(undefined);
  }

  async setCompanies() {
    let allCompanies: Array<IdbCompany> = await firstValueFrom(this.getAll());
    this.companies.next(allCompanies);
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

  setSelectedFromGUID(guid: string) {
    let company: IdbCompany = this.getByGUID(guid);
    this.selectedCompany.next(company);
  }

  async asyncUpdate(company: IdbCompany) {
    company = await firstValueFrom(this.updateWithObservable(company));
    await this.setCompanies();
    this.selectedCompany.next(company);
  }

  getByGUID(guid: string): IdbCompany {
    let companies: Array<IdbCompany> = this.companies.getValue();
    let company: IdbCompany = companies.find(_company => { return _company.guid == guid });
    return company;
  }

}
