import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupWizardSidebarComponent } from './setup-wizard-sidebar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SetupWizardContext, SetupWizardService } from '../setup-wizard.service';
import { BehaviorSubject } from 'rxjs';
import { IdbCompany } from 'src/app/models/company';
import { IdbFacility } from 'src/app/models/facility';
import { IdbProject } from 'src/app/models/project';
import { IdbAssessment } from 'src/app/models/assessment';

describe('SetupWizardSidebarComponent', () => {
  let component: SetupWizardSidebarComponent;
  let fixture: ComponentFixture<SetupWizardSidebarComponent>;

  let setupWizardService: Partial<SetupWizardService> = {
    company: new BehaviorSubject<IdbCompany>(undefined),
    facility: new BehaviorSubject<IdbFacility>(undefined),
    projects: new BehaviorSubject<Array<IdbProject>>([]),
    assessments: new BehaviorSubject<Array<IdbAssessment>>([]),
    setupContext: new BehaviorSubject<SetupWizardContext>(undefined),
    sidebarOpen: new BehaviorSubject<boolean>(false)
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, FontAwesomeModule],
      declarations: [SetupWizardSidebarComponent],
      providers: [
        { provide: SetupWizardService, useValue: setupWizardService }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SetupWizardSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
