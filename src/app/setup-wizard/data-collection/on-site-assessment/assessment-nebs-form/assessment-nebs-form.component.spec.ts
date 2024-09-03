import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentNebsFormComponent } from './assessment-nebs-form.component';
import { SetupWizardService } from 'src/app/setup-wizard/setup-wizard.service';
import { BehaviorSubject } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { NebSetupFormComponent } from '../neb-forms-accordion/neb-setup-form/neb-setup-form.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { IdbAssessment, getNewIdbAssessment } from 'src/app/models/assessment';
import { NonEnergyBenefitsIdbService } from 'src/app/indexed-db/non-energy-benefits-idb.service';
import { IdbNonEnergyBenefit } from 'src/app/models/nonEnergyBenefit';
import { NebFormsAccordionComponent } from '../neb-forms-accordion/neb-forms-accordion.component';
import { EnergyOpportunityNebsTableComponent } from './energy-opportunity-nebs-table/energy-opportunity-nebs-table.component';
import { EnergyOpportunityIdbService } from 'src/app/indexed-db/energy-opportunity-idb.service';
import { IdbEnergyOpportunity } from 'src/app/models/energyOpportunity';
import { EnergyOpportunityNebsListPipe } from './energy-opportunity-nebs-table/energy-opportunity-nebs-list.pipe';

describe('AssessmentNebsFormComponent', () => {
  let component: AssessmentNebsFormComponent;
  let fixture: ComponentFixture<AssessmentNebsFormComponent>;

  let setupWizardService: Partial<SetupWizardService> = {
    sidebarOpen: new BehaviorSubject<boolean>(false),
  };
  let assessmentIdbService: Partial<AssessmentIdbService> = {
    assessments: new BehaviorSubject<Array<IdbAssessment>>([]),
    selectedAssessment: new BehaviorSubject<IdbAssessment>(getNewIdbAssessment('', '', ''))
  };
  let nonEnergyBenefitsIdbService: Partial<NonEnergyBenefitsIdbService> = {
    nonEnergyBenefits: new BehaviorSubject<Array<IdbNonEnergyBenefit>>([])
  };

  let energyOpportunityIdbService: Partial<EnergyOpportunityIdbService> = {
    energyOpportunities: new BehaviorSubject<Array<IdbEnergyOpportunity>>([])
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, FormsModule, RouterTestingModule],
      declarations: [AssessmentNebsFormComponent, NebSetupFormComponent, NebFormsAccordionComponent, EnergyOpportunityNebsTableComponent, EnergyOpportunityNebsListPipe],
      providers: [
        { provide: SetupWizardService, useValue: setupWizardService },
        { provide: AssessmentIdbService, useValue: assessmentIdbService },
        { provide: NonEnergyBenefitsIdbService, useValue: nonEnergyBenefitsIdbService },
        { provide: EnergyOpportunityIdbService, useValue: energyOpportunityIdbService }
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
