import { TestBed } from '@angular/core/testing';

import { BackupDataService } from './backup-data.service';
import { UserIdbService } from 'src/app/indexed-db/user-idb.service';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { EnergyOpportunityIdbService } from 'src/app/indexed-db/energy-opportunity-idb.service';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { KeyPerformanceIndicatorsIdbService } from 'src/app/indexed-db/key-performance-indicators-idb.service';
import { NonEnergyBenefitsIdbService } from 'src/app/indexed-db/non-energy-benefits-idb.service';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { LoadingService } from 'src/app/core-components/loading/loading.service';

describe('BackupDataService', () => {
  let service: BackupDataService;

  

  beforeEach(() => {
    let userIdbService: Partial<UserIdbService> = {};
    let companyIdbService: Partial<CompanyIdbService> = {};
    let facilityIdbService: Partial<FacilityIdbService> = {};
    let contactIdbService: Partial<ContactIdbService> = {};
    let energyOpportunityIdbService: Partial<EnergyOpportunityIdbService> = {};
    let assessmentIdbService: Partial<AssessmentIdbService> = {};
    let keyPerformanceIndicatorsIdbService: Partial<KeyPerformanceIndicatorsIdbService> = {};
    let nonEnergyBenefitsIdbService: Partial<NonEnergyBenefitsIdbService> = {};
    let onSiteVisitIdbService: Partial<OnSiteVisitIdbService>;
    let loadingService: Partial<LoadingService> = {};
    TestBed.configureTestingModule({
      providers: [
        { provide: CompanyIdbService, useValue: companyIdbService },
        { provide: FacilityIdbService, useValue: facilityIdbService },
        { provide: EnergyOpportunityIdbService, useValue: energyOpportunityIdbService },
        { provide: AssessmentIdbService, useValue: assessmentIdbService },
        { provide: ContactIdbService, useValue: contactIdbService },
        { provide: NonEnergyBenefitsIdbService, useValue: nonEnergyBenefitsIdbService },
        { provide: OnSiteVisitIdbService, useValue: onSiteVisitIdbService },
        { provide: KeyPerformanceIndicatorsIdbService, useValue: keyPerformanceIndicatorsIdbService },
        { provide: UserIdbService, useValue: userIdbService},
        { provide: LoadingService, useValue: loadingService}
      ]

    });
    service = TestBed.inject(BackupDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
