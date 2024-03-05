import { TestBed } from '@angular/core/testing';

import { CompanyIdbService } from './company-idb.service';
import { NgxIndexedDBService } from 'ngx-indexed-db';

describe('CompanyIdbService', () => {
  let service: CompanyIdbService;

  beforeEach(() => {
    let dbService: Partial<NgxIndexedDBService> = {}
    TestBed.configureTestingModule({
      providers: [
        { provide: NgxIndexedDBService, useValue: dbService }
      ]
    });
    service = TestBed.inject(CompanyIdbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
