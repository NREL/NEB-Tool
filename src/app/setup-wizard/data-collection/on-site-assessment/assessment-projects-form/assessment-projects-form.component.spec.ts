import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentProjectsFormComponent } from './assessment-projects-form.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { SetupWizardContext, SetupWizardService } from 'src/app/setup-wizard/setup-wizard.service';
import { BehaviorSubject } from 'rxjs';
import { IdbCompany, getNewIdbCompany } from 'src/app/models/company';
import { IdbFacility, getNewIdbFacility } from 'src/app/models/facility';
import { IdbAssessment } from 'src/app/models/assessment';
import { IdbProject } from 'src/app/models/project';
import { IdbNonEnergyBenefit } from 'src/app/models/nonEnergyBenefit';
import { ProjectSetupFormComponent } from './project-setup-form/project-setup-form.component';

describe('AssessmentProjectsFormComponent', () => {
  let component: AssessmentProjectsFormComponent;
  let fixture: ComponentFixture<AssessmentProjectsFormComponent>;


  let setupWizardService: Partial<SetupWizardService> = {
    company: new BehaviorSubject<IdbCompany>(getNewIdbCompany('')),
    facility: new BehaviorSubject<IdbFacility>(getNewIdbFacility('', '')),
    projects: new BehaviorSubject<Array<IdbProject>>([]),
    assessments: new BehaviorSubject<Array<IdbAssessment>>([]),
    setupContext: new BehaviorSubject<SetupWizardContext>('full'),
    sidebarOpen: new BehaviorSubject<boolean>(false),
    highlighNebGuid: new BehaviorSubject<string>(undefined),
    highlighProjectGuid: new BehaviorSubject<string>(undefined),
    nonEnergyBenefits: new BehaviorSubject<Array<IdbNonEnergyBenefit>>([])
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, RouterTestingModule, FormsModule],
      declarations: [AssessmentProjectsFormComponent, ProjectSetupFormComponent],
      providers: [
        { provide: SetupWizardService, useValue: setupWizardService },
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssessmentProjectsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
