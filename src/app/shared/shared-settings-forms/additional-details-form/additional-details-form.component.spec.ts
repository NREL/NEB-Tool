import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalDetailsFormComponent } from './additional-details-form.component';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { BehaviorSubject } from 'rxjs';
import { IdbCompany, getNewIdbCompany } from 'src/app/models/company';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { IdbFacility, getNewIdbFacility } from 'src/app/models/facility';
import { SetupWizardService } from 'src/app/setup-wizard/setup-wizard.service';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('AdditionalDetailsFormComponent', () => {
  let component: AdditionalDetailsFormComponent;
  let fixture: ComponentFixture<AdditionalDetailsFormComponent>;
  let companyIdbService: Partial<CompanyIdbService> = {
    companies: new BehaviorSubject<Array<IdbCompany>>([]),
    selectedCompany: new BehaviorSubject<IdbCompany>(getNewIdbCompany(''))
  };
  let facilityIdbService: Partial<FacilityIdbService> = {
    facilities: new BehaviorSubject<Array<IdbFacility>>([]),
    selectedFacility: new BehaviorSubject<IdbFacility>(getNewIdbFacility('', ''))
  };
  let setupWizardService: Partial<SetupWizardService> = {  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FontAwesomeModule],
      declarations: [AdditionalDetailsFormComponent],
      providers: [
        { provide: SetupWizardService, useValue: setupWizardService },
        { provide: CompanyIdbService, useValue: companyIdbService },
        { provide: FacilityIdbService, useValue: facilityIdbService }
      ]
    });
    fixture = TestBed.createComponent(AdditionalDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
