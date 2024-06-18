import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyKpiSelectComponent } from './company-kpi-select.component';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { BehaviorSubject } from 'rxjs';
import { IdbOnSiteVisit, getNewIdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { KeyPerformanceIndicatorsIdbService } from 'src/app/indexed-db/key-performance-indicators-idb.service';
import { IdbKeyPerformanceIndicator } from 'src/app/models/keyPerformanceIndicator';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { IdbCompany, getNewIdbCompany } from 'src/app/models/company';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { IdbContact } from 'src/app/models/contact';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HelperPipesModule } from 'src/app/shared/helper-pipes/helper-pipes.module';
import { AddKpiSearchComponent } from './add-kpi-search/add-kpi-search.component';
import { CompanyKpiListComponent } from './company-kpi-list/company-kpi-list.component';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { IdbFacility, getNewIdbFacility } from 'src/app/models/facility';
import { EnergyOpportunityIdbService } from 'src/app/indexed-db/energy-opportunity-idb.service';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { NonEnergyBenefitsIdbService } from 'src/app/indexed-db/non-energy-benefits-idb.service';
import { SelectedKpiOptionPipe } from './add-kpi-search/selected-kpi-option.pipe';

describe('CompanyKpiSelectComponent', () => {
  let component: CompanyKpiSelectComponent;
  let fixture: ComponentFixture<CompanyKpiSelectComponent>;
  let onSiteVisitIdbService: Partial<OnSiteVisitIdbService> = {
    onSiteVisits: new BehaviorSubject<Array<IdbOnSiteVisit>>([]),
    selectedVisit: new BehaviorSubject<IdbOnSiteVisit>(getNewIdbOnSiteVisit('', '', '')),
  };
  let keyPerformanceIndicatorIdbService: Partial<KeyPerformanceIndicatorsIdbService> = {
    keyPerformanceIndicators: new BehaviorSubject<Array<IdbKeyPerformanceIndicator>>([])
  };
  let companyIdbService: Partial<CompanyIdbService> = {
    selectedCompany: new BehaviorSubject<IdbCompany>(getNewIdbCompany(''))
  };
  let contactIdbService: Partial<ContactIdbService> = {
    contacts: new BehaviorSubject<Array<IdbContact>>([])
  };
  let facilityIdbService: Partial<FacilityIdbService> = {
    facilities: new BehaviorSubject<Array<IdbFacility>>([]),
    selectedFacility: new BehaviorSubject<IdbFacility>(getNewIdbFacility('', ''))
  };

  let energyOpportunitiesIdbService: Partial<EnergyOpportunityIdbService> = {};
  let assessmentIdbService: Partial<AssessmentIdbService> = {};
  let nonEnergyBenefitsIdbService: Partial<NonEnergyBenefitsIdbService> = {};
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, FormsModule, RouterTestingModule, HelperPipesModule],
      declarations: [CompanyKpiSelectComponent, AddKpiSearchComponent, CompanyKpiListComponent, SelectedKpiOptionPipe],
      providers: [
        { provide: CompanyIdbService, useValue: companyIdbService },
        { provide: OnSiteVisitIdbService, useValue: onSiteVisitIdbService },
        { provide: ContactIdbService, useValue: contactIdbService },
        { provide: KeyPerformanceIndicatorsIdbService, useValue: keyPerformanceIndicatorIdbService },
        { provide: FacilityIdbService, useValue: facilityIdbService },
        { provide: EnergyOpportunityIdbService, useValue: energyOpportunitiesIdbService },
        { provide: AssessmentIdbService, useValue: assessmentIdbService },
        { provide: NonEnergyBenefitsIdbService, useValue: nonEnergyBenefitsIdbService }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CompanyKpiSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
