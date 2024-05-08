import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewPreVisitSetupComponent } from './review-pre-visit-setup.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BehaviorSubject } from 'rxjs';
import { IdbCompany, getNewIdbCompany } from 'src/app/models/company';
import { IdbFacility, getNewIdbFacility } from 'src/app/models/facility';
import { IdbProject } from 'src/app/models/project';
import { IdbContact } from 'src/app/models/contact';
import { IdbAssessment, getNewIdbAssessment } from 'src/app/models/assessment';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { HelperPipesModule } from 'src/app/shared/helper-pipes/helper-pipes.module';
import { SetupWizardService } from 'src/app/setup-wizard/setup-wizard.service';
import { TeamDetailsSummaryComponent } from './team-details-summary/team-details-summary.component';
import { ProcessEquipmentSummaryComponent } from './process-equipment-summary/process-equipment-summary.component';
import { PreAssessmentSummaryComponent } from './pre-assessment-summary/pre-assessment-summary.component';
import { FacilityDetailsSummaryComponent } from './facility-details-summary/facility-details-summary.component';
import { CompanyKpisSummaryComponent } from './company-kpis-summary/company-kpis-summary.component';
import { CompanyDetailsSummaryComponent } from './company-details-summary/company-details-summary.component';
import { TableEntriesModule } from 'src/app/shared/table-entries/table-entries.module';

describe('ReviewPreVisitSetupComponent', () => {
  let component: ReviewPreVisitSetupComponent;
  let fixture: ComponentFixture<ReviewPreVisitSetupComponent>;

  let setupWizardService: Partial<SetupWizardService> = {
    company: new BehaviorSubject<IdbCompany>(getNewIdbCompany('')),
    facility: new BehaviorSubject<IdbFacility>(getNewIdbFacility('', '')),
    projects: new BehaviorSubject<Array<IdbProject>>([]),
    contacts: new BehaviorSubject<Array<IdbContact>>([]),
    assessments: new BehaviorSubject<Array<IdbAssessment>>([getNewIdbAssessment('', '', '')]),
  };
  let companyIdbService: Partial<CompanyIdbService> = {
    companies: new BehaviorSubject<Array<IdbCompany>>([]),
    selectedCompany: new BehaviorSubject<IdbCompany>(getNewIdbCompany(''))
  };
  let facilityIdbService: Partial<FacilityIdbService> = {
    facilities: new BehaviorSubject<Array<IdbFacility>>([]),
    selectedFacility: new BehaviorSubject<IdbFacility>(getNewIdbFacility('', ''))
  };
  let contactIdbService: Partial<ContactIdbService> = {};
  let assessmentIdbService: Partial<AssessmentIdbService> = {};
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, HelperPipesModule, TableEntriesModule],
      declarations: [ReviewPreVisitSetupComponent, TeamDetailsSummaryComponent, ProcessEquipmentSummaryComponent, PreAssessmentSummaryComponent, FacilityDetailsSummaryComponent, CompanyKpisSummaryComponent, CompanyDetailsSummaryComponent],
      providers: [
        { provide: SetupWizardService, useValue: setupWizardService },
        { provide: CompanyIdbService, useValue: companyIdbService },
        { provide: FacilityIdbService, useValue: facilityIdbService },
        { provide: ContactIdbService, useValue: contactIdbService },
        { provide: AssessmentIdbService, useValue: assessmentIdbService }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ReviewPreVisitSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
