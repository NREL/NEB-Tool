import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNebsModalComponent } from './add-nebs-modal.component';
import { SetupWizardContext, SetupWizardService } from 'src/app/setup-wizard/setup-wizard.service';
import { KeyPerformanceIndicatorsIdbService } from 'src/app/indexed-db/key-performance-indicators-idb.service';
import { NonEnergyBenefitsIdbService } from 'src/app/indexed-db/non-energy-benefits-idb.service';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { EnergyOpportunityIdbService } from 'src/app/indexed-db/energy-opportunity-idb.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { ContactContext, IdbContact } from 'src/app/models/contact';
import { IdbAssessment, getNewIdbAssessment } from 'src/app/models/assessment';
import { getNewIdbEnergyOpportunity } from 'src/app/models/energyOpportunity';
import { IdbKeyPerformanceIndicator } from 'src/app/models/keyPerformanceIndicator';

describe('AddNebsModalComponent', () => {
  let component: AddNebsModalComponent;
  let fixture: ComponentFixture<AddNebsModalComponent>;



  let setupWizardService: Partial<SetupWizardService> = {
    sidebarOpen: new BehaviorSubject<boolean>(false),
    displayAddNebsModal: new BehaviorSubject<{
      assessmentId: string,
      energyOpportunityId: string
    }>({
      assessmentId: '',
      energyOpportunityId: ''
    }),

    displayContactModal: new BehaviorSubject<{
      context: ContactContext,
      viewContact: IdbContact,
      contextGuid: string
    }>(undefined)
  }; let keyPerformanceIndicatorIdbService: Partial<KeyPerformanceIndicatorsIdbService> = {
    keyPerformanceIndicators: new BehaviorSubject<Array<IdbKeyPerformanceIndicator>>([]),
    getCompanyKeyPerformanceMetrics: () => { return [] }
  };
  let nonEnergyBenefitIdbService: Partial<NonEnergyBenefitsIdbService> = {};
  let assessmentIdbService: Partial<AssessmentIdbService> = {
    selectedAssessment: new BehaviorSubject<IdbAssessment>(getNewIdbAssessment('', '', '')),
    getByGuid: () => { return getNewIdbAssessment('', '', '') }

  };
  let energyOpportunityIdbService: Partial<EnergyOpportunityIdbService> = {
    getByGuid: () => { return getNewIdbEnergyOpportunity('', '', '', '') }

  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, FormsModule],
      declarations: [AddNebsModalComponent],
      providers: [
        { provide: SetupWizardService, useValue: setupWizardService },
        { provide: KeyPerformanceIndicatorsIdbService, useValue: keyPerformanceIndicatorIdbService },
        { provide: NonEnergyBenefitsIdbService, useValue: nonEnergyBenefitIdbService },
        { provide: AssessmentIdbService, useValue: assessmentIdbService },
        { provide: EnergyOpportunityIdbService, useValue: energyOpportunityIdbService }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AddNebsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
