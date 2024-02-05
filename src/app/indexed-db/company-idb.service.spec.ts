import { TestBed } from '@angular/core/testing';

import { CompanyIdbService } from './company-idb.service';

describe('CompanyIdbService', () => {
  let service: CompanyIdbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyIdbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
