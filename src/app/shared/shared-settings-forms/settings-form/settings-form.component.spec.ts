import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsFormComponent } from './settings-form.component';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { BehaviorSubject } from 'rxjs';
import { IdbCompany, getNewIdbCompany } from 'src/app/models/company';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { IdbFacility, getNewIdbFacility } from 'src/app/models/facility';
import { SetupWizardService } from 'src/app/setup-wizard/setup-wizard.service';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AdditionalDetailsFormComponent } from '../additional-details-form/additional-details-form.component';
import { LocationFormComponent } from '../location-form/location-form.component';
import { UnitsFormComponent } from '../units-form/units-form.component';
import { LocalStorageDataService } from '../../shared-services/local-storage-data.service';
import { HelperPipesModule } from '../../helper-pipes/helper-pipes.module';

describe('SettingsFormComponent', () => {
  let component: SettingsFormComponent;
  let fixture: ComponentFixture<SettingsFormComponent>;
  let companyIdbService: Partial<CompanyIdbService> = {
    companies: new BehaviorSubject<Array<IdbCompany>>([]),
    selectedCompany: new BehaviorSubject<IdbCompany>(getNewIdbCompany(''))
  };
  let facilityIdbService: Partial<FacilityIdbService> = {
    facilities: new BehaviorSubject<Array<IdbFacility>>([]),
    selectedFacility: new BehaviorSubject<IdbFacility>(getNewIdbFacility('', ''))
  };
  let setupWizardService: Partial<SetupWizardService> = {
    company: new BehaviorSubject<IdbCompany>(getNewIdbCompany('')),
    facility: new BehaviorSubject<IdbFacility>(getNewIdbFacility('', ''))
  };
  let localStorageDataService: Partial<LocalStorageDataService> = {
    additionalDetailsAccordionOpen: true,
    locationAccordionOpen: true,
    primaryContactAccordionOpen: true,
    unitsAccordionOpen: true
  }
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FontAwesomeModule, HelperPipesModule],
      declarations: [SettingsFormComponent, AdditionalDetailsFormComponent, LocationFormComponent, UnitsFormComponent],
      providers: [
        { provide: SetupWizardService, useValue: setupWizardService },
        { provide: CompanyIdbService, useValue: companyIdbService },
        { provide: FacilityIdbService, useValue: facilityIdbService },
        { provide: LocalStorageDataService, useValue: localStorageDataService }
      ]
    });
    fixture = TestBed.createComponent(SettingsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
