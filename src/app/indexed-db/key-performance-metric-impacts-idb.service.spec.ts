import { TestBed } from '@angular/core/testing';

import { KeyPerformanceMetricImpactsIdbService } from './key-performance-metric-impacts-idb.service';

describe('KeyPerformanceMetricImpactsIdbService', () => {
  let service: KeyPerformanceMetricImpactsIdbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeyPerformanceMetricImpactsIdbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
