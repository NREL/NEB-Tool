import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanySetupSummaryComponent } from './company-setup-summary.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BehaviorSubject } from 'rxjs';
import { IdbCompany, getNewIdbCompany } from 'src/app/models/company';
import { IdbFacility, getNewIdbFacility } from 'src/app/models/facility';
import { IdbProject } from 'src/app/models/project';
import { IdbContact } from 'src/app/models/contact';
import { IdbAssessment } from 'src/app/models/assessment';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { HelperPipesModule } from 'src/app/shared/helper-pipes/helper-pipes.module';
import { SetupWizardService } from 'src/app/setup-wizard/setup-wizard.service';
import { UserIdbService } from 'src/app/indexed-db/user-idb.service';


describe('CompanySetupSummaryComponent', () => {
  let component: CompanySetupSummaryComponent;
  let fixture: ComponentFixture<CompanySetupSummaryComponent>;
  let setupWizardService: Partial<SetupWizardService> = {
    company: new BehaviorSubject<IdbCompany>(getNewIdbCompany('')),
    facility: new BehaviorSubject<IdbFacility>(getNewIdbFacility('', '')),
    projects: new BehaviorSubject<Array<IdbProject>>([]),
    contacts: new BehaviorSubject<Array<IdbContact>>([]),
    assessments: new BehaviorSubject<Array<IdbAssessment>>([])
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
  let userIdbService: Partial<UserIdbService> = {};
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, HelperPipesModule],
      declarations: [CompanySetupSummaryComponent],
      providers: [
        { provide: SetupWizardService, useValue: setupWizardService },
        { provide: CompanyIdbService, useValue: companyIdbService },   
        { provide: FacilityIdbService, useValue: facilityIdbService },
        { provide: ContactIdbService, useValue: contactIdbService },
        { provide: AssessmentIdbService, useValue: assessmentIdbService },
        { provide: UserIdbService, useValue: userIdbService }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompanySetupSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
