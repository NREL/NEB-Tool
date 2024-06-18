import { TestBed } from '@angular/core/testing';

import { KeyPerformanceIndicatorsIdbService } from './key-performance-indicators-idb.service';
import { NgxIndexedDBService } from 'ngx-indexed-db';

describe('KeyPerformanceIndicatorsIdbService', () => {
  let service: KeyPerformanceIndicatorsIdbService;

  let dbService: Partial<NgxIndexedDBService> = {}
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: NgxIndexedDBService, useValue: dbService }
      ]});
    service = TestBed.inject(KeyPerformanceIndicatorsIdbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
