import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core-components/navbar/navbar.component';
import { WelcomeComponent } from './core-components/welcome/welcome.component';
import { CompanyIdbService } from './indexed-db/company-idb.service';
import { FacilityIdbService } from './indexed-db/facility-idb.service';
import { UserIdbService } from './indexed-db/user-idb.service';
import { LoadingComponent } from './core-components/loading/loading.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AssessmentIdbService } from './indexed-db/assessment-idb.service';
import { ContactIdbService } from './indexed-db/contact-idb.service';
import { NonEnergyBenefitsIdbService } from './indexed-db/non-energy-benefits-idb.service';
import { OnSiteVisitIdbService } from './indexed-db/on-site-visit-idb.service';
import { SetupWizardModalComponent } from './core-components/setup-wizard-modal/setup-wizard-modal.component';
import { SetupWizardContext, SetupWizardService } from './setup-wizard/setup-wizard.service';
import { BehaviorSubject } from 'rxjs';
import { IdbCompany } from './models/company';
import { IdbFacility } from './models/facility';
import { IdbUser } from './models/user';
import { IdbAssessment } from './models/assessment';
import { IdbContact } from './models/contact';
import { IdbNonEnergyBenefit } from './models/nonEnergyBenefit';
import { IdbOnSiteVisit } from './models/onSiteVisit';
import { EnergyOpportunityIdbService } from './indexed-db/energy-opportunity-idb.service';
import { IdbEnergyOpportunity } from './models/energyOpportunity';

describe('AppComponent', () => {

  let companyIdbService: Partial<CompanyIdbService> = {
    companies: new BehaviorSubject<Array<IdbCompany>>([]),
    selectedCompany: new BehaviorSubject<IdbCompany>(undefined)
  };

  let facilityIdbService: Partial<FacilityIdbService> = {
    facilities: new BehaviorSubject<Array<IdbFacility>>([]),
    selectedFacility: new BehaviorSubject<IdbFacility>(undefined)
  };

  let userIdbService: Partial<UserIdbService> = {
    user: new BehaviorSubject<IdbUser>(undefined)
  };

  let energyOpportunityIdbService: Partial<EnergyOpportunityIdbService> = {
    energyOpportunities: new BehaviorSubject<Array<IdbEnergyOpportunity>>([]),
  };

  let assessmentIdbService: Partial<AssessmentIdbService> = {
    assessments: new BehaviorSubject<Array<IdbAssessment>>([]),
    selectedAssessment: new BehaviorSubject<IdbAssessment>(undefined)
  };

  let contactIdbService: Partial<ContactIdbService> = {
    contacts: new BehaviorSubject<Array<IdbContact>>([])
  };

  let nonEnergyBenefitsIdbService: Partial<NonEnergyBenefitsIdbService> = {
    nonEnergyBenefits: new BehaviorSubject<Array<IdbNonEnergyBenefit>>([])
  };

  let onSiteVisitIdbService: Partial<OnSiteVisitIdbService> = {
    onSiteVisits: new BehaviorSubject<Array<IdbOnSiteVisit>>([])
  };

  let setupWizardService: Partial<SetupWizardService> = {
    setupContext: new BehaviorSubject<SetupWizardContext>('onSite')
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FontAwesomeModule],
      declarations: [AppComponent, NavbarComponent, WelcomeComponent, LoadingComponent, SetupWizardModalComponent],
      providers: [
        { provide: CompanyIdbService, useValue: companyIdbService },
        { provide: FacilityIdbService, useValue: facilityIdbService },
        { provide: UserIdbService, useValue: userIdbService },
        { provide: EnergyOpportunityIdbService, useValue: energyOpportunityIdbService },
        { provide: AssessmentIdbService, useValue: assessmentIdbService },
        { provide: ContactIdbService, useValue: contactIdbService },
        { provide: NonEnergyBenefitsIdbService, useValue: nonEnergyBenefitsIdbService },
        { provide: OnSiteVisitIdbService, useValue: onSiteVisitIdbService },
        { provide: SetupWizardService, useValue: setupWizardService }
      ]
    })
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
