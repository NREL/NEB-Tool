import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSetupFormComponent } from './project-setup-form.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { SetupWizardService } from '../../../setup-wizard.service';
import { BehaviorSubject } from 'rxjs';
import { IdbCompany } from 'src/app/models/company';
import { IdbFacility } from 'src/app/models/facility';
import { IdbAssessment } from 'src/app/models/assessment';
import { IdbProject } from 'src/app/models/project';

describe('ProjectSetupFormComponent', () => {
  let component: ProjectSetupFormComponent;
  let fixture: ComponentFixture<ProjectSetupFormComponent>;

  let setupWizardService: Partial<SetupWizardService> = {
    company: new BehaviorSubject<IdbCompany>(undefined),
    facility: new BehaviorSubject<IdbFacility>(undefined),
    assessments: new BehaviorSubject<Array<IdbAssessment>>([]),
    projects: new BehaviorSubject<Array<IdbProject>>([])
  }
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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
