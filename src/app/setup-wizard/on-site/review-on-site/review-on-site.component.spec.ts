import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewOnSiteComponent } from './review-on-site.component';
import { SetupWizardContext, SetupWizardService } from 'src/app/setup-wizard/setup-wizard.service';
import { BehaviorSubject } from 'rxjs';
import { IdbCompany, getNewIdbCompany } from 'src/app/models/company';
import { IdbFacility, getNewIdbFacility } from 'src/app/models/facility';
import { IdbProject } from 'src/app/models/project';
import { IdbAssessment } from 'src/app/models/assessment';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IdbNonEnergyBenefit } from 'src/app/models/nonEnergyBenefit';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IdbContact } from 'src/app/models/contact';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { ProjectIdbService } from 'src/app/indexed-db/project-idb.service';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { NonEnergyBenefitsIdbService } from 'src/app/indexed-db/non-energy-benefits-idb.service';

describe('ReviewOnSiteComponent', () => {
  let component: ReviewOnSiteComponent;
  let fixture: ComponentFixture<ReviewOnSiteComponent>;
  let setupWizardService: Partial<SetupWizardService> = {
    company: new BehaviorSubject<IdbCompany>(getNewIdbCompany('')),
    facility: new BehaviorSubject<IdbFacility>(getNewIdbFacility('', '')),
    projects: new BehaviorSubject<Array<IdbProject>>([]),
    assessments: new BehaviorSubject<Array<IdbAssessment>>([]),
    setupContext: new BehaviorSubject<SetupWizardContext>('full'),
    sidebarOpen: new BehaviorSubject<boolean>(false),
    highlighNebGuid: new BehaviorSubject<string>(undefined),
    nonEnergyBenefits: new BehaviorSubject<Array<IdbNonEnergyBenefit>>([]),
    contacts: new BehaviorSubject<Array<IdbContact>>([])
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, FormsModule, RouterTestingModule],
      declarations: [ReviewOnSiteComponent],
      providers: [
        { provide: SetupWizardService, useValue: setupWizardService },
        { provide: CompanyIdbService, useValue: {} },
        { provide: FacilityIdbService, useValue: {} },
        { provide: ProjectIdbService, useValue: {} },
        { provide: AssessmentIdbService, useValue: {} },
        { provide: ContactIdbService, useValue: {} },
        { provide: NonEnergyBenefitsIdbService, useValue: {} }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReviewOnSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
