import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyDashboardHomeComponent } from './company-dashboard-home.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { DbChangesService } from 'src/app/indexed-db/db-changes.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { BehaviorSubject } from 'rxjs';
import { IdbCompany, getNewIdbCompany } from 'src/app/models/company';
import { IdbFacility } from 'src/app/models/facility';
import { FormsModule } from '@angular/forms';
import { FacilitiesTableComponent } from './facilities-table/facilities-table.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HelperPipesModule } from 'src/app/shared/helper-pipes/helper-pipes.module';
import { AssessmentsTableComponent } from './assessments-table/assessments-table.component';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { UserIdbService } from 'src/app/indexed-db/user-idb.service';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { EnergyOpportunityIdbService } from 'src/app/indexed-db/energy-opportunity-idb.service';
import { IdbEnergyOpportunity } from 'src/app/models/energyOpportunity';

describe('CompanyDashboardHomeComponent', () => {
  let component: CompanyDashboardHomeComponent;
  let fixture: ComponentFixture<CompanyDashboardHomeComponent>;
  let companyDbServiceStub: Partial<CompanyIdbService> = {
    companies: new BehaviorSubject<Array<IdbCompany>>([]),
    selectedCompany: new BehaviorSubject<IdbCompany>(getNewIdbCompany(''))
  };
  let facilityDbServiceStub: Partial<FacilityIdbService> = {
    facilities: new BehaviorSubject<Array<IdbFacility>>([]),
    selectedFacility: new BehaviorSubject<IdbFacility>(undefined)
  }
  let energyOpportunityIdbService: Partial<EnergyOpportunityIdbService> = {
    energyOpportunities: new BehaviorSubject<Array<IdbEnergyOpportunity>>([])
  };
  let assessmentIdbService: Partial<AssessmentIdbService> = {
    selectedAssessment: new BehaviorSubject<IdbAssessment>(undefined),
    assessments: new BehaviorSubject<Array<IdbAssessment>>([])
  };
  let contactIdbService: Partial<ContactIdbService> = {};
  let userIdbService: Partial<UserIdbService> = {};

  let onSiteVisitIdbService: Partial<OnSiteVisitIdbService> = {
    onSiteVisits: new BehaviorSubject<Array<IdbOnSiteVisit>>([])
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule, FontAwesomeModule, HelperPipesModule],
      declarations: [CompanyDashboardHomeComponent, FacilitiesTableComponent, AssessmentsTableComponent],
      providers: [
        { provide: CompanyIdbService, useValue: companyDbServiceStub },
        { provide: FacilityIdbService, useValue: facilityDbServiceStub },
        { provide: DbChangesService, useValue: {} },
        { provide: EnergyOpportunityIdbService, useValue: energyOpportunityIdbService },
        { provide: AssessmentIdbService, useValue: assessmentIdbService },
        { provide: ContactIdbService, useValue: contactIdbService },
        { provide: UserIdbService, useValue: userIdbService },
        { provide: OnSiteVisitIdbService, useValue: onSiteVisitIdbService },
      ]
    });
    fixture = TestBed.createComponent(CompanyDashboardHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
