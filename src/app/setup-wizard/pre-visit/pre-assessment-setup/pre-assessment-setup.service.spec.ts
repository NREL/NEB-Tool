import { TestBed } from '@angular/core/testing';

import { PreAssessmentSetupService } from './pre-assessment-setup.service';

describe('PreAssessmentSetupService', () => {
  let service: PreAssessmentSetupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreAssessmentSetupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
