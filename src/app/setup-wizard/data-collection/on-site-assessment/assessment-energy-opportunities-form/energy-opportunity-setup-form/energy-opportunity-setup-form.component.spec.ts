import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergyOpportunitySetupFormComponent } from './energy-opportunity-setup-form.component';
import { SetupWizardService } from 'src/app/setup-wizard/setup-wizard.service';
import { BehaviorSubject } from 'rxjs';
import { NonEnergyBenefitsIdbService } from 'src/app/indexed-db/non-energy-benefits-idb.service';
import { IdbNonEnergyBenefit } from 'src/app/models/nonEnergyBenefit';
import { DbChangesService } from 'src/app/indexed-db/db-changes.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { EnergyOpportunityIdbService } from 'src/app/indexed-db/energy-opportunity-idb.service';
import { IdbEnergyOpportunity, getNewIdbEnergyOpportunity } from 'src/app/models/energyOpportunity';
import { NebFormsAccordionComponent } from '../../neb-forms-accordion/neb-forms-accordion.component';

describe('EnergyOpportunitySetupFormComponent', () => {
  let component: EnergyOpportunitySetupFormComponent;
  let fixture: ComponentFixture<EnergyOpportunitySetupFormComponent>;


  let setupWizardService: Partial<SetupWizardService> = {
    sidebarOpen: new BehaviorSubject<boolean>(false)
  };
  let energyOpportunityIdbService: Partial<EnergyOpportunityIdbService> = {
    energyOpportunities: new BehaviorSubject<Array<IdbEnergyOpportunity>>([]),
    getByGuid: () => { return getNewIdbEnergyOpportunity('', '', '', '') }
  };
  let nonEnergyBenefitsIdbService: Partial<NonEnergyBenefitsIdbService> = {
    nonEnergyBenefits: new BehaviorSubject<Array<IdbNonEnergyBenefit>>([])
  };
  let dbChangesService: Partial<DbChangesService> = {}
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, RouterTestingModule, FormsModule],
      declarations: [EnergyOpportunitySetupFormComponent, NebFormsAccordionComponent],
      providers: [
        { provide: SetupWizardService, useValue: setupWizardService },
        { provide: EnergyOpportunityIdbService, useValue: energyOpportunityIdbService },
        { provide: NonEnergyBenefitsIdbService, useValue: nonEnergyBenefitsIdbService },
        { provide: DbChangesService, useValue: dbChangesService },
      ]

    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnergyOpportunitySetupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
