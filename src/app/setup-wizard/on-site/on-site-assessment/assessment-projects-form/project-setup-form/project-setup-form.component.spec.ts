import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSetupFormComponent } from './project-setup-form.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { SetupWizardContext, SetupWizardService } from 'src/app/setup-wizard/setup-wizard.service';
import { BehaviorSubject } from 'rxjs';
import { IdbCompany, getNewIdbCompany } from 'src/app/models/company';
import { IdbFacility, getNewIdbFacility } from 'src/app/models/facility';
import { IdbAssessment } from 'src/app/models/assessment';
import { IdbProject, getNewIdbProject } from 'src/app/models/project';
import { IdbNonEnergyBenefit } from 'src/app/models/nonEnergyBenefit';

describe('ProjectSetupFormComponent', () => {
  let component: ProjectSetupFormComponent;
  let fixture: ComponentFixture<ProjectSetupFormComponent>;


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
      declarations: [ProjectSetupFormComponent],
      providers: [
        { provide: SetupWizardService, useValue: setupWizardService },
      ]

    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectSetupFormComponent);
    component = fixture.componentInstance;
    component.project = getNewIdbProject('', '', '', '');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
