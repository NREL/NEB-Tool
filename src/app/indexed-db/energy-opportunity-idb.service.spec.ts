import { TestBed } from '@angular/core/testing';

import { EnergyOpportunityIdbService } from './energy-opportunity-idb.service';
import { NgxIndexedDBService } from 'ngx-indexed-db';

describe('EnergyOpportunityIdbService', () => {
  let service: EnergyOpportunityIdbService;
  let dbService: Partial<NgxIndexedDBService> = {}
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: NgxIndexedDBService, useValue: dbService }
      ]});
    service = TestBed.inject(EnergyOpportunityIdbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
