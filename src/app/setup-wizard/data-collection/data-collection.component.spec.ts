import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataCollectionComponent } from './data-collection.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { NonEnergyBenefitsIdbService } from 'src/app/indexed-db/non-energy-benefits-idb.service';
import { EnergyOpportunityIdbService } from 'src/app/indexed-db/energy-opportunity-idb.service';
import { KeyPerformanceIndicatorsIdbService } from 'src/app/indexed-db/key-performance-indicators-idb.service';

describe('DataCollectionComponent', () => {
  let component: DataCollectionComponent;
  let fixture: ComponentFixture<DataCollectionComponent>;

  let companyIdbService: Partial<CompanyIdbService> = {};
  let facilityIdbService: Partial<FacilityIdbService> = {};
  let assessmentIdbService: Partial<AssessmentIdbService> = {};
  let contactIdbService: Partial<ContactIdbService> = {};
  let onSiteVisitIdbService: Partial<OnSiteVisitIdbService> = {};
  let energyOpportunityIdbService: Partial<EnergyOpportunityIdbService> = {};
  let nonEnergyBenefitsIdbService: Partial<NonEnergyBenefitsIdbService> = {};
  let keyPerformanceIndicatorService: Partial<KeyPerformanceIndicatorsIdbService> = {};
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [DataCollectionComponent],
      providers: [
        { provide: CompanyIdbService, useValue: companyIdbService },
        { provide: FacilityIdbService, useValue: facilityIdbService },
        { provide: AssessmentIdbService, useValue: assessmentIdbService },
        { provide: ContactIdbService, useValue: contactIdbService },
        { provide: OnSiteVisitIdbService, useValue: onSiteVisitIdbService },
        { provide: EnergyOpportunityIdbService, useValue: energyOpportunityIdbService },
        { provide: NonEnergyBenefitsIdbService, useValue: nonEnergyBenefitsIdbService },
        { provide: KeyPerformanceIndicatorsIdbService, useValue: keyPerformanceIndicatorService },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DataCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
