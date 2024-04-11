import { TestBed } from '@angular/core/testing';

import { AssessmentIdbService } from './assessment-idb.service';
import { NgxIndexedDBService } from 'ngx-indexed-db';

describe('AssessmentIdbService', () => {
  let service: AssessmentIdbService;

  let dbService: Partial<NgxIndexedDBService> = {}
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: NgxIndexedDBService, useValue: dbService }
      ]
    });
    service = TestBed.inject(AssessmentIdbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
