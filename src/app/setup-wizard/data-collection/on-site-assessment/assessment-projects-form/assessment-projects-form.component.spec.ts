import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentProjectsFormComponent } from './assessment-projects-form.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { SetupWizardContext, SetupWizardService } from 'src/app/setup-wizard/setup-wizard.service';
import { BehaviorSubject } from 'rxjs';
import { ProjectSetupFormComponent } from './project-setup-form/project-setup-form.component';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { IdbAssessment, getNewIdbAssessment } from 'src/app/models/assessment';
import { ProjectIdbService } from 'src/app/indexed-db/project-idb.service';
import { IdbProject } from 'src/app/models/project';

describe('AssessmentProjectsFormComponent', () => {
  let component: AssessmentProjectsFormComponent;
  let fixture: ComponentFixture<AssessmentProjectsFormComponent>;

  let setupWizardService: Partial<SetupWizardService> = {
    setupContext: new BehaviorSubject<SetupWizardContext>('full'),
    sidebarOpen: new BehaviorSubject<boolean>(false),
    highlighNebGuid: new BehaviorSubject<string>(undefined),
    highlighProjectGuid: new BehaviorSubject<string>(undefined),
  };
  let assessmentIdbService: Partial<AssessmentIdbService> = {
    assessments: new BehaviorSubject<Array<IdbAssessment>>([]),
    selectedAssessment: new BehaviorSubject<IdbAssessment>(getNewIdbAssessment('', '', ''))
  };
  let projectIdbService: Partial<ProjectIdbService> = {
    projects: new BehaviorSubject<Array<IdbProject>>([])
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, RouterTestingModule, FormsModule],
      declarations: [AssessmentProjectsFormComponent, ProjectSetupFormComponent],
      providers: [
        { provide: SetupWizardService, useValue: setupWizardService },
        { provide: AssessmentIdbService, useValue: assessmentIdbService },
        { provide: ProjectIdbService, useValue: projectIdbService },
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
