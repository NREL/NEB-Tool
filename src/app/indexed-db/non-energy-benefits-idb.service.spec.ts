import { TestBed } from '@angular/core/testing';

import { NonEnergyBenefitsIdbService } from './non-energy-benefits-idb.service';
import { NgxIndexedDBService } from 'ngx-indexed-db';

describe('NonEnergyBenefitsIdbService', () => {
  let service: NonEnergyBenefitsIdbService;

  let dbService: Partial<NgxIndexedDBService> = {}
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: NgxIndexedDBService, useValue: dbService }
      ]});
    service = TestBed.inject(NonEnergyBenefitsIdbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
