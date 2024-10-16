import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAssessmentComponent } from './manage-assessment.component';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { BehaviorSubject } from 'rxjs';
import { IdbAssessment, getNewIdbAssessment } from 'src/app/models/assessment';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { NonEnergyBenefitsIdbService } from 'src/app/indexed-db/non-energy-benefits-idb.service';
import { DbChangesService } from 'src/app/indexed-db/db-changes.service';
import { EnergyOpportunityIdbService } from 'src/app/indexed-db/energy-opportunity-idb.service';
import { getDefaultUnitSettings } from 'src/app/models/unitSettings';

describe('ManageAssessmentComponent', () => {
  let component: ManageAssessmentComponent;
  let fixture: ComponentFixture<ManageAssessmentComponent>;
  let assessmentIdbService: Partial<AssessmentIdbService> = {
    selectedAssessment: new BehaviorSubject<IdbAssessment>(getNewIdbAssessment('', '', '', getDefaultUnitSettings())),
    assessments: new BehaviorSubject<Array<IdbAssessment>>([])
  };
  let companyIdbService: Partial<CompanyIdbService> = {};
  let facilityIdbService: Partial<FacilityIdbService> = {};
  let energyOpportunityIdbService: Partial<EnergyOpportunityIdbService> = {};
  let contactIdbService: Partial<ContactIdbService> = {};
  let nonEnergyBenefitsIdbService: Partial<NonEnergyBenefitsIdbService> = {}
  let dbChangesService: Partial<DbChangesService> = {}
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [ManageAssessmentComponent],
      providers: [
        { provide: AssessmentIdbService, useValue: assessmentIdbService },
        { provide: CompanyIdbService, useValue: companyIdbService },
        { provide: FacilityIdbService, useValue: facilityIdbService },
        { provide: EnergyOpportunityIdbService, useValue: energyOpportunityIdbService },
        { provide: ContactIdbService, useValue: contactIdbService },
        { provide: NonEnergyBenefitsIdbService, useValue: nonEnergyBenefitsIdbService },
        { provide: DbChangesService, useValue: dbChangesService }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ManageAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
