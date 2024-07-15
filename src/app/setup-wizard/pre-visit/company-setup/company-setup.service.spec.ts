import { TestBed } from '@angular/core/testing';

import { CompanySetupService } from './company-setup.service';

describe('CompanySetupService', () => {
  let service: CompanySetupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanySetupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
