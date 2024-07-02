import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentEnergyOpportunitiesFormComponent } from './assessment-energy-opportunities-form.component';
import { SetupWizardService } from 'src/app/setup-wizard/setup-wizard.service';
import { BehaviorSubject } from 'rxjs';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { IdbAssessment, getNewIdbAssessment } from 'src/app/models/assessment';
import { EnergyOpportunityIdbService } from 'src/app/indexed-db/energy-opportunity-idb.service';
import { IdbEnergyOpportunity } from 'src/app/models/energyOpportunity';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { EnergyOpportunitySetupFormComponent } from './energy-opportunity-setup-form/energy-opportunity-setup-form.component';
import { NebFormsAccordionComponent } from '../neb-forms-accordion/neb-forms-accordion.component';

describe('AssessmentEnergyOpportunitiesFormComponent', () => {
  let component: AssessmentEnergyOpportunitiesFormComponent;
  let fixture: ComponentFixture<AssessmentEnergyOpportunitiesFormComponent>;


  let setupWizardService: Partial<SetupWizardService> = {
    sidebarOpen: new BehaviorSubject<boolean>(false),
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
      declarations: [AssessmentEnergyOpportunitiesFormComponent, EnergyOpportunitySetupFormComponent, NebFormsAccordionComponent],
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
