import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentsTableComponent } from './assessments-table.component';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { IdbAssessment, getNewIdbAssessment } from 'src/app/models/assessment';
import { BehaviorSubject } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { IdbFacility, getNewIdbFacility } from 'src/app/models/facility';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { SetupWizardService } from 'src/app/setup-wizard/setup-wizard.service';
import { HelperPipesModule } from 'src/app/shared/helper-pipes/helper-pipes.module';
import { IdbCompany, getNewIdbCompany } from 'src/app/models/company';

describe('AssessmentsTableComponent', () => {
  let component: AssessmentsTableComponent;
  let fixture: ComponentFixture<AssessmentsTableComponent>;

  let assessmentIdbService: Partial<AssessmentIdbService> = {
    selectedAssessment: new BehaviorSubject<IdbAssessment>(getNewIdbAssessment('', '', '')),
    assessments: new BehaviorSubject<Array<IdbAssessment>>([])
  };
  let facilityIdbService: Partial<FacilityIdbService> = {
    selectedFacility: new BehaviorSubject<IdbFacility>(getNewIdbFacility('', '')),
    facilities: new BehaviorSubject<Array<IdbFacility>>([])
  };
  let companyIdbService: Partial<CompanyIdbService> = {
    selectedCompany: new BehaviorSubject<IdbCompany>(getNewIdbCompany('')),
    companies: new BehaviorSubject<Array<IdbCompany>>([])
  };
  let setupWizardService: Partial<SetupWizardService> = {};
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, HelperPipesModule],
      declarations: [AssessmentsTableComponent],
      providers: [
        { provide: AssessmentIdbService, useValue: assessmentIdbService },
        { provide: FacilityIdbService, useValue: facilityIdbService },
        { provide: CompanyIdbService, useValue: companyIdbService },
        { provide: SetupWizardService, useValue: setupWizardService }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssessmentsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
