import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentSetupComponent } from './assessment-setup.component';
import { UserIdbService } from 'src/app/indexed-db/user-idb.service';
import { IdbUser, getNewIdbUser } from 'src/app/models/user';
import { BehaviorSubject } from 'rxjs';
import { SetupWizardService } from '../setup-wizard.service';
import { IdbCompany } from 'src/app/models/company';
import { IdbFacility } from 'src/app/models/facility';
import { IdbProject } from 'src/app/models/project';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IdbAssessment } from 'src/app/models/assessment';

describe('AssessmentSetupComponent', () => {
  let component: AssessmentSetupComponent;
  let fixture: ComponentFixture<AssessmentSetupComponent>;
  let userIdbService: Partial<UserIdbService> = {
    user: new BehaviorSubject<IdbUser>(getNewIdbUser())
  }
  let setupWizardService: Partial<SetupWizardService> = {
    company: new BehaviorSubject<IdbCompany>(undefined),
    facility: new BehaviorSubject<IdbFacility>(undefined),
    assessments: new BehaviorSubject<Array<IdbAssessment>>([]),
    projects: new BehaviorSubject<Array<IdbProject>>([])
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, FontAwesomeModule],
      declarations: [AssessmentSetupComponent],
      providers: [
        { provide: UserIdbService, useValue: userIdbService },
        { provide: SetupWizardService, useValue: setupWizardService },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AssessmentSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
