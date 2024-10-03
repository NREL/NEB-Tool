import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilitiesTableComponent } from './facilities-table.component';
import { UserIdbService } from 'src/app/indexed-db/user-idb.service';
import { BehaviorSubject } from 'rxjs';
import { IdbUser, getNewIdbUser } from 'src/app/models/user';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { IdbCompany } from 'src/app/models/company';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { IdbFacility } from 'src/app/models/facility';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { IdbAssessment, getNewIdbAssessment } from 'src/app/models/assessment';
import { getDefaultUnitSettings } from 'src/app/models/unitSettings';

describe('FacilitiesTableComponent', () => {
  let component: FacilitiesTableComponent;
  let fixture: ComponentFixture<FacilitiesTableComponent>;
  let userIdbService: Partial<UserIdbService> = {
    user: new BehaviorSubject<IdbUser>(getNewIdbUser())
  }
  let companyIdbService: Partial<CompanyIdbService> = {
    companies: new BehaviorSubject<Array<IdbCompany>>([])
  };
  let facilityIdbService: Partial<FacilityIdbService> = {
    facilities: new BehaviorSubject<Array<IdbFacility>>([])
  };

  let assessmentIdbService: Partial<AssessmentIdbService> = {
    selectedAssessment: new BehaviorSubject<IdbAssessment>(getNewIdbAssessment('', '', '', getDefaultUnitSettings())),
    assessments: new BehaviorSubject<Array<IdbAssessment>>([])
  };


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, FontAwesomeModule, FormsModule],
      declarations: [FacilitiesTableComponent],    
        providers: [
        { provide: UserIdbService, useValue: userIdbService },
        { provide: CompanyIdbService, useValue: companyIdbService },
        { provide: FacilityIdbService, useValue: facilityIdbService },
        { provide: AssessmentIdbService, useValue: assessmentIdbService },
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FacilitiesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
