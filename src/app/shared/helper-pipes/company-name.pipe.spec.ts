import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { CompanyNamePipe } from './company-name.pipe';
import { TestBed } from '@angular/core/testing';
import { NgxIndexedDBService } from 'ngx-indexed-db';

describe('CompanyNamePipe', () => {
  it('create an instance', () => {
    let dbService: NgxIndexedDBService = TestBed.inject(NgxIndexedDBService);
    let companyIdbService: CompanyIdbService = new CompanyIdbService(dbService);
    const pipe = new CompanyNamePipe(companyIdbService);
    expect(pipe).toBeTruthy();
  });
});
