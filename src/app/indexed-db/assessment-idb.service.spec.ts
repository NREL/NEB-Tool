import { TestBed } from '@angular/core/testing';

import { AssessmentIdbService } from './assessment-idb.service';

describe('AssessmentIdbService', () => {
  let service: AssessmentIdbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssessmentIdbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
