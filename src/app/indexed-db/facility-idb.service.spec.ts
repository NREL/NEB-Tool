import { TestBed } from '@angular/core/testing';

import { FacilityIdbService } from './facility-idb.service';
import { NgxIndexedDBService } from 'ngx-indexed-db';

describe('FacilityIdbService', () => {
  let service: FacilityIdbService;

  beforeEach(() => {
    let dbService: Partial<NgxIndexedDBService> = {}
    TestBed.configureTestingModule({
      providers: [
        { provide: NgxIndexedDBService, useValue: dbService }
      ]
    });
    service = TestBed.inject(FacilityIdbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
