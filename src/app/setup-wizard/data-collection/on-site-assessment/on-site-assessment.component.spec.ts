import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnSiteAssessmentComponent } from './on-site-assessment.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { BehaviorSubject } from 'rxjs';
import { IdbContact } from 'src/app/models/contact';
import { IdbAssessment, getNewIdbAssessment } from 'src/app/models/assessment';
import { IdbOnSiteVisit, getNewIdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { AssessmentDetailsFormComponent } from './assessment-details-form/assessment-details-form.component';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { AssessmentNebsFormComponent } from './assessment-nebs-form/assessment-nebs-form.component';
import { NonEnergyBenefitsIdbService } from 'src/app/indexed-db/non-energy-benefits-idb.service';
import { HelperPipesModule } from 'src/app/shared/helper-pipes/helper-pipes.module';
import { IdbFacility, getNewIdbFacility } from 'src/app/models/facility';
import { IdbNonEnergyBenefit } from 'src/app/models/nonEnergyBenefit';
import { EnergyOpportunityIdbService } from 'src/app/indexed-db/energy-opportunity-idb.service';
import { IdbEnergyOpportunity } from 'src/app/models/energyOpportunity';
import { AssessmentEnergyOpportunitiesFormComponent } from './assessment-energy-opportunities-form/assessment-energy-opportunities-form.component';

describe('OnSiteAssessmentComponent', () => {
  let component: OnSiteAssessmentComponent;
  let fixture: ComponentFixture<OnSiteAssessmentComponent>;
  let assessmentIdbService: Partial<AssessmentIdbService> = {
    selectedAssessment: new BehaviorSubject<IdbAssessment>(getNewIdbAssessment('', '', ''))
  };
  let contactIdbService: Partial<ContactIdbService> = {
    contacts: new BehaviorSubject<Array<IdbContact>>([])
  };
  let onSiteVisitIdbService: Partial<OnSiteVisitIdbService> = {
    selectedVisit: new BehaviorSubject<IdbOnSiteVisit>(getNewIdbOnSiteVisit('', '', ''))
  };
  let facilityIdbService: Partial<FacilityIdbService> = {
    selectedFacility: new BehaviorSubject<IdbFacility>(getNewIdbFacility('', ''))
  };
  let energyOpportunityIdbService: Partial<EnergyOpportunityIdbService> = {
    energyOpportunities: new BehaviorSubject<Array<IdbEnergyOpportunity>>([])
  };
  let nonEnergyBenefitsIdbService: Partial<NonEnergyBenefitsIdbService> = {
    nonEnergyBenefits: new BehaviorSubject<Array<IdbNonEnergyBenefit>>([])
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, FormsModule, RouterTestingModule, HelperPipesModule],
      declarations: [OnSiteAssessmentComponent, AssessmentDetailsFormComponent, AssessmentEnergyOpportunitiesFormComponent, AssessmentNebsFormComponent],
      providers: [
        { provide: AssessmentIdbService, useValue: assessmentIdbService },
        { provide: ContactIdbService, useValue: contactIdbService },
        { provide: OnSiteVisitIdbService, useValue: onSiteVisitIdbService },
        { provide: FacilityIdbService, useValue: facilityIdbService },
        { provide: EnergyOpportunityIdbService, useValue: energyOpportunityIdbService },
        { provide: NonEnergyBenefitsIdbService, useValue: nonEnergyBenefitsIdbService },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(OnSiteAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
