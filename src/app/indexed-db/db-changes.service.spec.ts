import { TestBed } from '@angular/core/testing';

import { DbChangesService } from './db-changes.service';
import { CompanyIdbService } from './company-idb.service';
import { ProjectIdbService } from './project-idb.service';
import { FacilityIdbService } from './facility-idb.service';
import { AssessmentIdbService } from './assessment-idb.service';

describe('DbChangesService', () => {
  let service: DbChangesService;

  beforeEach(() => {
    let companyIdbService: Partial<CompanyIdbService> = {};
    let facilityIdbService: Partial<FacilityIdbService> = {};
    let projectIdbService: Partial<ProjectIdbService> = {};
    let assessmentIdbService: Partial<AssessmentIdbService> = {};
    TestBed.configureTestingModule({
      providers: [
        { provide: CompanyIdbService, useValue: companyIdbService },
        { provide: FacilityIdbService, useValue: facilityIdbService },
        { provide: ProjectIdbService, useValue: projectIdbService },
        { provide: AssessmentIdbService, useValue: assessmentIdbService }
      ]
    });
    service = TestBed.inject(DbChangesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
