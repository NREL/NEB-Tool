import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanySettingsComponent } from './company-settings.component';
import { SharedSettingsFormsModule } from 'src/app/shared/shared-settings-forms/shared-settings-forms.module';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { BehaviorSubject } from 'rxjs';
import { IdbCompany, getNewIdbCompany } from 'src/app/models/company';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { IdbFacility, getNewIdbFacility } from 'src/app/models/facility';
import { LocalStorageDataService } from 'src/app/shared/shared-services/local-storage-data.service';
import { DbChangesService } from 'src/app/indexed-db/db-changes.service';
import { UserIdbService } from 'src/app/indexed-db/user-idb.service';

describe('CompanySettingsComponent', () => {
  let component: CompanySettingsComponent;
  let fixture: ComponentFixture<CompanySettingsComponent>;
  let companyIdbService: Partial<CompanyIdbService> = {
    companies: new BehaviorSubject<Array<IdbCompany>>([]),
    selectedCompany: new BehaviorSubject<IdbCompany>(getNewIdbCompany(''))
  };
  let facilityIdbService: Partial<FacilityIdbService> = {
    facilities: new BehaviorSubject<Array<IdbFacility>>([]),
    selectedFacility: new BehaviorSubject<IdbFacility>(getNewIdbFacility('', ''))
  };
  let userIdbService: Partial<UserIdbService> = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedSettingsFormsModule, FontAwesomeModule, FormsModule, RouterTestingModule],
      declarations: [CompanySettingsComponent],
      providers: [
        { provide: CompanyIdbService, useValue: companyIdbService },
        { provide: FacilityIdbService, useValue: facilityIdbService },
        { provide: LocalStorageDataService, useValue: {}},
        { provide: DbChangesService, useValue: {}},
        { provide: UserIdbService, useValue: userIdbService}
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CompanySettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
