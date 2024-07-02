import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataEvaluationComponent } from './data-evaluation.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { NonEnergyBenefitsIdbService } from 'src/app/indexed-db/non-energy-benefits-idb.service';
import { EnergyOpportunityIdbService } from 'src/app/indexed-db/energy-opportunity-idb.service';
import { KeyPerformanceIndicatorsIdbService } from 'src/app/indexed-db/key-performance-indicators-idb.service';
import { DbChangesService } from 'src/app/indexed-db/db-changes.service';

describe('DataEvaluationComponent', () => {
  let component: DataEvaluationComponent;
  let fixture: ComponentFixture<DataEvaluationComponent>;

  let companyIdbService: Partial<CompanyIdbService> = {};
  let facilityIdbService: Partial<FacilityIdbService> = {};
  let assessmentIdbService: Partial<AssessmentIdbService> = {};
  let contactIdbService: Partial<ContactIdbService> = {};
  let onSiteVisitIdbService: Partial<OnSiteVisitIdbService> = {};
  let energyOpportunityIdbService: Partial<EnergyOpportunityIdbService> = {};
  let nonEnergyBenefitsIdbService: Partial<NonEnergyBenefitsIdbService> = {};
  let keyPerformanceIndicatorService: Partial<KeyPerformanceIndicatorsIdbService> = {};
  let dbChangesService: Partial<DbChangesService> = {};
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [DataEvaluationComponent],
      providers: [
        { provide: CompanyIdbService, useValue: companyIdbService },
        { provide: FacilityIdbService, useValue: facilityIdbService },
        { provide: AssessmentIdbService, useValue: assessmentIdbService },
        { provide: ContactIdbService, useValue: contactIdbService },
        { provide: OnSiteVisitIdbService, useValue: onSiteVisitIdbService },
        { provide: EnergyOpportunityIdbService, useValue: energyOpportunityIdbService },
        { provide: NonEnergyBenefitsIdbService, useValue: nonEnergyBenefitsIdbService },
        { provide: KeyPerformanceIndicatorsIdbService, useValue: keyPerformanceIndicatorService },
        { provide: DbChangesService, useValue: dbChangesService}
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
