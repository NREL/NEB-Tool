import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupWizardModalComponent } from './setup-wizard-modal.component';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { IdbCompany } from 'src/app/models/company';
import { BehaviorSubject } from 'rxjs';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { IdbFacility } from 'src/app/models/facility';
import { UserIdbService } from 'src/app/indexed-db/user-idb.service';
import { IdbUser } from 'src/app/models/user';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { SetupWizardContext, SetupWizardService } from 'src/app/setup-wizard/setup-wizard.service';
import { FormsModule } from '@angular/forms';

describe('SetupWizardModalComponent', () => {
  let component: SetupWizardModalComponent;
  let fixture: ComponentFixture<SetupWizardModalComponent>;

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

  let assessmentIdbService: Partial<AssessmentIdbService> = {
    assessments: new BehaviorSubject<Array<IdbAssessment>>([]),
    selectedAssessment: new BehaviorSubject<IdbAssessment>(undefined)
  };
  let onSiteVisitIdbService: Partial<OnSiteVisitIdbService> = {
    onSiteVisits: new BehaviorSubject<Array<IdbOnSiteVisit>>([]),
    selectedVisit: new BehaviorSubject<IdbOnSiteVisit>(undefined)
  };

  let setupWizardService: Partial<SetupWizardService> = {
    setupContext: new BehaviorSubject<SetupWizardContext>('onSite')
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [SetupWizardModalComponent],
      providers: [
        { provide: CompanyIdbService, useValue: companyIdbService },
        { provide: FacilityIdbService, useValue: facilityIdbService },
        { provide: UserIdbService, useValue: userIdbService },
        { provide: AssessmentIdbService, useValue: assessmentIdbService },
        { provide: OnSiteVisitIdbService, useValue: onSiteVisitIdbService },
        { provide: SetupWizardService, useValue: setupWizardService }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SetupWizardModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
