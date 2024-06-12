import { TestBed } from '@angular/core/testing';

import { DbChangesService } from './db-changes.service';
import { CompanyIdbService } from './company-idb.service';
import { FacilityIdbService } from './facility-idb.service';
import { AssessmentIdbService } from './assessment-idb.service';
import { ContactIdbService } from './contact-idb.service';
import { NonEnergyBenefitsIdbService } from './non-energy-benefits-idb.service';
import { OnSiteVisitIdbService } from './on-site-visit-idb.service';
import { EnergyOpportunityIdbService } from './energy-opportunity-idb.service';

describe('DbChangesService', () => {
  let service: DbChangesService;

  beforeEach(() => {
    let companyIdbService: Partial<CompanyIdbService> = {};
    let facilityIdbService: Partial<FacilityIdbService> = {};
    let energyOpportunityIdbService: Partial<EnergyOpportunityIdbService> = {};
    let assessmentIdbService: Partial<AssessmentIdbService> = {};
    let contactIdbService: Partial<ContactIdbService> = {};
    let nonEnergyBenefitsIdbService: Partial<NonEnergyBenefitsIdbService> = {};
    TestBed.configureTestingModule({
      providers: [
        { provide: CompanyIdbService, useValue: companyIdbService },
        { provide: FacilityIdbService, useValue: facilityIdbService },
        { provide: EnergyOpportunityIdbService, useValue: energyOpportunityIdbService },
        { provide: AssessmentIdbService, useValue: assessmentIdbService },
        { provide: ContactIdbService, useValue: contactIdbService },
        { provide: NonEnergyBenefitsIdbService, useValue: nonEnergyBenefitsIdbService },
        { provide: OnSiteVisitIdbService, useValue: {} }
      ]
    });
    service = TestBed.inject(DbChangesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
