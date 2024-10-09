import { TestBed } from '@angular/core/testing';

import { AssessmentEnergyOpportunitiesFormService } from './assessment-energy-opportunities-form.service';

describe('AssessmentEnergyOpportunitiesFormService', () => {
  let service: AssessmentEnergyOpportunitiesFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssessmentEnergyOpportunitiesFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
