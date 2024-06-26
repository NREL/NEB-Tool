import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewOnSiteComponent } from './review-on-site.component';
import { SetupWizardService } from 'src/app/setup-wizard/setup-wizard.service';
import { BehaviorSubject } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { NonEnergyBenefitsIdbService } from 'src/app/indexed-db/non-energy-benefits-idb.service';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { IdbOnSiteVisit, getNewIdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { EnergyOpportunityIdbService } from 'src/app/indexed-db/energy-opportunity-idb.service';

describe('ReviewOnSiteComponent', () => {
  let component: ReviewOnSiteComponent;
  let fixture: ComponentFixture<ReviewOnSiteComponent>;
  let setupWizardService: Partial<SetupWizardService> = {
    sidebarOpen: new BehaviorSubject<boolean>(false),
  };

  let onSiteVisitIdbService: Partial<OnSiteVisitIdbService> = {
    selectedVisit: new BehaviorSubject<IdbOnSiteVisit>(getNewIdbOnSiteVisit('', '', ''))
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, FormsModule, RouterTestingModule],
      declarations: [ReviewOnSiteComponent],
      providers: [
        { provide: SetupWizardService, useValue: setupWizardService },
        { provide: CompanyIdbService, useValue: {} },
        { provide: FacilityIdbService, useValue: {} },
        { provide: EnergyOpportunityIdbService, useValue: {} },
        { provide: AssessmentIdbService, useValue: {} },
        { provide: ContactIdbService, useValue: {} },
        { provide: NonEnergyBenefitsIdbService, useValue: {} },
        { provide: OnSiteVisitIdbService, useValue: onSiteVisitIdbService }
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
