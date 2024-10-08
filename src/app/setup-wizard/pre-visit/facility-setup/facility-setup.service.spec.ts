import { TestBed } from '@angular/core/testing';

import { FacilitySetupService } from './facility-setup.service';

describe('FacilitySetupService', () => {
  let service: FacilitySetupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacilitySetupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
