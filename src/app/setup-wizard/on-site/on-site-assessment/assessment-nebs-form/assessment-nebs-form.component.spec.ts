import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentNebsFormComponent } from './assessment-nebs-form.component';
import { SetupWizardContext, SetupWizardService } from 'src/app/setup-wizard/setup-wizard.service';
import { BehaviorSubject } from 'rxjs';
import { IdbCompany, getNewIdbCompany } from 'src/app/models/company';
import { IdbFacility, getNewIdbFacility } from 'src/app/models/facility';
import { IdbProject } from 'src/app/models/project';
import { IdbAssessment } from 'src/app/models/assessment';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IdbNonEnergyBenefit } from 'src/app/models/nonEnergyBenefit';
import { FormsModule } from '@angular/forms';
import { NebSetupFormComponent } from './neb-setup-form/neb-setup-form.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('AssessmentNebsFormComponent', () => {
  let component: AssessmentNebsFormComponent;
  let fixture: ComponentFixture<AssessmentNebsFormComponent>;

  let setupWizardService: Partial<SetupWizardService> = {
    company: new BehaviorSubject<IdbCompany>(getNewIdbCompany('')),
    facility: new BehaviorSubject<IdbFacility>(getNewIdbFacility('', '')),
    projects: new BehaviorSubject<Array<IdbProject>>([]),
    assessments: new BehaviorSubject<Array<IdbAssessment>>([]),
    setupContext: new BehaviorSubject<SetupWizardContext>('full'),
    sidebarOpen: new BehaviorSubject<boolean>(false),
    highlighNebGuid: new BehaviorSubject<string>(undefined),
    nonEnergyBenefits: new BehaviorSubject<Array<IdbNonEnergyBenefit>>([])
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, FormsModule, RouterTestingModule],
      declarations: [AssessmentNebsFormComponent, NebSetupFormComponent],
      providers: [
        { provide: SetupWizardService, useValue: setupWizardService }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssessmentNebsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
