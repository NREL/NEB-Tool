import { TestBed } from '@angular/core/testing';

import { DbChangesService } from './db-changes.service';
import { CompanyIdbService } from './company-idb.service';
import { ProjectIdbService } from './project-idb.service';
import { FacilityIdbService } from './facility-idb.service';

describe('DbChangesService', () => {
  let service: DbChangesService;

  beforeEach(() => {
    let companyIdbService: Partial<CompanyIdbService> = {};
    let facilityIdbService: Partial<FacilityIdbService> = {};
    let projectIdbService: Partial<ProjectIdbService> = {};
    TestBed.configureTestingModule({
      providers: [
        { provide: CompanyIdbService, useValue: companyIdbService },
        { provide: FacilityIdbService, useValue: facilityIdbService },
        { provide: ProjectIdbService, useValue: projectIdbService }
      ]
    });
    service = TestBed.inject(DbChangesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
