import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GettingStartedComponent } from './getting-started.component';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { IdbCompany } from 'src/app/models/company';
import { BehaviorSubject } from 'rxjs';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { IdbFacility } from 'src/app/models/facility';
import { SetupWizardService } from '../setup-wizard.service';
import { IdbProject } from 'src/app/models/project';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';
import { FormsModule } from '@angular/forms';

describe('GettingStartedComponent', () => {
  let component: GettingStartedComponent;
  let fixture: ComponentFixture<GettingStartedComponent>;

  let companyIdbService: Partial<CompanyIdbService> = {
    companies: new BehaviorSubject<Array<IdbCompany>>([])
  };
  let facilityIdbService: Partial<FacilityIdbService> = {
    facilities: new BehaviorSubject<Array<IdbFacility>>([])
  };
  let setupWizardService: Partial<SetupWizardService> = {
    company: new BehaviorSubject<IdbCompany>(undefined),
    facility: new BehaviorSubject<IdbFacility>(undefined),
    projects: new BehaviorSubject<Array<IdbProject>>([])
  };
  let assessmentIdbService: Partial<AssessmentIdbService> = {
    assessments: new BehaviorSubject<Array<IdbAssessment>>([])
   };
  let contactIdbService: Partial<ContactIdbService> = { };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, FormsModule],
      declarations: [GettingStartedComponent],
      providers: [
        { provide: CompanyIdbService, useValue: companyIdbService },
        { provide: FacilityIdbService, useValue: facilityIdbService },
        { provide: SetupWizardService, useValue: setupWizardService },
        { provide: AssessmentIdbService, useValue: assessmentIdbService },
        { provide: ContactIdbService, useValue: contactIdbService }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GettingStartedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
