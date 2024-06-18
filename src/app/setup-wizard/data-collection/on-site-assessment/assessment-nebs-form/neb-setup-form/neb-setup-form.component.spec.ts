import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NebSetupFormComponent } from './neb-setup-form.component';
import { SetupWizardContext, SetupWizardService } from 'src/app/setup-wizard/setup-wizard.service';
import { BehaviorSubject } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IdbNonEnergyBenefit, getNewIdbNonEnergyBenefit } from 'src/app/models/nonEnergyBenefit';
import { FormsModule } from '@angular/forms';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { IdbCompany, getNewIdbCompany } from 'src/app/models/company';
import { NonEnergyBenefitsIdbService } from 'src/app/indexed-db/non-energy-benefits-idb.service';
import { DbChangesService } from 'src/app/indexed-db/db-changes.service';
import { EnergyOpportunityIdbService } from 'src/app/indexed-db/energy-opportunity-idb.service';
import { IdbEnergyOpportunity } from 'src/app/models/energyOpportunity';

describe('NebSetupFormComponent', () => {
  let component: NebSetupFormComponent;
  let fixture: ComponentFixture<NebSetupFormComponent>;

  let setupWizardService: Partial<SetupWizardService> = {
    setupContext: new BehaviorSubject<SetupWizardContext>('full'),
    sidebarOpen: new BehaviorSubject<boolean>(false),
  };
  let companyIdbService: Partial<CompanyIdbService> = {
    companies: new BehaviorSubject<Array<IdbCompany>>([]),
    selectedCompany: new BehaviorSubject<IdbCompany>(getNewIdbCompany(''))
  };
  let energyOpportunityIdbService: Partial<EnergyOpportunityIdbService> = {
    energyOpportunities: new BehaviorSubject<Array<IdbEnergyOpportunity>>([])
  };
  let nonEnergyBenefitsIdbService: Partial<NonEnergyBenefitsIdbService> = {
    nonEnergyBenefits: new BehaviorSubject<Array<IdbNonEnergyBenefit>>([]),
    getByGuid: () => { return getNewIdbNonEnergyBenefit('', '', '', '', undefined, undefined) }
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, FormsModule],
      declarations: [NebSetupFormComponent],
      providers: [
        { provide: SetupWizardService, useValue: setupWizardService },
        { provide: CompanyIdbService, useValue: companyIdbService },
        { provide: EnergyOpportunityIdbService, useValue: energyOpportunityIdbService },
        { provide: NonEnergyBenefitsIdbService, useValue: nonEnergyBenefitsIdbService },
        { provide: DbChangesService, useValue: {} },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(NebSetupFormComponent);
    component = fixture.componentInstance;
    component.nonEnergyBenefit = getNewIdbNonEnergyBenefit('', '', '', '', undefined, undefined);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
