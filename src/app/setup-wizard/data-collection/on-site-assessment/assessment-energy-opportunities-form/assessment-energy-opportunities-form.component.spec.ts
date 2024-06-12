import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentEnergyOpportunitiesFormComponent } from './assessment-energy-opportunities-form.component';
import { SetupWizardContext, SetupWizardService } from 'src/app/setup-wizard/setup-wizard.service';
import { BehaviorSubject } from 'rxjs';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { IdbAssessment, getNewIdbAssessment } from 'src/app/models/assessment';
import { EnergyOpportunityIdbService } from 'src/app/indexed-db/energy-opportunity-idb.service';
import { IdbEnergyOpportunity } from 'src/app/models/energyOpportunity';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { EnergyOpportunitySetupFormComponent } from './energy-opportunity-setup-form/energy-opportunity-setup-form.component';

describe('AssessmentEnergyOpportunitiesFormComponent', () => {
  let component: AssessmentEnergyOpportunitiesFormComponent;
  let fixture: ComponentFixture<AssessmentEnergyOpportunitiesFormComponent>;


  let setupWizardService: Partial<SetupWizardService> = {
    setupContext: new BehaviorSubject<SetupWizardContext>('full'),
    sidebarOpen: new BehaviorSubject<boolean>(false),
    highlightNebGuid: new BehaviorSubject<string>(undefined),
    highlightOpportunityGuid: new BehaviorSubject<string>(undefined),
  };
  let assessmentIdbService: Partial<AssessmentIdbService> = {
    assessments: new BehaviorSubject<Array<IdbAssessment>>([]),
    selectedAssessment: new BehaviorSubject<IdbAssessment>(getNewIdbAssessment('', '', ''))
  };
  let energyOpportunityIdbService: Partial<EnergyOpportunityIdbService> = {
    energyOpportunities: new BehaviorSubject<Array<IdbEnergyOpportunity>>([])
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, RouterTestingModule, FormsModule],
      declarations: [AssessmentEnergyOpportunitiesFormComponent, EnergyOpportunitySetupFormComponent],
      providers: [
        { provide: SetupWizardService, useValue: setupWizardService },
        { provide: AssessmentIdbService, useValue: assessmentIdbService },
        { provide: EnergyOpportunityIdbService, useValue: energyOpportunityIdbService },
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssessmentEnergyOpportunitiesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});