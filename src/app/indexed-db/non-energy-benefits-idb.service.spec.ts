import { TestBed } from '@angular/core/testing';

import { NonEnergyBenefitsIdbService } from './non-energy-benefits-idb.service';

describe('NonEnergyBenefitsIdbService', () => {
  let service: NonEnergyBenefitsIdbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NonEnergyBenefitsIdbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
