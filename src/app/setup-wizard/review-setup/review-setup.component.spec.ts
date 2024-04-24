import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewSetupComponent } from './review-setup.component';
import { UserIdbService } from 'src/app/indexed-db/user-idb.service';
import { IdbUser, getNewIdbUser } from 'src/app/models/user';
import { BehaviorSubject } from 'rxjs';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { IdbCompany } from 'src/app/models/company';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { IdbFacility } from 'src/app/models/facility';
import { SetupWizardService } from '../setup-wizard.service';
import { IdbAssessment } from 'src/app/models/assessment';
import { IdbProject } from 'src/app/models/project';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { ProjectIdbService } from 'src/app/indexed-db/project-idb.service';

describe('ReviewSetupComponent', () => {
  let component: ReviewSetupComponent;
  let fixture: ComponentFixture<ReviewSetupComponent>;
  let userIdbService: Partial<UserIdbService> = {
    user: new BehaviorSubject<IdbUser>(getNewIdbUser())
  }
  let companyIdbService: Partial<CompanyIdbService> = {
    companies: new BehaviorSubject<Array<IdbCompany>>([])
  };
  let facilityIdbService: Partial<FacilityIdbService> = {
    facilities: new BehaviorSubject<Array<IdbFacility>>([])
  };
  let assessmentIdbService: Partial<AssessmentIdbService> = {};
  let projectIdbService: Partial<ProjectIdbService> = {};
  let setupWizardService: Partial<SetupWizardService> = {
    company: new BehaviorSubject<IdbCompany>(undefined),
    facility: new BehaviorSubject<IdbFacility>(undefined),
    assessments: new BehaviorSubject<Array<IdbAssessment>>([]),
    projects: new BehaviorSubject<Array<IdbProject>>([])
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, FontAwesomeModule],
      declarations: [ReviewSetupComponent],
      providers: [
        { provide: UserIdbService, useValue: userIdbService },
        { provide: SetupWizardService, useValue: setupWizardService },
        { provide: CompanyIdbService, useValue: companyIdbService },
        { provide: FacilityIdbService, useValue: facilityIdbService },
        { provide: AssessmentIdbService, useValue: assessmentIdbService },
        { provide: ProjectIdbService, useValue: projectIdbService },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ReviewSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
