import { TestBed } from '@angular/core/testing';

import { FacilityIdbService } from './facility-idb.service';

describe('FacilityIdbService', () => {
  let service: FacilityIdbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacilityIdbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
