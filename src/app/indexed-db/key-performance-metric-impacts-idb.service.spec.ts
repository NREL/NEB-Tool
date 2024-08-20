import { TestBed } from '@angular/core/testing';

import { KeyPerformanceMetricImpactsIdbService } from './key-performance-metric-impacts-idb.service';
import { NgxIndexedDBService } from 'ngx-indexed-db';

describe('KeyPerformanceMetricImpactsIdbService', () => {
  let service: KeyPerformanceMetricImpactsIdbService;

  let dbService: Partial<NgxIndexedDBService> = {}
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: NgxIndexedDBService, useValue: dbService }
      ]});
    service = TestBed.inject(KeyPerformanceMetricImpactsIdbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
