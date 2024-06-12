import { TestBed } from '@angular/core/testing';

import { KeyPerformanceIndicatorsIdbService } from './key-performance-indicators-idb.service';

describe('KeyPerformanceIndicatorsIdbService', () => {
  let service: KeyPerformanceIndicatorsIdbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeyPerformanceIndicatorsIdbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
